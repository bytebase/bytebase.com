---
title: "How to fix ERROR 2003 (HY000): Can't connect to MySQL server on '[host]'"
---

## Error Message

When encountering MySQL Error 2003, you'll see a message similar to:

```sql
ERROR 2003 (HY000): Can't connect to MySQL server on 'hostname' (110)
```

The number in parentheses at the end (e.g., 110) is the system error code, which can provide additional information about the connection failure.

## What It Means

This error indicates that the MySQL client is unable to establish a TCP/IP connection to the MySQL server at the specified host. The connection attempt fails before any communication with the MySQL server can take place, suggesting network connectivity issues, firewall restrictions, or server unavailability.

## Common Causes

1. **MySQL server is not running**: The server is stopped or crashed
2. **Incorrect hostname or IP address**: The host specified doesn't exist or is misspelled
3. **Wrong port number**: The client is trying to connect to the wrong port
4. **Firewall blocking**: Network firewall blocking MySQL port (default 3306)
5. **MySQL configured to listen on localhost only**: Binding to 127.0.0.1 instead of all interfaces
6. **Network connectivity issues**: Network path problems between client and server
7. **MySQL server load**: Server too busy to accept new connections
8. **Security groups or network ACLs**: In cloud environments, misconfigured security settings

## How to Fix

### Solution 1: Verify MySQL Server Status

Check if the MySQL server is running:

```bash
# For systemd-based systems
sudo systemctl status mysql

# For older init systems
sudo service mysql status

# For Windows
sc query mysql
```

If it's not running, start it:

```bash
# For systemd-based systems
sudo systemctl start mysql

# For older init systems
sudo service mysql start

# For Windows
net start mysql
```

### Solution 2: Check MySQL Server Binding

Verify which interfaces MySQL is listening on:

```bash
sudo netstat -tlnp | grep mysql
# or
sudo ss -tlnp | grep mysql
```

If MySQL is only listening on 127.0.0.1, modify the configuration file (my.cnf or my.ini):

```ini
[mysqld]
# Comment out or change the following line
# bind-address = 127.0.0.1
# To listen on all interfaces:
bind-address = 0.0.0.0
```

Restart MySQL after changing the configuration:

```bash
sudo systemctl restart mysql
```

### Solution 3: Check Firewall Settings

Verify and adjust firewall rules:

```bash
# For UFW (Ubuntu)
sudo ufw status
sudo ufw allow 3306/tcp

# For iptables
sudo iptables -L -n
sudo iptables -A INPUT -p tcp --dport 3306 -j ACCEPT
sudo iptables-save

# For firewalld (CentOS/RHEL)
sudo firewall-cmd --list-all
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload
```

For Windows Firewall:

- Open Windows Defender Firewall
- Select "Advanced settings"
- Create a new inbound rule for port 3306

### Solution 4: Verify Network Connectivity

Test basic connectivity to the server:

```bash
# Test if the host is reachable
ping mysql-host

# Test if the MySQL port is open
telnet mysql-host 3306
# or
nc -zv mysql-host 3306
```

### Solution 5: Grant Remote Access Permissions

Ensure the MySQL user has permissions to connect from the client host:

```sql
-- Allow connections from specific IP
CREATE USER 'username'@'client_ip' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'client_ip';

-- Allow connections from any host
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'%';

FLUSH PRIVILEGES;
```

### Solution 6: Check DNS and Hostname Resolution

Ensure the hostname resolves correctly:

```bash
# Check hostname resolution
nslookup mysql-host
host mysql-host

# Try connecting with IP address directly instead of hostname
mysql -u username -p -h 192.168.1.x
```

### Solution 7: Adjust MySQL Max Connections

If the server has reached its connection limit:

```sql
-- Check current max connections
SHOW VARIABLES LIKE 'max_connections';

-- Increase max connections
SET GLOBAL max_connections = 200;
```

Make this change permanent in my.cnf:

```ini
[mysqld]
max_connections = 200
```

## Cloud Vendor Considerations

For MySQL instances on cloud platforms:

- **AWS RDS/Aurora**:

  - Check Security Groups inbound rules
  - Verify publicly accessible setting if connecting from outside VPC
  - Check subnet routing and Network ACLs

- **Google Cloud SQL**:

  - Verify authorized networks in instance settings
  - Check if private IP is being used and VPC peering/Service Networking is set up
  - For public IP access, ensure your client IP is in the allowed list

- **Azure Database for MySQL**:

  - Check firewall rules in the Azure portal
  - Verify virtual network service endpoints if using private connectivity
  - Ensure SSL requirements are met if SSL is enforced

- **Digital Ocean, Linode, other VPS providers**:
  - Check cloud firewall settings
  - Verify network policies
  - Check if the managed MySQL service has specific access control mechanisms
