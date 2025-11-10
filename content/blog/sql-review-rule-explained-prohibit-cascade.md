---
title: 'SQL Review Rule Explained - Prohibit CASCADE'
author: Tianzhou
updated_at: 2025/11/10 10:00
feature_image: /content/blog/sql-review-rule-explained-prohibit-cascade/banner.webp
tags: Explanation
description: Learn why CASCADE operations in SQL can lead to catastrophic data loss and how the "Prohibit CASCADE" review rule protects your production database.
---

> A single misunderstood `CASCADE` command can wipe out production data in seconds. The keyword appears harmless but can trigger deletions across your entire database schema.

Bytebase [SQL Review](https://docs.bytebase.com/change-database/review) contains the following rules to prevent **CASCADING** failures:

1. **Prohibit using CASCADE option for ON DELETE clauses**: The `CASCADE` option in `ON DELETE` can cause a large number of dependent objects to be deleted or modified, leading to unexpected results.

1. **Prohibit using CASCADE when removing a table**: Using the `CASCADE` option when removing a table can cause a large number of dependent objects to be deleted or modified, leading to unexpected results.

## What is CASCADE?

CASCADE appears in two contexts in SQL:

### CASCADE in Foreign Key Constraints

```sql
CREATE TABLE posts (
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE  -- Deleting a user deletes all their posts
);
```

### CASCADE in TRUNCATE Operations

```sql
TRUNCATE TABLE users CASCADE;  -- Truncates users AND all tables referencing it
```

_Note: `TRUNCATE ... CASCADE` is PostgreSQL-specific. This behavior (automatically truncating dependent tables via foreign keys) doesn't exist in MySQL, SQL Server, or other databases. Oracle has `TRUNCATE ... CASCADE` but for a different purpose (materialized views)._

This is especially dangerous—many developers misunderstand its behavior.

### The Common Misunderstanding

Imagine a team is migrating their database and wants to clean up test data from new tables. A developer runs:

```sql
TRUNCATE TABLE new_feature_table CASCADE;
```

**Their intention:** Delete test data from the new tables.

**Their assumption:** CASCADE only deletes related test data in other tables.

**What actually happened:** `TRUNCATE ... CASCADE` deleted **ALL data** in every table with foreign keys pointing to `new_feature_table`—including years of production data.

The key misunderstanding: `TRUNCATE TABLE A CASCADE` doesn't just delete related rows in table B. It truncates **entire tables** that have foreign keys pointing to table A. In complex schemas with interconnected tables, a single CASCADE command can wipe out your entire database.

## How to Protect Your Database

**1. Use explicit DELETE statements**

```sql
-- ❌ DANGEROUS: CASCADE affects unexpected tables
TRUNCATE TABLE users CASCADE;

-- ✅ SAFE: Full control over what's deleted
DELETE FROM user_sessions WHERE user_id IN (SELECT id FROM users WHERE ...);
DELETE FROM users WHERE ...;
```

**2. Implement automated SQL review**

Use Bytebase to automatically scan all SQL before execution and block dangerous `CASCADE` operations in production.

**3. Remove dangerous privileges**

```sql
REVOKE TRUNCATE ON ALL TABLES IN SCHEMA public FROM app_user;
```

**4. Test migrations thoroughly**

Run the full migration in staging with production-like data, verify the scope of impact, and test rollback procedures.

**5. Use safer foreign key options**

Consider `ON DELETE RESTRICT` or `ON DELETE SET NULL` instead of `ON DELETE CASCADE`.

## Summary

The `CASCADE` keyword can trigger automatic data deletion across your entire database. The most critical point: `TRUNCATE TABLE A CASCADE` truncates **ALL tables** with foreign keys pointing to A—not just related rows.

**Protect your database:**

- Use explicit DELETE statements for full control over data deletion
- Block CASCADE in production using Bytebase SQL review rules
- Remove TRUNCATE privileges from application users
- Always test schema changes in staging environments
