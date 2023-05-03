---
title: Bytebase 1.9.0
author: Ningjing
published_at: 2022/12/1 17:00:00
description: "- Support managing with environment and instance via Terraform provider. - Support synchronizing schema for PostgreSQL. - Support masking column-level sensitive data. - New UI for Admin mode of SQL Editor."
---

## 🚀 New Features

- Support managing environment and instance via Terraform provider: [https://bytebase.com/docs/get-started/terraform](/docs/get-started/terraform)
- Support synchronizing schema for PostgreSQL🐘 Currently in beta, we support Schema, Table, Index, Constraint, and Sequence so far.
- Support masking column-level sensitive data for MySQL🐬.
- New UI for Admin mode of SQL Editor.

## 🎄 Enhancements

- Support updating the user's email.
- Approve button on the issue detail page is disabled while task checks are still in progress.
- Display more detailed information when it comes to approval for the current stage.
- Verify the configured branch's existence in the GitOps workflow setup.

## 🐞 Notable Bug Fixes

- Prevent creating duplicate instances with a poor network connection.
- Prevent creating duplicate issues with a poor network connection.

## 🎠 Community

- Support managing with Supabase databases: [https://bytebase.com/docs/how-to/integrations/supabase](/docs/how-to/integrations/supabase)

## 📰 Fresh Off the Press

- [How to Manage Database Access Control](/blog/how-to-manage-database-access-control)
- [MotherDuck, from SQLite to the Docker for Data](/blog/motherduck-from-sqlite-to-the-docker-for-data)
- [How to Synchronize Database Schemas](/blog/how-to-synchronize-database-schemas)
- [How Schema Sync Works in Bytebase](/blog/how-schema-sync-work)

## 📕 Installation and Upgrade

Follow [Installation](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the newest release binary.
