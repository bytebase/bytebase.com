---
title: Reference
---

## Global Options

### Data Source Name (DSN)

The `--dsn` option is used to provide a data source name (DSN) to connect databases.

All commands that operate databases require this option, including:

- dump
- migrate
- restore

The supported format is

```
driver://username[:password]@host[:port]/[dbName][?param=value&...&param=value]
```

We currently support drivers:

- mysql
- postgresql

The optional params are:

- ssl-ca
- ssl-cert
- ssl-key

Here are a few examples:

- mysql://root@localhost:3306/
- postgresql://$(whoami)@localhost:5432/postgres
- postgresql://user:pass@localhost:5432/dbname?ssl-ca=a&ssl-cert=b&ssl-key=c

## Commands

### migrate

Apply schema migration to database.

Internally, every `migrate` command will be recorded in history. It is recommended that `migrate` is only used for applying schema change so that it is more clear to track schema migration.

#### Flags

`--dsn`

`--file, -f string` file stored the migration script.

`--command, -c string` SQL command that does the migration.

#### Usage

```bash
bb migrate --dsn mysql://root@localhost:3306/bytebase_test_todo \
  --command "ALTER TABLE author ADD COLUMN phone_no VARCHAR(15);"
```

Apply SQL command to the given database.

```bash
bb migrate --dsn mysql://root@localhost:3306/bytebase_test_todo \
  --file migrate_v1_0_1.sql
```

Apply the migration script to the given database.

### dump

Dump the schema and data of a database.

This command is used to back up a database. When given no output file and only dump schema, it can be used to view the current database schema.

#### Flags

`--dsn`

`--file string` File to store the dump. Output to stdout if unspecified.

`--schema-only` Only dump schema.

#### Usage

```bash
bb dump --dsn mysql://root@localhost:3306/ --file backup.sql
```

Dump the schema and data from all databases in localhost:3306 mysql, to `backup.sql`.

```bash
bb dump --dsn mysql://root@localhost:3306/bytebase_test_todo --schema-only
```

Print the schema of database `bytebase_test_todo` to stdout.

### restore

Restore the schema and data of a database from a dump file (usually created by `bb dump`).

Internally, `restore` command will NOT be recorded. It is recommended that `restore` is used for restoring from an existing database dump, including both schema and data.

#### Flags

`--dsn`

`--file, -f string` file stored the dumped database.

#### Usage

```bash
bb restore --dsn mysql://root@localhost:3306/ \
  --file backup.sql
```

Restore database from backup.sql to the given database.
