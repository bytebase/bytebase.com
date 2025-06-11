---
title: How to CREATE TABLE in Postgres
updated_at: 2025/03/10 09:00:00
---

_Official documentation: [CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html)_

## Basic Syntax

```sql
CREATE TABLE [IF NOT EXISTS] table_name (
   column_name data_type [constraints],
   column_name data_type [constraints],
   ...
);
```

## Performance Considerations

<HintBlock type="info">

When designing tables, consider future growth and query patterns. Poor table design can lead to performance issues that are difficult to fix later.

Organizations often enforce schema standards. You can implement [approval processes](https://docs.bytebase.com/administration/custom-approval/) or [automated schema reviews](https://docs.bytebase.com/sql-review/review-rules/#column) via Bytebase.

</HintBlock>

1. **Choose Appropriate Data Types**: Select the smallest data type that can reliably store your data.

2. **Index Planning**: Design tables with indexing strategies in mind. Not all columns need indexes.

3. **Normalization Balance**: Consider the appropriate level of normalization for your use case.

4. **Partitioning Strategy**: For large tables, plan partitioning from the beginning.

## Creating a Basic Table

```sql
-- Create a simple table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary NUMERIC(10,2)
);
```

## Data Types

### Numeric Types

```sql
CREATE TABLE product_metrics (
    -- Integer types
    product_id INT,
    small_value SMALLINT,  -- 2 bytes
    regular_int INTEGER,   -- 4 bytes
    big_number BIGINT,     -- 8 bytes

    -- Decimal types
    unit_price NUMERIC(10,2),  -- 10 digits total, 2 after decimal
    discount DECIMAL(5,2),     -- Same as NUMERIC

    -- Floating point
    approximate_value REAL,        -- 4 bytes
    precise_value DOUBLE PRECISION -- 8 bytes
);
```

### Character Types

```sql
CREATE TABLE content (
    -- Fixed length
    code CHAR(3),              -- Padded with spaces

    -- Variable length with limit
    title VARCHAR(200),        -- No padding

    -- Unlimited length
    description TEXT,

    -- Binary data
    image BYTEA
);
```

### Date/Time Types

```sql
CREATE TABLE events (
    event_date DATE,                   -- Date only: YYYY-MM-DD
    event_time TIME,                   -- Time only: HH:MM:SS
    event_timestamp TIMESTAMP,         -- Date and time
    event_with_tz TIMESTAMPTZ,         -- With timezone
    duration INTERVAL                  -- Time periods
);
```

### Other Common Types

```sql
CREATE TABLE miscellaneous (
    is_active BOOLEAN,
    user_role user_role_enum,          -- Enum type (must be created first)
    location POINT,                    -- Geometric type
    tags JSONB,                        -- JSON with binary storage
    ip_address INET,                   -- IP network address
    uuid_col UUID                      -- Universally unique identifier
);
```

## Constraints

### Primary Key

```sql
-- Single column primary key
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
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
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE RESTRICT
);

-- With named constraint and custom actions
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
        REFERENCES orders (order_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products (product_id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);
```

### Unique Constraints

```sql
-- Single column unique constraint
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
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
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) CHECK (price > 0),
    discount NUMERIC(3,2) CHECK (discount >= 0 AND discount <= 0.5),
    weight NUMERIC(5,2),
    dimensions VARCHAR(100),
    CONSTRAINT valid_product CHECK (
        (weight IS NOT NULL AND weight > 0) OR
        (dimensions IS NOT NULL)
    )
);
```

### NOT NULL Constraint

```sql
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    CONSTRAINT contact_method CHECK (phone IS NOT NULL OR email IS NOT NULL)
);
```

### Default Values

```sql
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detail JSONB DEFAULT '{}'::jsonb
);
```

## Table Storage Options

```sql
-- Create table with specific storage parameters
CREATE TABLE large_dataset (
    id SERIAL PRIMARY KEY,
    data TEXT
)
WITH (
    fillfactor = 70,
    autovacuum_enabled = true
);

-- Create table in specific tablespace
CREATE TABLE archive_data (
    id SERIAL PRIMARY KEY,
    archived_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data JSONB
)
TABLESPACE archive_space;
```

## Temporary Tables

```sql
-- Create a temporary table that disappears at end of session
CREATE TEMPORARY TABLE temp_results (
    id INT,
    result TEXT,
    score NUMERIC(5,2)
);

-- Temporary table with specific behavior
CREATE TEMPORARY TABLE temp_import (
    data JSONB
)
ON COMMIT DELETE ROWS; -- Delete rows at end of transaction
```

## Table Inheritance

```sql
-- Create parent table
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT
);

-- Create child table inheriting from parent
CREATE TABLE system_logs (
    source VARCHAR(50),
    severity VARCHAR(10)
) INHERITS (logs);
```

## Partitioned Tables

```sql
-- Create partitioned table by range
CREATE TABLE measurements (
    id SERIAL,
    measure_date DATE NOT NULL,
    value NUMERIC(10,2)
) PARTITION BY RANGE (measure_date);

-- Create partitions
CREATE TABLE measurements_y2023 PARTITION OF measurements
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE measurements_y2024 PARTITION OF measurements
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- Create partitioned table by list
CREATE TABLE sales (
    id SERIAL,
    region VARCHAR(20) NOT NULL,
    amount NUMERIC(10,2)
) PARTITION BY LIST (region);

-- Create partitions
CREATE TABLE sales_north PARTITION OF sales
    FOR VALUES IN ('NORTH', 'NORTHEAST');

CREATE TABLE sales_south PARTITION OF sales
    FOR VALUES IN ('SOUTH', 'SOUTHEAST');
```

## IF NOT EXISTS Clause

```sql
-- Create table only if it doesn't already exist
CREATE TABLE IF NOT EXISTS backup_logs (
    id SERIAL PRIMARY KEY,
    backup_date TIMESTAMP,
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
CREATE TABLE customer_archive AS
SELECT * FROM customers WHERE 1=0;
```

## Generated Columns

```sql
-- Create a table with generated columns (PostgreSQL 12+)
CREATE TABLE rectangles (
    id SERIAL PRIMARY KEY,
    width NUMERIC(5,2) NOT NULL,
    height NUMERIC(5,2) NOT NULL,
    area NUMERIC(10,2) GENERATED ALWAYS AS (width * height) STORED
);
```

## Common Errors and Solutions

See [Postgres Error Reference](/reference/postgres/error/overview/) for errors you may encounter.

Here are the most common errors you might face when creating tables and how to solve them:

### relation already exists

```sql
-- Use IF NOT EXISTS to prevent errors
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE
);
```

### type does not exist

```sql
-- Create custom type first
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'banned');

-- Then use in table creation
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    status user_status DEFAULT 'active'
);
```

### value too long for type character varying(N)

```sql
-- Make sure to use appropriate lengths for VARCHAR
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100), -- Adjust based on expected data
    description TEXT   -- Use TEXT for unlimited length
);
```
