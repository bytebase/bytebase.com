---
title: 'How to fix Error Code: 2013. Lost connection to MySQL server during query'
---

## Error Message

When encountering MySQL Error 2013, you'll see a message similar to:

```sql
Error Code: 2013. Lost connection to MySQL server during query
```

## What It Means

This error occurs when an established connection between the client and MySQL server is unexpectedly terminated during query execution. The connection could be lost due to network issues, server timeouts, or the server being overloaded.

## Common Causes

1. **Network instability**: Temporary network disruptions between client and server
2. **Query timeout**: Long-running queries exceeding timeout settings
3. **Server-side issues**: MySQL server crash, restart, or resource exhaustion
4. **Insufficient buffer sizes**: `max_allowed_packet` or other buffer settings too small
5. **Firewall interruptions**: Firewall or security software terminating idle connections
6. **Memory limitations**: Server runs out of memory while processing large queries
7. **Connection timeout**: Client connection idle for too long

## How to Fix

### Solution 1: Increase Timeout Settings

Modify the timeout settings in the MySQL configuration:

```sql
-- Check current timeout values
SHOW VARIABLES LIKE '%timeout%';
SHOW VARIABLES LIKE '%wait_timeout%';
SHOW VARIABLES LIKE '%interactive_timeout%';

-- Set longer timeout values (server-side)
SET GLOBAL net_read_timeout = 600;
SET GLOBAL net_write_timeout = 600;
SET GLOBAL wait_timeout = 28800;
SET GLOBAL interactive_timeout = 28800;
```

Make these changes permanent in the MySQL configuration file (my.cnf):

```ini
[mysqld]
net_read_timeout = 600
net_write_timeout = 600
wait_timeout = 28800
interactive_timeout = 28800
```

### Solution 2: Increase Buffer Size

Increase the maximum allowed packet size:

```sql
-- Check current packet size
SHOW VARIABLES LIKE 'max_allowed_packet';

-- Increase packet size
SET GLOBAL max_allowed_packet = 1073741824; -- 1GB
```

Update my.cnf for persistence:

```ini
[mysqld]
max_allowed_packet = 1G
```

### Solution 3: Optimize Long-Running Queries

Identify and optimize problematic queries:

```sql
-- Add proper indexing
CREATE INDEX idx_column_name ON table_name(column_name);

-- Break large transactions into smaller ones
-- Instead of updating 1 million rows at once, do batches of 10,000
```

### Solution 4: Implement Connection Pooling

Use connection pooling in your application to manage connections more efficiently:

- **Java**: HikariCP, C3P0, or DBCP
- **PHP**: PDO persistent connections
- **Node.js**: mysql2 with connection pooling
- **Python**: SQLAlchemy with connection pooling

### Solution 5: Network Configuration

Check and improve network stability:

```bash
# Test network stability
ping mysql-host

# Check for packet loss
traceroute mysql-host

# Increase TCP keepalive settings on client
echo 60 > /proc/sys/net/ipv4/tcp_keepalive_time
```

### Solution 6: Configure Persistent Connections

Add keepalive settings to your MySQL client:

```ini
[client]
# For the mysql command-line client
reconnect = 1
```

For application code, implement reconnection logic and proper error handling.

### Solution 7: Monitor and Increase Server Resources

If the server is resource-constrained:

```sql
-- Check for high memory usage and running processes
SHOW PROCESSLIST;
```

Consider increasing:

- Server RAM allocation
- CPU resources
- Swap space
- InnoDB buffer pool size

## Cloud Vendor Considerations

When using cloud-based MySQL services:

- **AWS RDS**: Check and adjust Parameter Groups for timeout settings
- **Google Cloud SQL**: Configure database flags for connection parameters
- **Azure Database for MySQL**: Adjust server parameters in the Azure portal
- **Amazon Aurora**: Check for cluster failovers that might interrupt connections

For long-running operations in cloud environments, consider:

- Using maintenance windows for large operations
- Implementing retry logic in applications
- Taking advantage of vendor-specific proxy services (e.g., Amazon RDS Proxy)
- Monitoring connection metrics in the cloud provider's dashboard
