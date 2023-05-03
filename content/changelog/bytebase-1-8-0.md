---
title: Bytebase 1.8.0
author: Mila
published_at: 2022/11/17 17:00:00
description: "- Support syncing schema for MySQL. - Support approving issues via Lark (Feishu). - Support SQL Review CI in the GitOps workflow. "
---

## 🚀 New Features

- Support syncing schema for MySQL.
- Support approving issues via Lark (Feishu).
- Support [SQL Review CI in the GitOps workflow](/docs/sql-review/sql-advisor/gitops-ci).
- DBAs and workspace owners can run SQL statements in Admin mode from the SQL Editor.
- Support altering multiple databases on tenant mode.

## 🎄 Enhancements

- 💳 Start a 14-day free trial without registering on the [Bytebase license hub](https://hub.bytebase.com/).
- Display more details for failed tasks via IM webhook.
- Tightened the ACL check on the backend for Project and Sheet operation.
- Added task dependencies by GitOps schema version.
- Added `Env Info` in the SQL Editor connection selector.
- Boosted time to load databases from the SQL Editor.
- Optimized text and style for the task card and issue pipeline UI.
- Guarantee all tasks to be approved for stage approval.
- Support batch operation for issues.
- When creating issues, Bytebase automatically assigns a reviewer according to the approval policy.

## 🐞 Notable Bug Fixes

- Fixed: test connection issue with read-only data source in instances.
- Fixed: mixing up the state of SQL statements in multi-task issues.
- Fixed: error code formatting when creating DDL/DML issues from SQL Editor.

## 🎠 Community

- Thanks to @[Zheaoli](https://github.com/Zheaoli) chore: fix dataDir format error when the `--data` arguments is `/` [#3176](https://github.com/bytebase/bytebase/pull/3176)

## 📰 Fresh Off the Press

- [The SQL Review Tool for Developers](/blog/sql-review-tool-for-devs)
- [Introducing DB Cost](/blog/introducing-dbcost), the simple cloud database pricing sheet for AWS RDS and Google Cloud SQL instance.
- [What is a Database Schema?](/blog/what-is-database-schema)
- An oldie but goodie: [Database Review 2021 and 2022 Predictions](/blog/database-review-2021)

## 📕 Installation and Upgrade

Follow [Installation](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the newest release binary.
