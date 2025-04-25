---
title: 'How to fix ERROR 1213 (40001): Deadlock found when trying to get lock'
---

## Error Message

When encountering MySQL Error 1213, you'll see a message similar to:

```sql
ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
```

## What It Means

A deadlock occurs when two or more transactions are waiting for each other to release locks, creating a cycle where none of the transactions can proceed. MySQL's InnoDB engine automatically detects deadlocks and resolves them by rolling back one of the transactions (the "victim"). The chosen transaction receives this error message.

Deadlocks are a normal part of database operations in concurrent environments but should be minimized as they impact performance and user experience.

## Common Causes

1. **Transactions accessing the same rows in different orders**: Two transactions updating the same tables but in reverse order
2. **Long-running transactions**: Transactions that hold locks for extended periods
3. **High concurrency**: Many transactions competing for the same resources
4. **Lock escalation**: Row-level locks escalating to page or table locks
5. **Missing or improper indexes**: Causing table scans instead of index seeks
6. **Inconsistent access patterns**: Applications accessing data in unpredictable sequences
7. **Foreign key constraints**: Operations on parent/child tables causing lock contention
8. **Gap locks in REPEATABLE READ**: Default isolation level creating gap locks

## How to Fix

### Solution 1: Implement Retry Logic

Add transaction retry logic in your application:

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

### Solution 2: Standardize Transaction Access Patterns

Access tables and rows in a consistent order throughout your application:

```sql
-- Always access tables in alphabetical order
-- Instead of:
UPDATE accounts SET ... WHERE ...
UPDATE users SET ... WHERE ...

-- Use consistent ordering:
UPDATE accounts SET ... WHERE ...
UPDATE zones SET ... WHERE ...
```

### Solution 3: Reduce Transaction Duration

Keep transactions as short as possible:

```sql
-- Bad: Long transaction with non-database operations
START TRANSACTION;
SELECT data FROM large_table WHERE id = 123;
-- [Long processing in application]
UPDATE large_table SET processed = 1 WHERE id = 123;
COMMIT;

-- Better: Shorter, focused transactions
-- Read data
SELECT data FROM large_table WHERE id = 123;
-- [Process data outside transaction]
-- Update in a brief transaction
START TRANSACTION;
UPDATE large_table SET processed = 1 WHERE id = 123;
COMMIT;
```

### Solution 4: Use Optimistic Concurrency Control

For read-heavy workloads, consider optimistic locking:

```sql
-- Add version column to table
ALTER TABLE products ADD COLUMN version INT DEFAULT 0;

-- Read the current version
SELECT id, name, price, version FROM products WHERE id = 101;

-- Update with version check
UPDATE products
SET price = 29.99, version = version + 1
WHERE id = 101 AND version = {current_version};

-- If no rows affected, someone else updated it first
```

### Solution 5: Add Proper Indexes

Ensure appropriate indexes are in place:

```sql
-- Analyze query performance
EXPLAIN SELECT * FROM orders WHERE customer_id = 123;

-- Add missing indexes
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
```

### Solution 6: Adjust Isolation Level

Consider changing the transaction isolation level for specific operations:

```sql
-- Check current isolation level
SELECT @@transaction_isolation;

-- For read operations that don't need strong consistency
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Then run your query
SELECT * FROM high_contention_table WHERE status = 'active';
```

### Solution 7: Analyze and Monitor Deadlocks

Investigate deadlock patterns to address recurring issues:

```sql
-- Enable deadlock monitoring
SET GLOBAL innodb_print_all_deadlocks = ON;

-- Check deadlock information in error log
-- or in performance_schema tables for MySQL 8.0+

-- For MySQL 8.0+
SELECT * FROM performance_schema.data_locks;
SELECT * FROM performance_schema.data_lock_waits;
```

## Cloud Vendor Considerations

When dealing with deadlocks in cloud-based MySQL environments:

- **AWS RDS/Aurora**:

  - Use Performance Insights to monitor lock contention
  - Check CloudWatch metrics for deadlock rates
  - Consider Aurora's higher throughput capabilities for high-concurrency scenarios

- **Google Cloud SQL**:

  - Monitor deadlocks through Cloud Monitoring
  - Use database flags to tune InnoDB settings
  - Consider read replicas to offload read traffic

- **Azure Database for MySQL**:
  - Use Query Performance Insight to identify problematic queries
  - Monitor server metrics for deadlock rates
  - Adjust server parameters for concurrency

For all cloud environments:

1. Implement appropriate retry logic with backoff strategies
2. Consider database-specific connection pooling options
3. Size your instance appropriately for your concurrency needs
4. Use read replicas where possible to reduce write contention
5. Consider database proxy services (like Amazon RDS Proxy) that can manage connection pooling
