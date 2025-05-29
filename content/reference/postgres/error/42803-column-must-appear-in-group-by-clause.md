---
title: 'ERROR 42803: Column must appear in the GROUP BY clause or be used in an aggregate function'
---

## Error Message

```sql
ERROR: column "orders.customer_name" must appear in GROUP BY clause or be used in an aggregate function
LINE 1: SELECT customer_id, customer_name, COUNT(*) FROM orders GROUP BY customer_id;
                             ^
```

## Description

This error occurs when you use a GROUP BY clause in a SELECT statement and include columns in the SELECT list that are neither part of the GROUP BY clause nor used within aggregate functions. PostgreSQL enforces standard SQL rules that require all non-aggregate columns in the SELECT list to be explicitly grouped.

## Causes

- Selecting columns that are not included in the GROUP BY clause
- Mixing grouped and non-grouped columns without proper aggregation
- Missing columns in GROUP BY when using aggregate functions
- Incorrect understanding of SQL grouping requirements
- Migrating queries from databases with less strict GROUP BY rules
- Using columns in SELECT that are functionally dependent but not explicitly grouped

## Solutions

1. **Add missing columns to GROUP BY clause**:

   ```sql
   -- Instead of:
   SELECT customer_id, customer_name, COUNT(*)
   FROM orders
   GROUP BY customer_id;

   -- Use:
   SELECT customer_id, customer_name, COUNT(*)
   FROM orders
   GROUP BY customer_id, customer_name;
   ```

2. **Use aggregate functions for non-grouped columns**:

   ```sql
   -- Use aggregate functions to get representative values
   SELECT customer_id,
          MAX(customer_name) as customer_name,
          COUNT(*) as order_count
   FROM orders
   GROUP BY customer_id;

   -- Or use other aggregates as appropriate
   SELECT customer_id,
          MIN(customer_name) as customer_name,
          SUM(order_amount) as total_amount
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

4. **Use window functions for analytical queries**:

   ```sql
   -- Instead of GROUP BY, use window functions
   SELECT DISTINCT customer_id,
          customer_name,
          COUNT(*) OVER (PARTITION BY customer_id) as order_count
   FROM orders;
   ```

5. **Use subqueries to separate grouping levels**:

   ```sql
   -- Join grouped results with original table
   SELECT o.customer_id,
          c.customer_name,
          stats.order_count
   FROM (
     SELECT customer_id, COUNT(*) as order_count
     FROM orders
     GROUP BY customer_id
   ) stats
   JOIN orders o ON stats.customer_id = o.customer_id
   JOIN customers c ON o.customer_id = c.customer_id;
   ```

6. **Use DISTINCT ON for specific use cases**:

   ```sql
   -- Get one representative row per group
   SELECT DISTINCT ON (customer_id)
          customer_id,
          customer_name,
          order_date
   FROM orders
   ORDER BY customer_id, order_date DESC;
   ```

## Common Patterns and Solutions

1. **Getting latest record per group**:

   ```sql
   -- Problem: SELECT customer_id, customer_name, MAX(order_date)
   -- Solution with window functions:
   SELECT customer_id, customer_name, order_date
   FROM (
     SELECT customer_id, customer_name, order_date,
            ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) as rn
     FROM orders
   ) ranked
   WHERE rn = 1;
   ```

2. **Aggregating with related table data**:

   ```sql
   -- Problem: Need customer details with order statistics
   -- Solution with proper joins:
   SELECT c.customer_id,
          c.customer_name,
          COUNT(o.order_id) as order_count,
          COALESCE(SUM(o.order_amount), 0) as total_spent
   FROM customers c
   LEFT JOIN orders o ON c.customer_id = o.customer_id
   GROUP BY c.customer_id, c.customer_name;
   ```

3. **Multiple aggregation levels**:

   ```sql
   -- Use CTEs for complex multi-level grouping
   WITH monthly_sales AS (
     SELECT DATE_TRUNC('month', order_date) as month,
            customer_id,
            SUM(order_amount) as monthly_total
     FROM orders
     GROUP BY DATE_TRUNC('month', order_date), customer_id
   )
   SELECT customer_id,
          AVG(monthly_total) as avg_monthly_spending,
          COUNT(*) as active_months
   FROM monthly_sales
   GROUP BY customer_id;
   ```

## Prevention

1. **Plan your grouping strategy** before writing queries:

   - Identify what you want to group by
   - Determine which columns need aggregation
   - Ensure all SELECT columns are properly handled

2. **Use consistent patterns**:

   ```sql
   -- Good pattern for reporting queries
   SELECT grouped_column1,
          grouped_column2,
          COUNT(*) as record_count,
          SUM(numeric_column) as total_amount,
          AVG(numeric_column) as average_amount
   FROM table_name
   GROUP BY grouped_column1, grouped_column2;
   ```

3. **Understand functional dependencies**:

   ```sql
   -- When grouping by primary key, other columns are automatically valid
   SELECT customer_id,
          customer_name,  -- Valid because customer_id is PK
          COUNT(order_id)
   FROM customers
   JOIN orders USING (customer_id)
   GROUP BY customers.customer_id;
   ```

4. **Use modern PostgreSQL features**:

   - Window functions for analytical queries
   - FILTER clause for conditional aggregation
   - GROUPING SETS for complex grouping scenarios

5. **Test queries incrementally**:
   - Start with simple GROUP BY
   - Add columns one by one
   - Verify each addition follows GROUP BY rules

<HintBlock type="info">

PostgreSQL recognizes functional dependencies based on primary keys and unique constraints. When you group by a primary key, you can select other columns from the same table without including them in GROUP BY.

</HintBlock>
