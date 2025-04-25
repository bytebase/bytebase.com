---
title: "How to fix ERROR 2002 (HY000): Can't connect to local MySQL server through socket"
---

## Error Message

When encountering MySQL Error 2002, you'll see a message similar to:

```sql
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)
```

## What It Means

This error occurs when the MySQL client attempts to connect to a local MySQL server using a Unix socket file, but either the MySQL server is not running, the socket file doesn't exist, or the client doesn't have permission to access the socket file.

The socket file is a special file used for local communication between the MySQL client and server on Unix/Linux systems.

## Common Causes

1. **MySQL server is not running**: The MySQL service is stopped or failed to start
2. **Incorrect socket path**: The client is looking for the socket file in a different location than where the server created it
3. **Socket file permissions**: The user doesn't have sufficient permissions to access the socket file
4. **Server configuration**: The socket path in the MySQL configuration doesn't match what the client is using
5. **Operating system issues**: Socket files might have been deleted during system operations
6. **MySQL was installed but not started**: Initial installation without service activation

## How to Fix

### Solution 1: Check if MySQL is Running

First, verify if the MySQL server is actually running:

```bash
# For systemd-based systems (Ubuntu, CentOS 7+, etc.)
sudo systemctl status mysql

# For SysV init systems (older distributions)
sudo service mysql status

# On macOS
brew services list | grep mysql
```

If MySQL is not running, start it:

```bash
# For systemd-based systems
sudo systemctl start mysql

# For SysV init systems
sudo service mysql start

# On macOS
brew services start mysql
```

### Solution 2: Check Socket File Location

Verify the socket file location in your MySQL configuration:

```bash
# Check MySQL configuration
sudo cat /etc/mysql/my.cnf | grep socket

# Or check using MySQL client if you can connect with TCP/IP
mysql -h127.0.0.1 -P3306 -u root -p -e "SHOW VARIABLES LIKE 'socket';"
```

Make sure your client is using the correct socket path:

```bash
# Connect using the explicit socket path
mysql -uroot -p --socket=/path/to/mysql.sock
```

### Solution 3: Fix Socket File Permissions

Check and correct permissions on the socket file:

```bash
# Check socket file permissions
ls -la /var/run/mysqld/mysqld.sock

# Fix permissions if needed
sudo chmod 755 /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld/mysqld.sock
```

### Solution 4: Create Missing Directories

If the socket directory doesn't exist:

```bash
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
sudo chmod 755 /var/run/mysqld
```

### Solution 5: Use TCP/IP Connection Instead

Bypass the socket issue by connecting via TCP/IP:

```bash
mysql -h127.0.0.1 -P3306 -uroot -p
```

### Solution 6: Check for Configuration Mismatches

Ensure client and server configurations are consistent:

```bash
# Edit MySQL client configuration
sudo nano ~/.my.cnf

# Add correct socket path
[client]
socket=/path/to/mysql.sock
```

### Solution 7: Reinstall MySQL Server

If all else fails, consider reinstalling MySQL:

```bash
# For Ubuntu/Debian
sudo apt-get remove --purge mysql*
sudo apt-get install mysql-server

# For CentOS/RHEL
sudo yum remove mysql mysql-server
sudo yum install mysql-server
```

## Cloud Vendor Considerations

When working with cloud environments:

- **AWS RDS**: Socket connections are not used; always use hostname and port
- **Google Cloud SQL**: Requires TCP/IP connections with SSL
- **Azure Database for MySQL**: Socket connections are not supported
- **Docker/Container deployments**: Socket file locations may differ inside containers

For cloud databases, always use TCP/IP connections with the provided hostname and port:

```bash
mysql -h<cloud_endpoint> -P3306 -u<username> -p<password>
```
