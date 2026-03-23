---
title: "How to Fix MySQL Error 1054: Unknown Column in 'field list'"
---

## Error Message

```sql
ERROR 1054 (42S22): Unknown column 'emial' in 'field list'
```

The error can also appear with different contexts:

```sql
ERROR 1054 (42S22): Unknown column 'status' in 'where clause'
ERROR 1054 (42S22): Unknown column 'u.name' in 'on clause'
ERROR 1054 (42S22): Unknown column 'total' in 'order clause'
```

## Description

MySQL raises error 1054 when a query references a column that does not exist in the specified table or expression. The SQLSTATE code is 42S22. This is the MySQL counterpart to [PostgreSQL error 42703](/reference/postgres/error/42703-undefined-column-postgres). The error message helpfully tells you which clause contains the bad reference — `field list` (SELECT), `where clause`, `on clause`, or `order clause`.

## Common Causes

1. **Typo in the column name**: `SELECT emial FROM users` when the column is `email`
2. **Missing or wrong table alias**: Referencing a column without qualifying which table it belongs to in a JOIN
3. **Column alias used in WHERE or HAVING**: MySQL doesn't allow referencing a SELECT alias in the WHERE clause; aliases are only usable in ORDER BY (and sometimes HAVING)
4. **Column dropped or renamed**: A migration changed the column but application queries still use the old name
5. **Wrong table referenced**: The column exists in a different table than expected
6. **Backtick quoting issues**: Reserved words used as column names without backticks
7. **Subquery column not visible**: Referencing a column from an inner query that isn't exposed to the outer query

## How to Fix

### Solution 1: Check the Actual Column Names

```sql
-- List all columns in a table
DESCRIBE users;

-- Or use INFORMATION_SCHEMA
SELECT COLUMN_NAME, DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
ORDER BY ORDINAL_POSITION;
```

### Solution 2: Qualify Columns with Table Aliases in JOINs

```sql
-- Bad: ambiguous column reference
SELECT name FROM orders JOIN customers ON orders.customer_id = customers.id;

-- Good: use table alias
SELECT c.name FROM orders o JOIN customers c ON o.customer_id = c.id;
```

### Solution 3: Don't Use Aliases in WHERE — Repeat the Expression

```sql
-- Bad: alias not visible in WHERE
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM users WHERE full_name LIKE '%Smith%';

-- Good: repeat the expression
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM users WHERE CONCAT(first_name, ' ', last_name) LIKE '%Smith%';

-- Alternative: use a subquery
SELECT * FROM (
  SELECT *, CONCAT(first_name, ' ', last_name) AS full_name FROM users
) t WHERE full_name LIKE '%Smith%';
```

### Solution 4: Quote Reserved Words with Backticks

```sql
-- Bad: 'order' is a reserved word
SELECT order FROM purchases;

-- Good: backtick the reserved word
SELECT `order` FROM purchases;
```

### Solution 5: Fix ON Clause References

When the error points to `'on clause'`, the column reference in a JOIN condition is wrong:

```sql
-- Bad: wrong column name in ON clause
SELECT * FROM orders o JOIN customers c ON o.cust_id = c.id;

-- Good: use the correct column name
SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;
```

### Solution 6: Verify After Migrations

If a column was recently renamed or dropped:

```sql
-- Check if the old column still exists
SHOW COLUMNS FROM users LIKE 'user_name';

-- Check what columns currently exist
SHOW COLUMNS FROM users;
```

## Common scenarios

**With `SELECT *` in views:** If a view was created with `SELECT *` and the underlying table later dropped a column, queries against the view will fail with 1054. Recreate the view after schema changes.

**In INSERT statements:** `INSERT INTO users (emial) VALUES ('a@b.com')` fails if the column is `email`. The error message will say `Unknown column 'emial' in 'field list'`.

**In ORDER BY with UNION:** When using UNION, ORDER BY can only reference columns from the first SELECT or use positional numbers:

```sql
-- Bad
SELECT id, email FROM users UNION SELECT id, address FROM contacts ORDER BY email;

-- Good: use column position
SELECT id, email FROM users UNION SELECT id, address FROM contacts ORDER BY 2;
```

<HintBlock type="info">

Bytebase's [SQL Review](https://www.bytebase.com/docs/sql-review/review-rules/) can catch unknown column references during change review before they reach production. See also [ERROR 1146: Table Doesn't Exist](/reference/mysql/error/1146-table-doesnt-exist) for the related table-not-found error.

</HintBlock>
