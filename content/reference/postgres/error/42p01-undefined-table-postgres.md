---
title: 'ERROR 42P01: Relation Does Not Exist in Postgres'
---

## Error Message

```sql
ERROR: relation "users" does not exist
LINE 1: SELECT * FROM users;
               ^
SQLSTATE: 42P01
```

Other common variations:

```sql
ERROR: relation "public.orders" does not exist
ERROR: relation "my_view" does not exist
```

## What Triggers This Error

PostgreSQL 42P01 fires whenever a query references a table, view, sequence, or other relation that the database cannot find. The fix depends on which situation you're in:

- **Table name typo or case sensitivity** — `"Users"` won't match `users`
- **Wrong schema** — table exists in `analytics` but you're querying `public`
- **Wrong database** — connected to `prod` but the table is in `staging`
- **Migration not applied** — table doesn't exist yet in this environment
- **Temporary table expired or out of scope** — temp table created in another session or transaction
- **Permissions hiding the table** — user lacks `USAGE` on the schema, so PostgreSQL reports it as missing

## Fix by Scenario

### Table name typo or case sensitivity

If the table was created with double quotes (`CREATE TABLE "Orders"`), you must always reference it with the exact casing and quotes. Without quotes, PostgreSQL folds identifiers to lowercase — so `SELECT * FROM Orders` becomes `SELECT * FROM orders`, which doesn't match `"Orders"`.

```sql
-- Find the actual table name (case-insensitive search)
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_name ILIKE '%users%';

-- If the table was created with quotes, you must query it with quotes
SELECT * FROM "Orders";
```

In psql, `\dt *users*` also works for a quick pattern search.

### Wrong schema

The table exists but in a schema that isn't on your `search_path`. This is common in multi-tenant setups or when a DBA organizes tables into schemas like `analytics`, `staging`, or `app`.

```sql
-- Check your current search path
SHOW search_path;

-- Find which schema the table is actually in
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_name = 'my_table';

-- Option 1: qualify the schema explicitly
SELECT * FROM analytics.my_table;

-- Option 2: add the schema to your search path
SET search_path TO analytics, public;
```

### Wrong database

PostgreSQL databases are fully isolated — a table in `dev` is invisible from a connection to `prod`. This catches people coming from MySQL, where databases are more like schemas.

```sql
-- Check which database you're connected to
SELECT current_database();

-- Reconnect to the right one
\c correct_database
```

In application code, check the `dbname` parameter in your connection string.

### Migration not applied

The table simply doesn't exist yet because the migration hasn't run, failed silently, or was rolled back. This is especially common in CI/CD pipelines where the test database is freshly created.

```bash
# Check migration status
flyway info
# Or with Django
python manage.py showmigrations
# Or with Rails
rails db:migrate:status
```

```sql
-- Verify whether the table exists at all
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' ORDER BY table_name;
```

### Temporary table expired or out of scope

Temporary tables in PostgreSQL only live for the duration of the session (or transaction, if created with `ON COMMIT DROP`). If your application creates a temp table in one connection and queries it from another — or if the session disconnects between steps — the table is gone.

```sql
-- Create a temp table that survives the transaction
CREATE TEMPORARY TABLE temp_results (id INT, score NUMERIC)
ON COMMIT PRESERVE ROWS;

-- Verify temp tables in current session
SELECT * FROM pg_catalog.pg_tables
WHERE tableowner = current_user AND schemaname LIKE 'pg_temp%';
```

Connection poolers like PgBouncer in transaction mode reset session state between requests, which silently drops temp tables.

### Permissions hiding the table

If a user lacks `USAGE` on a schema, PostgreSQL doesn't say "permission denied" — it says the table doesn't exist. This is a security feature, but it can be confusing.

```sql
-- Check if the table exists for a superuser
SET ROLE postgres;
SELECT * FROM information_schema.tables WHERE table_name = 'my_table';
RESET ROLE;

-- Grant access
GRANT USAGE ON SCHEMA myschema TO app_user;
GRANT SELECT ON ALL TABLES IN SCHEMA myschema TO app_user;
```

## Prevention

- Use `\dt` or `information_schema.tables` to verify table existence before writing queries against unfamiliar schemas
- Avoid creating tables with double-quoted mixed-case names — it creates a permanent quoting requirement
- Add a pre-test check in CI/CD that verifies expected tables exist before running the test suite
- In ORM setups, always run migrations before deploying code that references new tables
- If using PgBouncer in transaction mode, avoid temporary tables or switch to session mode for workflows that need them

<HintBlock type="info">

Bytebase's [SQL Review](https://www.bytebase.com/docs/sql-review/review-rules/) can catch references to non-existent tables during change review, before they reach production. See also [ERROR 42703: Column Does Not Exist](/reference/postgres/error/42703-undefined-column-postgres) for the related column-not-found error.

</HintBlock>
