---
title: Slow Queries
---

Slow Queries is a feature that helps you identify slow queries in your database. This feature is implemented based on [MySQL Slow Query Logs](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html) and [PostgreSQL pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html).

---

## Step 1 - Enable Slow Queries in Database

Before you can use this feature, you need to enable slow query logs in your database. Please refer to the following instructions:

- [Enable slow query log for MySQL](/docs/slow-query/enable-slow-query-log-for-mysql)
- [Enable pg_stat_statements for PostgreSQL](/docs/slow-query/enable-pg-stat-statements-for-postgresql)

## [Step 2 - Turn on Slow Queries Report in Bytebase](/docs/slow-query/slow-query-report)

After you enable slow query logs in your database, you can turn on the Slow Queries Report in Bytebase.
Only the workspace owner and DBA can turn on/off the Slow Queries Report.

## [Step 3 - Send Weekly Email Report](/docs/slow-query/email-report)

## [Step 4 - Enable Index Advisor](/docs/slow-query/index-advisor)
