---
title: 'ERROR 1045 (42000): Access denied for user (using password: YES)'
---

## Error Message

```sql
ERROR 1045 (42000): Access denied for user 'username'@'hostname' (using password: YES|NO)
```

## Description

This error occurs when a MySQL user attempts to connect to the MySQL server but fails during the authentication process. It indicates that either the credentials provided are incorrect, the user doesn't have connection privileges from the specified host, or there are other authentication-related issues.

## Causes

- Incorrect password provided doesn't match the one stored in MySQL
- The username specified doesn't exist in the MySQL user table
- The user exists but isn't allowed to connect from the current host
- MySQL 8.0+ uses a different default authentication method than older versions
- The user account might be locked after too many failed login attempts
- The password might have expired if password expiration policy is enabled
- MySQL might be running in a safe mode that affects authentication

## Solutions

1. **Verify username and password**:

   ```sql
   -- Try connecting with the mysql client
   mysql -u username -p
   -- Enter password when prompted

   -- If you have admin access, check if the user exists
   SELECT user, host FROM mysql.user WHERE user = 'username';
   ```

2. **Reset user password** (requires administrative access):

   ```sql
   -- MySQL 5.7 and earlier
   SET PASSWORD FOR 'username'@'hostname' = PASSWORD('new_password');

   -- MySQL 8.0+
   ALTER USER 'username'@'hostname' IDENTIFIED BY 'new_password';

   FLUSH PRIVILEGES;
   ```

3. **Check and fix host authorization**:

   ```sql
   -- Check hosts for the user
   SELECT user, host FROM mysql.user WHERE user = 'username';

   -- Create a user entry for the specific host if needed
   CREATE USER 'username'@'your_client_ip' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'your_client_ip';

   FLUSH PRIVILEGES;
   ```

4. **Fix authentication plugin issues** (especially when upgrading to MySQL 8.0+):

   ```sql
   -- Check the authentication plugin used
   SELECT user, host, plugin FROM mysql.user WHERE user = 'username';

   -- Change authentication plugin if needed
   ALTER USER 'username'@'hostname' IDENTIFIED WITH mysql_native_password BY 'password';

   FLUSH PRIVILEGES;
   ```

## Prevention

1. **Maintain secure password practices**:

   - Use strong passwords
   - Change passwords regularly
   - Use a password manager to avoid typos

2. **Document username and host combinations**:

   ```sql
   -- Create specific connection documentation
   -- For example: 'app_user'@'192.168.1.%' vs 'app_user'@'localhost'
   ```

3. **Configure proper authentication plugins** based on client compatibility:

   ```sql
   -- For older clients
   CREATE USER 'username'@'hostname' IDENTIFIED WITH mysql_native_password BY 'password';
   ```

4. **Implement connection pooling** to reduce authentication overhead
