---
title: Bytebase 2.16.0
author: Ningjing
published_at: 2024/4/25 17:00:00
feature_image: /content/changelog/2-16-0-banner.webp
description: 'Support DML change pre-backup for Oracle and SQL Server'
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

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
