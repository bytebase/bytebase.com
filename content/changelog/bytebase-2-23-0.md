---
title: Bytebase 2.23.0
author: Ningjing
updated_at: 2024/9/19 17:00:00
feature_image: /content/changelog/2-23-0-banner.webp
description: 'Entra (Azure AD) directory sync and CockroachDB support'
---

## 🚀 New Features

- Support [synchronizing users and groups from Entra ID (former Azure AD)](/docs/administration/scim/overview/).
- Support CockroachDB.
- Support [project-level backup settings](/docs/change-database/rollback-data-changes/#project-backup-settings) with auto-enable and skip error options.
- Real-time syntax checking in the SQL Editor.
- Support configuring password restriction.

## 🔔 Breaking Changes

- Change the Data Classification upload data format from a list to a key-value map.

## 🎄 Enhancements

- Allow workspace admin to disable other users' MFA settings.
- Split the `WHERE` SQL Review restriction into two rules: one for `SELECT` statements and one for DML operations.
- Support selecting PostgreSQL schema in SQL Editor.
- Display detailed PostgreSQL error messages in the SQL Editor.
- Support querying system objects for PostgreSQL in the SQL Editor.
- Regroup sidebar as IAM / Admin, CI/CD, Data Access, Integration.
- Allow workspace admin to disable other users' MFA settings.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
