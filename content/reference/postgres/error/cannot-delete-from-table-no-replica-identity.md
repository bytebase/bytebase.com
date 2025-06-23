---
title: 'ERROR: cannot delete from table because it does not have a replica identity and publishes deletes'
---

## Error Message

```sql
ERROR: cannot delete from table "nopk" because it does not have a replica identity and publishes deletes
HINT: To enable deleting from the table, set REPLICA IDENTITY using ALTER TABLE.
```

## Description

This error occurs in PostgreSQL logical replication when you attempt to DELETE or UPDATE a row from a table that doesn't have a replica identity configured. Logical replication needs a way to uniquely identify rows on the subscriber (target) side to apply DELETE and UPDATE operations correctly. Without a replica identity, PostgreSQL cannot determine which specific row to modify on the subscriber.

## Causes

- Table has no primary key or unique constraint
- Table is included in a publication that replicates DELETE operations
- Replica identity is set to DEFAULT but no suitable unique index exists
- Attempting to delete or update rows in a table without proper row identification
- Publication created with `publish` parameter including 'delete' for tables without primary keys

## Solutions

1. **Add a primary key to the table**:

   ```sql
   -- Add a primary key column
   ALTER TABLE nopk ADD COLUMN id SERIAL PRIMARY KEY;

   -- Or use an existing column as primary key
   ALTER TABLE nopk ADD PRIMARY KEY (existing_column);
   ```

2. **Set replica identity to FULL** (replicates entire row):

   ```sql
   -- Use the full row as replica identity
   ALTER TABLE nopk REPLICA IDENTITY FULL;

   -- Now DELETE operations will work
   DELETE FROM nopk WHERE foo = 'boston';
   ```

3. **Create a unique index and set replica identity**:

   ```sql
   -- Create a unique index on one or more columns
   CREATE UNIQUE INDEX idx_nopk_unique ON nopk (foo, bar);

   -- Set replica identity to use this index
   ALTER TABLE nopk REPLICA IDENTITY USING INDEX idx_nopk_unique;
   ```

4. **Set replica identity to NOTHING** (disables DELETE/UPDATE replication):

   ```sql
   -- Only INSERT operations will be replicated
   ALTER TABLE nopk REPLICA IDENTITY NOTHING;
   ```

5. **Check current replica identity setting**:

   ```sql
   -- View replica identity for all tables
   SELECT schemaname, tablename,
          CASE relreplident
            WHEN 'd' THEN 'DEFAULT'
            WHEN 'n' THEN 'NOTHING'
            WHEN 'f' THEN 'FULL'
            WHEN 'i' THEN 'INDEX'
          END as replica_identity
   FROM pg_class c
   JOIN pg_namespace n ON c.relnamespace = n.oid
   JOIN pg_stat_user_tables s ON c.oid = s.relid
   WHERE c.relkind = 'r';
   ```

6. **For tables that truly cannot have unique identification**:

   ```sql
   -- Option 1: Remove the table from publication
   ALTER PUBLICATION mypub DROP TABLE nopk;

   -- Option 2: Create a publication that only publishes INSERT
   CREATE PUBLICATION insert_only_pub FOR TABLE nopk WITH (publish = 'insert');
   ```

## Replica Identity Options

1. **DEFAULT**: Use primary key or unique index (if available)
2. **FULL**: Use entire row for identification (higher network overhead)
3. **NOTHING**: Don't replicate UPDATE/DELETE operations
4. **INDEX**: Use specific unique index for identification

## Prevention

1. **Design tables with proper primary keys**:

   ```sql
   -- Always include a primary key when creating tables
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name TEXT,
     email TEXT UNIQUE
   );
   ```

2. **Add surrogate keys for tables without natural primary keys**:

   ```sql
   -- Add an auto-incrementing ID column
   ALTER TABLE existing_table ADD COLUMN id SERIAL PRIMARY KEY;
   ```

3. **Plan replication strategy** before creating publications:

   ```sql
   -- Consider what operations need to be replicated
   CREATE PUBLICATION selective_pub FOR TABLE table1, table2
   WITH (publish = 'insert, update');
   ```

4. **Use composite unique constraints** when single-column primary key isn't suitable:

   ```sql
   -- Create composite primary key
   ALTER TABLE order_items ADD PRIMARY KEY (order_id, product_id);
   ```

5. **Monitor replication setup** and validate table structures:

   ```sql
   -- Check tables without primary keys in published tables
   SELECT schemaname, tablename
   FROM pg_stat_user_tables s
   JOIN pg_publication_tables p ON s.relname = p.tablename
   WHERE s.relname NOT IN (
     SELECT t.tablename
     FROM information_schema.table_constraints c
     JOIN information_schema.tables t ON c.table_name = t.table_name
     WHERE c.constraint_type = 'PRIMARY KEY'
   );
   ```

## Common Scenarios and Solutions

1. **Log tables without primary keys**:

   ```sql
   -- Add a timestamp-based primary key
   ALTER TABLE audit_log ADD COLUMN log_id BIGSERIAL PRIMARY KEY;

   -- Or use REPLICA IDENTITY FULL if uniqueness isn't guaranteed
   ALTER TABLE audit_log REPLICA IDENTITY FULL;
   ```

2. **Junction tables in many-to-many relationships**:

   ```sql
   -- Use composite primary key
   ALTER TABLE user_roles ADD PRIMARY KEY (user_id, role_id);
   ```

3. **Temporary or staging tables**:

   ```sql
   -- Exclude from replication or use INSERT-only publication
   ALTER PUBLICATION main_pub DROP TABLE staging_table;
   ```

4. **Tables with duplicate rows by design**:

   ```sql
   -- Add a surrogate key or use REPLICA IDENTITY FULL
   ALTER TABLE event_log ADD COLUMN event_id BIGSERIAL PRIMARY KEY;
   ```

## Performance Considerations

- **REPLICA IDENTITY FULL** increases network traffic as entire rows are sent
- **Unique indexes** used for replica identity should be efficient
- Consider the trade-off between storage (additional ID column) and network overhead (FULL replica identity)
- Monitor replication lag when using FULL replica identity on large tables

<HintBlock type="info">

Logical replication requires a way to uniquely identify rows for UPDATE and DELETE operations. Tables without primary keys or unique constraints cannot reliably replicate these operations unless REPLICA IDENTITY FULL is used.

</HintBlock>

<HintBlock type="warning">

Using REPLICA IDENTITY FULL can significantly increase network bandwidth and replication overhead, especially for tables with wide rows. Consider adding a primary key instead when possible.

</HintBlock>
