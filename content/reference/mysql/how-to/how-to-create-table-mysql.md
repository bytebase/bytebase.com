---
title: How to CREATE TABLE in MySQL
updated_at: 2025/03/10 09:00:00
---

_Official documentation: [CREATE TABLE](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)_

## Basic Syntax

```sql
CREATE TABLE [IF NOT EXISTS] table_name (
   column_name data_type [constraints],
   column_name data_type [constraints],
   ...
) [table_options];
```

## Performance Considerations

<HintBlock type="info">

When designing tables, consider future growth and query patterns. Poor table design can lead to performance issues that are difficult to fix later. Organizations often enforce schema standards. You can implement [approval processes](/docs/administration/custom-approval/) or [automated schema reviews](/docs/sql-review/review-rules/#column) via Bytebase.

</HintBlock>

1. **Choose Appropriate Data Types**: Select the smallest data type that can reliably store your data.

2. **Storage Engine**: Choose the right storage engine (InnoDB recommended for most use cases).

3. **Index Planning**: Design tables with indexing strategies in mind. Not all columns need indexes.

4. **Partitioning Strategy**: For large tables, plan partitioning from the beginning.

## Creating a Basic Table

```sql
-- Create a simple table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary DECIMAL(10,2)
) ENGINE=InnoDB;
```

## Data Types

### Numeric Types

```sql
CREATE TABLE product_metrics (
    -- Integer types
    product_id INT,
    small_value TINYINT,   -- 1 byte (-128 to 127)
    medium_value SMALLINT, -- 2 bytes
    regular_int INT,       -- 4 bytes
    big_number BIGINT,     -- 8 bytes

    -- Decimal types
    unit_price DECIMAL(10,2),  -- 10 digits total, 2 after decimal
    discount NUMERIC(5,2),     -- Same as DECIMAL in MySQL

    -- Floating point
    approximate_value FLOAT,   -- 4 bytes
    precise_value DOUBLE       -- 8 bytes
);
```

### Character Types

```sql
CREATE TABLE content (
    -- Fixed length
    code CHAR(3),              -- Fixed length, padded with spaces

    -- Variable length with limit
    title VARCHAR(200),        -- Variable length

    -- Unlimited length
    tiny_text TINYTEXT,        -- Max 255 bytes
    description TEXT,          -- Max 65,535 bytes
    medium_content MEDIUMTEXT, -- Max 16MB
    large_content LONGTEXT,    -- Max 4GB

    -- Binary data
    small_binary VARBINARY(100),
    large_binary BLOB          -- Binary Large Object
);
```

### Date/Time Types

```sql
CREATE TABLE events (
    event_date DATE,           -- Date only: YYYY-MM-DD
    event_time TIME,           -- Time only: HH:MM:SS
    event_datetime DATETIME,   -- Date and time
    created_at TIMESTAMP,      -- Timestamp with timezone conversion
    year_only YEAR             -- Year value
);
```

### Other Common Types

```sql
CREATE TABLE miscellaneous (
    is_active BOOLEAN,              -- Synonym for TINYINT(1)
    status ENUM('active',           -- Enumeration type
                'pending',
                'inactive'),
    options SET('option1',          -- Can contain multiple values
                'option2',
                'option3'),
    json_data JSON                  -- JSON type (MySQL 5.7.8+)
);
```

## Constraints

### Primary Key

```sql
-- Single column primary key
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Composite primary key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id)
);
```

### Foreign Keys

```sql
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT
);

-- With named constraint and custom actions
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);
```

### Unique Constraints

```sql
-- Single column unique constraint
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE
);

-- Multi-column unique constraint
CREATE TABLE product_locations (
    product_id INT,
    warehouse_id INT,
    quantity INT NOT NULL,
    CONSTRAINT unique_product_location UNIQUE (product_id, warehouse_id)
);
```

### Check Constraints

```sql
-- Available in MySQL 8.0.16+
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    discount DECIMAL(3,2),
    CHECK (price > 0),
    CHECK (discount >= 0 AND discount <= 0.5),
    CONSTRAINT valid_product CHECK (price > discount)
);
```

### NOT NULL Constraint

```sql
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20)
);
```

### Default Values

```sql
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    detail JSON DEFAULT (JSON_OBJECT())
);
```

## Table Storage Options

### Storage Engines

```sql
-- InnoDB (default): ACID compliant with transaction support
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- MyISAM: Faster for read-heavy workloads with no transaction support
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;

-- MEMORY: In-memory tables for temporary data
CREATE TABLE cache (
    id INT NOT NULL PRIMARY KEY,
    data VARCHAR(1000),
    expiry DATETIME
) ENGINE=MEMORY;
```

### Character Set and Collation

```sql
-- Specify character set and collation
CREATE TABLE multilingual_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200),
    content TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Other Table Options

```sql
CREATE TABLE performance_optimized (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data VARCHAR(1000)
)
ENGINE=InnoDB
AUTO_INCREMENT=1000
MAX_ROWS=1000000
MIN_ROWS=1000
COMMENT='Table for high-performance data';
```

## Temporary Tables

```sql
-- Create a temporary table that disappears when connection ends
CREATE TEMPORARY TABLE temp_results (
    id INT,
    result VARCHAR(100),
    score DECIMAL(5,2)
);
```

## Partitioned Tables

```sql
-- Create partitioned table by range
CREATE TABLE sales (
    id INT AUTO_INCREMENT,
    sale_date DATE NOT NULL,
    amount DECIMAL(10,2),
    PRIMARY KEY(id, sale_date)
)
PARTITION BY RANGE (YEAR(sale_date)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Create partitioned table by list
CREATE TABLE regional_sales (
    id INT AUTO_INCREMENT,
    region VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2),
    PRIMARY KEY(id, region)
)
PARTITION BY LIST COLUMNS(region) (
    PARTITION north VALUES IN ('NORTH', 'NORTHEAST'),
    PARTITION south VALUES IN ('SOUTH', 'SOUTHEAST'),
    PARTITION west VALUES IN ('WEST', 'SOUTHWEST'),
    PARTITION east VALUES IN ('EAST')
);

-- Create partitioned table by hash
CREATE TABLE records (
    id INT NOT NULL,
    data VARCHAR(100),
    PRIMARY KEY(id)
)
PARTITION BY HASH(id)
PARTITIONS 4;
```

## IF NOT EXISTS Clause

```sql
-- Create table only if it doesn't already exist
CREATE TABLE IF NOT EXISTS backup_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    backup_date DATETIME,
    file_count INT,
    status VARCHAR(20)
);
```

## Creating Tables from Queries

```sql
-- Create a table from a SELECT query
CREATE TABLE active_customers AS
SELECT id, name, email, last_order_date
FROM customers
WHERE status = 'active';

-- Create a table structure without data
CREATE TABLE customer_archive LIKE customers;
```

## Generated Columns

```sql
-- Create a table with generated columns (MySQL 5.7+)
CREATE TABLE rectangles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    width DECIMAL(5,2) NOT NULL,
    height DECIMAL(5,2) NOT NULL,
    area DECIMAL(10,2) AS (width * height) STORED,
    perimeter DECIMAL(10,2) AS (2 * (width + height)) VIRTUAL
);
```

## Common Errors and Solutions

See [MySQL Error Reference](/reference/mysql/error/overview/) for errors you may encounter.

Here are the most common errors you might face when creating tables and how to solve them:

### Table already exists

```sql
-- Use IF NOT EXISTS to prevent errors
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE
);
```

### Foreign key constraint is incorrectly formed

```sql
-- Ensure parent column has a matching index
CREATE TABLE parent (
    id INT NOT NULL,
    PRIMARY KEY (id)
);

-- Foreign key column data types must match exactly
CREATE TABLE child (
    id INT,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES parent(id)
);
```

### Row size too large

```sql
-- Use appropriate data types and table formats
CREATE TABLE large_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Use VARCHAR instead of CHAR for large text
    description VARCHAR(1000) NOT NULL,
    -- Use BLOB or TEXT for very large data
    content MEDIUMTEXT
) ROW_FORMAT=DYNAMIC;
```

### Specified key was too long

```sql
-- Reduce index key length or use prefix indexing
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    INDEX idx_description (description(255))
);
```
