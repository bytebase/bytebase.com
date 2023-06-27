---
title: What is a Database Schema?
author: Tianzhou
published_at: 2022/10/30 18:00:00
feature_image: /content/blog/what-is-database-schema/blueprint.webp
tags: Explanation
description: The database schema describes the logical structure of the database data and is the most critical information of a relational database system.
---

This is a series of articles about database schema change / schema migration:

- What is a Database Schema? (this one)
- [What is a Database Schema Migration?](/blog/what-is-database-migration)
- [How to Handle Database Migration / Schema Change?](/blog/how-to-handle-database-schema-change)
- [Top Database Schema Migration Tools in 2023](/blog/top-database-schema-change-tool-evolution)

---

A database management system (DBMS) consists of three main components:

- The database server
- The database data
- The database schema

The database server is a computation component and is stateless. The database data holds the state while the database schema holds the structure of the state (metadata). Database users often use SQL to instruct the database server to manipulate the underlying database data. SQL stands for _Structured Query Language_ which is based on the structure that the database schema provides.

## The Database Server

The database server is a process or a set of processes running inside a computation environment. The computation environment provides processing power. It could be a physical computer, a [virtual machine](https://en.wikipedia.org/wiki/Virtual_machine) or a lightweight [container](https://en.wikipedia.org/wiki/OS-level_virtualization).

## The Database Data

The database data records the business application information such as order information, customer profile, etc. The database data is stored on the physical disk. People always use a cylinder to represent a database because, in old days, database data is stored there. Oracle, the world’s largest database company, headquarters are a set of cylinder buildings.

![_](/content/blog/what-is-database-schema/oracle-headquarter.webp)

## The Database Schema

The database schema describes the **logical structure** of the database data. It often resides together with the database data. A more general term is metadata, but in the database domain, it’s always referred to as database schema or just schema. Other synonyms include data dictionary, data catalog, etc.

In the formal definition, a database schema is a set of formulas called integrity constraints. These constraints are defined as various database objects such as tables, fields, relationships, views, indexes, stored procedures, triggers, etc.

![_](/content/blog/what-is-database-schema/employee-schema.webp)

Above is a database schema for a database storing the employee data. The database schema is the **most critical** information because it’s the blueprint of how the database data is organized. A DBMS can have a database schema with empty data, but not vice versa. The database data is meaningless without the database schema.

Database schema evolves as the business evolves. In the next post [How to Handle Database Schema Change](/blog/how-to-handle-database-schema-change), we will cover the evoluation of database schema, the common mistakes during schema changes, and the best practice of applying database schema changes properly.
