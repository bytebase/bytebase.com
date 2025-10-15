---
title: What is Postgres LATERAL JOIN?
author: Adela
updated_at: 2025/10/15 11:16:32
feature_image: /content/blog/postgres-lateral-join/cover.webp
tags: Explanation
description: Explain what is Postgres LATERAL JOIN and how to use it.
---

A **LATERAL JOIN** allows a subquery in the `FROM` clause to reference columns from tables that appear earlier in the same `FROM` list.
PostgreSQL evaluates that subquery **once per row** of the left-side table, similar to a correlated subquery but written in `FROM`.

Use it when you need "for each row X, run this query that depends on X."

## Basic Syntax

The fundamental pattern looks like this:

```sql
FROM left_table lt
LEFT JOIN LATERAL (
  SELECT ...
  FROM ...
  WHERE ... lt.col ...
) s ON true
```

You can also write it as:

```sql
FROM lt, LATERAL (SELECT ...) s              -- CROSS JOIN LATERAL
FROM lt CROSS JOIN LATERAL (SELECT ...) s    -- explicit CROSS JOIN
```

The difference between `CROSS JOIN LATERAL` and `LEFT JOIN LATERAL` is crucial. `CROSS JOIN LATERAL` drops left rows when the subquery returns no rows, while `LEFT JOIN LATERAL` keeps all left rows and fills the right side with NULLs when there's no match.

## Why is it Called "Lateral"?

The term comes from Latin *lateralis*, meaning "of or pertaining to the side." In SQL, it refers to the subquery's ability to look **sideways** (laterally) at columns from tables that appear to its **left** in the `FROM` clause.

In the SQL standard, a *lateral derived table* is a subquery in `FROM` that can refer to columns from items that appear earlier in `FROM`. “Lateral” means the dependency runs sideways to the left, not downward like a nested subquery. So `LATERAL` just signals "this subquery may use columns from the tables before it."

## Core Example: Top-N Per Group

The classic use case is finding the top N records for each group. Suppose you want the most recent order for each customer:

```sql
SELECT c.id, c.name, o.order_id, o.placed_at, o.total
FROM customers c
LEFT JOIN LATERAL (
  SELECT *
  FROM orders o
  WHERE o.customer_id = c.id
  ORDER BY o.placed_at DESC
  LIMIT 1
) o ON true;
```

This is elegant and efficient. The `LIMIT 1` runs **per customer**, not globally. With a proper index on `(customer_id, placed_at DESC)`, PostgreSQL can grab the most recent order for each customer with minimal work. Compare this to window functions or self-joins, which often require more complex logic and can be slower.

## Common Use Cases

**Expanding JSON arrays per row.** When you have JSON data stored in a column and need to expand it into multiple rows:

```sql
SELECT p.id,
       item->>'sku' AS sku,
       (item->>'qty')::int AS qty
FROM purchase_requests p
LEFT JOIN LATERAL jsonb_array_elements(p.items_json) AS item ON true;
```

Each row's `items_json` array becomes multiple rows, one per element.

**Set-returning functions.** Functions that return multiple rows can be used with `LATERAL` (though the keyword is optional for functions):

```sql
SELECT u.id, g
FROM users u
JOIN generate_series(1, u.max_groups) AS g ON true;
```

The function `generate_series` can reference `u.max_groups` from the preceding table.

**Conversion funnel analysis.** Tracking user journeys through sequential events where each step depends on the previous one. For example, finding users who viewed a homepage, then used a demo within a week, then entered credit card details within another week. Each `LATERAL` join represents a funnel step that can reference timestamps and conditions from prior steps.

## Performance Considerations

LATERAL joins are implemented as nested loop joins. This means for N rows on the left and M rows per subquery, the complexity is O(N×M). However, with proper indexing, this can be very efficient:

| Optimization | Impact |
|:-------------|:-------|
| **Index on filtered columns** | Critical. For the "most recent order" example, an index on `(customer_id, placed_at DESC)` allows PostgreSQL to use an index scan per customer. |
| **LIMIT in subquery** | Drastically reduces work per left row by stopping early. |
| **LEFT vs CROSS JOIN** | Use `LEFT JOIN LATERAL` when you want to keep all left rows; use `CROSS JOIN LATERAL` when you only want rows with matches. |

Always use `EXPLAIN (ANALYZE, BUFFERS)` to verify your query plan and ensure indexes are being used effectively.

## Gotchas

The lateral subquery can only reference **preceding** `FROM` items. Order matters. If you write `FROM a, LATERAL (SELECT ...) s, b`, the subquery can see `a` but not `b`.

`CROSS JOIN LATERAL` drops left rows with no match. If you want to keep all left rows (like a standard `LEFT JOIN`), use `LEFT JOIN LATERAL ... ON true`.

It's easy to accidentally multiply rows. If you only need one row per left row, make sure to use `ORDER BY ... LIMIT 1` in the subquery.

## Quick Reference Patterns

**Top N items per parent:**

```sql
SELECT p.id, i.*
FROM projects p
LEFT JOIN LATERAL (
  SELECT *
  FROM issues i
  WHERE i.project_id = p.id
  ORDER BY i.priority DESC, i.created_at DESC
  LIMIT 3
) i ON true;
```

**Tokenize text per row:**

```sql
SELECT d.id, t.token
FROM docs d
LEFT JOIN LATERAL regexp_split_to_table(d.body, '\s+') AS t(token) ON true;
```

**Per-row function with parameters:**

```sql
SELECT a.id, nearby.id AS nearby_id, nearby.distance
FROM addresses a
LEFT JOIN LATERAL (
  SELECT b.id, st_distance(a.geom, b.geom) AS distance
  FROM addresses b
  WHERE b.city = a.city
  ORDER BY a.geom <-> b.geom
  LIMIT 1
) nearby ON true;
```

## Conclusion

LATERAL joins are a powerful tool for solving problems that would otherwise require complex window functions, procedural code, or inefficient self-joins. They shine in top-N-per-group scenarios, working with set-returning functions, and any situation where you need to run a parameterized query for each row of a table. Master this feature, and you'll write cleaner, faster queries.