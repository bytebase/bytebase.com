---
title: How to ALTER TABLE in MySQL
updated_at: 2025/03/10 09:00:00
---

_Official documentation: [ALTER TABLE](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html)_

## Performance Considerations

<HintBlock type="info">

ALTER TABLE operations should be conducted with care as many operations will rebuild the entire table and may lock it for a long time, causing service outage.

Some organizations have strict approval processes. You can enforce [approval process](/docs/administration/custom-approval/) or [automated review](/docs/sql-review/review-rules/#column) via Bytebase.

</HintBlock>

1. **Lock Duration**: Many ALTER TABLE commands in MySQL rebuild the entire table, which can cause long-lasting locks.

2. **Online DDL**: Use `ALGORITHM` and `LOCK` clauses when available to minimize disruption.

3. **Transaction Size**: Large alterations can generate significant undo logs.

4. **Proper Planning**: Schedule major alterations during off-peak hours.

```sql
-- Example of using ALGORITHM and LOCK options
ALTER TABLE users
ADD INDEX idx_email (email),
ALGORITHM=INPLACE, LOCK=NONE;
```

## Renaming a Table

```sql
-- Rename a table
ALTER TABLE old_table_name
RENAME TO new_table_name;

-- Alternative syntax
RENAME TABLE old_table_name TO new_table_name;
```

## Column Operations

### Adding Columns

```sql
-- Add a simple column
ALTER TABLE employees
ADD COLUMN email VARCHAR(100);

-- Add a column with constraints
ALTER TABLE products
ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0;

-- Add multiple columns at once
ALTER TABLE customers
ADD COLUMN phone VARCHAR(20),
ADD COLUMN fax VARCHAR(20),
ADD COLUMN preferred_contact VARCHAR(10);

-- Add column at specific position
ALTER TABLE users
ADD COLUMN date_of_birth DATE AFTER name;

-- Add column as first column
ALTER TABLE orders
ADD COLUMN order_ref VARCHAR(20) FIRST;
```

### Removing Columns

```sql
-- Remove a column
ALTER TABLE employees
DROP COLUMN middle_name;

-- Remove multiple columns
ALTER TABLE legacy_data
DROP COLUMN obsolete_col1,
DROP COLUMN obsolete_col2;
```

### Renaming Columns

```sql
-- Rename a column
ALTER TABLE products
CHANGE COLUMN product_name name VARCHAR(100);

-- Rename without changing definition
ALTER TABLE users
RENAME COLUMN username TO login_name;
```

### Changing Column Data Types

```sql
-- Change column data type
ALTER TABLE products
MODIFY COLUMN description TEXT;

-- Change data type and constraints
ALTER TABLE orders
MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending';

-- Complete column redefinition
ALTER TABLE customers
CHANGE COLUMN address address_line VARCHAR(200) NULL;
```

### Modifying Column Constraints

```sql
-- Add NOT NULL constraint
ALTER TABLE users
MODIFY COLUMN email VARCHAR(100) NOT NULL;

-- Drop NOT NULL constraint
ALTER TABLE orders
MODIFY COLUMN shipping_address VARCHAR(200) NULL;

-- Set default value
ALTER TABLE products
ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

-- Drop default value
ALTER TABLE employees
ALTER COLUMN status DROP DEFAULT;
```

## Constraint Operations

### Adding Constraints

```sql
-- Add primary key
ALTER TABLE products
ADD PRIMARY KEY (product_id);

-- Add unique constraint
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

-- Add check constraint (MySQL 8.0.16+)
ALTER TABLE employees
ADD CONSTRAINT valid_salary CHECK (salary > 0);

-- Add foreign key
ALTER TABLE orders
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id)
REFERENCES customers (id);

-- Add composite unique constraint
ALTER TABLE order_items
ADD UNIQUE KEY unique_order_product (order_id, product_id);
```

### Removing Constraints

```sql
-- Remove index (including unique constraints)
ALTER TABLE products
DROP INDEX unique_sku;

-- Remove primary key
ALTER TABLE users
DROP PRIMARY KEY;

-- Remove foreign key
ALTER TABLE orders
DROP FOREIGN KEY fk_customer;

-- Remove check constraint
ALTER TABLE employees
DROP CHECK valid_salary;
```

## Table Storage and Maintenance

### Changing Table Engine

```sql
-- Change storage engine
ALTER TABLE logs
ENGINE = MyISAM;

-- Change to InnoDB
ALTER TABLE transactions
ENGINE = InnoDB;
```

### Changing Character Set and Collation

```sql
-- Change table character set and collation
ALTER TABLE customers
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Change single column
ALTER TABLE products
MODIFY COLUMN description TEXT
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### Table Maintenance

```sql
-- Rebuild table to reclaim space
ALTER TABLE large_table ENGINE = InnoDB;

-- Defragment a table
OPTIMIZE TABLE fragmented_table;

-- Analyze table statistics
ANALYZE TABLE users;
```

## Advanced Operations

### Partitioning Operations

```sql
-- Convert regular table to partitioned table
ALTER TABLE logs
PARTITION BY RANGE (YEAR(log_date)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025)
);

-- Add new partition
ALTER TABLE logs
ADD PARTITION (PARTITION p2025 VALUES LESS THAN (2026));

-- Drop partition
ALTER TABLE logs
DROP PARTITION p2022;

-- Reorganize partitions
ALTER TABLE logs
REORGANIZE PARTITION p2023, p2024 INTO (
    PARTITION p2023_Q1_Q2 VALUES LESS THAN (2023.5),
    PARTITION p2023_Q3_Q4 VALUES LESS THAN (2024)
);
```

### Working with AUTO_INCREMENT

```sql
-- Set auto_increment value
ALTER TABLE orders
AUTO_INCREMENT = 10000;

-- Change auto_increment column
ALTER TABLE products
MODIFY COLUMN product_id INT AUTO_INCREMENT;
```

### Multiple Operations

```sql
-- Perform multiple alterations in one command
ALTER TABLE customers
    ADD COLUMN last_visit DATETIME,
    DROP COLUMN deprecated_field,
    MODIFY COLUMN phone VARCHAR(15),
    ADD INDEX idx_last_visit (last_visit);
```

## Common Errors and Solutions

### Cannot add foreign key constraint

```sql
-- Ensure parent column is indexed
ALTER TABLE customers
ADD INDEX idx_id (id);

-- Ensure data types match exactly
ALTER TABLE orders
MODIFY COLUMN customer_id INT UNSIGNED; -- Match parent column type

-- Check for existing orphaned records
SELECT orders.id
FROM orders
LEFT JOIN customers ON orders.customer_id = customers.id
WHERE customers.id IS NULL;
```

### Specified key was too long

```sql
-- Reduce key length
ALTER TABLE products
DROP INDEX idx_long_description,
ADD INDEX idx_long_description (description(191));

-- Or change table character set
ALTER TABLE products
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;
```

### Lock wait timeout exceeded

```sql
-- Increase lock timeout for the session
SET SESSION innodb_lock_wait_timeout = 300;

-- Consider using online DDL options
ALTER TABLE users
ADD INDEX idx_email (email),
ALGORITHM=INPLACE, LOCK=NONE;

-- Check for blocking transactions
SELECT
    r.trx_id waiting_trx_id,
    r.trx_mysql_thread_id waiting_thread,
    r.trx_query waiting_query,
    b.trx_id blocking_trx_id,
    b.trx_mysql_thread_id blocking_thread,
    b.trx_query blocking_query
FROM information_schema.innodb_lock_waits w
JOIN information_schema.innodb_trx b ON b.trx_id = w.blocking_trx_id
JOIN information_schema.innodb_trx r ON r.trx_id = w.requesting_trx_id;
```

### Row size too large

```sql
-- Check current row format
SHOW TABLE STATUS LIKE 'your_table';

-- Change row format to dynamic
ALTER TABLE large_row_table ROW_FORMAT=DYNAMIC;

-- Move large columns to separate table
CREATE TABLE user_details (
    user_id INT PRIMARY KEY,
    large_blob_data LONGBLOB,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```
