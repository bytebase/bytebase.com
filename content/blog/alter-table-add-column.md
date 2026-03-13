---
title: 'ALTER TABLE ADD COLUMN Across PostgreSQL, MySQL, and SQL Server'
author: Adela
updated_at: 2026/03/12 09:00
feature_image: /content/blog/alter-table-add-column/banner.webp
tags: Explanation
description: 'How ALTER TABLE ADD COLUMN works in PostgreSQL, MySQL, and SQL Server, with syntax differences, default value pitfalls, and locking behavior.'
---

`ALTER TABLE ADD COLUMN` appends a new column to an existing table. The basic syntax is similar across databases, but default values, NOT NULL constraints, and locking behavior differ in ways that matter on production tables with millions of rows.

## Syntax overview

| | PostgreSQL | MySQL | SQL Server |
|---|---|---|---|
| Basic | `ALTER TABLE t ADD COLUMN c type;` | `ALTER TABLE t ADD COLUMN c type;` | `ALTER TABLE t ADD c type;` |
| With default | `ADD COLUMN c type DEFAULT val` | `ADD COLUMN c type DEFAULT val` | `ADD c type DEFAULT val` |
| NOT NULL + default | `ADD COLUMN c type NOT NULL DEFAULT val` | `ADD COLUMN c type NOT NULL DEFAULT val` | `ADD c type NOT NULL DEFAULT val` |
| Multiple columns | Comma-separated | Comma-separated | Comma-separated |
| Column position | Not supported | `FIRST` or `AFTER col` | Not supported |
| IF NOT EXISTS | Supported (PG 9.6+) | Not supported | Not supported |

The `COLUMN` keyword is optional in PostgreSQL and MySQL, and not used in SQL Server. All three databases let you add multiple columns in a single statement.

## ALTER TABLE ADD COLUMN in PostgreSQL

```sql
-- Add a nullable column (instant, no table rewrite)
ALTER TABLE orders ADD COLUMN notes TEXT;

-- Add a column with default (instant in PG 11+, table rewrite in PG 10 and earlier)
ALTER TABLE orders ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending';

-- Add only if the column doesn't already exist (PG 9.6+)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT;
```

PostgreSQL 11 changed how defaults work. Before PG 11, adding a column with `DEFAULT` rewrote every row in the table. On a 50-million-row table, that meant a long `ACCESS EXCLUSIVE` lock that blocked all reads and writes.

Starting with PG 11, non-volatile defaults (constant values, `CURRENT_TIMESTAMP`) are stored as metadata. The database returns the default for existing rows without touching them. Volatile defaults like `random()` or `gen_random_uuid()` still trigger a full [table rewrite](/blog/postgres-table-rewrite/).

For full [ALTER TABLE](/reference/postgres/how-to/how-to-alter-table-postgres/) syntax, see the Postgres reference page.

## ALTER TABLE ADD COLUMN in MySQL

```sql
-- Add a column at the end
ALTER TABLE orders ADD COLUMN notes TEXT;

-- Add a column at a specific position
ALTER TABLE orders ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending' AFTER order_date;

-- Add a column as the first column
ALTER TABLE orders ADD COLUMN id BIGINT FIRST;
```

MySQL is the only one of the three databases that supports column positioning with `FIRST` and `AFTER`. PostgreSQL and SQL Server always add columns at the end.

Starting with MySQL 8.0, [online DDL](/blog/mysql-online-ddl/) supports `ALGORITHM=INSTANT` for ADD COLUMN, which makes it a metadata-only change. Before 8.0, even `ALGORITHM=INPLACE` rebuilt the table internally. If you don't specify an algorithm, MySQL picks the fastest available option automatically (INSTANT, then INPLACE, then COPY).

One limitation: each INSTANT column change increments a row version counter. After 64 versions (255 in MySQL 9.1+), MySQL falls back to INPLACE, which rebuilds the table. You can check the counter with:

```sql
SELECT TOTAL_ROW_VERSIONS FROM INFORMATION_SCHEMA.INNODB_TABLES
WHERE NAME = 'your_schema/orders';
```

For full [ALTER TABLE](/reference/mysql/how-to/how-to-alter-table-mysql/) syntax, see the MySQL reference page.

## ALTER TABLE ADD COLUMN in SQL Server

```sql
-- Add a nullable column
ALTER TABLE orders ADD notes NVARCHAR(MAX);

-- Add a NOT NULL column with a default
ALTER TABLE orders ADD status VARCHAR(20) NOT NULL DEFAULT 'pending';
```

SQL Server 2012 Enterprise Edition and later handle `NOT NULL` columns with constant defaults as a metadata-only operation. The default value is stored internally and returned for existing rows without updating them. Standard Edition still rewrites every row.

Volatile defaults like `NEWID()` trigger row-by-row updates regardless of edition. LOB types (`VARCHAR(MAX)`, `NVARCHAR(MAX)`, `XML`) also cannot be added as metadata-only.

## Default values and NOT NULL

Adding a `NOT NULL` column to a table that already has rows requires a `DEFAULT` value. Without one, the database cannot fill existing rows and the statement fails:

```sql
-- This fails if the table has any rows
ALTER TABLE orders ADD COLUMN priority INT NOT NULL;
-- ERROR: column "priority" of relation "orders" contains null values
```

The fix that works across all three databases:

```sql
ALTER TABLE orders ADD COLUMN priority INT NOT NULL DEFAULT 3;
```

On modern versions (PostgreSQL 11+, MySQL 8.0+, SQL Server 2012+ Enterprise), this is a metadata-only operation for constant defaults. On older versions, it triggers a full table rewrite.

If you need more control, the three-step approach avoids long locks:

1. Add the column as nullable (instant)
2. Backfill the value in batches
3. Add the NOT NULL constraint

In PostgreSQL 12+, step 3 can use a `NOT VALID` check constraint that validates without an exclusive lock:

```sql
ALTER TABLE orders ADD COLUMN priority INT;
UPDATE orders SET priority = 3 WHERE priority IS NULL;
ALTER TABLE orders ADD CONSTRAINT orders_priority_nn
  CHECK (priority IS NOT NULL) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT orders_priority_nn;
```

The `VALIDATE CONSTRAINT` step scans all rows but only holds a `SHARE UPDATE EXCLUSIVE` lock, which still allows concurrent reads and writes.

## Avoiding downtime on large tables

Even when the [DDL](/blog/what-is-ddl-and-dml-in-sql-database/) statement itself is fast, large tables need extra care.

**PostgreSQL lock queue problem.** `ALTER TABLE` requests an `ACCESS EXCLUSIVE` lock. If a long-running query already holds a conflicting lock, the ALTER waits in the queue, and every subsequent query stacks behind it. Set a `lock_timeout` to fail fast instead of blocking the entire table:

```sql
SET lock_timeout = '3s';
ALTER TABLE orders ADD COLUMN notes TEXT;
```

If it times out, retry when the long-running queries finish. For more strategies, see [Postgres schema migration without downtime](/blog/postgres-schema-migration-without-downtime/).

**MySQL large table options.** For MySQL versions before 8.0, or for operations that don't support `ALGORITHM=INSTANT`, external tools can add columns without locking the table. [pt-online-schema-change uses triggers to sync data to a shadow table, while gh-ost reads the binary log instead](/blog/gh-ost-vs-pt-online-schema-change/). Both allow concurrent reads and writes during the migration.

For more strategies, see the [MySQL schema migration best practice](/blog/mysql-schema-migration-best-practice/) guide and the reference pages on altering [large tables in MySQL](/reference/mysql/how-to/how-to-alter-large-table-mysql/) and [large tables in PostgreSQL](/reference/postgres/how-to/how-to-alter-large-table-postgres/).

## How Bytebase reviews ALTER TABLE changes

[Bytebase](/) provides automated SQL review that catches risky ADD COLUMN operations before they reach production. Its review rules can flag:

- A `NOT NULL` column added without a `DEFAULT` value
- Missing `IF NOT EXISTS` guard (PostgreSQL)
- Operations that would trigger a table rewrite on large tables

These checks run in CI/CD pipelines or during manual review, so the team catches problems at review time instead of during a production deploy.

## FAQ

**Can I add a column at a specific position?**

Only in MySQL, using `FIRST` or `AFTER column_name`. PostgreSQL and SQL Server always add columns at the end. Reordering requires recreating the table.

**Does ADD COLUMN lock the table?**

Briefly, yes. All three databases acquire a metadata lock. On PostgreSQL 11+ and MySQL 8.0+ with INSTANT DDL, the lock is held for milliseconds. On older versions with table rewrites, the lock lasts for the entire operation.

**Can I add multiple columns in one statement?**

Yes, in all three databases. Separate each column definition with a comma:

```sql
ALTER TABLE orders
  ADD COLUMN notes TEXT,
  ADD COLUMN priority INT DEFAULT 3;
```

**What happens if the column already exists?**

PostgreSQL supports `IF NOT EXISTS` (PG 9.6+) to skip silently. MySQL and SQL Server raise an error. In those databases, check the schema first or handle the error in your migration tool.
