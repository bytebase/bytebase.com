---
title: Bytebase 3.6.2
author: Ayra
updated_at: 2025/05/23 12:00:00
feature_image: /content/changelog/3-6-2-banner.webp
description: 'Enhance SQL Editor Experience'
---

## 🚀 New Features

- Enhance SQL Editor experience.

  - Support database group in the batch query.
  - Store the query result history. The history is only stored in the browser locally.
  - Lazy query. Only execute the query request on-demand when users click the tab.

- Display SQL Server trigger body in SQL Editor.

## 🔔 Breaking Changes

- Remove deprecated Activity_Type enums in project_service.proto (won't affect users as they were never used).

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
