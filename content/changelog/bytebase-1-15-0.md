---
title: Bytebase 1.15.0
author: Ningjing
published_at: 2023/03/30 17:00:00
feature_image: /content/changelog/1-15-0-banner.webp
description: '- SaaS version - GitOps supports Bitbucket Cloud - SQL Chat'
---

## 🚀 New Features

- Bytebase now offers a Cloud version [https://hub.bytebase.com/](https://hub.bytebase.com/).

- GitOps supports Bitbucket Cloud ([bitbucket.org](https://bitbucket.org)) as the Git provider. [https://www.bytebase.com/docs/vcs-integration/bitbucket-org](/docs/vcs-integration/bitbucket-org)

## 🎄 Enhancements

- SQL Review supports checking PostgreSQL view dependencies.

## 🐞 Bug Fixes

- Fixed the issue where some objects could not be recognized in MySQL 5.7.20-log version.
- Fixed the issue where MySQL could not recognize the creation of a database in the lower_case_table_names = 1 scenario.

## 📰 Fresh off the press

- Boost your productivity with ChatGPT's enhanced database tools! Read a (non-exhaustive) summary [https://www.bytebase.com/blog/chatgpt-enhanced-database-tools](/blog/chatgpt-enhanced-database-tools).
- Say goodbye to tedious SQL queries with SQL Chat, making database management a breeze with natural language processing [https://www.bytebase.com/blog/sql-chat](/blog/sql-chat).

## 📕 Installation and Upgrade

Follow [Installation](/docs/get-started/self-host). If you are upgrading from a previous version, restart after obtaining the latest release binary.
