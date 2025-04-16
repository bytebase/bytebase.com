---
title: What is DDL and DML in SQL Database?
author: Ayra
updated_at: 2025/04/15 12:00:00
feature_image: /content/blog/what-is-ddl-and-dml-in-sql-database/banner.webp
tags: Explanation
description: A comprehensive guide to understanding Data Definition Language (DDL) and Data Manipulation Language (DML) in SQL databases, including examples, differences, and best practices.
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

Effective database change management requires proper control over both DDL and DML operations. Tools like Bytebase provide features such as [SQL review policies](/docs/sql-review), [version control for schema changes](/docs/vcs-integration), [approval workflows](/docs/change-workflow), [automatic backups](/docs/backup-restore), and [audit capabilities](/docs/audit-logging) to ensure safe and efficient database changes.
