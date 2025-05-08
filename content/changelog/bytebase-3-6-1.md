---
title: Bytebase 3.6.1
author: Adela
updated_at: 2025/05/08 18:00:00
feature_image: /content/changelog/3-6-1-banner.webp
description: 'DML rollback supports unique indexes for major databases'
---

## 🚀 New Features

- DML rollback supports unique indexes for MySQL, PostgreSQL, Oracle and MSSQL.
- Improve wizard for initial workspace creation.
- Introduce **Parallel tasks per rollout** and **CI Data Sampling Size** options in project settings.

## 🎄 Enhancements

- Allow removal of any roles — including `workspace member` — from any workspace user, including `allUser`.
- Support setting custom expiration days when granting project roles.

## 🐞 Bug Fix

- Fix PostgreSQL schema autocomplete for names with special characters.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
