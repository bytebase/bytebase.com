---
title: Bytebase 1.2.1
author: Ningjing
published_at: 2022/7/7 17:20
description: "- In-place Point-in-time Recovery for the database (preview version). - Added GET /v1/sql/advise OpenAPI."
---

## 🚀 New Features

- In-place Point-in-time Recovery for the database (preview version).
  ![restore-database](/content/changelog/1.2.1/restore-database.webp)

- Added GET /v1/sql/advise OpenAPI.

It allows users to perform SQL reviews via API after configuring the schema review policy. Users can access its API documentation via `/swagger/index.html` once they start their Bytebase service.

![sql-open-api](/content/changelog/1.2.1/sql-open-api.webp)

## 🎄 Enhancements

- Added cluster support for ClickHouse database creation.
- Support GitLab merge request commit in GitOps workflow.
- Clicking on issue, project, database … table rows with cmd/ctrl pressed will open the link in a new tab.

## 🐞 Notable bug fixes

- Fixed unable to archive environment even when the environment has no active instance.
- Fixed unrecognized PostgreSQL index names with quotes.
- Fixed in VCS workflow, duplicate issues created upon receiving merge branch commit.

## 🎠 Community

- Thanks to [@Cluas](https://github.com/Cluas) for:
  - [fix(pg): need update current owner after switch database #1689](https://github.com/bytebase/bytebase/pull/1689)
  - [fix: ssl certs missing #1654](https://github.com/bytebase/bytebase/pull/1654)
- Thanks to [@Innei](https://github.com/Innei) for:
  - [perf: concurrent request improve fetch table data speed #1674](https://github.com/bytebase/bytebase/pull/1674)
  - [pref: concurrent request improve fetch table data speed #1660](https://github.com/bytebase/bytebase/pull/1660)
  - [feat(editor): add spin when editor is loading.#1659](https://github.com/bytebase/bytebase/pull/1659)
  - [pref: lazyload monaco editor speed up navigator to sql editor route #1655](https://github.com/bytebase/bytebase/pull/1655)

## 📕 Installation and Upgrade

Follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation). If you upgrade from a previous version, just restart after obtaining the new release binary.
