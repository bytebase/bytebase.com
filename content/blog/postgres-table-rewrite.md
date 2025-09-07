---
title: Which Postgres Operation causes a table rewrite
author: Adela
updated_at: 2025/09/06 18:00
feature_image: /content/blog/postgres-table-rewrite/cover.webp
tags: Explanation
description: Which operation causes a Postgres table rewrite
---

Postgres is a powerful and popular open-source object-relational database system. However, like any complex system, it has its intricacies. One of the most important concepts to understand for maintaining a healthy and performant Postgres database is the idea of a **table rewrite**.

When Postgres "rewrites" a table, it creates a brand-new copy of the relation (a new **relfilenode**) and swaps it in. This process often requires approximately 2× temporary disk space and usually holds strong locks that can block traffic. A handy mental model is: *if the on-disk row layout must change or the table has to be physically moved/reordered, expect a rewrite.*

This article will explore which Postgres operations cause a table rewrite, which ones don't, and the locking implications of these operations.

## Which Operations Cause a Table Rewrite?

**Lock levels:**

- ACCESS EXCLUSIVE blocks everything
- SHARE blocks writes but not reads;
- SHARE UPDATE EXCLUSIVE allows normal reads & writes.

The default for most `ALTER TABLE` forms is **ACCESS EXCLUSIVE**.

Here is a summary of common Postgres operations and whether they cause a table rewrite:

| Operation                                  | Causes Table Rewrite? | Lock Level | Why?                                                                 |
| ------------------------------------------ | --------------------- | ---------- | -------------------------------------------------------------------- |
| `VACUUM FULL`                              | ✅ Yes                | ACCESS EXCLUSIVE | Compacts table into a new file, frees all space.                     |
| `CLUSTER`                                  | ✅ Yes                | ACCESS EXCLUSIVE | Reorders the table based on an index into a new file.                |
| `ALTER TABLE ... SET TABLESPACE`          | ✅ Yes                | ACCESS EXCLUSIVE | Moves data to new storage layout or tablespace.                      |
| `ALTER TABLE ... SET LOGGED/UNLOGGED`     | ✅ Yes                | ACCESS EXCLUSIVE | Changing persistence forces a rewrite.                               |
| `ALTER TABLE ... ALTER COLUMN TYPE` (incompatible) | ✅ Often     | ACCESS EXCLUSIVE | Rewrite if type change isn't binary-compatible.                      |
| `ALTER TABLE ... ALTER COLUMN TYPE` (compatible) | ❌ No         | ACCESS EXCLUSIVE | Binary-compatible changes (e.g., varchar(50)→varchar(100)) avoid rewrite. |
| `TRUNCATE`                                 | ✅ Yes                | ACCESS EXCLUSIVE | Deletes table content by replacing its file.                         |
| `ALTER TABLE ... ADD COLUMN DEFAULT` (constant) | ❌ No (Postgres 11+) | ACCESS EXCLUSIVE | Stored as metadata only. Old rows remain untouched.                  |
| `ALTER TABLE ... ADD COLUMN DEFAULT` (volatile) | ✅ Yes        | ACCESS EXCLUSIVE | Each existing row needs its own computed value.                       |
| `ALTER TABLE ... DROP COLUMN`              | ❌ No (mostly)        | ACCESS EXCLUSIVE | Column is marked dropped in metadata; no immediate rewrite.          |
| `ALTER TABLE ... ALTER COLUMN SET NOT NULL`| ❌ No                 | ACCESS EXCLUSIVE | Metadata-only change (with validation scan).                         |
| `ALTER TABLE ... ALTER COLUMN SET STORAGE` | ❌ No                 | ACCESS EXCLUSIVE | Only changes future TOAST strategy; existing rows unchanged.         |
| `CREATE INDEX`                             | ❌ No                 | SHARE      | Creates a separate index file, blocks writes but not reads.          |
| `CREATE INDEX CONCURRENTLY`                | ❌ No                 | SHARE UPDATE EXCLUSIVE | Allows reads and writes; takes longer.                    |
| `DROP INDEX`                               | ❌ No                 | ACCESS EXCLUSIVE | Deletes index files, leaves table file alone.                        |
| `ANALYZE`                                  | ❌ No                 | SHARE UPDATE EXCLUSIVE | Collects statistics, no file change.                     |
| `VACUUM` (regular)                         | ❌ No                 | SHARE UPDATE EXCLUSIVE | Cleans dead tuples in-place, no rewrite.                 |

## How to Test for a Rewrite

You can verify whether an operation causes a table rewrite by checking the **relfilenode** before and after the operation:

```sql
-- 1) Check the current relfilenode
SELECT pg_relation_filenode('public.mytable');

-- 2) Run your DDL operation

-- 3) Check again
SELECT pg_relation_filenode('public.mytable');
```

If the value changed, a rewrite occurred. This is a reliable way to test risky DDL before running it in production.

## Survival Playbook

To avoid production issues when working with table operations:

**Prefer non-rewriting forms:** Use binary-compatible type changes (e.g., `varchar(50)` to `varchar(100)`) when possible.

**Split risky operations:** Add nullable columns first, backfill in batches, then add constraints to avoid long ACCESS EXCLUSIVE locks.

**Use CONCURRENTLY where available:** For indexes, use `CREATE INDEX CONCURRENTLY` to allow reads and writes during creation.

**Set guardrails:** Configure `lock_timeout` and `statement_timeout`, and monitor `pg_stat_activity` before starting operations.

**Schedule rewrites:** Plan operations like `VACUUM FULL`, `CLUSTER`, and `SET TABLESPACE` during maintenance windows.

## The Dangers of Locking: A Real-World Example

The story of a production API going down, as detailed in an article by a Site Reliability Engineer, serves as a stark reminder of the dangers of table locking in Postgres. In this incident, a seemingly harmless `ALTER TABLE ... ADD COLUMN` command on a large, heavily-used table triggered a cascade of failures that brought down their entire production infrastructure.

The root cause was a lock contention issue. The `ALTER TABLE` command required an `ACCESS EXCLUSIVE` lock on the table, which blocked all other operations. At the same time, background job workers were trying to acquire row-level locks on the same table using `SELECT ... FOR UPDATE`, and the submission API was attempting to insert new rows with `INSERT ... ON CONFLICT DO NOTHING`. The combination of these factors created a perfect storm of lock contention, leading to a complete system outage.

This real-world example highlights the importance of understanding the locking behavior of Postgres operations. As suggested by Mikhail Balaian, a Chief Database Architect, adding a column to the table rewrite summary to indicate whether an operation "requires table exclusive lock" would be incredibly useful for developers and database administrators.

## TL;DR Quick Reference

**Always rewrite:** `VACUUM FULL`, `CLUSTER`, `TRUNCATE`, `ALTER TABLE ... SET TABLESPACE`, `... SET LOGGED/UNLOGGED`.

**Often rewrite:** `ALTER COLUMN TYPE` (unless binary-compatible), `ADD COLUMN DEFAULT` with volatile functions.

**Usually no rewrite:** `ADD COLUMN DEFAULT` with constants (Postgres 11+), `DROP COLUMN` (immediate), `SET STORAGE`, `ANALYZE`, regular `VACUUM`, `CREATE INDEX`.

## Conclusion

Understanding which Postgres operations cause table rewrites and their associated locking behavior is crucial for maintaining a healthy and performant database. Modern Postgres databases know which Postgres ops rewrite tables and what they lock. Newer versions skip many rewrites (e.g., constant DEFAULT). Follow the playbook: prefer non-rewriting changes, split risky work, use concurrent options, and set timeouts/guardrails to keep production fast and stable.
