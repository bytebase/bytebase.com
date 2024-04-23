---
title: 'Bytebase vs. CloudBeaver: a side-by-side comparison for web-based database management'
author: Ningjing
published_at: 2024/02/27 23:21:21
feature_image: /content/blog/bytebase-vs-cloudbeaver/bb-vs-cb-banner.webp
tags: Explanation
description: 'When a team interacts with a database, collaborative functionalities like access control become essential. A web-based GUI also adds convenience.'
---

When a team interacts with a database, collaborative functionalities like access control become essential. A web-based GUI also adds convenience. We are comparing two popular web-based database management tools: Bytebase and CloudBeaver.

## What Bytebase and CloudBeaver have in common

- Support database management through a web-based GUI, featuring capabilities such as querying, exporting, and more.
- Tiered pricing, offering both free and paid plans.
- Support purchase from AWS marketplace.
- Support for a wide range of databases, including SQL and NoSQL.
- Open source, CloudBeaver started slightly earlier, while Bytebase outpaced it with a high speed.
  ![star-history](/content/blog/bytebase-vs-cloudbeaver/star-history.webp)

## What are the differences between Bytebase and CloudBeaver?

Bytebase is a database development tool for the developer team, while CloudBeaver is a lightweight web application for all-around data management. 

Bytebase focuses on team collaboration, offering tailored features like access control, data masking, SQL review, and custom approval flows. CloudBeaver, on the other hand, is a cloud solution for data management, supporting a wide range of databases.

|                                             | CloudBeaver                    | Bytebase                                              |
| ------------------------------------------- | -------------------------- | ----------------------------------------------------- |
| [Product position](#product-position)       | A lightweight web application for all-around data management  | A collaborative database development platform         |
| [Developer interface](#developer-interface) | Server-side, web-based | Server-side, web-based                                |
| [Installation](#installation)               | Jave-based, require JVM    | Deploy Go-binary with no external dependency          |
| [Supported databases](#supported-databases) | Free for 13, Paid for 80+                       | 20+                                                   |
| [Query](#query)                             | ✅                         | ✅                                                    |
| [Change](#change)                           | Direct                     | Review workflow                                       |
| [Access control](#access-control)           |  ✅ basic                        | ✅ Free for basic version / Paid for advanced version |
| [Data masking](#data-masking)               | ❌                         | ✅ Paid                                               |
| [Compare Schema](#compare)                  | ❌                  | ✅ 1:N                                             |
| [Audit log](#audit-log)                     | ✅                         | ✅                                                |

### Product position

- **CloudBeaver**: A lightweight web application for all-around data management. Work with a lot of data sources easily with a single secure cloud solution using your browser. It starts as DBeaver's cloud and light-weighted version and gradually incorporates collaborative features.
  ![cb-position](/content/blog/bytebase-vs-cloudbeaver/cb-position.webp)

- **Bytebase**: The GitLab/GitHub equivalent for Database DevOps, designed for developers, DBAs, and platform teams. It begins as a team collaboration tool dedicated to change management and evolves into a universal database tool. Its focus is **team collaboration**, offering tailored features like access control, data masking, SQL review, and custom approval flows.
  ![bb-3-op](/content/blog/bytebase-vs-cloudbeaver/bb-3-op.webp)

### Developer interface

- **CloudBeaver**: A web-based GUI tool.
  ![cb-gui](/content/blog/bytebase-vs-cloudbeaver/cb-ui.webp)

- **Bytebase**: A web-based GUI platform that consists of an issue-based change management system and a SQL Editor for querying.
  ![bb-issue](/content/blog/bytebase-vs-cloudbeaver/bb-issue-waiting.webp)
  ![bb-gui](/content/blog/bytebase-vs-cloudbeaver/bb-gui.webp)

### Installation

- **CloudBeaver**: Java-based tool, requires the Java Virtual Machine (JVM) for execution, or it can be run using Docker.

- **Bytebase**: Go-based tool, a self-contained binary with no external dependency. Also provides [Docker](/docs/get-started/self-host/#docker) and [Kubernetes](/docs/get-started/self-host/#kubernetes) deployment.

### Supported databases

- **CloudBeaver**: Supports over 13 databases covering SQL databases such as MySQL, PostgreSQL, and Oracle. The Enterprise version supports 80+ including NoSQL and Cloud databases.

- **Bytebase**: Supports more than 20 databases covering both SQL databases such as MySQL, PostgreSQL, and Oracle, and NoSQL databases including MongoDB, Redshift, and Redis.

### Query

- **CloudBeaver**: You can query a table either by double-clicking on it or by manually writing SQL with templates. Additionally, with the Enterprise version, a query builder is available to assist with the manual writing process.
  ![cb-query-sql](/content/blog/bytebase-vs-cloudbeaver/cb-query-sql.webp)

  You may save your scripts, which might be shared along with the database connection.
  ![cb-script](/content/blog/bytebase-vs-cloudbeaver/cb-script.webp)

- **Bytebase**: **SQL Editor** is used to execute queries. You can query a table either by double-clicking on a table or by manually writing SQL with the help of auto-completion. With the paid version, you may also share the script with others.
  ![bb-data-query](/content/blog/bytebase-vs-cloudbeaver/bb-data-query.webp)

  You may save your scripts or star specific saved scripts for easy access. Starting with the **Pro plan**, you may also share the script with your team.
  ![bb-sheets](/content/blog/bytebase-vs-cloudbeaver/bb-sheets.webp)

### Change

- **CloudBeaver**: After querying a table, you can edit the data directly in the table view, or you can write SQL script manually and execute.
  ![cb-change](/content/blog/bytebase-vs-cloudbeaver/cb-change.webp)

  You may turn on **Query History** to track activities.
  ![cb-change-query-history](/content/blog/bytebase-vs-cloudbeaver/cb-change-query-history.webp)

- **Bytebase**: Every change to the database should proceed through an issue. The issue will automatically bring you **SQL Review**, **Custom Approval Flow** and other related features.
  ![bb-issue](/content/blog/bytebase-vs-cloudbeaver/bb-issue-waiting.webp)

  Every change will be recorded in the **Change History**. Bytebase will also detect the schema changes made by other tools and mark them as **Schema Drift**.
  ![bb-history](/content/blog/bytebase-vs-cloudbeaver/bb-history.webp)

  If you write a SQL script such `ALTER TABLE` in **SQL Editor**, you'll either create a new issue or switch to **Admin mode** (similar to SSH in the terminal).
  ![bb-force-issue](/content/blog/bytebase-vs-cloudbeaver/bb-force-issue.webp)
  ![bb-force-issue-preview](/content/blog/bytebase-vs-cloudbeaver/bb-force-issue-preview.webp)

On the other hand, the more common way to change the schema is to use **Schema Editor**.

![bb-select-db](/content/blog/bytebase-vs-cloudbeaver/bb-select-db.webp)
![bb-schema-editor](/content/blog/bytebase-vs-cloudbeaver/bb-schema-editor.webp)

### Access Control

- **CloudBeaver**: Within the administration panel, there're two basic teams (user groups): `admin`(can access admin panel) and `user`(no access to admin panel).
  ![cb-teams](/content/blog/bytebase-vs-cloudbeaver/cb-teams.webp)

  When you edit database connections, you have the option to restrict access to a specific team or individual.
  ![cb-db-access](/content/blog/bytebase-vs-cloudbeaver/cb-db-access.webp)

- **Bytebase**: Roles are divided into two levels - Workspace and Project. `Workspace Admins`/`DBAs` set up database instances and manage members. `Project Owners` handle databases, issues, and members at the Project level. Individuals can hold multiple project-level roles, such as `Project Developers` (change database), and `Project Queriers` (query database).
  ![bb-access-control](/content/blog/bytebase-vs-cloudbeaver/bb-access-control.webp)

  With **Community plan**, if one's not assigned to a project, one can't see the project at all. With **Enterprise plan**, `Project Owner` can grant access to specific databases or tables instead of all project databases to a specific `Project Querier`. `Project Developer` can also request to query or export a database or table with a request issue.
  ![bb-access-control-adv](/content/blog/bytebase-vs-cloudbeaver/bb-access-control-adv.webp)

  Additionally, `Admins`/`DBAs` can set different data access controls for various environments, such as restricted access to production data and open access to development data.
  ![bb-ac-env](/content/blog/bytebase-vs-cloudbeaver/bb-ac-env.webp)

### Data Masking

- **CloudBeaver**: Not available.

- **Bytebase**: `Admins`/`DBAs`/`Project Owners` can configure data masking for specific columns within a table and can also authorize particular users to access the original, unmasked data. `Project Querier`, on the other hand, is limited to accessing only the masked data.

  Furthermore, `Admins`/`DBAs` can define semantic types for masking algorithms, such as email, phone, credit card, etc. As a result, the data will be masked according to the semantic type configured.
  ![bb-masking-graph](/content/blog/bytebase-vs-cloudbeaver/bb-masking-graph.webp)

### Compare

- **CloudBeaver**: Not available.

- **Bytebase**: Bytebase compare schemas via its **Schema Sync** feature. You can initially select one database and then choose several others for comparison. The result will generate DDLs and create a new issue comprising changes to all selected databases for SQL review, approval and execution.
  ![bb-schema-compare-several](/content/blog/bytebase-vs-cloudbeaver/bb-schema-compare-several.webp)

  ![bb-batch-issue](/content/blog/bytebase-vs-cloudbeaver/bb-batch-issue.webp)

### Audit log

- **CloudBeaver**: **Query Manager** is available for the paid version.
  ![cb-audit-log](/content/blog/bytebase-vs-cloudbeaver/cb-audit-log.webp) 

- **Bytebase**: **Audit Log** is available for the **Enterprise plan**. It records all the activities within Bytebase which can be filtered or exported.
  ![bb-audit-log](/content/blog/bytebase-vs-cloudbeaver/bb-audit-log-dropdown.webp)

## Summary

This article compares Bytebase and CloudBeaver across various aspects, highlighting their unique strengths. CloudBeaver supports a wider range of databases, whereas Bytebase offers enhanced collaborative features for database management, including access control and change review capabilities. After all, in any use case, feel free to pick the one you're most comfortable with.
