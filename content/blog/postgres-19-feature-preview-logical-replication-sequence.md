---
title: 'Postgres 19 Feature Preview: Sequence Synchronization for Logical Replication'
author: Tianzhou
updated_at: 2025/12/08 18:00:00
feature_image: /content/blog/postgres-19-feature-preview-logical-replication-sequence/banner.webp
tags: Industry
description: 'Postgres 19 introduces automatic sequence synchronization for logical replication, eliminating manual tracking and making major version upgrades and failover significantly easier.'
---

Logical replication in Postgres has a long-standing limitation: while table data replicates perfectly, the sequences backing `SERIAL` and `IDENTITY` columns stay at their initial values on the subscriber. This creates a problem during upgrades or failover—promote a subscriber to primary, and the next `INSERT` tries to generate an ID that already exists, triggering a primary key violation.

Postgres 19 solves this with automatic sequence synchronization, introduced across three commits by Amit Kapila:

1. [96b37849](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commitdiff;h=96b37849734673e7c82fb86c4f0a46a28f500ac8) added publication support for sequences

1. [f0b3573c](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commit;h=f0b3573c3a) introduced the `REFRESH SEQUENCES` command

1. [5509055d](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commitdiff;h=5509055d6956745532e65ab218e15b99d87d66ce) implemented the synchronization worker.

## Usage

Postgres 19 adds `FOR ALL SEQUENCES` to publications:

```sql
-- Publisher
CREATE PUBLICATION upgrade_pub FOR ALL TABLES, ALL SEQUENCES;

-- Subscriber
CREATE SUBSCRIPTION upgrade_sub
    CONNECTION 'host=publisher-db dbname=production'
    PUBLICATION upgrade_pub;
```

A new sequencesync worker automatically synchronizes sequences in batches. Sequences track their state (INIT → READY) in `pg_subscription_rel`.

```sql
SELECT srsubid, srrelid::regclass, srsubstate
FROM pg_subscription_rel
WHERE srsubstate IN ('i', 'r');  -- 'i' = INIT, 'r' = READY
```

Sequences only sync when you explicitly run `REFRESH SEQUENCES`. Build `REFRESH SEQUENCES` into your cutover runbook.

```sql
ALTER SUBSCRIPTION upgrade_sub REFRESH SEQUENCES;
```

## Closing Thoughts

Postgres is systematically closing logical replication gaps. Postgres 18 added generated column support. Now Postgres 19 adds sequence synchronization, the largest hurdle in zero-downtime upgrade and failover workflows.

The remaining major limitation is DDL replication—schema migrations still require manual coordination. But for upgrade and failover scenarios, this is less critical than sequence synchronization. When promoting a subscriber, you typically want identical schemas already in place. Missing sequence values cause immediate production failures; managing DDL changes is standard operational procedure. Let's save this for the future release.

## References

- [Postgres logical replication restrictions](https://www.postgresql.org/docs/18/logical-replication-restrictions.html)
