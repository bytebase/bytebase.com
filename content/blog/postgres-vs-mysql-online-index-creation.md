---
title: 'Postgres vs. MySQL: Online Index Creation'
author: Tianzhou
updated_at: 2025/06/03 12:00
feature_image: /content/blog/postgres-vs-mysql-online-index-creation/cover.webp
tags: Explanation
description: 'Compare the online index creation difference between Postgres and MySQL'
---

Online index creation is a critical capability for modern databases, allowing you to add indexes without blocking concurrent read/write operations. This comparison examines the two leading approaches: PostgreSQL 17's `CREATE INDEX CONCURRENTLY` and MySQL 8.0's Online DDL with `ALGORITHM=INPLACE`.

## Basic Syntax

### PostgreSQL 17

```sql
CREATE INDEX CONCURRENTLY idx_email ON users (email);
```

### MySQL 8.0

```sql
-- Basic online index (equivalent to PostgreSQL CONCURRENTLY)
CREATE INDEX idx_email ON users (email)
ALGORITHM=INPLACE, LOCK=NONE;

-- Different concurrency levels
CREATE INDEX idx_status ON users (status)
ALGORITHM=INPLACE, LOCK=SHARED;  -- Blocks writes, allows reads

CREATE INDEX idx_created ON users (created_at)
ALGORITHM=INPLACE, LOCK=EXCLUSIVE;  -- Fastest, blocks all access
```

## Internal Mechanisms: How They Actually Work

### PostgreSQL: CREATE INDEX CONCURRENTLY

**Traditional CREATE INDEX (Non-Online):**

```c
// Simplified internal flow
DefineIndex() {
    lock_table(EXCLUSIVE);        // Blocks ALL operations
    scan_table();                 // Single scan
    build_index_structure();
    write_to_disk();
    update_catalogs();
    unlock_table();
}
```

**CREATE INDEX CONCURRENTLY (Online):**

```sql
-- Phase 1: Create "invalid" index entry (brief exclusive lock)
INSERT INTO pg_class (relname, relkind) VALUES ('idx_name', 'i');
UPDATE pg_index SET indisvalid = false WHERE indexrelid = new_index_oid;

-- Phase 2: First table scan - build initial index
...

-- Phase 3: Second table scan - catch concurrent changes
...

-- Phase 4: Wait for conflicting transactions to complete
...

-- Phase 5: Mark index "valid" (brief exclusive lock)
UPDATE pg_index SET indisvalid = true WHERE indexrelid = index_oid;
```

### MySQL: ALGORITHM=INPLACE

**Traditional ALGORITHM=COPY:**

```c
mysql_alter_table() {
    create_temp_table_with_new_structure();
    lock_table_metadata(SHARED_UPGRADEABLE);
    copy_all_data_to_temp_table();      // 2x storage needed
    apply_concurrent_changes();
    lock_table_metadata(EXCLUSIVE);     // Brief exclusive lock
    swap_table_names();
    drop_old_table();
}
```

**ALGORITHM=INPLACE (Online):**

```c
// Phase 1: Preparation
innobase_inplace_alter_table_prepare() {
    dict_mem_index_create();              // Allocate index space
    row_log_allocate();                   // Set up change logging
    acquire_metadata_lock(SHARED_UPGRADEABLE);
}

// Phase 2: Building with change tracking
innobase_inplace_alter_table_build() {
    while (has_more_records()) {
        record = fetch_next_record();
        index_entry = build_index_entry(record);
        insert_into_index(index_entry);

        if (concurrent_change_detected()) {
            row_log_insert(change_info);   // Log concurrent changes
        }
    }
}

// Phase 3: Apply changes
innobase_inplace_alter_table_commit() {
    acquire_metadata_lock(EXCLUSIVE);     // Brief exclusive lock
    row_log_apply();                      // Apply logged changes
    dict_index_set_online_status(ONLINE);
    release_metadata_lock();
}
```

## Monitoring Progress

### PostgreSQL 17

```sql
-- Monitor concurrent index creation
SELECT
    pid,
    datname,
    phase,
    blocks_total,
    blocks_done,
    ROUND(100.0 * blocks_done / blocks_total, 2) as pct_complete
FROM pg_stat_progress_create_index;
```

### MySQL 8.0

```sql
-- Monitor online DDL progress
SELECT
    event_name,
    work_completed,
    work_estimated,
    ROUND(100 * work_completed / work_estimated, 2) as pct_complete
FROM performance_schema.events_stages_current
WHERE event_name LIKE '%alter%';
```

## Error Handling & Recovery

### PostgreSQL

```sql
-- Failed concurrent index leaves invalid index
SELECT schemaname, indexname
FROM pg_indexes
WHERE indexname LIKE '%_ccnew';

-- Manual cleanup required
DROP INDEX CONCURRENTLY idx_email_ccnew;

-- Retry
CREATE INDEX CONCURRENTLY idx_email ON users (email);
```

### MySQL

```sql
-- Automatic rollback on failure
-- No cleanup needed, just retry with different options

-- If LOCK=NONE fails, try LOCK=SHARED
CREATE INDEX idx_email ON users (email)
ALGORITHM=INPLACE, LOCK=SHARED;
```

## Postgres vs MySQL Comparison Series

- [Overall comparison](/blog/postgres-vs-mysql)
- [DDL Transaction Difference](/blog/postgres-vs-mysql-ddl-transaction)
- [Indexing Options](/blog/postgres-vs-mysql-indexing-options)
- [JSON Support](/blog/postgres-vs-mysql-json-support)

## References

1. **PostgreSQL 17 Documentation - Building Indexes Concurrently**  
   https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY

1. **PostgreSQL 17 Documentation - Progress Reporting**  
   https://www.postgresql.org/docs/current/progress-reporting.html#CREATE-INDEX-PROGRESS-REPORTING

1. **MySQL 8.0 Reference Manual - Online DDL Operations**  
   https://dev.mysql.com/doc/refman/8.0/en/innodb-online-ddl-operations.html

1. **MySQL 8.0 Performance Schema - Events Stages**  
   https://dev.mysql.com/doc/refman/8.0/en/performance-schema-events-stages-current-table.html
