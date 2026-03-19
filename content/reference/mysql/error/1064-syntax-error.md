---
title: 'ERROR 1064 (42000): You Have an Error in Your SQL Syntax'
updated_at: 2026/03/19 09:00:00
---

## Error message

```sql
ERROR 1064 (42000): You have an error in your SQL syntax;
check the manual that corresponds to your MySQL server version
for the right syntax to use near '...' at line N
```

## Description

MySQL error 1064 means the parser could not understand your SQL statement. The `near '...'` portion of the message shows where MySQL gave up trying to parse. Everything before that point was accepted; the error starts at (or just before) the quoted text.

This is the single most common MySQL error. It covers everything from a missing comma to using a reserved word as a column name.

## Causes

- **Typos in SQL keywords.** `SELCET`, `UDPATE`, `FORM` instead of `SELECT`, `UPDATE`, `FROM`.
- **Missing or extra punctuation.** Unmatched parentheses, missing commas between column definitions, trailing commas before a closing parenthesis.
- **Using a reserved word as an identifier.** Column or table names like `order`, `group`, `key`, `status`, `rank`, `index` conflict with MySQL keywords.
- **Version mismatch.** Syntax valid in MySQL 8.0 (like `LATERAL`, window functions, or `WITH` CTEs) fails on MySQL 5.7.
- **Importing a dump from a different engine.** A PostgreSQL or SQL Server dump contains syntax MySQL does not recognize.
- **Wrong string quoting.** Using double quotes for strings instead of single quotes (unless `ANSI_QUOTES` SQL mode is enabled).
- **Invisible characters.** Copy-pasting SQL from a web page or PDF can introduce non-breaking spaces or zero-width characters that look fine but break parsing.

## Solutions

1. **Read the error message carefully.** MySQL tells you exactly where parsing failed. The text after `near` is the first thing it couldn't parse:

   ```sql
   -- Error: ... near 'FROM users WHERE id = 1' at line 1
   -- The problem is right before FROM — likely a missing column name or comma
   ```

2. **Escape reserved words with backticks:**

   ```sql
   -- Fails: order is a reserved word
   SELECT * FROM order WHERE id = 1;

   -- Works
   SELECT * FROM `order` WHERE id = 1;
   ```

3. **Check for missing commas and parentheses:**

   ```sql
   -- Fails: missing comma between columns
   CREATE TABLE users (
     id INT PRIMARY KEY
     name VARCHAR(100)    -- missing comma on previous line
   );

   -- Works
   CREATE TABLE users (
     id INT PRIMARY KEY,
     name VARCHAR(100)
   );
   ```

4. **Remove trailing commas:**

   ```sql
   -- Fails: trailing comma before closing parenthesis
   INSERT INTO users (name, email,) VALUES ('Alice', 'alice@example.com');

   -- Works
   INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
   ```

5. **Check your MySQL version:**

   ```sql
   SELECT VERSION();
   ```

   If you're using MySQL 5.7 and the query uses 8.0+ syntax (CTEs, window functions, `GROUPING`), rewrite it or upgrade.

6. **Strip invisible characters.** Re-type the query manually in your SQL client rather than pasting from a browser or document.

## Common scenarios

**WordPress and CMS database imports:** Importing a `.sql` dump into a different MySQL version often triggers 1064 on statements like `CREATE TABLE` that use newer column types or options. Check the MySQL version at the source and target.

**ORM-generated queries:** When an ORM builds SQL that references a reserved word as a column name without backticks, you get 1064. Most ORMs have a setting to force-quote identifiers.

**Stored procedures and triggers:** Syntax errors inside `BEGIN...END` blocks are harder to spot. Simplify the procedure to the minimum and add statements back one at a time.

<HintBlock type="info">

Bytebase's [SQL Review](/docs/sql-review/review-rules/) checks SQL syntax and common mistakes before changes reach your database. You can configure rules for [MySQL naming conventions](/reference/mysql/how-to/top-mysql-commands-with-examples/) and reserved word usage.

</HintBlock>
