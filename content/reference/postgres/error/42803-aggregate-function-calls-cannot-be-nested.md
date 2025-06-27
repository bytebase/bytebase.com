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

This error occurs when you try to nest one aggregate function inside another aggregate function directly. PostgreSQL does not allow aggregate functions like `COUNT()`, `SUM()`, `MAX()`, `MIN()`, `AVG()` to be nested within each other in the same query level.

## Causes

- Directly nesting aggregate functions like `MAX(COUNT(*))`
- Using aggregate functions within other aggregate function parameters
- Attempting complex aggregations without proper query structure
- Converting analytical queries incorrectly from other database systems

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
   WITH customer_order_counts AS (
     SELECT customer_id, COUNT(*) as order_count
     FROM orders
     GROUP BY customer_id
   )
   SELECT MAX(order_count) as max_orders_per_customer
   FROM customer_order_counts;
   ```

3. **Use window functions for analytical queries**:

   ```sql
   -- Instead of nested aggregates for ranking
   SELECT customer_id,
          COUNT(*) as order_count,
          MAX(COUNT(*)) OVER () as max_order_count
   FROM orders
   GROUP BY customer_id;
   ```

## Common Use Cases

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

## Prevention

- Plan query structure before writing complex aggregations
- Use subqueries or CTEs to separate each aggregation level
- Consider window functions for analytical requirements
- Use proper SQL patterns for multi-level aggregation

<HintBlock type="info">

Use subqueries or CTEs to break down complex aggregations into multiple levels. This not only resolves the nesting error but also makes your queries more readable and maintainable.

</HintBlock>
