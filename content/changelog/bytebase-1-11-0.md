---
title: Bytebase 1.11.0
author: Mila
published_at: 2023/01/12 17:00:00
feature_image: /content/changelog/1-11-0-banner.webp
description: '- Added support for MongoDB. - View ER Diagrams with the new Schema Diagram. - Edit PostgreSQL schema via the UI-based Schema Editor.'
---

## 🚀 New Features

- Added [support for MongoDB](/docs/introduction/supported-databases). 🍃
- View ER Diagrams with the new [Schema Diagram](/docs/change-database/schema-diagram).
- Support editing PostgreSQL schema via the UI-based [Schema Editor](/docs/change-database/schema-editor). 🐘

## 🎄 Enhancements

- Send notifications via [webhook](/docs/administration/webhook-integration/project-webhook) when the stage status is changed.
- Added project view in SQL Editor's database tree to easily navigate different databases and projects.
- Display inactive rules in the [Access Control](/docs/administration/database-access-control) rule list.
- Support [PostgreSQL SSL connection](/docs/get-started/step-by-step/add-an-instance#add-an-instance).
- Added schema version in the startup log to avoid confusion with the server version.

## 📰 Fresh off the press

- Compared to traditional SQL tools, such as the CLI or classic SQL Editor, a modern SQL Editor for DevOps teams should make secure changes and have a user-friendly UI: [see how](/blog/the-sql-editor-for-developers-and-dbas) Bytebase's new SQL Editor assists collaboration.
- Follow [this handy tutorial](/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer) to try first-hand how database access control and data anonymization works in Bytebase.
- Ready to bring your TiDB schema change to the next level? The Database Change Management tutorial series continues!
  - Step 1 - [DevOps: Database Change Management with TiDB](/docs/tutorials/database-change-management-with-tidb)
  - Step 2 - [DevOps: Database Change Management with TiDB and GitHub](/docs/tutorials/database-change-management-with-tidb-and-github)

## 📕 Installation and Upgrade

Follow [Installation](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary.
