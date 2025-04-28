---
title: 'ERROR 2013 (HY000): Lost connection to MySQL server during query'
---

## Error Message

```sql
Error Code: 2013. Lost connection to MySQL server during query
```

## Description

This error occurs when an established connection between the client and MySQL server is unexpectedly terminated during query execution. The connection could be lost due to network issues, server timeouts, or the server being overloaded.

## Causes

- Temporary network disruptions between client and server
- Long-running queries exceeding timeout settings
- MySQL server crash, restart, or resource exhaustion
- `max_allowed_packet` or other buffer settings too small
- Firewall or security software terminating idle connections
- Server runs out of memory while processing large queries
- Client connection idle for too long

## Solutions

1. **Increase timeout settings**:

   ```sql
   -- Check current timeout values
   SHOW VARIABLES LIKE '%timeout%';
   SHOW VARIABLES LIKE '%wait_timeout%';

   -- Set longer timeout values
   SET GLOBAL net_read_timeout = 600;
   SET GLOBAL net_write_timeout = 600;
   SET GLOBAL wait_timeout = 28800;
   ```

   Make changes permanent in the MySQL configuration file (my.cnf):

   ```ini
   [mysqld]
   net_read_timeout = 600
   net_write_timeout = 600
   wait_timeout = 28800
   ```

2. **Increase buffer size**:

   ```sql
   -- Check current packet size
   SHOW VARIABLES LIKE 'max_allowed_packet';

   -- Increase packet size
   SET GLOBAL max_allowed_packet = 1073741824; -- 1GB
   ```

3. **Optimize long-running queries**:

   ```sql
   -- Add proper indexing
   CREATE INDEX idx_column_name ON table_name(column_name);

   -- Break large transactions into smaller ones
   ```

4. **Implement connection pooling** in your application:
   - Use connection pooling libraries appropriate for your language
   - Configure proper retry logic

## Prevention

1. **Configure resilient connections**:

   - Set appropriate timeouts
   - Use keepalive settings
   - Implement automatic reconnection

2. **Monitor long-running queries**:

   ```sql
   -- Enable the slow query log
   SET GLOBAL slow_query_log = 1;
   SET GLOBAL long_query_time = 10; -- Log queries taking over 10 seconds
   ```

3. **Add indexes to improve query performance**:

   ```sql
   -- Identify missing indexes
   EXPLAIN SELECT * FROM large_table WHERE unindexed_column = 'value';
   ```

4. **Implement proper error handling and retry logic** in your application code
