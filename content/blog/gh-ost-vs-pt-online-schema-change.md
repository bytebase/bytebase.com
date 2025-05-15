---
title: 'gh-ost vs pt-online-schema-change in 2025'
author: Adela
updated_at: 2025/05/16 18:00
feature_image: /content/blog/gh-ost-vs-pt-online-schema-change/cover.webp
tags: Comparison
description: 'gh-ost and pt-online-schema-change are two popular tools for online schema migration in MySQL. This article compares the features and capabilities of the two tools.'
---

<HintBlock type="info">

This post is maintained by Bytebase, an open-source database DevSecOps tool which implements MySQL online schema migration using gh-ost. We update the post every year.

</HintBlock>

| Update History | Comment          |
| -------------- | ---------------- |
| 2025/05/16     | Initial version. |

Here is a **refactored, cleaner version** of the article, with duplicated information removed, explanations tightened, and sections logically streamlined for better readability:

**gh-ost** and **pt-online-schema-change (pt-osc)** are two widely used tools for **online schema migrations in MySQL**. This guide compares their core approaches, key features, pros and cons, and recommended use cases.

## 1. Core Architecture

### gh-ost (GitHub Online Schema Transmogrifier)

- **Triggerless**, asynchronous approach.
- Captures data changes by tailing **binary logs** (requires **Row-Based Replication**, typically from a replica).
- Creates a ghost table, copies data in chunks, and applies DML changes from the binlog.
- Final cut-over is manual and auditable, requiring a brief metadata lock.

![gh-ost-general-flow](/content/blog/gh-ost-vs-pt-online-schema-change/gh-ost-general-flow.webp)

### pt-online-schema-change (Percona Toolkit)

- **Trigger-based**, synchronous mechanism.
- Uses DML triggers (`INSERT`, `UPDATE`, `DELETE`) to capture changes and apply them to the ghost table.
- Cut-over is typically an atomic `RENAME TABLE`.
- Compatible with a wider range of MySQL versions and supports foreign keys.

## 2. Feature Comparison

| Feature             | gh-ost                                | pt-online-schema-change             |
| ------------------- | ------------------------------------- | ----------------------------------- |
| **Triggers**        | No (uses binlog)                      | Yes (adds for DML ops)              |
| **Data Sync**       | Async via binlog                      | Sync via triggers                   |
| **Master Load**     | Lower (uses replica)                  | Higher (triggers on master)         |
| **FK Support**      | No (must drop & recreate)             | Yes (`--alter-foreign-keys-method`) |
| **Replication**     | Requires RBR, prefers replica         | Works with SBR/RBR, runs on master  |
| **Safety**          | Advanced (hooks, throttling, checks)  | Good (throttling, basic checks)     |
| **Cut-over**        | Manual, controlled, brief lock        | Instant rename, less control        |
| **Resumable**       | Yes                                   | Partial (if artifacts remain)       |
| **MySQL Versions**  | 5.7+ only                             | 5.5+ (older versions supported)     |
| **Throttling**      | Advanced (pause/resume via lag/hooks) | Basic (copy throttling only)        |
| **Limitations**     | JSON, partitions, FKs, triggers       | Fewer; PXC has some constraints     |
| **Replica Testing** | Accurate (binlog-based)               | Limited (triggers don’t fire)       |

gh-ost is optimized for **performance, safety, and control**, while pt-osc is better for **compatibility, simplicity, and FK support**. Choose based on your workload and infrastructure constraints.

## 3. Pros and Cons

| Tool                        | Pros                                                                                                         | Cons                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **gh-ost**                  | - Low master impact <br/> - No triggers <br/> - Fine-grained control <br/> - Resumable <br/> - Designed for high traffic | - No FK support <br/> - Requires RBR <br/> - MySQL 5.7+ only <br/> - More complex setup                     |
| **pt-online-schema-change** | - FK support <br/> - Older MySQL support <br/> - Simpler concept <br/> - Mature and widely adopted                    | - Triggers add load <br/> - Less control over cut-over <br/> - May cause locking on high-write workloads |

## 4. When to Use

### Use **gh-ost** if:

- Your database is **write-heavy**, and you want to **avoid triggers**.
- You run **MySQL 5.7+** with **Row-Based Replication**.
- You need **throttling**, **replica testing**, and **interactive cut-over**.
- Foreign keys are **not present** or can be temporarily removed.

### Use **pt-online-schema-change** if:

- Your tables have **foreign keys** that must remain intact.
- You’re on **older MySQL versions** (5.5 or 5.6).
- Your team is comfortable with **triggers** and the workload is light to moderate.
- You want a **simpler setup** with less replication dependency.

## 5. Conclusion

Both tools provide **online schema change capabilities** with minimal downtime, but they serve **different operational needs**:

- **gh-ost** offers **lower production impact** and **greater control**, ideal for large, modern, high-traffic environments.
- **pt-online-schema-change** is better suited to **legacy environments**, **foreign key constraints**, or teams needing a **simple, proven solution**.

Your choice should be driven by **replication setup**, **schema features**, **performance needs**, and **team expertise**. For mission-critical systems with high write volumes, gh-ost is typically the safer bet—provided its prerequisites are met.