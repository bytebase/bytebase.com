---
title: Bytebase 2.12.0
author: Ningjing
published_at: 2023/12/14 15:21:21
feature_image: /content/changelog/2-12-0-banner.webp
description: 'Improve auto-completion and overall layout navigation.'
---

## 🚀 New Features

- Support advanced SQL auto-completion for MySQL.
- Support importing classification JSON data via UI.

## 🔔 Breaking Changes

- Sunset existing Enterprise trial license. New trial license is available upon request.

## 🎄 Enhancements

- Improve overall layout and navigation.
- Support displaying and querying partition tables in SQL Editor for PostgreSQL.
- Support TiDB 7.5.
- Improved filter experience for databases, instances and slow queries.
- Improved Schema Editor performance.
- Improved the compatibility of MySQL SQL Review.

## 🐞 Bug Fixes

- Fixed: can not query MongoDB if the result is too large.
- Fixed: can not query PostgreSQL view in SQL Editor.

## 🎠 Community

- Thanks to [@jinrenjie]([github.com](https://github.com/jinrenjie)) for the PR fix(smtp): fix host name error in smtp authentication [#9674](https://github.com/bytebase/bytebase/pull/9674)

## 📰 Fresh Off the Press

- We have recently updated our [The Database CI/CD Best Practice with GitHub](/docs/tutorials/database-cicd-best-practice-with-github) to align with the current workflow, making easier than before! 🎉
- Bytebase [partnered with Vettabase](/blog/bytebase-vettabase/), a top-notch open source #database services company with expertise in #automation. 🤝

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._