---
title: Bytebase 2.11.0
author: Ningjing
published_at: 2023/11/9 17:21:21
feature_image: /content/changelog/2-11-0-banner.webp
description: 'Support setting parameters for MySQL online schema change.'
---

## 🚀 New Features

- Support setting parameters for MySQL online schema change.
- Add **database viewer** role to **Project**. (Check [Roles and Permissions](/docs/concepts/roles-and-permissions/))
- Support OceanBase in Oracle Mode.

## 🎄 Enhancements

- Support choosing `All users` and assign roles in a project.
- Display table and column details on a hover panel in SQL Editor.
- Rearranged project page layout.

## 🪦 Deprecations

- The **Bookmarks** functionality will no longer be available in our forthcoming software update. We recommend utilizing your browser's bookmarking capabilities as an alternative. 

## 🐞 Bug Fixes

- Fixed: renaming files on Azure DevOps/Bitbucket doesn't trigger issue creation in Bytebase. 

## 🎠 Community

- Thanks to [@bds-congnguyen](https://github.com/bds-congnguyen) for fix: update bytebase-sql-review.yml for CICD [#8984](https://github.com/bytebase/bytebase/pull/8984)

## 📰 Fresh off the press

- Data masking is a crucial technique for safeguarding sensitive information. [This article](/blog/mysql-data-masking/) compares three methods to do it for MySQL 🐬.
- [This tutorial](/docs/tutorials/deploy-schema-migration/) shows you how to use Bytebase to deploy schema migrations with features like SQL Review, custom approval, time scheduling, and more 👓.
- Treat databases the same way we treat applications. It's time for [Bitbucket](/docs/tutorials/database-cicd-best-practice-with-bitbucket/) 🪣!

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._
