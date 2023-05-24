---
title: The SQL Editor for Developers and DBAs
author: Candy
published_at: 2023/01/06 12:37:17
feature_image: /content/blog/the-sql-editor-for-developers-and-dbas/cover.webp
tags: Announcement
featured: true
description: Introduce the new SQL Editor in Bytebase Console with six highlights - Admin mode, database-based access control, data anonymization, audit logs, collaborative sheets and easy to use.
---

## Key features of Advanced SQL Editor

With Database DevOps rapidly evolving, application developers and DBAs are involved in [database change management](/blog/what-is-database-change-management). Application developers are responsible for writing SQL statements to apply schema and data change to their databases and view the query results. On the other hand, DBAs ensure that all databases run smoothly, securely, and efficiently by developing various policies and collaborating with application developers to perform the database change.

As we know, SQL Editor is a crucial tool for executing SQL statements and operating databases with admin commands. Compared to the classic SQL tools, such as command line interface and traditional SQL Editor, an advanced SQL Editor for the Database DevOps team should have the following features:

- User-friendly interface: It should be easy to write, read and execute SQL statements and browse the database schema and query results.
- Collaboration: It should support team members in saving, sharing, and tracking SQL statements.
- Security: It should provide features to grant database access to team members with requirements, protect sensitive data when executing queries, control permissions to perform database admin commands, and capture audit logs.

## SQL Editor in Bytebase Console

Bytebase v1.9.1 releases a new SQL Editor with the following highlights:

- [Admin mode](#admin-mode): Bytebase provides Admin mode in SQL Editor to allow DBAs to execute database admin commands.
- [Database-based access control](#database-based-access-control): All databases in the protected environments can not be queried by developers in SQL Editor. DBAs can configure a database allowlist to grant developers the ability to query some of databases.
- [Data anonymization](#data-anonymization): The query result of sensitive columns will be masked when developers run a query in SQL Editor. It is applicable to all query types, such as subquery, JOIN, Common Table Expression (CTE).
- [Audit logs](#audit-logs): Bytebase Audit Log records all queries in SQL Editor which is accessible to DBAs.
- [Collaborative sheets](#collaborative-sheets): DBAs and developers can save SQL statements as sheets to share with others in SQL Editor. Moreover, this release supports saving the uploaded SQL scripts as sheets to be used in issues to apply database changes, a single sheet can hold up to 100MB sized SQL statements.
- Good user experience: This release presents SQL Editor with a fresh look and improves the code auto-completion.

### Admin Mode

When users want to connect to databases to run admin commands, they can do it in SQL Editor Admin mode with a DBA account like the screenshot below. You can take a look at the document [Admin Mode](/docs/sql-editor/admin-mode) to learn more details.
![admin-mode](/content/blog/the-sql-editor-for-developers-and-dbas/admin-mode.webp)

### Database-based Access Control

When users want to allow developers to access some databases in the production environment, they can mark the production environment as a protected environment and configure an allowlist. You can get more details from the document [Database Access Control](/docs/administration/database-access-control).
![access-control](/content/blog/the-sql-editor-for-developers-and-dbas/access-control.webp)

### Data Anonymization

When developers query tables containing sensitive columns in SQL Editor, the result of these columns will display as "**\*\***". You can learn the configuration details from the document [Anonymize Data](/docs/administration/anonymize-data).
![anonymize-data](/content/blog/the-sql-editor-for-developers-and-dbas/anonymize-data.webp)

### Audit Logs

DBAs can browse all queries executed in SQL Editor with the audit logs. You can check out the document [Audit Log](/docs/administration/audit-log) to get more details.
![audit-log](/content/blog/the-sql-editor-for-developers-and-dbas/audit-log.webp)

### Collaborative Sheets

For commonly-used SQL statements, you can save them as sheets and set up a public SQL script library in your team. For large SQL scripts (up to 100M), you can use them in issues after uploading them as sheets (see the screenshot below). You can explore the document [Manage SQL Scripts with Sheet](/docs/sql-editor/manage-sql-scripts) to get additional details.
![large-script](/content/blog/the-sql-editor-for-developers-and-dbas/large-script.webp)

## Try it Out

With the new SQL Editor in Bytebase Console, you can run database admin commands in Admin mode, anonymize sensitive data when fetching query results, configure a database allowlist to manage database access permission, and save commonly-used SQL scripts to collaborate with team members. Besides that, you can inspect all queries in SQL Editor via audit logs.

If you have any comments or questions, don’t hesitate to let us know. You can join our [discord](https://discord.gg/Fac9nmZ95j) to learn more about Bytebase.
