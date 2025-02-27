---
title: Bytebase 2.22.1
author: Adela
updated_at: 2024/8/8 17:00:00
feature_image: /content/changelog/2-22-1-banner.webp
description: 'Inline schema details in SQL Editor'
---

## 🚀 New Features

- SQL Editor displays more inline schema details including tables, views, functions and stored procedures.
- Support SQL reviews via PR comments for GitOps workflows.
- The OpenAI feature is in Community Plan (free), allowing natural language to SQL in the SQL Editor by configuring your own OpenAI key.
- Support [selecting data sources](/docs/get-started/instance/#choose-your-data-source-in-sql-editor) between Admin and Readonly modes in the SQL Editor, configurable at the environment or project level.
- Support for Microsoft Entra as a built-in OAuth2 SSO provider.
- Support using database labels as filters for database group conditions in [raw expression format](/docs/change-database/batch-change/#create-a-database-group).
- Support for `table_name` as a risk factor for DDL and DML operations.

## 🎄 Enhancements

- Improve TLS support for MongoDB, SQL Server, and PostgreSQL.
- Show roles, databases, and IDPs in audit logs.
- Record binding diff in SetIamPolicy in audit logs.
- Set the application name to Bytebase for MySQL and PostgreSQL connections.
- Improve compatibility for Oracle and MSSQL.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
