---
title: 'ERROR 42803: aggregate function calls cannot be nested'
---

## Error Message

```sql
ERROR: aggregate function calls cannot be nested
LINE 1: SELECT MAX(COUNT(*)) FROM orders GROUP BY customer_id;
                   ^
```

## Description

This error occurs when you try to nest one aggregate function inside another aggregate function directly. PostgreSQL does not allow aggregate functions like `COUNT()`, `SUM()`, `MAX()`, `MIN()`, `AVG()` to be nested within each other in the same query level. This is a SQL standard restriction designed to prevent ambiguous aggregation logic.

## Causes

- Directly nesting aggregate functions like `MAX(COUNT(*))`
- Using aggregate functions within other aggregate function parameters
- Attempting complex aggregations without proper query structure
- Misunderstanding SQL aggregation hierarchy and execution order
- Converting complex analytical queries incorrectly from other database systems

## Solutions

1. **Use subqueries to separate aggregation levels**:

   ```sql
   -- Instead of: SELECT MAX(COUNT(*)) FROM orders GROUP BY customer_id;
   -- Use subquery:
   SELECT MAX(order_count)
   FROM (
     SELECT COUNT(*) as order_count
     FROM orders
     GROUP BY customer_id
   ) sub;
   ```

2. **Use Common Table Expressions (CTEs) for clarity**:

   ```sql
   -- More readable with CTE
   WITH customer_order_counts AS (
     SELECT customer_id, COUNT(*) as order_count
     FROM orders
     GROUP BY customer_id
   )
   SELECT MAX(order_count) as max_orders_per_customer
   FROM customer_order_counts;
   ```

3. **Use window functions for analytical queries** (PostgreSQL 8.4+):

   ```sql
   -- Instead of nested aggregates for ranking
   SELECT customer_id,
          COUNT(*) as order_count,
          MAX(COUNT(*)) OVER () as max_order_count
   FROM orders
   GROUP BY customer_id;
   ```

4. **Break complex queries into multiple steps**:

   ```sql
   -- Step 1: Calculate intermediate aggregations
   CREATE TEMP TABLE customer_stats AS
   SELECT customer_id,
          COUNT(*) as total_orders,
          AVG(order_amount) as avg_amount
   FROM orders
   GROUP BY customer_id;

   -- Step 2: Aggregate the results
   SELECT MAX(total_orders) as max_orders,
          AVG(avg_amount) as overall_avg
   FROM customer_stats;
   ```

5. **Use HAVING clause for filtering aggregated results**:

   ```sql
   -- Instead of nested aggregates for filtering
   SELECT customer_id, COUNT(*) as order_count
   FROM orders
   GROUP BY customer_id
   HAVING COUNT(*) = (
     SELECT MAX(order_count)
     FROM (
       SELECT COUNT(*) as order_count
       FROM orders
       GROUP BY customer_id
     ) sub
   );
   ```

6. **Use array aggregation with array functions**:

   ```sql
   -- For complex array-based aggregations
   SELECT customer_id,
          array_length(array_agg(order_id), 1) as order_count
   FROM orders
   GROUP BY customer_id;
   ```

## Common Use Cases and Solutions

1. **Finding maximum count per group**:

   ```sql
   -- Problem: MAX(COUNT(*))
   -- Solution:
   SELECT MAX(cnt)
   FROM (SELECT COUNT(*) as cnt FROM table GROUP BY column) sub;
   ```

2. **Average of group sums**:

   ```sql
   -- Problem: AVG(SUM(amount))
   -- Solution:
   SELECT AVG(total)
   FROM (SELECT SUM(amount) as total FROM sales GROUP BY region) sub;
   ```

3. **Count of distinct groups with conditions**:

   ```sql
   -- Problem: COUNT(COUNT(*) > 5)
   -- Solution:
   SELECT COUNT(*)
   FROM (
     SELECT customer_id
     FROM orders
     GROUP BY customer_id
     HAVING COUNT(*) > 5
   ) sub;
   ```

## Prevention

1. **Plan query structure** before writing complex aggregations:

   - Identify different levels of aggregation needed
   - Separate each aggregation level into subqueries or CTEs
   - Use window functions for analytical requirements

2. **Use proper SQL patterns**:

   ```sql
   -- Good pattern for multi-level aggregation
   WITH level1 AS (
     SELECT group_col, COUNT(*) as cnt
     FROM table
     GROUP BY group_col
   )
   SELECT MAX(cnt), MIN(cnt), AVG(cnt)
   FROM level1;
   ```

3. **Understand aggregate function limitations**:

   - Aggregates operate on sets of rows
   - Cannot nest aggregates that operate on the same row set
   - Use subqueries to create new row sets for higher-level aggregation

4. **Consider using specialized PostgreSQL features**:
   - Window functions for analytical queries
   - FILTER clause for conditional aggregation
   - GROUPING SETS for complex grouping scenarios

<HintBlock type="info">

Window functions can often provide elegant solutions for complex analytical queries that might otherwise require nested aggregates. Consider using `ROW_NUMBER()`, `RANK()`, and aggregate window functions with `OVER` clauses.

</HintBlock>
