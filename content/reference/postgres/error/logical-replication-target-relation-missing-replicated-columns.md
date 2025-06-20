---
title: 'ERROR: logical replication target relation is missing some replicated columns'
---

## Error Message

```sql
ERROR: logical replication target relation "public.t" is missing some replicated columns
```

## Description

This error occurs in PostgreSQL logical replication when the target (subscriber) table is missing columns that exist in the source (publisher) table. PostgreSQL logical replication requires that the target table contains at least all the columns being replicated from the source table, though it can have additional columns.

## Causes

- Schema changes (DDL) applied to the source table but not to the target table
- Target table created with fewer columns than the source table
- Column additions to source table without corresponding changes to target
- Migration scripts run only on the source database
- Manual schema modifications that weren't synchronized across replication setup
- Replication setup created when tables had different structures

## Solutions

1. **Add the missing columns to the target table**:

   ```sql
   -- On the target database, add the missing column
   ALTER TABLE public.t ADD COLUMN newcol int;

   -- Replication will automatically resume after the column is added
   ```

2. **Pause replication, sync schema changes, then resume**:

   ```sql
   -- On the target database - pause replication
   ALTER SUBSCRIPTION mysub DISABLE;

   -- Apply schema changes to match source table
   ALTER TABLE public.t ADD COLUMN newcol int;

   -- Resume replication
   ALTER SUBSCRIPTION mysub ENABLE;
   ```

3. **For multiple schema changes, use a systematic approach**:

   ```sql
   -- Disable subscription
   ALTER SUBSCRIPTION mysub DISABLE;

   -- Check source table structure
   \d source_table_name

   -- Apply all necessary schema changes to target
   ALTER TABLE target_table ADD COLUMN col1 text;
   ALTER TABLE target_table ADD COLUMN col2 timestamp;

   -- Re-enable subscription
   ALTER SUBSCRIPTION mysub ENABLE;
   ```

4. **For new tables added to publication**:

   ```sql
   -- On source: Add new table to publication
   ALTER PUBLICATION mypub ADD TABLE newly_added_table;

   -- On target: Create the table structure first
   CREATE TABLE newly_added_table (
     id SERIAL PRIMARY KEY,
     name TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Refresh subscription to sync new table
   ALTER SUBSCRIPTION mysub REFRESH PUBLICATION;
   ```

5. **Check and synchronize table structures**:

   ```sql
   -- Compare table structures between source and target
   -- On source database:
   SELECT column_name, data_type, is_nullable
   FROM information_schema.columns
   WHERE table_name = 't' AND table_schema = 'public'
   ORDER BY ordinal_position;

   -- Run the same query on target to compare
   ```

## Prevention

1. **Implement coordinated schema change procedures**:

   ```sql
   -- Always follow this pattern for schema changes:
   -- 1. Pause replication
   ALTER SUBSCRIPTION mysub DISABLE;

   -- 2. Apply changes to target first
   ALTER TABLE target_table ADD COLUMN new_col int;

   -- 3. Apply changes to source
   ALTER TABLE source_table ADD COLUMN new_col int;

   -- 4. Resume replication
   ALTER SUBSCRIPTION mysub ENABLE;
   ```

2. **Use schema migration tools** that can coordinate changes across multiple databases

3. **Monitor replication status** regularly:

   ```sql
   -- Check subscription status
   SELECT subname, subenabled, subconninfo
   FROM pg_subscription;

   -- Check replication slot status
   SELECT slot_name, active, confirmed_flush_lsn
   FROM pg_replication_slots;

   -- Monitor replication lag
   SELECT client_addr, state, sent_lsn, write_lsn, flush_lsn, replay_lsn,
          write_lag, flush_lag, replay_lag
   FROM pg_stat_replication;
   ```

4. **Document schema dependencies** and replication topology

5. **Use consistent naming conventions** and version control for database schemas

6. **Test schema changes** in development environments that mirror production replication setup

## Common Scenarios and Solutions

1. **Application framework migrations (Django, Rails, etc.)**:

   ```bash
   # Don't run migrations only on source
   # Instead, coordinate the process:

   # 1. Pause replication
   # 2. Run migration on target first
   # 3. Run migration on source
   # 4. Resume replication
   ```

2. **Handling column additions with default values**:

   ```sql
   -- Target table can have additional columns with defaults
   ALTER TABLE target_table ADD COLUMN extra_col text DEFAULT 'default_value';

   -- Source table addition
   ALTER TABLE source_table ADD COLUMN new_col int;

   -- Target table must add the same column
   ALTER TABLE target_table ADD COLUMN new_col int;
   ```

3. **Emergency recovery when replication is broken**:

   ```sql
   -- Drop and recreate subscription if needed
   DROP SUBSCRIPTION mysub;

   -- Ensure target table structure matches source
   -- Then recreate subscription
   CREATE SUBSCRIPTION mysub
   CONNECTION 'user=repuser password=reppass host=source_host dbname=source_db'
   PUBLICATION mypub;
   ```

<HintBlock type="info">

PostgreSQL logical replication does not automatically replicate DDL changes. Schema modifications must be coordinated manually between the publisher and subscriber databases.

</HintBlock>

<HintBlock type="warning">

Always test logical replication schema changes in a development environment first. Coordinate schema changes carefully to avoid breaking replication in production systems.

</HintBlock>
