---
title: 'Bytebase 1.10.0 Deep Dive'
author: Tianzhou
published_at: 2023/01/04 23:21:21
feature_image: /blog/1-10-0-new-features/1-10-0-banner.webp
tags: Explanation
description: Last week, we released Bytebase 1.10.0. Let's take a deeper look into the new features - Audit Log - Terraform Provider to manage user roles in PostgreSQL - Support for large SQL files.
---

This is the last release in 2022, and we upgraded Bytebase from 1.9.1 to [1.10.0](/changelog/bytebase-1-10-0). With 200+ commits, let’s take a closer look at what new capabilities are released this time 👇

## Audit Log

We continue to enhance Bytebase’s security control capabilities with the new [Audit Log](/docs/administration/audit-log) module, which is accessible to Workspace owners and DBAs. The current Audit Log records member changes, database transfers, and SQL Editor queries. In future releases, Bytebase will be able to capture more events in the Audit Log.

![_](/blog/1-10-0-new-features/audit-log.webp)

## Enhanced Terraform Bytebase Provider

Next up is the enhanced [Terraform Provider](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs/resources/database_role). We added instance and environment resources management in the last version, and for this version, we added RBAC for PostgreSQL. This way, the entire user access lifecycle in PostgreSQL can be managed by the Terraform Bytebase Provider, and we plan to implement the same for MySQL soon.

![_](/blog/1-10-0-new-features/terraform-provider-role.webp)

## Large SQL Files

Finally, it is worth mentioning the newly added support for large SQL files, up to **100 MB**. This request came from a user who wanted to make large amounts of data changes. Bytebase implemented this feature in a relatively clever way, as we introduced a sheet model in the SQL Editor, so for large SQL files, Bytebase handles it by having the user upload the SQL to the sheet first.

![_](/blog/1-10-0-new-features/upload-sql-sheet.webp)

That’s it for the 1.10.0 deep dive. Looking back over the past year, at a 2-week release frequency, team Bytebase submitted ~4,000 PRs and released 25 versions.

Some features come naturally, such as the Audit Log; some were inspired by our users, such as the Terraform Bytebase Provider; and some have been foreshadowed at the beginning of 2022, such as the introduction of the sheet model. We are thrilled to see that the sheet model works perfectly with large SQL files.

In 2023, Bytebase will continue to bring value to our users, and we are also looking forward to inspiration from our users.
