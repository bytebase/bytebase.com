---
title: How to Show MySQL Process List and Kill Process
---

## Basic Process Monitoring

**View All Running Processes:**

```sql
-- Simple process list (truncated query text)
SHOW PROCESSLIST;

-- Full process list with complete queries
SHOW FULL PROCESSLIST;
```

**Find Long-Running Queries:**

```sql
-- Simple approach for queries running longer than 60 seconds
SELECT id, user, db, time as seconds_running, info as query
FROM information_schema.processlist
WHERE command != 'Sleep'
  AND time > 60
ORDER BY time DESC;
```

**Check how many active queries are running:**

```sql
SELECT COUNT(*) AS active_queries
FROM information_schema.processlist
WHERE command != 'Sleep';
```

## Terminating Processes

**Kill a Specific Process:**

```sql
-- Kill process using process ID
KILL 12345;
```

**Kill Only the Query (Not the Connection):**

```sql
-- Kill only the query, keep the connection
KILL QUERY 12345;
```

**Verify if process was terminated:**

```sql
-- Check if the process is still running
SELECT id FROM information_schema.processlist WHERE id = 12345;
```

## Batch Operations

**Kill All Processes for a Specific User:**

```sql
-- Generate kill statements for a specific user's processes
SELECT CONCAT('KILL ', id, ';') AS kill_statement
FROM information_schema.processlist
WHERE user = 'problem_user' AND command != 'Sleep';

-- Copy and paste the generated statements to execute them
```

**Kill Queries Running Longer Than 5 Minutes:**

```sql
-- Generate kill statements for long-running queries
SELECT CONCAT('KILL ', id, ';') AS kill_statement
FROM information_schema.processlist
WHERE command != 'Sleep'
  AND time > 300
  AND info NOT LIKE '%processlist%';

-- Copy and paste the generated statements to execute them
```

<HintBlock type="info">

Use `KILL QUERY` when you want to terminate just the query but keep the connection alive. Use `KILL` or `KILL CONNECTION` when you want to terminate both the query and the connection.

</HintBlock>

## Regular Monitoring Script

For ongoing monitoring, create a simple shell script:

```bash
#!/bin/bash
# Save as monitor_mysql.sh

mysql -h localhost -u root -p'your_password' -e "
SELECT id,
       user,
       db,
       command,
       time as seconds_running,
       SUBSTR(info, 1, 50) as query_preview
FROM information_schema.processlist
WHERE command != 'Sleep'
ORDER BY time DESC
LIMIT 10;"
```

Make it executable and run periodically:

```bash
chmod +x monitor_mysql.sh
./monitor_mysql.sh
```

<HintBlock type="info">

For enterprise MySQL management, Bytebase provides [built-in monitoring dashboards](/docs/introduction/features/) with automatic detection of problematic queries.

</HintBlock>

## Performance Schema (Alternative Method)

For MySQL 5.7+ and 8.0+, you can use the performance_schema for additional information:

```sql
-- Show currently running statements
SELECT thread_id,
       processlist_id as connection_id,
       processlist_user as user,
       processlist_db as db,
       TRUNCATE(timer_wait/1000000000, 0) as time_ms,
       sql_text
FROM performance_schema.events_statements_current
WHERE sql_text IS NOT NULL
ORDER BY timer_wait DESC
LIMIT 10;
```

## References

- [MySQL SHOW PROCESSLIST Documentation](https://dev.mysql.com/doc/refman/8.0/en/show-processlist.html)
- [MySQL KILL Statement](https://dev.mysql.com/doc/refman/8.0/en/kill.html)
- [MySQL Information Schema PROCESSLIST Table](https://dev.mysql.com/doc/refman/8.0/en/information-schema-processlist-table.html)
