---
title: Bytebase 3.6.0
author: Ayra
updated_at: 2025/04/24 18:00:00
feature_image: /content/changelog/3-6-0-banner.webp
description: 'SOC 2 Type 2'
---

Bytebase has earned [SOC 2 Type 2 certification](https://www.bytebase.com/blog/soc2-type2/) building on our earlier [Type 1 certification](https://www.bytebase.com/blog/soc2-type1) acquisition.

## 🚀 New Features

- Add basic support for Trino database.
- Support syncing [OIDC IdP groups](https://www.bytebase.com/docs/administration/sso/oidc/#group-syncing) to Bytebase groups via the groups claim.
- Support Cassandra for executing statements in SQL editor and executing issues.
- Able to automatically retry PostgreSQL lock timeouts.

## 🔔 Breaking Changes

- API change:

  - Remove `EnvironmentService`. The environment setting now resides in `SettingService`. `bb.environments.*` permissions are removed from custom roles. You can grant `bb.settings.update` to a role to allow it to update the environment setting.

  - Simplify `ApprovalNode`. Remove the predefined `groupValue` enum, only `role` is allowed.

- Deprecate Anomaly Center. Schema drift is now visible in both the database list and on the database page.

## 🎄 Enhancements

- Update Docker base image to Alpine to improve security posture.
- Support filtering tasks by status in UI when the issue involves more than 10 databases.
- Add support for `EXPLAIN` in MSSQL.
- Support more read-only commands in SQL Editor for Redis.
- Improve columns auto-completion in FROM clause for MSSQL.
- Fix PostgreSQL infinity date display issue.
- Hide dependent objects in SQL Editor.
- Remove `FILTER_PREDICATES` from `EXPLAIN` query for Oracle.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
