---
title: 'How to fix ERROR 1049 (42000): Unknown Database'
---

## Error Message

When encountering MySQL Error 1049, you'll see a message similar to:

```sql
ERROR 1049 (42000): Unknown database 'database_name'
```

## What It Means

This error occurs when you attempt to connect to or use a MySQL database that doesn't exist on the server. MySQL can't find the specified database name in its system catalogs.

The error indicates that either the database name was misspelled, the database hasn't been created yet, or the database was deleted.

## Common Causes

1. **Misspelled database name**: Typos in the database name (remember MySQL is case-sensitive on some systems)
2. **Database doesn't exist**: The database hasn't been created yet
3. **Database was dropped**: The database existed previously but was deleted
4. **Case sensitivity issues**: Using incorrect case on case-sensitive file systems
5. **Connecting to wrong server**: Attempting to access a database on the wrong MySQL instance
6. **Character set problems**: Special characters in database names not properly encoded
7. **Insufficient privileges**: The user may not have SHOW DATABASES privilege to see the database

## How to Fix

### Solution 1: Verify Available Databases

First, check which databases are actually available on your MySQL server:

```sql
-- List all databases you have access to
SHOW DATABASES;

-- Check databases inside a Docker container
docker exec -it mysql_container mysql -u root -p -e "SHOW DATABASES;"
```

Verify if your database is in the list and check for any spelling or case differences.

### Solution 2: Create the Database

If the database doesn't exist, create it:

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

### Solution 3: Check Connection Settings

Verify your connection parameters:

```sql
-- Connect with explicit database name
mysql -u username -p -h hostname database_name
```

For configuration files, check that the database name is correct:

```ini
# Example my.cnf or my.ini database specification
[client]
database=database_name
```

### Solution 4: Check User Privileges

Make sure the user has sufficient privileges:

```sql
-- View privileges for the current user
SHOW GRANTS;

-- Grant privileges for the database to the user
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'hostname';
FLUSH PRIVILEGES;
```

### Solution 5: Fix Database Name Case Sensitivity

On case-sensitive systems, ensure you're using the correct case:

```sql
-- Create a new database with the exact case needed
CREATE DATABASE ExactCaseDatabaseName;

-- Or rename an existing database to match your code
-- (requires copying data, as MySQL doesn't have a direct RENAME DATABASE)
```
