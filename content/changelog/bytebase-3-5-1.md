---
title: Bytebase 3.5.0
author: Ayra
updated_at: 2025/03/27 18:00:00
feature_image: /content/changelog/3-5-1-banner.webp
description: 'Added Cosmos DB SQL filtering and projection support in SQL Editor'
---

## 🚀 New Features

- Support `WHERE` clauses and `SELECT` projections in Cosmos DB SQL syntax within SQL Editor.
- Support connecting to OpenSearch using the Elasticsearch client library.

## 🎄 Enhancements

- Expanded connection parameter support for PostgreSQL, MySQL, Microsoft SQL Server, and Oracle databases.
- Optimized PostgreSQL table deletion by eliminating redundant DROP statements for constraints and indexes.
- Support server-side identifier case sensitivity for OceanBase.
- Enhanced binary data visualization.
  - Updated formatting options for boolean, binary, hexadecimal, and text representations.
  - Implemented customizable binary display preferences at both column and individual cell levels.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
