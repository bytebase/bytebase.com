---
title: Bytebase 1.4.0
author: Mila
published_at: 2022/9/15 17:20
description: '- AWS S3 is now supported as a backup storage backend. - Added a new onboarding guide. - Introduced `--external-url` and removed `--host` in the startup option.'
---

## 🚀 New Features

- AWS S3 is now supported as a backup storage backend.
- Added a new onboarding guide.
  ![onboarding-guide](/content/changelog/1.4.0/onboarding-guide.gif)

## 🎄 Enhancements

- Introduced `--external-url` and removed `--host` in the startup option. We have consolidated the way to configure the external visible URL. Check out [Configure External URL](/docs/get-started/install/external-url) for details.
- Added support for DDL/DML aliasing for GitOps name template.
- Added "view" in MySQL backup.
- Progress is now displayed for PITR restore tasks.
- Improved the performance of SQL Editor query result table.
- Added resizable columns for SQL Editor query result table.
- Improved the user experience of the SQL Editor tab bar.
- When making database changes through VCS, click on the database and you'll be directed to VCS according to the configured file path template.
- Changed statement type check error level to "Warning".
- The project key can not be empty.

## 🐞 Notable bug fixes

- Fixed the issue when adding a new file in the VCS with the existing migration schema version, the issue seems done but no tasks are executed.

## 🎠 Community

- Added tutorial series for **How to set up Database CI/CD with GitHub**:
  - [Part 1: Enable SQL Review with GitHub Actions](/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions)
  - [Part 2: GitHub.com Database GitOps](/docs/tutorials/github-database-cicd-part-2-github-database-gitops)
  - [Part 3: Put Them Together](/docs/tutorials/github-database-cicd-part-3-put-them-together)

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._
