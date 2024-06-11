---
title: Configure External PostgreSQL
---

By default, Bytebase bundles an embedded PostgreSQL instance for storing its own metadata. The metadata is stored under the [--data](/docs/reference/command-line#--data-directory) directory.

**For production setup, you should pass PG_URL environment variable to store these metadata in an external PostgreSQL database.**

## Prerequisites

1. PostgreSQL 14 or above.
1. All privileges on the [database object](https://www.postgresql.org/docs/current/sql-grant.html) including:
   - SELECT
   - INSERT
   - UPDATE
   - DELETE
   - TRUNCATE
   - REFERENCES
   - TRIGGER
   - CREATE
   - CONNECT
   - TEMPORARY
   - EXECUTE
   - USAGE
1. The database should use UTF-8 for encoding. UTF-8 encoding is mandatory across the entire system.
1. For Cloud RDS, ensure that the user either owns the schema (public) and database, or has the necessary privileges to access them.
   - ALTER DATABASE dbname OWNER TO bytebase;
   - ALTER SCHEMA public OWNER TO bytebase;

## Connection string format for PG_URL

**Supported format:**

_postgresql://\<\<user>>:\<\<secret>>@\<\<host>>:\<\<port>>/\<\<dbname>\>_

**Example:**

_postgresql://bytebase:z\*3kd2@example.com:5432/meta_

<HintBlock type="info">

- `user` must be specified.
- `dbname` must be specified and must be created in advance. The connecting `user` must have all the database privileges mentioned above.
- `host`. If you **run Bytebase inside Docker** and want to connect the pg instance on the same host, then you need to use `host.docker.internal`.

</HintBlock>

## Docker Sample

This bash script demonstrates how to add an external PostgreSQL database as the metadata store when running the bytebase container.

<IncludeBlock url="/docs/get-started/install/terminal-docker-run-external-url"></IncludeBlock>
