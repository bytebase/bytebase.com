---
title: 'ERROR 1213 (40001): Deadlock found when trying to get lock'
---

## Error Message

```sql
ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
```

## Description

A deadlock occurs when two or more transactions are waiting for each other to release locks, creating a cycle where none of the transactions can proceed. MySQL's InnoDB engine automatically detects deadlocks and resolves them by rolling back one of the transactions (the "victim").

## Causes

- Transactions accessing the same rows in different orders
- Transactions that hold locks for extended periods
- Many transactions competing for the same resources
- Row-level locks escalating to page or table locks
- Missing or improper indexes causing table scans
- Applications accessing data in unpredictable sequences
- Foreign key constraints causing lock contention
- Gap locks in REPEATABLE READ isolation level

## Solutions

1. **Implement retry logic** in your application:

   ```python
   # Python example
   max_retries = 3
   retry_count = 0

   while retry_count < max_retries:
       try:
           # Start transaction
           cursor.execute("START TRANSACTION")

           # Perform database operations
           cursor.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
           cursor.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")

           # Commit transaction
           cursor.execute("COMMIT")
           break  # Success, exit the loop
       except mysql.connector.Error as err:
           if err.errno == 1213:  # Deadlock error code
               # Rollback and retry
               cursor.execute("ROLLBACK")
               retry_count += 1
               time.sleep(0.5 * retry_count)  # Exponential backoff
           else:
               # Other error, raise it
               raise
   ```

2. **Standardize transaction access patterns**:

   ```sql
   -- Always access tables in alphabetical order
   -- Instead of:
   UPDATE accounts SET ... WHERE ...
   UPDATE users SET ... WHERE ...

   -- Use consistent ordering:
   UPDATE accounts SET ... WHERE ...
   UPDATE zones SET ... WHERE ...
   ```

3. **Reduce transaction duration**:

   ```sql
   -- Better: Shorter, focused transactions
   -- Read data
   SELECT data FROM large_table WHERE id = 123;
   -- [Process data outside transaction]
   -- Update in a brief transaction
   START TRANSACTION;
   UPDATE large_table SET processed = 1 WHERE id = 123;
   COMMIT;
   ```

4. **Adjust isolation level**:

   ```sql
   -- Check current isolation level
   SELECT @@transaction_isolation;

   -- For read operations that don't need strong consistency
   SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
   ```

## Prevention

1. **Access tables and rows in a consistent order** in all transactions

2. **Keep transactions short and focused**:

   - Don't include user interaction within transactions
   - Process data between transactions when possible

3. **Use proper indexes** to reduce lock contention:

   ```sql
   -- Add missing indexes
   CREATE INDEX idx_orders_customer_id ON orders(customer_id);
   ```

4. **Monitor deadlocks** to identify patterns:
   ```sql
   -- Enable deadlock monitoring
   SET GLOBAL innodb_print_all_deadlocks = ON;
   ```
