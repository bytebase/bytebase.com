---
title: Bytebase 2.16.0
author: Ningjing
published_at: 2024/4/25 17:00:00
feature_image: /content/changelog/2-16-0-banner.webp
description: 'Brand new GitOps'
---
## 🚀 New Features

- Support DML change pre-backup for Oracle and SQL Server.
- Support display for procedures and functions in SQL Editor.
- Support storing database passwords in [AWS Secrets Manager](/docs/get-started/instance/#aws-secrets-manager) and GCP Secret Manager.
- Support IAM-based connections to Google Cloud SQL for MySQL and PostgreSQL.
- Support editing table partitions in schema editor for MySQL and TiDB.

## 🔔 Breaking Changes

- Deprecated Manage on Database Mode for Oracle; now only supports Schema Mode.

## 🎄 Enhancements

- Support previewing SQL file uploads with custom encoding.
- Improve auto-completion in the SQL Editor.

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._
