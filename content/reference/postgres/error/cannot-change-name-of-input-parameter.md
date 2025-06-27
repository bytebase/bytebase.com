---
title: 'ERROR: cannot change name of input parameter'
---

## Error Message

```sql
ERROR: cannot change name of input parameter
DETAIL: Input parameter "old_name" would be renamed to "new_name".
HINT: Use DROP FUNCTION first.
```

## Description

This error occurs when you attempt to create or replace a function with different parameter names than the existing function. PostgreSQL does not allow changing the names of input parameters using `CREATE OR REPLACE FUNCTION`, as this could break existing code that uses named parameter syntax to call the function.

## Causes

- Using `CREATE OR REPLACE FUNCTION` with different parameter names than the existing function
- Renaming parameters in function definitions during code refactoring
- Changing parameter names while keeping the same parameter types and count
- Migrating functions from other database systems with different naming conventions

## Solutions

1. **Drop the function first, then recreate it**:

   ```sql
   -- Drop the existing function
   DROP FUNCTION IF EXISTS calculate_discount(customer_type text, purchase_amount numeric);

   -- Create the function with new parameter names
   CREATE FUNCTION calculate_discount(client_category text, order_total numeric)
   RETURNS numeric AS $$
   BEGIN
       RETURN CASE
           WHEN client_category = 'premium' THEN order_total * 0.15
           WHEN client_category = 'regular' THEN order_total * 0.10
           ELSE order_total * 0.05
       END;
   END;
   $$ LANGUAGE plpgsql;
   ```

2. **Use function overloading** by creating a function with different parameter signature:

   ```sql
   -- Keep the original function and create a new one with different parameters
   CREATE FUNCTION calculate_discount(client_category text, order_total numeric, include_tax boolean)
   RETURNS numeric AS $$
   BEGIN
       RETURN CASE
           WHEN client_category = 'premium' THEN order_total * 0.15
           WHEN client_category = 'regular' THEN order_total * 0.10
           ELSE order_total * 0.05
       END * CASE WHEN include_tax THEN 1.1 ELSE 1.0 END;
   END;
   $$ LANGUAGE plpgsql;
   ```

3. **Use a transaction to ensure atomicity**:

   ```sql
   BEGIN;
   DROP FUNCTION calculate_discount(customer_type text, purchase_amount numeric);
   CREATE FUNCTION calculate_discount(client_category text, order_total numeric)
   RETURNS numeric AS $$
   BEGIN
       RETURN CASE
           WHEN client_category = 'premium' THEN order_total * 0.15
           ELSE order_total * 0.10
       END;
   END;
   $$ LANGUAGE plpgsql;
   COMMIT;
   ```

## Prevention

- Plan parameter names carefully when designing functions
- Establish naming conventions early in the project
- Use version control for database schema changes
- Test function changes in development environments
