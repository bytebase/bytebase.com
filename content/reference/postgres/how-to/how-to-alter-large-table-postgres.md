---
title: How to ALTER large table in PostgreSQL
---

_Official documentation: [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)_

## Performance Considerations

<HintBlock type="info">

Altering large tables in PostgreSQL can be challenging despite the database's transactional DDL. Without proper planning, ALTER operations on tables with millions of rows can cause extended blocking, consume excessive server resources, or create significant bloat.

Many organizations require approval for schema changes on large tables. You can enforce [approval processes](/docs/administration/custom-approval/) or [automated schema reviews](/docs/sql-review/review-rules/#alter-table) via Bytebase.

</HintBlock>

1. **Write Blocking**: Many ALTER TABLE operations block writes (but not reads) until completed.

2. **Resource Consumption**: Altering large tables requires significant CPU, memory, and disk I/O.

3. **Table Bloat**: Some operations create significant table bloat requiring VACUUM afterward.

4. **Replication Impact**: On replicated environments, alterations must propagate to all replicas.

## Understanding Large Table Challenges

Tables with millions of rows or several GB in size typically require special consideration for ALTER operations. The primary challenges include:

- Operation duration (potentially hours)
- Write blocking causing application delays
- Server resource consumption affecting other workloads
- Table bloat affecting performance after the operation
- Replication lag on replicated environments

## Methods for Altering Large Tables

### Using Fast ALTER TABLE Options

PostgreSQL offers several ALTER TABLE operations that are nearly instantaneous, even on large tables:

```sql
-- Adding a nullable column with no default is fast
ALTER TABLE large_table ADD COLUMN new_column VARCHAR(255);

-- Dropping a column is fast (doesn't immediately reclaim space)
ALTER TABLE large_table DROP COLUMN unused_column;

-- Renaming a column or table is fast
ALTER TABLE large_table RENAME COLUMN old_name TO new_name;
```

These operations are fast because:

- Adding nullable columns only updates the system catalog, not the table data
- Dropping columns marks them as invisible without physically removing data
- Renames only change metadata

### Using CONCURRENTLY for Index Operations

For adding indexes to large tables:

```sql
-- Create index without blocking writes
CREATE INDEX CONCURRENTLY idx_column ON large_table (column_name);

-- Drop index without blocking
DROP INDEX CONCURRENTLY idx_column;
```

This approach:

- Allows both reads and writes during index creation
- Takes significantly longer than standard index creation
- Requires minimal locking
- Works for all index types

### Using pg_repack for Table Reorganization

For operations that would normally require a table rewrite:

```bash
# Install pg_repack if not already installed
sudo apt-get install postgresql-15-repack

# Reorganize a table with minimal locking
pg_repack -h localhost -U postgres -d database -t large_table
```

This approach:

- Creates a new table with the desired structure
- Copies data with minimal locking
- Swaps tables atomically at the end
- Can apply various alterations during the process

### Using Temporary Tables for Major Changes

For operations not supported by other methods:

```sql
-- Create new table with desired structure
CREATE TABLE large_table_new (
    id INT,
    existing_column TEXT,
    new_column VARCHAR(255)
);

-- Copy data in batches
DO $$
DECLARE
    batch_size INT := 10000;
    max_id INT;
    current_id INT := 0;
BEGIN
    SELECT MAX(id) INTO max_id FROM large_table;
    WHILE current_id <= max_id LOOP
        INSERT INTO large_table_new
        SELECT id, existing_column, NULL as new_column
        FROM large_table
        WHERE id > current_id AND id <= current_id + batch_size;

        current_id := current_id + batch_size;
        COMMIT;
    END LOOP;
END $$;

-- Swap tables (with minimal downtime)
BEGIN;
ALTER TABLE large_table RENAME TO large_table_old;
ALTER TABLE large_table_new RENAME TO large_table;
COMMIT;
```

## Monitoring ALTER Progress

### Using pg_stat_progress_alter_table (PostgreSQL 13+)

```sql
-- Monitor ALTER TABLE progress
SELECT
    pid,
    datname,
    relid::regclass AS table_name,
    command,
    phase,
    blocks_total,
    blocks_done,
    tuples_total,
    tuples_done,
    round(100.0 * blocks_done / nullif(blocks_total, 0), 2) AS "% complete"
FROM pg_stat_progress_alter_table;
```

### Using pg_stat_activity

```sql
-- Monitor running ALTER operations
SELECT
    pid,
    query,
    state,
    wait_event_type,
    wait_event,
    now() - xact_start AS duration
FROM pg_stat_activity
WHERE query LIKE 'ALTER TABLE%'
ORDER BY duration DESC;
```

### For CONCURRENTLY Operations

```sql
-- Monitor CREATE INDEX CONCURRENTLY progress (PostgreSQL 12+)
SELECT
    pid,
    datname,
    relid::regclass AS table_name,
    phase,
    round(100.0 * tuples_done / nullif(tuples_total, 0), 2) AS "% complete"
FROM pg_stat_progress_create_index;
```

## Common Errors and Solutions

See [PostgreSQL Error Reference](/reference/postgres/error/overview/) for errors you may encounter. Here are some most common ones:

### Error: 55006 - object in use

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

-- Consider terminating blocking sessions if appropriate
SELECT pg_terminate_backend(pid) FROM pg_stat_activity
WHERE pid = <blocking_pid>;
```

### Error: 53100 - disk full

```sql
-- Check available disk space
df -h

-- Free up disk space or add storage
-- Consider using tablespaces on different volumes
CREATE TABLESPACE faster_storage LOCATION '/path/to/storage';
ALTER TABLE large_table SET TABLESPACE faster_storage;
```

### Error: out of memory

```sql
-- Adjust work memory for operations
SET maintenance_work_mem = '2GB';

-- For server-wide settings (requires restart)
ALTER SYSTEM SET maintenance_work_mem = '2GB';
SELECT pg_reload_conf();
```

## Best Practices

1. **Use ALTER Operations That Don't Rewrite the Table**: Whenever possible, use operations that don't require a full table rewrite:

   - Adding nullable columns without defaults
   - Using DROP COLUMN instead of removing multiple columns at once
   - Using CONCURRENTLY for index operations

2. **Schedule During Low Traffic Periods**: Even with concurrent operations, perform alterations during off-peak hours.

3. **Test in Staging First**: Validate the ALTER operation on a copy of the production data to estimate time and resources needed.

4. **Backup Before Changes**: Always create a database backup before altering large tables.

5. **Use Transactions Wisely**: PostgreSQL's transactional DDL can be helpful, but consider the lock duration for large operations.

6. **Monitor Table Bloat**: After alterations, check if VACUUM FULL or pg_repack is needed to recover space.

7. **Consider Partitioning**: For very large tables, consider partitioning before altering to work with smaller chunks of data.

8. **Use FILLFACTOR for Heavily Updated Tables**: Setting a lower FILLFACTOR can reduce future bloat when altering tables that receive many updates.

9. **Utilize NOWAIT Option**: Use the NOWAIT option to avoid long waits for table locks:

   ```sql
   ALTER TABLE large_table
   ADD COLUMN new_column TEXT
   NOWAIT;
   ```

10. **Consider Replication Lag**: ALTER operations must be replayed on replicas and can cause significant lag.

## Advanced Techniques

### Altering Tables with Zero Downtime

For mission-critical tables that cannot tolerate blocking:

1. Create a new table with the desired structure:

   ```sql
   CREATE TABLE users_new (
       id INT,
       name TEXT,
       email TEXT,
       new_column VARCHAR(255)
   );
   ```

2. Set up a trigger to capture changes:

   ```sql
   CREATE OR REPLACE FUNCTION sync_users_changes()
   RETURNS TRIGGER AS $$
   BEGIN
       IF (TG_OP = 'INSERT') THEN
           INSERT INTO users_new VALUES (NEW.id, NEW.name, NEW.email, NULL);
       ELSIF (TG_OP = 'UPDATE') THEN
           UPDATE users_new SET name = NEW.name, email = NEW.email
           WHERE id = NEW.id;
       ELSIF (TG_OP = 'DELETE') THEN
           DELETE FROM users_new WHERE id = OLD.id;
       END IF;
       RETURN NULL;
   END;
   $$ LANGUAGE plpgsql;

   CREATE TRIGGER users_sync_trigger
   AFTER INSERT OR UPDATE OR DELETE ON users
   FOR EACH ROW EXECUTE FUNCTION sync_users_changes();
   ```

3. Copy existing data in batches:

   ```sql
   DO $$
   DECLARE
       batch_size INT := 10000;
       last_id INT := 0;
       max_id INT;
   BEGIN
       SELECT COALESCE(MAX(id), 0) INTO max_id FROM users;
       WHILE last_id < max_id LOOP
           INSERT INTO users_new
           SELECT id, name, email, NULL
           FROM users
           WHERE id > last_id
           ORDER BY id
           LIMIT batch_size;

           GET DIAGNOSTICS last_id = ROW_COUNT;
           RAISE NOTICE 'Copied batch ending with id %', last_id;

           COMMIT;
       END LOOP;
   END $$;
   ```

4. Verify data consistency before switching
5. Switch tables atomically:
   ```sql
   BEGIN;
   DROP TRIGGER users_sync_trigger ON users;
   ALTER TABLE users RENAME TO users_old;
   ALTER TABLE users_new RENAME TO users;
   COMMIT;
   ```

### Using Logical Replication for Schema Changes

PostgreSQL 10+ supports logical replication, which can be used for large-scale schema changes:

1. Create a publication on the source table:

   ```sql
   CREATE PUBLICATION source_pub FOR TABLE large_table;
   ```

2. Create the target table with the new schema
3. Create a subscription to replicate data:

   ```sql
   CREATE SUBSCRIPTION target_sub
   CONNECTION 'host=localhost dbname=postgres user=postgres'
   PUBLICATION source_pub;
   ```

4. Once replication is caught up, switch applications to the new table

<HintBlock type="info">

For teams managing large-scale database environments, Bytebase provides [schema change workflows](/docs/change-database/change-workflow/) with [pre-checks](/docs/sql-review/overview/) and [approval processes](/docs/administration/custom-approval/) to increase safety when altering large tables in production.

</HintBlock>

## References

- [PostgreSQL ALTER TABLE Documentation](https://www.postgresql.org/docs/current/sql-altertable.html)
- [pg_repack Documentation](https://reorg.github.io/pg_repack/)
- [PostgreSQL Monitoring Progress](https://www.postgresql.org/docs/current/progress-reporting.html)
- PostgreSQL Error Reference
