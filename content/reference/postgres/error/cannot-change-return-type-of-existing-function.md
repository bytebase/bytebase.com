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
- Altering the structure of returned record types
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
   -- Keep the original function
   -- CREATE FUNCTION calculate_total(integer) RETURNS integer

   -- Create a new function with different parameter signature
   CREATE FUNCTION calculate_total(customer_id integer, include_tax boolean)
   RETURNS numeric AS $$
   BEGIN
       RETURN (SELECT SUM(amount * CASE WHEN include_tax THEN 1.1 ELSE 1 END)
               FROM orders WHERE customer_id = $1);
   END;
   $$ LANGUAGE plpgsql;
   ```

3. **For functions with OUT parameters**, ensure parameter types match:

   ```sql
   -- Drop and recreate:
   DROP FUNCTION IF EXISTS get_user_info(integer);

   CREATE FUNCTION get_user_info(user_id integer, OUT name text, OUT age numeric)
   RETURNS record AS $$
   BEGIN
       SELECT u.name, u.age INTO name, age FROM users u WHERE u.id = user_id;
   END;
   $$ LANGUAGE plpgsql;
   ```

4. **Use a transaction to ensure atomicity**:

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

5. **Check for function dependencies** before dropping:

   ```sql
   SELECT DISTINCT
       n.nspname as schema_name,
       c.relname as object_name,
       c.relkind as object_type
   FROM pg_depend d
   JOIN pg_proc p ON d.refobjid = p.oid
   JOIN pg_class c ON d.objid = c.oid
   JOIN pg_namespace n ON c.relnamespace = n.oid
   WHERE p.proname = 'calculate_total'
   AND d.deptype = 'n';
   ```

## Common Scenarios

1. **Changing return type from integer to numeric**:

   ```sql
   DROP FUNCTION get_score();
   CREATE FUNCTION get_score() RETURNS numeric AS $$
   BEGIN
       RETURN 95.5;
   END;
   $$ LANGUAGE plpgsql;
   ```

2. **Modifying composite return types**:

   ```sql
   DROP FUNCTION get_user_details(integer);

   CREATE FUNCTION get_user_details(user_id integer)
   RETURNS TABLE(name text, age numeric, email text) AS $$
   BEGIN
       RETURN QUERY
       SELECT u.name, u.age::numeric, u.email
       FROM users u
       WHERE u.id = user_id;
   END;
   $$ LANGUAGE plpgsql;
   ```

## Prevention

1. **Plan return types carefully** when designing functions:

   ```sql
   CREATE FUNCTION calculate_amount(id integer)
   RETURNS numeric  -- More flexible than integer
   AS $$ ... $$;
   ```

2. **Use version control** for database schema changes and document function changes in migration scripts.

3. **Consider using polymorphic types** for flexible functions:

   ```sql
   CREATE FUNCTION flexible_calc(input anyelement)
   RETURNS anyelement AS $$
   BEGIN
       RETURN input;
   END;
   $$ LANGUAGE plpgsql;
   ```

4. **Test function changes** in development environments before applying to production.

5. **Use descriptive function names** to avoid conflicts:

   ```sql
   CREATE FUNCTION calculate_total_with_tax(customer_id integer) RETURNS numeric;
   ```

## Performance Considerations

- Dropping and recreating functions may cause brief downtime for dependent operations
- Consider the impact on stored procedures, views, and triggers that use the function
- Plan function changes during maintenance windows
- Test performance implications of return type changes (e.g., integer vs numeric)

<HintBlock type="info">

PostgreSQL function overloading allows multiple functions with the same name but different parameter signatures. This can be useful for maintaining backward compatibility while introducing new return types.

</HintBlock>

<HintBlock type="warning">

Always check for dependent objects before dropping functions. Views, triggers, and other functions that call the dropped function will fail until they are updated or recreated.

</HintBlock>
