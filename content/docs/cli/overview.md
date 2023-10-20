---
title: Getting Started
description: This page contains a getting-started covering frequently used commands.
---

`bb` CLI is the command-line tool of Bytebase, helping developers integrate MySQL and PostgreSQL schema change into the existing CI/CD workflow. By integrating `bb` with your existing CI/CD system (GitLab CI, GitHub Actions, etc.), you can bring all best practices of CI/CD to the database.

This page contains a getting-started covering frequently used commands.

## Install `bb`

To install `bb`, just paste the following command in a macOS Terminal or Linux shell prompt:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/bytebase/install/HEAD/install.sh)"
```

This installs `bb` in `/usr/local/bin`. Run the following command to check if `bb` is installed:

```bash
bb --help
```

And the output will look like this:

```plain
A database management tool provided by bytebase.com

Usage:
  bb [flags]
  bb [command]

Available Commands:
  dump        Exports schema and data of a database.
  migrate     Migrate the database schema.
  restore     Restores schema and data of a database.

Flags:
  -h, --help   help for bb

Use "bb [command] --help" for more information about a command.
```

## Start a local MySQL server via Docker

To use `bb`, you need a database. You can start an empty MySQL docker container (make sure the Docker Engine is running):

```bash
docker run -d \
  -e MYSQL_ROOT_PASSWORD=passwd \
  -p 3306:3306 \
  mysql/mysql-server
```

## Restore sample database

After the MySQL server has started, you can restore an example database from our quickstart:

```bash
curl -O https://raw.githubusercontent.com/bytebase/bytebase/main/quickstart/test_schema/mysql/1_todo.sql
```

```bash
bb restore --dsn mysql://root:passwd@localhost:3306 --file 1_todo.sql
```

## View current schema

To view the current schema, you can dump schema to stdout:

```bash
bb dump --dsn mysql://root:passwd@localhost:3306/ --schema-only
```

```plain
--
-- Table structure for `author`
--
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT 'name of the author',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
...
```

## Apply database migration

Say you want to add a `phone_no` column to the table `author`. This is a so-called **database migration** and you can use `bb migrate` to do so:

```bash
bb migrate \
  --dsn mysql://user:passwd@localhost:3306/bytebase_test_todo \
  --command "ALTER TABLE author ADD COLUMN phone_no VARCHAR(15);"
```

After migration, you can dump again to check if the migration has executed successfully:

```bash
bb dump --dsn mysql://root:passwd@localhost:3306/bytebase_test_todo --schema-only
```

```plain
--
-- Table structure for `author`
--
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT 'name of the author',
  `phone_no` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
...
```
