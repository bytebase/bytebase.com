---
title: Bytebase 2.9.1
author: Ningjing
published_at: 2023/10/12 17:21:21
feature_image: /content/changelog/2-9-1-banner.webp
description: 'Group changes into a changelist and apply them in one issue or export.'
---

## 🚀 New Features

- Group changes into a changelist and apply them in one issue or export.
- Batch query on multiple databases with selected labels in SQL Editor.
- Support integrating [external secret manager](/docs/get-started/instance/#use-secret-manager) to store database credentials.
- Support Branching for PostgreSQL and TiDB.

## 🎄 Enhancements

- Support database labeling with multiple key-value pairs.
- SQL Editor supports reporting the exact line and column where the syntax error occurs. 
- Edit Schema / Change Data button on the homepage supports selecting multiple databases from the same project.

## 🎠 Community

- Thanks to [@CorrectRoadH](https://github.com/correctroadh) for PR chore: fix warning of compiler-sfc [#5864](https://github.com/bytebase/bytebase/pull/5864).
- Thanks to [@yagueto](https://github.com/yagueto) for PR feat(frontend): Adds a hover effect when hovering an announcement [#8553](https://github.com/bytebase/bytebase/pull/8553).

## 📰 Fresh off the press

- Bytebase Q3 2023 was a busy quarter, with new releases, popular posts, and product updates. We're excited to share a sneak peek at what we accomplished in [our retrospective](/blog/2023-q3-retrospect).

- Data Masking can helps organizations to protect sensitive data from being exposed to unauthorized users. Learn how with this tutorial: [Step-by-Step Guide to Data Masking](/docs/tutorials/data-masking/).

## 📕 Installation and Upgrade

Follow [Installation](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary.
