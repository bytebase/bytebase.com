---
title: Enable Slow Query Log for MySQL
---

> The slow query log consists of SQL statements that take more than long_query_time seconds to execute and require at least min_examined_row_limit rows to be examined. The slow query log can be used to find queries that take a long time to execute and are therefore candidates for optimization.

## Modify MySQL Configuration

To enable slow query log, you need to change the following MySQL configuration in MySQL configuration file (e.g. `/etc/mysql/my.cnf`):

```
[mysqld]
slow_query_log = ON
long_query_time = 1
log_output = TABLE
```

- `slow_query_log`: Enable slow query log.
- `long_query_time`: The minimum execution time (in seconds) to be logged.
- `log_output`: The destination for log output. `TABLE` means log to `mysql.slow_log` table. Bytebase will read from this table to sync and display the slow queries.

## Restart MySQL

After you change the MySQL configuration, you need to restart MySQL to make the change effective.

## Check MySQL Variables

You can check the MySQL variables to make sure the change is effective.

```sql
SHOW VARIABLES LIKE "log_output";
SHOW VARIABLES LIKE "slow_query_log";
SHOW VARIABLES LIKE "long_query_time";
```

## References

- [MySQL Slow Query Log](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html)
- [MySQL Slow Query Log Variables](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_slow_query_log)