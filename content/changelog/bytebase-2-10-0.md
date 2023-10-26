---
title: Bytebase 2.10.0
author: Mila
published_at: 2023/10/26 17:21:21
feature_image: /content/changelog/2-10-0-banner.webp
description: 'Run SQL Review checks without requiring a rollout. Predefine table templates.'
---

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._

## New Features

- More flexible options to appoint releaser to rollout changes: you can specify any dedicated role set, or the last approver of a custom approval process.
- Configure branch protection rules for projects.
- Set database labels.
- Set column labels.
- Set table classification.

## 🎄 Enhancements

- Support PostgreSQL 16.
- Create sub-branches from a branch.
- Select alternative target branches when merging.
- SQL Editor:
  - You can now abort queries.
  - Customize your database tree view.
- Issues: use local variables for SQL Server.
- Set Postgres, MySQL, Oracle, SQL Server, Snowflake query LIMIT with Parser.
- Display column type length in Table detail page (if applicable).

## 🐞 Bug Fixes

- Fixed: default column issue for Branching and Edit Schema.

## 📰 Fresh off the press

- DORA released its annual State of DevOps 2023 report a few days ago. There were some interesting conclusions made. Check out [our hot take](/blog/dora-state-of-devops-2023/) 🔥.
- How the Saudi-based E-commerce platform Salla [consolidates database change & access management with Bytebase](/blog/salla-case-study/) 🛍️.
- An audit (with detailed usage bills💸) of [the SaaS services we use daily](/blog/saas-services-behind-startup-2023) at Bytebase.
- A [Handy Tutorial](/docs/tutorials/database-cicd-best-practice-with-azure-devops/) to Database CI/CD Best Practice with Azure DevOps.