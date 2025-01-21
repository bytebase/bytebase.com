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

We are working on enabling backup and 1-click rollback for more SQL statements.

### Enhanced experience

<HintBlock type="info">

Applicable to `MySQL`, `Oracle(Prior backup only)`.

</HintBlock>

Prior backup is feasible when meeting **all** of the following conditions:

- The SQL statement size is less than 2M.

- No mixed `UPDATE`/`DELETE` on the same table.

- No mixed DDL/DML.

1-click rollback is feasible when meeting **all** of the following conditions:

- The changed table has primary key.

### Classic experience

<HintBlock type="info">

Applicable to `PostgreSQL`, `SQL Server`.

</HintBlock>

Prior backup is feasible when meeting **all** of the following conditions:

- The SQL statement size is less than 2M.
- No more than 5 statements and every statement is either `UPDATE` or `DELETE`, or all statements are `UPDATE` for the same table with `PRIMARY KEY` or `UNIQUE KEY` in `WHERE` clause.
- No mixed DDL/DML.

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

## Appendix: Setting Up `bbdataarchive`

### MySQL

1. Create the `bbdataarchive` Database:

   ```sql
   CREATE DATABASE bbdataarchive;
   ```

1. Grant Necessary Privileges:

   Replace `your_user` with the actual username.

   ```sql
   GRANT ALL PRIVILEGES ON bbdataarchive.* TO 'your_user'@'%';
   FLUSH PRIVILEGES;
   ```

### PostgreSQL

1. Create the `bbdataarchive` Schema:

   ```sql
   CREATE SCHEMA bbdataarchive;
   ```

1. Grant Necessary Privileges:

   Replace `your_user` with the actual username.

   ```sql
   GRANT ALL PRIVILEGES ON SCHEMA bbdataarchive TO your_user;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA bbdataarchive TO your_user;
   ```

### Oracle

1. Create the `bbdataarchive` User:

   ```sql
   CREATE USER bbdataarchive IDENTIFIED BY password;
   ```

1. Grant Connection Privileges:

   ```sql
   GRANT CREATE SESSION TO bbdataarchive;
   ```

1. Grant unlimited space quota to the `bbdataarchive` user on the specified `tablespace`:

   Replace `tablespace_name` with the actual tablespace name.

   ```sql
   GRANT QUOTA UNLIMITED ON tablespace_name TO bbdataarchive;
   ```

1. Grant Privileges to the Instance Administrator:

   Replace `admin_user` with the actual username of the instance administrator.

   ```sql
   GRANT CREATE ANY TABLE TO admin_user;
   GRANT SELECT ANY TABLE TO admin_user;
   ```

### SQL Server

1. Create the `bbdataarchive` Database:

   ```sql
   CREATE DATABASE bbdataarchive;
   ```

1. Grant Necessary Privileges:

   Replace `your_user` with the actual username.

   ```sql
   USE bbdataarchive;
   GRANT CONTROL ON DATABASE::bbdataarchive TO your_user;
   ```
