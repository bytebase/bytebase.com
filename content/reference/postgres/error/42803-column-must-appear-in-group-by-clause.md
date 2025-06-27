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
- Migrating queries from databases with less strict GROUP BY rules

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

## Common Use Cases

1. **Getting latest record per group**:

   ```sql
   -- Use window functions for latest record
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
   -- Proper grouping with joins
   SELECT c.customer_id,
          c.customer_name,
          COUNT(o.order_id) as order_count
   FROM customers c
   LEFT JOIN orders o ON c.customer_id = o.customer_id
   GROUP BY c.customer_id, c.customer_name;
   ```

## Prevention

- Plan your grouping strategy before writing queries
- Use consistent patterns for reporting queries
- Understand that when grouping by primary key, other columns from that table are automatically valid
