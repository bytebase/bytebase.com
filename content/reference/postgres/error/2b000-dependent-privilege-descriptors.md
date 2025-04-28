---
title: 'ERROR 2B000: Cannot drop role because objects depend on it'
---

## Error Message

```sql
ERROR: cannot drop role "admin" because some objects depend on it
DETAIL: 3 objects in database "mydb" depend on role "admin"
```

## Description

This error occurs when you attempt to drop a role (user or group) that still owns database objects or has been granted permissions on objects. PostgreSQL prevents the role from being dropped to maintain security and ownership integrity.

## Causes

- Attempting to drop a role that still owns database objects (tables, functions, etc.)
- The role is referenced in grant statements or permissions
- The role is specified as the default owner for objects in certain schemas
- The role is used in row-level security policies

## Solutions

1. **Reassign ownership of objects before dropping**:

   ```sql
   -- Reassign owned objects to another role
   REASSIGN OWNED BY admin TO new_owner;

   -- Then drop the role
   DROP ROLE admin;
   ```

2. **Drop all objects owned by the role**:

   ```sql
   -- Use with caution - this deletes all objects owned by the role
   DROP OWNED BY admin;

   -- Then drop the role
   DROP ROLE admin;
   ```

3. **Identify dependent objects** to handle them individually:

   ```sql
   -- List objects owned by the role
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
   WHERE pg_catalog.pg_get_userbyid(c.relowner) = 'admin';
   ```

4. **For permissions**, revoke all privileges granted to the role:
   ```sql
   -- You may need to do this for multiple objects
   REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM admin;
   REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM admin;
   REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM admin;
   ```

## Prevention

- Use role inheritance to organize permissions
- Have dedicated owner roles for different application components
- Implement a decommissioning process for users that includes transferring ownership
- Document role ownership and dependencies

<HintBlock type="info">

You can use the `\du` command in psql to see role memberships and the `\dp` command to see privileges.

</HintBlock>
