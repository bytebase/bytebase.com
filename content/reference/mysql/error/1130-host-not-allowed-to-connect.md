---
title: 'How to fix Error 1130 (HY000): Host is not allowed to connect'
---

## Error Message

When encountering MySQL Error 1130, you'll see a message similar to:

```sql
ERROR 1130 (HY000): Host 'hostname' is not allowed to connect to this MySQL server
```

## What It Means

This error occurs when a client attempts to connect to a MySQL server from a host that is not authorized in the MySQL user privileges table. MySQL security uses a combination of username and hostname to authenticate connections. If there's no matching entry in the user privileges for your specific hostname or IP address, the connection is rejected even if the username and password are correct.

## Common Causes

1. **User account hostname restrictions**: The MySQL user is configured to connect only from specific hosts
2. **Missing wildcard permissions**: No '%' wildcard host entry exists for the user
3. **IP address changes**: Client IP has changed but user privileges haven't been updated
4. **DNS resolution issues**: Hostname cannot be resolved correctly
5. **Skip-name-resolve enabled**: MySQL server configured to not resolve hostnames
6. **Network access control**: Firewall or security group restrictions
7. **Incorrect host specification**: Mismatch between how the host is specified and how MySQL interprets it
8. **Case sensitivity**: Hostname case mismatch in the user table

## How to Fix

### Solution 1: Create a User with Proper Host Access

Create a new user account with appropriate host access permissions:

```sql
-- Allow user to connect from anywhere
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'%';

-- Allow user to connect from a specific IP
CREATE USER 'username'@'192.168.1.100' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'192.168.1.100';

-- Allow user to connect from a subnet
CREATE USER 'username'@'192.168.1.%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'192.168.1.%';

FLUSH PRIVILEGES;
```

### Solution 2: Update Existing User's Host Access

Modify an existing user to change or add host access:

```sql
-- First, check current user definitions
SELECT User, Host FROM mysql.user WHERE User = 'username';

-- Add new host access for existing user
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'new-host';

-- Or replace existing host permissions (8.0+)
ALTER USER 'username'@'old-host' RENAME TO 'username'@'new-host';

FLUSH PRIVILEGES;
```

### Solution 3: Configure MySQL to Allow Remote Connections

Ensure MySQL is configured to accept remote connections:

```ini
# Edit my.cnf or my.ini
[mysqld]
# Comment out or change to your server's IP
# bind-address = 127.0.0.1
bind-address = 0.0.0.0  # Listen on all interfaces

# Then restart MySQL
```

### Solution 4: Fix Skip-Name-Resolve Issues

If MySQL has skip-name-resolve enabled, you must use IP addresses instead of hostnames:

```sql
-- Check if skip-name-resolve is enabled
SHOW VARIABLES LIKE 'skip_name_resolve';

-- If enabled (value is ON), use IP addresses in user creation
CREATE USER 'username'@'192.168.1.100' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'192.168.1.100';

FLUSH PRIVILEGES;
```

### Solution 5: Check and Fix DNS Resolution

Ensure DNS resolution works correctly in both directions:

```bash
# Test forward DNS resolution
host client-hostname

# Test reverse DNS resolution
host client-ip-address

# If DNS resolution is problematic, add entries to /etc/hosts
echo "192.168.1.100 client-hostname" >> /etc/hosts
```

### Solution 6: Check Network and Firewall Settings

Verify network access and adjust firewall rules:

```bash
# Test network connectivity
telnet mysql-server-ip 3306

# Check firewall status
sudo iptables -L | grep 3306

# Add firewall rule if needed
sudo iptables -A INPUT -p tcp --dport 3306 -j ACCEPT
sudo iptables-save

# For UFW on Ubuntu
sudo ufw allow 3306/tcp
```

### Solution 7: Use Anonymous-User Workaround

As a temporary workaround (not recommended for production):

```sql
-- Create anonymous user with access from problem host
CREATE USER ''@'problem-host';
GRANT USAGE ON *.* TO ''@'problem-host';

FLUSH PRIVILEGES;
```

## Cloud Vendor Considerations

When dealing with cloud-based MySQL instances:

- **AWS RDS/Aurora**:

  - Configure Security Groups to allow traffic from your IP
  - Use Parameter Groups to configure skip-name-resolve
  - Check VPC network ACLs

- **Google Cloud SQL**:

  - Configure "Authorized Networks" in instance settings
  - Use Cloud SQL Proxy for secure connections
  - Set up Private IP for VPC-only access

- **Azure Database for MySQL**:
  - Configure Firewall rules in Azure Portal
  - Use Connection Security settings
  - Consider Virtual Network service endpoints

For cloud environments, consider these practices:

1. Use static IP addresses for connecting applications when possible
2. Implement a bastion host or VPN for secure access
3. Use connection proxies provided by the cloud vendor
4. Document IP ranges that need access to the database
5. For dynamic IP scenarios, implement automated user management scripts to update permissions
