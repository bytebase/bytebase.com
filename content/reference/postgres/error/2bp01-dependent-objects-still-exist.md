---
title: 'ERROR 2BP01: Cannot drop schema because objects depend on it'
---

## Error Message

```sql
ERROR: cannot drop schema "public" because other objects depend on it
DETAIL: table users depends on schema public
HINT: Use DROP ... CASCADE to drop the dependent objects too.
```

## Description

This error occurs when you try to drop a schema that still contains database objects. PostgreSQL prevents the schema from being dropped to avoid orphaning these objects, which would cause data loss.

## Causes

- Trying to drop a schema that still contains tables, views, functions, or other objects
- Dependencies between the schema and objects in other schemas
- Objects created by extensions that depend on the schema
- Permission issues preventing viewing all dependent objects

## Solutions

1. **Use CASCADE option** to drop the schema and all its objects:

   ```sql
   -- Use with extreme caution - this will delete all objects in the schema
   DROP SCHEMA public CASCADE;
   ```

2. **Drop objects individually** before dropping the schema:

   ```sql
   -- Drop tables first
   DROP TABLE public.users;
   DROP TABLE public.orders;
   -- Drop other objects...

   -- Then drop the schema
   DROP SCHEMA public;
   ```

3. **Move objects to another schema** instead of dropping them:

   ```sql
   -- Create new schema
   CREATE SCHEMA new_schema;

   -- Move table to the new schema
   ALTER TABLE public.users SET SCHEMA new_schema;

   -- Then drop the now-empty schema
   DROP SCHEMA public;
   ```

4. **List dependent objects** to handle them systematically:
   ```sql
   SELECT n.nspname as schema,
          c.relname as name,
          CASE c.relkind WHEN 'r' THEN 'table'
                         WHEN 'v' THEN 'view'
                         WHEN 'm' THEN 'materialized view'
                         WHEN 'i' THEN 'index'
                         WHEN 'S' THEN 'sequence'
                         WHEN 's' THEN 'special'
                         WHEN 'f' THEN 'foreign table' END as type
   FROM pg_catalog.pg_class c
   JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = 'public';
   ```

## Prevention

- Plan schema organization before creating objects
- Use schema namespacing in applications to allow for schema changes
- Create dedicated schemas for different application components
- Document schema dependencies and ownership

<HintBlock type="info">

While using DROP SCHEMA ... CASCADE is the quickest solution, it's potentially destructive. Always back up your database before performing this operation in production environments.

</HintBlock>
