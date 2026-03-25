---
title: 'ERROR 42703: Column Does Not Exist in Postgres'
---

## Error Message

```sql
ERROR: column "emial" does not exist
LINE 1: SELECT emial FROM users;
               ^
SQLSTATE: 42703
```

## What Triggers This Error

PostgreSQL 42703 has several distinct causes, and the fix depends on which one you hit:

- **Typo in the column name** — `emial` instead of `email`
- **Missing or wrong table alias in a JOIN** — column exists but PostgreSQL can't resolve which table it belongs to
- **Case-sensitive column created with double quotes** — `"Status"` won't match `status`
- **Column alias used in WHERE or HAVING** — PostgreSQL doesn't allow this
- **Schema mismatch after migration** — column renamed or not yet created
- **Subquery or CTE column not exposed** — outer query references a name the inner query doesn't return

## Fix by Scenario

### Typo in column name

The most common cause. Check what columns actually exist:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

Or in psql:

```sql
\d users
```

### Missing table alias in a JOIN

When multiple tables have columns with similar names, PostgreSQL can't guess which one you mean:

```sql
-- Bad: ambiguous or wrong table
SELECT name FROM orders JOIN customers ON orders.customer_id = customers.id;

-- Good: qualify with alias
SELECT c.name FROM orders o JOIN customers c ON o.customer_id = c.id;
```

### Case-sensitive column (created with double quotes)

If a column was created as `"Status"` (quoted), PostgreSQL stores it in mixed case. Without quotes, PostgreSQL folds all identifiers to lowercase, so `SELECT Status` becomes `SELECT status` — which doesn't match `"Status"`.

```sql
-- Must use exact casing with double quotes
SELECT "Status" FROM orders;

-- Find the actual casing
SELECT column_name FROM information_schema.columns
WHERE table_name = 'orders' AND column_name ILIKE '%status%';
```

This catches people who move from MySQL (case-insensitive identifiers by default) to PostgreSQL.

### Column alias used in WHERE or HAVING

PostgreSQL doesn't allow referencing column aliases in `WHERE` or `HAVING` clauses. Aliases are only visible in `ORDER BY`.

```sql
-- Bad: alias not visible in WHERE
SELECT email AS e FROM users WHERE e LIKE '%@%';

-- Good: use the original column name
SELECT email AS e FROM users WHERE email LIKE '%@%';
```

### Schema mismatch after migration (ORM or manual)

ORMs map model fields to column names. If you rename a field in your model but forget to generate a migration, or if the migration hasn't been applied, PostgreSQL reports 42703 at runtime.

```bash
# Check migration status
flyway info
# Or verify against the model
\d tablename
```

If a column was renamed with `ALTER TABLE users RENAME COLUMN user_name TO username`, any view, function, or application query still using the old name fails. Search your codebase for the old column name.

### Subquery or CTE column not exposed

The outer query references a column name that the inner query doesn't return:

```sql
-- Bad: outer query references 'user_id' but CTE only returns 'id'
WITH active AS (SELECT id FROM users WHERE active = true)
SELECT user_id FROM active;

-- Good: match the column name
WITH active AS (SELECT id FROM users WHERE active = true)
SELECT id FROM active;
```

### After ALTER TABLE (views and functions break)

If a column was renamed, any view created with `SELECT *` on that table will keep working until the view is refreshed. But views with explicit column references, stored functions, and triggers will fail with 42703. Grep your database objects:

```sql
-- Find functions referencing the old column name
SELECT proname, prosrc FROM pg_proc
WHERE prosrc ILIKE '%old_column_name%';
```

## Prevention

- Use `\d tablename` or `information_schema.columns` to verify column names before writing queries
- Avoid creating columns with double-quoted mixed-case names — it creates a permanent quoting requirement
- Run `ALTER DEFAULT PRIVILEGES` when setting up roles so future tables inherit the right grants
- In ORMs, always generate and apply migrations before deploying code that references new columns

<HintBlock type="info">

Bytebase's [SQL Review](https://www.bytebase.com/docs/sql-review/review-rules/) can catch references to non-existent columns during change review, before they reach production. See also [ERROR 42P01: Relation Does Not Exist](/reference/postgres/error/42p01-undefined-table-postgres) for the related table-not-found error.

</HintBlock>
