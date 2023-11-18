---
title: Turn on Slow Queries Report in Bytebase
---

After you enable slow query logs in your database, you can turn on the Slow Queries Report in Bytebase. Only the workspace admin and DBA can turn on/off the Slow Queries Report.

1. Go to the **Settings** page in Bytebase.

   ![slow-query-settings](/content/docs/slow-query/slow-query-settings.webp)

2. Go to the **Slow Query** tab.

   ![slow-query-tab](/content/docs/slow-query/slow-query-tab.webp)

3. Click the **Report** button to turn on the Slow Queries Report for instances.

   ![slow-query-report](/content/docs/slow-query/slow-query-report.webp)

If you don't enable slow query logs in your database, you will not be able to turn on the Slow Queries Report and get an error.

## View Slow Queries

After you turn on the Slow Queries Report, you can view the slow queries in the **Slow Queries** page.

![slow-query-page](/content/docs/slow-query/slow-query-page.webp)

You can filter the slow queries by environment, instance, database, and date range. Bytebase orders the slow queries by the maximum execution time in descending order.

![slow-query-dashboard](/content/docs/slow-query/slow-query-dashboard.webp)

Bytebase will sync the slow queries from the database every 12 hours. You can also click the **Sync Now** button to sync the slow queries immediately. Bytebase only stores the slow queries in the last 30 days. Bytebase will hard delete the slow queries older than 30 days.

![slow-query-sync-now](/content/docs/slow-query/slow-query-sync-now.webp)

Specifically, you can view the **Slow Query Detail** for each MySQL slow query.

![slow-query-detail](/content/docs/slow-query/slow-query-detail.webp)
