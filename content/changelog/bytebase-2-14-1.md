---
title: Bytebase 2.14.1
author: Ningjing
published_at: 2024/3/21 17:00:00
feature_image: /content/changelog/2-14-1-banner.webp
description: 'Support Branching for Oracle.'
---

## 🚀 New Features

- Support Branching for Oracle.
- Add project switcher in SQL Editor.
- Add two SQL Review rules:
  - Disallow mixing DDL and DML statements.
  - Disallow mixing different types (UPDATE, INSERT, DELETE) of DML statements on the same table.

## 🔔 Breaking Changes

- Remove Data Access Control from Workspace Settings.
  - The option to query and export at the workspace level is no longer available. Instead, make `allUsers` a project member with the Querier role for the same functionality.
  - The feature to prevent copying data from the SQL Editor has been moved to the environment page.
- Update the visibility of SQL Editor Worksheets to `Private`, `Project Read` and `Project Write`.

## 🎄 Enhancements

- Display failed Oracle statement line numbers.
- Improve Snowflake syntax error messages.
- Collect all PostgreSQL slow logs if `pg_stat_statements` view exists.
- Enhance Oracle compatibility.

## 🐞 Bug Fixes

- Correct time display for slow query logs.

## 📰 Fresh Off the Press

- ❄️ Snowflake offers scalable compute and storage resources, with a SQL-based interface for data manipulation and analysis. Yet, when it comes to CI/CD practices, especially compared to its querying functionalities in SnowSight, various deficiencies emerge. Read more about [Snowflake CI/CD Best Practices](/blog/snowflake-ci-cd-devops/).

- 💥 Once upon a time, a developer named John was modifying the name column in a large table and Bob, the DBA reviewed. As soon as the migration was deployed, alarms blared throughout the office. Then [whose fault was it](/blog/fault-in-schema-migration-outage/)?

- ⚙️ GitOps is a modern approach to manage infrastructure that emphasizes automation, collaboration, and continuous delivery. In this post, we are reviewing several [open-source GitOps tools](/blog/top-open-source-gitops-tools/).

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._
