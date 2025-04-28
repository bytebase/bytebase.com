---
title: 'ERROR 1130 (HY000): Host is not allowed to connect'
---

## Error Message

```sql
ERROR 1130 (HY000): Host 'hostname' is not allowed to connect to this MySQL server
```

## Description

This error occurs when a client attempts to connect to a MySQL server from a host that is not authorized in the MySQL user privileges table. MySQL security uses a combination of username and hostname to authenticate connections.

## Causes

- User account has hostname restrictions (configured to connect only from specific hosts)
- Missing wildcard permissions (no '%' wildcard host entry exists for the user)
- Client IP has changed but user privileges haven't been updated
- Hostname cannot be resolved correctly (DNS resolution issues)
- MySQL server configured to not resolve hostnames (`skip-name-resolve` enabled)
- Firewall or security group restrictions blocking access
- Mismatch between how the host is specified and how MySQL interprets it
- Hostname case mismatch in the user table

## Solutions

1. **Create a user with proper host access**:

   ```sql
   -- Allow user to connect from anywhere
   CREATE USER 'username'@'%' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'%';

   -- Allow user to connect from a specific IP
   CREATE USER 'username'@'192.168.1.100' IDENTIFIED BY 'password';

   FLUSH PRIVILEGES;
   ```

2. **Update existing user's host access**:

   ```sql
   -- Check current user definitions
   SELECT User, Host FROM mysql.user WHERE User = 'username';

   -- Add new host access for existing user
   GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'new-host';

   FLUSH PRIVILEGES;
   ```

3. **Configure MySQL to allow remote connections**:

   ```ini
   # Edit my.cnf or my.ini
   [mysqld]
   # Comment out or change to your server's IP
   # bind-address = 127.0.0.1
   bind-address = 0.0.0.0  # Listen on all interfaces
   ```

4. **Use IP addresses instead of hostnames** if `skip-name-resolve` is enabled:

   ```sql
   -- Check if skip-name-resolve is enabled
   SHOW VARIABLES LIKE 'skip_name_resolve';

   -- Use IP addresses in user creation
   CREATE USER 'username'@'192.168.1.100' IDENTIFIED BY 'password';
   ```

## Prevention

1. **Create users with appropriate host specifications**:

   - Use '%' for users that need to connect from anywhere
   - Use specific IPs for users with restricted access

2. **Verify hostname resolution**:

   ```bash
   # Test forward DNS resolution
   host client-hostname

   # Test reverse DNS resolution
   host client-ip-address
   ```

3. **Monitor user connections**:

   ```sql
   -- View current connections
   SHOW PROCESSLIST;
   ```

4. **Document user access patterns** to maintain proper host permissions when IPs change
