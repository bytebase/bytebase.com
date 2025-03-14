---
title: How to Drop a CONSTRAINT in Postgres
updated_at: 2025/03/14 12:00:00
---

_Official documentation: [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)_

## Performance Considerations

<HintBlock type="info">

Dropping constraints may affect data integrity and application behavior. Ensure you understand the implications before proceeding.

Some organizations have strict approval processes. You can enforce [approval process](/docs/administration/custom-approval/) or [automated review](/docs/sql-review/review-rules/#column) via Bytebase.

</HintBlock>

1. **Lock Duration**: Dropping constraints typically requires an ACCESS EXCLUSIVE lock on the table, which blocks all concurrent operations.

2. **Cascading Effects**: Using CASCADE option can lead to unexpected deletions of dependent objects.

3. **Transaction Size**: Large tables may generate significant write-ahead logs during constraint modifications.

4. **Proper Planning**: Schedule constraint modifications during off-peak hours.

## Identifying Existing Constraints

Before dropping constraints, you should identify their exact names:

```sql
-- View all constraints on a table
SELECT conname, contype, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'table_name'::regclass;

-- View constraints with their types
SELECT
    tc.constraint_name,
    tc.constraint_type,
    tc.table_name
FROM information_schema.table_constraints tc
WHERE tc.table_schema = 'schema_name'
AND tc.table_name = 'table_name';

-- View foreign key constraints specifically
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS referenced_table,
    ccu.column_name AS referenced_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'schema_name'
AND tc.table_name = 'table_name';
```

## Dropping Primary Key Constraints

```sql
-- Drop primary key constraint
ALTER TABLE table_name
DROP CONSTRAINT table_name_pkey;

-- Example
ALTER TABLE customers
DROP CONSTRAINT customers_pkey;

-- If you don't know the constraint name
ALTER TABLE customers
DROP CONSTRAINT IF EXISTS customers_pkey;
```

## Dropping Foreign Key Constraints

```sql
-- Drop foreign key constraint
ALTER TABLE table_name
DROP CONSTRAINT constraint_name;

-- Example
ALTER TABLE orders
DROP CONSTRAINT fk_customer_id;

-- Drop constraint if exists
ALTER TABLE orders
DROP CONSTRAINT IF EXISTS fk_customer_id;

-- Drop with cascade (will also drop dependent objects)
ALTER TABLE products
DROP CONSTRAINT fk_category_id CASCADE;
```

## Dropping Unique Constraints

```sql
-- Drop unique constraint
ALTER TABLE table_name
DROP CONSTRAINT constraint_name;

-- Example
ALTER TABLE users
DROP CONSTRAINT unique_email;

-- Alternative using index name (if constraint uses an index)
ALTER TABLE users
DROP CONSTRAINT IF EXISTS unique_email;
```

## Dropping Check Constraints

```sql
-- Drop check constraint
ALTER TABLE table_name
DROP CONSTRAINT constraint_name;

-- Example
ALTER TABLE employees
DROP CONSTRAINT chk_salary_positive;

-- Multiple constraints in one command
ALTER TABLE products
DROP CONSTRAINT chk_price_positive,
DROP CONSTRAINT chk_inventory_nonnegative;
```

## Dropping Default Constraints

In PostgreSQL, default values are column properties rather than separate constraints:

```sql
-- Drop default value
ALTER TABLE table_name
ALTER COLUMN column_name DROP DEFAULT;

-- Example
ALTER TABLE orders
ALTER COLUMN status DROP DEFAULT;
```

## Dropping Exclusion Constraints

```sql
-- Drop exclusion constraint
ALTER TABLE table_name
DROP CONSTRAINT constraint_name;

-- Example
ALTER TABLE meetings
DROP CONSTRAINT exclude_overlapping_meetings;
```

## Common Errors and Solutions

See [Postgres Error Reference](/reference/postgres/error/overview/) for errors you may encounter.

Here are the most common errors you might face when creating tables and how to solve them:

### ERROR: cannot drop constraint because other objects depend on it

```sql
-- Find dependent objects
SELECT
    dependent_ns.nspname as dependent_schema,
    dependent_view.relname as dependent_view
FROM pg_depend
JOIN pg_rewrite ON pg_depend.objid = pg_rewrite.oid
JOIN pg_class as dependent_view ON pg_rewrite.ev_class = dependent_view.oid
JOIN pg_class as source_table ON pg_depend.refobjid = source_table.oid
JOIN pg_namespace dependent_ns ON dependent_ns.oid = dependent_view.relnamespace
JOIN pg_namespace source_ns ON source_ns.oid = source_table.relnamespace
WHERE source_table.relname = 'your_table'
  AND source_ns.nspname = 'your_schema';

-- Use CASCADE to drop dependent objects too
ALTER TABLE orders
DROP CONSTRAINT fk_customer_id CASCADE;
```

### ERROR: constraint "constraint_name" of relation "table_name" does not exist

```sql
-- Verify constraint exists before dropping
SELECT conname
FROM pg_constraint
WHERE conrelid = 'table_name'::regclass;

-- Use IF EXISTS to safely attempt dropping
ALTER TABLE products
DROP CONSTRAINT IF EXISTS non_existent_constraint;
```

### ERROR: cannot drop constraint on relation "table_name" used by foreign key constraint

```sql
-- Find dependent foreign keys
SELECT
    tc.table_schema,
    tc.table_name,
    tc.constraint_name
FROM information_schema.table_constraints tc
JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND ccu.table_schema = 'schema_name'
AND ccu.table_name = 'referenced_table';

-- Drop dependent foreign keys first
ALTER TABLE child_table
DROP CONSTRAINT fk_constraint_name;

-- Then drop the original constraint
ALTER TABLE parent_table
DROP CONSTRAINT pk_constraint;
```

### ERROR: could not acquire lock on relation "table_name"

```sql
-- Find blocking processes
SELECT pid,
       usename,
       pg_blocking_pids(pid) as blocked_by,
       query as blocked_query
FROM pg_stat_activity
WHERE cardinality(pg_blocking_pids(pid)) > 0;

-- You may need to terminate blocking queries or retry later
```

## Best Practices

1. **Database Backup**: Always back up your database before dropping constraints.

2. **Test Environment**: Test constraint modifications in a development environment first.

3. **Transaction Safety**: Wrap operations in transactions to allow rollbacks.

   ```sql
   BEGIN;

   ALTER TABLE orders
   DROP CONSTRAINT fk_customer;

   -- Validate changes or perform additional operations

   COMMIT;
   -- OR ROLLBACK if needed
   ```

4. **Use IF EXISTS**: Prevent errors when dropping potentially non-existent constraints.

5. **Be Careful with CASCADE**: Using CASCADE can lead to unintended object deletion.

6. **Consider Dependencies**: Check for and handle dependent objects before dropping constraints.

7. **Application Coordination**: Schedule constraint changes during application maintenance windows.

8. **Documentation**: Maintain documentation of your schema constraints and their purposes.
