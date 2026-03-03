---
title: 'How to Fix Slow MySQL Queries: A Practical Guide'
author: Adela
updated_at: 2026/03/03 09:00:00
feature_image: /content/blog/how-to-fix-slow-mysql-queries/banner.webp
tags: Engineering
description: 'Learn how to find and fix slow MySQL queries using the slow query log, EXPLAIN, index tuning, and query rewrites, with practical examples for each.'
keypage: true
---

A slow MySQL query usually has one of four causes: a missing index, a poorly written query, a schema change that invalidated an existing index, or a table that has grown past the point where its original indexes are still selective. This guide walks through each cause with concrete diagnostics and fixes.

The most effective fixes: add indexes on frequently-filtered columns, rewrite queries that apply functions to indexed columns, and audit your schema after major changes. For persistent slowness, use EXPLAIN to identify which tables are read inefficiently, check the slow query log to find patterns affecting multiple queries, and add monitoring to catch regressions early.

## What makes a MySQL query slow

MySQL executes a query by building an execution plan: a step-by-step description of which tables to read, in what order, and which indexes (if any) to use. When the planner picks a bad plan, the query reads far more rows than it needs to.

The main signals that a query is doing too much work:

- **`type: ALL` in EXPLAIN**: full table scan, reading every row regardless of WHERE conditions
- **`key: NULL` in EXPLAIN**: no index was used
- **`Extra: Using filesort`**: MySQL had to sort results in memory or on disk rather than reading an already-sorted index
- **`Extra: Using temporary`**: MySQL created an internal temp table, common with GROUP BY or DISTINCT on non-indexed columns
- **`rows` estimate is very large**: MySQL expects to examine tens of thousands of rows to return a handful

Any of these in isolation may be acceptable. All of them together on a table with millions of rows means the query will be slow.

## How to enable and read the slow query log

The slow query log records any query that takes longer than `long_query_time` seconds (default: 10). For production investigation, lower it to 1 or 2 seconds. For development, set it to 0 to catch everything.

```sql
-- Check current settings
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long_query_time';

-- Enable the log for the current session (no restart required)
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
SET GLOBAL log_queries_not_using_indexes = 'ON';
```

`log_queries_not_using_indexes` logs any query that skips an index, even if it finishes fast on a small table. This is useful during development to catch bad query patterns before the table grows.

The log file location is set by `slow_query_log_file`. To find it:

```sql
SHOW VARIABLES LIKE 'slow_query_log_file';
```

Two tools parse and group the log by total time:

```bash
# Built-in summarizer
mysqldumpslow -s t -t 10 /path/to/slow.log

# More detailed output from Percona Toolkit
pt-query-digest /path/to/slow.log
```

`mysqldumpslow -s t` sorts by total execution time and shows the top 10 offenders. `pt-query-digest` groups normalized queries and shows average time, rows examined, and row-send ratios. The ratio of rows examined to rows returned tells you how selective the query is. A ratio of 100:1 means MySQL read 100 rows for every 1 it returned, which usually points to a missing index.

## Using EXPLAIN to read the execution plan

Once you have a slow query, run it through EXPLAIN before touching anything:

```sql
EXPLAIN SELECT * FROM orders
WHERE customer_id = 42 AND status = 'pending'
ORDER BY created_at DESC;
```

The columns to focus on:

| Column | What to look for |
|---|---|
| `type` | `ALL` = full scan (bad), `ref` / `range` / `eq_ref` = index lookup (good) |
| `key` | `NULL` means no index used |
| `rows` | Estimated rows scanned (lower is better) |
| `Extra` | Watch for `Using filesort`, `Using temporary`, `Using where` with no index |

In MySQL 8.0+, `EXPLAIN ANALYZE` actually runs the query and returns real execution times alongside the estimates:

```sql
EXPLAIN ANALYZE SELECT * FROM orders
WHERE customer_id = 42 AND status = 'pending'
ORDER BY created_at DESC;
```

When the estimated and actual row counts differ significantly, MySQL's table statistics are stale. Fix that with:

```sql
ANALYZE TABLE orders;
```

## Common causes and fixes

### Missing indexes

The most common cause of a slow query. If EXPLAIN shows `type: ALL` and `key: NULL` on a large table, the fix is almost always adding an index on the column(s) in the WHERE or JOIN clause.

```sql
-- Before: full table scan on customer_id
SELECT * FROM orders WHERE customer_id = 42;

-- Add the index
ALTER TABLE orders ADD INDEX idx_customer_id (customer_id);

-- Confirm it's used
EXPLAIN SELECT * FROM orders WHERE customer_id = 42;
```

For queries that filter on multiple columns, a **composite index** is more efficient than two separate indexes. Put the equality column first, then the range column:

```sql
-- Query filters on both customer_id (equality) and created_at (range)
SELECT * FROM orders
WHERE customer_id = 42 AND created_at >= '2025-01-01';

-- Composite index: equality column first
ALTER TABLE orders ADD INDEX idx_customer_created (customer_id, created_at);
```

MySQL can use the leftmost prefix of a composite index. An index on `(customer_id, created_at)` can serve queries that filter on `customer_id` alone, but not queries that filter on `created_at` alone.

### Full table scans from functions on indexed columns

Wrapping an indexed column in a function prevents MySQL from using the index:

```sql
-- Bad: index on created_at is ignored
SELECT * FROM orders WHERE YEAR(created_at) = 2025;

-- Good: rewrite as a range condition
SELECT * FROM orders
WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01';
```

The same issue occurs with implicit type coercion. If `user_id` is INT but you pass a string, MySQL must convert every row:

```sql
-- Bad: coerces every row
SELECT * FROM users WHERE user_id = '42';

-- Good: types match
SELECT * FROM users WHERE user_id = 42;
```

### N+1 queries

N+1 happens when code runs one query to fetch N parent rows, then runs N more queries to fetch related data for each parent: one trip per row instead of one trip total.

```sql
-- One query to get 100 orders
SELECT id FROM orders WHERE customer_id = 42;

-- Then 100 queries, one per order
SELECT * FROM order_items WHERE order_id = ?;
```

Fix it with a JOIN:

```sql
SELECT o.id, oi.*
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.customer_id = 42;
```

N+1 patterns are hard to spot in application logs because each individual query is fast and doesn't appear in the slow query log on its own. They become visible when the cumulative count gets high. `pt-query-digest` groups normalized queries and shows execution count, which makes N+1 obvious at a glance.

### Correlated subqueries

A correlated subquery re-executes for every row in the outer query:

```sql
-- Slow: subquery runs once per order row
SELECT * FROM orders o
WHERE (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) > 5;
```

Rewrite as a JOIN with aggregation:

```sql
SELECT o.*
FROM orders o
JOIN (
  SELECT order_id, COUNT(*) AS item_count
  FROM order_items
  GROUP BY order_id
) counts ON counts.order_id = o.id
WHERE counts.item_count > 5;
```

### SELECT *

Selecting all columns forces MySQL to read the full row even when only a few columns are needed. On tables with large TEXT or BLOB columns, this significantly increases I/O. Always list the columns you need. For queries that only need indexed columns, a **covering index** means MySQL never has to read the row at all; it returns results directly from the index.

```sql
-- All columns, reads full row
SELECT * FROM users WHERE email = 'user@example.com';

-- Only what's needed
SELECT id, name FROM users WHERE email = 'user@example.com';
```

## How schema changes affect query performance

Schema changes can silently break existing query plans in ways that only show up weeks later as tables grow. Common patterns:

**Adding a column with a default value** on a large table rewrites the table in older MySQL versions. In MySQL 8.0+, most `ADD COLUMN` operations are online, but adding a column with `NOT NULL` and no default still locks the table. See [MySQL Online DDL: A Practical Guide](/blog/mysql-online-ddl/) for which operations are safe.

**Dropping an index** removes query optimization that existing application queries may depend on. Check `sys.schema_unused_indexes` first, and audit slow query logs before removing any index.

**Changing a column type** (e.g., INT to BIGINT, VARCHAR length increase) can invalidate existing indexes or change their selectivity. Always run EXPLAIN on affected queries after a type change to confirm the plan is still efficient.

**Table growth** is the most common reason a previously-fast query becomes slow. An index on `status` with values `pending/shipped/cancelled` has low cardinality. When the table had 1,000 rows it was fast, but at 50 million rows MySQL may decide a full scan is cheaper. Check `EXPLAIN` output on large tables after each order-of-magnitude growth.

Tracking schema changes in version control helps identify when a performance regression started. [MySQL Schema Migration Best Practice](/blog/mysql-schema-migration-best-practice/) covers how to structure migrations so regressions are easier to trace.

## Monitoring slow queries in production

Reviewing the slow query log manually doesn't scale beyond a small team. A few approaches for ongoing monitoring:

**Performance Schema** (enabled by default in MySQL 5.6+) tracks per-query execution statistics in memory:

```sql
-- Top 10 queries by total execution time
SELECT DIGEST_TEXT, COUNT_STAR, SUM_TIMER_WAIT/1e12 AS total_sec
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC
LIMIT 10;
```

**`sys` schema** provides readable views over Performance Schema:

```sql
-- Queries with full table scans
SELECT * FROM sys.statements_with_full_table_scans
ORDER BY total_latency DESC LIMIT 10;

-- Queries with high rows-examined to rows-sent ratio
SELECT * FROM sys.statements_with_runtimes_in_95th_percentile
LIMIT 10;
```

**[Top SQL Server Monitoring Tools](/blog/top-sql-server-monitoring-tools/)** and equivalent MySQL monitoring tools (Percona Monitoring and Management, VividCortex, Datadog's MySQL integration) pull these metrics continuously and alert when query latency spikes.

For timeouts that are intermittent rather than consistent, [MySQL Timeout Explained](/blog/mysql-timeout/) covers the difference between `wait_timeout`, `interactive_timeout`, `innodb_lock_wait_timeout`, and `net_read_timeout`; each governs a different failure mode.

## How Bytebase helps prevent slow queries

Most slow-query incidents in production trace back to a schema change (an added column, a dropped index, a changed foreign key) that was reviewed casually or not at all. [Bytebase](https://www.bytebase.com) integrates SQL review into the schema migration workflow, flagging missing indexes, full-table-scan risks, and schema anti-patterns before changes reach production.

The SQL review engine checks for common patterns that cause slow queries: tables without primary keys, columns referenced in application code that lack indexes, and `SELECT *` in views. Combining this with [Top 4 MySQL Schema Compare Tools](/blog/top-mysql-schema-compare-tools/) to diff schema state across environments means slow-query regressions are caught at review time rather than discovered at 2am.

For teams running [MySQL process list monitoring](/reference/mysql/how-to/how-to-show-mysql-process-list-and-kill-process/), Bytebase's audit log tracks which schema change caused a query plan change, making post-incident investigation faster.

## FAQ

**What is the default value of long_query_time?**
10 seconds. This is too high for most applications. Set it to 1–2 seconds for production monitoring to catch queries that are slow but not catastrophic.

**Why does EXPLAIN show a good plan but the query is still slow?**
EXPLAIN shows estimated row counts based on table statistics. If statistics are stale, the estimates are wrong. Run `ANALYZE TABLE` to refresh them, then re-check with `EXPLAIN ANALYZE` to see actual row counts.

**When should I use a composite index vs separate indexes?**
Use a composite index when a query consistently filters on the same set of columns together. Put equality conditions before range conditions in the column order. Separate indexes are better when different queries use different column subsets.

**Can adding too many indexes slow MySQL down?**
Yes. Each index adds write overhead: inserts, updates, and deletes must maintain every index on the table. Indexes also increase storage. Audit index usage with `sys.schema_unused_indexes` and drop any that haven't been used recently.

**What is a covering index?**
A covering index contains all the columns a query needs, so MySQL can return results from the index alone without reading the full table row. It appears as `Using index` in the Extra column of EXPLAIN. Covering indexes are the most effective optimization for read-heavy queries on large tables.
