---
title: How to Alter Column Type in Postgres
updated_at: 2025/02/28 09:00:00
---

_Official documentation: [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)_

<HintBlock type="info">

Changing column type should be conducted with caution. Some organizations have strict approval process and even disallow altering column type at all. You can enforce [approval process](/docs/administration/custom-approval/) or [disallowing altering column type](/docs/sql-review/review-rules/#column.disallow-change-type) via Bytebase.

</HintBlock>

## Simple Type Conversions

For straightforward conversions that don't require data transformation:

```sql
-- Change an integer column to bigint
ALTER TABLE orders
ALTER COLUMN order_id
TYPE bigint;

-- Change a varchar column to text
ALTER TABLE customers
ALTER COLUMN notes
TYPE text;

-- Change a float column to numeric with precision
ALTER TABLE products
ALTER COLUMN price
TYPE numeric(10,2);
```

## Using USING Clause for Data Transformation

When the conversion requires transformation, use the `USING` clause:

```sql
-- Convert text to integer
ALTER TABLE employees
ALTER COLUMN age
TYPE integer USING (age::integer);

-- Convert string to date
ALTER TABLE events
ALTER COLUMN event_date
TYPE date USING (event_date::date);

-- Convert string to timestamp
ALTER TABLE logs
ALTER COLUMN created_at
TYPE timestamp USING (created_at::timestamp);

-- Complex transformation with conditional logic
ALTER TABLE users
ALTER COLUMN status
TYPE boolean USING (CASE WHEN status = 'active' THEN TRUE ELSE FALSE END);
```

## Converting Between Text Types

```sql
-- varchar to text (no data loss)
ALTER TABLE messages
ALTER COLUMN content
TYPE text;

-- text to varchar with potential truncation
ALTER TABLE products
ALTER COLUMN description
TYPE varchar(255) USING substring(description, 1, 255);
```

## Converting Numeric Types

```sql
-- integer to bigint (safe, no data loss)
ALTER TABLE measurements
ALTER COLUMN value
TYPE bigint;

-- decimal to integer (truncation of fractional part)
ALTER TABLE products
ALTER COLUMN price
TYPE integer USING (price::integer);

-- float to numeric (fixed precision)
ALTER TABLE financial
ALTER COLUMN amount
TYPE numeric(15,2) USING (amount::numeric(15,2));
```

## Date and Time Conversions

```sql
-- timestamp to date (drops time portion)
ALTER TABLE events
ALTER COLUMN event_timestamp
TYPE date USING (event_timestamp::date);

-- date to timestamp (adds 00:00:00 time)
ALTER TABLE appointments
ALTER COLUMN appointment_date
TYPE timestamp USING (appointment_date::timestamp);

-- timestamp to timestamptz (applies server timezone)
ALTER TABLE logs
ALTER COLUMN log_time
TYPE timestamptz USING (log_time::timestamptz);
```

## UUID and Identifier Conversions

```sql
-- Convert text to UUID
ALTER TABLE sessions
ALTER COLUMN session_id
TYPE uuid USING (session_id::uuid);

-- Convert integer to UUID (requires custom function)
CREATE OR REPLACE FUNCTION int_to_uuid(i integer) RETURNS uuid AS $$
BEGIN
    RETURN ('00000000-0000-0000-0000-' || lpad(i::text, 12, '0'))::uuid;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE legacy_users
ALTER COLUMN user_id
TYPE uuid USING int_to_uuid(user_id);
```

## Array Type Conversions

```sql
-- Convert text to string array using delimiters
ALTER TABLE products
ALTER COLUMN tags
TYPE text[] USING string_to_array(tags, ',');

-- Convert array element types
ALTER TABLE measurements
ALTER COLUMN values
TYPE numeric[] USING (SELECT array_agg(v::numeric) FROM unnest(values) AS v);
```

## JSON/JSONB Conversions

```sql
-- Convert text to JSON
ALTER TABLE api_responses
ALTER COLUMN response
TYPE json USING (response::json);

-- Convert JSON to JSONB
ALTER TABLE configurations
ALTER COLUMN config
TYPE jsonb USING (config::jsonb);

-- Convert JSONB to text
ALTER TABLE archived_data
ALTER COLUMN data
TYPE text USING (data::text);
```

## Handling Special Cases

### Converting NULL Values

```sql
-- Set default value for NULLs during conversion
ALTER TABLE users
ALTER COLUMN last_login
TYPE timestamp USING (COALESCE(last_login::timestamp, '1970-01-01'::timestamp));
```

### Converting with Length Constraints

```sql
-- Handle possible truncation with warning
DO $$
DECLARE
    over_length INTEGER;
BEGIN
    SELECT COUNT(*) INTO over_length
    FROM products
    WHERE LENGTH(description) > 100;

    IF over_length > 0 THEN
        RAISE WARNING 'Warning: % rows will have data truncated', over_length;
    END IF;
END $$;

ALTER TABLE products
ALTER COLUMN description
TYPE varchar(100) USING substring(description, 1, 100);
```

## Performance Considerations

### Using Transactions

For large tables, wrap the alteration in a transaction:

```sql
BEGIN;
-- Check if the conversion is safe
-- ...
ALTER TABLE large_table
ALTER COLUMN data
TYPE new_type USING (data::new_type);
COMMIT;
```

### Low-Impact Approaches for Production

For large tables in production, you might prefer multi-step approach:

```sql
-- 1. Add a new column
ALTER TABLE large_table ADD COLUMN new_column new_type;

-- 2. Update data in batches
DO $$
DECLARE
    batch_size INTEGER := 10000;
    max_id INTEGER;
    current_id INTEGER := 0;
BEGIN
    SELECT MAX(id) INTO max_id FROM large_table;
    WHILE current_id < max_id LOOP
        EXECUTE 'UPDATE large_table
                 SET new_column = old_column::new_type
                 WHERE id > $1 AND id <= $2'
        USING current_id, current_id + batch_size;

        current_id := current_id + batch_size;
        COMMIT;
    END LOOP;
END $$;

-- 3. Add constraints if needed
ALTER TABLE large_table ALTER COLUMN new_column SET NOT NULL;

-- 4. Drop the old column when ready
ALTER TABLE large_table DROP COLUMN old_column;

-- 5. Rename the new column to the old name
ALTER TABLE large_table RENAME COLUMN new_column TO old_column;
```

## Common Errors and Solutions

### "cannot cast type X to Y"

```sql
-- Use explicit conversion function instead
ALTER TABLE products
ALTER COLUMN code
TYPE uuid USING uuid_generate_v5(uuid_ns_url(), code);
```

### "value too long for type character varying(N)"

```sql
-- Check and handle long values first
UPDATE table_name
SET column_name = substring(column_name, 1, 50)
WHERE LENGTH(column_name) > 50;

-- Then alter the type
ALTER TABLE table_name
ALTER COLUMN column_name
TYPE varchar(50);
```

### "operator does not exist: X = Y"

```sql
-- Create a custom cast or use an explicit function
CREATE FUNCTION custom_text_to_uuid(text) RETURNS uuid AS $$
    SELECT CASE
        WHEN $1 ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN $1::uuid
        ELSE uuid_nil()
    END;
$$ LANGUAGE SQL;

ALTER TABLE items
ALTER COLUMN item_id
TYPE uuid USING custom_text_to_uuid(item_id);
```
