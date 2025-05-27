---
title: 'Postgres vs. MySQL: DDL Transaction Difference'
author: Tianzhou
updated_at: 2025/05/27 12:00
feature_image: /content/blog/postgres-vs-mysql-ddl-transaction/cover.webp
tags: Explanation
featured: true
description: 'Compare the DDL transaction difference between Postgres and MySQL'
---

Database schema changes are critical operations that require careful planning and execution. The ability to perform these changes safely and reliably is a key consideration when choosing a database management system. In this post, we'll compare how PostgreSQL 17 and MySQL 8 handle Data Definition Language (DDL) transactions, with a focus on atomicity and rollback capabilities.

## Understanding DDL Transactions

Before diving into the comparison, let's clarify what we mean by DDL transactions. DDL statements can be grouped together and either committed as a unit or rolled back entirely if something goes wrong.

There are two important concepts to distinguish:

1. **Transactional DDL**: The ability to include DDL statements within a multi-statement transaction block, with the option to commit or roll back all statements together.

2. **Atomic DDL**: The guarantee that individual DDL statements are atomic (all-or-nothing), but not necessarily supporting their inclusion in multi-statement transactions.

## PostgreSQL 17: True Transactional DDL

In PostgreSQL 17, DDL operations are fully transactional, meaning:

- DDL statements can be included in transaction blocks alongside DML statements
- Multiple DDL operations can be committed or rolled back as a single unit
- Savepoints can be used within transactions that include DDL statements
- If a transaction fails, all DDL changes are rolled back, leaving the database in its original state

There are only a few exceptions to this rule: operations on databases and tablespaces themselves (such as `CREATE DATABASE` or `DROP TABLESPACE`) cannot be rolled back. However, all other catalog operations are reversible.

## MySQL 8: Atomic DDL

Prior to MySQL 8, DDL operations in MySQL were not atomic at all. If a DDL statement failed partway through execution—such as an `ALTER TABLE` operation that was adding multiple columns or indexes—the database could be left in an inconsistent, partially-modified state.

MySQL 8 introduced a feature called **Atomic DDL** which represents a significant improvement over previous versions but differs fundamentally from PostgreSQL's approach.

In MySQL 8, DDL statements are atomic at the statement level, meaning:

- Individual DDL statements are either fully completed or fully rolled back
- DDL statements **implicitly commit** any active transaction before execution
- DDL statements cannot be part of a multi-statement transaction that can be rolled back
- Crash recovery ensures statement-level atomicity

MySQL's atomic DDL is implemented through a special internal `DDL_LOG` table in InnoDB that tracks the creation of files and structures during DDL execution. This log is used at commit/rollback time to clean up properly, ensuring that no orphaned files or index trees remain after a crash.

It's important to note that atomic DDL is only supported in MySQL 8 InnoDB storage engine. For tables using other storage engines, partial updates may still occur.

## Examples

To better understand these differences, let's run some DDLs that demonstrate how DDL transactions behave in both systems.

### PostgreSQL 17

Our 1st example makes all DDL operations wrap in a transaction. When we execute the `ROLLBACK` command, all tables and indexes are removed as if they were never created.

```sql
-- Start a transaction block
BEGIN;

-- Create a simple table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

-- Add an index
CREATE INDEX idx_username ON users(username);

-- Oops! We made a mistake and want to roll back all changes
ROLLBACK;

-- Verify that the table was not created
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'users';
-- Should return no rows, as the transaction was rolled back
```

The 2nd example demonstrates how PostgreSQL allows partial rollbacks using `SAVEPOINT`, giving developers fine-grained control over schema changes.

```sql
BEGIN;

-- Create a table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

-- Create a savepoint
SAVEPOINT after_users_table;

-- Alter the table to add a column
ALTER TABLE users ADD COLUMN email VARCHAR(100);

-- Oops! We only want to roll back the column addition
ROLLBACK TO after_users_table;

-- Add a different column instead
ALTER TABLE users ADD COLUMN active BOOLEAN DEFAULT TRUE;

-- Commit the transaction
COMMIT;
```

### MySQL 8

In this MySQL example, despite wrapping the DDL statements in a transaction block, the `ROLLBACK` command does not undo the table creation. This is because each DDL statement implicitly commits the transaction before executing, making it impossible to roll back multiple DDL statements as a unit.

```sql
-- Try to use a transaction block (note: this won't work as expected for DDL)
START TRANSACTION;

-- Create a simple table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

-- Add an index
CREATE INDEX idx_username ON users(username);

-- Try to roll back all changes (won't work for DDL statements)
ROLLBACK;

-- Verify that the table was created despite the ROLLBACK
SHOW TABLES;
-- Will show 'users' table
```

However, MySQL 8 does provide statement-level atomicity:

```sql
-- This will either create all users or none
CREATE USER 'user1'@'localhost' IDENTIFIED BY 'password1',
           'user2'@'localhost' IDENTIFIED BY 'password2';

-- This will either drop all tables or none
DROP TABLE IF EXISTS table1, table2, table3;
```

## Conclusion

Let's examine the key differences between PostgreSQL 17 and MySQL 8 in how they handle DDL transactions:

| Feature                               | PostgreSQL 17                      | MySQL 8                                                 |
| ------------------------------------- | ---------------------------------- | ------------------------------------------------------- |
| **DDL Transaction Support**           | Full transactional DDL             | Atomic DDL (statement-level only)                       |
| **Multi-statement DDL Transactions**  | Yes                                | No                                                      |
| **DDL Rollback in Transaction**       | Yes                                | No (implicit commit)                                    |
| **Atomicity of Single DDL Statement** | Yes                                | Yes (InnoDB only)                                       |
| **Crash Recovery**                    | Full transaction recovery          | Statement-level recovery                                |
| **Savepoints with DDL**               | Supported                          | Not supported                                           |
| **Exceptions**                        | Database and tablespace operations | Database directory removal not part of atomic operation |
| **Implementation Mechanism**          | Write-Ahead Log (WAL)              | DDL_LOG in InnoDB                                       |

PostgreSQL's transactional DDL provides a higher level of safety for complex schema migrations. By wrapping multiple related changes in a transaction, administrators can ensure that the database remains in a consistent state, even if something goes wrong during the migration process. In contrast, MySQL 8 introduces atomic DDL at the statement level, meaning each individual DDL statement is executed as an all-or-nothing operation. While this is a notable improvement over earlier versions of MySQL, it still does not support multi-statement DDL transactions.

## References

1. PostgreSQL Wiki: [Transactional DDL in PostgreSQL: A Competitive Analysis](https://wiki.postgresql.org/wiki/Transactional_DDL_in_PostgreSQL:_A_Competitive_Analysis)

1. MySQL Documentation: [Atomic Data Definition Statement Support](https://dev.mysql.com/doc/refman/8.4/en/atomic-ddl.html)

1. MySQL Blog: [Atomic DDL in MySQL 8.0](https://dev.mysql.com/blog-archive/atomic-ddl-in-mysql-8-0/)

1. MySQL Documentation: [Statements That Cannot Be Rolled Back](https://dev.mysql.com/doc/refman/8.2/en/cannot-roll-back.html)
