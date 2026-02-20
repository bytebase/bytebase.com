---
title: 'DDL vs DML in SQL: What is Data Definition Language and Data Manipulation Language?'
author: Ayra
updated_at: 2026/02/20 12:00:00
feature_image: /content/blog/what-is-ddl-and-dml-in-sql-database/banner.webp
tags: Explanation
description: 'Learn the difference between DDL and DML in SQL databases. DDL (Data Definition Language) defines database structure with CREATE, ALTER, DROP. DML (Data Manipulation Language) manages data with SELECT, INSERT, UPDATE, DELETE. Includes examples and comparison table.'
---

SQL (Structured Query Language) is the standard language for relational database management systems. SQL commands are divided into several categories based on their functionality. The two most fundamental categories are **Data Definition Language (DDL)** and **Data Manipulation Language (DML)**.

## What is Data Definition Language (DDL)?

Data Definition Language (DDL) refers to SQL commands that define, modify, or remove database objects such as tables, indexes, and schemas. DDL statements create the structure that will hold the data but do not manipulate the data itself.

### Common DDL Commands

1. **CREATE**: Establishes new database objects

   ```sql
   CREATE TABLE employees (
     id INT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     department VARCHAR(50),
     salary DECIMAL(10,2)
   );
   ```

2. **ALTER**: Modifies existing database objects

   ```sql
   ALTER TABLE employees
   ADD COLUMN hire_date DATE;
   ```

3. **DROP**: Removes database objects

   ```sql
   DROP TABLE employees;
   ```

4. **TRUNCATE**: Removes all records from a table without logging individual row deletions

   ```sql
   TRUNCATE TABLE employees;
   ```

5. **RENAME**: Changes the name of an existing object
   ```sql
   RENAME TABLE employees TO staff;
   ```

### Characteristics of DDL

- DDL statements automatically commit the current transaction in most database systems
- Changes made by DDL are recorded in the data dictionary

## What is Data Manipulation Language (DML)?

Data Manipulation Language (DML) consists of SQL commands that manipulate the data stored within database objects. These statements allow you to insert, retrieve, modify, and delete data.

### Common DML Commands

1. **SELECT**: Retrieves data from one or more tables

   ```sql
   SELECT name, department, salary
   FROM employees
   WHERE salary > 50000;
   ```

2. **INSERT**: Adds new records into a table

   ```sql
   INSERT INTO employees (id, name, department, salary)
   VALUES (101, 'John Doe', 'Engineering', 75000);
   ```

3. **UPDATE**: Modifies existing records

   ```sql
   UPDATE employees
   SET salary = salary * 1.1
   WHERE department = 'Engineering';
   ```

4. **DELETE**: Removes records from a table

   ```sql
   DELETE FROM employees
   WHERE id = 101;
   ```

5. **MERGE**: Performs insert, update, or delete operations based on a condition
   ```sql
   MERGE INTO target_table
   USING source_table
   ON (target_table.id = source_table.id)
   WHEN MATCHED THEN UPDATE SET target_table.value = source_table.value
   WHEN NOT MATCHED THEN INSERT (id, value) VALUES (source_table.id, source_table.value);
   ```

### Characteristics of DML

- DML statements can be rolled back (except in auto-commit mode)
- DML operations are logged, enabling recovery and audit capabilities

## Key Differences Between DDL and DML

| Aspect                  | DDL                                      | DML                                   |
| ----------------------- | ---------------------------------------- | ------------------------------------- |
| **Purpose**             | Defines database structure               | Manipulates data within the structure |
| **Scope**               | Database objects (tables, indexes, etc.) | Data records                          |
| **Common Commands**     | CREATE, ALTER, DROP, TRUNCATE            | SELECT, INSERT, UPDATE, DELETE        |
| **Transaction Control** | Auto-commits (in most DBMSs)             | Can be rolled back                    |
| **Frequency of Use**    | Less frequent                            | More frequent                         |
| **Privilege Level**     | Higher (admin-level)                     | Lower (user-level)                    |
| **Impact**              | Structural changes                       | Data changes                          |

## Other SQL Language Categories: DCL, TCL, and DQL

Beyond DDL and DML, SQL commands are also categorized into:

- **DCL (Data Control Language)**: Commands like `GRANT` and `REVOKE` that manage user permissions and access control.
- **TCL (Transaction Control Language)**: Commands like `COMMIT`, `ROLLBACK`, and `SAVEPOINT` that manage database transactions.
- **DQL (Data Query Language)**: Some classifications separate `SELECT` from DML into its own category since it only retrieves data without modifying it.

## DDL vs DML: When to Use Each

| Scenario | Use DDL | Use DML |
|----------|---------|---------|
| Creating a new table | `CREATE TABLE` | — |
| Adding data to a table | — | `INSERT INTO` |
| Adding a new column | `ALTER TABLE ADD COLUMN` | — |
| Updating existing records | — | `UPDATE` |
| Removing a table entirely | `DROP TABLE` | — |
| Removing specific rows | — | `DELETE FROM` |
| Changing column data type | `ALTER TABLE ALTER COLUMN` | — |
| Querying data | — | `SELECT` |

## Best Practices for DDL and DML Operations

### DDL Best Practices

1. **Always back up before schema changes** — DDL operations like `DROP` and `TRUNCATE` are irreversible in most databases.
2. **Use version control for schema changes** — Track DDL statements in migration scripts to maintain a history of database structure changes.
3. **Test DDL in staging first** — Schema changes can impact application behavior and should be validated before production deployment.
4. **Use online DDL where possible** — For large tables, operations like `CREATE INDEX CONCURRENTLY` (PostgreSQL) avoid locking the table.

### DML Best Practices

1. **Use transactions for multi-statement operations** — Wrap related DML statements in transactions to maintain data consistency.
2. **Always include WHERE clauses in UPDATE and DELETE** — Omitting WHERE affects all rows in the table.
3. **Use parameterized queries** — Prevent SQL injection by avoiding string concatenation in DML statements.
4. **Monitor and optimize slow queries** — Use `EXPLAIN` to analyze query execution plans.

## Managing DDL and DML with Bytebase

Effective database change management requires proper control over both DDL and DML operations. Tools like Bytebase provide features such as [SQL review policies](https://docs.bytebase.com/sql-review), [version control for schema changes](https://docs.bytebase.com/gitops), [approval workflows](https://docs.bytebase.com/change-workflow), [automatic backups](https://docs.bytebase.com/backup-restore), and [audit capabilities](https://docs.bytebase.com/audit-logging) to ensure safe and efficient database changes.

## FAQ

### What is the difference between DDL and DML?

DDL (Data Definition Language) defines and modifies the structure of database objects like tables, indexes, and schemas using commands like CREATE, ALTER, and DROP. DML (Data Manipulation Language) manipulates the data within those objects using commands like SELECT, INSERT, UPDATE, and DELETE.

### What are the 5 DDL commands?

The five main DDL commands are: CREATE (creates new database objects), ALTER (modifies existing objects), DROP (removes objects), TRUNCATE (removes all data from a table), and RENAME (changes the name of an object).

### Is SELECT a DDL or DML command?

SELECT is a DML (Data Manipulation Language) command. It retrieves data from one or more tables. Some classifications place SELECT under a separate category called DQL (Data Query Language), but it is traditionally grouped with DML.

### Does DDL auto-commit?

In most database systems (MySQL, Oracle, SQL Server), DDL statements automatically commit the current transaction. However, PostgreSQL supports transactional DDL, meaning DDL statements can be included within a transaction and rolled back if needed.

### What is the difference between DELETE (DML) and TRUNCATE (DDL)?

DELETE is a DML command that removes specific rows based on a WHERE clause and can be rolled back. TRUNCATE is a DDL command that removes all rows from a table, auto-commits in most databases, and is faster because it does not log individual row deletions.
