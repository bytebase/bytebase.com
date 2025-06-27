---
title: 'ERROR 55P03: Lock not available'
---

## Error Message

```sql
ERROR: could not obtain lock on relation "orders"
DETAIL: Lock request timed out after 60000 milliseconds.
HINT: Close other transactions occupying the relation before retrying.
```

## Description

This error occurs when a query or transaction cannot acquire a necessary lock on a table or other database object because another transaction is holding a conflicting lock. After waiting for the lock_timeout duration, PostgreSQL abandons the attempt and returns this error.

## Causes

- Long-running transactions holding locks
- Tables under heavy write load with conflicting lock requests
- DDL operations (ALTER TABLE, CREATE INDEX, etc.) blocking other operations
- Lock escalation from row-level to table-level locks
- Explicit locks (LOCK TABLE) held for extended periods

## Solutions

1. **Identify and terminate blocking transactions**:

   ```sql
   -- Find blocking processes
   SELECT blocked_locks.pid AS blocked_pid,
          blocking_locks.pid AS blocking_pid,
          blocked_activity.usename AS blocked_user,
          blocking_activity.usename AS blocking_user,
          blocked_activity.query AS blocked_statement
   FROM pg_catalog.pg_locks blocked_locks
   JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
   JOIN pg_catalog.pg_locks blocking_locks
        ON blocking_locks.locktype = blocked_locks.locktype
        AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
        AND blocking_locks.pid != blocked_locks.pid
   JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
   WHERE NOT blocked_locks.GRANTED;

   -- Terminate a blocking process
   SELECT pg_terminate_backend(pid);
   ```

2. **Increase lock timeout** for operations that may need to wait longer:

   ```sql
   SET lock_timeout = '120s';
   ```

3. **Implement retry logic** in your application:
   ```python
   for attempt in range(3):
       try:
           connection.commit()
           break
       except psycopg2.errors.LockNotAvailable:
           connection.rollback()
           time.sleep(1 * (2 ** attempt))  # Exponential backoff
   ```

## Prevention

1. **Keep transactions short and focused** to minimize lock duration

2. **Schedule maintenance operations** during low-traffic periods:

   ```sql
   CREATE INDEX CONCURRENTLY ON orders(customer_id);
   ```

3. **Use connection pooling** to limit concurrent connections

4. **For batch operations**, process in smaller chunks:
   ```sql
   UPDATE orders SET status = 'processed'
   WHERE id BETWEEN 1 AND 10000 AND status = 'pending';
   ```
