---
title: 'TRUNCATE vs DELETE in SQL: Differences Across PostgreSQL, MySQL, and SQL Server'
author: Adela
updated_at: 2026/03/16 09:00
feature_image: /content/blog/truncate-vs-delete-sql/banner.webp
tags: Explanation
description: 'TRUNCATE and DELETE both remove rows, but they differ in speed, rollback behavior, and locking. Compare how they work in PostgreSQL, MySQL, and SQL Server.'
---

TRUNCATE and DELETE both remove rows from a table, but they work nothing alike under the hood. TRUNCATE drops all rows at once by deallocating the data pages. DELETE removes rows one at a time and logs each removal individually. This difference makes TRUNCATE faster on large tables, but it also means they behave differently with transactions, triggers, and foreign keys.

The bigger surprise: TRUNCATE is not even the same operation across databases. PostgreSQL treats it as a transactional command you can roll back. MySQL treats it as a DDL statement that commits immediately and cannot be undone. If you switch databases without knowing this, you will lose data.

## TRUNCATE vs DELETE at a glance

| | TRUNCATE | DELETE |
|---|---|---|
| Operation type | [DDL](/blog/what-is-ddl-and-dml-in-sql-database/) | [DML](/blog/what-is-ddl-and-dml-in-sql-database/) |
| Removes | All rows (no WHERE clause) | Selected rows (WHERE clause supported) |
| Speed on large tables | Fast (deallocates pages) | Slow (row-by-row logging) |
| Fires row-level triggers | No | Yes |
| Resets auto-increment / identity | Yes | No |
| Returns row count | No | Yes |
| Can be rolled back in PostgreSQL | Yes | Yes |
| Can be rolled back in MySQL | No (implicit commit) | Yes |
| Can be rolled back in SQL Server | Yes (within a transaction) | Yes |

The speed difference is not marginal. DELETE on a 47-million-row table scans every row and writes a WAL entry for each one. That can take hours. TRUNCATE on the same table finishes in under a second because it discards the data files without touching individual rows.

## TRUNCATE in PostgreSQL

PostgreSQL is the most flexible of the three. It wraps TRUNCATE inside transactions, just like any other command, so you can truncate a table and roll it back if something goes wrong.

```sql
BEGIN;
TRUNCATE employees;
-- Changed your mind?
ROLLBACK;
-- All rows are still there.
```

You also get control over auto-increment sequences:

```sql
-- Reset the sequence back to 1
TRUNCATE orders RESTART IDENTITY;

-- Keep the current sequence value
TRUNCATE orders CONTINUE IDENTITY;
```

Both the row removal and the sequence reset are transactional. Roll back, and the sequence returns to its previous value too. This is unusual. Even PostgreSQL's own `ALTER SEQUENCE RESTART` is not transactional outside of a TRUNCATE context.

For tables with foreign key references, PostgreSQL blocks TRUNCATE unless you add `CASCADE`:

```sql
-- This fails if other tables reference "orders"
TRUNCATE orders;

-- This truncates "orders" and any tables that reference it
TRUNCATE orders CASCADE;
```

Be careful with CASCADE. It silently empties every table linked by a foreign key chain, and on a schema with 30+ tables, that chain can reach tables you forgot were connected.

## TRUNCATE in MySQL

Different story. MySQL's TRUNCATE is a DDL statement that [causes an implicit commit](https://dev.mysql.com/doc/refman/8.0/en/implicit-commit.html). Cannot be rolled back.

```sql
START TRANSACTION;
TRUNCATE employees;
-- The TRUNCATE already committed. ROLLBACK does nothing here.
ROLLBACK;
-- The table is empty.
```

This catches people who move from PostgreSQL to MySQL. They write TRUNCATE inside a transaction block expecting safety, and the data is gone the moment the statement runs. No warning, no error. The ROLLBACK succeeds silently and does nothing.

MySQL always resets AUTO_INCREMENT to 1 on TRUNCATE. No option to keep the current value, unlike PostgreSQL's `CONTINUE IDENTITY`.

Foreign keys are also handled differently. MySQL blocks TRUNCATE if the table is referenced by a foreign key from another table, even if the referencing table has zero rows. The workaround:

```sql
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE orders;
SET FOREIGN_KEY_CHECKS = 1;
```

Disabling foreign key checks is a blunt tool. If another session inserts rows referencing the truncated table while checks are off, you get orphaned records with no constraint violation. MySQL will not tell you about them.

## TRUNCATE in SQL Server

SQL Server sits between the two. It allows TRUNCATE inside explicit transactions (like PostgreSQL) but lacks the sequence control options.

```sql
BEGIN TRANSACTION;
TRUNCATE TABLE employees;
-- Safe to roll back
ROLLBACK;
```

The IDENTITY seed always resets. No equivalent to PostgreSQL's `CONTINUE IDENTITY`.

SQL Server is the strictest about foreign keys. It blocks TRUNCATE on any table referenced by a FOREIGN KEY constraint, even if `ON DELETE CASCADE` is defined. No CASCADE option for TRUNCATE, no `FOREIGN_KEY_CHECKS` toggle. Your only choices are DELETE or dropping the constraint entirely.

One edge case worth knowing: TRUNCATE also fails on tables that participate in indexed views or are published through transactional replication.

## When to use TRUNCATE vs DELETE

Use TRUNCATE for bulk cleanup: emptying staging tables between ETL loads, wiping test data, resetting a table after a failed migration. If the table has 10 million rows and you need all of them gone, TRUNCATE is the only practical option.

Use DELETE for everything else. You need a WHERE clause, you need triggers to fire, you need to know exactly how many rows were removed. DELETE is slower but it plays by the rules.

One recommendation: if you are writing application code that removes rows, always use DELETE. TRUNCATE belongs in migration scripts, maintenance jobs, and CI pipelines. Putting TRUNCATE in application logic is asking for trouble when someone adds a foreign key to that table six months later.

## TRUNCATE and foreign keys

All three databases block TRUNCATE when another table holds a foreign key reference. The workarounds differ, and none of them are safe to run blindly.

| Database | Workaround |
|---|---|
| PostgreSQL | `TRUNCATE table CASCADE` (truncates referencing tables too) |
| MySQL | `SET FOREIGN_KEY_CHECKS = 0` before TRUNCATE, re-enable after |
| SQL Server | Drop the foreign key constraint, TRUNCATE, recreate the constraint |

CASCADE can wipe tables you did not intend. Disabling foreign key checks opens a window for orphaned rows. Dropping and recreating constraints on a large schema is slow and error-prone.

If the table has foreign key dependencies, just use DELETE. Slower, but it respects constraints without workarounds and without the risk of silently destroying related data.

## How Bytebase prevents accidental TRUNCATE

Running TRUNCATE on a production table by accident takes seconds. Recovering from it takes hours if you have backups, and is impossible if you don't.

[Bytebase](/) provides [SQL review rules](https://www.bytebase.com/docs/sql-review/review-rules/) that flag or block TRUNCATE statements before they reach production. You can set policies like prohibiting TRUNCATE on production environments, requiring approval for DDL statements, or flagging CASCADE operations that touch multiple tables.

These rules run automatically when a developer submits a SQL change through Bytebase, catching dangerous statements during review rather than after execution. See [The SQL Review Tool for Developers](/blog/sql-review-tool-for-devs/) for how this fits into a team workflow.

## FAQ

**Is TRUNCATE faster than DELETE?**

Yes. TRUNCATE deallocates data pages without scanning or logging individual rows. On tables with millions of rows, TRUNCATE completes in under a second while DELETE can take minutes or hours.

**Does TRUNCATE reset AUTO_INCREMENT?**

Yes in all three databases. PostgreSQL gives you a choice with `RESTART IDENTITY` (reset) or `CONTINUE IDENTITY` (keep current value). MySQL and SQL Server always reset to the starting value.

**Can I TRUNCATE a table with foreign keys?**

Not directly. All three databases block TRUNCATE when another table references the target with a foreign key. PostgreSQL supports `CASCADE` to truncate referencing tables. MySQL requires disabling `FOREIGN_KEY_CHECKS`. SQL Server requires dropping the constraint first.

**Is TRUNCATE a DDL or DML statement?**

TRUNCATE is classified as [DDL (Data Definition Language)](/blog/what-is-ddl-and-dml-in-sql-database/). DELETE is DML. This classification explains why MySQL's TRUNCATE triggers an implicit commit: MySQL auto-commits all DDL statements. PostgreSQL and SQL Server handle it differently by allowing DDL inside transactions. For more on how [PostgreSQL and MySQL handle DDL transactions differently](/blog/postgres-vs-mysql-ddl-transaction/), see our detailed comparison.
