---
title: 'ERROR: cannot change return type of existing function'
---

## Error Message

```sql
ERROR: cannot change return type of existing function
DETAIL: Row type defined by OUT parameters is different.
HINT: Use DROP FUNCTION first.
```

## Description

This error occurs when you attempt to create or replace a function with a different return type than the existing function. PostgreSQL does not allow changing the return type of an existing function using `CREATE OR REPLACE FUNCTION`, as this could break existing code that depends on the original return type.

## Causes

- Using `CREATE OR REPLACE FUNCTION` with a different return type than the existing function
- Changing the data type of OUT parameters in function definitions
- Modifying composite return types (row types) in existing functions
- Migrating functions between different PostgreSQL versions with type changes

## Solutions

1. **Drop the function first, then recreate it**:

   ```sql
   -- Drop the existing function
   DROP FUNCTION IF EXISTS calculate_total(integer);

   -- Create the function with the new return type
   CREATE FUNCTION calculate_total(customer_id integer)
   RETURNS numeric AS $$
   BEGIN
       RETURN (SELECT SUM(amount) FROM orders WHERE customer_id = $1);
   END;
   $$ LANGUAGE plpgsql;
   ```

2. **Use function overloading** by creating a function with different parameters:

   ```sql
   -- Keep the original function and create a new one with different parameters
   CREATE FUNCTION calculate_total(customer_id integer, include_tax boolean)
   RETURNS numeric AS $$
   BEGIN
       RETURN (SELECT SUM(amount * CASE WHEN include_tax THEN 1.1 ELSE 1 END)
               FROM orders WHERE customer_id = $1);
   END;
   $$ LANGUAGE plpgsql;
   ```

3. **Use a transaction to ensure atomicity**:

   ```sql
   BEGIN;
   DROP FUNCTION calculate_total(integer);
   CREATE FUNCTION calculate_total(customer_id integer)
   RETURNS numeric AS $$
   BEGIN
       RETURN (SELECT SUM(amount) FROM orders WHERE customer_id = $1);
   END;
   $$ LANGUAGE plpgsql;
   COMMIT;
   ```

## Prevention

- Plan return types carefully when designing functions (use numeric instead of integer for flexibility)
- Use version control for database schema changes
- Test function changes in development environments before applying to production
- Consider using polymorphic types for flexible functions
