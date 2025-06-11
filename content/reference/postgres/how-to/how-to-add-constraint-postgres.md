---
title: How to add a CONSTRAINT in Postgres
updated_at: 2025/03/17 12:00:00
---

_Official documentation: [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)_

## Performance Considerations

<HintBlock type="info">

Adding constraints may affect query performance and application behavior. Ensure you understand the implications before proceeding.

Some organizations have strict approval processes. You can enforce [approval process](https://docs.bytebase.com/administration/custom-approval/) or [automated review](https://docs.bytebase.com/sql-review/review-rules/#column) via Bytebase.

</HintBlock>

1. **Lock Duration**: Adding constraints typically requires an ACCESS EXCLUSIVE lock on the table, which blocks all concurrent operations.

2. **Data Validation**: All existing data will be validated against the new constraint, which can be time-consuming for large tables.

3. **Transaction Size**: Large tables may generate significant write-ahead logs during constraint additions.

4. **Proper Planning**: Schedule constraint modifications during off-peak hours.

## Types of Constraints in PostgreSQL

PostgreSQL supports several types of constraints:

```sql
-- View constraint types available
SELECT distinct contype FROM pg_constraint;
```

Common constraint types include:

- `p`: Primary key
- `f`: Foreign key
- `u`: Unique
- `c`: Check constraint
- `t`: Constraint trigger
- `x`: Exclusion constraint

## Adding Primary Key Constraints

```sql
-- Add primary key constraint
ALTER TABLE table_name
ADD CONSTRAINT constraint_name PRIMARY KEY (column_name);

-- Example
ALTER TABLE customers
ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);

-- Composite primary key
ALTER TABLE order_items
ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_id, product_id);

-- With custom index options
ALTER TABLE users
ADD CONSTRAINT users_pkey PRIMARY KEY (user_id) WITH (fillfactor=90);
```

## Adding Foreign Key Constraints

```sql
-- Add foreign key constraint
ALTER TABLE table_name
ADD CONSTRAINT constraint_name FOREIGN KEY (column_name)
REFERENCES referenced_table (referenced_column);

-- Example
ALTER TABLE orders
ADD CONSTRAINT fk_customer_id FOREIGN KEY (customer_id)
REFERENCES customers (customer_id);

-- With referential actions
ALTER TABLE order_items
ADD CONSTRAINT fk_order_id FOREIGN KEY (order_id)
REFERENCES orders (order_id)
ON DELETE CASCADE
ON UPDATE RESTRICT;

-- Deferrable constraint
ALTER TABLE payments
ADD CONSTRAINT fk_order_id FOREIGN KEY (order_id)
REFERENCES orders (order_id)
DEFERRABLE INITIALLY IMMEDIATE;
```

## Adding Unique Constraints

```sql
-- Add unique constraint
ALTER TABLE table_name
ADD CONSTRAINT constraint_name UNIQUE (column_name);

-- Example
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

-- Multi-column unique constraint
ALTER TABLE products
ADD CONSTRAINT unique_sku_vendor UNIQUE (sku, vendor_id);

-- With custom index parameters
ALTER TABLE accounts
ADD CONSTRAINT unique_account_number UNIQUE (account_number) WITH (fillfactor=80);
```

## Adding Check Constraints

```sql
-- Add check constraint
ALTER TABLE table_name
ADD CONSTRAINT constraint_name CHECK (condition);

-- Example
ALTER TABLE employees
ADD CONSTRAINT chk_salary_positive CHECK (salary > 0);

-- Multiple conditions
ALTER TABLE products
ADD CONSTRAINT chk_product_valid
CHECK (price > 0 AND stock >= 0);

-- Using functions in check constraints
ALTER TABLE users
ADD CONSTRAINT chk_email_format
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
```

## Adding NOT NULL Constraints

In PostgreSQL, NOT NULL is a column property rather than a named constraint:

```sql
-- Add NOT NULL constraint
ALTER TABLE table_name
ALTER COLUMN column_name SET NOT NULL;

-- Example
ALTER TABLE orders
ALTER COLUMN customer_id SET NOT NULL;
```

## Adding Default Value Constraints

In PostgreSQL, default values are column properties rather than separate constraints:

```sql
-- Add default value
ALTER TABLE table_name
ALTER COLUMN column_name SET DEFAULT expression;

-- Example
ALTER TABLE orders
ALTER COLUMN status SET DEFAULT 'pending';

-- Using functions for default values
ALTER TABLE users
ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
```

## Adding Exclusion Constraints

Exclusion constraints ensure that if any two rows are compared on the specified columns or expressions using the specified operators, at least one of these operator comparisons will return false or null.

```sql
-- Add exclusion constraint
ALTER TABLE table_name
ADD CONSTRAINT constraint_name EXCLUDE USING index_method (
    column_name WITH operator
    [, ... ]
);

-- Example (ensure no meeting room time overlaps)
ALTER TABLE meetings
ADD CONSTRAINT exclude_overlapping_meetings
EXCLUDE USING gist (
    room_id WITH =,
    tsrange(start_time, end_time) WITH &&
);
```

## Common Errors and Solutions

See [Postgres Error Reference](/reference/postgres/error/overview/) for errors you may encounter.

Here are the most common errors you might face when adding constraints and how to solve them:

### ERROR: could not create constraint, check existing data

```sql
-- Find violating rows for a check constraint
SELECT * FROM employees WHERE NOT (salary > 0);

-- Find violating rows for a unique constraint
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- Fix violating data before adding constraint
UPDATE employees SET salary = 1 WHERE salary <= 0;
```

### ERROR: insert or update on table violates foreign key constraint

```sql
-- Find violating rows for a foreign key
SELECT * FROM orders
WHERE customer_id NOT IN (SELECT customer_id FROM customers);

-- Fix by updating to valid values
UPDATE orders
SET customer_id = NULL
WHERE customer_id NOT IN (SELECT customer_id FROM customers);

-- Or add missing referenced values
INSERT INTO customers (customer_id, name)
SELECT DISTINCT o.customer_id, 'Unknown Customer'
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;
```

### ERROR: could not acquire lock on relation "table_name"

```sql
-- Find blocking processes
SELECT pid,
       usename,
       pg_blocking_pids(pid) as blocked_by,
       query as blocked_query
FROM pg_stat_activity
WHERE cardinality(pg_blocking_pids(pid)) > 0;

-- You may need to terminate blocking queries or retry later
```

### ERROR: constraint "constraint_name" for relation "table_name" already exists

```sql
-- Check existing constraints
SELECT conname
FROM pg_constraint
WHERE conrelid = 'table_name'::regclass;

-- Use IF NOT EXISTS (PostgreSQL 12+)
ALTER TABLE products
ADD CONSTRAINT IF NOT EXISTS chk_price_positive CHECK (price > 0);
```

## Best Practices

1. **Database Backup**: Always back up your database before adding constraints.

2. **Test Environment**: Test constraint additions in a development environment first.

3. **Data Validation**: Check for constraint violations before adding the constraint.

   ```sql
   -- Example: Check for NOT NULL violations
   SELECT COUNT(*) FROM users WHERE email IS NULL;

   -- Example: Check for foreign key violations
   SELECT COUNT(*) FROM orders
   WHERE customer_id NOT IN (SELECT customer_id FROM customers);
   ```

4. **Transaction Safety**: Wrap operations in transactions to allow rollbacks.

   ```sql
   BEGIN;

   -- Fix violating data
   UPDATE orders SET status = 'pending' WHERE status IS NULL;

   -- Add constraint
   ALTER TABLE orders
   ALTER COLUMN status SET NOT NULL;

   COMMIT;
   -- OR ROLLBACK if needed
   ```

5. **Deferred Validation**: Consider using deferrable constraints for complex transactions.

6. **Consider Performance**: Adding constraints on large tables can be time-consuming.

7. **Application Coordination**: Schedule constraint changes during application maintenance windows.

8. **Documentation**: Maintain documentation of your schema constraints and their purposes.
