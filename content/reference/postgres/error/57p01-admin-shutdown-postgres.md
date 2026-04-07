---
title: 'ERROR 57P01: Terminating Connection Due to Administrator Command in Postgres'
---

## Error Message

```sql
FATAL: terminating connection due to administrator command
server closed the connection unexpectedly
	This probably means the server terminated abnormally
	before or while processing the request.
SQLSTATE: 57P01
```

Other common variations:

```sql
FATAL: terminating connection due to administrator command
SSL connection has been closed unexpectedly
could not receive data from server: Connection reset by peer
```

## What Triggers This Error

PostgreSQL 57P01 fires when the backend process serving your connection is terminated by an administrator action or system event. The connection drops immediately and any in-flight transaction is rolled back. The fix depends on what caused the termination:

- **Server restart or maintenance window** — the DBA or cloud platform restarted PostgreSQL
- **`pg_terminate_backend()` called** — another session explicitly killed your connection
- **Idle connection timeout** — `idle_in_transaction_session_timeout` or `idle_session_timeout` closed the connection
- **Connection pooler recycling** — PgBouncer or pgpool-II recycled the server connection
- **OOM killer terminated the backend** — Linux killed the process due to memory pressure

## Fix by Scenario

### Server restart or maintenance window

The most common cause in cloud-managed PostgreSQL (RDS, Cloud SQL, Azure Database). The platform applies patches, scales instances, or performs failovers — all of which drop existing connections.

```sql
-- Check when the server last started
SELECT pg_postmaster_start_time();

-- Check the PostgreSQL log for shutdown/startup entries
-- In the log you'll see:
-- LOG: received fast shutdown request
-- LOG: aborting any active transactions
-- LOG: database system is shut down
-- LOG: database system is ready to accept connections
```

**Fix:**

1. If this was a planned maintenance window, no action needed — connections reconnect automatically if your application handles retries
2. For cloud platforms, check the maintenance schedule:
   - **RDS:** Events dashboard → Maintenance tab
   - **Cloud SQL:** Operations log in the console
   - **Azure:** Activity log → Maintenance events
3. Add retry logic in your application to handle transient disconnections:

```python
# Python with psycopg2 — retry on connection loss
import psycopg2
from psycopg2 import OperationalError
import time

def execute_with_retry(query, max_retries=3):
    for attempt in range(max_retries):
        try:
            conn = psycopg2.connect(dsn)
            cur = conn.cursor()
            cur.execute(query)
            conn.commit()
            return cur.fetchall()
        except OperationalError as e:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # exponential backoff
            else:
                raise
        finally:
            conn.close()
```

### `pg_terminate_backend()` called by another session

Another user or automated process explicitly terminated your connection. This is often done to release locks, cancel runaway queries, or reclaim connection slots.

```sql
-- Find who terminated connections (check the PostgreSQL log)
-- LOG: terminating connection because of administrator command

-- See currently active termination-capable sessions
SELECT a.pid, a.usename, a.application_name, a.state, a.query
FROM pg_stat_activity AS a
JOIN pg_roles AS r ON r.rolname = a.usename
WHERE a.usename = 'postgres' OR r.rolsuper = true;
```

**Fix:**

1. Check the PostgreSQL log for the timestamp — correlate it with admin actions or cron jobs
2. If an automated script is killing connections, review its criteria:

```sql
-- Common pattern: kill idle-in-transaction connections older than 10 min
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle in transaction'
  AND state_change < NOW() - INTERVAL '10 minutes';
```

3. If your connection was killed because of locks, investigate the lock chain:

```sql
SELECT blocked.pid AS blocked_pid,
       blocked.query AS blocked_query,
       blocking.pid AS blocking_pid,
       blocking.query AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_locks bl ON bl.pid = blocked.pid
JOIN pg_locks kl ON kl.locktype = bl.locktype
  AND kl.database IS NOT DISTINCT FROM bl.database
  AND kl.relation IS NOT DISTINCT FROM bl.relation
  AND kl.page IS NOT DISTINCT FROM bl.page
  AND kl.tuple IS NOT DISTINCT FROM bl.tuple
  AND kl.transactionid IS NOT DISTINCT FROM bl.transactionid
  AND kl.pid != bl.pid
  AND kl.granted
JOIN pg_stat_activity blocking ON blocking.pid = kl.pid
WHERE NOT bl.granted;
```

### Idle connection timeout

PostgreSQL can automatically terminate connections that have been idle too long, especially if they're sitting in an open transaction.

```sql
-- Check timeout settings
SHOW idle_in_transaction_session_timeout;  -- kills idle-in-transaction (PG 9.6+)
SHOW idle_session_timeout;                  -- kills any idle session (PG 14+)
```

If `idle_in_transaction_session_timeout` is set to `30s` and your application opens a transaction, runs a query, then waits 31 seconds before the next query — the connection is terminated.

**Fix:**

1. Close transactions promptly — don't hold transactions open while waiting for user input or external API calls
2. Increase the timeout if the current value is too aggressive:

```sql
-- Set to 5 minutes (server-wide, requires reload)
ALTER SYSTEM SET idle_in_transaction_session_timeout = '5min';
SELECT pg_reload_conf();
```

3. Fix the application to commit or rollback before long waits:

```python
# Bad: transaction open during slow API call
cur.execute("BEGIN")
cur.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
result = call_slow_api(order_id)  # 60 seconds — connection killed
cur.execute("UPDATE orders SET status = %s", (result,))

# Good: separate transactions
cur.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
order = cur.fetchone()
conn.commit()  # release the transaction

result = call_slow_api(order_id)  # safe — no open transaction

cur.execute("UPDATE orders SET status = %s WHERE id = %s", (result, order_id))
conn.commit()
```

### Connection pooler recycling connections

PgBouncer, pgpool-II, and application-level pools periodically recycle server connections. When a server-side connection is closed for recycling, any client using it sees 57P01.

```ini
# PgBouncer settings that cause recycling
server_lifetime = 3600    ; close server connections after 1 hour
server_idle_timeout = 600 ; close idle server connections after 10 min
```

**Fix:**

1. Check PgBouncer logs for connection close events:

```
LOG: closing because: server lifetime over (age=3601s)
LOG: closing because: server idle timeout (idle=601s)
```

2. Increase `server_lifetime` if connections are recycled too aggressively
3. Ensure your application handles reconnection — don't cache prepared statements across pooled connections in transaction mode
4. If using PgBouncer in transaction mode, avoid session-level features (LISTEN/NOTIFY, prepared statements, temp tables)

### OOM killer terminated the backend

On Linux, if PostgreSQL backends consume too much memory, the kernel's OOM killer can terminate individual backend processes. The client sees 57P01; the PostgreSQL log may not even record it because the process was killed externally.

```bash
# Check system logs for OOM events
sudo dmesg | grep -i "out of memory"
sudo journalctl -k | grep -i "oom"

# Look for killed postgres processes
sudo dmesg | grep -i "postgres"
# Out of memory: Killed process 12345 (postgres) total-vm:2048000kB
```

**Fix:**

1. Reduce `work_mem` — each sort/hash operation allocates this much memory per query node. A complex query with 10 sort operations uses 10× `work_mem`:

```sql
SHOW work_mem;
-- If set to 256MB with complex queries, reduce it
ALTER SYSTEM SET work_mem = '64MB';
SELECT pg_reload_conf();
```

2. Reduce `shared_buffers` if it's set above 25% of total RAM
3. Set `max_connections` lower to reduce total potential memory usage
4. Add swap space as a safety net (the OOM killer is less aggressive when swap is available)
5. Adjust the OOM score for PostgreSQL to make it less likely to be killed:

```bash
# Make the postmaster less likely to be OOM-killed
echo -1000 > /proc/$(head -1 /var/lib/pgsql/data/postmaster.pid)/oom_score_adj
```

## Prevention

- Add connection retry logic with exponential backoff in every application that connects to PostgreSQL
- Set `idle_in_transaction_session_timeout` to a reasonable value (1-5 minutes) to avoid long-held transactions
- Monitor `pg_stat_activity` for connections in `idle in transaction` state and alert if they exceed a threshold
- If using PgBouncer, set `server_lifetime` and `server_idle_timeout` high enough to avoid unnecessary recycling
- Monitor system memory and set appropriate `work_mem` / `shared_buffers` values to avoid OOM kills

<HintBlock type="info">

Bytebase's [SQL Review](https://docs.bytebase.com/sql-review/review-rules/) can catch queries that are likely to hold transactions open too long during change review. See also [ERROR 53300: Too Many Connections](/reference/postgres/error/53300-too-many-connections) for connection capacity issues.

</HintBlock>
