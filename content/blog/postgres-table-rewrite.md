---
title: Which Postgres Operation causes a table rewrite
author: Adela
updated_at: 2025/09/06 18:00
feature_image: /content/blog/postgres-table-rewrite/cover.webp
tags: Explanation
description: Which operation causes a Postgres table rewrite
---

Postgres is a powerful and popular open-source object-relational database system. However, like any complex system, it has its intricacies. One of the most important concepts to understand for maintaining a healthy and performant Postgres database is the idea of a **table rewrite**.

When Postgres "rewrites" a table, it creates a brand-new copy of the relation (a new **relfilenode**) and swaps it in. This process often requires approximately 2× temporary disk space and usually holds strong locks that can block traffic. A handy mental model is: _if the on-disk row layout must change or the table has to be physically moved/reordered, expect a rewrite._

This article will explore which Postgres operations cause a table rewrite, which ones don't, and the locking implications of these operations.

## Which Operations Cause a Table Rewrite?

Here is a summary of common Postgres operations and whether they cause a table rewrite:

| Operation                                          | Rewrite?             | Lock Level             | Why?                                                                      |
| -------------------------------------------------- | -------------------- | ---------------------- | ------------------------------------------------------------------------- |
| `TRUNCATE`                                         | ✅ Yes               | ACCESS EXCLUSIVE       | Deletes table content by replacing its file.                              |
| `ALTER TABLE ... SET TABLESPACE`                   | ✅ Yes               | ACCESS EXCLUSIVE       | Moves data to new storage layout or tablespace.                           |
| `ALTER TABLE ... SET LOGGED/UNLOGGED`              | ✅ Yes               | ACCESS EXCLUSIVE       | Changing persistence forces a rewrite.                                    |
| `ALTER TABLE ... ALTER COLUMN TYPE` (incompatible) | ✅ Often             | ACCESS EXCLUSIVE       | Rewrite if type change isn't binary-compatible.                           |
| `ALTER TABLE ... ALTER COLUMN TYPE` (compatible)   | ❌ No                | ACCESS EXCLUSIVE       | Binary-compatible changes (e.g., varchar(50)→varchar(100)) avoid rewrite. |
| `ALTER TABLE ... ADD COLUMN DEFAULT` (constant)    | ❌ No (Postgres 11+) | ACCESS EXCLUSIVE       | Stored as metadata only. Old rows remain untouched.                       |
| `ALTER TABLE ... ADD COLUMN DEFAULT` (volatile)    | ✅ Yes               | ACCESS EXCLUSIVE       | Each existing row needs its own computed value.                           |
| `ALTER TABLE ... DROP COLUMN`                      | ❌ No (mostly)       | ACCESS EXCLUSIVE       | Column is marked dropped in metadata; no immediate rewrite.               |
| `ALTER TABLE ... ALTER COLUMN SET NOT NULL`        | ❌ No                | ACCESS EXCLUSIVE       | Metadata-only change (with validation scan).                              |
| `ALTER TABLE ... ALTER COLUMN SET STORAGE`         | ❌ No                | ACCESS EXCLUSIVE       | Only changes future TOAST strategy; existing rows unchanged.              |
| `CREATE INDEX`                                     | ❌ No                | SHARE                  | Creates a separate index file, blocks writes but not reads.               |
| `CREATE INDEX CONCURRENTLY`                        | ❌ No                | SHARE UPDATE EXCLUSIVE | Allows reads and writes; takes longer.                                    |
| `DROP INDEX`                                       | ❌ No                | ACCESS EXCLUSIVE       | Deletes index files, leaves table file alone.                             |
| `VACUUM FULL`                                      | ✅ Yes               | ACCESS EXCLUSIVE       | Compacts table into a new file, frees all space.                          |
| `CLUSTER`                                          | ✅ Yes               | ACCESS EXCLUSIVE       | Reorders the table based on an index into a new file.                     |
| `ANALYZE`                                          | ❌ No                | SHARE UPDATE EXCLUSIVE | Collects statistics, no file change.                                      |
| `VACUUM` (regular)                                 | ❌ No                | SHARE UPDATE EXCLUSIVE | Cleans dead tuples in-place, no rewrite.                                  |

The default lock level for most `ALTER TABLE` forms is **ACCESS EXCLUSIVE**:

- ACCESS EXCLUSIVE blocks everything
- SHARE blocks writes but not reads;
- SHARE UPDATE EXCLUSIVE allows normal reads & writes.

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

## Playbook

To avoid production issues with re-write:

**Prefer non-rewriting forms:** Use binary-compatible type changes (e.g., `varchar(50)` to `varchar(100)`) when possible.

**Schedule rewrites:** Plan operations like `VACUUM FULL`, `CLUSTER`, and `SET TABLESPACE` during maintenance windows.

## Conclusion

Understanding which Postgres operations cause table rewrites and their associated locking behavior is crucial for maintaining a healthy and performant database. Modern Postgres databases know which Postgres ops rewrite tables and what they lock. Newer versions skip many rewrites (e.g., constant DEFAULT). Follow the playbook: prefer non-rewriting changes and schedule rewrites in off-peak hours.
