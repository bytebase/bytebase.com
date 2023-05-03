---
title: Bytebase 1.3.0
author: Ningjing
published_at: 2022/8/4 17:20
description: "- Support SQL review for PostgreSQL. - GitHub.com VCS integration and authentication provider. - Restore a database to the time point before the last migration with one click."
---

## 🚀 New Features

- Support SQL review for PostgreSQL with 13 rules: [SQL Review](https://www.bytebase.com/docs/sql-review/review-policy/overview)
![sql-review-for-pg](/changelog/1.3.0/sql-review-for-pg.webp)

- Support using GitHub.com both as the VCS integration to manage database schemas and as the authentication provider to allow users to use their GitHub.com accounts to log in to Bytebase.
![git-provider-github](/changelog/1.3.0/git-provider-github.webp)

- Restore a database to the time point before the last migration with one click.
![restore-before-migration](/changelog/1.3.0/restore-before-migration.gif)

## 🎄 Enhancements

- Support to set "day of the week" and "backup retention period" for database backup settings.
![backup-retention](/changelog/1.3.0/backup-retention.gif)

- When VCS has a new commit, the corresponding issue created by Bytebase will try to display the creator by matching the email account.
- Allow modifying task SQL statements in tenant mode.
- Ghost improvement: Display progress for sync task; Fix potential data loss issues; Fix potential long-time table lock.
- Support multi-selection when transferring databases into a project.
- Support "Upload SQL" when editing an issue's SQL statement.
- Support database level schema sync.
- Optimize schema sync performance.

## 🐞 Notable bug fixes

- [GitOps workflow] Handle token expiration failure when versioning the latest schema back to the repository.

## 🎠 Community

- Added interactive source code tour via [Sourcegraph](https://sourcegraph.com/github.com/bytebase/bytebase/-/blob/docs/design/source-code-tour.snb.md).

- Thanks to [@unknwon](https://github.com/unknwon) for implementing [issue #928 ☂️ GitHub Git provider](https://github.com/bytebase/bytebase/issues/928).

## 📕 Installation and Upgrade

Follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation). If you upgrade from a previous version, just restart after obtaining the new release binary.