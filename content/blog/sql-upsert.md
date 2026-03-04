---
title: 'Upsert in SQL: INSERT ON DUPLICATE KEY vs ON CONFLICT Explained'
author: Adela
updated_at: 2026/03/04 09:00:00
feature_image: /content/blog/sql-upsert/banner.webp
tags: Explanation
description: 'Upsert inserts or updates a row based on key conflicts. Learn MySQL INSERT ON DUPLICATE KEY UPDATE, PostgreSQL ON CONFLICT, and SQL Server MERGE.'
keypage: true
---

An upsert is a single database operation that inserts a new row or updates an existing one, depending on whether a conflict is found on a primary key or unique index. The term blends "update" and "insert." Most SQL databases support the pattern natively but with different syntax: MySQL uses `INSERT ... ON DUPLICATE KEY UPDATE`, PostgreSQL uses `INSERT ... ON CONFLICT`, and SQL Server uses `MERGE`.

Each implementation has edge cases that behave differently under concurrent load or on tables with multiple unique indexes. This guide covers the syntax for each database, the pitfalls worth knowing before you ship, and how upserts interact with migrations.

## What is upsert and when to use it

An upsert is useful whenever you need to write data without first checking whether a row already exists. Common scenarios:

- **Syncing external data**: pull records from an API and write them to a local table; update the row if present, insert if not
- **Idempotent writes**: a retry-safe operation that produces the same result whether it runs once or ten times
- **Counters and accumulators**: increment a value if the row exists, or initialize it to a starting value if not
- **Seed data in migrations**: write default configuration rows that should exist, without failing if they already do

Without native upsert support, the typical pattern is SELECT-then-INSERT/UPDATE: two round trips with a race condition window between them. Upsert collapses this into one atomic operation.

## MySQL: INSERT ON DUPLICATE KEY UPDATE

MySQL's upsert syntax:

```sql
INSERT INTO table (col1, col2, ...)
VALUES (val1, val2, ...)
ON DUPLICATE KEY UPDATE col2 = val2, ...;
```

When the row being inserted would violate a `PRIMARY KEY` or `UNIQUE` index, MySQL runs the `UPDATE` clause instead of failing. The `VALUES()` function (MySQL 5.x) or column aliases (MySQL 8.0.19+) reference the proposed insert values inside the `UPDATE`:

```sql
-- MySQL 8.0.19+ (preferred)
INSERT INTO page_views (page_id, view_count)
VALUES (42, 1) AS new_vals
ON DUPLICATE KEY UPDATE view_count = view_count + new_vals.view_count;

-- Older syntax using VALUES() function
INSERT INTO page_views (page_id, view_count)
VALUES (42, 1)
ON DUPLICATE KEY UPDATE view_count = view_count + VALUES(view_count);
```

**Affected rows behavior**

MySQL's affected-rows count is non-obvious:

| Result | Affected rows |
|--------|--------------|
| Row inserted | 1 |
| Existing row updated | 2 |
| Row matched, no columns changed | 0 |

This matters in application code that reads affected rows to decide what happened. ORMs often abstract this away, but raw database clients expose it.

**The multiple unique index caveat**

If a table has more than one `UNIQUE` or `PRIMARY KEY` index and the inserted row conflicts on more than one of them, MySQL only triggers the update for the first matching index. The MySQL documentation explicitly warns against using `ON DUPLICATE KEY UPDATE` on tables with multiple unique indexes. The result depends on index order and is not deterministic.

For tables with a single primary key (the common case), the behavior is clean and predictable. For [AUTO_INCREMENT primary keys](/reference/mysql/how-to/how-to-use-auto-increment-mysql/), the auto-increment counter still advances even on a conflict, which can cause gaps in the sequence.

**REPLACE INTO: skip this**

MySQL also has `REPLACE INTO`, which handles conflicts by deleting the conflicting row and inserting a new one. This resets the primary key on auto-increment tables, fires DELETE + INSERT triggers rather than UPDATE triggers, and can break foreign key relationships. Use `ON DUPLICATE KEY UPDATE` instead.

## PostgreSQL: INSERT ... ON CONFLICT

PostgreSQL added `INSERT ... ON CONFLICT` in version 9.5. The syntax:

```sql
INSERT INTO table (col1, col2, ...)
VALUES (val1, val2, ...)
ON CONFLICT (conflict_column)
DO UPDATE SET col2 = EXCLUDED.col2, ...;
```

`EXCLUDED` is a special table alias that refers to the row that was proposed for insertion. This is cleaner than MySQL's `VALUES()` approach because you can reference `EXCLUDED` anywhere in the `SET` clause, including inside expressions:

```sql
INSERT INTO page_views (page_id, view_count, last_seen)
VALUES (42, 1, NOW())
ON CONFLICT (page_id)
DO UPDATE SET
    view_count = page_views.view_count + EXCLUDED.view_count,
    last_seen = EXCLUDED.last_seen;
```

**DO NOTHING**

When you want to silently skip conflicts rather than update:

```sql
INSERT INTO users (email, name)
VALUES ('alice@example.com', 'Alice')
ON CONFLICT (email) DO NOTHING;
```

`DO NOTHING` is safe for idempotent seed data or deduplication pipelines where a duplicate just means the work was already done.

**Conflict target options**

PostgreSQL requires a conflict target when using `DO UPDATE`:

```sql
-- By column (most common; infers the unique index)
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name

-- By named constraint
ON CONFLICT ON CONSTRAINT users_email_key DO NOTHING

-- By partial unique index
ON CONFLICT (user_id) WHERE is_active = true DO UPDATE SET ...
```

Specifying by column is preferable to specifying by constraint name. If the underlying index is rebuilt, column-based inference continues to work; a constraint-name reference breaks.

**Atomicity guarantee**

`INSERT ... ON CONFLICT` is fully atomic under PostgreSQL's MVCC model. Under concurrent load, no two sessions can race to insert the same row and both succeed. PostgreSQL guarantees that exactly one of INSERT or UPDATE fires per row per statement execution. This is a stronger guarantee than the SELECT-then-INSERT pattern, where a race window exists between the SELECT and the INSERT.

## SQL Server and other databases

**SQL Server: MERGE**

SQL Server uses `MERGE`, which is also the SQL standard syntax (SQL:2003):

```sql
MERGE INTO target_table AS target
USING (VALUES (42, 1)) AS source (page_id, view_count)
ON target.page_id = source.page_id
WHEN MATCHED THEN
    UPDATE SET target.view_count = target.view_count + source.view_count
WHEN NOT MATCHED THEN
    INSERT (page_id, view_count) VALUES (source.page_id, source.view_count);
```

`MERGE` requires a semicolon terminator; omitting it raises Error 10713.

`MERGE` is more verbose than MySQL or PostgreSQL upsert, but also more general. You can handle MATCHED, NOT MATCHED BY TARGET, and NOT MATCHED BY SOURCE in one statement, which makes it suitable for full table synchronization. [MySQL vs SQL Server](/blog/mysql-vs-sqlserver/) covers more syntax differences between the two.

**SQLite**

SQLite uses `INSERT OR REPLACE` (same delete-then-insert problem as MySQL's `REPLACE INTO`) or the cleaner `INSERT ... ON CONFLICT` syntax added in version 3.24.0 (released June 2018), which closely mirrors PostgreSQL. If you are on an older SQLite version, upgrade before relying on `ON CONFLICT DO UPDATE`.

```sql
INSERT INTO page_views (page_id, view_count)
VALUES (42, 1)
ON CONFLICT(page_id) DO UPDATE SET view_count = view_count + excluded.view_count;
```

Note: SQLite spells `excluded` in lowercase; PostgreSQL accepts both cases.

**Oracle**

Oracle uses `MERGE` with syntax similar to SQL Server. There is no `INSERT ... ON CONFLICT` shorthand.

## Performance and locking considerations

Upserts save a round trip compared to SELECT-then-INSERT/UPDATE, but they do carry locking costs.

**MySQL InnoDB locking**

`ON DUPLICATE KEY UPDATE` acquires an exclusive lock on the conflicting row even when the update changes no values. On high-write tables with frequent conflicts, this increases lock wait time. For insert-heavy workloads where conflicts are rare, catching the duplicate-key exception in application code and retrying as an UPDATE can be faster, but only if you handle the exception explicitly.

**PostgreSQL MVCC**

`INSERT ... ON CONFLICT` locks the conflicting row for the duration of the statement, then releases it. Under PostgreSQL's MVCC model this is safe for concurrent use: no silent data races, no phantom updates.

**Deadlock risk with batch upserts**

When upserting multiple rows in one statement, two concurrent transactions can deadlock if they conflict on rows in different orders. This happens when transaction A holds a lock on row 1 and waits for row 2, while transaction B holds a lock on row 2 and waits for row 1. Sort rows by primary key before batching to reduce this risk:

```sql
-- Sort by primary key before batching
INSERT INTO page_views (page_id, view_count)
VALUES (1, 5), (2, 3), (7, 1)
ON CONFLICT (page_id)
DO UPDATE SET view_count = page_views.view_count + EXCLUDED.view_count;
```

**`RETURNING` for post-insert diagnostics (PostgreSQL)**

PostgreSQL's `RETURNING` clause tells you which action was taken:

```sql
INSERT INTO users (email, name)
VALUES ('alice@example.com', 'Alice')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
RETURNING xmax;
-- xmax = 0 → row was inserted; non-zero → row was updated
```

## Upsert in application code and migrations

**ORM support**

Most ORMs support upsert natively, but the method name varies:

| ORM | Method |
|-----|--------|
| Prisma | `upsert()` |
| Sequelize | `upsert()` |
| SQLAlchemy | `insert().on_conflict_do_update()` |
| Knex.js | `onConflict().merge()` |
| TypeORM | `save()` with `upsert: true` |

**Upserts in migration scripts**

Upsert-based seed data is idempotent: running the migration twice produces the same result. For reference tables (countries, currencies, status codes, permission names), an upsert seed is safer than a plain `INSERT` because it doesn't fail if the table was already populated:

```sql
-- Safe to run multiple times
INSERT INTO currencies (code, name)
VALUES ('USD', 'US Dollar'), ('EUR', 'Euro')
ON CONFLICT (code) DO NOTHING;
```

One edge case: when adding a `UNIQUE` constraint to an existing column as part of a migration, any pre-existing duplicate values will cause the `ALTER TABLE` to fail before upsert logic is ever reached. Clean duplicates before adding the constraint. [What is Database Schema Migration?](/blog/what-is-database-migration/) covers safe migration sequencing in more detail.

The primary key or unique index drives which conflicts upsert detects. Understanding [primary key vs foreign key](/blog/primary-key-vs-foreign-key/) constraints matters when working out why a particular upsert is or is not triggering the update path.

## Bytebase and safe upsert migrations

Upsert patterns interact with schema changes in non-obvious ways. Adding or removing a unique index changes which conflicts the upsert detects. Renaming a constraint in PostgreSQL breaks any `ON CONFLICT ON CONSTRAINT` references in application code. Changing a column's data type can silently shift when two rows are considered equal by the conflict resolver.

[Bytebase](https://www.bytebase.com) reviews schema migrations before they reach production and flags constraint modifications that break existing query patterns. If a unique index referenced by application upserts is being dropped or renamed, Bytebase surfaces the risk during the migration review step rather than after a production deploy. For teams running [PostgreSQL and MySQL side by side](/blog/postgres-vs-mysql/), Bytebase normalizes the review workflow regardless of which upsert dialect each database uses.

## FAQ

**What is the difference between upsert and MERGE?**
`MERGE` is the SQL standard syntax for upsert, used by SQL Server and Oracle. MySQL and PostgreSQL implement shorter non-standard forms that only handle insert-or-update. `MERGE` can also handle DELETE in the same statement, making it useful for full table synchronization beyond single-row upserts.

**Can I use ON CONFLICT with a composite unique index in PostgreSQL?**
Yes. List all columns that form the composite unique index: `ON CONFLICT (col1, col2) DO UPDATE SET ...`. PostgreSQL infers the unique index that covers exactly those columns. If no such index exists, the statement errors at runtime.

**Why does MySQL ON DUPLICATE KEY UPDATE return 2 affected rows on an update?**
MySQL's convention: 1 means a row was inserted, 2 means an existing row was updated, 0 means the row was matched but no columns changed. This is intentional and documented behavior. ORMs typically abstract it, but raw database clients expose the raw count.

**Is REPLACE INTO the same as upsert?**
No. `REPLACE INTO` deletes the conflicting row and inserts a new one. This resets the primary key on auto-increment tables, fires DELETE triggers instead of UPDATE triggers, and breaks foreign key references that point at the deleted row. Use `INSERT ... ON DUPLICATE KEY UPDATE` instead.

**Does PostgreSQL ON CONFLICT work with partial unique indexes?**
Yes. For a partial unique index defined with a `WHERE` clause, include the same predicate in the conflict target: `ON CONFLICT (col) WHERE is_active = true DO UPDATE SET ...`. PostgreSQL only uses the partial index for inference when the inserted row matches the predicate.
