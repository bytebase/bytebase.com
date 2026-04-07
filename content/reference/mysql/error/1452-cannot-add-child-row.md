---
title: 'ERROR 1452 (23000): Cannot Add or Update a Child Row in MySQL'
---

## Error Message

```sql
ERROR 1452 (23000): Cannot add or update a child row:
a foreign key constraint fails (`mydb`.`orders`, CONSTRAINT `fk_orders_customer`
FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`))
```

Other common variations:

```sql
ERROR 1452 (23000): Cannot add or update a child row:
a foreign key constraint fails (`mydb`.`order_items`, CONSTRAINT `fk_items_order`
FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE)
```

## What Triggers This Error

MySQL 1452 fires when an INSERT or UPDATE tries to set a foreign key column to a value that doesn't exist in the referenced parent table. The fix depends on why the parent row is missing or unmatched:

- **Parent row doesn't exist** — inserting a FK value with no matching row in the parent table
- **Data type mismatch** — FK column and referenced column have different types (INT vs BIGINT, signed vs unsigned)
- **Character set or collation mismatch** — parent and child columns use different character sets
- **Self-referencing foreign key** — inserting a row that references itself or a not-yet-inserted row
- **Bulk import with wrong insertion order** — child rows loaded before parent rows

## Fix by Scenario

### Parent row doesn't exist

The most common cause. You're inserting a row with a `customer_id` of 42, but there's no customer with `id = 42` in the parent table.

```sql
-- Check if the referenced parent row exists
SELECT id FROM customers WHERE id = 42;
-- Empty result = that's your problem

-- Option 1: insert the parent row first
INSERT INTO customers (id, name) VALUES (42, 'Acme Corp');
INSERT INTO orders (customer_id, total) VALUES (42, 99.99);

-- Option 2: if the parent was deleted, check if it's expected
-- Maybe the application should use ON DELETE SET NULL instead of RESTRICT
```

If parent rows are frequently missing due to race conditions in concurrent inserts, wrap the parent + child inserts in a single transaction:

```sql
START TRANSACTION;
INSERT INTO customers (id, name) VALUES (42, 'Acme Corp');
INSERT INTO orders (customer_id, total) VALUES (42, 99.99);
COMMIT;
```

### Data type mismatch between FK columns

The FK column and the referenced column must have the exact same data type. A common trap: `INT UNSIGNED` in the parent vs `INT` (signed) in the child, or `INT` vs `BIGINT`.

```sql
-- Check column types for both tables
SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'mydb'
  AND ((TABLE_NAME = 'customers' AND COLUMN_NAME = 'id')
    OR (TABLE_NAME = 'orders' AND COLUMN_NAME = 'customer_id'));

-- Example output showing the mismatch:
-- customers | id          | int unsigned
-- orders    | customer_id | int          <-- signed vs unsigned
```

**Fix:** Alter the child column to match the parent exactly:

```sql
-- Drop the FK, fix the type, re-add the FK
ALTER TABLE orders DROP FOREIGN KEY fk_orders_customer;
ALTER TABLE orders MODIFY customer_id INT UNSIGNED NOT NULL;
ALTER TABLE orders ADD CONSTRAINT fk_orders_customer
  FOREIGN KEY (customer_id) REFERENCES customers(id);
```

### Character set or collation mismatch

For string-type foreign keys (e.g., `VARCHAR` codes), both columns must use the same character set and collation. A `utf8mb4` parent with a `utf8` child will fail.

```sql
-- Check character set and collation for both columns
SELECT TABLE_NAME, COLUMN_NAME, CHARACTER_SET_NAME, COLLATION_NAME
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'mydb'
  AND COLUMN_NAME IN ('country_code')
  AND TABLE_NAME IN ('countries', 'addresses');

-- Example mismatch:
-- countries | country_code | utf8mb4 | utf8mb4_general_ci
-- addresses | country_code | utf8    | utf8_general_ci
```

**Fix:**

```sql
ALTER TABLE addresses DROP FOREIGN KEY fk_addresses_country;
ALTER TABLE addresses MODIFY country_code VARCHAR(3)
  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;
ALTER TABLE addresses ADD CONSTRAINT fk_addresses_country
  FOREIGN KEY (country_code) REFERENCES countries(country_code);
```

### Self-referencing foreign key

A table that references itself (e.g., an `employees` table with `manager_id` → `id`). The first row fails because there's no parent row yet.

```sql
-- This fails: manager_id=1 doesn't exist yet
INSERT INTO employees (id, name, manager_id) VALUES (1, 'CEO', 1);

-- ERROR 1452: Cannot add or update a child row
```

**Fix:** Insert the root row with `NULL` for the self-reference, then update it:

```sql
-- Option 1: allow NULL for the root
INSERT INTO employees (id, name, manager_id) VALUES (1, 'CEO', NULL);

-- Option 2: temporarily disable FK checks (use with caution)
SET FOREIGN_KEY_CHECKS = 0;
INSERT INTO employees (id, name, manager_id) VALUES (1, 'CEO', 1);
SET FOREIGN_KEY_CHECKS = 1;
```

For hierarchical data, it's common practice to allow `NULL` on the self-referencing FK to represent the root node.

### Bulk import with wrong insertion order

When loading data from a dump or CSV, child table rows loaded before their parent rows will fail. This is the most common cause during migrations.

```sql
-- This fails because orders references customers, but customers isn't loaded yet
LOAD DATA INFILE 'orders.csv' INTO TABLE orders;

-- ERROR 1452: Cannot add or update a child row
```

**Fix:**

```sql
-- Option 1: load tables in dependency order
LOAD DATA INFILE 'customers.csv' INTO TABLE customers;
LOAD DATA INFILE 'orders.csv' INTO TABLE orders;
LOAD DATA INFILE 'order_items.csv' INTO TABLE order_items;

-- Option 2: disable FK checks during the entire import
SET FOREIGN_KEY_CHECKS = 0;
LOAD DATA INFILE 'order_items.csv' INTO TABLE order_items;
LOAD DATA INFILE 'orders.csv' INTO TABLE orders;
LOAD DATA INFILE 'customers.csv' INTO TABLE customers;
SET FOREIGN_KEY_CHECKS = 1;

-- IMPORTANT: verify data integrity after re-enabling
-- Find orphaned child rows
SELECT o.id, o.customer_id
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
WHERE c.id IS NULL;
```

`mysqldump` handles this automatically by adding `SET FOREIGN_KEY_CHECKS = 0` at the top of the dump file.

## Prevention

- Always insert parent rows before child rows — enforce this in your application's data layer
- Use consistent data types for FK columns — prefer `BIGINT UNSIGNED` for all ID columns across the schema
- Standardize on `utf8mb4` and a single collation across all tables
- When writing migration scripts, order the inserts by table dependency (parents first)
- After bulk imports with `FOREIGN_KEY_CHECKS = 0`, always run integrity checks to find orphaned rows

<HintBlock type="info">

Bytebase's [SQL Review](https://docs.bytebase.com/sql-review/review-rules/) can enforce consistent column types across foreign key relationships during schema change review. See also [ERROR 1451: Cannot Delete or Update a Parent Row](/reference/mysql/error/1451-cannot-delete-parent-row) for the reverse direction (deleting a parent that has children).

</HintBlock>
