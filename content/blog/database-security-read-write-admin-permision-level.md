---
title: 'Database Security: Read, Write, and Admin Permission Levels'
author: Adela
updated_at: 2024/11/04 16:00:00
feature_image: /content/blog/database-security-read-write-admin-permission-level/db-permission-cover.webp
tags: Explanation
description: Explain the different database permission levels
---

Database permissions are one of the database security fundamental component, involves assigning different permission levels to users based on their roles and responsibilities. In most database systems, these permissions are categorized into three main levels: `Read`, `Write`, and `Admin`.

## Read

**Read** is the fundamental access level that allows a user to view or retrieve data from a database without the ability to modify it. Analysts and Developers use this level to access and analyze data. It includes the following operations:

- Fetch metadata (information_schema or catalog info)
- Run EXPLAIN. This is for developer to troubleshoot problematic queries
- Run SELECT

<HintBlock type="info">

This post is updated regularly. For the impatience, jump to the [Recommended Setup](#recommended-setup) section.

</HintBlock>

## Write

**Write** allows a user to modify data in a database. Developers and DBAs (Database administrators) use this level to perform tasks such as data insertion, update, and deletion depending on their permissions. It includes the following operations:

- DML change (data change)
- DDL change (schema migration)

## Admin

**Admin** is the highest level of access. DBAs use this level to perform tasks such as killing the connections.

## Fine-grained database permissions in Bytebase

You can configure [Bytebase database permissions](https://docs.bytebase.com/security/database-permission/overview/) to provide fine-grained control over database operations.

<IncludeBlock url="/docs/share/database-permission-table"></IncludeBlock>
