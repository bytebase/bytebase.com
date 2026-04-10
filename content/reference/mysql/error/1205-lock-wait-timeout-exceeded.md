---
title: 'ERROR 1205 (HY000): Lock Wait Timeout Exceeded in MySQL'
---

## Error Message

```sql
ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction
```

## What Triggers This Error

MySQL 1205 fires when a transaction waits longer than `innodb_lock_wait_timeout` seconds (default: 50) to acquire a row lock held by another transaction. Unlike a deadlock (ERROR 1213), MySQL does not automatically detect this — it simply gives up waiting. The fix depends on why the lock is held so long:

- **Long-running transaction holding locks** — an uncommitted transaction keeps row locks open
- **Bulk UPDATE or DELETE blocking other transactions** — a large write locks thousands of rows
- **Foreign key checks causing implicit locks on the parent table** — InnoDB reads the parent row with a shared lock
- **`innodb_lock_wait_timeout` too low for batch operations** — the default 50s isn't enough for heavy workloads
- **Circular wait that wasn't detected as a deadlock** — rare edge case where the wait graph check missed the cycle

## Fix by Scenario

### Long-running transaction holding locks

The most common cause. A transaction ran a `SELECT ... FOR UPDATE` or an `UPDATE`, then never committed — maybe the application crashed, a developer left a session open, or a retry loop is stuck.

```sql
-- Find the blocking transaction
SELECT
  r.trx_id AS waiting_trx_id,
  r.trx_mysql_thread_id AS waiting_thread,
  r.trx_query AS waiting_query,
  b.trx_id AS blocking_trx_id,
  b.trx_mysql_thread_id AS blocking_thread,
  b.trx_query AS blocking_query,
  b.trx_started AS blocking_since
FROM information_schema.INNODB_LOCK_WAITS w
JOIN information_schema.INNODB_TRX b ON b.trx_id = w.blocking_trx_id
JOIN information_schema.INNODB_TRX r ON r.trx_id = w.requesting_trx_id;
```

For MySQL 8.0+, use the `performance_schema` instead:

```sql
SELECT
  waiting.THREAD_ID AS waiting_thread,
  waiting.SQL_TEXT AS waiting_query,
  blocking.THREAD_ID AS blocking_thread,
  blocking.SQL_TEXT AS blocking_query
FROM performance_schema.data_lock_waits w
JOIN performance_schema.events_statements_current waiting
  ON waiting.THREAD_ID = w.REQUESTING_THREAD_ID
JOIN performance_schema.events_statements_current blocking
  ON blocking.THREAD_ID = w.BLOCKING_THREAD_ID;
```

**Fix:**

1. Kill the blocking session if it's idle or stuck:

```sql
-- Check if the blocking thread is doing anything
SHOW PROCESSLIST;

-- Kill the idle blocker (use the blocking_thread from above)
KILL 12345;
```

2. Fix the application to commit or rollback promptly:

```python
# Bad: connection stays open with uncommitted transaction
cursor.execute("UPDATE orders SET status = 'processing' WHERE id = %s", (order_id,))
result = call_payment_api(order_id)  # 60 seconds — locks held the entire time
cursor.execute("UPDATE orders SET status = %s WHERE id = %s", (result, order_id))
connection.commit()

# Good: separate transactions
cursor.execute("UPDATE orders SET status = 'processing' WHERE id = %s", (order_id,))
connection.commit()  # release locks immediately

result = call_payment_api(order_id)  # locks are free

cursor.execute("UPDATE orders SET status = %s WHERE id = %s", (result, order_id))
connection.commit()
```

### Bulk UPDATE or DELETE blocking other transactions

A single `UPDATE` or `DELETE` affecting thousands of rows locks them all for the duration of the statement. Other transactions waiting for any of those rows will time out.

```sql
-- This locks every row in the table for the entire execution
UPDATE orders SET status = 'archived' WHERE created_at < '2025-01-01';
-- Could take minutes — every other transaction touching `orders` waits
```

**Fix:** Break the operation into smaller batches:

```sql
-- Process 1000 rows at a time
SET @batch_size = 1000;
SET @rows_affected = 1;

WHILE @rows_affected > 0 DO
  UPDATE orders SET status = 'archived'
  WHERE created_at < '2025-01-01' AND status != 'archived'
  LIMIT 1000;
  SET @rows_affected = ROW_COUNT();
  -- Brief pause to let other transactions through
END WHILE;
```

Or in application code:

```python
batch_size = 1000
while True:
    cursor.execute("""
        UPDATE orders SET status = 'archived'
        WHERE created_at < '2025-01-01' AND status != 'archived'
        LIMIT %s
    """, (batch_size,))
    connection.commit()
    if cursor.rowcount == 0:
        break
    time.sleep(0.1)  # let other transactions acquire locks
```

### Foreign key checks causing implicit locks on parent table

When you INSERT into a child table with a foreign key, InnoDB places a shared lock on the parent row to verify it exists. If another transaction holds an exclusive lock on that parent row, the child INSERT waits.

```sql
-- Transaction A: updates a customer (holds exclusive lock on id=42)
START TRANSACTION;
UPDATE customers SET name = 'New Name' WHERE id = 42;
-- Does NOT commit yet

-- Transaction B: inserts an order for that customer (needs shared lock on customers.id=42)
INSERT INTO orders (customer_id, total) VALUES (42, 99.99);
-- Waits... and eventually ERROR 1205
```

**Fix:**

1. Keep the parent update transaction short — commit before the child insert needs the row
2. If the parent update is part of a batch, process it in smaller chunks
3. If FK validation isn't needed during bulk inserts, temporarily disable it:

```sql
-- Only for controlled batch operations — not for regular application use
SET FOREIGN_KEY_CHECKS = 0;
-- ... bulk inserts ...
SET FOREIGN_KEY_CHECKS = 1;
```

### `innodb_lock_wait_timeout` set too low

The default is 50 seconds, which is usually enough. But batch jobs, reporting queries, or migration scripts may legitimately need longer.

```sql
-- Check the current timeout
SELECT @@innodb_lock_wait_timeout;

-- Increase for the current session only (for a batch job)
SET SESSION innodb_lock_wait_timeout = 300;  -- 5 minutes

-- Or increase globally (requires careful consideration)
SET GLOBAL innodb_lock_wait_timeout = 120;
```

**Fix:** Set it per-session for batch operations rather than changing the global default. A high global timeout means genuine lock problems take longer to surface.

### Circular wait not detected as deadlock

Rarely, InnoDB's deadlock detector misses a cycle — especially with complex multi-table lock chains or when `innodb_deadlock_detect` is disabled (some high-concurrency setups turn it off for performance).

```sql
-- Check if deadlock detection is enabled
SELECT @@innodb_deadlock_detect;

-- Check the latest detected deadlock
SHOW ENGINE INNODB STATUS;
-- Look for the "LATEST DETECTED DEADLOCK" section
```

**Fix:**

1. Re-enable deadlock detection if it was turned off:

```sql
SET GLOBAL innodb_deadlock_detect = ON;
```

2. Add application-level retry logic for 1205 errors (same pattern as deadlock retries):

```python
max_retries = 3
for attempt in range(max_retries):
    try:
        cursor.execute("START TRANSACTION")
        cursor.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
        cursor.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")
        connection.commit()
        break
    except mysql.connector.Error as err:
        connection.rollback()
        if err.errno in (1205, 1213) and attempt < max_retries - 1:
            time.sleep(2 ** attempt)
        else:
            raise
```

## Prevention

- Commit transactions as quickly as possible — never hold locks while waiting for external API calls or user input
- Break large UPDATE/DELETE operations into batches of 1000-5000 rows
- Add indexes on columns used in WHERE clauses to avoid full table scans that escalate lock scope
- Use `SET SESSION innodb_lock_wait_timeout` for batch jobs instead of raising the global default
- Monitor `INNODB_TRX` for transactions running longer than expected and alert on them
- Always implement retry logic for 1205 and 1213 errors in application code

<HintBlock type="info">

Bytebase's [SQL Review](https://docs.bytebase.com/sql-review/review-rules/) can flag large UPDATE/DELETE statements without LIMIT during change review, preventing bulk operations from causing lock contention. See also [ERROR 1213: Deadlock Found](/reference/mysql/error/1213-deadlock-found) for deadlock-specific troubleshooting.

</HintBlock>
