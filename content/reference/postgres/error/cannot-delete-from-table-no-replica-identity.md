---
title: 'ERROR: cannot delete from table because it does not have a replica identity and publishes deletes'
---

## Error Message

```sql
ERROR: cannot delete from table "nopk" because it does not have a replica identity and publishes deletes
HINT: To enable deleting from the table, set REPLICA IDENTITY using ALTER TABLE.
```

## Description

This error occurs in PostgreSQL logical replication when you attempt to DELETE or UPDATE a row from a table that doesn't have a replica identity configured. Logical replication needs a way to uniquely identify rows on the subscriber (target) side to apply DELETE and UPDATE operations correctly.

## Causes

- Table has no primary key or unique constraint
- Table is included in a publication that replicates DELETE operations
- Replica identity is set to DEFAULT but no suitable unique index exists
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
   ```

3. **Create a unique index and set replica identity**:

   ```sql
   -- Create a unique index on one or more columns
   CREATE UNIQUE INDEX idx_nopk_unique ON nopk (column1, column2);

   -- Set replica identity to use this index
   ALTER TABLE nopk REPLICA IDENTITY USING INDEX idx_nopk_unique;
   ```

4. **Remove the table from publication**:

   ```sql
   -- Remove the table from publication
   ALTER PUBLICATION mypub DROP TABLE nopk;

   -- Or create a publication that only publishes INSERT
   CREATE PUBLICATION insert_only_pub FOR TABLE nopk WITH (publish = 'insert');
   ```

## Prevention

- Design tables with proper primary keys when creating them
- Plan replication strategy before creating publications
- Add surrogate keys for tables without natural primary keys
- Use composite unique constraints when single-column primary key isn't suitable
