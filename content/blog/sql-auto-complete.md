---
title: How We Built the SQL Autocomplete Framework with ANTLR4
author: Junyi
updated_at: 2024/11/14 21:21:21
feature_image: /content/blog/sql-auto-complete/autocomplete.webp
tags: Engineering
featured: true
description: How Bytebase leverages ANTLR4 to build a framework to implement SQL autocomplete for different SQL dialects.
keypage: true
---

This is a series of articles about SQL parsers:

1. [How We Improved Our SQL Parser Speed by 70x](/blog/how-we-improved-sql-parser-speed-70x)
1. How We Built the SQL Autocomplete Framework with ANTLR4 (this one)

---

## Background

Bytebase is a DevSecOps solution for databases, supporting a wide range of database systems. It provides a web-based [SQL Editor](/sql-editor/) equipped with robust security features, including permission control, data masking, and audit logging. However, beyond these security capabilities, a core feature for any effective SQL client is **autocomplete**.

After researching the mainstream SQL clients in the market, we found that while they perform well for simple queries, they often struggle when faced with more complex SQL statements. In this article, we’ll share how we implement autocomplete in Bytebase SQL Editor to tackle these limitations.

## Problem

Autocomplete (also known as IntelliSense) is a familiar tool that developers use regularly. The problem it addresses is well-defined: providing relevant completion suggestions based on:

1. Input text
1. Predefined syntax rules
1. The given completion position

In essence, autocomplete is a prediction problem that leverages these three contextual factors.

## "Naive" Approach

A naive approach is actually not difficult. We can simulate the user's thought process and establish a series of associative rules to handle scenarios that require auto-completion. Given my work and background, in this article, I will use simple SQL as an example.

```sql
SELECT | FROM t;
```

In the example above, the symbol `|` is used to represent the cursor position, which corresponds to the **given completion position** mentioned earlier. Based on SQL background knowledge, we can infer that the cursor is likely placed to write a column name, and since the text includes `FROM t`, we can reasonably deduce that the column should be from table t.

From this reasoning, we can summarize a simple rule: when attempting to complete fields in the `SELECT` clause, look for the subsequent `FROM` clause, identify the corresponding table name, and provide a list of the table's column names for the user to choose from.

We can refer to such a rule as an empirical rule. While describing it in words is not too difficult, implementing it does present some challenges.

**Step 1 - Identify the cursor position**: We first need to determine the cursor's location. This can be achieved using a parser or tools like regular expressions. Clearly, the complexity of the tools used to check whether the cursor is within the `SELECT` clause is directly proportional to the complexity of the scenarios they need to handle. In simpler cases, tools like regular expressions can suffice, but they may fail with more complex SQL queries, such as those involving subqueries. In these cases, more advanced methods and tools are required.

**Step 2 - Locate the `FROM` clause**: Next, we need to identify the `FROM` clause that follows immediately after, and attempt to parse the table name from it. Fortunately, parsers built with ANTLR4 naturally support **partial parsing** which means we can attempt to parse only the FROM clause without needing to parse the entire query from the beginning.

**Step 3 - Retrieve table structure information**: Finally, based on the parsed table name, we retrieve the table structure information and provide the column names for auto-completion.

Key Insights:

1. By continuously adding such empirical rules, we can progressively improve the set of scenarios that autocomplete handles, thereby enhancing the overall user experience.
1. Empirical rules heavily rely on specific syntax and must be added manually.
1. Different empirical rules may require distinct implementations, with the complexity of each rule correlating to the breadth of scenarios it aims to cover.

## Real-world Challenge

At this point, you may have realized that a naive implementation based on empirical rules is typically only suited for simpler scenarios and syntaxes. This is particularly true for Bytebase, which must handle numerous SQL dialects that are broadly similar but differ in details. A non-scalable solution would quickly lead to an explosion of engineering effort.

In [How We Improved Our SQL Parser Speed by 70x](/blog/how-we-improved-sql-parser-speed-70x), we discussed how Bytebase generates and maintains a parser for each SQL dialect based on ANTLR4. Naturally, the question arises: can we leverage ANTLR4 to create a solution for implementing autocomplete across different dialects that offers both extensibility and strong completion capabilities?

## Parser & ANTLR4

Here, we need to discuss the essence of a parser.

From a functional perspective, a parser is essentially a tool that takes a string of text and converts it into structured data according to predefined syntax rules. From an implementation standpoint, a parser is essentially a mechanism that transforms the predefined syntax rules into an [automaton](https://en.wikipedia.org/wiki/Automaton). This automaton then performs state transitions based on the input, ultimately determining whether the input conforms to the syntax rules based on its final state.

Specifically, for ANTLR4, the ANTLR4 generator creates a state machine called the **Augmented Transition Network (ATN)** based on a written grammar file (`.g4`). The ATN is an automaton that represents the grammar of the language.

When an ANTLR4-based parser processes an input string, it transitions through states based on the ATN, until it reaches a final state or the input is exhausted. This state machine-driven process allows ANTLR4 to recognize and validate whether the input conforms to the specified grammar.

For a parser, if the input string is valid, it will construct and return a parse tree (or abstract syntax tree, AST), which represents the syntactic structure of the input according to the grammar. However, if the input string is invalid, the parser will throw an error and will not proceed further. This behavior ensures that the parser only processes valid input, adhering strictly to the defined grammar rules.

```sql
SELECT a FROM t;
```

![tree](/content/blog/sql-auto-complete/parser-tree.webp)

In the example above, I use ellipses to represent grammar rules, while rounded rectangles represent terminals (tokens).

However, for the previously mentioned autocomplete example:

```sql
SELECT | FROM t;
```

The parser would fail to parse the `SELECT items` and thus halt the parsing process.

## Automation? Automaton!

So, how does this relate to autocomplete? Earlier, when discussing the naive approach, we mentioned that autocomplete is essentially a prediction problem — we want to predict the user's intended input. Importantly, this prediction is not arbitrary; it must adhere to predefined syntax rules.

Now that we know syntax rules are converted into an automaton by ANTLR4, we can apply a state-machine-based approach to autocomplete!

We can try transitioning through states in the automaton. When we reach the cursor position (the point where autocomplete is triggered), the set of valid next states becomes limited. These valid next states represent the possible autocomplete suggestions at that position. Essentially, the automaton guides us to predict what the next valid input could be, based on the syntax rules, and these predictions can be used as autocomplete options.

So, what autocomplete needs to do is:

1. Receive the input string and stop at the cursor position.
1. Examine the current state and the possible valid state transitions.
1. Convert the acceptable transitions into text and return them as autocomplete suggestions.

As you can see, this new approach is not fundamentally different from the naive method. Both approaches aim to predict the next valid input. The key difference is that the naive approach relies on specific, syntax-dependent empirical rules, which makes its implementation inherently tied to particular grammar structures. In contrast, the automaton-based approach is grounded in a universal mechanism that applies across SQL dialects. This makes it syntax-agnostic at least during the first two steps of the process (receiving the input and examining state transitions).

The same underlying core enables cross-syntax extensibility. This is the remarkable capability that ANTLR4 brings, and it's one of the key advantages it offers — the ability to provide an extensible solution for autocomplete across various SQL dialects.

## Cross-SQL Dialect Autocomplete on ANTLR4

Now that we've identified the core approach, we need to return to the real-world problem at hand. Bytebase aims to provide accurate and effective SQL autocomplete functionality across different SQL dialects.

In practice, we've found that users typically expect the SQL autocomplete feature to handle several common scenarios, such as:

**Scenario 1: Keywords in SQL can be long or hard to remember, so users want autocomplete suggestions after typing just a few characters.**

Solution: The completion of SQL keywords is essentially a matter of transitioning to terminal symbols in the automaton's state transitions. These keyword definitions are part of the lexical syntax rules, so this can be handled in a syntax-agnostic manner.

**Scenario 2: Providing completions for table names, column names, function names, etc., at appropriate places, similar to variable name completion in programming languages.**

Solution: In SQL, these names can be grouped as Identifiers, which are defined by specific syntax rules. We don't need to find the corresponding terminal symbols for each case; instead, we can focus on identifying relevant syntax rules and, with additional information (like database schema), provide the appropriate table names, column names, functions, etc. This, too, can be done in a syntax-agnostic way for the most part.

**Scenario 3: Suggesting less commonly used SQL syntax, such as how to write the next part of an `ALTER TABLE` statement, or other similar code snippet completions.**

Solution: This is akin to code snippet completions, like how `FOR LOOP` or other code structures are completed in languages like C. It involves predicting common patterns and SQL syntax structures, which can be handled with specific rules or templates.

Here, we will focus on scenarios 1 and 2.

The entire autocomplete architecture is actually very simple and consists of two parts:

1. **Syntax-Agnostic Code Completion Core based on ANTLR4**. It uses the automaton and input to identify terminal symbols (keywords) and the grammar rules of interest (Identifiers). We refer to the latter as Candidate Rules.

1. **Syntax-Specific Post-Processing**. It primarily converts the candidate rules into corresponding strings and returns them to the user.

## Autocomplete Core on ANTLR4

Thanks to ANTLR4! The ANTLR4 runtime provides interfaces for using and manipulating the ATN, which makes it easy for us to do what we need with the ATN.

The general idea here is to first traverse the ATN to the cursor position, then find the possible subsequent states from the current state. These possible subsequent states are referred to as the `Follow Set`. We then check the `Follow Set` to see if it contains any syntax rules or terminals that we are interested in. After that, we collect these candidates and pass them to the next stage.

Here’s a small optimization: it's clear that the `Follow Set` only depends on the ATN, so we can pre-compute and cache all the `Follow Sets` for each specific grammar. This way, we don't need to recalculate them every time we perform autocomplete.

The approach here is fairly straightforward, but the technical implementation details are quite extensive. Due to space constraints, we won't go into further explanation here. Let's save that for the next article!

## Grammars

After receiving the candidates, we need to classify and process them.

For **terminals**, there isn't much processing required; we simply find the corresponding string for the terminal symbol and return it.

For **candidate rules**, we need to handle them in a categorized manner. Here, we will take table names and column names as examples.

Let's first assume a simplified SQL syntax:

```sql
SelectStatement:
	SelectClause FromClause SEMICOLON;

SelectClause:
	SELECT SelectItems;

FromClause:
	FROM FromItems;

SelectItems:
	ColumnName (COMMA ColumnName)*;

ColumnName:
	(TableName DOT)? Identifier; // Lower performance but more readable.

FromItems:
	TableName (COMMA TableName)*;

TableName:
	Identifier;
```

For the syntax mentioned above, the rules we are typically interested in are `TableName` and `ColumnName`. Let's now look at the following example:

```sql
SELECT * FROM ｜
```

Using the autocomplete core, we can determine that the candidate rule contains a `TableName`. From there, we simply need to look up all the `TableName` entries in the schema information and return them to the user.

The example for column names is a bit more complicated:

```sql
SELECT | FROM t;
```

Similarly, through the autocomplete core, we can identify that the candidate rule contains a `ColumnName`. The simplest approach would be to return all column names from the schema. However, a clear observation here is that the `FROM t` clause restricts the column names to those that belong to table `t`.

Since the autocomplete core only parses up to the cursor position, it doesn't have information about the `FROM` clause. Therefore, we need to do some additional work:

1. We can use ANTLR4's Lexer to locate the `FROM` keyword that follows.
1. With ANTLR4’s partial parsing capabilities, we try to parse `FROM t` as a `FromClause`.
1. Once we have the parse tree, we can extract the table name `t`. This requires using ANTLR4's `Visitor/Listener` pattern.
1. Once we have the table name from the `FROM` clause, we can return only the columns belonging to table `t` to the user.

## Afterwords

This article mainly introduces the thought process behind how Bytebase built an autocomplete framework with cross-SQL dialect capabilities. The journey and ideas shared here aim to offer some insights and inspiration to the readers.

The example provided is highly simplified for ease of understanding, but the real-world scenarios are much more complex. This includes, but is not limited to, subqueries, nested statements, CTEs (Common Table Expressions), and so on. If you're interested, stay tuned for future articles where we will dive deeper into the full implementation, including how to use the ANTLR4-based autocomplete core, syntax-specific processing, and how to integrate with [LSP (Language Server Protocol)](https://en.wikipedia.org/wiki/Language_Server_Protocol) to provide a complete and robust SQL autocomplete.

It’s evident that some dialect-specific work still needs to be done to ensure a sufficiently good autocomplete experience. There's no denying that this approach drastically reduces development and maintenance costs, allowing a small team to maintain autocomplete functionalities for multiple dialects. Currently, Bytebase has implemented and maintains autocomplete modules for five different dialects based on this framework. They are
all open-sourced:

- [Oracle](https://github.com/bytebase/bytebase/blob/main/backend/plugin/parser/plsql/completion.go)
- [SQL Server](https://github.com/bytebase/bytebase/blob/main/backend/plugin/parser/tsql/completion.go)
- [PostgreSQL](https://github.com/bytebase/bytebase/blob/main/backend/plugin/parser/pg/completion.go)
- [MySQL](https://github.com/bytebase/bytebase/blob/main/backend/plugin/parser/mysql/completion.go)
- [DynamoDB](https://github.com/bytebase/bytebase/blob/main/backend/plugin/parser/partiql/completion.go)

Due to Bytebase's tech stack choice, we implemented the ANTLR4-based autocomplete core in Golang, and we've also [open-sourced it](https://github.com/bytebase/bytebase/blob/main/backend/plugin/parser/base/c3.go).

During implementation, we also identified several areas for improvement in the ANTLR4 Golang runtime. We are actively verifying and contributing to upstream improvements. Let's work together to make ANTLR4 even better!

## You don't Need to Reinvent the Wheel

We’ve been working on SQL Editor autocomplete for about two years, and we’re still refining it. You don't need to go through this again and can just adopt Bytebase SQL Editor directly:

- Let your developers visit the Bytebase console and interact with the database from SQL Editor.
- [Embed SQL Editor](https://docs.bytebase.com/tutorials/embed-sql-editor/) into your own internal web portal.

<HintBlock type="info">

You can try the demo at https://sql-editor.com (no sign-up required).

</HintBlock>

## References

- https://github.com/antlr/antlr4
- The Definitive ANTLR 4 Reference
- https://www.abstractsyntaxseed.com/blog/antlr4-autocomplete-library/introduction
- https://github.com/mike-lischke/antlr4-c3 - a TypeScript c3 implementation
