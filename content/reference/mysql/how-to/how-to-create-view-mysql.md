---
title: How to CREATE VIEW in MySQL
updated_at: 2025/03/17 09:00:00
---

_Official documentation: [CREATE VIEW](https://dev.mysql.com/doc/refman/8.0/en/create-view.html)_

## Performance Considerations

<HintBlock type="info">

Views provide logical abstractions of data but can impact performance when used improperly. Consider materialized views for complex queries that are run frequently.

Organizations often enforce standards for view creation. You can implement [approval processes](https://docs.bytebase.com/administration/custom-approval/) or [automated schema reviews](https://docs.bytebase.com/sql-review/review-rules/#view) via Bytebase.

</HintBlock>

1. **Query Complexity**: Views with complex joins or aggregations can decrease performance.

2. **Indexing Strategy**: Views don't have their own indexes and rely on the underlying tables.

3. **Nested Views**: Avoid excessive nesting of views as it can severely impact performance.

4. **Updatable Views**: Consider limitations when creating views intended for data modification.

## Basic Syntax

```sql
CREATE [OR REPLACE]
[ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}]
[DEFINER = user]
[SQL SECURITY { DEFINER | INVOKER }]
VIEW view_name [(column_list)]
AS select_statement
[WITH [CASCADED | LOCAL] CHECK OPTION];
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

## View Algorithms

MySQL supports three algorithms for processing views:

```sql
-- MERGE algorithm: Merges view's SELECT with query that references the view
CREATE ALGORITHM = MERGE VIEW active_customers AS
SELECT * FROM customers
WHERE status = 'active';

-- TEMPTABLE algorithm: Creates a temporary table first
CREATE ALGORITHM = TEMPTABLE VIEW sales_summary AS
SELECT product_id, SUM(quantity) as total_sold
FROM order_items
GROUP BY product_id;

-- UNDEFINED algorithm: MySQL chooses the algorithm (default)
CREATE ALGORITHM = UNDEFINED VIEW recent_orders AS
SELECT * FROM orders
WHERE order_date > DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY);
```

## Updatable Views

Views can be used for INSERT, UPDATE, and DELETE operations if they meet certain criteria:

```sql
-- Updatable view
CREATE VIEW active_products AS
SELECT product_id, name, price, category_id
FROM products
WHERE active = 1;

-- With CHECK OPTION to prevent inserting rows that wouldn't be visible in the view
CREATE VIEW premium_products AS
SELECT product_id, name, price, category_id
FROM products
WHERE price > 100
WITH CHECK OPTION;
```

## Security Options

```sql
-- DEFINER specifies who "owns" the view
CREATE DEFINER = 'admin'@'localhost'
VIEW customer_contact AS
SELECT customer_id, name, email, phone
FROM customers;

-- SQL SECURITY controls whether the view executes with privileges of DEFINER or INVOKER
CREATE DEFINER = 'admin'@'localhost'
SQL SECURITY DEFINER
VIEW sensitive_data AS
SELECT * FROM employee_salaries;

-- SQL SECURITY INVOKER runs with the privileges of the user who calls the view
CREATE DEFINER = 'admin'@'localhost'
SQL SECURITY INVOKER
VIEW public_products AS
SELECT product_id, name, price
FROM products
WHERE is_public = 1;
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

### Views Based on Other Views

```sql
-- First create a basic view
CREATE VIEW active_customers AS
SELECT * FROM customers
WHERE status = 'active';

-- Then create a view based on the first view
CREATE VIEW active_customers_with_orders AS
SELECT ac.*,
       COUNT(o.order_id) AS order_count,
       SUM(o.total_amount) AS total_spent
FROM active_customers ac
LEFT JOIN orders o ON ac.customer_id = o.customer_id
GROUP BY ac.customer_id;
```

### Views with UNION

```sql
CREATE VIEW all_contacts AS
SELECT 'Customer' AS contact_type, name, email, phone FROM customers
UNION ALL
SELECT 'Supplier' AS contact_type, name, email, phone FROM suppliers
UNION ALL
SELECT 'Employee' AS contact_type, CONCAT(first_name, ' ', last_name) AS name,
       email, phone FROM employees;
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
ALTER VIEW product_summary AS
SELECT p.product_id, p.product_name,
       SUM(oi.quantity) AS total_sold,
       SUM(oi.quantity * oi.unit_price) AS revenue,
       COUNT(DISTINCT oi.order_id) AS order_count
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name;
```

## Managing Views

### Show View Definition

```sql
-- Show the CREATE VIEW statement
SHOW CREATE VIEW view_name;

-- Get view information from INFORMATION_SCHEMA
SELECT * FROM INFORMATION_SCHEMA.VIEWS
WHERE TABLE_SCHEMA = 'your_database'
AND TABLE_NAME = 'your_view';
```

### Viewing Existing Views

```sql
-- List all views in current database
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.VIEWS
WHERE TABLE_SCHEMA = DATABASE();

-- List all views with their definitions
SELECT TABLE_NAME, VIEW_DEFINITION
FROM INFORMATION_SCHEMA.VIEWS
WHERE TABLE_SCHEMA = 'your_database';
```

### Dropping Views

```sql
-- Drop a view
DROP VIEW view_name;

-- Drop only if it exists
DROP VIEW IF EXISTS view_name;

-- Drop multiple views
DROP VIEW view1, view2, view3;
```

## Limitations of Views

1. You cannot create indexes on views directly.
2. You cannot associate triggers with views.
3. Views may have limitations on updatability if they contain:
   - Aggregate functions (SUM, COUNT, etc.)
   - DISTINCT
   - GROUP BY / HAVING
   - UNION
   - Subquery in SELECT list
   - Certain joins

## Common Errors and Solutions

See [MySQL Error Reference](/reference/mysql/error/overview/) for errors you may encounter.

Here are the most common errors when working with views:

### Error 1356: View is not updatable

```sql
-- This happens when a view contains features that make it non-updatable
-- Solution: Remove features like DISTINCT, GROUP BY, etc. or use instead-of triggers in MySQL 5.7+
```

### Error 1442: View's SELECT contains a subquery in the FROM clause

```sql
-- MySQL doesn't allow subqueries in the FROM clause of a view
-- Solution: Create intermediary views or use derived tables
CREATE VIEW step1 AS
SELECT * FROM (SELECT id, value FROM complex_data) AS temp;

CREATE VIEW final_view AS
SELECT * FROM step1;
```

### Error 1064: Syntax error

```sql
-- Common when the SELECT statement has errors
-- Solution: Test your SELECT statement separately before creating the view
SELECT * FROM products WHERE price > 100;  -- Test this first

CREATE VIEW premium_products AS
SELECT * FROM products WHERE price > 100;  -- Then create the view
```

### Error 1146: Table doesn't exist

```sql
-- Occurs when referenced tables don't exist
-- Solution: Create all required tables before creating the view

-- Check if tables exist
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'your_database'
AND TABLE_NAME = 'table_name';
```

### Error 1054: Unknown column

```sql
-- When column referenced in view doesn't exist
-- Solution: Verify all column names in the underlying tables

-- Check columns in a table
SHOW COLUMNS FROM table_name;
```

## Best Practices

1. **Naming Conventions**: Use a consistent naming convention for views, such as prefixing with `v_` or `view_`.

2. **Documentation**: Add comments to document complex views:

   ```sql
   CREATE VIEW v_customer_analytics AS
   -- This view aggregates customer purchase history
   -- and calculates lifetime value
   SELECT
       c.customer_id,
       c.name,
       COUNT(o.order_id) AS order_count,
       SUM(o.total_amount) AS total_spent,
       AVG(o.total_amount) AS avg_order_value
   FROM customers c
   LEFT JOIN orders o ON c.customer_id = o.customer_id
   GROUP BY c.customer_id, c.name;
   ```

3. **Performance Testing**: Test view performance with large datasets before using in production.

4. **Limit Nesting**: Avoid deep nesting of views (views based on views) as it can impact performance.

5. **Security**: Use appropriate SQL SECURITY settings to control access.

6. **Regular Maintenance**: Periodically review view definitions and performance.

7. **Consider Materialized Views**: For complex aggregations in MySQL 8.0+, consider alternatives like summary tables that function as materialized views.

8. **Version Control**: Keep view definitions in version control along with other schema objects.
