---
title: Bytebase 3.3.0
author: Ningjing
updated_at: 2025/01/16 17:00:00
feature_image: /content/changelog/3-3-0-banner.webp
description: 'SOC 2'
---

## 🛡️ SOC 2

We have obtained SOC 2 Type 1 certification. This certification validates our commitment to maintaining the highest standards of security, availability, and confidentiality in our database DevSecOps platform.

To request our SOC 2 Type 1 report, please email [support@bytebase.com](mailto:support@bytebase.com).

## 🔔 Breaking Changes

- Simplify data masking, both UI and API are affected, check [docs](/docs/security/data-masking/overview/) and [API examples](https://github.com/bytebase/database-security-github-actions-example/tree/main/masking) for details. Behavior changes:
  - Global masking takes precedence over column masking. Previously, column masking takes precedence over global masking.
  - Eliminate masking levels. For both global masking and column masking, you now configure the associated semantic type. Semantic type in turn maps to the corresponding masking algorithm.

## 🚀 New Features

- Introduce "release", the new versioned database schema migration workflow. Create releases, which are versioned migration scripts bundled as a package to deploy, tell Bytebase which databases to deploy, and Bytebase will figure out which scripts to execute or skip if already executed.

- Support CosmosDB.

- Add project setting to allow users to self-approval their own issues.

- Schema Synchronization supports PostgreSQL materialized view.

- Preliminary support PostgreSQL 17.

## 🎄 Enhancements

- Copy query results by selected columns or rows in SQL Editor.

- Enhance Oracle data backup experience.

- Improve the loading time for the database anomalies page.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>