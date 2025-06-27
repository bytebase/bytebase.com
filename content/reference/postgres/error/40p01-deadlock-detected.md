---
title: 'ERROR 40P01: Deadlock detected'
---

## Error Message

```sql
ERROR: deadlock detected
DETAIL: Process 1234 waits for ShareLock on transaction 5678; blocked by process 5432.
Process 5432 waits for ShareLock on transaction 8765; blocked by process 1234.
HINT: See server log for query details.
```

## Description

This error occurs when two or more transactions are waiting for each other to release locks, creating a circular dependency. PostgreSQL automatically detects deadlocks and terminates one of the transactions to break the deadlock.

## Causes

- Multiple transactions accessing the same tables in different orders
- Long-running transactions holding locks for extended periods
- Row-level locks escalating to table-level locks
- Mixing different lock modes (e.g., FOR UPDATE, FOR SHARE)
- Insufficient transaction isolation levels

## Solutions

1. **Retry the failed transaction**:

   ```sql
   -- PostgreSQL automatically rolls back the transaction
   -- Simply retry the transaction:
   BEGIN;
   -- Your queries here
   COMMIT;
   ```

2. **Implement retry logic in your application**:

   ```python
   # Example with exponential backoff
   for attempt in range(3):
       try:
           # Transaction code
           connection.commit()
           break
       except psycopg2.errors.DeadlockDetected:
           connection.rollback()
           time.sleep(random.uniform(0.1, 0.5))
   ```

3. **Check PostgreSQL logs** for detailed deadlock information:

   ```bash
   tail -f /var/log/postgresql/postgresql-14-main.log
   ```

4. **Adjust lock timeout** to prevent long waits:

   ```sql
   SET lock_timeout = '5s';
   ```

## Prevention

1. **Access tables in consistent order** across all transactions:

   ```sql
   -- Always use the same order (e.g., alphabetical)
   UPDATE accounts SET balance = balance - 100 WHERE id = 1;
   UPDATE users SET last_active = NOW() WHERE id = 5;
   ```

2. **Keep transactions short** to reduce lock contention:

   ```sql
   BEGIN;
   -- Focused, quick operations only
   COMMIT;
   ```

3. **Use higher isolation levels** like SERIALIZABLE for critical operations.

4. **Use advisory locks** for application-level coordination:

   ```sql
   SELECT pg_advisory_xact_lock(id) FROM users WHERE username = 'alice';
   ```

<HintBlock type="info">

PostgreSQL's deadlock detector runs every `deadlock_timeout` (default 1 second). When a deadlock is detected, the transaction with the smallest amount of CPU time is terminated.

</HintBlock>
