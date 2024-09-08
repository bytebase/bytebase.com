---
title: Top 9 PostgreSQL Extensions 2024
author: Tianzhou
updated_at: 2024/07/23 09:00:00
feature_image: /content/blog/top-postgres-extension/cover.webp
tags: Industry
featured: true
description: What are the top Postgres extensions you may need to enhance your Postgres instance.
---

Extensibility is PostgreSQL's DNA, lies in its [original design](https://dsf.berkeley.edu/papers/ERL-M85-95.pdf).

![design](/content/blog/top-postgres-extension/design.webp)

This design philosophy grants PostgreSQL a lot of unique capabilities, one of them is its extension system. With [Postgres extension](https://www.postgresql.org/docs/current/extend-extensions.html), 3rd parties can extend the Postgres capabilities without touching any Postgres core.

Today most production Postgres deployments run some extensions. Below we present those most commonly
used ones.

| Extension                               | Capability                     |
| --------------------------------------- | ------------------------------ |
| [PostGIS](#postgis)                     | Process geospatial data        |
| [pg_stat_statements](#pgstatstatements) | Collect execution stats        |
| [postgres_fdw](#postgresfdw)            | Query external PostgreSQL data |
| [uuid-ossp](#uuid-ossp)                 | Generate UUID                  |
| [pgcrypto](#pgcrypto)                   | Cryptographic functions        |
| [pg_cron](#pgcron)                      | Schedule job inside database   |
| [pgAudit](#pgaudit)                     | Audit Logging                  |
| [timescaledb](#timescaledb)             | Process time-series data       |
| [pgvector](#pgvector)                   | Process vectorized data        |

## PostGIS

[PostGIS](http://postgis.net/) extends the PostgreSQL by adding support storing, indexing and querying geographic data.
PostGIS is the most complex Postgres extension and a testimony of the Postgres powerful extension system.

To find the nearest city to a given point:

1. Say we have the following table of cities with their locations represented by points. Note, the `location` column has a GEOMETRY type which is provided by the PostGIS extension.

   ```sql
   CREATE TABLE cities (
   name TEXT,
   location GEOMETRY(Point, 4326)
   );
   ```

1. To find the nearest place to a given point, you can use the ST_Distance function to calculate the distance between the point and each place in the table, and then sort the results by distance. For example, the following command finds the nearest city to the point (-74.005941, 40.712784), which is the location of New York City:

   ```sql
   SELECT name, ST_Distance(location, ST_SetSRID(ST_MakePoint(-74.005941, 40.712784), 4326)) AS distance
   FROM cities
   ORDER BY location <-> ST_SetSRID(ST_MakePoint(-74.005941, 40.712784), 4326)
   LIMIT 1;
   ```

This query calculates the distance between each city in the cities table and the point (-74.005941, 40.712784), and sorts the results by distance using the `<->` operator. The LIMIT 1 clause returns only the nearest city.

Note that the ST_Distance function returns the distance between two points in meters by default. You can convert the result to a different unit of measurement by using the appropriate PostGIS function, such as ST_Distance_Sphere for distance in kilometers.

## pg_stat_statements

[pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) provides a means for tracking planning and execution statistics of all SQL statements executed by a server. When pg_stat_statements is active, it tracks statistics across all databases of the server.
The statistics gathered by the module are made available via a view named `pg_stat_statements`.

Note that the pg_stat_statements extension only tracks queries that have been executed since it was enabled. If you want to track all queries, you should enable the extension at server start-up by adding the following line to your postgresql.conf file:

```text
shared_preload_libraries = 'pg_stat_statements'
```

To find the top 10 queries by total execution time:

```sql
SELECT query, total_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

## postgres_fdw

[postgres_fdw](https://www.postgresql.org/docs/current/postgres-fdw.html) can be used to access data stored in external PostgreSQL servers. `postgres_fdw` is the successor of the old `dblink` extension. `postgres_fdw` provides more transparent and standards-compliant syntax for accessing remote tables, and can give better performance in many cases.

With `postgres_fdw`, you can query other Postgres database.

1. Create a new database that you want to query. For example, let's create a database named my_other_database:

   ```sql
   CREATE DATABASE my_other_database;
   ```

1. Connect to the database where you want to create the foreign table (in this example, we'll use the default postgres database).

1. Create a user mapping for the user that will access the remote database. For example, if you want to use the same user that you are currently connected as, you can run the following command:

   ```sql
   CREATE USER MAPPING FOR current_user
   SERVER my_other_database
   OPTIONS (user 'postgres', password '');
   ```

1. Create a foreign server definition using the postgres_fdw extension.

   ```sql
   CREATE SERVER my_other_database_server
   FOREIGN DATA WRAPPER postgres_fdw
   OPTIONS (dbname 'my_other_database');
   ```

   This command creates a server definition named `my_other_database_server` using the postgres_fdw foreign data wrapper and the dbname option set to `my_other_database`.

1. Create a foreign table definition in the local database that maps to a table in the remote my_other_database database.

   ```sql
   CREATE FOREIGN TABLE my_other_table (
   id INTEGER,
   name TEXT
   )
   SERVER my_other_database_server
   OPTIONS (schema_name 'public', table_name 'my_table');
   ```

   This command creates a foreign table named my_other_table in the local database that maps to a table named my_table in the public schema of the my_other_database database.

1. Use the foreign table in queries just like you would a regular table.

   ```sql
   SELECT * FROM my_other_table WHERE id = 1;
   ```

   You can also join the foreign table with local tables in your queries, just like you would with regular tables.

Note that when using postgres_fdw to query a remote database on the same PostgreSQL instance, you may need to adjust the postgresql.conf file and restart the PostgreSQL server to enable access to the pg_hba.conf file for the other database.

## uuid-ossp

[uuid-ossp](https://www.postgresql.org/docs/current/uuid-ossp.html) provides functions to generate universally unique identifiers (UUIDs) using one of several standard algorithms. Postgres already has built-in function `gen_random_uuid()` to generate a version 4 (random) UUID. If you want to generate other UUID version, you need to use `uuid-ossp`.

To generate a version 5 UUID:

```sql
SELECT uuid_generate_v5(uuid_ns_url(), 'example.com');
```

This command generates a UUID version 5 based on the namespace identifier for URLs (uuid_ns_url()) and the name string 'example.com'. The output will look something like this: `f1f5d9f0-2a4c-5f24-9536-3f1f69e68a7e`.

You can also create your own namespace identifier using the uuid-ossp function uuid_ns_create().

```sql
SELECT uuid_ns_create('example');
```

This command creates a namespace identifier using the name 'example' and returns it as a UUID.

You can then use this namespace identifier with uuid_generate_v5() to generate UUIDs based on that namespace and a name string.

Note that UUID version 5 is recommended for use in applications where security is a concern, as it is generated using a SHA-1 hash of the namespace identifier and name string, which is less susceptible to collisions than other UUID versions.

## pgcrypto

[pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) is a PostgreSQL extension that provides cryptographic functions and capabilities directly within the database. It enhances data security by allowing various cryptographic operations to be performed within SQL queries.

1. Hashing

   ```sql
   SELECT digest('data to hash', 'sha256');
   ```

1. Encrytion / decryption

   ```sql
   SELECT pgp_sym_encrypt('my secret data', 'my passphrase');
   SELECT pgp_sym_decrypt(encrypted_data, 'my passphrase');
   ```

1. Password hashing with salt

   ```sql
   INSERT INTO users (username, password_hash)
   VALUES ('bob', crypt('foobar123', gen_salt('xyz')));
   ```

1. Public key cryptography

   ```sql
   SELECT pgp_pub_encrypt('data', dearmor('-----BEGIN PGP PUBLIC KEY BLOCK----- ...'));
   SELECT pgp_pub_decrypt(encrypted_data, dearmor('-----BEGIN PGP PRIVATE KEY BLOCK----- ...'));
   ```

## pg_cron

[pg_cron](https://github.com/citusdata/pg_cron) is a simple cron-based job scheduler that runs inside the database as an extension. It uses the same syntax as regular cron, but it allows you to schedule PostgreSQL commands directly from the database.

The schedule uses the standard cron syntax.

![cron](/content/blog/top-postgres-extension/cron.webp)

1. Create a new cron job by running the following command

   ```sql
   SELECT cron.schedule('0 0 * * *', 'INSERT INTO my_table SELECT * FROM my_other_table');
   ```

1. Verify that the cron job has been created

   ```sql
   SELECT cron.jobid, cron.expr, cron.command FROM cron.job;
   ```

1. View the status of running and recently completed job

   ```sql
   select * from cron.job_run_details order by start_time desc limit 5;
   ```

## pgAudit

[pgAudit](https://github.com/pgaudit/pgaudit) is an extension for PostgreSQL that provides detailed session and/or object audit logging via the standard logging facility provided by PostgreSQL. It is designed to help database administrators and developers meet security and compliance requirements by providing detailed information on database activities.

It helps in meeting regulatory requirements like GDPR, HIPAA, SOX, and others by providing an audit trail of database activity.

```sql
-- Usage
SET pgaudit.log = 'read, ddl';

CREATE TABLE account
(
    id INT,
    name TEXT,
    password TEXT,
    description TEXT
);

INSERT INTO account (id, name, password, description)
             VALUES (1, 'user1', 'HASH1', 'blah, blah');

SELECT * FROM account;
```

```sql
-- Output
AUDIT: SESSION,1,1,DDL,CREATE TABLE,TABLE,public.account,create table account
(
    id int,
    name text,
    password text,
    description text
);,<not logged>
AUDIT: SESSION,2,1,READ,SELECT,,,select *
    from account,,<not logged>
```

## timescaledb

[timescaledb](https://www.timescale.com) provides optimized storage and querying of time-series data.

1. Create a hypertable

   A hypertable is a special type of table in TimescaleDB that is designed for storing and querying time-series data. You can create a hypertable using the CREATE_HYPERTABLE function.

   ```sql
   CREATE TABLE sensor_data (
   time TIMESTAMP NOT NULL,
   value FLOAT NOT NULL
   );
   SELECT create_hypertable('sensor_data', 'time');
   ```

1. Insert some data into the sensor_data table

   ```sql
   INSERT INTO sensor_data (time, value)
   VALUES
   ('2023-07-01 00:00:00', 10.0),
   ('2023-07-01 01:00:00', 15.0),
   ('2023-07-01 02:00:00', 20.0);
   ```

1. Query the data

   TimescaleDB provides a number of optimized functions for working with time-series data, such as time_bucket for aggregating data into time intervals. For example, to calculate the average value for each hour of data, you can run the following query:

   ```sql
   SELECT time_bucket('1 hour', time) AS hour, AVG(value) AS avg_value
   FROM sensor_data
   GROUP BY hour;
   ```

## pgvector

[pgvector](https://github.com/pgvector/pgvector) is an extension for PostgreSQL that provides support for vector processing. It allows you to perform vectorized operations on groups of data, which can provide significant performance improvements for certain types of queries.

To get the nearest neighbors to a vector:

1. Create a new table with a vector column

   ```sql
   CREATE TABLE items (id bigserial PRIMARY KEY, embedding vector(3));
   ```

1. Insert vectors

   ```sql
   INSERT INTO items (embedding) VALUES ('[1,2,3]'), ('[4,5,6]');
   ```

1. Query the nearest neighbors to a vector

   ```sql
   SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
   ```

## Summary

Postgres extension is a key differentiator from its main alternative MySQL. If the business requires geospatial
processing, then Postgres is the only choice thanks to the PostGIS extension. And in the era of AI, pgvector is on
the way to become the de-factor standard for processing vector data.

## Further Readings

- [Top Postgres GUI client](/blog/top-postgres-gui-client)
- [Top Open Source Postgres Migration Tools](/blog/top-open-source-postgres-migration-tools)
- [Postgres vs. MySQL](/blog/postgres-vs-mysql)
- [Postgres vs. MongoDB](/blog/postgres-vs-mongodb)
