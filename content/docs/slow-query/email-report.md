---
title: Slow Query Weekly Email Report
---

Bytebase will send a weekly summary report to the workspace admin, DBA, and project owner. This feature requires configuring the [SMTP server](/docs/administration/mail-delivery) in the workspace settings. Currently, Bytebase will send the weekly summary report every Saturday at 0:00 ~ 1:00 AM.

The weekly summary report for workspace admin and DBA includes the following information:

- All slow queries in the workspace in the last week.
- The slow queries will be grouped by environment, instance, database.
- Each database will report the top 5 slow queries.

![workspace-admin-and-dba-report](/content/docs/slow-query/workspace-admin-and-dba-report.webp)

The weekly summary report for project owner includes the following information:

- All slow queries in the project in the last week.
- The slow queries will be grouped by environment, instance, database.
- Each database will report the top 5 slow queries.

![project-owner-report](/content/docs/slow-query/project-owner-report.webp)
