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
   -- PostgreSQL automatically rolls back the transaction that received the error
   -- Simply retry the transaction:
   BEGIN;
   -- Your queries here
   COMMIT;
   ```

2. **Implement retry logic in your application**:

   ```python
   # Example in Python
   for attempt in range(3):
       try:
           # Transaction code
           connection.commit()
           break
       except psycopg2.errors.DeadlockDetected:
           connection.rollback()
           time.sleep(random.uniform(0.1, 0.5))  # Random backoff
   ```

3. **Check the PostgreSQL logs** for detailed information:

   ```bash
   tail -f /var/log/postgresql/postgresql-14-main.log
   ```

4. **Adjust lock timeout** for transactions that might deadlock:
   ```sql
   -- Set a timeout for acquiring locks
   SET lock_timeout = '5s';
   ```

## Prevention

1. **Access tables in a consistent order** in all transactions:

   ```sql
   -- Always access tables in alphabetical or some other consistent order
   UPDATE accounts SET balance = balance - 100 WHERE id = 1;
   UPDATE users SET last_active = NOW() WHERE id = 5;
   ```

2. **Use shorter transactions** to reduce lock contention:

   ```sql
   BEGIN;
   -- Keep transactions focused and quick
   COMMIT;
   ```

3. **Consider higher isolation levels** like SERIALIZABLE for critical operations

4. **Use advisory locks** for application-level locking:
   ```sql
   -- Use advisory locks to control access patterns
   SELECT pg_advisory_xact_lock(id) FROM users WHERE username = 'alice';
   ```

<HintBlock type="info">

Deadlocks are a normal part of concurrent database systems and cannot be completely eliminated. Design your application to handle deadlocks gracefully through retries.

</HintBlock>
