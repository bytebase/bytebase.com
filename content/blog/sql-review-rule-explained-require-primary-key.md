---
title: 'SQL Review Rule Explained - Require Primary Key'
author: Adela
updated_at: 2025/11/21 22:00
feature_image: /content/blog/sql-review-rule-explained-require-primary-key/banner.webp
tags: Explanation
description: Learn why requiring a primary key is important and how the "Require Primary Key" review rule protects your production database.
---

A table without a primary key seems harmless until your system grows and problems appear. Missing primary keys commonly lead to **duplicate data, broken CDC pipelines, replication stalls, and inconsistent analytics**.

Bytebase [SQL Review includes the rule](https://docs.bytebase.com/sql-review/review-rules#require-primary-key) :

> Bytebase considers this rule to be violated if the SQL tries to create a no primary key table or drop the primary key. If the SQL drops all columns in the primary key, Bytebase also considers that this SQL drops the primary key.

## Real Incidents Caused by Missing Primary Keys

**PostgreSQL logical replication breaks**
Without a PK, Postgres cannot apply updates/deletes during logical replication (or Debezium).
Reference: [TIL: Creating tables without primary keys CAN cause updates and deletes to fail in Postgres](https://abhinavomprakash.com/posts/replica-identities/)

**Matomo production replication stalled**
A single table without a primary key caused MySQL master–slave replication to stop.
Reference: [Master–Slave Replication Stalls Because of Missing Primary Key](https://forum.matomo.org/t/master-slave-replication-stalls-because-of-missing-primary-key/36251)

**GitLab reported schema inconsistencies**
GitLab engineers found tables without primary keys leading to environment drift and maintenance issues.
Reference: [Database schema missing many primary keys - breaks replication](https://gitlab.com/gitlab-org/gitlab-ce/-/issues/51964)

## Why Missing Primary Keys Are Dangerous

### **1. Duplicate rows slip in**

Without a PK, the database cannot enforce uniqueness.
Accidental duplicates appear, corrupting analytics and reports.

### **2. CDC systems can’t track row changes**

Tools like Debezium and Kafka Connect need a stable row identity.
No PK → they can’t emit correct update/delete events.

### **3. Replication may stop or diverge**

Both MySQL and PostgreSQL depend on primary keys during replication.
A missing PK can cause replication to stall or go out of sync.

### **4. Upserts don’t work correctly**

`INSERT … ON CONFLICT`, `MERGE`, and UPSERT patterns require a PK.
Without one, the database can’t resolve conflicts reliably.

### **5. Debugging becomes guesswork**

Without a unique row identifier, you can’t target a specific record.
Deleting, fixing, or investigating a single row becomes unsafe.

## How to Fix Tables Without Primary Keys?

### **1. Add a surrogate primary key**

```sql
ALTER TABLE events
ADD COLUMN id BIGSERIAL PRIMARY KEY;
```

### **2. Use a natural composite key if appropriate**

```sql
ALTER TABLE order_items
ADD PRIMARY KEY (order_id, line_number);
```

### **3. Combine surrogate PK with a unique business key**

```sql
ALTER TABLE shipments
ADD COLUMN id BIGSERIAL PRIMARY KEY,
ADD CONSTRAINT shipments_unique UNIQUE (tracking_number);
```
