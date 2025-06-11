---
title: How to ALTER COLUMN TYPE in MySQL
updated_at: 2025/03/17 12:00:00
---

_Official documentation: [ALTER TABLE](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html)_

## Basic Syntax

MySQL provides two primary methods to change a column's data type:

```sql
-- Using MODIFY
ALTER TABLE table_name
MODIFY COLUMN column_name new_data_type;

-- Using CHANGE (allows renaming the column)
ALTER TABLE table_name
CHANGE COLUMN old_column_name new_column_name new_data_type;
```

## Simple Type Conversions

For straightforward conversions:

```sql
-- Change an integer column to bigint
ALTER TABLE orders
MODIFY COLUMN order_id BIGINT;

-- Change a varchar column to text
ALTER TABLE customers
MODIFY COLUMN notes TEXT;

-- Change a float column to decimal with precision
ALTER TABLE products
MODIFY COLUMN price DECIMAL(10,2);
```

## String Type Conversions

```sql
-- VARCHAR to TEXT (no data loss)
ALTER TABLE messages
MODIFY COLUMN content TEXT;

-- VARCHAR to CHAR (fixed length)
ALTER TABLE countries
MODIFY COLUMN country_code CHAR(2);

-- TEXT to VARCHAR with potential truncation
ALTER TABLE products
MODIFY COLUMN description VARCHAR(255);
```

## Numeric Type Conversions

```sql
-- Integer to BIGINT (safe, no data loss)
ALTER TABLE measurements
MODIFY COLUMN value BIGINT;

-- DECIMAL to INTEGER (truncation of fractional part)
ALTER TABLE products
MODIFY COLUMN price INT;

-- FLOAT to DECIMAL (fixed precision)
ALTER TABLE financial
MODIFY COLUMN amount DECIMAL(15,2);
```

## Date and Time Conversions

```sql
-- DATETIME to DATE (drops time portion)
ALTER TABLE events
MODIFY COLUMN event_datetime DATE;

-- DATE to DATETIME
ALTER TABLE appointments
MODIFY COLUMN appointment_date DATETIME;

-- TIMESTAMP to DATETIME
ALTER TABLE logs
MODIFY COLUMN log_time DATETIME;

-- Converting string to date/time
ALTER TABLE imported_events
MODIFY COLUMN event_date DATE;
```

## ENUM and SET Conversions

```sql
-- Converting VARCHAR to ENUM
ALTER TABLE tickets
MODIFY COLUMN status ENUM('open', 'in_progress', 'closed', 'cancelled');

-- Expanding an existing ENUM
ALTER TABLE products
MODIFY COLUMN size ENUM('small', 'medium', 'large', 'extra-large');

-- Converting to SET type
ALTER TABLE users
MODIFY COLUMN roles SET('admin', 'editor', 'viewer');
```

## JSON Conversions

MySQL 5.7+ supports JSON data type:

```sql
-- Converting TEXT to JSON
ALTER TABLE configurations
MODIFY COLUMN config JSON;

-- Converting VARCHAR to JSON
ALTER TABLE api_responses
MODIFY COLUMN response JSON;
```

## Handling Special Cases

### Converting with Default Values

```sql
-- Set default value during conversion
ALTER TABLE users
MODIFY COLUMN status VARCHAR(20) DEFAULT 'active';

-- Update NULL values before conversion to NOT NULL
UPDATE users SET last_login = '1970-01-01' WHERE last_login IS NULL;
ALTER TABLE users
MODIFY COLUMN last_login DATETIME NOT NULL;
```

### Preserving Column Attributes

When modifying a column's type, you need to specify all attributes you want to keep:

```sql
-- Before: INT NOT NULL AUTO_INCREMENT
-- After: BIGINT NOT NULL AUTO_INCREMENT
ALTER TABLE customers
MODIFY COLUMN id BIGINT NOT NULL AUTO_INCREMENT;
```

### Converting with Length Constraints

```sql
-- Check potential data truncation before conversion
SELECT COUNT(*) FROM products WHERE LENGTH(description) > 100;

-- Perform the conversion (potential data loss)
ALTER TABLE products
MODIFY COLUMN description VARCHAR(100);
```

## Performance Considerations

### Table Locking

```sql
-- Specify algorithm and lock for better performance
ALTER TABLE large_table
MODIFY COLUMN data TEXT,
ALGORITHM=INPLACE, LOCK=NONE;

-- Not all modifications support INPLACE algorithm
-- Check if your modification is supported:
-- https://dev.mysql.com/doc/refman/8.0/en/innodb-online-ddl-operations.html
```

### Low-Impact Approaches for Production

For large tables in production, a multi-step approach might be preferred:

```sql
-- 1. Add a new column
ALTER TABLE large_table ADD COLUMN new_column new_type;

-- 2. Update data in the new column
UPDATE large_table SET new_column = old_column;

-- 3. (Optional) Add any constraints
ALTER TABLE large_table MODIFY COLUMN new_column new_type NOT NULL;

-- 4. Drop the old column when ready
ALTER TABLE large_table DROP COLUMN old_column;

-- 5. Rename the new column to the old name
ALTER TABLE large_table CHANGE COLUMN new_column old_column new_type;
```

## Common Errors and Solutions

See [MySQL Error Reference](/reference/mysql/error/overview/) for errors you may encounter.

Here are the most common errors when altering column types:

### Error 1265: Data truncated

```sql
-- This happens when data doesn't fit the new type
-- Identify problematic rows
SELECT * FROM table_name
WHERE LENGTH(column_name) > new_length;

-- Fix the data first, then alter the column
UPDATE table_name
SET column_name = SUBSTRING(column_name, 1, new_length)
WHERE LENGTH(column_name) > new_length;
```

### Error 1366: Incorrect integer value

```sql
-- When converting string to numeric and non-numeric values exist
-- Find problematic rows
SELECT * FROM table_name
WHERE column_name REGEXP '[^0-9]';

-- Clean data before conversion
UPDATE table_name SET column_name = 0
WHERE column_name REGEXP '[^0-9]';
```

### Error 1292: Incorrect datetime value

```sql
-- When converting to DATE/DATETIME with invalid format
-- Find invalid dates
SELECT * FROM table_name
WHERE STR_TO_DATE(column_name, '%Y-%m-%d') IS NULL;

-- Fix dates before conversion
UPDATE table_name
SET column_name = '2000-01-01'
WHERE STR_TO_DATE(column_name, '%Y-%m-%d') IS NULL;
```

### Error 1118: Row size too large

```sql
-- Happens when the new column size would make row exceed max row size
-- Consider using vertical partitioning or TEXT/BLOB columns
ALTER TABLE large_table
MODIFY COLUMN large_column TEXT;
```

## Data Type Conversion Compatibility

Not all conversions preserve data integrity. Here's a quick reference:

| From Type | To Type | Data Safety | Notes                                     |
| --------- | ------- | ----------- | ----------------------------------------- |
| INT       | BIGINT  | Safe        | No data loss                              |
| BIGINT    | INT     | Unsafe      | Potential overflow                        |
| VARCHAR   | TEXT    | Safe        | No data loss                              |
| TEXT      | VARCHAR | Unsafe      | Potential truncation                      |
| FLOAT     | DECIMAL | Mostly Safe | Potential precision issues                |
| DATETIME  | DATE    | Unsafe      | Time portion lost                         |
| CHAR      | VARCHAR | Safe        | No data loss                              |
| VARCHAR   | ENUM    | Unsafe      | Non-matching values become empty or error |

## Best Practices

1. **Backup First**: Always back up your database before altering column types

2. **Test in Development**: Never make type changes directly in production first

3. **Check Data**: Verify data compatibility before conversion

4. **Transaction Safety**: Consider using transactions for related changes

5. **Choose Optimal Timing**: Schedule alterations during low-traffic periods

6. **Use ALGORITHM and LOCK**: Specify optimal algorithm when possible

7. **Consider Index Impact**: Be aware that indexes may need to be rebuilt

<HintBlock type="info">

Changing column type should be conducted with caution. Some organizations have strict approval process and even disallow altering column type at all. You can enforce [approval process](https://docs.bytebase.com/administration/custom-approval/) or [disallowing altering column type](https://docs.bytebase.com/sql-review/review-rules/#column.disallow-change-type) via Bytebase.

</HintBlock>
