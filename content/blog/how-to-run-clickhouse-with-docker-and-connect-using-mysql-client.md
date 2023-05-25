---
title: Run ClickHouse with Docker and Connect Using MySQL Client
author: Zhe
published_at: 2021/11/15 05:28:33
feature_image: /content/blog/how-to-run-clickhouse-with-docker-and-connect-using-mysql-client/docker-and-clickhouse.webp
tags: How-To
integrations: ClickHouse
description: Run ClickHouse with Docker, and connect using MySQL client.
---

> We do not find detailed instruction on running ClickHouse with Docker on the web, so we decide to provide our own step-by-step tutorial.

## Background

ClickHouse® is an open-source, high performance columnar OLAP database management system for real-time analytics using SQL.

Docker is a software platform allowing developers to build, test, and deploy applications quickly. Docker packages software into `container`, a standardized unit abstracting the underlying operating system.

## Installation

Install [docker](https://docs.docker.com/get-docker/) before you continue.

### Server

Run the following command to start a ClickHouse server in a docker container.

```bash
docker run -d --name tutorial-clickhouse-server --ulimit nofile=262144:262144 --volume=$HOME/tutorial_clickhouse_database:/var/lib/clickhouse yandex/clickhouse-server
```

### Client

Run the following command to connect to ClickHouse server with the default user.

```bash
docker run -it --rm --link tutorial-clickhouse-server:clickhouse-server yandex/clickhouse-client --host clickhouse-server
```

## Configuration

### Enable SQL-driven access control and account management for the `default` user

By default, the ClickHouse server provides the default user account which is not allowed using SQL-driven access control and account management but has all the rights and permissions. To enable it, we need to edit a server configuration file.

Run

```bash
docker cp <container>:/etc/clickhouse-server/users.xml .
```

which copies it to your current directory (don't miss the last dot) on your local machine. Then use whatever editor you want to edit the file locally.

In **users.xml**, add `<access_management>1</access_management>`.

After the change, the file structure should be something like

```xml
<users>
    <default>
        <access_management>1</access_management>
    </default>
</users>
```

**Note** that this is unsafe and you should change it back to `<access_management>0</access_management>` after finishing your work.

And then run

```bash
docker cp users.xml <container>:/etc/clickhouse-server/users.xml
```

to replace the old one.

### Create a user

```sql
CREATE USER user1 IDENTIFIED WITH PLAINTEXT_PASSWORD BY 'pass1';
```

You can check the users with `SHOW USERS` command.

### Create a database

```sql
CREATE DATABASE IF NOT EXISTS db1
```

You can check the databases with the `SHOW DATABASES` command.

### Grant database privileges to the user

```sql
GRANT ALL PRIVILEGES ON db1.* TO user1
```

### Connect with the new user

Now we can connect to the server with the created user.

```bash
docker run -it --rm --link tutorial-clickhouse-server:clickhouse-server yandex/clickhouse-client --host clickhouse-server -u user1 --password pass1
```

You can run `SHOW GRANTS` to see the permissions the user has.

### Create a table and run some queries

To create a table.

```sql
USE db1;
DROP TABLE IF EXISTS employees;
CREATE TABLE employees(
    id          integer,
    name        text,
    designation text,
    manager     integer,
    hired_on    date,
    salary      integer,
    commission  float,
    dept        integer
)
ENGINE = MergeTree()
PRIMARY KEY id
ORDER BY id;
```

Run `SHOW TABLES` to check the tables.

Run `DESCRIBE TABLE employees`. You will see something like

```plain
┌─name────────┬─type────┬─default_type─┬─default_expression─┬─comment─┬─codec_expression─┬─ttl_expression─┐
│ id          │ Int32   │              │                    │         │                  │                │
│ name        │ String  │              │                    │         │                  │                │
│ designation │ String  │              │                    │         │                  │                │
│ manager     │ Int32   │              │                    │         │                  │                │
│ hired_on    │ Date    │              │                    │         │                  │                │
│ salary      │ Int32   │              │                    │         │                  │                │
│ commission  │ Float32 │              │                    │         │                  │                │
│ dept        │ Int32   │              │                    │         │                  │                │
└─────────────┴─────────┴──────────────┴────────────────────┴─────────┴──────────────────┴────────────────┘
```

Do some inserts.

```sql
INSERT INTO employees (id, name, designation, manager, hired_on, salary, commission, dept) VALUES
    (1,'JOHNSON','ADMIN',6,'1990-12-17',18000,NULL,4)
    (2,'HARDING','MANAGER',9,'1998-02-02',52000,300,3)
    (3,'TAFT','SALES I',2,'1996-01-02',25000,500,3)
    (4,'HOOVER','SALES I',2,'1990-04-02',27000,NULL,3)
    (5,'LINCOLN','TECH',6,'1994-06-23',22500,1400,4)
    (6,'GARFIELD','MANAGER',9,'1993-05-01',54000,NULL,4)
    (7,'POLK','TECH',6,'1997-09-22',25000,NULL,4)
    (8,'GRANT','ENGINEER',10,'1997-03-30',32000,NULL,2)
    (9,'JACKSON','CEO',NULL,'1990-01-01',75000,NULL,4)
    (10,'FILLMORE','MANAGER',9,'1994-08-09',56000,NULL,2)
    (11,'ADAMS','ENGINEER',10,'1996-03-15',34000,NULL,2)
    (12,'WASHINGTON','ADMIN',6,'1998-04-16',18000,NULL,4)
    (13,'MONROE','ENGINEER',10,'2000-12-03',30000,NULL,2)
    (14,'ROOSEVELT','CPA',9,'1995-10-12',35000,NULL,1);
```

Finally, we can run some queries now.

```sql
SELECT designation,COUNT(*) AS nbr, (AVG(salary)) AS avg_salary FROM employees GROUP BY designation ORDER BY avg_salary DESC;
SELECT name,hired_on FROM employees ORDER BY hired_on;
```

## Connect to ClickHouse Server with MySQL Client

ClickHouse supports MySQL wire protocol. It can be enabled by mysql_port setting in configuration file: `/etc/clickhouse_server/config.xml`.

By default, it should be`<mysql_port>9004</mysql_port>`.

### Server

We start a ClickHouse server with the following command, notice that port 9004 is exposed this time.

```bash
docker run -d --name tutorial-clickhouse-server -p 9004:9004 --ulimit nofile=262144:262144 --volume=$HOME/tutorial_clickhouse_database:/var/lib/clickhouse yandex/clickhouse-server
```

### Client

Example of connecting using command-line tool `mysql`:

```bash
mysql --protocol tcp -u default -P 9004
```

Output if a connection succeeded:

```plain
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 0
Server version: 21.8.10.19-ClickHouse

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

## Conclusion

You've just started a ClickHouse server using docker, connected to it, created a user, a database, a table, and executed some queries against it. You've also learned how to connect to ClickHouse server using MySQL client.

If you like this tutorial, you might also be interested in our product [Bytebase](https://bytebase.com/), an open source, web-based schema change management tool, which helps you manage ClickHouse database, supporting SQL review, version control, backup and restore and etc...
