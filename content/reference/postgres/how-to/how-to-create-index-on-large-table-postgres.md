---
title: How to CREATE INDEX on large table in PostgreSQL
updated_at: 2025/04/09 12:00:00
---

_Official documentation: [CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html)_

## Performance Considerations

<HintBlock type="info">

Creating indexes on large tables can be resource-intensive and potentially disruptive. Without proper planning, these operations can cause extended query delays, blocking issues, or consume excessive server resources.

Many organizations require approval for index operations on large tables. You can enforce [approval processes](/docs/administration/custom-approval/) or [automated schema reviews](/docs/sql-review/review-rules/#index) via Bytebase.

</HintBlock>

1. **Table Locking**: Traditional index creation acquires an exclusive lock on the table, blocking writes (but not reads) until completed.

2. **Resource Consumption**: Building indexes on large tables requires significant CPU, memory, and disk I/O.

3. **MVCC Bloat**: Index creation can cause significant MVCC bloat requiring VACUUM operations afterward.

4. **Replication Impact**: On replicated environments, index operations must propagate to all replicas.

## Understanding Large Table Challenges

Defining "large" varies by environment, but tables with millions of rows or several GB in size typically require special consideration for index operations. The main challenges are:

- Operation duration (potentially hours)
- Write blocking causing application slowdowns
- Server resource consumption affecting other workloads
- Temporary space requirements for index creation
- Replication lag on replicated environments

## Methods for Creating Indexes on Large Tables

### Using CREATE INDEX CONCURRENTLY

PostgreSQL's most powerful feature for large tables is the ability to create indexes concurrently:

```sql
-- Create index concurrently to avoid exclusive locks
CREATE INDEX CONCURRENTLY idx_column ON large_table (column_name);
```

This approach:

- Allows both reads and writes during index creation
- Takes significantly longer than standard index creation
- Requires minimal locking
- Works for most index types

Limitations:

- Cannot be used within transactions
- Uses more resources than standard CREATE INDEX
- May fail if there are schema changes during creation

### Using pg_trgm for Text Indexes on Large Tables

For large text columns where full text search is needed:

```sql
-- Enable the pg_trgm extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create a GIN index with trigram support for fast text search
CREATE INDEX CONCURRENTLY idx_trgm_text ON large_table USING GIN (text_column gin_trgm_ops);
```

This approach:

- Provides excellent performance for LIKE and regex operations
- Works concurrently for minimal disruption
- Is more space-efficient than full-text indexes for certain workloads

### Using Partial Indexes for Selective Data

For large tables where queries typically filter on specific values:

```sql
-- Create index only on rows meeting certain conditions
CREATE INDEX CONCURRENTLY idx_partial ON large_table (column_name)
WHERE status = 'active';
```

This approach:

- Creates smaller, more efficient indexes
- Reduces resource requirements for creation and maintenance
- Focuses on the most frequently accessed data

### Using Temporary Tables for Immediate Relief

If you can't immediately create an index but need query performance:

```sql
-- Create indexed temporary table with subset of data
CREATE TEMPORARY TABLE tmp_table AS
SELECT * FROM large_table WHERE some_condition
LIMIT 1000000;

CREATE INDEX idx_column ON tmp_table (column_name);

-- Query the temporary table
SELECT * FROM tmp_table WHERE column_name = 'value';
```

## Monitoring Index Creation Progress

### For PostgreSQL 12+ (pg_stat_progress_create_index)

```sql
-- Monitor CREATE INDEX progress
SELECT
    indexrelid::regclass AS index_name,
    relid::regclass AS table_name,
    phase,
    lockers_total,
    lockers_done,
    blocks_total,
    blocks_done,
    tuples_total,
    tuples_done,
    round(100.0 * tuples_done / nullif(tuples_total, 0), 2) AS "% Complete"
FROM pg_stat_progress_create_index;
```

### For Older PostgreSQL Versions

```sql
-- Monitor through process information
SELECT pid, query, state, wait_event_type, wait_event,
       now() - xact_start AS duration
FROM pg_stat_activity
WHERE query LIKE 'CREATE INDEX%';
```

### Monitoring Index Size and Growth

```sql
-- Check index size
SELECT
    pg_size_pretty(pg_relation_size(idx)) AS index_size,
    indexrelid::regclass AS index_name,
    indrelid::regclass AS table_name
FROM pg_index i
JOIN pg_class idx ON idx.oid = indexrelid
ORDER BY pg_relation_size(idx) DESC;
```

## Common Errors and Solutions

See [PostgreSQL Error Reference](/reference/postgres/error/overview/) for errors you may encounter. Here are some most common ones:

### Error: 53100 - disk full

```sql
-- Check available disk space
df -h

-- Consider temporarily increasing tablespace:
ALTER TABLESPACE pg_default SET (max_size = '100GB');

-- Or specify a different tablespace for the index:
CREATE INDEX CONCURRENTLY idx_column
ON large_table (column_name)
TABLESPACE fast_storage;
```

### Error: 55P03 - lock not available

```sql
-- Check blocking sessions
SELECT blocked_locks.pid AS blocked_pid,
       blocking_locks.pid AS blocking_pid,
       blocked_activity.query AS blocked_query,
       blocking_activity.query AS blocking_query
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_locks blocking_locks
    ON blocking_locks.locktype = blocked_locks.locktype
    AND blocking_locks.DATABASE IS NOT DISTINCT FROM blocked_locks.DATABASE
    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
    AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
    AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
    AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
    AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
    AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
    AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid
    AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid
    AND blocking_locks.pid != blocked_locks.pid
JOIN pg_catalog.pg_stat_activity blocked_activity
    ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_stat_activity blocking_activity
    ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.GRANTED;

-- Consider killing blocking sessions if appropriate
SELECT pg_terminate_backend(pid) FROM pg_stat_activity
WHERE pid = <blocking_pid>;
```

### Error: out of memory

```sql
-- Adjust maintenance work memory for index creation
SET maintenance_work_mem = '2GB';

-- For server-wide settings (requires restart)
ALTER SYSTEM SET maintenance_work_mem = '2GB';
SELECT pg_reload_conf();
```

### Failed CONCURRENTLY index creation

```sql
-- Clean up failed index creation attempt
DROP INDEX CONCURRENTLY IF EXISTS idx_column;

-- Retry with increased statement timeout
SET statement_timeout = '12h';
CREATE INDEX CONCURRENTLY idx_column ON large_table (column_name);
```

## Best Practices

1. **Always Use CONCURRENTLY**: For tables in production, always use CREATE INDEX CONCURRENTLY to avoid write blocking.

2. **Adjust maintenance_work_mem**: Temporarily increase this setting before large index operations:

   ```sql
   SET maintenance_work_mem = '2GB';  -- Adjust based on available RAM
   ```

3. **Schedule During Low Traffic Periods**: Even with CONCURRENTLY, perform index creation during off-peak hours.

4. **Monitor Server Resources**: Watch CPU, memory, disk I/O and space during the operation.

5. **Test in Staging**: Practice the operation in a similar environment with production-like data.

6. **Backup First**: Always take a backup before major schema changes.

7. **Consider Alternative Approaches**:

   - Create the index on a replica first
   - Use partial indexes for better performance
   - Add indexes when initially loading data

8. **Use Expression Indexes** where appropriate:

   ```sql
   -- Index function results for better query performance
   CREATE INDEX CONCURRENTLY idx_lower_email
   ON users (lower(email));
   ```

9. **Monitor Replication**: If using replication, monitor lag on replicas during and after index creation.

10. **Have a Rollback Plan**: Document steps to remove the index if problems occur:
    ```sql
    DROP INDEX CONCURRENTLY idx_column;
    ```

## Advanced Techniques

### BRIN Indexes for Large Tables with Ordered Data

Block Range INdexes (BRIN) are extremely efficient for very large tables with naturally ordered data:

```sql
-- Create a BRIN index for time-series or sequential ID data
CREATE INDEX CONCURRENTLY idx_brin_timestamp
ON large_table USING BRIN (created_at);
```

BRIN indexes:

- Are much smaller than B-tree indexes (often 1000x smaller)
- Create minimal overhead during creation and maintenance
- Work best on columns with natural ordering (timestamps, sequential IDs)
- Provide excellent performance for range queries on ordered data
- Can dramatically improve query performance with minimal resource cost

### Parallel Index Creation (PostgreSQL 11+)

For very large tables, enable parallel index creation:

```sql
-- Set parallel workers for maintenance operations
SET max_parallel_maintenance_workers = 4;

-- Create an index with parallel processing
CREATE INDEX CONCURRENTLY idx_column
ON large_table (column_name);
```

### Building Indexes in Batches

For extremely large tables, consider building the index in logical batches:

1. Create partial indexes on ranges of data:

   ```sql
   -- Create indexes on different data ranges
   CREATE INDEX CONCURRENTLY idx_column_part1
   ON large_table (column_name)
   WHERE id BETWEEN 1 AND 1000000;

   CREATE INDEX CONCURRENTLY idx_column_part2
   ON large_table (column_name)
   WHERE id BETWEEN 1000001 AND 2000000;
   ```

2. Use a view with UNION ALL to unify the access:
   ```sql
   CREATE VIEW indexed_data AS
     SELECT * FROM large_table WHERE id BETWEEN 1 AND 1000000
     UNION ALL
     SELECT * FROM large_table WHERE id BETWEEN 1000001 AND 2000000;
   ```

This approach allows creating indexes in manageable chunks while maintaining query access.

### Using INCLUDE for Covering Indexes

In PostgreSQL 11+, use INCLUDE to create covering indexes:

```sql
-- Create covering index that includes non-key columns
CREATE INDEX CONCURRENTLY idx_covering
ON large_table (search_column)
INCLUDE (col1, col2, col3);

-- Query can now be served entirely from the index
SELECT col1, col2, col3
FROM large_table
WHERE search_column = 'value';
```

This is especially beneficial for large tables as it reduces the need to access the main table data.
