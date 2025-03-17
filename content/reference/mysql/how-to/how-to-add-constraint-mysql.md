---
title: How to add a CONSTRAINT in MySQL
updated_at: 2025/03/13 12:00:00
---

_Official documentation: [ALTER TABLE](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html)_

## Performance Considerations

<HintBlock type="info">

Adding constraints may affect query performance and application behavior. Ensure you understand the implications before proceeding.

Some organizations have strict approval processes. You can enforce [approval process](/docs/administration/custom-approval/) or [automated review](/docs/sql-review/review-rules/#column) via Bytebase.

</HintBlock>

1. **Schema Validation**: Adding constraints will validate all existing data, which can cause the operation to fail if any violations exist.

2. **Lock Duration**: Some constraint addition operations may lock tables during execution.

3. **Index Creation**: Many constraints (PRIMARY KEY, UNIQUE) automatically create indexes, which can be resource-intensive on large tables.

4. **Proper Planning**: Schedule constraint modifications during off-peak hours.

## Types of Constraints in MySQL

MySQL supports the following constraint types:

1. Primary Key constraints
2. Foreign Key constraints
3. Unique constraints
4. Check constraints (supported from MySQL 8.0.16)
5. Not Null constraints
6. Default value constraints

## Adding Primary Key Constraints

```sql
-- Add primary key constraint
ALTER TABLE table_name
ADD PRIMARY KEY (column_name);

-- Example
ALTER TABLE customers
ADD PRIMARY KEY (customer_id);

-- Composite primary key
ALTER TABLE order_details
ADD PRIMARY KEY (order_id, product_id);
```

If you need to modify a column before adding it as a primary key:

```sql
-- Make column NOT NULL and then add as primary key
ALTER TABLE products
MODIFY product_id INT NOT NULL AUTO_INCREMENT;

-- Then add the primary key
ALTER TABLE products
ADD PRIMARY KEY (product_id);
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

-- With ON DELETE and ON UPDATE options
ALTER TABLE order_items
ADD CONSTRAINT fk_order_id FOREIGN KEY (order_id)
REFERENCES orders (order_id)
ON DELETE CASCADE
ON UPDATE RESTRICT;
```

## Adding Unique Constraints

In MySQL, unique constraints are implemented as unique indexes:

```sql
-- Add unique constraint
ALTER TABLE table_name
ADD CONSTRAINT constraint_name UNIQUE (column_name);

-- Example
ALTER TABLE users
ADD CONSTRAINT uk_email UNIQUE (email);

-- Composite unique constraint
ALTER TABLE products
ADD CONSTRAINT uk_sku_vendor UNIQUE (sku, vendor_id);
```

## Adding Check Constraints

Available from MySQL 8.0.16 onwards:

```sql
-- Add check constraint
ALTER TABLE table_name
ADD CONSTRAINT constraint_name CHECK (expression);

-- Example
ALTER TABLE employees
ADD CONSTRAINT chk_salary_positive CHECK (salary > 0);

-- Multiple check constraints
ALTER TABLE products
ADD CONSTRAINT chk_price_positive CHECK (price > 0),
ADD CONSTRAINT chk_inventory_nonnegative CHECK (inventory >= 0);
```

## Adding NOT NULL Constraints

```sql
-- Add NOT NULL constraint by modifying the column
ALTER TABLE table_name
MODIFY column_name data_type NOT NULL;

-- Example
ALTER TABLE orders
MODIFY customer_id INT NOT NULL;
```

## Adding Default Constraints

```sql
-- Add default constraint
ALTER TABLE table_name
ALTER COLUMN column_name SET DEFAULT value;

-- Example
ALTER TABLE orders
ALTER COLUMN status SET DEFAULT 'pending';

-- Multiple default constraints
ALTER TABLE users
ALTER COLUMN active SET DEFAULT TRUE,
ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
```

## Common Errors and Solutions

See [MySQL Error Reference](/reference/mysql/error/overview/) for a comprehensive list of errors you may encounter. Below are common errors specific to adding CONSTRAINT operations and their solutions:

### Error 1452: Cannot add or update a child row: a foreign key constraint fails

```sql
-- Check for violating rows
SELECT * FROM child_table
WHERE child_column NOT IN (
    SELECT parent_column FROM parent_table
);

-- Fix the violating rows before adding constraint
UPDATE child_table
SET child_column = NULL
WHERE child_column NOT IN (
    SELECT parent_column FROM parent_table
);

-- Or insert missing parent rows
INSERT INTO parent_table (parent_column)
SELECT DISTINCT child_column
FROM child_table
WHERE child_column NOT IN (
    SELECT parent_column FROM parent_table
);
```

### Error 1062: Duplicate entry for key

This occurs when adding a unique constraint and duplicate values exist:

```sql
-- Find duplicate values
SELECT column_name, COUNT(*)
FROM table_name
GROUP BY column_name
HAVING COUNT(*) > 1;

-- Fix duplicate values before adding constraint
UPDATE table_name
SET column_name = CONCAT(column_name, '_', id)
WHERE column_name IN (
    SELECT column_name FROM (
        SELECT column_name, COUNT(*)
        FROM table_name
        GROUP BY column_name
        HAVING COUNT(*) > 1
    ) t
);
```

### Error 3819: Check constraint is violated

When adding a check constraint, existing data might violate it:

```sql
-- Find violating rows
SELECT * FROM employees
WHERE salary <= 0;

-- Update data to satisfy constraint before adding it
UPDATE employees
SET salary = 1000 WHERE salary <= 0;

-- Then add the check constraint
ALTER TABLE employees
ADD CONSTRAINT chk_salary_positive CHECK (salary > 0);
```

### Error 1064: Syntax error when adding constraints

```sql
-- Make sure you're using the correct syntax for your MySQL version
-- Especially for CHECK constraints which were only added in 8.0.16

-- Check your MySQL version
SELECT VERSION();
```

## Best Practices

1. **Database Backup**: Always back up your database before adding constraints.

2. **Test Environment**: Test constraint additions in a development environment first.

3. **Data Validation**: Validate data before adding constraints to prevent failures.

   ```sql
   -- Example: Validate before adding NOT NULL constraint
   SELECT COUNT(*) FROM users WHERE email IS NULL;
   ```

4. **Transaction Safety**: Consider wrapping operations in transactions where possible.

   ```sql
   START TRANSACTION;

   ALTER TABLE orders
   ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id)
   REFERENCES customers (id);

   -- Validate changes or perform additional operations

   COMMIT;
   -- OR ROLLBACK if needed
   ```

5. **Indexes**: Consider adding indexes before foreign keys for better performance.

6. **Application Coordination**: Schedule constraint changes during application maintenance windows.

7. **Documentation**: Keep documentation of your schema constraints and their purposes.
