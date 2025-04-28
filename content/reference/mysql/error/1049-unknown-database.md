---
title: 'ERROR 1049 (42000): Unknown Database'
---

## Error Message

```sql
ERROR 1049 (42000): Unknown database 'database_name'
```

## Description

This error occurs when you attempt to connect to or use a MySQL database that doesn't exist on the server. MySQL can't find the specified database name in its system catalogs.

## Causes

- Typos in the database name (remember MySQL is case-sensitive on some systems)
- The database hasn't been created yet
- The database existed previously but was deleted
- Using incorrect case on case-sensitive file systems
- Attempting to access a database on the wrong MySQL instance
- Special characters in database names not properly encoded
- The user may not have SHOW DATABASES privilege to see the database

## Solutions

1. **Verify available databases**:

   ```sql
   -- List all databases you have access to
   SHOW DATABASES;

   -- Check databases inside a Docker container
   docker exec -it mysql_container mysql -u root -p -e "SHOW DATABASES;"
   ```

2. **Create the database if it doesn't exist**:

   ```sql
   -- Create the database
   CREATE DATABASE database_name;

   -- Or with specific character set and collation
   CREATE DATABASE database_name
   CHARACTER SET utf8mb4
   COLLATE utf8mb4_unicode_ci;

   -- Create only if it doesn't exist (MySQL 5.7+)
   CREATE DATABASE IF NOT EXISTS database_name;
   ```

3. **Check connection settings**:

   ```sql
   -- Connect with explicit database name
   mysql -u username -p -h hostname database_name
   ```

4. **Check user privileges**:

   ```sql
   -- View privileges for the current user
   SHOW GRANTS;

   -- Grant privileges for the database to the user
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'hostname';
   FLUSH PRIVILEGES;
   ```

## Prevention

1. **Use standard naming conventions** for databases:

   - Avoid special characters
   - Consider using lowercase names to avoid case sensitivity issues
   - Document database names

2. **Create databases with IF NOT EXISTS**:

   ```sql
   CREATE DATABASE IF NOT EXISTS database_name;
   ```

3. **Check database existence** in application code before attempting connections

4. **Implement database creation** in deployment scripts or migrations
