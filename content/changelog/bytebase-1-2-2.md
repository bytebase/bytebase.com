---
title: Bytebase 1.2.2
author: Mila
published_at: 2022/7/21 17:20
description: "- Added support for gh-ost. - Updated the way help tips are displayed, using a side drawer instead of the pop-up tips."
---

## 🚀 New Features

- 👻 Added support for [gh-ost](https://github.com/github/gh-ost), online schema migration for large MySQL tables (Beta).
  
 ![gh-ost](/changelog/1.2.2/gh-ost.webp)

- Updated the way help tips are displayed, using a side drawer instead of the pop-up tips.
  
 ![side-drawer-help-tip](/changelog/1.2.2/side-drawer-help-tip.gif)

- Added length limit for table, column, index, foreign key, unique key names.
  
 ![table-naming-check](/changelog/1.2.2/table-naming-check.webp)

 ![schema-review-naming-table](/changelog/1.2.2/schema-review-naming-table.webp)

- Added [a new rule](https://www.bytebase.com/docs/sql-review/review-rules#table.no-foreign-key) to disallow foreign keys on a table.
  
 ![fk-check](/changelog/1.2.2/fk-check.webp)

 ![schema-review-table-no-fk](/changelog/1.2.2/schema-review-table-no-fk.webp)

- Added [a new rule](https://www.bytebase.com/docs/sql-review/review-rules#table.table-drop-naming) for naming convention when dropping a table.
  
 ![drop-table-naming-convention](/changelog/1.2.2/drop-table-naming-convention.webp)

 ![schema-review-table-drop-naming](/changelog/1.2.2/schema-review-table-drop-naming.webp)

## 🎄 Enhancements

- The issue creator filter supports "All" and "Bytebase" now.
  
 ![issue-creator-filter](/changelog/1.2.2/issue-creator-filter.webp)

- Added issue ID to issue panel.  
  
 ![issue-list-with-id](/changelog/1.2.2/issue-list-with-id.webp)

- [VCS workflow] Pop-up window with tips on how to update the issue's SQL statement.

 ![sql-statement-guide](/changelog/1.2.2/sql-statement-guide.webp)

- [SQL Advise API] Enabled database connection.

 ![database-connection-for-sql-advise-api](/changelog/1.2.2/database-connection-for-sql-advise-api.webp)


## 🐞 Notable bug fixes

- Fixed the inability to correctly perform point-in-time recovery on databases, if the database name includes capitalized letters on certain platforms.
- [VCS workflow] Dedup issue creation when the webhook push event contains the same file multiple times.
- [VCS workflow] Handle OAuth token expiration when reading VCS file content.

## 🎠 Community

- Thanks to @[tisonkun](https://github.com/tisonkun) for feat(schema system): support PG fk name convention rules [#1890](https://github.com/bytebase/bytebase/pull/1890)

## 📕 Installation and Upgrade

Follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation). If you upgrade from a previous version, just restart after obtaining the new release binary.