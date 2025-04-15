---
title: MySQL Timeout Explained
author: Tianzhou
updated_at: 2025/04/16 18:00
feature_image: /content/blog/mysql-timeout/banner.webp
tags: Explanation
description: Explain why MySQL provides a variety of timeout settings.
---

MySQL offers various timeout settings that are essential for ensuring system stability, preventing resource exhaustion, and maintaining performance, especially in high-traffic environments or when dealing with complex queries. Let's explore each of them.

## connect_timeout

[connect_timeout](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_connect_timeout) defines the number of seconds that the MySQL server waits for a connect packet before responding with a "Bad handshake" error. This timeout prevents abandoned connection attempts from consuming server resources.

```plain
ERROR: Lost connection to MySQL server at 'reading initial communication packet', system error: [errno]
```

By default, MySQL sets `connect_timeout` to 10 seconds, which works well for most environments. For high-latency networks or connections routed through multiple proxies, you might need to increase this value to 15-30 seconds. Conversely, in environments vulnerable to denial-of-service attacks, a lower timeout value can help mitigate connection flooding by releasing resources more quickly.

You can configure this setting in the MySQL configuration file:

```toml
[mysqld]
connect_timeout=20
```

Or dynamically at runtime (requires `SYSTEM_VARIABLES_ADMIN` privilege):

```sql
SET GLOBAL connect_timeout = 20;
```

Note that changing this setting dynamically affects only new connection attempts; existing connections remain unaffected.

## max_execution_time

<HintBlock type="info">

`max_execution_time` only applies to naked SELECT statements. Other statement types like INSERT, UPDATE, and DELETE are not affected by this timeout mechanism. It's also ignored in stored procedures.

</HintBlock>

[max_execution_time](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_execution_time) sets a limit on the maximum amount of time that a SELECT statement is permitted to execute before being terminated by the server. Introduced in MySQL 5.7.8, this setting helps prevent long-running queries from monopolizing system resources.

```plain
ERROR 3024 (HY000): Query execution was interrupted, maximum statement execution time exceeded
```

By default, `max_execution_time` is set to 0, which effectively disables the timeout mechanism. The value is specified **in milliseconds**, so setting it to 10000 would create a 10-second limit for queries.

You can set it globally in the configuration file:

```toml
[mysqld]
max_execution_time=10000
```

Or at the session level, affecting only queries in the current connection:

```sql
SET SESSION max_execution_time = 5000;
```

Or at the query level using an optimizer hint:

```sql
SELECT /*+ MAX_EXECUTION_TIME(3000) */ * FROM large_table WHERE complex_condition;
```

## innodb_lock_wait_timeout

[innodb_lock_wait_timeout](https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html#sysvar_innodb_lock_wait_timeout) controls how long an InnoDB transaction will wait for a row lock before giving up and rolling back the current statement. This timeout prevents transactions from being perpetually blocked when they cannot acquire necessary locks.

```plain
ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction
```

By default, this value is set to 50 seconds. When a transaction exceeds this threshold, only the current statement is rolled back by default, not the entire transaction. This behavior allows applications to catch the timeout error, potentially retry the specific operation that failed, and continue with the remainder of the transaction.

You can modify this default behavior by starting the MySQL server with the `--innodb-rollback-on-timeout` option, which causes the entire transaction to be rolled back when a lock wait timeout occurs.

The timeout can be configured at the global level:

```toml
[mysqld]
innodb_lock_wait_timeout=30
```

Or dynamically at runtime:

```sql
SET GLOBAL innodb_lock_wait_timeout = 30;
```

MySQL also supports session-level configuration:

```sql
SET SESSION innodb_lock_wait_timeout = 10;
```

For highly interactive OLTP systems, shorter timeout values (10-30 seconds) often provide better responsiveness by quickly identifying and resolving lock contention issues. For batch processing systems, longer timeout values may be more appropriate.

The lock timeout mechanism interacts closely with MySQL's deadlock detection system (`innodb_deadlock_detect`). When deadlock detection is enabled (the default), InnoDB automatically identifies circular lock dependencies and immediately resolves them, often before the lock timeout is reached.

## interactive_timeout and wait_timeout

[interactive_timeout](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_interactive_timeout) and [wait_timeout](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_wait_timeout) control how long idle connections are maintained before being automatically closed by the server. These settings help prevent resource depletion from abandoned or forgotten connections.

```plain
ERROR: MySQL server has gone away
```

By default, both values are set to 28800 seconds (8 hours). The distinction between them is based on connection type:

- `interactive_timeout` applies to connections that use the `CLIENT_INTERACTIVE flag` (typically GUI tools and command-line clients)
- `wait_timeout` applies to non-interactive connections (application servers, scripts, automated processes)

When a new connection session is established, its effective wait timeout value is initialized from either `wait_timeout` or `interactive_timeout`, depending on whether the `CLIENT_INTERACTIVE` flag is used. After that, the session's timeout can be modified independently.

You can configure these settings in the MySQL configuration file:

```toml
[mysqld]
interactive_timeout=3600
wait_timeout=1800
```

Or dynamically at runtime:

```sql
SET GLOBAL interactive_timeout = 3600;
SET GLOBAL wait_timeout = 1800;
```

Session-level configuration is also supported:

```sql
SET SESSION wait_timeout = 7200;
```

For web applications with short, frequent interactions, shorter timeout values (60-300 seconds) often provide better resource utilization.

<HintBlock type="info">

For applications using connection pooling, configure the pool's maximum idle time to be slightly shorter than MySQL's `wait_timeout` to prevent "server has gone away" errors.

</HintBlock>

## transaction_timeout

To prevent long-running connection holding locks for too long, you usually set `wait_timeout` or `interactive_timeout`. However, the transaction will still be open if it consists of short statements and short pauses in between. Ideally, you want to have a `transaction_timeout`. Unfortunately, MySQL doesn't have this, only [MariaDB](https://mariadb.com/kb/en/transaction-timeouts/) and [PostgreSQL](https://www.postgresql.org/docs/devel/runtime-config-client.html#GUC-TRANSACTION-TIMEOUT) do.

## Best Practices

When configuring MySQL timeout settings, consider these practical recommendations:

### Environment-Specific Settings

| Setting                    | High-Traffic Web Applications | Data Processing Applications |
| -------------------------- | ----------------------------- | ---------------------------- |
| `wait_timeout`             | 60-300 seconds                | 3600-7200 seconds            |
| `interactive_timeout`      | 1800 seconds                  | 7200 seconds                 |
| `connect_timeout`          | 5-10 seconds                  | 10-20 seconds                |
| `innodb_lock_wait_timeout` | 10-30 seconds                 | 50-120 seconds               |
| `max_execution_time`       | 5000-10000 milliseconds       | 30000-60000 milliseconds     |

### Connection Pooling

When using connection pooling, configure the pool's maximum idle time to be 10-15% shorter than MySQL's `wait_timeout`. This ensures that the pool proactively refreshes connections before the database server terminates them.

For example, if `wait_timeout` is set to 3600 seconds (1 hour), set the connection pool's idle timeout to approximately 3200 seconds (53 minutes).

### Monitoring

Monitor idle connections using `SHOW PROCESSLIST` and look for connections in the `Sleep` state. A large number of sleeping connections might indicate that your application is not properly closing connections or that your timeout values need adjustment.

## References

- [MySQL Server System Variables](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html)
- [InnoDB Parameters](https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html)
- [Server-Side SELECT Statement Timeouts](https://dev.mysql.com/blog-archive/server-side-select-statement-timeouts/)
