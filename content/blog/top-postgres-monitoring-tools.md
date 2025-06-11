---
title: Top Postgres Monitoring Tools and Best Practices in 2024
author: Tianzhou
updated_at: 2024/07/21 19:00:00
feature_image: /content/blog/top-postgres-monitoring-tools/banner.webp
tags: Industry
featured: true
description: 'Reviewing postgres monitoring tools and best practices.'
---

> If you don't monitor Postgres, you are not serious.

It's year 2024 and Postgres is keeping the momentums. The rise of [pg_vector](https://github.com/pgvector/pgvector), [Supabase](https://supabase.com/) and [Neon](https://neon.tech/) fuel the Postgres adoption. This post reviews the tools and best practices for monitoring your Postgres database.

## Open-source Tools

### pg_stat_statements

The first thing is to enable the `pg_stat_statements` extension.

```sql
CREATE EXTENSION pg_stat_statements;
```

`pg_stat_statements` tracks planning and execution statistics of all SQL statements executed by a server. It's
also a prerequisite for other more advanced monitoring solutions.

```shell
psql=# SELECT query, calls, total_exec_time, rows, 100.0 * shared_blks_hit /
               nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
          FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 5;
-[ RECORD 1 ]---+--------------------------------------------------​------------------
query           | UPDATE pgbench_tellers SET tbalance = tbalance + $1 WHERE tid = $2
calls           | 3000
total_exec_time | 20756.669379
rows            | 3000
hit_percent     | 100.0000000000000000
```

### explain.dalibo.com

![dalibo](/content/blog/top-postgres-monitoring-tools/dalibo.webp)

[explain.dalibo.com](https://explain.dalibo.com/) is a web UI to visiualize the Postgres EXPLAIN query plans.
It's also [open sourced on GitHub](https://github.com/dalibo/pev2) and can be embedded into your own web applications.

### Prometheus Postgres Exporter

[Prometheus Postgres Exporter](https://github.com/prometheus-community/postgres_exporter) extract Postgres database metrics and store them in Prometheus. From there, you can use Prometheus Alertmanager to configure alerting rules
and use Grafana to create dashboards.

## Proprietary Solutions

### pganalyze

![pganalyze](/content/blog/top-postgres-monitoring-tools/pganalyze.webp)

[pganalyze](https://pganalyze.com/) is a Postgres specific observability service. It provides in-depth SQL tuning
and performance monitoring. For the Scale plan, it starts with $399 per month including 4 database servers, each
additional server costs $100.

### DataDog

![datadog](/content/blog/top-postgres-monitoring-tools/datadog.webp)

DataDog provides [Postgres Database Monitoring](https://docs.datadoghq.com/database_monitoring/setup_postgres/selfhosted/). Its Postgres monitoring is not as extensive as pganalyze. DataDog's advantage is its integration
with the entire application stack and the CI/CD pipeline. The price starts at $70 per database server per month.

### Other Options

- [pgDash](https://pgdash.io/) has a similar feature set and pricing point to pganalyze. pgDash looks less
  polished. On the other hand, pgDash offers self-hosted option for all plans, whereas pganalyze only offers self-hosted option for the Enterprise plan.

  ![pgdash](/content/blog/top-postgres-monitoring-tools/pgdash.webp)

- [SolarWinds Database Performance Monitor (DPM)](https://www.solarwinds.com/database-performance-monitor) also provides Postgres database performance solution. Its technology comes from the VividCortex acquisition. It's cloud-only and has a steep starting price from $3,096.

## Best Practices

### Monitor Transaction ID Wraparound

Due to PostgreSQL's MVCC implementation, it has an infamous [transaction ID wraparound](https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-WRAPAROUND) risk. When this happens, it will render the entire
database unavailable, see some past incidents \([Sentry](https://blog.sentry.io/transaction-id-wraparound-in-postgres/), [Mailchimp](https://mailchimp.com/what-we-learned-from-the-recent-mandrill-outage/), [Figma](https://www.figma.com/blog/post-mortem-service-disruption-on-january-21-22-2020/)\). Every capable Postgres monitoring service and database service provider can check this risk:

- [pganalyze checks every 30 minutes](https://pganalyze.com/docs/checks/vacuum/txid_wraparound)
- [Implement an Early Warning System for Transaction ID Wraparound in Amazon RDS for PostgreSQL](https://aws.amazon.com/blogs/database/implement-an-early-warning-system-for-transaction-id-wraparound-in-amazon-rds-for-postgresql/)
- [GCP Cloud SQL high-transaction-ID-utilization recommender](https://cloud.google.com/sql/docs/postgres/recommender-high-transactionid-utilization)

### Monitoring Locks

Use [pg_locks](https://www.postgresql.org/docs/current/view-pg-locks.html) view to find any lock problems. You can
find connections that have held locks for a long time as well as connections that have waited too long to acquire the lock.

You should also consider enabling [log_lock_waits](https://www.postgresql.org/docs/current/runtime-config-logging.html#GUC-LOG-LOCK-WAITS).

### Avoid Blocking Operations

It's always a good practice to set [lock_timeout](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-LOCK-TIMEOUT) on the user.

When making DDL changes, try to use non-blocking statements. e.g. add index with [CONCURRENTLY](https://www.postgresql.org/docs/current/sql-createindex.html), add constraint with [NOT VALID](https://www.postgresql.org/docs/current/sql-altertable.html#SQL-ALTERTABLE-DESC-ADD-TABLE-CONSTRAINT).

<HintBlock type="info">

You can configure [SQL Review](https://docs.bytebase.com/sql-review/overview/) in Bytebase and detect such anti-patterns.

</HintBlock>

### Use a Cloud Postgres Service Provider

Every major Postgres database service provider has basic monitoring out of the box. If you have to self-host
due to budget or compliance reasons, then you can start with Prometheus/Grafana setup and upgrade to
pganalyze/DataDog as business grows.

---

A comprehensive monitoring solution can be intimidating. We try to provide actionable suggestions
to companies from different stages. Please let us know if you have other monitoring tools and best practices worth sharing to herd the elephant.
