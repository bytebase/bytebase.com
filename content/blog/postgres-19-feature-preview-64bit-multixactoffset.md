---
title: 'Postgres 19 Feature Preview: 64-bit MultiXactOffset'
author: Tianzhou
updated_at: 2025/12/17 18:00:00
feature_image: /content/blog/postgres-19-feature-preview-64bit-multixactoffset/banner.webp
tags: Industry
description: 'Postgres 19 widens MultiXactOffset to 64 bits, eliminating the hidden 4 billion member limit that caused catastrophic outages for high-concurrency workloads.'
---

PostgreSQL uses MultiXact structures to track row-level locks shared by multiple transactions. Each MultiXact contains members pointing to the transactions holding the lock. The problem: MultiXactOffset—the pointer into the member storage—was a 32-bit value, capping total members at 2^32 (~4 billion) before wraparound. Unlike [transaction ID wraparound](/blog/postgres-transaction-id-wraparound), which is well-documented and widely monitored, MultiXact member exhaustion catches most teams off guard.

This isn't just theoretical. In May 2025, [Metronome experienced four separate outages](https://metronome.com/blog/root-cause-analysis-postgresql-multixact-member-exhaustion-incidents-may-2025) when their PostgreSQL cluster exhausted MultiXact member space during a large data migration. The insidious part: their monitoring showed MultiXact ID usage under 50%, but PostgreSQL enforces a separate, poorly-documented member space limit. When it hit, all writes failed with "This command would create a multixact" errors, and recovery required hours of emergency vacuuming across their 30TB cluster.

Postgres 19 eliminates this limit entirely with 64-bit MultiXactOffset, introduced by Heikki Linnakangas [bd8d9c9b](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commit;h=bd8d9c9bdfa0c2168bb37edca6fa88168cacbbaa) widened MultiXactOffset to 64 bits.

## What Changes

The 64-bit expansion has two practical effects:

**No more wraparound emergencies.** The 32-bit limit meant high-concurrency workloads—especially those with foreign keys where multiple transactions lock the same rows—could exhaust member space unexpectedly. When `n` transactions share-lock a row, PostgreSQL creates O(n) MultiXacts with O(n²) members. The new 64-bit offset eliminates this ceiling entirely.

**Simplified operations.** PostgreSQL previously required aggressive anti-wraparound vacuuming specifically for member space. This is now removed. You still need regular vacuuming for disk space management, but the emergency "vacuum or die" scenario for member exhaustion is gone.

The change requires a pg_upgrade rewrite of `pg_multixact` SLRU files when upgrading to Postgres 19, but this happens automatically during the upgrade process.

## Closing Thoughts

The MultiXact member limit was a hidden operational risk—poorly documented, invisible to standard monitoring, and catastrophic when hit. Postgres 19 eliminates it entirely rather than just raising the threshold. While the timeline for 64-bit transaction IDs remains unclear, widening MultiXactOffset to 64 bits is a concrete step toward eliminating all wraparound-related risks in PostgreSQL.

## References

- [Metronome: Root Cause Analysis of PostgreSQL MultiXact Member Exhaustion](https://metronome.com/blog/root-cause-analysis-postgresql-multixact-member-exhaustion-incidents-may-2025)
- [Postgres commit bd8d9c9b: Widen MultiXactOffset to 64 bits](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commit;h=bd8d9c9bdfa0c2168bb37edca6fa88168cacbbaa)
