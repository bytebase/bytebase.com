---
title: 'ERROR 1055 (42000): SELECT list is not in GROUP BY clause and contains nonaggregated column; this is incompatible with sql_mode=only_full_group_by'
---

## Error Message

```sql
ERROR 1055 (42000): Expression #2 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'database_name.table_name.column_name' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```

## Description

This error occurs when you use GROUP BY in a SELECT statement and include columns in the SELECT list that are not part of the GROUP BY clause and are not aggregate functions. MySQL's `ONLY_FULL_GROUP_BY` SQL mode enforces standard SQL behavior, requiring that all non-aggregate columns in the SELECT list must be included in the GROUP BY clause.

## Causes

- Using columns in SELECT that are not in the GROUP BY clause
- MySQL server has `ONLY_FULL_GROUP_BY` mode enabled (default in MySQL 5.7+)
- Selecting non-functional dependent columns without proper aggregation
- Mixing aggregate and non-aggregate columns incorrectly
- Legacy queries written for older MySQL versions that allowed this behavior
- Missing aggregate functions around columns that should be aggregated
- Incorrect understanding of GROUP BY requirements in standard SQL

## Solutions

1. **Add missing columns to GROUP BY clause**:

   ```sql
   -- Before: Error
   SELECT customer_id, customer_name, COUNT(*)
   FROM orders
   GROUP BY customer_id;

   -- After: Fixed
   SELECT customer_id, customer_name, COUNT(*)
   FROM orders
   GROUP BY customer_id, customer_name;
   ```

2. **Use aggregate functions for non-grouped columns**:

   ```sql
   -- Use MAX, MIN, or other aggregate functions
   SELECT customer_id, MAX(customer_name), COUNT(*)
   FROM orders
   GROUP BY customer_id;

   -- Or use ANY_VALUE() for MySQL 5.7+
   SELECT customer_id, ANY_VALUE(customer_name), COUNT(*)
   FROM orders
   GROUP BY customer_id;
   ```

3. **Remove non-grouped columns from SELECT**:

   ```sql
   -- Only select grouped columns and aggregates
   SELECT customer_id, COUNT(*) as order_count
   FROM orders
   GROUP BY customer_id;
   ```

4. **Disable ONLY_FULL_GROUP_BY mode** (not recommended for production):

   ```sql
   -- For current session
   SET sql_mode = '';

   -- Or remove ONLY_FULL_GROUP_BY from global settings
   SET GLOBAL sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO';
   ```

5. **Use subqueries or window functions** for complex cases:

   ```sql
   -- Using subquery
   SELECT o.customer_id, c.customer_name, o.order_count
   FROM (
     SELECT customer_id, COUNT(*) as order_count
     FROM orders
     GROUP BY customer_id
   ) o
   JOIN customers c ON o.customer_id = c.customer_id;

   -- Using window functions (MySQL 8.0+)
   SELECT DISTINCT customer_id, customer_name,
          COUNT(*) OVER (PARTITION BY customer_id) as order_count
   FROM orders o
   JOIN customers c USING (customer_id);
   ```

6. **Check current SQL mode**:

   ```sql
   -- Check current session SQL mode
   SELECT @@sql_mode;

   -- Check global SQL mode
   SELECT @@GLOBAL.sql_mode;
   ```

## Prevention

1. **Always include non-aggregate columns in GROUP BY**:

   ```sql
   -- Correct pattern
   SELECT column1, column2, COUNT(*)
   FROM table_name
   GROUP BY column1, column2;
   ```

2. **Use aggregate functions** for columns that should be summarized:

   ```sql
   -- When you need one representative value
   SELECT department_id,
          MAX(department_name) as department_name,
          AVG(salary) as avg_salary
   FROM employees
   GROUP BY department_id;
   ```

3. **Design queries with proper aggregation** from the start:

   ```sql
   -- Think about what you want to group and what to aggregate
   SELECT
     DATE(order_date) as order_day,
     COUNT(*) as total_orders,
     SUM(order_amount) as total_revenue
   FROM orders
   GROUP BY DATE(order_date);
   ```

4. **Test queries** in development environments with `ONLY_FULL_GROUP_BY` enabled

5. **Use modern MySQL practices** and avoid relying on legacy non-standard behavior
