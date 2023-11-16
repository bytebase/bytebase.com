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

In all of these examples, you can also specify the name of the database you want to connect to using the `-d` option. For example, to connect to the database named `mydatabase`, you would use the following command:

```bash
psql -d mydatabase
```

## 2. Run a single command - `-c`

To run a single command in PostgreSQL using the `psql` command-line interface, you can use the `-c` option followed by the SQL command you want to execute.

```bash
psql -d my_database -c "SELECT * FROM mytable;"
```

## 3. List available databases - `\l`

This command will all of the databases that are currently available on the server. This can be useful for getting an overview of the databases that are available to you.

```bash
\l
```

## 4. Switch to a specified database - `\c`

```bash
\c mydatabase
```

The `\c` command switches to the specified database. This is useful for working with a specific database after you have listed the available databases.

## 5. List tables - `\dt`

```bash
\dt
```

The `\dt` command lists all of the tables that are currently available in the current database. This can be useful for getting an overview of the tables that are available to you in the current database.

## 6. Describe a specified table - `\d`

```bash
\d mytable
```

The `\d` command describes the specified table. This provides information about the table's columns, data types, and constraints.

## 7. List schemas - `\dn`

```bash
\dn
```

The `\dn` command lists all of the schemas that are currently available in the current database. Schemas are used to organize objects in the database, such as tables, views, and functions.

## 8. Listing users - `\du`

```bash
\du
```

The `\du` command lists all of the users that exist in the current database. For each user, the command displays the user's name, the user's role, and the user's permissions.

## 9. Retrieve information about a specified user - `\du my-username`

```bash
\du my-username
```

The `\du` command retrieves information about the specified user. This can be useful for getting more detailed information about a specific user.

## 10. Listing functions - `\df`

```bash
\df
```

The `\df` command lists all of the functions that are currently available in the current database. This can be useful for getting an overview of the functions that are available to you in the current database.

## 11. List views - `\dv`

```bash
\dv
```

The `\dv` command lists all of the views that are currently available in the current database. Views are virtual tables that are based on one or more base tables.

## 12. Save the results to a file - `\o file-name`

The `\o` command saves the results of the next query to a file. This can be useful for saving the results of a query to a file so that you can refer to them later.


## 13. Quit - `\q`,`Ctrl+D`

Using the `\q` command or the Ctrl+D keyboard shortcut `Ctrl+D`. This will immediately exit the psql command-line interface.

```bash
\q
```

## Further Readings

- [How to Install MySQL Client on Your Mac, Ubuntu, CentOS, Windows](/blog/how-to-install-mysql-client-on-mac-ubuntu-centos-windows)
- [Top MySQL GUI Clients](/blog/top-mysql-gui-client)
- [Top MySQL Schema Compare Tool to Diff and Sync Database](/blog/top-mysql-schema-compare-tools)
- [Top Free, Open Source SQL Clients](/blog/top-open-source-sql-clients)
