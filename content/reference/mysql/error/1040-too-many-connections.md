---
title: 'ERROR 1040 (HY000): Too Many Connections'
---

## Error Message

```sql
ERROR 1040 (HY000): Too many connections
```

You may also see this from application code as a connection refused or pool exhaustion error, depending on your driver. The MySQL error log will show `Aborted connection` entries alongside it.

## What Triggers This Error

MySQL 1040 means every connection slot is occupied and the server can't accept new ones. The fix depends on why the slots filled up:

- **Connection leak in application code** — connections opened but never closed
- **`max_connections` set too low for the workload** — the default (151) is often insufficient
- **Long-running queries holding connections** — slots occupied by queries that haven't finished
- **Connection pooler misconfiguration** — pool max exceeds server max, or idle connections aren't being reaped
- **Sudden traffic spike** — legitimate load exceeding capacity

## Fix by Scenario

### Connection leak in application code

The most common cause. Your application opens connections but doesn't close them — usually because error paths skip the cleanup step, or connections are created inside loops without proper release.

```sql
-- Check how many connections are sleeping (idle)
SELECT user, host, command, time, state
FROM information_schema.processlist
WHERE command = 'Sleep'
ORDER BY time DESC;
```

If you see hundreds of `Sleep` connections from the same application user with high `time` values, that's a leak. Fix the application code — ensure every connection is closed in a `finally` block (Java/Python) or `defer` (Go):

```python
# Python example — always close in finally
conn = mysql.connector.connect(...)
try:
    cursor = conn.cursor()
    cursor.execute("SELECT ...")
finally:
    conn.close()
```

As an immediate fix to restore access, kill the sleeping connections:

```sql
-- Kill connections sleeping longer than 5 minutes
SELECT CONCAT('KILL CONNECTION ', id, ';')
FROM information_schema.processlist
WHERE command = 'Sleep' AND time > 300;
```

### `max_connections` set too low

The default of 151 is a conservative starting point. Production workloads with multiple application instances, background jobs, and monitoring agents can exceed this quickly.

```sql
-- Check current setting and usage
SHOW VARIABLES LIKE 'max_connections';
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Max_used_connections';
```

If `Max_used_connections` is close to or equal to `max_connections`, you're hitting the ceiling:

```sql
-- Increase temporarily (takes effect immediately, lost on restart)
SET GLOBAL max_connections = 500;
```

For a permanent change, edit `my.cnf`:

```ini
[mysqld]
max_connections = 500
```

Each connection uses memory (roughly 1-10 MB depending on buffers), so don't set this to 10,000 — increase it in proportion to available RAM.

### Long-running queries holding connections

A slow query or stuck transaction can hold a connection for hours. If enough of them pile up, you run out of slots.

```sql
-- Find queries running longer than 60 seconds
SELECT id, user, host, db, time, state, LEFT(info, 100) AS query
FROM information_schema.processlist
WHERE command != 'Sleep' AND time > 60
ORDER BY time DESC;

-- Kill a specific long-running query
KILL QUERY <id>;
```

Address the root cause: add indexes, optimize the query, or set a query timeout:

```sql
-- Set a 30-second timeout for SELECT statements on NEW connections (MySQL 5.7.8+)
-- Existing sessions keep their current SESSION max_execution_time value.
SET GLOBAL max_execution_time = 30000;

-- To apply a 30-second timeout for SELECT statements in the current session only:
-- SET SESSION max_execution_time = 30000;

-- To enforce a 30-second timeout for a single SELECT statement:
-- SELECT /*+ MAX_EXECUTION_TIME(30000) */ ...
-- FROM your_table
-- WHERE ...;
```

### Connection pooler misconfiguration

If you're using a connection pool (HikariCP, DBCP, SQLAlchemy pool, ProxySQL), the pool's maximum size multiplied by the number of application instances must not exceed `max_connections`.

Example: 5 app instances × pool max 50 = 250 connections needed, but `max_connections` is 151.

```yaml
# HikariCP example — keep pool small, set idle timeout
maximumPoolSize: 20
minimumIdle: 5
idleTimeout: 300000    # 5 minutes
maxLifetime: 1800000   # 30 minutes
```

For ProxySQL, ensure `mysql-max_connections` on the backend server entry matches the actual MySQL setting.

### Sudden traffic spike

Legitimate load exceeding capacity. Short-term: increase `max_connections` and add connection pooling at the application or proxy layer. Long-term: consider read replicas, query caching, or moving to a managed service with auto-scaling.

```sql
-- Monitor connection growth in real time
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Connections';  -- cumulative since startup
```

## Prevention

- Use connection pooling in every application that connects to MySQL — never open raw connections per request
- Set `wait_timeout` and `interactive_timeout` to close idle connections automatically (300-600 seconds is reasonable)
- Monitor `Threads_connected` vs `max_connections` and alert at 80% utilization
- Enable the slow query log (`long_query_time = 1`) to catch queries that hold connections too long

<HintBlock type="info">

Bytebase's [SQL Review](https://www.bytebase.com/docs/sql-review/review-rules/) can catch problematic queries during change review before they cause connection issues in production. See also [ERROR 53300: Too Many Connections in Postgres](/reference/postgres/error/53300-too-many-connections) for the PostgreSQL equivalent.

</HintBlock>
