---
title: What is DDL and DML in SQL Database?
author: Ayra
updated_at: 2025/04/15 12:00:00
feature_image: /content/blog/what-is-ddl-and-dml-in-sql-database/banner.webp
tags: Explanation
description: A comprehensive guide to understanding Data Definition Language (DDL) and Data Manipulation Language (DML) in SQL databases, including examples, differences, and best practices.
---

This is a series of articles about database schema change / database schema migration:

1. [What is a Database Schema?](/blog/what-is-database-schema)
1. [What is a Database Schema Migration?](/blog/what-is-database-migration)
1. What is DDL and DML in SQL Database? (this one)
1. [How to Handle Database Migration / Schema Change?](/blog/how-to-handle-database-schema-change)
1. [Top Database Schema Migration Tools](/blog/top-database-schema-change-tool-evolution)

---

SQL (Structured Query Language) is the standard language for relational database management systems. SQL commands are divided into several categories based on their functionality. The two most fundamental categories are **Data Definition Language (DDL)** and **Data Manipulation Language (DML)**. Understanding the distinction between these two is crucial for effective database management and development.

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

### DDL Best Practices

1. **Script and Version Control**: Keep all DDL statements in scripts under version control
2. **Test in Development**: Always test DDL changes in non-production environments first
3. **Backup Before Changes**: Take database backups before executing significant DDL operations
4. **Use Transactions When Possible**: For database systems that support transactional DDL, use transactions to ensure atomicity
5. **Document Changes**: Maintain documentation of schema changes for future reference
6. **Consider Performance Impact**: Be aware that some DDL operations lock tables or require significant resources

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

### DML Best Practices

1. **Use Transactions**: Group related DML operations in transactions to maintain data integrity
2. **Limit Batch Sizes**: For large operations, break them into smaller batches to reduce locking and resource usage
3. **Use Prepared Statements**: To improve performance and protect against SQL injection
4. **Include WHERE Clauses**: Always include appropriate WHERE clauses in UPDATE and DELETE statements
5. **Validate Data**: Validate data before inserting or updating
6. **Consider Indexes**: Be aware of how indexes affect DML performance

## Conclusion

### Key Differences Between DDL and DML

| Aspect                  | DDL                                      | DML                                   |
| ----------------------- | ---------------------------------------- | ------------------------------------- |
| **Purpose**             | Defines database structure               | Manipulates data within the structure |
| **Scope**               | Database objects (tables, indexes, etc.) | Data records                          |
| **Common Commands**     | CREATE, ALTER, DROP, TRUNCATE            | SELECT, INSERT, UPDATE, DELETE        |
| **Transaction Control** | Auto-commits (in most DBMSs)             | Can be rolled back                    |
| **Frequency of Use**    | Less frequent                            | More frequent                         |
| **Privilege Level**     | Higher (admin-level)                     | Lower (user-level)                    |
| **Impact**              | Structural changes                       | Data changes                          |

Understanding the distinction between DDL and DML is essential for effective database management. DDL defines your database structure, while DML works with the data inside that structure. Proper use of both ensures database integrity while allowing for necessary evolution as application needs change.

### Database Change Management

Effective database change management requires proper control over both DDL and DML operations. Tools like Bytebase provide features such as [SQL review policies](/docs/sql-review), [version control for schema changes](/docs/vcs-integration), [approval workflows](/docs/change-workflow), [automatic backups](/docs/backup-restore), and [audit capabilities](/docs/audit-logging) to ensure safe and efficient database changes.

## Further Readings

- [What is Database Change Management?](/blog/what-is-database-change-management)
- [What is Database Schema Drift?](/blog/what-is-database-schema-drift)
- [Database-as-Code](/blog/database-as-code)
- [How to Handle Database Schema Change](/blog/how-to-handle-database-schema-change)
