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

## Description

PostgreSQL raises error 42703 when a query references a column that the database cannot find in the target table or expression. The full SQLSTATE code is 42703 (`undefined_column`). This is one of the most common PostgreSQL errors — closely related to [42P01 (undefined table)](/reference/postgres/error/42p01-undefined-table-postgres) — and usually traces back to a spelling mistake, a missing alias, or a schema mismatch.

## Causes

- **Typo in the column name.** `SELECT emial FROM users` fails because the column is actually `email`.
- **Missing table alias or wrong alias.** In a multi-table query, referencing `SELECT name FROM orders JOIN customers c ON ...` fails if `name` exists in `customers` but not `orders` and no alias is specified.
- **Case sensitivity.** If a column was created with double quotes (`"Status"`), you must always reference it as `"Status"`. Without quotes, PostgreSQL folds identifiers to lowercase, so `SELECT Status` becomes `SELECT status` which won't match `"Status"`.
- **Column dropped or renamed.** A migration renamed `user_name` to `username` but application code still references the old name.
- **Wrong table in a JOIN.** The column exists in a different table than the one being referenced.
- **Subquery or CTE column not exposed.** A subquery selects `id` but the outer query references `user_id` from that subquery.
- **Schema mismatch after migration.** The application expects a column that a migration hasn't created yet, or that was rolled back.

## Solutions

1. **Check the actual column names in the table:**

   ```sql
   SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_name = 'users'
   ORDER BY ordinal_position;
   ```

2. **Use a table alias to disambiguate columns in JOINs:**

   ```sql
   -- Bad: ambiguous or wrong table
   SELECT name FROM orders JOIN customers ON orders.customer_id = customers.id;

   -- Good: qualify with alias
   SELECT c.name FROM orders o JOIN customers c ON o.customer_id = c.id;
   ```

3. **Handle case-sensitive column names:**

   ```sql
   -- If created with double quotes
   SELECT "Status" FROM orders;

   -- Check actual casing
   SELECT column_name FROM information_schema.columns
   WHERE table_name = 'orders' AND column_name ILIKE '%status%';
   ```

4. **Verify the column in psql:**

   ```sql
   \d users
   ```

5. **Check subquery or CTE column names:**

   ```sql
   -- Bad: outer query references a column the CTE doesn't expose
   WITH active AS (SELECT id FROM users WHERE active = true)
   SELECT user_id FROM active;

   -- Good: match the column name
   WITH active AS (SELECT id FROM users WHERE active = true)
   SELECT id FROM active;
   ```

6. **Run pending migrations:**

   If the column should have been added by a migration, verify it was applied:

   ```bash
   # Check migration status
   flyway info
   # Or check the change history in Bytebase
   ```

## Common scenarios

**In ORMs and application code:** ORMs map model fields to column names. If you rename a field in your model but forget to generate a migration, or if the migration hasn't been applied, PostgreSQL will report 42703 at runtime. Check `\d tablename` against your model definition.

**In GROUP BY and ORDER BY:** PostgreSQL doesn't allow referencing column aliases in `WHERE` or `HAVING` (though `ORDER BY` is fine). `SELECT email AS e FROM users WHERE e LIKE '%@%'` fails with 42703 because aliases aren't visible in `WHERE`.

```sql
-- Bad
SELECT email AS e FROM users WHERE e LIKE '%@%';

-- Good
SELECT email AS e FROM users WHERE email LIKE '%@%';
```

**After ALTER TABLE:** If a column was renamed with `ALTER TABLE users RENAME COLUMN user_name TO username`, any view, function, or application query still using the old name will fail with 42703. Search your codebase for the old column name.

<HintBlock type="info">

Bytebase's [SQL Review](https://www.bytebase.com/docs/sql-review/review-rules/) can catch references to non-existent columns during change review, before they reach production. See also [ERROR 42P01: Relation Does Not Exist](/reference/postgres/error/42p01-undefined-table-postgres) for the related table-not-found error.

</HintBlock>
