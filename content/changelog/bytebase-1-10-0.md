---
title: Bytebase 1.10.0
author: Ningjing
published_at: 2022/12/29 17:00:00
description: "- Workspace owner and DBA can now view audit logs. - Support CRUD database role (only for PostgreSQL) via Terraform Provider. - Support viewing and editing primary keys and foreign keys in the Schema editor for MySQL. - Support MySQL/TiDB SSL connection."
---

## 🚀 New Features
- Workspace owner and DBA can now view audit logs.
- Support CRUD database role (only for PostgreSQL) via Terraform Provider. Read the [docs](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs/resources/database_role).
- Support viewing and editing primary keys and foreign keys in the Schema Editor for MySQL.
- Support MySQL/TiDB SSL connection.
- Support DML with large SQL (up to 100MB).
- Support online migration for UI workflow under tenant mode.

## 🎄 Enhancements
- Display mark-as-done tasks as skipped.
- Removed the database name grouping rule in tenant mode projects.
- Support searching projects, instances, and environments in the database search box.
- UX improvement for database list page.
- Speed up the issue detail page.

## 🐞 Notable bug fixes
- Fixed: querying Snowflake from SQL Editor.

## 🎠 Community
- We have revamped our [GitHub README page](https://github.com/bytebase). Please do check it out!
- Thanks to [@piglig](https://github.com/piglig) for the PRs：
  - refactor: remove unnecessary error checking [#3925](https://github.com/bytebase/bytebase/pull/3925)
  - docs: fix data model picture reference invalid [#3926](https://github.com/bytebase/bytebase/pull/3926)
  - refactor: remove in-effective break [#3943](https://github.com/bytebase/bytebase/pull/3943)

## 📰 Fresh off the press
- Database change has long been the most critical step in a release. If you do it well, you are one step closer to [improving CI/CD efficiency](/blog/database-cicd-best-practice). 
- With Bytebase, a team can have a formalized review and rollout process to [make Snowflake schema change and data change](/blog/database-change-management-with-snowflake).
- This tutorial will bring your [Snowflake schema change to the next level by introducing the GitOps workflow](/blog/database-change-management-with-snowflake-and-github), where you commit the schema change script to the GitHub repository, which will in turn trigger the schema deployment pipeline in Bytebase.
  
## 📕 Installation and Upgrade
Follow [Installation](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the newest release binary.