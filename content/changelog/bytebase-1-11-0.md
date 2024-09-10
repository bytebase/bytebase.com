---
title: Bytebase 1.11.0
author: Mila
updated_at: 2023/01/12 17:00:00
feature_image: /content/changelog/1-11-0-banner.webp
description: '- Added support for MongoDB. - View ER Diagrams with the new Schema Diagram. - Edit PostgreSQL schema via the UI-based Schema Editor.'
---

## 🚀 New Features

- Added [support for MongoDB](/docs/introduction/supported-databases). 🍃
- View ER Diagrams with the new [Schema Diagram](/docs/change-database/schema-diagram).
- Support editing PostgreSQL schema via the UI-based [Schema Editor](/docs/change-database/schema-editor). 🐘

## 🎄 Enhancements

- Send notifications via [webhook](/docs/change-database/webhook) when the stage status is changed.
- Added project view in SQL Editor's database tree to easily navigate different databases and projects.
- Display inactive rules in the [Access Control](/docs/security/data-access-control) rule list.
- Support [PostgreSQL SSL connection](/docs/get-started/step-by-step/add-an-instance#add-an-instance).
- Added schema version in the startup log to avoid confusion with the server version.

## 📰 Fresh off the press

- Compared to traditional SQL tools, such as the CLI or classic SQL Editor, a modern SQL Editor for DevOps teams should make secure changes and have a user-friendly UI: [see how](/blog/the-sql-editor-for-developers-and-dbas) Bytebase's new SQL Editor assists collaboration.
- Follow [this handy tutorial](/docs/tutorials/how-to-manage-data-access-for-developers) to try first-hand how data access control and data masking works in Bytebase.
- Ready to bring your TiDB schema change to the next level? The Database Change Management tutorial series continues!
  - Step 1 - [Database CI/CD and Schema Migration with TiDB](/docs/tutorials/database-change-management-with-tidb)
  - Step 2 - [Database CI/CD and Schema Migration with TiDB and GitHub](/docs/tutorials/database-change-management-with-tidb-and-github)

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
