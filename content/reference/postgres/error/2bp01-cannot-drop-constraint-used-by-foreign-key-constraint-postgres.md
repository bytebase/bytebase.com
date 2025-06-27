---
title: 'ERROR 2BP01: Cannot drop constraint used by foreign key in Postgres'
---

## Error Message

```sql
ERROR: cannot drop constraint "users_pkey" on table "users" because constraint "orders_user_id_fkey" on table "orders" requires it
HINT: You can drop constraint "orders_user_id_fkey" on table "orders" instead.
```

## Description

This error occurs when you attempt to drop a constraint (typically a primary key or unique constraint) that is referenced by a foreign key in another table. PostgreSQL prevents this operation to maintain referential integrity.

## Causes

- Dropping a primary key that is referenced by a foreign key
- Dropping a unique constraint that is referenced by a foreign key
- Altering a table in a way that would remove a referenced constraint
- Running migrations without considering constraint dependencies

## Solutions

1. **Drop the dependent foreign key constraints first**:

   ```sql
   -- Drop the foreign key constraint first
   ALTER TABLE orders DROP CONSTRAINT orders_user_id_fkey;

   -- Now you can drop the primary key constraint
   ALTER TABLE users DROP CONSTRAINT users_pkey;
   ```

2. **Use CASCADE option** (with caution):

   ```sql
   -- This will drop the constraint and all dependent objects
   ALTER TABLE users DROP CONSTRAINT users_pkey CASCADE;
   ```

3. **Identify dependent foreign keys**:

   ```sql
   -- Find all foreign keys that reference a specific table
   SELECT
       tc.constraint_name,
       tc.table_schema,
       tc.table_name,
       kcu.column_name,
       ccu.table_name AS foreign_table_name
   FROM
       information_schema.table_constraints AS tc
       JOIN information_schema.key_column_usage AS kcu
         ON tc.constraint_name = kcu.constraint_name
       JOIN information_schema.constraint_column_usage AS ccu
         ON ccu.constraint_name = tc.constraint_name
   WHERE tc.constraint_type = 'FOREIGN KEY'
   AND ccu.table_name = 'users';
   ```

## Prevention

- Plan schema changes with consideration for constraint dependencies
- Drop dependent objects before dropping referenced objects
- Create referenced objects before creating dependent objects
- Use database versioning tools to manage schema changes
- Test migrations in development environments before applying to production

<HintBlock type="warning">

Using CASCADE will automatically drop all dependent objects, which can lead to unexpected data integrity issues. Always perform a backup before using this in production.

</HintBlock>
