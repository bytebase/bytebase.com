---
title: 'Postgres Transaction ID (XID) Wraparound'
author: Adela
updated_at: 2025/10/24 12:00
feature_image: /content/blog/postgres-transaction-id-wraparound/banner.webp
tags: Explanation
description: 'What is Postgres Transaction ID (XID) Wraparound and how to monitor and prevent it.'
---

PostgreSQL’s transaction system is built around a simple but powerful idea: every transaction gets a **Transaction ID (XID)** - a 32-bit integer that powers its **MVCC (Multi-Version Concurrency Control)** engine.

MVCC lets multiple users read and write data at the same time without blocking each other.
But those transaction IDs are finite, and eventually they **wrap around**.

If not handled properly, wraparound can make data invisible or even force the entire database into emergency shutdown.
Let’s understand why.

### How Postgres Differs from Other Databases

PostgreSQL uses a **tuple-based** MVCC model - every data change creates a new version (tuple) of a row stored directly in the table.

Each tuple has two hidden fields: `xmin` and `xmax`. `xmin` is the transaction ID that created the tuple, and `xmax` is the transaction ID that deleted or replaced it.

Other databases handle versioning differently:

| Database           | MVCC type           | Where old versions are stored      | Wraparound risk |
| ------------------ | ------------------- | ---------------------------------- | --------------- |
| **PostgreSQL**     | Tuple-based         | In the main table (needs `VACUUM`) | ✅ Yes           |
| **MySQL (InnoDB)** | Undo-log-based      | Undo logs in system tablespace     | ❌ No            |
| **SQL Server**     | Version-store-based | Tempdb version store               | ❌ No            |
| **Oracle**         | Undo-log-based      | Undo segments                      | ❌ No            |

In short:
PostgreSQL keeps old rows **inline** with the table, and each one carries its own transaction ID.
That design enables powerful visibility control but also means transaction IDs must eventually be **reused** - leading to the wraparound problem.
Other databases store old versions separately, so their transaction identifiers can grow freely without ever wrapping around.

### What Is Transaction Wraparound

PostgreSQL’s transaction IDs are **32-bit integers** (`0` to `4,294,967,295`).
After the counter hits its limit, it **wraps around** back to 3 again.

You can picture XIDs as points on a **circle**, not a straight line.

![Transaction ID (XID) Wraparound](/content/blog/postgres-transaction-id-wraparound/pg-xid-cycle-circle.webp)

When the counter wraps, very old tuples may suddenly appear to have "future" XIDs and become **invisible** to all new transactions.

![Transaction ID (XID) Wraparound](/content/blog/postgres-transaction-id-wraparound/pg-xid-cycle.webp)

To prevent this, Postgres periodically **freezes** old tuples - marking them with a special `FrozenXID`, meaning "committed long ago, always visible."

![Transaction ID (XID) Wraparound](/content/blog/postgres-transaction-id-wraparound/pg-xid-freeze.webp)

### Consequences of Wraparound

If the database fails to freeze tuples in time, it risks data corruption.
When `datfrozenxid` becomes dangerously old, Postgres refuses new writes and may shut down with errors like:

```
PANIC: database is not accepting commands to avoid wraparound data loss
```

#### Real-world cases

- **Sentry (2024):**
  Sentry’s Postgres database stopped accepting writes after autovacuum couldn’t keep up with freezing old transaction IDs. The system hit the wraparound limit, forcing emergency manual vacuuming and downtime.
  [https://blog.sentry.io/transaction-id-wraparound-in-postgres/](https://blog.sentry.io/transaction-id-wraparound-in-postgres/)

- **Mailchimp/Mandrill (2016):**
  A busy shard’s autovacuum fell behind, triggering wraparound protection and halting writes. Recovery required truncations and manual vacuums, leading to roughly 40 hours of outage.
  [https://mailchimp.com/what-we-learned-from-the-recent-mandrill-outage/](https://mailchimp.com/what-we-learned-from-the-recent-mandrill-outage/)

These cases show that wraparound isn’t theoretical - it’s one of the few PostgreSQL maintenance failures that can completely stop production systems.

### How to Monitor and Prevent Wraparound

#### 1. Autovacuum is the First Line of Defense

Autovacuum automatically scans tables and freezes tuples before they age out.
Key parameters:

- `autovacuum_freeze_max_age` – threshold for wraparound prevention
- `vacuum_freeze_table_age` – when to start freezing during normal vacuum
- `vacuum_freeze_min_age` – minimum XID age before freezing allowed

If autovacuum is off or slow, wraparound danger grows silently.

#### 2. Check XID Age with SQL

To see how close your database is to wraparound:

```sql
SELECT datname, age(datfrozenxid) AS xid_age
FROM pg_database
ORDER BY xid_age DESC;
```

For table-level detail:

```sql
SELECT relname, age(relfrozenxid) AS xid_age
FROM pg_class
WHERE relkind = 'r'
ORDER BY xid_age DESC;
```

⚠️ **Guidelines**

- Above **1.5 billion** → warning zone
- Above **2 billion** → database may lock writes

#### 3. Cloud Provider Recommendations

**AWS RDS / Aurora**
Use `postgres_get_av_diag` to monitor autovacuum health and aging tables —
[https://aws.amazon.com/blogs/database/prevent-transaction-id-wraparound-by-using-postgres_get_av_diag-for-monitoring-autovacuum/](https://aws.amazon.com/blogs/database/prevent-transaction-id-wraparound-by-using-postgres_get_av_diag-for-monitoring-autovacuum/)

**Google Cloud SQL**
Cloud SQL provides a Recommender for High Transaction ID Utilization —
[https://cloud.google.com/sql/docs/postgres/recommender-high-transactionid-utilization](https://cloud.google.com/sql/docs/postgres/recommender-high-transactionid-utilization)

General advice:

- Never disable autovacuum.
- Schedule manual `VACUUM FREEZE` during off-peak hours.
- Avoid long-running idle transactions that block freezing.

### The Challenge of Moving to 64-bit Transaction IDs

At first glance, the easiest fix would be to make transaction IDs **64-bit** instead of 32-bit.
That would raise the ceiling from 4 billion transactions to roughly **18 quintillion** - effectively eliminating wraparound forever.

This idea has been discussed for years, with real prototypes already attempted:

- **Early discussions (2018–2019):**
  [https://www.postgresql.org/message-id/flat/DA1E65A4-7C5A-461D-B211-2AD5F9A6F2FD%40gmail.com](https://www.postgresql.org/message-id/flat/DA1E65A4-7C5A-461D-B211-2AD5F9A6F2FD%40gmail.com)
  Developers debated whether to store full 64-bit IDs or use a **hybrid scheme** (16-bit epoch + 48-bit XID) to retain compatibility.

- **Experimental patch for Postgres 15 (2021):**
  [https://www.postgresql.org/message-id/flat/CACG=ezZe1NQSCnfHOr78AtAZxJZeCvxrts0ygrxYwe=pyyjVWA@mail.gmail.com](https://www.postgresql.org/message-id/flat/CACG=ezZe1NQSCnfHOr78AtAZxJZeCvxrts0ygrxYwe=pyyjVWA@mail.gmail.com)
  It proved feasible but caused major ripple effects:

  - Every tuple grows by 8 bytes (`xmin` + `xmax`).
  - Index and WAL formats must be redesigned.
  - Replication and visibility logic rely on 32-bit arithmetic.

- **Community view:**
  [https://news.ycombinator.com/item?id=19083745](https://news.ycombinator.com/item?id=19083745)
  Developers agreed the change would *solve wraparound permanently* but **break on-disk compatibility**, forcing every database to migrate storage format.

For now, the community focuses on improving **autovacuum efficiency** and **wraparound monitoring**, accepting that 32-bit XIDs remain part of the architecture - at least until a cleaner migration path emerges.

### Best Practices

- ✅ Keep autovacuum **enabled and tuned**
- ✅ Monitor XID age regularly
- ✅ Vacuum frequently on high-write tables
- ✅ Avoid long-running transactions
- ✅ Run `VACUUM FREEZE` during maintenance windows
- ✅ Partition or archive old data to reduce bloat