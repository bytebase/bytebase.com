---
title: Risk Center Best Practice
author: Cayden
updated_at: 2025/04/08 16:15
tags: Tutorial
integrations: General
category: 'Database CI/CD (GUI)'
level: Beginner
estimated_time: '30 mins'
description: This tutorial shows you how to configure risk rules in Bytebase to manage changes effectively.
---

Database changes are high-stakes operations that can affect data integrity, performance, and business continuity. As teams scale, manually assessing risks becomes impractical.

Bytebase simplifies this with automated risk assessment, allowing you to define risk conditions and enforce security policies. In this tutorial, we'll show you how to configure risk rules in Bytebase to manage changes effectively.

## Bytebase Risk Identification

The risk assessment feature Bytebase provides, enables developers to automatically identify the risk level of every database change by defining various risk conditions and associating them with different security policies.

Bytebase allows risk conditions to be customized for different database operations, including **DDL**, **DML**, **data export**, and **query role requests**. The specific risk conditions include:

- **environment_id:** The environment in which the database resides (e.g., Test, Production).
- **project_id:** The project to which the target database belongs.
- **database_name:** The specific database name.
- **table_name:** The specific table name.
- **table_rows:** The total number of rows in a table, estimated from database statistics.
- **db_engine:** The database engine type (e.g., MySQL, PostgreSQL).
- **affected_rows:** The number of rows impacted by an SQL statement, estimated using database statistics and execution plans.
- **sql_type:** The classification of SQL statements, including:

  - **DML:** DELETE, INSERT, UPDATE
  - **DDL:** DROP, CREATE, ALTER, RENAME, TRUNCATE (applied to tables, views, indexes, and other database objects)

- **sql_statement:** Specific characteristics of the SQL statement, such as containing certain keywords.

Users can customize risk rules by combining these conditions based on their development standards and business requirements, assigning each rule a **high**, **medium**, or **low** risk level. When a change request is created, Bytebase automatically scans the SQL and provides a risk assessment based on predefined rules. **If an SQL statement matches multiple risk rules, the highest applicable risk level will be used for the final assessment**.

## Best Practices for Configuring Risk Rules

### Building Core Rule Sets Based on Four Key Conditions

To effectively assess the risk level of database changes, four key risk conditions should be prioritized: **environment_id**, **affected_rows**, **table_rows**, and **sql_type**.

- **environment_id:**

  - Production environments should always be considered **high** risk.
  - Pre-production environments (e.g., UAT) can be classified as **moderate** risk.
  - Development and testing environments can be set to **low** risk.

  _If it's a pipeline rollout, only the highest risk level will be applied._

- **affected_rows:** (Primarily for DML operations such as UPDATE and DELETE):

  - In production, any single modification affecting more than 1,000 rows should be considered **high** risk.

- **table_rows:** (Primarily for DDL operations):

  - If a table contains more than 10 million rows, any schema change should be considered **high** risk.

- **sql_type:** Separate Risk Rules for DDL and DML
  - **DML:** UPDATE and DELETE operations should be considered **high** risk.
  - **DDL:** The following operations should be considered **high** risk across all database objects:
    - DROP, ALTER, RENAME, TRUNCATE
    - CREATE INDEX

### Adding Additional Conditions Based on Business Requirements

In addition to the key risk conditions, you can incorporate more risk conditions based on specific business requirements, enabling more precise risk identification and control.

- **project_id**: Focus on critical projects, reducing unnecessary alerts for non-essential databases.
- **database_name**: Restrict monitoring to critical databases that require stricter change controls.
- **table_name**:
  - If statistical information is inaccurate, making row-based risk assessment unreliable, explicitly defining critical tables can enhance precision.
  - For highly sensitive tables where no modifications are allowed, explicitly listing them ensures they are strictly controlled.

### Risk Rule Examples

**High-Risk policy for DDL:**

- All backward compatibility breaking changes in production databases

  ```text
     environment_id == Prod
  and
  sql_type not in (CREATE_EXTENSION, CREATE_FUNCTION, CREATE_PLACEMENT_POLICY, CREATE_SCHEMA, CREATE_SEQUENCE, CREATE_TABLE, CREATE_TRIGGER, CREATE_TYPE, CREATE_VIEW)
  ```

- All DDL operations in large tables in production databases

  ```text
     environment_id == Prod
  and
  table_rows > 10000000
  ```

- All DDL operations in critical databases in production databases

  ```text
     environment_id == Prod
  and
  database_name in (prod_db1, prod_db2)
  ```

- All DDL operations in critical tables in production databases

  ```text
     environment_id == Prod
  and
  table_name in (table1, table2)
  ```

**High-Risk policy for DML:**

- All DELETE and UPDATE operations in production databases

  ```text
     environment_id == Prod
  and
  sql_type in (DELETE, UPDATE)
  ```

- All DML operations affected more than 1000 rows in production databases

  ```text
     environment_id == Prod
  and
  affected_rows > 1000
  ```

## Step-to-step Tutorial

<TutorialBlock url="/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow" title="Database Change with Risk-Based Approval Flow" />
