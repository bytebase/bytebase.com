---
title: Bytebase 1.1.0
author: Ray
published_at: 2022/5/26 08:10:08
description: Update CLI docs. Sync your SQL scripts stored in the linked VCS system. Star the sheets to save them in a list. - List database extensions for PostgreSQL. Support creating a Postgres database with an owner. Support changing data for a single database in a tenant project.
---

- **Update [CLI docs](https://www.bytebase.com/docs/cli/overview)**

bb CLI is the command-line tool of Bytebase, helping developers integrate MySQL and PostgreSQL schema change into the existing CI/CD workflow. By integrating bb with your existing CI/CD system (GitLab CI, GitHub Actions, etc.), you can bring all best practices of CI/CD to the database.

![_](/content/changelog/1.1.0/cli.webp)

## 🚀 Features

- From SQL Editor, you can now sync your SQL scripts stored in the linked VCS system.

![_](/content/changelog/1.1.0/sync-sheet-from-vcs.webp)

- Star the sheets to save them in a list.

![_](/content/changelog/1.1.0/star-sheet.webp)

- List database extensions for PostgreSQL.

![_](/content/changelog/1.1.0/pg-extension.webp)

- Support creating a Postgres database with an owner.

![_](/content/changelog/1.1.0/create-pg-database-with-owner.webp)

## 🎄 Enhancement

- Support changing data for a single database in a tenant project.

## 🐞 Notable bug fixes

- Cancel the display limitation of 20 repositories when configuring VCS for a project.

- Prevent accidental clearance of the content in SQL Editor when using the formatting function.

- Fix bugs that produce duplicate items in a project list.

## 🎠 Community

- Thanks to [@unknwon](https://github.com/unknwon) for the [PR: chore: use "malformed" consistently](https://github.com/bytebase/bytebase/pull/1306)

- Thanks to [@Cluas](https://github.com/Cluas) for the [PR: fix: create issue error when DBNameTemplate include regex string](https://github.com/bytebase/bytebase/pull/1295), [feat: support regex quote meta string](https://github.com/bytebase/bytebase/pull/1290), [feat: quote meta in tenant template fixed part](https://github.com/bytebase/bytebase/pull/1282), [feat: dump schema support PROCEDURE syntax](https://github.com/bytebase/bytebase/pull/1291)

- Thanks to [@tnir](https://github.com/tnir) for the [PR: fix(i18n): migrate i18n YAML to JSON correctly](https://github.com/bytebase/bytebase/pull/1233)

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
