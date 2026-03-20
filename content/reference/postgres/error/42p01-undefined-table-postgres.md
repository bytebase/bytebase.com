---
title: 'ERROR 42P01: Relation Does Not Exist in Postgres'
---

## Error Message

```sql
ERROR: relation "users" does not exist
SQLSTATE: 42P01
```

## Description

PostgreSQL raises error 42P01 when a query references a table, view, or other relation that the database cannot find. The full SQLSTATE code is 42P01 (`undefined_table`). This is one of the most common PostgreSQL errors and almost always comes down to one of a few predictable causes.

## Causes

- **Typo in the table name.** `SELCET * FROM uers` fails because the table is actually `users`.
- **Wrong schema.** The table exists in a non-default schema but the query doesn't qualify it. `SELECT * FROM my_table` won't find `analytics.my_table` unless `analytics` is on the `search_path`.
- **Case sensitivity.** If the table was created with double quotes (`CREATE TABLE "Orders"`), you must always reference it with the same quotes and casing: `SELECT * FROM "Orders"`. Without quotes, PostgreSQL folds identifiers to lowercase.
- **Wrong database.** Each PostgreSQL database is isolated. A table in the `dev` database is not visible from a connection to `prod`.
- **Table not yet created.** Migrations may not have run, or the CREATE TABLE statement failed silently in a script.
- **Dropped table.** Someone (or a migration rollback) dropped the table.
- **Missing permissions.** If the user lacks `USAGE` on the schema, PostgreSQL hides the table entirely and reports it as not existing.

## Solutions

1. **Check the table exists and its exact name:**

   ```sql
   SELECT table_schema, table_name
   FROM information_schema.tables
   WHERE table_name ILIKE '%users%';
   ```

2. **Qualify the schema explicitly:**

   ```sql
   SELECT * FROM myschema.users;
   ```

3. **Check and set the search path:**

   ```sql
   SHOW search_path;

   -- Add the schema to the search path
   SET search_path TO myschema, public;
   ```

4. **Handle case-sensitive names:**

   ```sql
   -- If created with double quotes
   SELECT * FROM "Orders";
   ```

5. **Verify you are connected to the correct database:**

   ```sql
   SELECT current_database();
   ```

6. **Run pending migrations:**

   If using a migration tool, check that all migrations have been applied. For example:

   ```bash
   # Check migration status
   flyway info
   # Or with Bytebase — check the change history in the project dashboard
   ```

7. **Grant schema permissions if hidden by access control:**

   ```sql
   GRANT USAGE ON SCHEMA myschema TO app_user;
   GRANT SELECT ON ALL TABLES IN SCHEMA myschema TO app_user;
   ```

## Common scenarios

**In ORMs and application frameworks:** ORMs like Django, SQLAlchemy, or Prisma generate SQL referencing tables by model name. If the migration hasn't run or the model-to-table mapping is wrong, you get 42P01 at runtime. Check `\dt` in psql to confirm the table exists, then compare against your ORM's expected table name.

**In CI/CD pipelines:** A test suite connecting to a freshly created database will hit 42P01 if the schema setup step was skipped or failed. Add a pre-test check that verifies expected tables exist before running queries.

**With [Postgres case sensitivity](/blog/postgres-case-sensitivity/):** A table created as `CREATE TABLE "MyTable"` requires double-quoting everywhere. If you can, avoid double-quoted identifiers entirely and use lowercase names.

<HintBlock type="info">

Bytebase's [SQL Review](https://www.bytebase.com/docs/sql-review/review-rules/) can catch common issues like unqualified table references and missing schema prefixes before they reach production. See also [How to list tables in PostgreSQL](/reference/postgres/how-to/how-to-list-tables-postgres/) for quick ways to verify table existence.

</HintBlock>
