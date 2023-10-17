---
title: Bytebase 0.7.2
published_at: 2021/10/25 02:36:59
description: Support ClickHouse, the open-source, high performance columnar OLAP database management system for real-time analytics using SQL.
---

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._

## 🚀 New Features

### Support ClickHouse 🖱🏠

[ClickHouse](https://clickhouse.com/)® is an open-source, high performance columnar OLAP database management system for real-time analytics using SQL and it has a similar schema management requirement see [#issue14](https://github.com/bytebase/bytebase/issues/14).

## 🎄 Enhancement

- Refresh the database list immediately after updating the instance connection info.
- Add shortcut button to create new database from the instance detail page.
- Hide empty password checkbox in instance creation form. User can already leave the password field empty, so there is no need to have an extra checkbox.
