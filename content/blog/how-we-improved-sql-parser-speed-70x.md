---
title: How We Improved Our SQL Parser Speed by 70x
author: Junyi
published_at: 2024/05/24 09:00
feature_image: /content/blog/how-we-improved-sql-parser-speed-70x/banner.webp
tags: Engineering
featured: true
description: How we optimize the ANTLR's grammar to significantly increase the SQL parsing speed for SQL Server.
---

## Background

Bytebase provides [SQL Review](/docs/sql-review/overview/) to detect anti-SQL patterns for all mainstream
relational databases. Our customers integrate it into their code review CI pipeline:

![sql-review-ci](/content/blog/how-we-improved-sql-parser-speed-70x/sql-review-ci.webp)

or submit SQL for review via our UI console:

![sql-review-ui](/content/blog/how-we-improved-sql-parser-speed-70x/sql-review-ui.webp)

Then one of our SQL Server customers complained that our SQL Review is slow. It took
147 seconds to review a 1000-line SQL.

## ANTLR

Bytebase supports various relational database. To provide good compatibility, we build dedicated SQL parser
for each SQL dialect respectively. The dialect for SQL Server is called `TSQL`. Because we need to support several, or even dozens of SQL dialects, manually implementing a parser for each SQL dialect is not feasible from an engineering perspective. Therefore, we have to resort to parser generators and rely on community-maintained grammar files. Typically, we are familiar with parser generators such as `yacc&lex` or `bison`. Unfortunately, due to design reasons, most parser generators from the yacc era were designed for C/C++ languages, and the corresponding `.y` grammar files cannot be directly applied to our Golang backend.

**[ANTLR (v4)](https://www.antlr.org/) to the rescue:**

_ANTLR (ANother Tool for Language Recognition) is a powerful parser generator for reading, processing, executing, or translating structured text or binary files. It's widely used to build languages, tools, and frameworks. From a grammar, ANTLR generates a parser that can build parse trees and also generates a listener interface (or visitor) that makes it easy to respond to the recognition of phrases of interest._

Because our unique requirements, our options are very limited. In fact, ANTLR is our only choice for the following reasons:

1. ANTLRv4 supports the Golang Runtime.
1. ANTLRv4 has a community-maintained set of grammars, which includes a wide variety of SQL dialects, such as MySQL, Postgres, TSQL, PLSQL, and more. You can find these grammars at https://github.com/antlr/grammars-v4.

Additionally, ANTLR outshines yacc-like grammar generators in terms of usability: it not only provides direct generation of listeners and visitors but also imposes very few restrictions on grammar, allowing for more readable grammar definitions. Especially the latter point, those who have seen `.y` grammar files would understand.

**But ANTLR also has its dark side.**

One common criticism of ANTLR is its performance. However, this performance disadvantage is not entirely due to ANTLR itself. As we mentioned earlier, ANTLR imposes very few restrictions on grammar, which is actually one of the culprits behind the performance issues.

## Compiler 101

To explain the problem, let's review some compiler basics first.

As mentioned earlier, ANTLR imposes very few restrictions on grammar. Yacc supports `LALR(1)` grammars, whereas ANTLR supports `LL(\*)` grammars. This distinction might not be very meaningful because not everyone clearly remembers what these terms mean 😄. Instead of delving into the concepts, let's understand the difference in interpretative capabilities between these two types of grammars through an intuitive example.

Let's assume we have the following grammar:

```javascript
S -> A 'a' | B 'b'
A -> 'a'
B -> 'a'
```

**LALR(1)**

LALR(1) is a bottom-up grammar. For an input string `aa`, an LALR(1) parser cannot determine the appropriate action after processing the first `a`.

When the parser reads the first `a`, there are two possible paths:

1. Reduce using `A -> 'a'` (scheme A), then match the subsequent `a`.
1. Reduce using `B -> 'a'` (scheme B), then match the subsequent `b`.

This ambiguity leads to a shift-reduce conflict, where the parser cannot decide whether to shift to the next character or reduce the current symbol.

**LL(\*)**

LL(\*) is a top-down grammar, and its parser can dynamically look ahead multiple symbols, so it can successfully parse the aforementioned grammar.

Of course, the differences between LALR(1) and LL(\*) go beyond this single point, but this example is meant to illustrate the stronger interpretative capability of LL(\*) grammars and their fewer syntax restrictions. Therefore, we'll leave it at that for now.

**The same strength can also be a weakness.**

Through the above example, you can get a sense of the interpretative capability of LL(\*). The advantage of strong interpretative power is evident: we don't have to worry about how to write the grammar to meet specific requirements, and we can write grammar files entirely based on readability. This is naturally a win-win for those who maintain the grammar files. However, strong interpretative power is not obtained without cost; it comes with a corresponding performance trade-off. For grammars with significant ambiguity, where it might be necessary to look ahead by thousands of tokens to decide how to parse, the resulting performance cost can become unacceptable.

## TSQL Grammar before Optimization

For illustration purpose, let's simplify the TSQL grammar. The parts we need to focus on are roughly as follows:

```javascript
tsql_file
	: batch* EOF
	;

batch
	: 'GO'
	| sql_clauses+ 'GO'*
	| batch_level_statement 'GO'*
	;

batch_level_statement
	: 'CREATE' 'PROCEDURE' sql_clauses+
	;
```

By closely examining this grammar file, we can identify an ambiguity point. For the `CREATE PROCEDURE` followed by sql_clauses, it is difficult to distinguish which clauses belong to batch_level_statement and which belong to the next batch. Let me illustrate this with an example:

```javascript
CREATE PROCEDURE
	SELECT * FROM t;
	CREATE TABLE t1(a int);
	INSERT INTO t1 values (1), (2);
```

For the example above, we can parse it as follows:

```javascript
tsql_file
	 |
	 |-> batch -> batch_level_statement
						 -> 'CREATE' 'PROCEDURE' sql_clauses+ (three sql_clauses)
```

Alternative

```javascript
tsql_file
	 |
	 |-> batch -> batch_level_statement
	 |	       -> 'CREATE' 'PROCEDURE' sql_clauses (one sql_clause)
	 |
	 |-> batch -> sql_clauses+ (two sql_clauses)
```

Even when reading the last token, it still can't distinguish between the two paths. Therefore, a TSQL parser naturally gets overwhelmed by a nearly 1000-line `CREATE PROCEDURE` statement. It recursively processes the content, ultimately taking almost 100 seconds to realize that even after reaching the last token, it can't distinguish the paths. Finally, it follows the predefined priority and chooses the first parsing scheme

## Leveraging a SQL Server Feature

Now that we have identified the problem, how do we modify the grammar to resolve it? Here, we need to look at a _SQL Server Feature_. SQL Server provides a concept called `Batch`. Within the same batch, you either have a set of regular SQL statements or batch-level statements like `CREATE PROCEDURE`, and the batch separator is typically `GO`. Therefore, what we need to do is accurately reflect this rule in the grammar file and eliminate the ambiguity💡.

## TSQL Grammar after Optimization

```javascript
tsql_file
	: batch_without_go ('GO' batch_without_go)* 'GO'? EOF
	| 'GO'* EOF
	;

batch_without_go
	: sql_clauses+
	| batch_level_statement
	;

batch_level_statement
	: 'CREATE' 'PROCEDURE' sql_clauses+
	;
```

With this revised grammar, we emphasize that batches must be separated by `GO`. For `CREATE PROCEDURE` statements, all sql_clauses belong to the procedure until the next `GO` is encountered. This approach aligns with SQL Server's own definition.

**Testing Time**

Finally, in the benchmark test with the same statement, the time was reduced to 2.3 seconds. Down from 143 seconds, a 70x improvement!

![benchmark](/content/blog/how-we-improved-sql-parser-speed-70x/benchmark.webp)

## Afterword

Reflecting on the process of optimizing our SQL Server parser, it's clear that addressing performance issues requires a deep understanding of both the problem domain and the tools at hand. Here are some key takeaways from this experience:

- **Runtime Considerations:** The current performance of 2.3 seconds is partly due to the Go runtime. Switching to the Java runtime can reduce this time to approximately 850 milliseconds, highlighting the impact of the runtime environment on parser performance.

- **Generalizable Optimization Strategies:** Although the optimization specifically targeted the SQL Server parser, the underlying approach can be generalized to other database parsers. By understanding and leveraging the unique features and constraints of each SQL dialect, similar performance improvements can be achieved.

- **Identifying Ambiguities in Large Grammar Files:** Finding ambiguities in grammar files with thousands of lines can be challenging. However, tools like the [ANTLR plugin for IDEA](https://plugins.jetbrains.com/plugin/7358-antlr-v4) can assist in this process. By providing concrete input examples, these tools help identify and resolve ambiguities more efficiently.

![antlr-plugin](/content/blog/how-we-improved-sql-parser-speed-70x/antlr-idea-plugin.webp)
