---
title: How to enable pg_stat_statements in PostgreSQL
---

_Official documentation: [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html)_

`pg_stat_statements` module provides a means for tracking planning and execution statistics of all SQL statements executed by a server.

## Modify PostgreSQL Configuration

<HintBlock type="warning">

The pg_stat_statements module must be loaded by adding pg_stat_statements to shared_preload_libraries in postgresql.conf, because it requires additional shared memory.

</HintBlock>

To enable pg_stat_statements, you need to modify the following PostgreSQL configuration in PostgreSQL configuration file (e.g. `/etc/postgresql/12/main/postgresql.conf`):

```plain
shared_preload_libraries = 'pg_stat_statements'
pg_stat_statements.track = all
```

## Restart PostgreSQL

After you change the PostgreSQL configuration, you need to restart PostgreSQL to make the change effective.

## Create pg_stat_statements Extension for Each Database

Currently, pg_stat_statements only tracks the statistics of the database where the extension is created. So you need to create the extension for each database.

```sql
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

You can use the [Bytebase Batch Change](https://docs.bytebase.com/change-database/batch-change) feature to create the extension for all databases.

## Check pg_stat_statements

```sql
SELECT count(*) FROM pg_stat_statements;
```
