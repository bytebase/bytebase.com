---
title: 'PostgreSQL Rollback'
author: Adela
updated_at: 2025/09/04 18:00
feature_image: /content/blog/postgres-rollback/cover.webp
tags: Explanation
description: 'An engineering perspective to evaluate PostgreSQL rollback strategies'
---

Database integrity and recovery mechanisms are critical for any production system. PostgreSQL provides multiple rollback strategies: built-in transaction rollback with SAVEPOINTs, Point-in-Time Recovery (PITR), and modern cross-transaction DML rollback solutions with tools. Each serves different use cases with distinct limitations.

## Built-in Transaction Rollback and SAVEPOINTs

PostgreSQL transactions allow rolling back all changes within a transaction block. For granular control, `SAVEPOINT`s create markers within transactions, enabling partial rollbacks without affecting earlier operations.

### Using SAVEPOINTs

Create a savepoint:
```sql
SAVEPOINT my_savepoint;
```

Roll back to it:
```sql
ROLLBACK TO SAVEPOINT my_savepoint;
```

**Practical pattern for risky operations:**
```sql
BEGIN;

-- Step 1: safe operations
INSERT INTO employees (name, department) VALUES ('Alice', 'Engineering');

SAVEPOINT sp_batch;

-- Step 2: risky operations
INSERT INTO employees (name, department) VALUES ('Bob', 'Marketing');
-- Oops, Bob is actually in Sales

-- Roll back only the risky step
ROLLBACK TO SAVEPOINT sp_batch;

-- Step 3: continue with corrected operation
INSERT INTO employees (name, department) VALUES ('Bob', 'Sales');

COMMIT;
```

The savepoint remains usable after rollback, but any savepoints created after it are destroyed and invalidated by the rollback (not just released).

### Limitations

- Some DDL statements (`CREATE DATABASE`, `DROP DATABASE`, `CREATE TABLESPACE`, `DROP TABLESPACE`) cannot run inside transactions
- Only works for uncommitted transactions - once committed, `ROLLBACK` cannot undo changes

## Point-In-Time Recovery (PITR)

PITR restores databases to specific points in time using continuous WAL archiving. PostgreSQL's Write-Ahead Log records every database change. PITR combines base backups with archived WAL files to replay changes up to any desired moment.

### Cloud Provider Support
Major cloud providers offer one-click PITR experiences:
- **AWS RDS for PostgreSQL**: Restore to point in time via Console/CLI/API
- **Google Cloud SQL**: PITR from console interface  
- **Azure Database for PostgreSQL**: Portal "Restore" to latest or chosen restore point

### Named Restore Points
Create targeted recovery points for easier PITR:
```sql
-- Before risky migration
SELECT pg_create_restore_point('pre_migration_2025_09_04');
```

Later recover using `recovery_target_name = 'pre_migration_2025_09_04'` instead of guessing timestamps.

### Advantages
- Handles any rollback scenario regardless of transaction commit status
- Can recover from errors discovered hours or days later

### Limitations
- Operates at cluster level - rolls back entire database, not individual tables or rows
- Heavyweight operation unsuitable for small, isolated changes
- Rolling back one incorrect `UPDATE` also undoes all subsequent valid changes

## Cross-Transaction DML Rollback (Compensating Changes)

After a bad `UPDATE`/`DELETE`/`INSERT` is committed, you need **compensating DML** that restores previous values - think "git revert" for data.

### Manual Compensating DML Example

Accidentally ran:
```sql
UPDATE accounts SET status = 'inactive' WHERE org_id = 42;
```

Compensate using audit/history table:
```sql
-- Revert to last known status per row
UPDATE accounts a
SET status = h.old_status
FROM account_status_history h
WHERE a.id = h.account_id
  AND h.org_id = 42
  AND h.changed_at = (
       SELECT max(h2.changed_at)
       FROM account_status_history h2
       WHERE h2.account_id = a.id
         AND h2.changed_at < :mistake_time
     );
```

Real systems must handle sequences, cascades, triggers, and side-effects.

### Bytebase Solution

Bytebase provides point-and-click rollback through [Prior Backup](https://docs.bytebase.com/change-database/rollback-data-changes) functionality:

1. **Prior Backup**: Automatically captures affected rows before DML execution
2. **Change Execution**: Stores backup in dedicated `bbdataarchive` schema
3. **1-Click Rollback**: Generates and executes rollback scripts automatically

### Workflow Benefits
- Eliminates manual rollback script creation
- Integrated review and approval process
- Multi-task rollback across databases
- Safe, controlled change management

## Choosing the Right Rollback Method

Now that you understand the three rollback approaches, here's how to choose the right one for your situation:

| Situation | Best Tool | Why |
|-----------|-----------|-----|
| Still in session, haven't committed | **Transaction rollback / SAVEPOINT** | Instant, lossless; keep good work, discard bad chunk |
| Committed a small wrong UPDATE/DELETE | **Cross-transaction rollback (Bytebase)** | Surgical fix; no cluster restore |
| Dropped table / mass data corruption | **PITR** | Ubiquitous, reliable; recovers to clean time point |
| Need CREATE INDEX CONCURRENTLY | **Run outside explicit BEGIN** | PostgreSQL forbids it inside transaction block |
| Need CREATE DATABASE | **Run autocommit / outside BEGIN** | Not allowed in transaction block |

## Caveats & Gotchas

- **Transaction abort state**: If a statement errors mid-transaction, the session is "aborted" until you `ROLLBACK`. Don't keep issuing statements hoping it heals.
- **PITR blast radius**: It's cluster-level by design; plan to restore to a new server, verify state, then cut over or copy data back.
- **Compensating DML complexity**: Manual rollback scripts are error-prone and must account for cascading effects, triggers, and referential integrity.


## TL;DR

- **Use transactions + SAVEPOINT** to avoid mistakes in the first place
- **Use PITR** when blast radius is unclear or damage is large - it's ubiquitous and cloud-friendly  
- **Use compensating DML (or Bytebase's rollback workflow)** for small, precise fixes after commit - without PITR's weight