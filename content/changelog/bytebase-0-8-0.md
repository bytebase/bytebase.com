---
title: Bytebase 0.8.0
published_at: 2021/11/10 17:12:53
description: Snowflake support
---

## 🚀 New Features

### Support Snowflake ❄️

[Snowflake®](https://snowflake.com) is a cloud-based data storage and analytics service. It allows corporate users to store and analyze data using cloud-based hardware and software.

## 🐞 Notable Bug Fixes

- Mark the migration history as failed if the migration did fail.
- Fix the PostgreSQL schema sync from AWS RDS and Google Cloud SQL [#30](https://github.com/bytebase/bytebase/issues/30).
- Allow Bytebase to run on non-https host [#31](https://github.com/bytebase/bytebase/issues/31).

## 🎄 Enhancement

- Improve migration history table layout and surface migration SQL from the list.

### 📕 Upgrade instruction

- For fresh installation, follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation).
- This version has some breaking schema change, please contact [support@bytebase.com](mailto:support@bytebase.com) and we will help you manually upgrade to the new version.
