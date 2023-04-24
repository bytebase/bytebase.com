---
title: Migration Types
---

Bytebase records the migration history with the migration type information.

## Schema Migration

Schema migration is the migration type for DDL statements.

## Data Migration

Data migration is the migration type for DML statements.

## Baseline Migration

Baseline migration instructs Bytebase to use the latest live schema as the source of truth. This is normally used when [schema drift](/docs/anomaly-detection/drift-detection) occurs and Bytebase needs to re-establish the baseline based on the latest live schema.

## Branch Migration

A branch migration history is recorded when a database is restored from a backup. See [Restore from Backup](/docs/disaster-recovery/backup-restore-database/restore-from-backup#step-4-view-the-restored-database) for details.
