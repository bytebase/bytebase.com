---
title: Rollback Data Changes
feature_name: 'ROLLBACK_DATA_CHANGES'
---
Bytebase does **Prior Backup** before a data change (`UPDATE`,`DELETE`) is made. The system creates a backup of the affected rows, which allows you to revert that data change if needed.

## Preparation

**MySQL/SQL Server/Oracle**: Create a database called `bbdataarchive` on the instance where your database is located.

**PostgreSQL**: Create a schema called `bbdataarchive` on the database.

## How to use

1. Before creating the issue, turn on the **Prior Backup** switch.

    ![update](/content/docs/change-database/rollback-data-changes/bb-update.webp)

1. Create the issue and click **Rollout**. Scroll down, you'll find the comment with the backup information.

1. Go to database `bbdataarchive` or schema `bbdataarchive`, you'll find the table. You may query it via SQL Editor.

    ![database](/content/docs/change-database/rollback-data-changes/bb-bbdataarchive.webp)

    ![schema](/content/docs/change-database/rollback-data-changes/bb-schema-bbdataarchive.webp)