---
title: 'gh-ost Limitations You Need to Know Before Production'
author: Adela
updated_at: 2025/08/29 12:00
feature_image: /content/blog/gh-ost-limitations/cover.webp
tags: Explanation
description: 'A checklist of gh-ost limitations and potential gotchas'
---

[gh-ost](https://github.com/github/gh-ost) is a powerful tool for online schema changes in MySQL, but it's not a silver bullet. This article provides a concise, field-tested checklist of its limitations and potential gotchas, complete with real-world scenarios and examples to help you decide when to use it — and when to avoid.

---

## 1. Hard Blockers: If You Hit These, Stop!

Certain limitations in `gh-ost` are non-negotiable. If your environment falls into any of these categories, you'll need to find an alternative solution like [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html) or reconsider your migration strategy.

### Foreign Keys (FKs)

`gh-ost` does **not** support tables with foreign key constraints. If your table is referenced by other tables (i.e., it's a "parent" table), `gh-ost` will refuse to run. This is a critical safety feature to prevent data inconsistencies, but it's also a major blocker for many applications.

**Real-World Scenario:** Imagine you have a `customers` table with a primary key `id`, and an `orders` table with a foreign key `customer_id` that references `customers.id`. If you try to alter the `customers` table with `gh-ost`, the migration will fail because `customers` is a parent table. In this case, you would need to consider temporarily removing the foreign key constraints, using a different tool like [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html), or performing the migration during a maintenance window.

### Triggers

Tables that already have triggers are not supported by `gh-ost`. If your table has existing triggers for auditing, logging, or other purposes, `gh-ost` will not be able to perform the migration.

**Example:** If your `payments` table has triggers for auditing purposes, you'll need to either migrate the auditing logic to your application layer or use a different tool that can work with triggers.

### No Shared Unique Key

`gh-ost` requires that the source and ghost tables share an identical `PRIMARY KEY` or `UNIQUE KEY` to iterate over the rows. If your schema change involves altering or removing this key, `gh-ost` will not be able to proceed.

**Example:** If you need to change the layout of a multi-column primary key, you'll need to break the migration into multiple steps (e.g., add a new unique key, backfill the data, then switch to the new key) or use a different migration tool that can handle this type of change.

## 2. Infrastructure Requirements: Must-Haves for a Smooth Migration

Beyond the hard blockers, `gh-ost` has several infrastructure requirements that you must meet for a successful migration.

### Binary Log Format and Image

`gh-ost` requires **Row-Based Replication (RBR)** to be enabled. If your primary server uses Statement-Based Replication (SBR), you will need to configure a replica with RBR and have `gh-ost` connect to that replica. Additionally, many managed cloud database services require `binlog_row_image=FULL`.

**Example Command (for cloud environments):**
 ```bash
 gh-ost --assume-rbr --host=<replica_host> --cut-over=default ...
 ```

### Privileges

`gh-ost` requires specific replication-related privileges, and in some cases, `SUPER`-like capabilities. This can be challenging to obtain in managed database environments like [Amazon RDS](https://aws.amazon.com/rds/) or [Azure Database for MySQL](https://azure.microsoft.com/en-us/products/azure-database-for-mysql). Always check your platform's documentation for guidance on the required permissions required for online schema migration tools.

## 3. The "Online" Lock: Cut-Over and Long-Running Transactions

Even though `gh-ost` is an "online" tool, the final cut-over phase still requires a **metadata lock (MDL)** to swap the old and new tables. This lock is typically brief, but any long-running queries on the table can block the swap, turning a minor pause into a major incident.

**Real-World Scenario:** A business intelligence (BI) team runs a 15-minute `SELECT` query on the table you are migrating, right as you are about to cut over. `gh-ost` will wait for the MDL, causing your deployment to hang and potentially blocking other application traffic. To avoid this, you need to coordinate with other teams, schedule cut-overs during low-traffic periods, and have a plan to kill any long-running queries that could interfere with the migration.

## 4. Performance and Capacity Pitfalls

`gh-ost` is not a magic bullet for performance. It has its own set of performance and capacity considerations that you need to be aware of.

### Headroom for a Full Copy

`gh-ost` creates a "ghost" table and copies all the data from the original table. This means you need to have enough free disk space for a full copy of the table, plus any additional growth in the binary logs during the migration.

### High Write Rates Can Outrun gh-ost

Under extreme write loads, `gh-ost`'s single-threaded binary log processing can become a bottleneck. The backlog of changes to apply can grow faster than `gh-ost` can process them, causing the migration to fall further and further behind. In some cases, [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html) may perform better under high write loads. It is always recommended to test both tools in your environment to see which one performs better for your specific workload.

### Dropping the Old Table

After the cut-over, `gh-ost` will drop the old table. On very large tables, this can cause a spike in I/O and replication lag. It is best to handle this during a low-traffic window or use a more careful housekeeping process to drop large tables.

## 5. Topology Compatibility and Native DDL

### Galera/PXC Not Supported

`gh-ost` is not compatible with [Galera](https://galeracluster.com/) or [Percona XtraDB Cluster (PXC)](https://www.percona.com/software/mysql-database/percona-xtradb-cluster) due to its locking and table swap strategy. For these environments, [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html) is generally the safer and recommended choice.

### Native MySQL May Be Faster

On modern versions of MySQL (8.0+), many DDL operations are now `INSTANT` or `INPLACE`, meaning they can be performed with near-zero impact without the need for an external tool like [gh-ost](https://github.com/github/gh-ost). Always check if a native DDL operation can meet your needs before reaching for a more complex tool.

**Example:** Adding a column with a default value may be an `INSTANT` operation in MySQL 8.0, depending on the data type and default value. In this case, a native `ALTER TABLE` is much simpler and faster than using `gh-ost`.

---

## Quick Decision Checklist

To help you decide if `gh-ost` is the right tool for your migration, here is a quick checklist:

- Table has **FKs or triggers**? → **Don't use gh-ost. Consider** [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html).
- Can you get **ROW binlogs** and a **shared UNIQUE/PRIMARY key**? → **OK.**
- Can you coordinate the **cut-over** (no long queries)? → **OK.**
- Using **Galera/PXC topology**? → **Prefer** [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html).
- On **MySQL 8.0+?** → **Check if native INSTANT/INPLACE DDL already solves it.**

If you can check all the boxes and have tested the migration on a replica first, `gh-ost` is an excellent choice for performing online schema changes on large, hot tables with minimal production impact.