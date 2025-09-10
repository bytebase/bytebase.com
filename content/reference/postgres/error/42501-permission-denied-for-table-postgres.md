---
title: 'ERROR 42501: Permission denied for table in Postgres'
---

## Error Message

```sql
ERROR: permission denied for table users
```

## Description

This error occurs when a user attempts to perform an operation on a table without having the necessary privileges. It can happen during SELECT, INSERT, UPDATE, DELETE operations or when accessing tables through JOINs.

## Causes

- User lacks required permissions for the operation
- Missing schema usage permissions
- Incorrect search path configuration
- Role membership issues
- Row-level security policies blocking access

## Solutions

1. **Grant appropriate permissions**:

   ```sql
   -- Grant specific permission
   GRANT SELECT ON table_name TO user_name;

   -- Grant multiple permissions
   GRANT SELECT, INSERT, UPDATE ON table_name TO user_name;
   ```

2. **Grant schema permissions**:

   ```sql
   GRANT USAGE ON SCHEMA schema_name TO user_name;
   ```

3. **Check current permissions**:

   ```sql
   -- For tables
   SELECT grantee, privilege_type
   FROM information_schema.role_table_grants
   WHERE table_name = 'mytable';
   ```

4. **Add user to role**:

   ```sql
   GRANT role_name TO user_name;
   ```

<HintBlock type="info">

Cloud database providers typically don't allow superuser privileges. Check with your provider about their specific permission model.

For more details on Postgres permission management, see [How to Manage Postgres Users and Roles](/blog/how-to-manage-postgres-users-and-roles).

</HintBlock>
