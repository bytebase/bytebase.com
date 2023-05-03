---
title: Bytebase 1.2.0
author: Mila
published_at: 2022/06/23 17:20
description: Bytebase now supports Schema Review for SQL Editor.
---

## 🚀 New Feature

Schema Review for SQL Editor
 ![sql-editor-schema-review](/changelog/1.2.0/sql-editor-schema-review.webp)

- After setting up the schema review policy, if the SQL statement violates the error rule, Bytebase prevents SQL execution and shows error messages
  - Users can change the rule level from "Error" to "Warning"
    - If the SQL statement violates the updated schema review policy, Bytebase will run the SQL, but the warning message will display "Warning"
    - If schema review passes, Bytebase will run the SQL normally

## 🎄 Enhancements

- Improved SQL Editor styles
    ![sql-editor-improvement](/changelog/1.2.0/sql-editor-improvement.webp)
- Improved SQL Editor experience with auto-completion and code formatting on the issue page
- Support to set SSL connection arguments for ClickHouse instances
- Support to Approve/Run all tasks in a stage for tenant mode deployment issues
- Allow users to retry the schema migration task if it fails
- Will not enforce migration version when users transfer a database to a tenant mode project

## 🎠 Community

- Thanks to @[Cluas](https://github.com/Cluas) for:
  - fix: pg ExecuteContext do not return err [#1540](https://github.com/bytebase/bytebase/pull/1540)
  - fix: remove early check since we support create database idempotent [#1543](https://github.com/bytebase/bytebase/pull/1543)
- Thanks to @[chiyutianyi](https://github.com/chiyutianyi) for: feat: prometheus integration and pprof registration simplification [#1550](https://github.com/bytebase/bytebase/pull/1550)

## 📕 Installation and Upgrade

Follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation). If you upgrade from a previous version, just restart after obtaining the new release binary.
