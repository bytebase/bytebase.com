---
title: Bytebase 3.0.1
author: Adela
updated_at: 2024/11/7 17:00:00
feature_image: /content/changelog/3-0-1-banner.webp
description: 'Configurable DDL/DML Execution in SQL Editor'
---

## 🚀 New Features

- Add an environment policy to allow executing DDL/DML statements directly in SQL Editor.
- Support data masking for BigQuery.
- Support [rollback to a specific version in the change history](/docs/change-database/change-history/) on the database page.
- Add data access control and masking page under each project.

## 🔔 Breaking Changes

- Disallow issue creators from approving their own issues.
- SQL review configuration API supports upsert via `PATCH`. For example, `PATCH /v1/reviewConfigs/not_exist_review_config?allow_missing=true`

## 🎄 Enhancements

- Remove the export limit for audit logs.
- Optimize CPU usage during synchronization on MySQL instances.

## 💰 Pricing Adjustments

- The database group/batch change feature is now extended to the **Pro Plan** besides the **Enterprise Plan**.
- The Pro plan is now billed per user instead of per database instance. [/pricing](/pricing)

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
