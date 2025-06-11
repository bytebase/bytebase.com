---
title: How to CREATE INDEX on large table in MySQL
updated_at: 2025/04/09 12:00:00
---

_Official documentation: [CREATE INDEX](https://dev.mysql.com/doc/refman/8.0/en/create-index.html)_

## Performance Considerations

<HintBlock type="info">

Creating indexes on large tables can be resource-intensive and potentially disruptive. Without proper planning, these operations can cause extended downtime, lock tables, or consume excessive server resources. Many organizations require approval for index operations on large tables. You can enforce [approval processes](https://docs.bytebase.com/administration/custom-approval/) or [automated schema reviews](https://docs.bytebase.com/sql-review/review-rules/#index) via Bytebase.

</HintBlock>

1. **Table Locking**: Traditional index creation locks the entire table, preventing other operations until completed.

2. **Resource Consumption**: Building indexes on large tables requires significant CPU, memory, and disk I/O.

3. **Transaction Log Growth**: Index creation generates substantial transaction logs, potentially filling storage.

4. **Replication Impact**: On replicated environments, index operations must propagate to all replicas.

## Understanding Large Table Challenges

Defining "large" varies by environment, but tables with millions of rows or several GB in size typically require special consideration for index operations. The main challenges are:

- Operation duration (potentially hours)
- Table locking causing application downtime
- Server resource consumption affecting other workloads
- Replication lag on replicated environments

## Methods for Creating Indexes on Large Tables

### Using Online DDL

MySQL 5.6+ supports online DDL operations that allow concurrent DML while creating indexes:

```sql
-- Create index with ALGORITHM=INPLACE and LOCK=NONE
ALTER TABLE large_table
ADD INDEX idx_column (column_name)
ALGORITHM=INPLACE, LOCK=NONE;
```

This approach:

- Minimizes table locking
- Allows concurrent reads and writes
- Works for most index types in InnoDB

Limitations:

- Not all index operations support ALGORITHM=INPLACE
- Still consumes significant resources
- May fail on very large tables if the operation times out

### Using pt-online-schema-change

For extremely large tables, Percona Toolkit's `pt-online-schema-change` provides a reliable solution:

```bash
pt-online-schema-change --alter="ADD INDEX idx_column (column_name)" \
--host=localhost --user=username --password=password \
D=database,t=large_table --execute
```

This approach:

- Creates a new table with the desired structure
- Copies data in small batches
- Maintains triggers to capture ongoing changes
- Performs an atomic table swap when complete

Limitations:

- Requires double the disk space temporarily
- Adds overhead from triggers
- Doesn't work well with foreign keys unless handled carefully

### Using GitHub's gh-ost

gh-ost is another tool specifically designed for online schema changes:

```bash
gh-ost --user="user" --password="password" --host=hostname \
--database="db" --table="large_table" \
--alter="ADD INDEX idx_column (column_name)" \
--execute
```

This approach:

- Uses binary log streaming instead of triggers
- Creates minimal locking
- Provides detailed progress reporting
- Is generally safer for very large tables

### Using FORCE INDEX for Temporary Relief

If you can't immediately create an index but need query performance, consider using a temporary table:

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

### For Online DDL Operations

```sql
-- Check progress in performance_schema
SELECT EVENT_NAME, WORK_COMPLETED, WORK_ESTIMATED,
ROUND(WORK_COMPLETED/WORK_ESTIMATED*100, 2) AS "% Complete"
FROM performance_schema.events_stages_current
WHERE EVENT_NAME LIKE 'stage/innodb/alter%';
```

### For MySQL 8.0+ (Performance Schema)

```sql
-- Get detailed progress information
SELECT * FROM performance_schema.events_stages_current
WHERE EVENT_NAME LIKE 'stage/innodb/alter%';
```

### General Progress Monitoring

```sql
-- Monitor through process list
SELECT * FROM information_schema.processlist
WHERE info LIKE 'ALTER TABLE%';

-- Check for lock waits
SELECT * FROM sys.innodb_lock_waits;
```

## Common Errors and Solutions

See [MySQL Error Reference](/reference/mysql/error/overview/) for errors you may encounter. Here are some most common ones:

### Error 1206: The total number of locks exceeds the lock table size

```sql
-- Increase innodb_buffer_pool_size (requires restart)
SET GLOBAL innodb_buffer_pool_size = 8589934592; -- 8GB

-- Or perform the operation in smaller batches using external tools
```

### Error 1114: The table is full

```sql
-- Check available disk space
df -h

-- Consider using external tool like pt-online-schema-change
-- which uses less temporary space

-- Increase tablespace:
ALTER TABLESPACE ts_name ADD DATAFILE 'file_name.ibd';
```

### Error 1205: Lock wait timeout exceeded

```sql
-- Increase lock wait timeout for this session
SET SESSION innodb_lock_wait_timeout = 3600; -- 1 hour

-- Use less locking approach
ALTER TABLE large_table
ADD INDEX idx_column (column_name)
ALGORITHM=INPLACE, LOCK=NONE;
```

### Error 3032: Got error 28 from storage engine

```sql
-- This indicates disk space issues
-- Free up disk space or use external storage
```

## Techniques

### Use Partial Indexes

```sql
-- Index only part of a string column
CREATE INDEX idx_large_text ON large_table (large_text_column(20));

-- Functional index on subset of data
CREATE INDEX idx_partial ON large_table ((CASE WHEN status='active' THEN id END));
```

### Staged Index Creation for Extremely Large Tables

For tables with hundreds of millions of rows, consider a staged approach:

1. First create a partial index on recent/active data:

   ```sql
   CREATE INDEX idx_partial ON large_table (column_name)
   WHERE created_at > DATE_SUB(NOW(), INTERVAL 30 DAY);
   ```

2. Create additional indexes to cover older data in stages, during separate maintenance windows.

### Using Covering Indexes for Large Tables

When querying large tables, covering indexes can dramatically improve performance:

```sql
-- Create index that includes all columns used in the query
CREATE INDEX idx_covering ON large_table (search_column, col1, col2, col3);

-- Query can now be served entirely from the index
SELECT col1, col2, col3 FROM large_table WHERE search_column = 'value';
```

This is especially beneficial for large tables as it reduces the need to access the main table data.
