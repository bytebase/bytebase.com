---
title: How to CREATE VIEW in PostgreSQL
updated_at: 2025/03/17 12:00:00
---

_Official documentation: [CREATE VIEW](https://www.postgresql.org/docs/current/sql-createview.html)_

## Performance Considerations

<HintBlock type="info">

Views provide logical abstractions of data but can impact performance when used improperly. PostgreSQL offers materialized views for complex queries that are run frequently.

Organizations often enforce standards for view creation. You can implement [approval processes](https://docs.bytebase.com/administration/custom-approval/) or [automated schema reviews](https://docs.bytebase.com/sql-review/review-rules/#view) via Bytebase.

</HintBlock>

1. **Query Complexity**: Views with complex joins or aggregations can decrease performance.

2. **Regular vs. Materialized**: Consider using materialized views for complex queries with infrequent data changes.

3. **Nested Views**: Avoid excessive nesting of views as it can severely impact performance.

4. **Updatable Views**: Consider limitations when creating views intended for data modification.

## Basic Syntax for Regular Views

```sql
CREATE [OR REPLACE] [TEMP | TEMPORARY] VIEW view_name [ ( column_name [, ...] ) ]
    [ WITH ( view_option_name [= view_option_value] [, ... ] ) ]
    AS query
    [ WITH [CASCADED | LOCAL] CHECK OPTION ];
```

## Creating Simple Views

```sql
-- Basic view with all columns from the SELECT statement
CREATE VIEW customer_orders AS
SELECT c.customer_id, c.name, o.order_id, o.order_date, o.total_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id;

-- View with explicit column names
CREATE VIEW product_summary (product_id, name, total_sold, revenue) AS
SELECT p.product_id, p.product_name,
       SUM(oi.quantity), SUM(oi.quantity * oi.unit_price)
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name;
```

## Updatable Views

Views can be used for INSERT, UPDATE, and DELETE operations if they meet certain criteria:

```sql
-- Updatable view
CREATE VIEW active_products AS
SELECT product_id, name, price, category_id
FROM products
WHERE active = true;

-- With CHECK OPTION to prevent inserting rows that wouldn't be visible in the view
CREATE VIEW premium_products AS
SELECT product_id, name, price, category_id
FROM products
WHERE price > 100
WITH CHECK OPTION;
```

## Materialized Views

PostgreSQL supports materialized views that store the results of a query:

```sql
-- Create a materialized view
CREATE MATERIALIZED VIEW sales_summary AS
SELECT
    product_id,
    SUM(quantity) as total_sold,
    SUM(quantity * unit_price) as revenue
FROM order_items
GROUP BY product_id;

-- Refresh the materialized view data
REFRESH MATERIALIZED VIEW sales_summary;

-- Refresh without blocking concurrent reads
REFRESH MATERIALIZED VIEW CONCURRENTLY sales_summary;
```

## View Security and Ownership

```sql
-- Create a view with a specific owner
CREATE VIEW customer_contact
OWNER TO admin
AS SELECT customer_id, name, email, phone
FROM customers;

-- Grant privileges on a view
GRANT SELECT ON customer_contact TO analyst_role;
GRANT SELECT, INSERT, UPDATE ON customer_contact TO support_role;
```

## Advanced View Features

### Views with Complex Joins

```sql
CREATE VIEW order_details AS
SELECT o.order_id, o.order_date, c.name AS customer_name,
       p.name AS product_name, oi.quantity, oi.unit_price,
       (oi.quantity * oi.unit_price) AS line_total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id;
```

### Views with Aggregations

```sql
CREATE VIEW sales_by_category AS
SELECT c.category_id, c.name AS category_name,
       SUM(oi.quantity * oi.unit_price) AS total_sales,
       COUNT(DISTINCT o.order_id) AS order_count
FROM categories c
JOIN products p ON c.category_id = p.category_id
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
GROUP BY c.category_id, c.name;
```

### Views with Subqueries

```sql
CREATE VIEW customers_with_orders AS
SELECT c.*,
       (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.customer_id) AS order_count,
       (SELECT MAX(order_date) FROM orders o WHERE o.customer_id = c.customer_id) AS last_order_date
FROM customers c;
```

### Views with Common Table Expressions (CTEs)

```sql
CREATE VIEW high_value_customers AS
WITH customer_totals AS (
    SELECT
        customer_id,
        SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_id
)
SELECT c.customer_id, c.name, c.email, ct.total_spent
FROM customers c
JOIN customer_totals ct ON c.customer_id = ct.customer_id
WHERE ct.total_spent > 10000;
```

### Views with Window Functions

```sql
CREATE VIEW customer_rankings AS
SELECT
    c.customer_id,
    c.name,
    SUM(o.total_amount) AS total_spent,
    RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS spending_rank
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;
```

### Views with UNION

```sql
CREATE VIEW all_contacts AS
SELECT 'Customer' AS contact_type, name, email, phone FROM customers
UNION ALL
SELECT 'Supplier' AS contact_type, name, email, phone FROM suppliers
UNION ALL
SELECT 'Employee' AS contact_type, first_name || ' ' || last_name AS name,
       email, phone FROM employees;
```

## Temporary Views

```sql
-- Create a temporary view that exists only for the current session
CREATE TEMPORARY VIEW temp_analysis AS
SELECT product_id, COUNT(*) as order_count
FROM order_items
GROUP BY product_id
ORDER BY order_count DESC;
```

## Replacing and Altering Views

```sql
-- Replace an existing view
CREATE OR REPLACE VIEW customer_orders AS
SELECT c.customer_id, c.name, o.order_id, o.order_date,
       o.total_amount, o.status
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id;

-- Alter a view definition
ALTER VIEW product_summary
  RENAME TO product_sales_summary;

-- Change view owner
ALTER VIEW customer_contact
  OWNER TO reporting_user;

-- Rename a column in a view
ALTER VIEW customer_contact
  RENAME COLUMN phone TO contact_number;
```

## Recursive Views

PostgreSQL supports recursive views using Common Table Expressions:

```sql
CREATE RECURSIVE VIEW employee_hierarchy(id, name, manager_id, level, path) AS
SELECT id, name, manager_id, 1 as level, name::text as path
FROM employees
WHERE manager_id IS NULL
UNION ALL
SELECT e.id, e.name, e.manager_id, eh.level + 1, eh.path || ' > ' || e.name
FROM employees e
JOIN employee_hierarchy eh ON e.manager_id = eh.id;
```

## Managing Views

### Show View Definition

```sql
-- Show view definition from pg_catalog
SELECT pg_get_viewdef('view_name', true);

-- Show materialized view definition
SELECT pg_get_viewdef('materialized_view_name'::regclass, true);

-- Get view information from information_schema
SELECT * FROM information_schema.views
WHERE table_schema = 'your_schema'
AND table_name = 'your_view';
```

### Viewing Existing Views

```sql
-- List all views in current schema
SELECT table_name
FROM information_schema.views
WHERE table_schema = current_schema();

-- List all materialized views
SELECT matviewname, matviewowner, ispopulated
FROM pg_matviews
WHERE schemaname = current_schema();

-- List all views with their definitions
SELECT table_name, view_definition
FROM information_schema.views
WHERE table_schema = 'your_schema';
```

### Dropping Views

```sql
-- Drop a view
DROP VIEW view_name;

-- Drop only if it exists
DROP VIEW IF EXISTS view_name;

-- Drop multiple views
DROP VIEW view1, view2, view3;

-- Drop a materialized view
DROP MATERIALIZED VIEW materialized_view_name;
```

## View Dependencies

```sql
-- Find dependencies on a view
SELECT dependent_ns.nspname as dependent_schema,
       dependent_view.relname as dependent_view
FROM pg_depend
JOIN pg_rewrite ON pg_depend.objid = pg_rewrite.oid
JOIN pg_class as dependent_view ON pg_rewrite.ev_class = dependent_view.oid
JOIN pg_class as source_table ON pg_depend.refobjid = source_table.oid
JOIN pg_namespace dependent_ns ON dependent_ns.oid = dependent_view.relnamespace
JOIN pg_namespace source_ns ON source_ns.oid = source_table.relnamespace
WHERE source_table.relname = 'table_or_view_name'
  AND source_ns.nspname = 'schema_name';
```

## Performance Tuning for Views

```sql
-- Create an index on a table to improve view performance
CREATE INDEX idx_order_items_product
ON order_items(product_id);

-- Analyze tables to improve query planning
ANALYZE orders, customers, order_items;

-- For materialized views, create indexes directly on them
CREATE MATERIALIZED VIEW product_sales AS
SELECT product_id, SUM(quantity) as total_sold
FROM order_items
GROUP BY product_id;

CREATE INDEX idx_product_sales_total
ON product_sales(total_sold);
```

## Limitations of Views

1. Views that are not marked `WITH CHECK OPTION` may allow modifications that cause rows to disappear from the view.
2. Materialized views require manual refreshing to show current data.
3. Views may have limitations on updatability if they contain:
   - Aggregate functions (SUM, COUNT, etc.)
   - DISTINCT
   - GROUP BY / HAVING
   - UNION
   - Window functions
   - Certain joins

## Common Errors and Solutions

See [Postgres Error Reference](/reference/postgres/error/overview/) for errors you may encounter.

Here are the most common errors when working with views:

### ERROR: cannot change name of view column

```sql
-- Occurs when trying to rename columns in a view directly
-- Solution: Drop and recreate the view with new column names
DROP VIEW IF EXISTS view_name;
CREATE VIEW view_name (new_column_name, ...) AS
SELECT ...;
```

### ERROR: cannot drop view because other objects depend on it

```sql
-- View has dependent objects
-- Solution: Find dependencies and drop them first or use CASCADE
DROP VIEW view_name CASCADE;

-- Find dependencies
SELECT dependent_ns.nspname as dependent_schema,
       dependent_view.relname as dependent_view
FROM pg_depend
JOIN pg_rewrite ON pg_depend.objid = pg_rewrite.oid
JOIN pg_class as dependent_view ON pg_rewrite.ev_class = dependent_view.oid
JOIN pg_class as source_table ON pg_depend.refobjid = source_table.oid
JOIN pg_namespace dependent_ns ON dependent_ns.oid = dependent_view.relnamespace
JOIN pg_namespace source_ns ON source_ns.oid = source_table.relnamespace
WHERE source_table.relname = 'your_view'
  AND source_ns.nspname = 'your_schema';
```

### ERROR: materialized view "view_name" does not exist

```sql
-- Common when trying to refresh a non-existent materialized view
-- Solution: Check name and schema
SELECT matviewname, schemaname
FROM pg_matviews
WHERE schemaname = current_schema();
```

### ERROR: cannot refresh materialized view concurrently

```sql
-- Occurs when trying to refresh CONCURRENTLY without a unique index
-- Solution: Add a unique index to the materialized view

-- Add unique index
CREATE UNIQUE INDEX idx_unique_matview
ON materialized_view_name(id_column);

-- Then refresh concurrently
REFRESH MATERIALIZED VIEW CONCURRENTLY materialized_view_name;
```

### ERROR: rules on views are not supported

```sql
-- Occurs when trying to create rules directly on views
-- Solution: Use triggers on the view instead (PostgreSQL 9.1+)

CREATE TRIGGER view_trigger
INSTEAD OF INSERT OR UPDATE OR DELETE ON view_name
FOR EACH ROW EXECUTE FUNCTION view_trigger_function();
```

## Best Practices

1. **Naming Conventions**: Use a consistent naming convention for views, such as prefixing with `v_` or `view_`.

2. **Documentation**: Add comments to document views:

   ```sql
   COMMENT ON VIEW customer_analytics IS 'Aggregates customer purchase history and calculates lifetime value';

   -- Retrieve comments
   SELECT obj_description('customer_analytics'::regclass);
   ```

3. **Performance Testing**: Test view performance with large datasets before using in production.

4. **Materialized Views**: Use materialized views for expensive queries with infrequently changing data.

5. **Security**: Set appropriate ownership and privileges on views.

   ```sql
   -- Limit access to a view
   REVOKE ALL ON customer_details FROM PUBLIC;
   GRANT SELECT ON customer_details TO analyst_role;
   ```

6. **Regular Maintenance**:

   - Periodically review view definitions and performance
   - Schedule regular refreshes for materialized views

7. **Version Control**: Keep view definitions in version control along with other schema objects.

8. **Indexing Strategy**: Create appropriate indexes on base tables to support view queries.

9. **Use of Functions**: Encapsulate complex logic in functions rather than embedding in views.

   ```sql
   -- Create a function for complex logic
   CREATE FUNCTION calculate_discount(price numeric, tier int)
   RETURNS numeric AS $$
       -- Logic here
   $$ LANGUAGE sql IMMUTABLE;

   -- Use in view
   CREATE VIEW discounted_products AS
   SELECT id, name, price, calculate_discount(price, customer_tier) as discounted_price
   FROM products;
   ```
