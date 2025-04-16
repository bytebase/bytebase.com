---
title: 'How to fix ERROR 1142 (42000): command denied to user'
---

## Error Message

When encountering MySQL Error 1142, you'll see a message similar to:

```sql
ERROR 1142 (42000): command denied to user 'username'@'hostname' for table 'table_name'
```

## What It Means

This error occurs when a MySQL user attempts to execute a command (like SELECT, INSERT, UPDATE, etc.) on a table but lacks the necessary privileges for that specific operation.

The error indicates that while the user can successfully authenticate with the MySQL server and access the database, they don't have permission to perform the particular command on the specified table.

## Common Causes

1. **Insufficient privileges**: The user has been granted access to the database but not the specific command privileges needed
2. **Partial permissions**: The user may have some privileges (like SELECT) but not others (like INSERT or UPDATE)
3. **Table-level restrictions**: The user might have database-level permissions but not table-specific permissions
4. **Role limitations**: In newer MySQL versions, role-based access control might be limiting specific commands
5. **Object ownership issues**: The user doesn't own the object they're trying to modify
6. **MySQL privilege caching**: Changes to privileges haven't been flushed properly

## How to Fix

### Solution 1: Grant Specific Command Privileges

If you have administrative privileges, grant the user the specific permissions needed:

```sql
-- Grant specific command privileges on the table
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.table_name TO 'username'@'hostname';

-- For all tables in the database
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'username'@'hostname';

-- Don't forget to apply the changes
FLUSH PRIVILEGES;
```

### Solution 2: Check Current Privileges

Examine what privileges the user currently has:

```sql
-- Show grants for current user
SHOW GRANTS;

-- Show grants for specific user
SHOW GRANTS FOR 'username'@'hostname';
```

### Solution 3: Grant All Privileges (if appropriate)

For development environments or when full access is needed:

```sql
-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'hostname';
FLUSH PRIVILEGES;
```

### Solution 4: Fix Specific Command Privileges

Grant only the specific command privileges that are needed:

```sql
-- For SELECT privileges only
GRANT SELECT ON database_name.table_name TO 'username'@'hostname';

-- For data modification privileges
GRANT INSERT, UPDATE, DELETE ON database_name.table_name TO 'username'@'hostname';

-- For structure modification privileges
GRANT ALTER, CREATE, DROP ON database_name.table_name TO 'username'@'hostname';

FLUSH PRIVILEGES;
```

### Solution 5: Use WITH GRANT OPTION for Delegation

If the user needs to grant privileges to other users:

```sql
-- Allow the user to grant their privileges to others
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'username'@'hostname' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

### Solution 6: Check for MySQL Version-Specific Issues

In MySQL 8.0+, check role assignments:

```sql
-- View assigned roles
SHOW GRANTS;

-- Activate all assigned roles
SET ROLE ALL;

-- Grant a role with necessary privileges
GRANT 'role_name' TO 'username'@'hostname';
```

## Cloud Vendor Limitations

Many cloud database services restrict superuser privileges:

- **AWS RDS**: The root user lacks certain privileges like `SUPER`, `FILE`, and cannot modify system tables
- **Azure Database for MySQL**: Root account limitations on global grants and system schema modifications
- **Google Cloud SQL**: Unable to grant `SUPER`, `PROCESS`, `FILE` privileges
- **DigitalOcean Managed Databases**: Limited ability to modify `performance_schema` and system variables

For cloud environments, use service-specific privilege management:

- AWS: Parameter groups and option groups
- Azure: Server parameters
- GCP: Database flags
