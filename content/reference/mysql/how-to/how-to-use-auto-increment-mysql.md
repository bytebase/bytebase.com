---
title: How to use AUTO_INCREMENT in MySQL
---

_Official documentation: [AUTO_INCREMENT Handling in InnoDB](https://dev.mysql.com/doc/refman/8.0/en/innodb-auto-increment-handling.html)_

## What is AUTO_INCREMENT?

AUTO_INCREMENT is a column attribute in MySQL that automatically generates a unique identity for new rows. When you insert a new record without specifying a value for an AUTO_INCREMENT column, MySQL automatically assigns the next sequential value. This feature is commonly used for primary keys to ensure each row has a unique identifier.

## Creating Tables with AUTO_INCREMENT

### Basic Usage

```sql
-- Create a table with an AUTO_INCREMENT primary key
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2)
);

-- Insert without specifying ID (auto-generated)
INSERT INTO products (name, price) VALUES ('Widget', 19.99);
```

### Key Requirements

For a column to use AUTO_INCREMENT:

1. It must be indexed (typically as a PRIMARY KEY or with a UNIQUE constraint)
2. It must be defined as an integer type (TINYINT, SMALLINT, INT, BIGINT, etc.)
3. It should normally be defined as NOT NULL

## Working with AUTO_INCREMENT Columns

### Inserting Data

```sql
-- Let MySQL generate the ID
INSERT INTO products (name, price)
VALUES ('Widget', 19.99);

-- Explicitly set ID (use with caution)
INSERT INTO products (id, name, price)
VALUES (100, 'Special Widget', 29.99);

-- Insert multiple rows
INSERT INTO products (name, price) VALUES
('Product A', 10.99),
('Product B', 20.99),
('Product C', 30.99);

-- Get the last inserted ID
SELECT LAST_INSERT_ID();
```

### Viewing AUTO_INCREMENT Information

```sql
-- Get the current AUTO_INCREMENT value for a table
SHOW TABLE STATUS LIKE 'products'\G

-- Alternative method using information_schema
SELECT AUTO_INCREMENT
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'your_database'
AND TABLE_NAME = 'products';
```

### Modifying AUTO_INCREMENT Value

```sql
-- Change the next AUTO_INCREMENT value
ALTER TABLE products AUTO_INCREMENT = 1000;
```

## AUTO_INCREMENT Behavior and Constraints

### Handling Gaps

AUTO_INCREMENT values might contain gaps due to:

- Rolled back transactions
- Deleted rows
- Explicit ID assignments
- Failed inserts

These gaps are normal and typically shouldn't be a concern.

### Maximum Values

Each integer type has a maximum value:

| Type     | Maximum Value                                                             | Storage Size |
| -------- | ------------------------------------------------------------------------- | ------------ |
| TINYINT  | 127 (signed), 255 (unsigned)                                              | 1 byte       |
| SMALLINT | 32,767 (signed), 65,535 (unsigned)                                        | 2 bytes      |
| INT      | 2,147,483,647 (signed), 4,294,967,295 (unsigned)                          | 4 bytes      |
| BIGINT   | 9,223,372,036,854,775,807 (signed), 18,446,744,073,709,551,615 (unsigned) | 8 bytes      |

Always choose an appropriate size based on expected data volume.

## Best Practices

1. **Use UNSIGNED for Positive IDs**: Since IDs are never negative, use UNSIGNED to double the available range:

   ```sql
   CREATE TABLE customers (
       id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL
   );
   ```

2. **Choose Appropriate Integer Type**: Select the integer type based on expected table size:

   - TINYINT for very small tables (< 255 rows)
   - SMALLINT for small tables (< 65K rows)
   - INT for most tables (< 4B rows)
   - BIGINT for extremely large tables

3. **Add AUTO_INCREMENT Last in Multi-Column Keys**: When using composite primary keys:

   ```sql
   CREATE TABLE order_items (
       order_id INT,
       item_number INT AUTO_INCREMENT,
       product_id INT,
       quantity INT,
       PRIMARY KEY (order_id, item_number)
   );
   ```

4. **Handle Sequence Resets After Import**: After data import, reset AUTO_INCREMENT to continue after the highest existing ID:

   ```sql
   -- After importing data
   ALTER TABLE products AUTO_INCREMENT = 1; -- Will set to MAX(id)+1
   ```

5. **Use AUTO_INCREMENT Only When Needed**: Not every table needs an artificial key; consider natural keys where appropriate.

## Common Issues and Solutions

### AUTO_INCREMENT Reset After Server Restart

In some MySQL versions/configurations, AUTO_INCREMENT values may reset after server restart:

```sql
-- Check if innodb_autoinc_lock_mode is set appropriately
SHOW VARIABLES LIKE 'innodb_autoinc_lock_mode';

-- Make sure AUTO_INCREMENT value is properly set after restart
ALTER TABLE products AUTO_INCREMENT = (SELECT MAX(id) + 1 FROM products);
```

### Duplicate Key Errors

When restoring data or performing migrations:

```sql
-- Find maximum ID
SELECT MAX(id) FROM products;

-- Reset AUTO_INCREMENT to avoid conflicts
ALTER TABLE products AUTO_INCREMENT = 1000; -- Choose value higher than MAX(id)
```

### Performance Considerations

For high-throughput insert operations, consider these settings:

```sql
-- Check current AUTO_INCREMENT lock mode
SHOW VARIABLES LIKE 'innodb_autoinc_lock_mode';

-- For better concurrency (MySQL 8.0+), use mode 2
-- Note: Set in configuration file, not at runtime
-- innodb_autoinc_lock_mode = 2
```

### Overflow Issues

When an AUTO_INCREMENT column reaches its maximum value:

```sql
-- Migrate to a larger integer type
ALTER TABLE products
MODIFY id BIGINT UNSIGNED AUTO_INCREMENT;
```

<HintBlock type="warning">

Changing the data type of an AUTO_INCREMENT column on large tables can be disruptive. Consider using best practices for altering large tables.

</HintBlock>

## Advanced Techniques

### Auto-Incrementing Within Groups

For sequences within groups (e.g., item numbers within orders):

```sql
CREATE TABLE order_items (
    order_id INT,
    item_number INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, item_number)
);

-- Before inserting, get the next sequence
DELIMITER //
CREATE PROCEDURE insert_order_item(IN p_order_id INT, IN p_product_id INT, IN p_quantity INT)
BEGIN
    DECLARE next_item_number INT;

    -- Get next item number for this order
    SELECT IFNULL(MAX(item_number), 0) + 1
    INTO next_item_number
    FROM order_items
    WHERE order_id = p_order_id;

    -- Insert the record
    INSERT INTO order_items (order_id, item_number, product_id, quantity)
    VALUES (p_order_id, next_item_number, p_product_id, p_quantity);
END //
DELIMITER ;
```

### Generating Sequential Values Without AUTO_INCREMENT

For tables not requiring AUTO_INCREMENT primary keys but needing sequential values:

```sql
CREATE TABLE events (
    id CHAR(36) PRIMARY KEY,  -- UUID primary key
    sequence_num INT,         -- Sequential counter
    event_type VARCHAR(50),
    event_data JSON
);

-- Use triggers to maintain sequence
DELIMITER //
CREATE TRIGGER before_insert_events
BEFORE INSERT ON events
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
    SET NEW.sequence_num = (SELECT IFNULL(MAX(sequence_num), 0) + 1 FROM events);
END //
DELIMITER ;
```

## MySQL vs Other Databases

### Comparison to PostgreSQL SERIAL

While similar in purpose, MySQL's AUTO_INCREMENT and PostgreSQL's SERIAL have key differences:

1. MySQL's AUTO_INCREMENT:

   - Is an attribute added to a column
   - Requires an index on the column
   - Is controlled via table options

2. PostgreSQL's SERIAL:

   - Creates a sequence object
   - Links that sequence as the default value
   - Uses independent sequence objects

<HintBlock type="info">

When working with both MySQL and PostgreSQL databases, Bytebase's [SQL review policies](https://docs.bytebase.com/sql-review/review-policy/) can help enforce consistent auto-incrementing column conventions across different database engines.

</HintBlock>

## References

- [MySQL Documentation: AUTO_INCREMENT](https://dev.mysql.com/doc/refman/8.0/en/example-auto-increment.html)
- [InnoDB AUTO_INCREMENT Handling](https://dev.mysql.com/doc/refman/8.0/en/innodb-auto-increment-handling.html)
- [MySQL AUTO_INCREMENT Lock Modes](https://dev.mysql.com/doc/refman/8.0/en/innodb-auto-increment-lock-modes.html)
- [How to Choose between UUID and Auto Increment Integer](/blog/choose-primary-key-uuid-or-auto-increment/)
