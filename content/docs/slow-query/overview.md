---
title: Slow Queries
---

Slow Queries is a feature that helps you identify slow queries in your database. This feature is implemented based on [MySQL Slow Query Logs](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html) and [PostgreSQL pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html).

## Enable Slow Queries in Database

Before you can use this feature, you need to enable slow query logs in your database. Please refer to the following instructions:

- [Enable slow query log for MySQL](/docs/slow-query/enable-slow-query-log-for-mysql)
- [Enable pg_stat_statements for PostgreSQL](/docs/slow-query/enable-pg-stat-statements-for-postgresql)

## Turn on Slow Queries Report in Bytebase

After you enable slow query logs in your database, you can turn on the Slow Queries Report in Bytebase.
Only the workspace owner and DBA can turn on/off the Slow Queries Report.

1. Go to the **Settings** page in Bytebase.

   ![slow-query-settings](/docs/slow-query/slow-query-settings.webp)

2. Go to the **Slow Query** tab.

   ![slow-query-tab](/docs/slow-query/slow-query-tab.webp)

3. Click the **Report** button to turn on the Slow Queries Report for instances.

   ![slow-query-report](/docs/slow-query/slow-query-report.webp)

If you don't enable slow query logs in your database, you will not be able to turn on the Slow Queries Report and get an error.

## View Slow Queries

After you turn on the Slow Queries Report, you can view the slow queries in the **Slow Queries** page.

![slow-query-page](/docs/slow-query/slow-query-page.webp)

You can filter the slow queries by environment, instance, database, and date range. Bytebase orders the slow queries by the maximum execution time in descending order.

![slow-query-dashboard](/docs/slow-query/slow-query-dashboard.webp)

Bytebase will sync the slow queries from the database every 12 hours. You can also click the **Sync Now** button to sync the slow queries immediately. Bytebase only stores the slow queries in the last 30 days. Bytebase will hard delete the slow queries older than 30 days.

![slow-query-sync-now](/docs/slow-query/slow-query-sync-now.webp)

Specifically, you can view the **Slow Query Detail** for each MySQL slow query.

![slow-query-detail](/docs/slow-query/slow-query-detail.webp)

## Slow Query Weekly Summary Report

Bytebase will send a weekly summary report to the workspace owner, DBA, and project owner. This feature requires configuring the [SMTP server](/docs/administration/mail-delivery) in the workspace settings. Currently, Bytebase will send the weekly summary report every Saturday at 0:00 ~ 1:00 AM.

The weekly summary report for workspace owner and DBA includes the following information:

- All slow queries in the workspace in the last week.
- The slow queries will be grouped by environment, instance, database.
- Each database will report the top 5 slow queries.

![workspace-owner-and-dba-report](/docs/slow-query/workspace-owner-and-dba-report.webp)

The weekly summary report for project owner includes the following information:

- All slow queries in the project in the last week.
- The slow queries will be grouped by environment, instance, database.
- Each database will report the top 5 slow queries.

![project-owner-report](/docs/slow-query/project-owner-report.webp)
