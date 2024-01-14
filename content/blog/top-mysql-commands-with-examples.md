---
title: Top mysql Commands with Examples
author: Tianzhou
published_at: 2023/07/19 09:00:00
feature_image: /content/blog/top-mysql-commands-with-examples/cover.webp
tags: How-To
description: The official mysql CLI is still the most widely used MySQL client. Let's learn the most common mysql commands by example.
---

MySQL is the world's most popular open-source relational database management system that uses SQL to manage data.
It's known for its scalability, reliability, and ease of use.

`mysql` is the official CLI client to command the MySQL database. It supports interactive and noninteractive use.

Below list the 10 most commonly used `mysql` commands with examples.

## 1. Connect to a database - mysql -u xxx -p -h xxx -P xxx db

Connects to the local MySQL server via socket /tmp/mysql.sock as the specified user and prompts for a password.

```text
mysql -u username -p
```

Connects to the MySQL server on the specified host at port 3306 and prompts for a password.

```text
mysql -u username -p -h hostname
```

Connects to the MySQL server on the specified host and port and prompts for a password.

```text
mysql -u username -p -h hostname -P portnumber
```

Connects to the specified database on the specified host and port as the specified user and prompts for a password.

```text
mysql -u username -p -h hostname -P portnumber -D databasename
# can also omit -D
mysql -u username -p -h hostname -P portnumber databasename
```

## 2. Run a single command - mysql -e

Use `-e` to execute a single statement.

```text
mysql -u username -p -h hostname -P portnumber databasename -e "SELECT 1"
```

Alternatively, you can pipe the statements from a file.

```text
mysql -u username -p -h hostname -P portnumber databasename < filename.sql
```

## 3. List all databases - SHOW DATABASES

```text
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

```text
# Support LIKE
mysql> SHOW DATABASES LIKE '%schema';
+--------------------+
| Database (%schema) |
+--------------------+
| information_schema |
| performance_schema |
+--------------------+
```

## 4. Switch to another database - USE xxx

```text
mysql> USE mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
```

## 5. List all tables under a database - SHOW TABLES

```text
# Support LIKE
mysql> SHOW TABLES LIKE 'time%';
+---------------------------+
| Tables_in_mysql (time%)   |
+---------------------------+
| time_zone                 |
| time_zone_leap_second     |
| time_zone_name            |
| time_zone_transition      |
| time_zone_transition_type |
+---------------------------+
```

## 6. Describe table schema - DESCRIBE xxx

```text
mysql> DESCRIBE time_zone;
+------------------+---------------+------+-----+---------+----------------+
| Field            | Type          | Null | Key | Default | Extra          |
+------------------+---------------+------+-----+---------+----------------+
| Time_zone_id     | int unsigned  | NO   | PRI | NULL    | auto_increment |
| Use_leap_seconds | enum('Y','N') | NO   |     | N       |                |
+------------------+---------------+------+-----+---------+----------------+
```

```text
# DESC also works
mysql> DESC time_zone;
+------------------+---------------+------+-----+---------+----------------+
| Field            | Type          | Null | Key | Default | Extra          |
+------------------+---------------+------+-----+---------+----------------+
| Time_zone_id     | int unsigned  | NO   | PRI | NULL    | auto_increment |
| Use_leap_seconds | enum('Y','N') | NO   |     | N       |                |
+------------------+---------------+------+-----+---------+----------------+
```

## 7. List user and grants - SHOW GRANTS;

`SHOW GRANTS
    [FOR user_or_role
        [USING role [, role] ...]]`

```text
# Show grants for the current user
mysql> SHOW GRANTS;
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Grants for root@%                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, SHUTDOWN, PROCESS, FILE, REFERENCES, INDEX, ALTER, SHOW DATABASES, SUPER, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, REPLICATION SLAVE, REPLICATION CLIENT, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER, CREATE TABLESPACE, CREATE ROLE, DROP ROLE ON *.* TO `root`@`%` WITH GRANT OPTION                                                                                                                                                                                                                                                                                                                                                                 |
```

```text
# Show grants for a particular user
mysql> SHOW GRANTS FOR root@localhost;
```

```text
# List all users and grants
mysql> SELECT User, Host, Grant_priv, Super_priv FROM mysql.user;
+------------------+-----------+------------+------------+
| User             | Host      | Grant_priv | Super_priv |
+------------------+-----------+------------+------------+
| root             | %         | Y          | Y          |
| healthchecker    | localhost | N          | N          |
| mysql.infoschema | localhost | N          | N          |
| mysql.session    | localhost | N          | Y          |
| mysql.sys        | localhost | N          | N          |
| root             | localhost | Y          | Y          |
+------------------+-----------+------------+------------+
```

## 8. Show connections - SHOW PROCESSLIST

`SHOW [FULL] PROCESSLIST`

_Without the FULL keyword, SHOW PROCESSLIST displays only the first 100 characters of each statement in the Info field._

```text
mysql> SHOW PROCESSLIST;
+-------+-----------------+------------------+------+---------+--------+------------------------+-------------------+
| Id    | User            | Host             | db   | Command | Time   | State                  | Info              |
+-------+-----------------+------------------+------+---------+--------+------------------------+-------------------+
|     5 | event_scheduler | localhost        | NULL | Daemon  | 696323 | Waiting on empty queue | NULL              |
| 21238 | root            | 172.17.0.1:41440 | NULL | Query   |      5 | User sleep             | SELECT SLEEP(100) |
| 21239 | root            | 172.17.0.1:41448 | NULL | Query   |      0 | init                   | SHOW PROCESSLIST  |
+-------+-----------------+------------------+------+---------+--------+------------------------+-------------------+
```

If you want to apply filtering, then query the underlying `INFORMATION_SCHEMA.PROCESSLIST` table.

```text
mysql> SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST WHERE USER = 'root';
+-------+------+------------------+------+---------+------+------------+------------------------------------------------------------------+
| ID    | USER | HOST             | DB   | COMMAND | TIME | STATE      | INFO                                                             |
+-------+------+------------------+------+---------+------+------------+------------------------------------------------------------------+
| 21238 | root | 172.17.0.1:41440 | NULL | Query   |    2 | User sleep | SELECT SLEEP(100)                                                |
| 21239 | root | 172.17.0.1:41448 | NULL | Query   |    0 | executing  | SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST WHERE USER = 'root' |
+-------+------+------------------+------+---------+------+------------+------------------------------------------------------------------+
```

## 9. Kill connection - KILL

`KILL [CONNECTION | QUERY] processlist_id`

`KILL CONNECTION` is the same as KILL with no modifier: It terminates the connection associated with the given processlist_id, after terminating any statement the connection is executing. This can be useful if you want to terminate a long-running or problematic connection that is causing issues for other users or processes.

```text
mysql> KILL 123;
```

`KILL QUERY` terminates the statement the connection is currently executing, but leaves the connection itself intact. This can be useful if you have a specific query that is causing issues or is taking too long to execute, and you want to terminate only that query without affecting other queries or processes running on the same connection.

```text
mysql> KILL QUERY 123;
```

## 10. Quit - \q, quit, exit, Ctrl+D/Ctrl+Z

```text
mysql> \q
Bye
```

```text
mysql> exit
Bye
```

```text
mysql> quit
Bye
```

Alternatively, you can use the shortcut key `Ctrl+D` (or `Ctrl+Z` on Windows).

```text
mysql> ^DBye
```

## Other Tips

### Displaying query results vertically - \G

Some query results are much more readable when displayed vertically using `\G`.

```text
mysql> SHOW GRANTS\G;
*************************** 1. row ***************************
Grants for root@%: GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, SHUTDOWN, PROCESS, FILE, REFERENCES, INDEX, ALTER, SHOW DATABASES, SUPER, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, REPLICATION SLAVE, REPLICATION CLIENT, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, CREATE USER, EVENT, TRIGGER, CREATE TABLESPACE, CREATE ROLE, DROP ROLE ON *.* TO `root`@`%` WITH GRANT OPTION
*************************** 2. row ***************************
Grants for root@%: GRANT APPLICATION_PASSWORD_ADMIN,AUDIT_ABORT_EXEMPT,AUDIT_ADMIN,AUTHENTICATION_POLICY_ADMIN,BACKUP_ADMIN,BINLOG_ADMIN,BINLOG_ENCRYPTION_ADMIN,CLONE_ADMIN,CONNECTION_ADMIN,ENCRYPTION_KEY_ADMIN,FIREWALL_EXEMPT,FLUSH_OPTIMIZER_COSTS,FLUSH_STATUS,FLUSH_TABLES,FLUSH_USER_RESOURCES,GROUP_REPLICATION_ADMIN,GROUP_REPLICATION_STREAM,INNODB_REDO_LOG_ARCHIVE,INNODB_REDO_LOG_ENABLE,PASSWORDLESS_USER_ADMIN,PERSIST_RO_VARIABLES_ADMIN,REPLICATION_APPLIER,REPLICATION_SLAVE_ADMIN,RESOURCE_GROUP_ADMIN,RESOURCE_GROUP_USER,ROLE_ADMIN,SENSITIVE_VARIABLES_OBSERVER,SERVICE_CONNECTION_ADMIN,SESSION_VARIABLES_ADMIN,SET_USER_ID,SHOW_ROUTINE,SYSTEM_USER,SYSTEM_VARIABLES_ADMIN,TABLE_ENCRYPTION_ADMIN,XA_RECOVER_ADMIN ON *.* TO `root`@`%` WITH GRANT OPTION
*************************** 3. row ***************************
Grants for root@%: GRANT PROXY ON ``@`` TO `root`@`%` WITH GRANT OPTION
```

## Further Readings

- [How to Install MySQL Client on Your Mac, Ubuntu, CentOS, Windows](/blog/how-to-install-mysql-client-on-mac-ubuntu-centos-windows)
- [Top MySQL GUI Clients](/blog/top-mysql-gui-client)
- [Top MySQL Schema Compare Tool to Diff and Sync Database](/blog/top-mysql-schema-compare-tools)
- [Top Free, Open Source SQL Clients](/blog/top-open-source-sql-clients)
