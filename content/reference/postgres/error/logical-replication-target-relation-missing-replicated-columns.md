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

- Schema changes applied to the source table but not to the target table
- Target table created with fewer columns than the source table
- Column additions to source table without corresponding changes to target
- Migration scripts run only on the source database

## Solutions

1. **Add the missing columns to the target table**:

   ```sql
   -- On the target database, add the missing column
   ALTER TABLE public.t ADD COLUMN newcol int;
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

3. **Compare table structures to identify differences**:

   ```sql
   -- Compare table structures between source and target
   SELECT column_name, data_type, is_nullable
   FROM information_schema.columns
   WHERE table_name = 't' AND table_schema = 'public'
   ORDER BY ordinal_position;
   ```

## Prevention

- Apply schema changes to the target table first, then to the source table
- Use schema migration tools that coordinate changes across multiple databases
- Monitor replication status regularly
- Test schema changes in development environments that mirror production replication setup
