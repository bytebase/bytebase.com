---
title: "What's New in PostgreSQL 18 - a Developer's Perspective"
author: Tianzhou
updated_at: 2025/09/26 12:00
feature_image: /content/blog/what-is-new-in-postgres-18-for-developer/cover.webp
tags: Industry
featured: true
description: "Overview of PostgreSQL 18 features from a developer's perspective"
---

PostgreSQL 18 was officially released on [September 25, 2025](https://www.postgresql.org/about/news/postgresql-18-released-3142/). No doubt the most consequential change is the new Asynchronous I/O (AIO) subsystem. However, this post focuses on the features that will impact developers in their day-to-day work, starting with native UUID v7 support.

## Native UUID v7 Support

- Commit: [78c5e141e](https://postgr.es/c/78c5e141e)
- Docs: https://www.postgresql.org/docs/18/datatype-uuid.html

PostgreSQL 18 introduces the `uuidv7()` function for generating UUID version 7 values. This native support almost closes the long-standing debate about whether to use `SERIAL/IDENTITY` types or UUIDs as primary keys. UUIDv7 combines the best of both worlds: the global uniqueness of UUIDs with the sequential nature that makes serial keys perform well.

```sql
-- Generate a UUIDv7
SELECT uuidv7();

-- Create a table using UUIDv7 as primary key
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    customer_id INT,
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);
```

Previously, while PostgreSQL extensions could generate UUIDv7, the most widely used `uuid-ossp` extension doesn't implement v7. Lesser-known extensions that do support v7 aren't typically packaged with PostgreSQL distributions, especially on cloud providers. This meant developers wanting UUIDv7 had to implement generation logic in their applications. Native support removes this friction entirely.

## VIRTUAL Generated Columns

- Commit: [83ea6c540](https://postgr.es/c/83ea6c540)
- Docs: https://www.postgresql.org/docs/18/sql-createtable.html#SQL-CREATETABLE-PARMS-GENERATED-STORED

Generated columns were first introduced in PostgreSQL 12, but only with the `STORED` option, which means the generated column is stored on write and occupies disk space. Adding a `STORED` generated column will rewrite the entire table.

PostgreSQL 18 introduces the `VIRTUAL` option and makes it the default behavior for generated columns. These columns compute their values when read rather than when written. This is a more common approach, and making it the default aligns PostgreSQL with other major databases.

```sql
-- Create table with virtual generated column
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    salary DECIMAL(10,2),
    -- You can also skip VIRTUAL since it's the default option
    annual_salary DECIMAL(12,2) GENERATED ALWAYS AS (salary * 12) VIRTUAL
);

-- Insert data (generated columns are computed automatically)
INSERT INTO employees (first_name, last_name, salary) VALUES
    ('John', 'Doe', 5000.00),
    ('Jane', 'Smith', 6500.00);

SELECT first_name, last_name, salary, annual_salary
FROM employees;
```

Virtual column advantages:

- **Space Saving**: For derived data that doesn't need physical storage, virtual columns eliminate redundant disk usage.

- **Dynamic Computation**: Some computations benefit from being executed at query time, especially when they depend on current system state.

On the other hand, `STORED` generated columns remain valuable for heavy computations that rarely change, where the performance cost of repeated calculation outweighs storage concerns.

However, there are certain limitations as mentioned in the commit. The most noticeable one is that you cannot create indexes on `VIRTUAL` generated columns.

BTW, PostgreSQL 18 also adds support for generated columns in logical replication ([commit](https://postgr.es/c/745217a05), [docs](https://www.postgresql.org/docs/18/logical-replication-gencols.html)). This feature is only available to `STORED` generated columns as well.

## OLD and NEW Values in RETURNING

- Commit: [80feb727c](https://postgr.es/c/80feb727c)
- Docs: https://www.postgresql.org/docs/current/dml-returning.html

PostgreSQL 18 enhances the `RETURNING` clause to access both old and new row values in DML operations. This eliminates the need for separate queries to capture before/after values in audit logs.

**UPDATE Operations**

```sql
-- Update prices and see both old and new values
UPDATE products
SET price = price * 1.10
WHERE price <= 99.99
RETURNING
    name,
    old.price AS old_price,
    new.price AS new_price,
    new.price - old.price AS price_change;
```

**INSERT with ON CONFLICT**

```sql
-- Upsert with change tracking
INSERT INTO products (name, price) VALUES ('Widget', 25.00)
ON CONFLICT (name) DO UPDATE SET price = EXCLUDED.price
RETURNING
    name,
    old.price AS previous_price,
    new.price AS current_price,
    (old.price IS NULL) AS is_new_record;
```

**DELETE Operations**

```sql
-- Track what was deleted
DELETE FROM products
WHERE price < 10.00
RETURNING
    old.name AS deleted_product,
    old.price AS deleted_price;
```

## EXPLAIN ANALYZE with BUFFERS by Default

- Commit: [c2a4078eb](https://postgr.es/c/c2a4078eb)
- Docs: https://www.postgresql.org/docs/current/sql-explain.html

PostgreSQL 18 improves the `EXPLAIN` command to provide more detailed query execution information automatically.

`EXPLAIN ANALYZE` now includes buffer usage information by default, eliminating the need for the `BUFFERS` option. This default behavior helps developers spot I/O performance issues that would otherwise be overlooked:

```sql
postgres=# EXPLAIN ANALYZE SELECT * FROM users WHERE age > 25;

-- PostgreSQL 18: BUFFERS included automatically
 Seq Scan on users  (cost=0.00..18.75 rows=125 width=64) (actual time=0.029..0.087 rows=178 loops=1)
   Filter: (age > 25)
   Rows Removed by Filter: 89
   Buffers: shared hit=12
 Planning:
   Buffers: shared hit=156 read=3
   I/O Timings: shared read=0.024
 Planning Time: 0.512 ms
 Execution Time: 0.734 ms
```

## pg_get_acl() for Permission Inspection

- Commit: [4564f1ceb](https://postgr.es/c/4564f1ceb)
- Docs: https://www.postgresql.org/docs/18/functions-info.html#FUNCTIONS-INFO-OBJECT-TABLE

PostgreSQL 18 introduces the `pg_get_acl()` function for programmatically retrieving Access Control Lists (ACLs) for database objects. If you've ever spent time debugging the infamous `ERROR 42501: permission denied` messages, you'll appreciate having a unified way to inspect object privileges.

Previously, troubleshooting permissions required querying different system catalogs (`pg_class`, `pg_proc`, `pg_namespace`, `pg_attribute`) depending on the object type, each with their own ACL format.

The `pg_get_acl()` function provides a unified interface for retrieving ACLs from any database object, eliminating the need to remember which catalog to query for different object types.

```sql
postgres=# SELECT
    (pg_identify_object(s.classid,s.objid,s.objsubid)).*,
    pg_catalog.pg_get_acl(s.classid,s.objid,s.objsubid) AS acl
FROM pg_catalog.pg_shdepend AS s
JOIN pg_catalog.pg_database AS d
    ON d.datname = current_database() AND
       d.oid = s.dbid
JOIN pg_catalog.pg_authid AS a
    ON a.oid = s.refobjid AND
       s.refclassid = 'pg_authid'::regclass
WHERE s.deptype = 'a';
-[ RECORD 1 ]-----------------------------------------
type     | table
schema   | public
name     | testtab
identity | public.testtab
acl      | {postgres=arwdDxtm/postgres,foo=r/postgres}
```

While not as headline-grabbing as the new AIO, these quality-of-life improvements make day-to-day development easier—and clearer interfaces like `pg_get_acl()` benefit not only human developers, but AI agents as well.

## Further Readings

- [Postgres 18 full release notes](https://www.postgresql.org/docs/18/release-18.html)
- [DBA's perspective about Postgres 18](/blog/what-is-new-in-postgres-18)
