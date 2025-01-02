---
title: Bytebase 3.2.0
author: Ningjing
updated_at: 2025/01/02 17:00:00
feature_image: /content/changelog/3-2-0-banner.webp
description: 'Selectively sync databases from an instance'
---

## 🚀 New Features

- Selectively sync databases from an instance.
- Show the definition of TABLE and VIEW for Redshift and ClickHouse.

## 🔔 Breaking Changes

- `Change History` module is renamed to `Changelog`. `ChangeHistory` API is removed, use `Changelog` API instead.
- Changes initiated from the UI no longer carry the version, but changes initiated from GitOps still do.
- Tasks with lower versions will block tasks with higher versions.

## 🎄 Enhancements

- Support querying special date/time values(e.g., infinity) for PostgreSQL in SQL Editor.
- Failed task run is now recorded to changelog, before it's not.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
