---
title: How to Use Postgres CREATE INDEX CONCURRENTLY
author: Tianzhou
updated_at: 2025/08/27 16:00:00
feature_image: /content/blog/postgres-create-index-concurrently/banner.webp
tags: Explanation
featured: false
description: Learn how to use CREATE INDEX CONCURRENTLY in Postgres to build indexes without blocking writes. Pitfalls, safety checks, and performance tips.
---

## The Problem with Regular CREATE INDEX

When you run a standard `CREATE INDEX` command in PostgreSQL, it acquires a **SHARE (ShareLock)** on the table, which has severe implications for concurrent operations.

```sql
-- This will block all writes to the users table
CREATE INDEX idx_users_email ON users(email);
```

### Technical Lock Details

The `SHARE` lock acquired by `CREATE INDEX` conflicts with several other lock modes:

- **RowExclusiveLock** (used by INSERT, UPDATE, DELETE)
- **ShareUpdateExclusiveLock** (used by VACUUM, ANALYZE, REINDEX CONCURRENTLY)
- **ShareRowExclusiveLock** (used by CREATE TRIGGER and some ALTER TABLE variants)
- **ExclusiveLock** (used by REFRESH MATERIALIZED VIEW CONCURRENTLY)
- **AccessExclusiveLock** (used by DROP TABLE, TRUNCATE, REINDEX, CLUSTER)

This lock compatibility matrix explains why regular index creation is so disruptive. Per the [PostgreSQL locking documentation](https://www.postgresql.org/docs/current/explicit-locking.html), a SHARE lock allows concurrent SELECT operations but blocks all write operations.

## CREATE INDEX CONCURRENTLY: The Solution

PostgreSQL's `CREATE INDEX CONCURRENTLY` allows index building without blocking writes by using a **SHARE UPDATE EXCLUSIVE (ShareUpdateExclusiveLock)** instead of a SHARE lock:

```sql
-- This allows writes to continue during index creation
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

### Lock Mode Comparison

The key difference lies in the lock mode used:

| Operation                   | Lock Mode                    | ❌ Conflicts With                                      | ✅ Allows                      |
| --------------------------- | ---------------------------- | ------------------------------------------------------ | ------------------------------ |
| `CREATE INDEX`              | **ShareLock**                | INSERT, UPDATE, DELETE, VACUUM, other DDL              | SELECT only                    |
| `CREATE INDEX CONCURRENTLY` | **ShareUpdateExclusiveLock** | Other DDL operations, multiple concurrent index builds | SELECT, INSERT, UPDATE, DELETE |

![lock-mode](/content/blog/postgres-create-index-concurrently/lock-table.webp)

The `ShareUpdateExclusiveLock` is specifically designed to allow concurrent data modifications while preventing conflicting DDL operations.

### How It Works

`CREATE INDEX CONCURRENTLY` uses a multi-phase approach:

1. **Initial Catalog Entry**: Creates index metadata with `indisvalid = false`
2. **First Table Scan**: Builds initial index structure while allowing writes
3. **Second Table Scan**: Catches up with changes that occurred during first scan
4. **Validation**: Marks index as valid (`indisvalid = true`)

During this process:

- **Writes continue normally** - INSERT, UPDATE, DELETE work without interruption
- **Takes longer than regular indexing** - Typically 2-3x slower due to multiple scans
- **Uses more resources** - Higher CPU and I/O load from tracking concurrent changes

### Key Limitations

While powerful, `CREATE INDEX CONCURRENTLY` has important restrictions:

#### Cannot Run Inside Transactions

```sql
BEGIN;
CREATE INDEX CONCURRENTLY idx_users_email ON users(email); -- ERROR!
COMMIT;
-- ERROR: CREATE INDEX CONCURRENTLY cannot run inside a transaction block
```

This limitation exists because the operation needs to commit multiple internal transactions during its phases.

#### Other Limitations

- **Only one concurrent index per table** - Multiple concurrent index builds on the same table will serialize
- **Failure leaves invalid index** - Must be manually dropped if creation fails
- **Foreign keys reference check** - Creating unique index concurrently may fail if duplicate values are inserted during creation

## Tracking Index Creation Progress

### Using pg_stat_progress_create_index

We can use [pg_stat_progress_create_index](https://www.postgresql.org/docs/current/progress-reporting.html#CREATE-INDEX-PROGRESS-REPORTING) to track the index creation:

```sql
-- Monitor index creation progress
SELECT
    pid,
    datname,
    relid::regclass AS table_name,
    index_relid::regclass AS index_name,
    phase,
    lockers_total,
    lockers_done,
    current_locker_pid,
    blocks_total,
    blocks_done,
    tuples_total,
    tuples_done,
    partitions_total,
    partitions_done
FROM pg_stat_progress_create_index;
```

The `phase` column shows the current operation stage:

- `initializing`: Starting up
- `waiting for writers before build`: Waiting for concurrent writes to finish
- `building index`: Main index creation phase
- `waiting for writers before validation`: Preparing for validation
- `index validation: scanning index`: Validating index entries
- `index validation: scanning table`: Final validation
- `waiting for old snapshots`: Waiting for transactions to complete
- `waiting for readers before marking dead`: Final cleanup

### Quick Validity Check with pg_index

The fastest way to check if an index is ready for use:

```sql
-- Check if index is valid and ready for use
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes i
JOIN pg_class c ON c.relname = i.indexname
JOIN pg_index idx ON idx.indexrelid = c.oid
WHERE NOT idx.indisvalid
  AND schemaname NOT IN ('pg_catalog', 'information_schema');
```

The `indisvalid` column:

- `true`: Index is complete and being used by the query planner
- `false`: Index is either being built or failed during concurrent creation

_Postgres doesn't have built-in INVISBLE INDEX clause. You can achieve the behavior by setting `indisvalid` to `false`_.

## Best Practices

### Automatic Review

To prevent developers from running `CREATE INDEX` and accidentally locking the database, implement automatic SQL linting during the review process.

<HintBlock type="info">

[Bytebase SQL Review](https://docs.bytebase.com/sql-review/review-rules#create-index-concurrently) provides automated enforcement of the `CREATE INDEX CONCURRENTLY` rule and can be integrated with [CI/CD pipelines](https://docs.bytebase.com/vcs-integration/overview#github-actions) to catch violations before deployment.

</HintBlock>

### Always Verify Index Validity After Creation

```sql
-- After CREATE INDEX CONCURRENTLY completes
SELECT indisvalid
FROM pg_index
WHERE indexrelid = 'idx_users_email'::regclass;

-- If false, the index creation failed and needs cleanup
DROP INDEX IF EXISTS idx_users_email;
```

### Clean Up Failed Indexes

```sql
-- Find and drop all invalid indexes
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT schemaname, indexname
        FROM pg_indexes i
        JOIN pg_class c ON c.relname = i.indexname
        JOIN pg_index idx ON idx.indexrelid = c.oid
        WHERE NOT idx.indisvalid
          AND schemaname NOT IN ('pg_catalog', 'information_schema')
    LOOP
        EXECUTE format('DROP INDEX %I.%I', r.schemaname, r.indexname);
        RAISE NOTICE 'Dropped invalid index %.%', r.schemaname, r.indexname;
    END LOOP;
END $$;
```

### Performance Consideration

| Aspect              | CREATE INDEX          | CREATE INDEX CONCURRENTLY              |
| ------------------- | --------------------- | -------------------------------------- |
| **Lock Level**      | SHARE (blocks writes) | SHARE UPDATE EXCLUSIVE (allows writes) |
| **Duration**        | Baseline (1x)         | 2-3x longer                            |
| **CPU Usage**       | High burst            | Sustained moderate                     |
| **I/O Impact**      | Single intensive scan | Multiple moderate scans                |
| **Memory Usage**    | maintenance_work_mem  | Similar, held longer                   |
| **Transaction Log** | Minimal               | Higher due to concurrent changes       |

Even though `CREATE INDEX CONCURRENTLY` doesn't block writes, it still impacts performance:

- Schedule during low-traffic periods when possible
- Monitor CPU and I/O metrics during creation
- Consider increasing `maintenance_work_mem` temporarily for faster indexing

## References

1. [Postgres locking mode](https://www.postgresql.org/docs/current/explicit-locking.html)
1. [Index creation progress table](https://www.postgresql.org/docs/current/progress-reporting.html#CREATE-INDEX-PROGRESS-REPORTING)
1. [Source code for CREATE INDEX CONCURRENTLY](https://github.com/postgres/postgres/blob/ef5b87b970dc28adeeb88191fbf66c9d6298b112/src/backend/commands/indexcmds.c#L542)
