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

## Prevention

- Plan permission structure before creating objects
- Use role-based access control instead of individual user permissions
- Document permission requirements in your database schema
- Test permissions in development environments
