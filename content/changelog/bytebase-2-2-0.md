---
title: Bytebase 2.2.0
author: Ningjing
published_at: 2023/06/09 16:30:00
feature_image: /content/changelog/2-2-0-banner.webp
description: 'Support batch change by database groups in tenant projects; Support table-level data query requests; SQL Editor supports multiple running SQL SELECT statements in one query; Support SQL review for OceanBase.'
---

## 🚀 New Features

- Support batch change by [database groups](/docs/change-database/batch-change/#change-databases-from-database-groups) in tenant projects.
- Support [table-level data query requests](/docs/security/data-query/#apply-for-querier-role-at-table-level).
- SQL Editor supports multiple running SQL SELECT statements in one query.
- Support SQL review for OceanBase.

## 🎄 Enhancements

- Display warnings on oversized sheets.
- Support loading files larger than 1MB from GitHub.

## 🎠 Community

- Thanks to [@whhe](https://github.com/whhe) for feat: enable existing Mysql advisor rules for OceanBase [#6355](https://github.com/bytebase/bytebase/pull/6355)

## 📰 Fresh off the press

- As we approach the halfway point of 2023, how are [our predictions](/blog/database-review-2022/) for the database market holding up? 🤓
- Are you looking for Database CI/CD tools? Bytebase and Liquibase are two options. [This article](/blog/bytebase-vs-liquibase/) helps you understand their differences. 👀
- Longbridge Whale, a financial service SaaS provider, solved the problem of schema changes in tenant mode with Bytebase. You can learn more about [their success story in case study](/blog/longbridge-case-study/). 🥳

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
