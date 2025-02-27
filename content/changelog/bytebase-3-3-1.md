---
title: Bytebase 3.3.1
author: Adela
updated_at: 2025/01/30 17:00:00
feature_image: /content/changelog/3-3-1-banner.webp
description: 'Support 1-click DML rollback for Oracle'
---

## 🚀 New Features

- Support 1-click DML rollback for Oracle.
- Support AppRole method for Vault while connecting to an instance.

## 🎄 Enhancements

- In SQL Editor, pressing `Cmd+Enter` will execute the query on the current line where the cursor is located.
- Add compatibility with PostgreSQL extension CITUS.
- Improve the performance for `GetChangelog` and `GetDatabaseSchema` APIs.

## 🔔 API Changes

- Remove `concise` parameter from `GetChangelog` and `GetDatabaseSchema` APIs.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
