---
title: 'SQL Review Rule Explained - Enforce NOT VALID in CHECK'
author: Adela
updated_at: 2025/11/13 22:00
feature_image: /content/blog/sql-review-rule-explained-enforce-not-valid-in-check/banner.webp
tags: Explanation
description: Learn why enforcing NOT VALID in CHECK constraints is important and how the "Enforce NOT VALID in CHECK" review rule protects your production database.
---

PostgreSQL allows you to add `CHECK` constraints to enforce data quality rules on a table. This is useful, but adding a CHECK constraint in the wrong way can block reads and writes and cause unexpected downtime.
This SQL Review rule ensures that all new CHECK constraints are created using the safe, non-blocking approach.

## How CHECK Constraints Work

A CHECK constraint ensures that a column’s value satisfies a given condition, for example:

```sql
CHECK (amount > 0)
```

PostgreSQL will reject any insert or update that violates this rule.

To add a CHECK constraint, you typically run:

```sql
ALTER TABLE orders
ADD CONSTRAINT orders_positive CHECK (amount > 0);
```

This enforces the rule on future writes, but it also immediately validates all existing rows.
This is where the risk comes from.

## Why Adding CHECK Constraints Can Cause Downtime

When PostgreSQL validates an existing table, it must scan every row to confirm the constraint is not violated. During this step, it acquires an `ACCESS EXCLUSIVE` lock. This lock is the strongest one in PostgreSQL and can block:

* Reads
* Writes
* Other schema changes

On large tables or busy production databases, the lock can cause:

* Query timeouts
* Application errors
* Service degradation
* Full outages

This SQL Review rule prevents teams from accidentally introducing blocking schema changes during deployments.

## The Safe Approach: Use `NOT VALID`

PostgreSQL offers a safer method to add CHECK constraints to existing tables.
The idea is to separate constraint creation from constraint validation.

**Step 1: Create the constraint without validating existing rows**

```sql
ALTER TABLE orders
ADD CONSTRAINT orders_positive CHECK (amount > 0) NOT VALID;
```

* Only a brief catalog lock is required
* The constraint is enforced for all new inserts and updates
* Existing rows are not scanned yet

**Step 2: Validate at a convenient time**

```sql
ALTER TABLE orders
VALIDATE CONSTRAINT orders_positive;
```

Validation uses a lighter lock that does not block reads and writes.
You can perform this step during low-traffic periods or as part of a controlled rollout.

## Example

Unsafe pattern (not allowed):

```sql
ALTER TABLE accounts
ADD CONSTRAINT check_balance CHECK (balance >= 0);
```

Safe pattern (recommended):

```sql
ALTER TABLE accounts
ADD CONSTRAINT check_balance CHECK (balance >= 0) NOT VALID;
```

Validate separately:

```sql
ALTER TABLE accounts
VALIDATE CONSTRAINT check_balance;
```

This ensures the constraint is applied safely without disrupting user traffic.

## Summary

Adding CHECK constraints without `NOT VALID` can block reads and writes and lead to downtime.
This SQL Review rule enforces the two-step PostgreSQL best practice:

* Add the constraint using `NOT VALID`
* Validate it later using a non-blocking operation

By following this pattern, teams can ensure constraint correctness without risking production stability.