---
title: 'ERROR 1396 (HY000): Operation xxx failed for user'
---

## Error Message

```sql
ERROR 1396 (HY000): Operation CREATE USER failed for 'username'@'hostname'
```

Or variations such as:

```sql
ERROR 1396 (HY000): Operation DROP USER failed for 'username'@'hostname'
ERROR 1396 (HY000): Operation GRANT failed for 'username'@'hostname'
```

## Description

This error occurs when trying to perform a user management operation (such as CREATE USER, DROP USER, or GRANT) on a MySQL user that either already exists (for CREATE) or doesn't exist (for DROP or GRANT). It indicates a mismatch between the expected and actual state of the user account.

## Causes

- Attempting to create a user that already exists in the database
- Trying to modify or drop a user that doesn't exist
- Using a different hostname specification than what's in the database
- Inconsistent case usage in usernames or hostnames
- The user exists but with different connection parameters
- Stale privilege information not properly flushed
- User exists on master but not on replica

## Solutions

1. **Check if user exists before operations**:

   ```sql
   -- Check if a user exists
   SELECT User, Host FROM mysql.user WHERE User = 'username' AND Host = 'hostname';
   ```

2. **Use IF EXISTS or IF NOT EXISTS clauses**:

   ```sql
   -- Creating users
   CREATE USER IF NOT EXISTS 'username'@'hostname' IDENTIFIED BY 'password';

   -- Dropping users
   DROP USER IF EXISTS 'username'@'hostname';
   ```

3. **Correct user specification**:

   ```sql
   -- List all instances of the user with different hosts
   SELECT User, Host FROM mysql.user WHERE User = 'username';

   -- Then use the exact user and host combination
   DROP USER 'username'@'192.168.1.%';  -- Instead of 'username'@'%'
   ```

4. **Use FLUSH PRIVILEGES after manual changes**:

   ```sql
   -- After direct modifications to mysql tables
   FLUSH PRIVILEGES;
   ```

## Prevention

1. **Always use IF EXISTS/IF NOT EXISTS clauses** when managing users

2. **Check for user existence** before operations:

   ```sql
   SELECT EXISTS(SELECT 1 FROM mysql.user
                WHERE User = 'username' AND Host = 'hostname') AS user_exists;
   ```

3. **Document user creation scripts** with exact specifications

4. **Use consistent host specifications** across your database administration tools
