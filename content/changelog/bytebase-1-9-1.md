---
title: Bytebase 1.9.1
author: Mila
published_at: 2022/12/15 17:00:00
description: "- Support database access control. - Schema Editor for MySQL. - Check Mark as done to skip a task. - Mark issue as Needs Attention."
---

## 🚀 New Features

- Support [database access control](/docs/administration/database-access-control).
- [Schema Editor](/docs/change-database/schema-editor) for MySQL.
- Check "Mark as done" to skip a task.
- The issue creator can mark an issue as "Needs attention", which is highlighted in the assignee's view.

## 🎄 Enhancements

- Terraform Bytebase Provider
  - Manage [instance details](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs/resources/instance).
  - Manage [environment details](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs/resources/environment).
- [Data masking](/docs/administration/anonymize-data) for MySQL databases now supports all query types.
- [Schema Sync for PostgreSQL](/docs/change-database/synchronize-schema) supports Enum Type, Function, Trigger, and Extension.
- Trigger [Feishu external approval](/docs/administration/webhook-integration/external-approval) manually.
- [Tenant database label](/docs/batch-change/overview#labels) supports arbitrary values without pre-definition.
- A fresh look for SQL Editor's [Admin mode](/docs/sql-editor/admin-mode) tabs.
- Speed up issue creation and execution.

## 📰 Fresh off the press

- We asked ChatGPT how to choose the best database for a new project, and [here's the reply](/blog/how-to-choose-database-by-chatgpt).
- The [pros and cons](/blog/integrate-sql-review-into-github) of 3 different ways to integrate SQL Review into your GitHub repo.
- [Integrate SQL review CI](/blog/how-to-integrate-sql-review-into-gitlab-github-ci) into your preferred code repo (be it GitHub or GitLab), so that it's triggered automatically to check for violations in your SQL scripts
- Database Schema Change Series
  - [What is Database Change Management (DCM)?](/blog/what-is-database-change-management)
  - [How to Handle Database Schema Change?](/blog/how-to-handle-database-schema-change)

## 📕 Installation and Upgrade

Follow [Installation](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the newest release binary.
