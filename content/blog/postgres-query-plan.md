---
title: 'Postgres Query Plan: How to Read and Fix Performance Issues'
author: Adela
updated_at: 2026/01/20 12:00:00
feature_image: /content/blog/postgres-query-plan/cover.webp
tags: Industry
description: A comprehensive guide to understanding and analyzing Postgres query plans.
---

When a Postgres query runs slowly, the problem is rarely the SQL syntax itself. The real cause is usually **how Postgres chooses to execute the query**. That decision is captured in the **Postgres query plan**.

A query plan shows which tables are scanned, which indexes are used, how joins are performed, and how much work Postgres expects each step to take. Learning to read and reason about query plans is one of the most effective ways to diagnose performance problems and prevent regressions.

This article focuses on three practical skills:

1. How to read a Postgres query plan
2. How to troubleshoot common performance issues
3. How to fix query plan problems safely

---

## What Is a Postgres Query Plan?

A **Postgres query plan** is the execution strategy chosen by Postgres’ cost-based optimizer for a SQL statement.

When you run:

```sql
EXPLAIN SELECT * FROM orders WHERE customer_id = 42;
```

Postgres does not execute the query. Instead, it shows the steps it **would** take, including scan methods, join algorithms, and cost estimates.

Using:

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;
```

Postgres executes the query and reports **actual execution time, row counts, and loops**, which makes it the most reliable way to understand real performance.

## How Postgres Builds a Query Plan

Postgres builds a query plan in several stages:

1. Parsing – validates SQL and resolves tables, columns, and functions
2. Rewriting – expands views and applies rules and security policies
3. Planning – evaluates execution strategies using table statistics and selects the lowest-cost plan
4. Execution – runs the chosen plan, consuming CPU, memory, and I/O

`EXPLAIN` shows the result of planning, while `EXPLAIN ANALYZE` includes execution.

| Command                    | Purpose                               |
| -------------------------- | ------------------------------------- |
| EXPLAIN                    | Shows estimated plan only             |
| EXPLAIN ANALYZE            | Executes query and shows real metrics |
| EXPLAIN (ANALYZE, BUFFERS) | Adds memory and disk usage            |
| EXPLAIN (ANALYZE, VERBOSE) | Shows internal details                |

Use `EXPLAIN ANALYZE` in **staging** or with care in **production**.

## How to Read a Postgres Query Plan

### Read bottom-up, not top-down

Postgres executes query plans **from the leaf nodes upward**.

```text
Hash Join
  -> Seq Scan on orders
  -> Index Scan on customers
```

Execution order: Scan `orders` -> Scan `customers` -> Join the results

### Key plan nodes you should recognize

| Node              | Meaning                          |
| ----------------- | -------------------------------- |
| Seq Scan          | Full table scan                  |
| Index Scan        | Reads rows via an index          |
| Bitmap Index Scan | Index lookup + heap access       |
| Nested Loop       | Repeats inner scan per outer row |
| Hash Join         | Builds an in-memory hash table   |
| Merge Join        | Joins sorted inputs              |

Most performance issues involve a small subset of these nodes.

### The 5 fields to check first

| Field                | Why it matters          |
| -------------------- | ----------------------- |
| **Actual Time**      | Real execution cost     |
| **Actual Rows**      | What actually happened  |
| **Estimated Rows**   | Planner expectation     |
| **Loops**            | Hidden work multipliers |
| **Scan / Join type** | Execution strategy      |

Large gaps between estimated and actual rows often indicate deeper problems.

## How to Troubleshoot Common Postgres Query Plan Problems

### Problem 1: Sequential Scan on a Large Table

**Symptoms**

- Seq Scan over millions of rows
- Long execution time

**Common causes**

- Missing index
- Low-selectivity filter
- Planner believes index access is more expensive

### Problem 2: Nested Loop With High Loop Count

**Symptoms**

- Nested Loop
- Inner scan runs thousands of times

**Common causes**

- Missing index on join keys
- Poor join order

### Problem 3: Large Gap Between Estimated and Actual Rows

**Symptoms**

```text
estimated rows = 10
actual rows = 100000
```

**Common causes**

- Outdated statistics
- Skewed data distribution
- Correlated columns

### Problem 4: Query Plan Changes After Deployment

**Symptoms**

- Same SQL suddenly slower
- Different plans across environments

**Common causes**

- Data growth
- Missing ANALYZE
- Schema or index changes

## How to Fix Postgres Query Plan Issues

### Fix 1: Add or Adjust Indexes (Carefully)

Indexes help when:

- Filters are selective
- Join columns are frequently used
- `ORDER BY` matches index order

Avoid indexing low-selectivity columns or adding indexes blindly.

### Fix 2: Refresh and Improve Statistics

```sql
ANALYZE;
```

Targeted:

```sql
ANALYZE orders (customer_id, created_at);
```

Extended statistics for correlated columns:

```sql
CREATE STATISTICS orders_stats
ON customer_id, status
FROM orders;
```

Accurate statistics lead to better plans.

### Fix 3: Rewrite the Query

Effective rewrites include:

- Pushing filters earlier
- Reducing result sets
- Replacing correlated subqueries
- Avoiding `SELECT *`

Small SQL changes can lead to **very different query plans**.

### Fix 4: Verify Improvements With EXPLAIN ANALYZE

Always confirm:

- Execution time improves
- Estimates align better with reality
- No new regressions appear

Never rely on estimated cost alone.

### Fix 5: Prevent Query Plan Regressions

Many performance issues appear **after deployment**.

Best practices:

- Review query plans during SQL review
- Compare plans across environments
- Detect plan changes as part of CI/CD

## When Postgres Query Plans Matter Most

- Slow queries
- Performance regressions
- Schema migrations
- Large datasets
- Production stability

If SQL is part of your delivery pipeline, **query plan review should be too**.

### Final takeaway

A Postgres query plan is a window into how Postgres thinks. Teams that understand and review query plans proactively fix performance problems **before** they reach production, **not after** users complain.