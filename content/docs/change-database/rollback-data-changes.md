---
title: Data Rollback
feature_name: 'ROLLBACK_DATA_CHANGES'
---

<TutorialBlock url="/docs/tutorials/data-rollback" title="Manage Database Change with 1-Click Data Rollback" />

Bytebase allows taking **Prior Backup** before a data change is made. Bytebase stores the pre-snapshot of the affected rows, which allows you to revert that data change if needed.

<HintBlock type="info">

The backup data is stored in your own database instance. Bytebase does not purge the backup data automatically.
You can manually delete the data in `bbdataarchive` database/schema.

</HintBlock>

## Supported Databases

| Database   | Prerequisites                                                                         | Prior Backup | 1-click Rollback |
| ---------- | ------------------------------------------------------------------------------------- | ------------ | ---------------- |
| MySQL      | Create a `bbdataarchive` **database** on the instance where your database is located. | ✅           | ✅               |
| PostgreSQL | Create a `bbdataarchive` **schema** on the database.                                  | ✅           | ✅               |
| Oracle     | Create a `bbdataarchive` **database** on the instance where your database is located. | ✅           | ❌               |
| SQL Server | Create a `bbdataarchive` **database** on the instance where your database is located. | ✅           | ✅               |

## Supported Operations

We are working on removing more limitations preventing backup and 1-click rollback.

### Enhanced experience

<HintBlock type="info">

Applicable to `MySQL`.

</HintBlock>

Prior backup is feasible when meeting **any** of the following conditions:

1. The SQL size is less than 2M.

1-click rollback is feasible when meeting **any** of the following conditions:

1. The changed table has primary key.

### Classic experience

<HintBlock type="info">

Applicable to `PostgreSQL`, `Oracle`, `SQL Server`.

</HintBlock>

Prior backup is feasible when meeting **any** of the following conditions:

1. No more than 5 statements and every statement is either `UPDATE` or `DELETE`.
1. All statements are `UPDATE` for the same table with `PRIMARY KEY` or `UNIQUE KEY` in `WHERE` clause.

## Create backup

You can toggle **Prior Backup** switch before or after creating the issue.

![bb-prior-bk-on](/content/docs/change-database/rollback-data-changes/bb-prior-bk-on.webp)

## 1-click rollback

1. Once the change has been rolled out. You can click the **Rollback** button to create the rollback issue.

   ![bb-prior-bk-rollback](/content/docs/change-database/rollback-data-changes/bb-prior-bk-rollback.webp)

1. The rollback issue automatically populates the rollback statements.

   ![bb-prior-bk-rollback-issue](/content/docs/change-database/rollback-data-changes/bb-prior-bk-rollback-issue.webp)

## Inspect the backup data

You can go to SQL Editor to inspect the backup data. If the DML change contains no more than 5 statements, then each
statements will be backed up to a separate table.

![bb-prior-bk-separate-table](/content/docs/change-database/rollback-data-changes/bb-prior-bk-separate-table.webp)

If the DML change contains more than 5 statements, then all statements will be backed up to a single table.

![bb-prior-bk-single-table-issue](/content/docs/change-database/rollback-data-changes/bb-prior-bk-single-table-issue.webp)

![bb-prior-bk-single-table](/content/docs/change-database/rollback-data-changes/bb-prior-bk-single-table.webp)

## Project backup settings

<PricingPlanBlock feature_name='ISSUE_SETTING' />

- You can enable **Prior Backup** by default.
- You can control whether you want to skip backup errors and continue changing the data.

![prior-backup-default](/content/docs/change-database/rollback-data-changes/bb-prior-backup-default.webp)
