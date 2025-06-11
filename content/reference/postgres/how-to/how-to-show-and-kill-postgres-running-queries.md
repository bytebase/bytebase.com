---
title: How to Show and Kill Postgres Running Queries
---

## Basic Query Monitoring

**View All Running Queries:**

```sql
SELECT pid, usename, datname, state, query_start, now() - query_start AS duration, query
FROM pg_stat_activity
WHERE state != 'idle';
```

**Find Long-Running Queries:**

```sql
SELECT pid, usename, datname, state,
       now() - query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active'
  AND now() - query_start > interval '1 minute'
ORDER BY duration DESC;
```

**Check how many active queries are running:**

```sql
SELECT count(*) FROM pg_stat_activity WHERE state = 'active';
```

## Terminating Queries

**Cancel a Specific Query:**

```sql
-- Cancel query using process ID (PID)
SELECT pg_cancel_backend(12345);

-- Check if query is still running
SELECT pid, state FROM pg_stat_activity WHERE pid = 12345;
```

**Forcibly Terminate a Connection:**

```sql
-- Terminate connection using process ID (PID)
SELECT pg_terminate_backend(12345);

-- Check if query is still running
SELECT pid, state FROM pg_stat_activity WHERE pid = 12345;
```

## Batch Operations

**Cancel All Queries for a Specific User:**

```sql
SELECT pg_cancel_backend(pid)
FROM pg_stat_activity
WHERE usename = 'problem_user'
  AND state = 'active';
```

**Kill Queries Running Longer Than 5 Minutes:**

```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'active'
  AND now() - query_start > interval '5 minutes'
  AND query NOT ILIKE '%pg_stat_activity%';

-- Check for any remaining long-running queries
SELECT count(*) FROM pg_stat_activity
WHERE state = 'active' AND now() - query_start > interval '5 minutes';
```

<HintBlock type="info">

Always try `pg_cancel_backend()` before using `pg_terminate_backend()`. Cancellation allows queries to exit gracefully, while termination may cause transaction rollbacks and potential data consistency issues.

</HintBlock>

## Regular Monitoring Script

For ongoing monitoring, create a simple shell script:

```bash
#!/bin/bash
# Save as monitor_queries.sh

PGPASSWORD=your_password psql -h localhost -U postgres -d your_database -c "
SELECT pid,
       usename,
       datname,
       state,
       now() - query_start AS duration,
       substring(query, 1, 50) AS query_preview
FROM pg_stat_activity
WHERE state = 'active'
ORDER BY duration DESC
LIMIT 10;"
```

Make it executable and run periodically with cron:

```bash
chmod +x monitor_queries.sh

# Add to crontab to run every 5 minutes
# crontab -e
# */5 * * * * /path/to/monitor_queries.sh >> /var/log/pg_queries.log 2>&1
```

<HintBlock type="info">

For enterprise PostgreSQL management, Bytebase provides [built-in monitoring dashboards](https://docs.bytebase.com/introduction/features/) with automatic detection of problematic queries and drill-down capabilities for deep inspection.

</HintBlock>

## References

- [PostgreSQL pg_stat_activity Documentation](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW)
- [PostgreSQL Server Administration Functions](https://www.postgresql.org/docs/current/functions-admin.html)
- [PostgreSQL Performance Monitoring](https://www.postgresql.org/docs/current/monitoring-stats.html)
- [Postgres Guide: Dealing with Long Running Queries](https://postgresguide.com/)
