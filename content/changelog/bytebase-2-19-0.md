---
title: Bytebase 2.19.0
author: Adela
updated_at: 2024/6/13 17:00:00
feature_image: /content/changelog/2-19-0-banner.webp
description: 'Support DynamoDB'
---

## 🚀 New Features

- Support DynamoDB.
- Support standalone SQL review issue.
- Support [Slack direct messages for issue activities](/docs/change-database/webhook/#supported-events).
- Support [prior backup for PostgreSQL](/docs/change-database/rollback-data-changes/).
- Add SQL Review Rule for SQL Server: Disallow redundant indexes.

## 🔔 Breaking Changes

- Creating multiple-database issues will now share SQL statements among databases.

## 🎄 Enhancements

- Support managing instances and environments in SQL Editor.
- Support specifying the maximum role expiration time for querier and exporter.
- Enhance SQL Review Rule for SQL Server: Catch sp_rename in Backward Compatibility check.
- Support querying sequence for PostgreSQL in SQL Editor.
- Optimize memory usage.

## 📰 Fresh Off the Press

- Bytebase's SQL Review detects anti-SQL patterns for all mainstream relational databases. To speed up SQL Review (to make all our lives happier), we took time to [optimize our SQL Server parser, making SQL Review 70x faster](/blog/how-we-improved-sql-parser-speed-70x/)! 🚀

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
