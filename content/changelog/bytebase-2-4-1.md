---
title: Bytebase 2.4.1
author: Mila
updated_at: 2023/07/20 17:21:21
feature_image: /content/changelog/2-4-1-banner.webp
description: 'Support GitHub Enterprise for VCS integration; export data as XLSX files; manage Oracle instance based on schema'
---

## 🚀 New Features

- Support [GitHub Enterprise](/docs/vcs-integration/github-enterprise/) for VCS integration.
- Support Export Data as XLSX.
- Manage Oracle instance [based on schema](/docs/get-started/instance/#oracle).

## 🎄 Enhancements

- Support masking sensitive data for CTE in Oracle.
- Support more [SQL Review Rules](/docs/sql-review/review-rules/) for Snowflake.
- [DAC](/docs/security/database-permission/overview/) (Data Access Control) now supports more types of Snowflake SQL statements.
- Improved the file format of data export as JSON.
- Disable copying data via SQL Editor by configuring Environment Policy.
- Prepared one test and prod instance each, for onboarding purposes.
- Added `--disable-sample` to disable running sample instance on startup.

## 📰 Fresh off the press

- It's 2023, choosing between [Postgres and MySQL](/blog/postgres-vs-mysql/) is still hard!
- A list of the [top 5 MySQL GUI Clients](/blog/top-mysql-gui-client/), and let's not forget about [Postgres](/blog/top-postgres-gui-client/)!
- Extensibility is PostgreSQL's DNA, what are the [top Postgres extensions](/blog/top-postgres-extension/)?
- 🔥A non-exhaustive list of [DBaaS providers](/blog/database-as-a-service-dbaas-provider/) on the market.
- Plus some handy tutorials:
  - Common [mysql commands with examples](/reference/mysql/how-to/top-mysql-commands-with-examples/).
  - How to [install MySQL Client](/reference/mysql/how-to/how-to-install-mysql-client-on-mac-ubuntu-centos-windows/) on Mac, Ubuntu, CentOS, or Windows
  - Snowflake Schema Change [Best Practice](/blog/snowflake-schema-change/).

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
