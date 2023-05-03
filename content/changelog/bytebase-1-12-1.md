---
title: Bytebase 1.12.1
author: Ningjing
published_at: 2023/02/16 17:00:00
feature_image: /changelog/1-12-1-banner.webp
description: "- Support OAuth 2.0 for Single Sign-On (SSO). - Support change and query for Spanner. - Support watermark. - Mask sensitive fields for PostgreSQL "
---

## 🚀 New Features
- Support OAuth 2.0 for Single Sign-On (SSO) [www.bytebase.com/docs/administration/sso/oauth2](/docs/administration/sso/oauth2).
- Support change and query for Spanner [www.bytebase.com/docs/introduction/supported-databases](/docs/introduction/supported-databases).
- Support watermark [www.bytebase.com/docs/administration/watermark](/docs/administration/watermark).
- Terraform Bytebase provider supports MySQL role CRUD.
- Mask sensitive fields for PostgreSQL.

## 🎄 Enhancements
- For projects with GitOps workflow enabled, schema and data changes are also supported through UI.
- Supports executing statements in PostgreSQL that cannot be executed in a transaction, such as CREATE/DROP INDEX CONCURRENTLY.
- Improved onboarding flow.
- Start a 14-day trial of the Enterprise Plan by default.
- Improved Schema Editor's UX.
- Improved Schema Diagram: filtering, navigation, focusing and export PNG files. [www.bytebase.com/docs/change-database/schema-diagram](/docs/change-database/schema-diagram)
- Rename "Protected environment" to "Production environment". [www.bytebase.com/docs/administration/environment-policy/tier](/docs/administration/environment-policy/tier)
- Improved schema viewing and editing experience in SQL Editor.
- Add an icon to identify sensitive data columns in the query result of SQL Editor.

## 🐞 Notable Bug Fixes
- Fixed: Change history detail in MongoDB collection pages doesn't work correctly.

## 🎠 Community
- Thanks to [@alexey-milovidov](https://github.com/alexey-milovidov) for PR: Change ClickHouse Docker repository. [\#4648](https://github.com/bytebase/bytebase/pull/4648)

## 📰 Fresh off the press
- We are proud to announce:
  - Technology Partnership with the world's leading software development platform GitHub, to provide developers with a smooth database development experience. [Announcing Partnership with GitHub to Automate Database Development](/blog/bytebase-github-technology-partner)
  - Partnership with PingCAP, the company building TiDB, which provides scaling database infrastructure solutions via an open-source platform. [Streamline Database Change Management for TiDB Cloud with Bytebase](/blog/streamline-database-change-management-for-tidb-cloud-with-bytebase)
- We officially announced [Terraform Bytebase Provider](/blog/introducing-terraform-bytebase-provider), which will allow you to codify the database configuration and consolidate your workflow. 
- Ready to bring your MySQL schema change to the next level? The Database Change Management tutorial series continues!
  - Step 1 - [Database Change Management with MySQL](/blog/database-change-management-with-mysql)
  - Step 2 - [Database Change Management with MySQL and GitHub](/blog/database-change-management-with-mysql-and-github)

## 📕 Installation and Upgrade
Follow [Installation](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary.
