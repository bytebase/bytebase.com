---
title: Bytebase 0.7.2
published_at: 2021/10/25 02:36:59
description: Support ClickHouse, the open-source, high performance columnar OLAP database management system for real-time analytics using SQL.
---

## 🚀 New Features

### Support ClickHouse 🖱🏠

[ClickHouse](https://clickhouse.com/)® is an open-source, high performance columnar OLAP database management system for real-time analytics using SQL and it has a similar schema management requirement see [#issue14](https://github.com/bytebase/bytebase/issues/14).

## 🎄 Enhancement

- Refresh the database list immediately after updating the instance connection info.
- Add shortcut button to create new database from the instance detail page.
- Hide empty password checkbox in instance creation form. User can already leave the password field empty, so there is no need to have an extra checkbox.

### 📕 Upgrade instruction

- For fresh installation, follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation).
- If you upgrade from 0.7.x, no migration needed. If you upgrade before 0.7.x, there is some breaking schema change, please contact [support@bytebase.com](mailto:support@bytebase.com) and we will help you manually upgrade to the new version.
