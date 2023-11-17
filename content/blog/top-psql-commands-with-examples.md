---
title: Top psql Commands with Examples
author: Ningjing
published_at: 2023/11/16 18:00:00
feature_image: /content/blog/top-psql-commands-with-examples/cover.webp
tags: How-To
description: The official mysql CLI is still the most widely used MySQL client. Let's learn the most common mysql commands by example.
---

PostgreSQL, often simply called Postgres, is a free and open-source relational database management system (RDBMS) known for its reliability, feature robustness, and performance. It has been actively developed for over 35 years and is considered one of the most advanced open-source RDBMSs available. 

`psql` is the official CLI client to command the PostgreSQL database. It supports interactive and noninteractive use.

Below list the 10 most commonly used `psql` commands with examples.


## 1. Connect to a database - `psql -U xxx -p -h xxx -d xxx`

If you are using the default PostgreSQL username `postgres` and have not set a password, you can connect to the database using the following command. You will be prompted to enter the password for the `postgres` user.

```bash
psql
```

If you are using a different username or have set a password for the `postgres` user, you can connect to the database using the following command. You will be prompted to enter the password for the specified user.

```bash
psql -U your_username
```

If the PostgreSQL server is running on a different port than the default (5432), you can connect to the database using the following command. You will be prompted to enter the password for the specified user.

```bash
psql -p 5433
```

If the PostgreSQL server is running on a remote host, you can connect to the database using the following command. You will be prompted to enter the password for the specified user.

```bash
psql -h remote_host -p 5432
```

In all of these examples, you can also specify the name of the database you want to connect to using the `-d` option. For example, to connect to the database named `my_database`, you would use the following command:

```bash
psql -d my_database
```

## 2. Run a single command - `-c`

To run a single command in PostgreSQL using the `psql` command-line interface, you can use the `-c` option followed by the SQL command you want to execute.

```bash
psql -d my_database -c "SELECT * FROM my_table;"
```

## 3. List available databases - `\l`

This command will all of the databases that are currently available on the server. This can be useful for getting an overview of the databases that are available to you.

```bash
postgres-# \l

   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges
-----------+----------+----------+-----------------+------------+------------+------------+-----------+-----------------------
 postgres  | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 template0 | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/postgres          +
           |          |          |                 |            |            |            |           | postgres=CTc/postgres
 template1 | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/postgres          +
           |          |          |                 |            |            |            |           | postgres=CTc/postgres
(3 rows)
```

## 4. Switch to a specified database - `\c`

The `\c` command switches to the specified database. This is useful for working with a specific database after you have listed the available databases.

```bash
postgres-# \c postgres

psql (16.0, server 16.1 (Debian 16.1-1.pgdg120+1))
You are now connected to database "postgres" as user "postgres".
```

## 5. List tables - `\dt`

The `\dt` command lists all of the tables that are currently available in the current database. This can be useful for getting an overview of the tables that are available to you in the current database.

```bash
postgres-# \dt

List of relations
Schema | Name | Type | Owner
-------+---------+-------+--------
public | mytable | table | postgres
public | users | table | postgres
public | orders | table | postgres
```

## 6. Describe a specified table - `\d`

The `\d` command describes the specified table. This provides information about the table's columns, data types, and constraints.

```bash
postgres-# \d my_table

Table: my_table

Column | Data Type | Constraints
-------+------------+-------------------
id | SERIAL | PRIMARY KEY
name | VARCHAR(50) | NOT NULL
email | VARCHAR(100) | UNIQUE
```

## 7. Listing users - `\du`

The `\du` command lists all of the users that exist in the current database.

```bash
postgres-# \du

List of roles
Role name | Attributes
---------+------------
postgres | SUPERUSER, CREATEDB, CREATEROLE, INHERIT, REPLICATION
myuser | CREATEDB
```


The `\du username` command is used to list the roles (users) in the current database that have the specified username. 

```bash
postgres-# \du myuser

List of roles
Role name | Attributes
---------+------------
myuser | CREATEDB

```

If the specified username does not match any roles in the current database, the output will be an empty table.

```bash
postgres-# \du youruser

List of roles
Role name | Attributes
---------+------------
 | 
```

## 8. Show connections - `pg_stat_activity`

To list all active connections, execute the following SQL query.

```bash
postgres-# SELECT * FROM pg_stat_activity;

pid | datname | username | client_addr | client_port | backend_start | query_start | query | state
-------+---------+---------+-------------+-------------+---------------+---------------+-----------------+----------
1234 | mydb1   | postgres | 192.168.1.100 | 5432 | 2023-10-04 15:04:00 | 2023-10-04 15:04:05 | SELECT * FROM mytable; | active
5678 | mydb2   | user1    | 192.168.1.101 | 5432 | 2023-10-04 15:05:00 | 2023-10-04 15:05:03 | UPDATE mytable SET name = 'John Doe' WHERE id = 123; | idle in transaction
9012 | postgres | 192.168.1.102 | 5432 | 2023-10-04 15:06:00 |                |                | idle |

```

You can also filter the results to specific connections based on criteria such as username, database name, or state. For example, to list only active connections to the database mydb, use the following query:

```bash
postgres-# SELECT * FROM pg_stat_activity WHERE datname = 'mydb' AND state = 'active';
```

Similarly, to list connections currently executing queries, use the following query:

```bash
postgres-# SELECT * FROM pg_stat_activity WHERE state IN ('active', 'idle in transaction');
```

## 9. Kill connection - `pg_terminate_backend()`, `kill`

Once you have identified the PID of the connection you want to kill, you can use the `pg_terminate_backend()` function to terminate it. For example, the following command will kill the connection with PID 1234:

```bash
postgres-# SELECT pg_terminate_backend(1234);
```

Using the kill command is a less common method for killing PostgreSQL connections, as it can be more dangerous and less reliable than using the pg_terminate_backend() function. However, it may be necessary in certain situations, such as when the connection is unresponsive or the pg_terminate_backend() function fails.

```bash
kill -9 1234
```

## 10. Quit - `\q`,`Ctrl+D`/`Ctrl+Z`

Using the `\q` command or the keyboard shortcut `Ctrl+D`(or `Ctrl+Z` on windows). This will immediately exit the psql command-line interface.

```bash
\q
```

## Further Readings

- [How to Set Up Local Postgres on Your Mac, Ubuntu, CentOS, or Windows](/blog/how-to-install-local-postgres-on-mac-ubuntu-centos-windows/)
- [Top 5 Postgres GUI Clients](/blog/top-postgres-gui-client/)
- [Top Free, Open Source SQL Clients](/blog/top-open-source-sql-clients)
- [Top Postgres Extensions](/blog/top-postgres-extension/)
