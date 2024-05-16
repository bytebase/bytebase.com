---
title: Bytebase 0.12.0
published_at: 2022/01/20 11:09:36
description: Multi-tenancy Database Management. SQL Editor Improvement. Signup and login via GitLab EE/CE. DML workflow
---

## 🚀 New Features

### Multi-tenancy Database Management

Say you have many databases that use identical database schemas and need uniform management. For example, my highly-available service stores database data in different locations or data centers; or my SaaS service stores every customer/tenant's database data in their own databases. This multi-tenancy database management feature allows you to manage and update schemas for these hundreds of databases consistently and conveniently.

- Intelligent database management for tenants using identical schemas.
- Creating and managing database labels used for searching resources and identifying tenants.
- Flexible tenant database deployment such as multi-stage regional deployments.
- Schema updates are applied to all tenants consistently. Adding a new tenant database will use the same schema from existing tenants.

![_](/content/changelog/0.12.0/tenant-mode.gif)

### SQL Editor

- Support keeping multiple editors under different tabs.

![_](/content/changelog/0.12.0/sql-editor-tab.gif)

- Seamless transition to the schema change (DDL) / data change (DML) workflow from the SQL Editor.

![_](/content/changelog/0.12.0/sql-editor-workflow.gif)

- Project based permission control.
- Save Query: support saving the SQL statement, search it with highlight and delete.

![_](/content/changelog/0.12.0/sql-editor-saved-query.gif)

- Query History: record all the executed queries.

![_](/content/changelog/0.12.0/sql-editor-query-history.gif)

### Signup and login via GitLab EE/CE

Most in-house dev teams use GitLab EE/CE to host their code. Bytebase has already supported VCS integration with GitLab to manage database schemas. We now further enhance the integration to allow users to use their GitLab EE/CE account to login Bytebase. Thanks @siu91 for the [suggestion](https://github.com/bytebase/bytebase/issues/27).

### Support data change (DML) workflow

Besides the schema change (DDL) workflow, we now also support the DML workflow. Thanks @TBACEJ for the suggestion [https://github.com/bytebase/bytebase/issues/337](https://github.com/bytebase/bytebase/issues/337)

## 🎄 Enhancement

- Surface detailed error to the UI when --debug is enabled when starting Bytebase

## 🐞 Bug fix

- Fix the VCS schema write back after migration when the git branch name contains slash (e.g. features/foo) [https://github.com/bytebase/bytebase/issues/396](https://github.com/bytebase/bytebase/issues/396)
- Fix the MySQL 8.0 window functions syntax error [https://github.com/bytebase/bytebase/issues/175](https://github.com/bytebase/bytebase/issues/175)

## 🎠 Community

- We are on the list of “The fastest-growing open-source startups in Q4 2021” by Runa Capital  [https://runacap.com/ross-index/q4-2021/](https://runacap.com/ross-index/q4-2021/)

![_](/content/changelog/0.12.0/runa-capital.webp)

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
