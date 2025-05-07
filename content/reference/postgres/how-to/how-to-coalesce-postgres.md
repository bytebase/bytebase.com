---
title: How to use COALESCE in PostgreSQL
updated_at: 2025/05/07 15:00:00
---

_Official documentation: [SQL Functions and Operators: COALESCE](https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE)_

The `COALESCE` function in PostgreSQL returns the first non-null value in a list of expressions. This function is particularly useful for handling null values and providing default values in queries.

## Basic Syntax

```sql
COALESCE(value1, value2, ..., valueN)
```

The function evaluates the arguments in order and returns the value of the first expression that is not null. If all expressions are null, the result is null.

## Common Use Cases

### Providing Default Values

```sql
-- Return a default value when a column is null
SELECT
    product_id,
    COALESCE(product_name, 'Unnamed Product') AS product_name,
    COALESCE(price, 0.00) AS price
FROM products;

-- Multiple columns with potential nulls
SELECT
    user_id,
    COALESCE(preferred_name, first_name, 'User ' || user_id) AS display_name
FROM users;
```

### Concatenating Values with Potential Nulls

```sql
-- Concatenate address parts safely
SELECT
    customer_id,
    COALESCE(street_address, '') ||
    COALESCE(', ' || city, '') ||
    COALESCE(', ' || state, '') ||
    COALESCE(' ' || zip_code, '') AS full_address
FROM customer_addresses;
```

### Calculating with Null Values

```sql
-- Calculate total with potential null quantities
SELECT
    order_id,
    SUM(COALESCE(quantity, 0) * price) AS total_amount
FROM order_items
GROUP BY order_id;

-- Find the first available contact method
SELECT
    customer_id,
    COALESCE(mobile_phone, home_phone, email, 'No contact information') AS contact
FROM customers;
```

## Advanced Use Cases

### COALESCE in WHERE Clauses

```sql
-- Find records where either field1 or field2 matches a value
SELECT *
FROM table_name
WHERE COALESCE(field1, field2) = 'search_value';

-- Equivalent to: WHERE field1 = 'search_value' OR (field1 IS NULL AND field2 = 'search_value')
```

### COALESCE with Aggregations

```sql
-- Handle nulls in aggregation functions
SELECT
    department_id,
    AVG(COALESCE(bonus, 0)) AS average_bonus
FROM employees
GROUP BY department_id;

-- Find the first non-null value across rows
SELECT
    product_id,
    COALESCE(
        MAX(CASE WHEN warehouse = 'A' THEN stock END),
        MAX(CASE WHEN warehouse = 'B' THEN stock END),
        MAX(CASE WHEN warehouse = 'C' THEN stock END),
        0
    ) AS available_stock
FROM inventory
GROUP BY product_id;
```

### COALESCE in UPDATE Statements

```sql
-- Update a field only if the new value is not null
UPDATE products
SET description = COALESCE(new_description, description)
WHERE product_id = 123;

-- Merge data from a temporary table, preserving existing values
UPDATE customers c
SET
    phone = COALESCE(t.phone, c.phone),
    email = COALESCE(t.email, c.email)
FROM temp_customers t
WHERE c.customer_id = t.customer_id;
```

### COALESCE with JOIN Operations

```sql
-- Use default values for columns from optional joins
SELECT
    o.order_id,
    o.order_date,
    COALESCE(c.name, 'Guest') AS customer_name
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id;
```

## COALESCE vs. NULLIF and NVL

### COALESCE vs. NULLIF

```sql
-- NULLIF returns null if the two expressions are equal
-- Can be used with COALESCE to handle empty strings or zero values

-- Convert empty strings to NULL and then provide default
SELECT COALESCE(NULLIF(comment, ''), 'No comment provided')
FROM feedback;

-- Avoid division by zero
SELECT
    item,
    total_cost / COALESCE(NULLIF(item_count, 0), 1) AS cost_per_item
FROM inventory;
```

### COALESCE vs. NVL

```sql
-- NVL is an Oracle function, COALESCE is standard SQL
-- In PostgreSQL, always use COALESCE instead of NVL

-- Oracle:
-- SELECT NVL(column_name, 'default') FROM table_name;

-- PostgreSQL:
SELECT COALESCE(column_name, 'default') FROM table_name;
```

## Common Errors and Solutions

### Error: "invalid input syntax for type"

This occurs when trying to coalesce values of different data types.

```sql
-- Error example
SELECT COALESCE(numeric_column, 'not available') FROM table_name;

-- Fix: Cast to consistent type
SELECT COALESCE(numeric_column::text, 'not available') FROM table_name;

-- Or convert the default value to the column type
SELECT COALESCE(numeric_column, 0) FROM table_name;
```

### Unexpected NULL Results

When COALESCE still returns NULL, check if all input expressions are NULL.

```sql
-- Debugging COALESCE values
SELECT
    column1,
    column2,
    column3,
    COALESCE(column1, column2, column3) AS result
FROM table_name
WHERE COALESCE(column1, column2, column3) IS NULL;
```

## Performance Considerations

- COALESCE evaluates arguments in order and stops at the first non-null value
- Arrange arguments with the most likely non-null values first for better performance
- For complex expressions, PostgreSQL might need to evaluate all arguments regardless

```sql
-- More efficient (if column1 is less likely to be null)
SELECT COALESCE(column1, expensive_function(column2)) FROM table_name;

-- Less efficient
SELECT COALESCE(expensive_function(column2), column1) FROM table_name;
```

## Best Practices

1. **Use COALESCE for default values** rather than writing complex CASE expressions

   ```sql
   -- Instead of this:
   SELECT CASE WHEN column_name IS NULL THEN 'default' ELSE column_name END
   FROM table_name;

   -- Use this:
   SELECT COALESCE(column_name, 'default')
   FROM table_name;
   ```

2. **Be mindful of data types** when using COALESCE with different value types

3. **Consider using NULLIF with COALESCE** to handle empty strings or zero values

   ```sql
   SELECT COALESCE(NULLIF(trim(description), ''), 'No description')
   FROM products;
   ```

4. **For multiple conditions**, consider CASE statements instead of deeply nested COALESCE

   ```sql
   -- For complex logic, CASE might be clearer than COALESCE
   SELECT
       CASE
           WHEN preferred_name IS NOT NULL THEN preferred_name
           WHEN first_name IS NOT NULL AND last_name IS NOT NULL THEN first_name || ' ' || last_name
           WHEN first_name IS NOT NULL THEN first_name
           ELSE 'Unknown'
       END AS display_name
   FROM users;
   ```

5. **Use COALESCE in GROUP BY clauses** to group NULL values with a default

   ```sql
   SELECT
       COALESCE(category, 'Uncategorized') AS category,
       COUNT(*)
   FROM products
   GROUP BY COALESCE(category, 'Uncategorized');
   ```

## References

- [PostgreSQL Documentation: COALESCE](https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE)
- [PostgreSQL Documentation: NULL Handling](https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-NULLIF)
- [PostgreSQL Documentation: Conditional Expressions](https://www.postgresql.org/docs/current/functions-conditional.html)
