---
title: "What's New in PostgreSQL 18 - a DBA's Perspective"
author: Tianzhou
updated_at: 2025/05/23 12:00
feature_image: /content/blog/what-is-new-in-postgres-18/cover.webp
tags: Industry
featured: true
description: 'Overview of PostgreSQL 18 features with spicy comments'
---

<HintBlock type="info">

This post is maintained by Bytebase, an open-source database DevSecOps tool that can manage PostgreSQL. We
will constantly update this post to include the latest Postgres 18.x releases.

</HintBlock>

| Update History | Comment          |
| -------------- | ---------------- |
| 2025/05/13     | Initial version. |

## Release Timeline

- **PostgreSQL 18 Beta 1**: May 8, 2025
- **PostgreSQL 18 Beta 2**: July 17, 2025
- **PostgreSQL 18 Beta 3**: August 14, 2025

PostgreSQL just announced [18 beta 1](https://www.postgresql.org/about/news/postgresql-18-beta-1-released-3070/). While some features may still be dropped, it's worth taking a look.

## Asynchronous I/O

PostgreSQL 18 introduces a significant enhancement under the hood with its new asynchronous I/O (AIO) subsystem. According to the official release notes, this feature is designed to increase I/O throughput and to hide I/O latency. It can be enabled via the `io_method` server variable. For Linux users, this means **io_uring** can be leveraged, while a worker-based implementation is available for all platforms. The initial implementation focuses on file system reads, including sequential scans, bitmap heap scans, and vacuums. A new system view, `pg_aios`, will also be available to show file handles used for AIO.

**DBA Note:** Finally, AIO! The promise of 2-3x performance improvements on certain reads sounds fantastic (could be true for cloud databases that use network-attached disks). Just remember, it's initially for reads – don't expect your write-heavy OLTP to magically speed up overnight. Still, a giant step forward, if it doesn't introduce a new class of I/O-related bugs for us to chase.

## UUIDv7

For developers working with distributed systems or requiring globally unique, sortable identifiers, PostgreSQL 18 brings native support for UUIDv7. As highlighted in the PostgreSQL 18 Beta 1 release announcement, the new `uuidv7()` function allows for the generation of timestamp-ordered UUIDs. This is a significant improvement over traditional UUIDs (like UUIDv4, for which `uuidv4()` is now an alias for `gen_rand_uuid()`) when it comes to database performance, particularly for indexing and caching strategies, as the time-ordered nature can lead to better data locality and reduced page splits in B-tree indexes.

**DBA Note:** So now our primary keys can be both globally unique AND play nice with indexes. Better late than never.

## Improved EXPLAIN

The `EXPLAIN` command is a DBA's best friend (and sometimes worst enemy) when it comes to understanding query performance. PostgreSQL 18 brings several welcome improvements to its output, making it even more insightful. According to the release notes, `EXPLAIN ANALYZE` will now automatically include `BUFFERS` output, saving us an extra keyword. Furthermore, `EXPLAIN ANALYZE VERBOSE` will be enhanced to show WAL (Write-Ahead Logging) usage, CPU statistics, and average read statistics. There's also the addition of full WAL buffer count to `EXPLAIN (WAL)`, `VACUUM/ANALYZE (VERBOSE)`, and autovacuum log output.

**DBA Note:** Maybe, just maybe, more developers will actually look at buffer usage now. The WAL, CPU, and average read stats in VERBOSE are useful for those really deep dives. And another autovacuum metric to obsess over when trying to figure out why autovacuum isn't keeping up.

## NOT NULL Constraints as NOT VALID

PostgreSQL 18 introduces another welcome improvement to schema management with the ability to add `NOT NULL` constraints as `NOT VALID`.

This feature allows users to add `NOT NULL` constraints without immediately scanning the entire table, and then validate them later without holding an `ACCESS EXCLUSIVE` lock. This is particularly valuable for large tables where adding constraints traditionally required significant downtime.

The new syntax requires using a named constraint approach:

```sql
ALTER TABLE table_name ADD CONSTRAINT constraint_name NOT NULL (column) NOT VALID;
```

Later, when it's convenient, you can validate the constraint with:

```sql
ALTER TABLE table_name VALIDATE CONSTRAINT constraint_name;
```

During validation, PostgreSQL only holds a `ShareUpdateExclusiveLock`, which means normal operations like SELECT, INSERT, UPDATE, and DELETE can continue working while the validation process runs.

Even when a `NOT NULL` constraint is added as `NOT VALID`, it still prevents new `NULL` values from being inserted into the column. This provides immediate data integrity for new rows while allowing time to clean up any existing `NULL` values at your convenience.

**DBA Note:** This is a godsend for those of us managing large production databases where downtime is measured in dollars per second. No more scheduling 3 AM maintenance windows just to add a NOT NULL constraint to that 10TB table. The fact that it still prevents new NULLs while being marked as invalid is the perfect balance – forward data integrity without the immediate validation pain.

<HintBlock type="info">

Before Postgres 18, you an use a less intuitive `CHECK (column is NOT NULL) NOT VALID`.

</HintBlock>

## OLD/NEW values in RETURNING

Previously, RETURNING had limitations: it typically returned new values for INSERT and UPDATE, and old values for DELETE. MERGE operations would return values based on the internal query executed. The new syntax is more flexible, allowing INSERT ON CONFLICT to return old values, UPDATE to return old values (previously only new), and DELETE to potentially return new values if an ON DELETE row assignment would produce them. This is facilitated by changeable relation aliases "old" and "new" to specify which values are desired.

**DBA Note:** This simplifies some application logic and reduce the need for those clunky separate SELECT statements or trigger acrobatics just to get the before-and-after picture.

## Virtual generated column

PostgreSQL 18 changes how generated columns can be handled, making virtual generated columns the default. As per the release notes, these columns compute their values "when the columns are read, not written." This is a departure from the traditional STORED generated columns, though the STORED option remains available if explicit write-time computation and storage are needed. The PostgreSQL 18 Beta 1 announcement also mentions that stored generated columns can now be logically replicated.

**DBA Note:** This could save a fair bit of disk space and write overhead for columns that are derived from others and don't need to be physically stored. Think of all those concatenated full names or simple calculations. The trade-off, of course, is compute-on-read, so queries accessing these virtual columns might see a slight performance hit, especially if the generation logic is complex. The fact that stored ones can now be logically replicated is a nice, sensible addition though.

## Major version upgrade experience

Upgrading a major PostgreSQL version can be a source of anxiety for many DBAs. PostgreSQL 18 aims to smooth out this process with several notable improvements. While the standard methods of `pg_dumpall` followed by a restore, or using `pg_upgrade`, or logical replication remain the primary paths for migration, there are enhancements to make these less painful.

The PostgreSQL 18 Beta 1 announcement highlights a significant improvement: the ability to keep planner statistics through a major version upgrade. This is a big deal, as it means your newly upgraded cluster can reach its expected performance state much faster, without waiting for a potentially lengthy `ANALYZE` run across all your data. Additionally, `pg_upgrade` itself has received performance boosts, including parallel processing of its checks (via the`--jobs` flag) and a new `--swap` flag to swap upgrade directories instead of copying, which can be a massive time saver for large installations.

Of course, with any major version, there are compatibility changes to be aware of. The release notes for version 18 list several, including changes to time zone abbreviation handling, the deprecation of MD5 password authentication (finally!), changes to how `VACUUM` and `ANALYZE` handle inheritance, and modifications to `COPY FROM` behavior regarding end-of-file markers. It's crucial to review these incompatibilities thoroughly before planning an upgrade.

**DBA Note:** Anything to reduce that terrifying maintenance window during upgrade is welcome. But the list of "incompatibilities" is still there, waiting to trip up the unwary. Anyway, DBAs will still need to read the fine print, test exhaustively in staging, and have a solid rollback plan. Upgrades are still where DBAs earn their hazard pay.
