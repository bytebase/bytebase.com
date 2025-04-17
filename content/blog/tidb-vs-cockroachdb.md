---
title: 'TiDB vs. CockroachDB: the Distributed Clash between MySQL and PostgreSQL'
author: Tianzhou
updated_at: 2025/03/25 09:00
feature_image: /content/blog/tidb-vs-cockroachdb/banner.webp
tags: Comparison
description: 'An extensive comparison between TiDB and CockroachDB on license, architecture, compatibility, scalability'
---

This is a series of articles between MySQL and PostgreSQL:

- [MySQL vs. Postgres](/blog/postgres-vs-mysql)
- [PlanetScale vs. Neon](/blog/planetscale-vs-neon)
- TiDB vs. CockroachDB (this one)

---

[TiDB](https://www.pingcap.com/) and [CockroachDB](https://www.cockroachlabs.com/) are the two most popular distributed database solutions (NewSQL) in their respective ecosystems.
While teams rarely choose a distributed database on day one, understanding these options becomes crucial when scalability challenges arise.

## Why Compare TiDB and CockroachDB

1. As a responsible architect, it's essential to understand the entire ecosystem before making initial database choices that may impact future scalability options.

1. When teams eventually consider distributed databases, scalability is typically the primary concern, with cost as a secondary factor. If a solution can effectively address these challenges, other obstacles—including switching database dialects—can be overcome.

Below we compare between TiDB and CockroachDB from the following dimensions:

- [License](#license)
- [Compatibility](#compatibility)
- [Architecture](#architecture)
- [Scalability](#scalability)

## License

TiDB is licensed under [Apache License 2.0](https://github.com/pingcap/tidb/blob/master/LICENSE). Its internal storage engine [TiKV](https://github.com/tikv/tikv), which has been donated to CNCF, is also under Apache License 2.0.

CockroachDB [switched to an Enterprise license in 2024](https://www.cockroachlabs.com/enterprise-license-update/), generating backlash in the community ([1](https://news.ycombinator.com/item?id=41256222), [2](https://www.reddit.com/r/devops/comments/1eytts3/cockroachdb_is_changing_license_again_moving_to/)). Its storage engine [Pebble](https://github.com/cockroachdb/pebble) uses BSD-3-Clause License.

## Compatibility

Both products advertise compatibility with their vanilla counterparts (MySQL for TiDB, PostgreSQL for CockroachDB), but this primarily refers to wire-protocol compatibility rather than full feature parity:

- [TiDB MySQL compatibility](https://docs.pingcap.com/tidb/stable/mysql-compatibility/), with its [parser](https://github.com/pingcap/tidb/tree/master/pkg/parser) available for inspection.
- [CockroachDB PostgreSQL compatibility](https://www.cockroachlabs.com/docs/stable/postgresql-compatibility). There is also a [PostgreSQL compatibility index](https://github.com/secp256k1-sha256/postgres-compatibility-index/tree/main) tracking various PostgreSQL implementations including CockroachDB.

## Architecture

TiDB uses a modular architecture with separation between components:

- SQL layer written in Go
- Storage engine (TiKV) written in Rust
- Clear division between compute and storage components

![tidb-arch](/content/blog/tidb-vs-cockroachdb/tidb-arch.webp)

On the other hand, CockroachDB employs a more unified approach:

- Both SQL layer and storage engine (Pebble) written in Go
- Each node bundles SQL processing and storage functionality
- More integrated design philosophy

![cockroachdb-arch](/content/blog/tidb-vs-cockroachdb/cockroach-arch.webp)

Another critical architectural difference is in timestamp generation for transaction management:

- TiDB uses a dedicated timestamp allocator (Placement Driver)
- CockroachDB relies on NTP (Network Time Protocol)

## Scalability

The architectural differences lead to different scalability characteristics:

TiDB:

- Independent scaling of compute (TiDB) and storage (TiKV) layers
- More flexible for workloads with uneven compute/storage demands
- May require more configuration tuning for optimal performance
- Better suited for read-heavy workloads and analytical queries at scale (via TiFlash)

CockroachDB:

- Simpler "add more nodes" scaling model
- More consistent performance across different scales
- Generally easier initial setup and maintenance
- Typically performs better for write-intensive workloads

Neither system is universally "better" for all use cases. You have to extensively test your particular workload patterns.

## Summary

This concludes our MySQL vs. PostgreSQL series. When reaching the distributed database level, the original
SQL dialect becomes less relevant than the scalability and operational characteristics of the distributed system.
Both TiDB and CockroachDB offer compelling solutions for scaling beyond traditional single-node databases, but with different approaches and trade-offs.

The choice between TiDB and CockroachDB should be driven primarily by your specific scaling needs, workload patterns,
and operational preferences rather than strict adherence to the MySQL or PostgreSQL ecosystem.

For teams at this crossroads, it's worth investing time in proof-of-concept testing with both systems using representative workloads before making a final decision.

Of course, needing a distributed database solution is a good problem to have – it means you've grown beyond what conventional databases can handle.
