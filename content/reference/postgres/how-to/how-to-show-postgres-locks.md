---
title: How to show Postgres locks
---

PostgreSQL, like any database system, uses locks to maintain data consistency during concurrent operations. Understanding these locks can be essential for troubleshooting performance issues and deadlocks. This guide will walk you through various methods to view and analyze locks in PostgreSQL.

## Viewing Current Locks

### Using pg_locks View

The most basic way to view locks is through the `pg_locks` system view:

```sql
SELECT * FROM pg_locks;
```

However, this query returns a lot of information that can be difficult to interpret. Let's look at more useful queries.

### Viewing Locks on Specific Tables

To check locks on a specific table:

```sql
SELECT locktype,
       relation::regclass,
       mode,
       granted,
       pid,
       pg_blocking_pids(pid) as blocked_by
FROM pg_locks
WHERE relation = 'your_table_name'::regclass
ORDER BY pid;
```

### View Locks with Relation Names

To see locks with table names instead of just OIDs:

```sql
SELECT l.locktype,
       l.database,
       l.relation,
       l.page,
       l.tuple,
       l.virtualxid,
       l.transactionid,
       l.classid,
       l.objid,
       l.objsubid,
       l.virtualtransaction,
       l.pid,
       l.mode,
       l.granted,
       r.relname,
       a.rolname
FROM pg_locks l
LEFT JOIN pg_class r ON (l.relation = r.oid)
LEFT JOIN pg_authid a ON (l.pid = a.oid)
ORDER BY l.pid;
```

### Identify Blocking Locks

To find sessions that are blocking other sessions:

```sql
SELECT blocked_locks.pid AS blocked_pid,
       blocked_activity.usename AS blocked_user,
       blocking_locks.pid AS blocking_pid,
       blocking_activity.usename AS blocking_user,
       blocked_activity.query AS blocked_statement,
       blocking_activity.query AS blocking_statement
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks blocking_locks
    ON blocking_locks.locktype = blocked_locks.locktype
    AND blocking_locks.database IS NOT DISTINCT FROM blocked_locks.database
    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
    AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
    AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
    AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
    AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
    AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
    AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid
    AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid
    AND blocking_locks.pid != blocked_locks.pid
JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.granted;
```

## Using pg_stat_activity with Locks

To see what queries are holding locks:

```sql
SELECT a.datname,
       l.relation::regclass,
       l.locktype,
       l.mode,
       l.granted,
       a.usename,
       a.query,
       a.pid
FROM pg_stat_activity a
JOIN pg_locks l ON l.pid = a.pid
WHERE a.datname = current_database()
ORDER BY a.pid;
```

## Monitoring Lock Wait Time

PostgreSQL 9.6+ has the `pg_stat_activity.wait_event` column to show what a process is waiting for:

```sql
SELECT pid,
       usename,
       application_name,
       state,
       wait_event_type,
       wait_event,
       query
FROM pg_stat_activity
WHERE state = 'active' AND wait_event IS NOT NULL;
```

## Dealing with Locks

Sometimes you may need to terminate a session that's holding a problematic lock:

```sql
SELECT pg_terminate_backend(pid);
```

Be careful with this command as it will forcibly terminate the connection.
