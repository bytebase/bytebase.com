---
title: How to Use SERIAL in PostgreSQL
---

_Official documentation: [Serial Types](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL)_

## What is SERIAL?

SERIAL is a notational convenience for creating unique identifier columns in PostgreSQL. It creates an auto-incrementing integer column, commonly used for primary keys. When you declare a column as SERIAL, PostgreSQL automatically:

1. Creates a sequence object
2. Sets the column default to draw from that sequence
3. Applies a NOT NULL constraint to the column

<HintBlock type="info">

PostgreSQL 10+ offers the IDENTITY syntax as a modern alternative. For new applications, consider using [IDENTITY columns](/reference/postgres/how-to/how-to-use-identity-column-postgres) which provide better SQL standard compliance.

</HintBlock>

## SERIAL Types

PostgreSQL offers three SERIAL types:

| Type        | Range                          | Storage Size |
| ----------- | ------------------------------ | ------------ |
| SMALLSERIAL | 1 to 32,767                    | 2 bytes      |
| SERIAL      | 1 to 2,147,483,647             | 4 bytes      |
| BIGSERIAL   | 1 to 9,223,372,036,854,775,807 | 8 bytes      |

## Creating Tables with SERIAL

### Basic Usage

```sql
-- Create a table with a SERIAL primary key
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2)
);

-- Insert without specifying ID (auto-generated)
INSERT INTO products (name, price) VALUES ('Widget', 19.99);
```

### What Happens Behind the Scenes

When you create a SERIAL column, PostgreSQL actually executes commands similar to:

```sql
-- What happens when you use SERIAL
CREATE SEQUENCE products_id_seq;
CREATE TABLE products (
    id INTEGER NOT NULL DEFAULT nextval('products_id_seq'),
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2)
);
ALTER SEQUENCE products_id_seq OWNED BY products.id;
```

## Working with SERIAL Columns

### Inserting Data

```sql
-- Let PostgreSQL generate the ID
INSERT INTO products (name, price)
VALUES ('Widget', 19.99)
RETURNING id;

-- Explicitly set ID (use with caution)
INSERT INTO products (id, name, price)
VALUES (100, 'Special Widget', 29.99);
```

### Managing Sequences

```sql
-- View sequence information
SELECT * FROM pg_sequences
WHERE sequencename = 'products_id_seq';

-- Get current sequence value
SELECT currval('products_id_seq');

-- Reset sequence to start from a specific value
ALTER SEQUENCE products_id_seq RESTART WITH 1000;

-- Change increment value
ALTER SEQUENCE products_id_seq INCREMENT BY 10;
```

## Best Practices & Common Solutions

### Choose the Right SERIAL Type

Select the appropriate type based on expected table size:

- **SMALLSERIAL**: Tables with fewer than 32K rows
- **SERIAL**: Most tables (up to 2 billion rows)
- **BIGSERIAL**: Tables that may exceed 2 billion rows

### Understanding Sequence Gaps

SERIAL values may have gaps due to:

- Rolled back transactions
- Failed inserts
- Explicit ID assignments

This is normal behavior and shouldn't be considered an error.

### After Data Import: Sync Sequences

After importing data, always update the sequence to continue from the highest ID:

```sql
-- Find the maximum ID value
SELECT MAX(id) FROM products;

-- Update the sequence to continue after the max value
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
```

### Avoiding Duplicate Key Violations

When restoring data or performing migrations:

```sql
-- Check current sequence value
SELECT last_value FROM products_id_seq;

-- Update sequence to avoid conflicts
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products) + 1);
```

### Performance Optimization

For high-throughput applications:

```sql
-- Increase sequence cache for better performance
ALTER SEQUENCE products_id_seq CACHE 100;

-- For bulk inserts, pre-allocate sequence values
SELECT nextval('products_id_seq')
FROM generate_series(1, 1000);
```

## Summary

SERIAL provides a convenient way to create auto-incrementing primary keys in PostgreSQL. Key points to remember:

- Choose the appropriate SERIAL type based on expected table size
- Understand that sequence values may have gaps (this is normal)
- Always sync sequences after data imports to avoid conflicts
- Consider performance optimizations for high-volume applications

For new PostgreSQL applications (version 10+), consider [converting to IDENTITY columns](/reference/postgres/how-to/how-to-use-identity-column-postgres/#migration-between-serial-and-identity) as a modern alternative to SERIAL.
