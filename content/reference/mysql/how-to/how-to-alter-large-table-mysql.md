---
title: How to ALTER large table in MySQL
---

_Official documentation: [ALTER TABLE](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html)_

## Performance Considerations

<HintBlock type="info">

Altering large tables in MySQL can be challenging and potentially disruptive. Without proper planning, ALTER operations on tables with millions of rows can cause extended downtime, lock tables, or consume excessive server resources. Many organizations require approval for schema changes on large tables. You can enforce [approval processes](https://docs.bytebase.com/administration/custom-approval/) or [automated schema reviews](https://docs.bytebase.com/sql-review/review-rules/#alter-table) via Bytebase.

</HintBlock>

1. **Table Locking**: Traditional ALTER TABLE operations lock the entire table during execution.

2. **Resource Consumption**: Altering large tables requires significant CPU, memory, and disk I/O.

3. **Transaction Log Growth**: Schema changes generate substantial transaction logs.

4. **Replication Impact**: On replicated environments, alterations must propagate to all replicas.

## Understanding Large Table Challenges

Tables with millions of rows or several GB in size typically require special consideration for ALTER operations. The primary challenges include:

- Operation duration (potentially hours)
- Table locking causing application downtime
- Server resource consumption affecting other workloads
- Replication lag on replicated environments

## Methods for Altering Large Tables

### Using Online DDL (MySQL 5.6+)

MySQL's online DDL capabilities allow some schema changes with minimal disruption:

```sql
-- Add a new column with ALGORITHM=INPLACE and LOCK=NONE
ALTER TABLE large_table
ADD COLUMN new_column VARCHAR(255) DEFAULT NULL,
ALGORITHM=INPLACE, LOCK=NONE;

-- Add an index with ALGORITHM=INPLACE and LOCK=NONE
ALTER TABLE large_table
ADD INDEX idx_column (existing_column),
ALGORITHM=INPLACE, LOCK=NONE;
```

This approach:

- Minimizes table locking
- Allows concurrent operations during the ALTER
- Works for many common operations in InnoDB

Limitations:

- Not all operations support ALGORITHM=INPLACE
- Operations like changing primary key still require table rebuilds
- Resource intensive for very large tables

### Using pt-online-schema-change (Percona Toolkit)

For operations not supported by online DDL or for minimal impact:

```bash
pt-online-schema-change --alter="ADD COLUMN new_column INT" \
--host=localhost --user=username --password=password \
D=database,t=large_table --execute
```

This approach:

- Creates a new table with the desired structure
- Copies data in small batches
- Uses triggers to capture ongoing changes
- Performs atomic table swap when complete

Limitations:

- Requires double the disk space temporarily
- Adds overhead from triggers
- May have issues with foreign keys

### Using GitHub's gh-ost

```bash
gh-ost --user="user" --password="password" --host=hostname \
--database="db" --table="large_table" \
--alter="ADD COLUMN new_column INT" \
--execute
```

This approach:

- Uses binary log streaming instead of triggers
- Creates minimal locking
- Provides detailed progress reporting
- Is generally safer for very large tables

### Using Temporary Tables for Non-Disruptive Changes

For major changes that can't use online methods:

```sql
-- Create new table with desired structure
CREATE TABLE large_table_new LIKE large_table;
ALTER TABLE large_table_new ADD COLUMN new_column VARCHAR(255);

-- Copy data in batches
SET @batch = 0;
SET @batch_size = 10000;
SET @total = (SELECT COUNT(*) FROM large_table);

WHILE @batch * @batch_size < @total DO
    INSERT INTO large_table_new
    SELECT *, NULL as new_column
    FROM large_table
    LIMIT @batch_size OFFSET @batch * @batch_size;

    SET @batch = @batch + 1;
END WHILE;

-- Swap tables (minimal downtime)
RENAME TABLE large_table TO large_table_old,
             large_table_new TO large_table;
```

## Monitoring ALTER Progress

### For Online DDL Operations (MySQL 8.0+)

```sql
-- Check progress in performance_schema
SELECT EVENT_NAME, WORK_COMPLETED, WORK_ESTIMATED,
ROUND(WORK_COMPLETED/WORK_ESTIMATED*100, 2) AS "% Complete"
FROM performance_schema.events_stages_current
WHERE EVENT_NAME LIKE 'stage/innodb/alter%';
```

### For MySQL 5.7 or Earlier

```sql
-- Monitor through process list
SHOW PROCESSLIST;

-- Look for process performing the ALTER TABLE
SELECT * FROM information_schema.processlist
WHERE info LIKE 'ALTER TABLE%';
```

### For External Tools

For pt-online-schema-change and gh-ost, monitor their output directly. Both tools provide detailed progress information during execution.

## Common Errors and Solutions

See [MySQL Error Reference](/reference/mysql/error/overview/) for errors you may encounter. Here are some most common ones:

### Error 1206: The total number of locks exceeds the lock table size

```sql
-- Increase innodb_buffer_pool_size (requires restart)
SET GLOBAL innodb_buffer_pool_size = 8589934592; -- 8GB

-- Or perform the operation using pt-online-schema-change

-- Check current locks
SHOW ENGINE INNODB STATUS;
```

### Error 1114: The table is full

```sql
-- Check available disk space
df -h

-- Consider using external tool like pt-online-schema-change
-- which allows pausing/resuming the operation
```

### Error 1205: Lock wait timeout exceeded

```sql
-- Increase lock wait timeout for this session
SET SESSION innodb_lock_wait_timeout = 3600; -- 1 hour

-- Use less locking approach
ALTER TABLE large_table
ADD COLUMN new_column VARCHAR(255),
ALGORITHM=INPLACE, LOCK=NONE;

-- Or use pt-online-schema-change/gh-ost
```

## Techniques

### Add Columns with Defaults

When adding columns, provide DEFAULT values to avoid table scanning.

    ```sql
    -- Better approach for large tables
    ALTER TABLE large_table
    ADD COLUMN new_col INT DEFAULT 0 NOT NULL,
    ALGORITHM=INPLACE, LOCK=NONE;
    ```

### Altering Tables in Parallel (Multiple Tables)

For multiple large tables, plan alterations to run in parallel on different tables to utilize server resources efficiently:

```bash
# Run alterations on different tables simultaneously
pt-online-schema-change --alter="ADD INDEX idx1 (col1)" D=db,t=table1 --execute &
pt-online-schema-change --alter="ADD INDEX idx2 (col2)" D=db,t=table2 --execute &
```

### Altering Large Tables in Production

For critical production systems with 24/7 requirements:

1. Use shadow tables and dual-write approach:

   ```sql
   -- Create shadow table with new schema
   CREATE TABLE users_new LIKE users;
   ALTER TABLE users_new ADD COLUMN user_preferences JSON;

   -- Set up dual-write using triggers
   DELIMITER //
   CREATE TRIGGER users_insert_trigger AFTER INSERT ON users
   FOR EACH ROW
   BEGIN
       INSERT INTO users_new VALUES (NEW.*, NULL);
   END //

   CREATE TRIGGER users_update_trigger AFTER UPDATE ON users
   FOR EACH ROW
   BEGIN
       UPDATE users_new SET ... WHERE id = NEW.id;
   END //
   DELIMITER ;
   ```

2. Backfill shadow table during off-peak hours
3. Verify data consistency between tables
4. Perform atomic rename during minimal traffic window

## References

- [MySQL Online DDL Operations](https://dev.mysql.com/doc/refman/8.0/en/innodb-online-ddl-operations.html)
- [Percona Toolkit Documentation](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html)
- [GitHub's gh-ost Documentation](https://github.com/github/gh-ost)
- [MySQL Error Reference](/reference/mysql/error/overview/)
