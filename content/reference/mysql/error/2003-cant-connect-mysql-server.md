---
title: "ERROR 2003 (HY000): Can't connect to MySQL server on '[host]'"
---

## Error Message

```sql
ERROR 2003 (HY000): Can't connect to MySQL server on 'hostname' (110)
```

## Description

This error indicates that the MySQL client is unable to establish a TCP/IP connection to the MySQL server at the specified host. The connection attempt fails before any communication with the MySQL server can take place, suggesting network connectivity issues, firewall restrictions, or server unavailability.

## Causes

- The MySQL server is stopped or crashed
- The host specified doesn't exist or is misspelled
- The client is trying to connect to the wrong port
- Network firewall blocking MySQL port (default 3306)
- MySQL configured to listen on localhost only (binding to 127.0.0.1)
- Network path problems between client and server
- Server too busy to accept new connections
- In cloud environments, misconfigured security settings

## Solutions

1. **Verify MySQL server status**:

   ```bash
   # For systemd-based systems
   sudo systemctl status mysql

   # For older init systems
   sudo service mysql status

   # Start if not running
   sudo systemctl start mysql
   ```

2. **Check MySQL server binding**:

   ```bash
   sudo netstat -tlnp | grep mysql
   # or
   sudo ss -tlnp | grep mysql
   ```

   If MySQL is only listening on 127.0.0.1, modify the configuration file (my.cnf):

   ```ini
   [mysqld]
   # Comment out or change the following line
   # bind-address = 127.0.0.1
   # To listen on all interfaces:
   bind-address = 0.0.0.0
   ```

3. **Check firewall settings**:

   ```bash
   # For UFW (Ubuntu)
   sudo ufw status
   sudo ufw allow 3306/tcp

   # For iptables
   sudo iptables -L -n
   sudo iptables -A INPUT -p tcp --dport 3306 -j ACCEPT
   ```

4. **Verify network connectivity**:

   ```bash
   # Test if the host is reachable
   ping mysql-host

   # Test if the MySQL port is open
   telnet mysql-host 3306
   # or
   nc -zv mysql-host 3306
   ```

## Prevention

1. **Configure MySQL to automatically start** after system reboot:

   ```bash
   sudo systemctl enable mysql
   ```

2. **Set up monitoring** to alert on MySQL service status changes

3. **Document connection settings** for all environments:

   ```
   Production MySQL: hostname=db.example.com, port=3306
   Staging MySQL: hostname=staging-db.example.com, port=3306
   ```

4. **Use connection pooling** to maintain persistent connections

5. **Configure firewall rules** properly in production environments
