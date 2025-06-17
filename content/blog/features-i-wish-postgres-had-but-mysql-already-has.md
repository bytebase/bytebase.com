---
title: 'Features I Wish Postgres Had but MySQL Already Has'
author: Tianzhou
updated_at: 2025/06/16 20:00:00
feature_image: /content/blog/features-i-wish-postgres-had-but-mysql-already-has/banner.webp
tags: Industry
description: 'Areas where MySQL shines and Postgres falls short.'
---

At Bytebase, we work extensively with both Postgres and MySQL. In our [previous post](/blog/features-i-wish-mysql-had-but-postgres-already-has), we highlighted features where Postgres shines compared to MySQL. In this post, we'll examine where MySQL excels and Postgres falls short.

## Performant Storage Engine for Write-Intensive Workloads

Postgres' heap-based storage with tuple versioning MVCC creates more overhead for write-intensive scenarios (write amplification). While Postgres has made improvements with features like HOT updates, it still generates more WAL (Write-Ahead Log) traffic and requires more frequent VACUUM operations under heavy write loads.

On the other hand, MySQL employs clustered index storage and undo logging, which is more performant especially for write heavy workload.

The comparison is detailed in [Uber's switch From Postgres to MySQL](https://www.uber.com/blog/postgres-to-mysql-migration/) and [The Part of Postgres We Hate the Most](https://www.cs.cmu.edu/~pavlo/blog/2023/04/the-part-of-Postgres-we-hate-the-most.html)

Postgres users need to deal with the infamous [transaction ID wraparound](https://blog.sentry.io/transaction-id-wraparound-in-postgres/), and the not-so-famous [MultiXact member exhaustion](https://metronome.com/blog/root-cause-analysis-Postgres-multixact-member-exhaustion-incidents-may-2025). [OrioleDB](https://github.com/orioledb/orioledb) is tackling these issues, but it's still years until it reaches the maturity of MySQL's InnoDB.

## Replication

MySQL's Group Replication provides both single-primary and multi-primary replication with automatic failover and conflict detection built-in. It handles network partitions gracefully with built-in quorum logic, automatically determining which partition remains writable.

Postgres relies on external tools like Patroni, pg_auto_failover for similar functionality. These solutions work but require non-trivial operational overhead and expertise to configure and maintain properly.

Postgres' logical replication, introduced in version 10, is also still catching up. Its most significant limitation is DDL operations are not replicated - they must be applied manually to subscribers.

## Invisible Indexes

MySQL's invisible indexes allow you to test index effectiveness without impacting existing queries or disable indexes temporarily - a crucial feature for production database optimization.

```sql
-- MySQL: Create invisible index for testing
CREATE INDEX idx_orders_status ON orders (status) INVISIBLE;

-- Test queries with the invisible index
SET SESSION optimizer_switch = 'use_invisible_indexes=on';
EXPLAIN SELECT * FROM orders WHERE status = 'pending';

-- Make index visible after confirming it helps
ALTER TABLE orders ALTER INDEX idx_orders_status VISIBLE;
```

They also help with index maintenance strategies. You can make an index invisible before dropping it, ensuring no queries break, then safely remove it later.

```sql
-- Make index invisible to see if it hurts
ALTER TABLE orders ALTER INDEX idx_orders_status INVISIBLE;

-- Then drop it if it doesn't break queries
DROP INDEX idx_orders_status ON orders;
```

Postgres doesn't provide built-in syntax to enable/disable an index. Though you can toggle `indisvalid` from the `pg_index` table as a workaround.

## Online Schema Migration Tooling

MySQL's ecosystem provides mature, production-ready tools for online schema changes that Postgres still lacks.

If your table doesn't have foreign keys, you can use GitHub's trigger-less [gh-ost](https://github.com/github/gh-ost/), otherwise, Percona's trigger-based [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html) is also a battle-tested solution.

The Postgres community has developed several solutions, but none has matched the adoption rate of MySQL's gh-ost or pt-online-schema-change.

## Connection Handling

While Postgres' process-per-connection provides better isolation, it consumes more memory per connection, incurs context switching overhead, and is more prune to hit connection limit.

MySQL's thread-per-connection model is subject to entire server crashes caused by a query of death, but is more scalable.

There is a comprehensive discussion in the Postgres community about making the switch [Let's make Postgres multi-threaded](https://www.Postgres.org/message-id/flat/31cc6df9-53fe-3cd9-af5b-ac0d801163f4%40iki.fi). But because the process model is too deeply coupled with the rest of Postgres, it will be quite a challenging task to tackle.

---

MySQL remains the most popular open source database today, serving as the de facto database of the internet era. Looking back, two pillars drove its popularity:

**Pragmatic core team.** The original MySQL team prioritized features based on real-world use cases.

- Replication, the most critical building block for scalability and fast failover on commodity hardware, was introduced in version 3.23 in 2001—nearly a decade before Postgres added replication in 2010 (version 9.0).

- When the core team lacked bandwidth to build a better storage engine, they designed a pluggable storage engine architecture that opened the door to InnoDB.

**Vibrant community.** When internet companies experienced hypergrowth and needed an open source database that was performant and scalable on commodity hardware, MySQL was the obvious choice. Google's initial ads system, Twitter, Facebook, Alibaba, and GitHub all chose MySQL. Though exceptions like Instagram chose Postgres, most successful internet-era companies selected MySQL and contributed enhancements like MHA, RocksDB, gh-ost, and replication improvements. This created a generation of MySQL experts advocating the technology and spawned dedicated consulting businesses like Percona, which provided educational resources and indispensable tools like the Percona toolkit.

Tides are changing, and Postgres has become the new hotness in the AI era. While MySQL retains several architectural advantages over Postgres, will it hold the fort or become obsolete within 10 years?
