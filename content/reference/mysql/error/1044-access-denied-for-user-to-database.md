---
title: 'ERROR 1044 (42000): Access denied for user to database'
---

## Error Message

```sql
ERROR 1044: Access denied for user 'username'@'hostname' to database 'database_name'
```

## Description

This error occurs when a MySQL user attempts to access a database but lacks the necessary privileges. The user can successfully authenticate with the MySQL server but doesn't have permission to use the specified database.

## Causes

- The user hasn't been granted access to the database
- The user hasn't been granted WITH GRANT OPTION to grant permissions to other users
- The user is connecting from an unauthorized host
- Attempting to access a non-existent database (also shows as an access denied error)
- Database name case mismatch in MySQL on case-sensitive file systems
- Incompatibility between the client and server authentication methods

## Solutions

1. **Grant database access privileges**:

   ```sql
   -- Grant all privileges on the database
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'hostname';

   -- Or grant specific privileges
   GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'username'@'hostname';

   -- Don't forget to apply the changes
   FLUSH PRIVILEGES;
   ```

2. **Verify database existence**:

   ```sql
   -- List all databases
   SHOW DATABASES;

   -- Create the database if it doesn't exist
   CREATE DATABASE IF NOT EXISTS database_name;
   ```

3. **Check and fix user host configuration**:

   ```sql
   -- Check existing users and their hosts
   SELECT user, host FROM mysql.user WHERE user = 'username';

   -- Create user with correct hostname if needed
   CREATE USER 'username'@'hostname' IDENTIFIED BY 'password';

   -- Grant privileges to the new user
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'hostname';
   FLUSH PRIVILEGES;
   ```

4. **Use wildcard host to allow connections from any host**:

   ```sql
   -- Create user that can connect from anywhere
   CREATE USER 'username'@'%' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'%';
   FLUSH PRIVILEGES;
   ```

## Prevention

1. **Document database access requirements** for each application

2. **Create users with appropriate permissions** during database setup:

   ```sql
   -- Create application-specific users with least privilege
   CREATE USER 'app_user'@'%' IDENTIFIED BY 'secure_password';
   GRANT SELECT, INSERT, UPDATE ON app_database.* TO 'app_user'@'%';
   ```

3. **Perform regular privilege audits**:

   ```sql
   -- List all privileges for a specific user
   SHOW GRANTS FOR 'username'@'hostname';
   ```

4. **Follow the principle of least privilege** when granting database access
