---
title: Data Rollback
feature_name: 'ROLLBACK_DATA_CHANGES'
---

Bytebase allows taking **Prior Backup** before a data change (`UPDATE`, `DELETE`) is made. Bytebase stores the pre-snapshot of the affected rows, which allows you to revert that data change if needed.

## Support Matrix

<HintBlock type="info">

Support `MySQL`, `PostgreSQL`, `Oracle`, `SQL Server`, applicable to `UPDATE` and `DELETE` DML.

</HintBlock>

| Database   | Prerequisite                                                                          | 1-click Rollback |
| ---------- | ------------------------------------------------------------------------------------- | ---------------- |
| MySQL      | Create a `bbdataarchive` **database** on the instance where your database is located. | ✅               |
| PostgreSQL | Create a `bbdataarchive` **schema** on the database.                                  | ✅               |
| Oracle     | Create a `bbdataarchive` **database** on the instance where your database is located. | ✅               |
| SQL Server | Create a `bbdataarchive` **database** on the instance where your database is located. | ❌               |

## Create backup

Toggle **Prior Backup** switch. You can do this before or after creating the issue.

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
