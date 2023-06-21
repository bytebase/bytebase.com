---
title: Bytebase 2.3.0
author: Mila
published_at: 2023/06/21 17:21:21
feature_image: /content/changelog/2-3-0-banner.webp
description: "SQL Review for Snowflake. Anonymize data for Oracle. Export Center for data exports."
---

## 🚀 New Features

- [SQL Review](/docs/sql-review/review-rules/) for Snowflake.
- [Anonymize data](/docs/security/anonymize-data/) for Oracle.
- Introduced [Export Center](/docs/security/data-export/#download-in-export-center) for data exports.

## 🎄 Enhancements

- Configure [External Approval Nodes](/docs/administration/custom-approval/#external-approval) and apply to custom approval flows.
- Introduced **Send back** action for Approval Flows.
- Renamed Project's **Tenant Mode** to **Batch Mode**.
- Improved SQL Query and Export request flow experience.
- Improved project member page layout.

## 🐞 Bug Fixes

- Fixed a bug where migration fails with `invalid connection` when the connection timeouts.
- Fixed a bug where export data file content is truncated incorrectly by special characters.

## 🎠 Community

- Thanks to @whhe for fix: add missing rule mapping for OceanBase [#6576](https://github.com/bytebase/bytebase/pull/6576)

## 📰 Fresh off the press

- Which is better for you, Bytebase or Flyway? Check out [our latest guide](/blog/bytebase-vs-flyway/).
- [Evolution](/blog/top-database-schema-change-tool-evolution/) of database schema change tools.
- 🐘 We recently migrated to Neon for [SQL Chat](http://sqlchat.ai)'s setup. See [our journey](/blog/migrating-postgres-from-render-to-neon/).

## 📕 Installation and Upgrade

Follow [Installation](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary.