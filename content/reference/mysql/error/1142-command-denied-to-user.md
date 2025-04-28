---
title: 'ERROR 1142 (42000): Command denied to user'
---

## Error Message

```sql
ERROR 1142 (42000): command denied to user 'username'@'hostname' for table 'table_name'
```

## Description

This error occurs when a MySQL user attempts to execute a command (like SELECT, INSERT, UPDATE, etc.) on a table but lacks the necessary privileges for that specific operation.

## Causes

- Insufficient privileges (user has access to the database but not specific command privileges)
- Partial permissions (user may have some privileges like SELECT but not others like INSERT)
- Table-level restrictions (user has database-level permissions but not table-specific permissions)
- Role limitations in newer MySQL versions (role-based access control might be limiting commands)
- Object ownership issues (user doesn't own the object they're trying to modify)
- MySQL privilege caching (changes to privileges haven't been flushed properly)

## Solutions

1. **Grant specific command privileges**:

   ```sql
   -- Grant specific command privileges on the table
   GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.table_name TO 'username'@'hostname';

   -- For all tables in the database
   GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'username'@'hostname';

   -- Don't forget to apply the changes
   FLUSH PRIVILEGES;
   ```

2. **Check current privileges**:

   ```sql
   -- Show grants for current user
   SHOW GRANTS;

   -- Show grants for specific user
   SHOW GRANTS FOR 'username'@'hostname';
   ```

3. **Grant all privileges** (if appropriate for development environments):

   ```sql
   -- Grant all privileges on the database
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'hostname';
   FLUSH PRIVILEGES;
   ```

4. **Use WITH GRANT OPTION for delegation**:

   ```sql
   -- Allow the user to grant their privileges to others
   GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'username'@'hostname' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   ```

## Prevention

1. **Implement proper user privilege planning**:

   - Document required privileges for each application or service
   - Use principle of least privilege

2. **Create role-based access models** (for MySQL 8.0+):

   ```sql
   -- Create a role with specific privileges
   CREATE ROLE 'app_read_role';
   GRANT SELECT ON app_db.* TO 'app_read_role';

   -- Assign the role to users
   GRANT 'app_read_role' TO 'username'@'hostname';
   ```

3. **Regularly audit user privileges**:

   ```sql
   -- Review all user privileges
   SELECT * FROM mysql.user;
   SELECT * FROM information_schema.user_privileges;
   ```

4. **Always flush privileges** after making privilege changes
