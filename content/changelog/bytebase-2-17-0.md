---
title: Bytebase 2.17.0
author: Ningjing
published_at: 2024/5/16 17:00:00
feature_image: /content/changelog/2-17-0-banner.webp
description: 'Support configuring labels for issues'
---

## 🚀 New Features

- Support configuring labels for issues.
- Support displaying detailed issue task execution logs (affected rows or errors) for MySQL and PostgreSQL.
- Support configuring table or column classification on the database page. In earlier versions, this required using DDL and was only supported for MySQL and PostgreSQL.
- Add two SQL Review rules:
  - Fully qualified object name for PostgreSQL.
  - Limit DDL operations on tables with large data volumes for MySQL.

## 🎄 Enhancements

- Support filtering audit logs by project and method.
- Support displaying schema snapshot for SQL Server.
- Support importing changelists from zip or sql files.
- Support clicking on a line number in the SQL review results jumps to that line.
- Support jumping to a specific line by clicking on its line number in SQL review results.
- Support displaying SQL Server functions and procedures in SQL Editor.
- Support displaying `uniqueidentifier` typed data of SQL Server in SQL Editor.
- Improve the SQL Editor experience by customizing the database tree structure.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
