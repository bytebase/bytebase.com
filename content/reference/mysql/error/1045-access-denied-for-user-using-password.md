---
title: "How to fix ERROR 1045 (42000): Access denied for user 'username'@'hostname' (using password: YES)"
---

## Error Message

When encountering MySQL Error 1045, you'll see a message similar to:

```sql
ERROR 1045 (42000): Access denied for user 'username'@'hostname' (using password: YES|NO)
```

## What It Means

This error occurs when a MySQL user attempts to connect to the MySQL server but fails during the authentication process.

The error indicates that either the credentials provided are incorrect, the user doesn't have connection privileges from the specified host, or there are other authentication-related issues preventing the connection.

## Common Causes

1. **Incorrect password**: The most common cause - the password provided doesn't match the one stored in MySQL
2. **User doesn't exist**: The username specified doesn't exist in the MySQL user table
3. **Host restriction**: The user exists but isn't allowed to connect from the current host
4. **Authentication plugin issues**: MySQL 8.0+ uses a different default authentication method than older versions
5. **Account is locked**: The user account might be locked after too many failed login attempts
6. **Password expiration**: The password might have expired if password expiration policy is enabled
7. **Skip-grant-tables mode**: MySQL might be running in a safe mode that affects authentication

## How to Fix

### Solution 1: Verify Username and Password

First, make sure you're using the correct credentials:

```sql
-- Try connecting with the mysql client
mysql -u username -p
-- Enter password when prompted
```

If you have access to another admin account, check if the user exists:

```sql
-- Check if the user exists with the correct host
SELECT user, host FROM mysql.user WHERE user = 'username';
```

### Solution 2: Reset User Password

If you have administrative access, reset the user's password:

```sql
-- MySQL 5.7 and earlier
SET PASSWORD FOR 'username'@'hostname' = PASSWORD('new_password');

-- MySQL 8.0+
ALTER USER 'username'@'hostname' IDENTIFIED BY 'new_password';

FLUSH PRIVILEGES;
```

### Solution 3: Check and Fix Host Authorization

Make sure the user is allowed to connect from your current host:

```sql
-- Check hosts for the user
SELECT user, host FROM mysql.user WHERE user = 'username';

-- Create a new user entry for the specific host if needed
CREATE USER 'username'@'your_client_ip' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'your_client_ip';

-- Or create a wildcard host entry
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'%';

FLUSH PRIVILEGES;
```

### Solution 4: Fix Authentication Plugin Issues

Address authentication plugin incompatibilities (especially when upgrading to MySQL 8.0+):

```sql
-- Check the authentication plugin used
SELECT user, host, plugin FROM mysql.user WHERE user = 'username';

-- Change authentication plugin if needed (for MySQL 8.0+)
ALTER USER 'username'@'hostname' IDENTIFIED WITH mysql_native_password BY 'password';

FLUSH PRIVILEGES;
```

### Solution 5: Unlock Account and Reset Failed Login Attempts

If the account is locked due to too many failed attempts:

```sql
-- Check if account is locked
SELECT user, host, account_locked FROM mysql.user WHERE user = 'username';

-- Unlock the account
ALTER USER 'username'@'hostname' ACCOUNT UNLOCK;

-- Reset password failed login count (MySQL 8.0+)
ALTER USER 'username'@'hostname' FAILED_LOGIN_ATTEMPTS 0;

FLUSH PRIVILEGES;
```

### Solution 6: MySQL Emergency Access

If all else fails and you need emergency root access:

1. Stop the MySQL server
2. Start MySQL with skip-grant-tables option:

```bash
mysqld_safe --skip-grant-tables --skip-networking &
```

3. Connect without password:

```bash
mysql -u root
```

4. Reset the password:

```sql
-- MySQL 5.7 and earlier
UPDATE mysql.user SET authentication_string = PASSWORD('new_password') WHERE user = 'root' AND host = 'localhost';

-- MySQL 8.0+
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';

FLUSH PRIVILEGES;
```

5. Restart MySQL normally

## Special Cases for Common Environments

### Local Development

For local development, try connecting with socket instead of TCP/IP:

```bash
mysql -u username -p --socket=/path/to/mysql.sock
```

### Docker Containers

For Docker, ensure networking is properly configured:

```bash
# Check if MySQL is listening on all interfaces
docker exec -it mysql_container netstat -tln
```

### Remote Servers

For remote connections, check firewall and MySQL configuration:

```sql
-- Check if MySQL is allowing remote connections
SHOW VARIABLES LIKE 'bind_address';
```

### Cloud Databases

For cloud databases:

- Check network/firewall rules (security groups, VPC settings)
- Verify connection strings include proper region/zone information
- Use IAM authentication where available (AWS RDS, GCP Cloud SQL)
