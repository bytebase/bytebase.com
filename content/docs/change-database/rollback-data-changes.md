---
title: Rollback Data Changes
feature_name: 'ROLLBACK_DATA_CHANGES'
---
## Prior Backup - MySQL/SQL Server/Oracle
Before a data change (`UPDATE`,`DELETE`) is made, Bytebase can create a backup of the affected rows. This allows you to revert that data change if needed.

### How to use

1. Create a database called `bbdataarchive` on the instance where your database is located.
1. Before creating the issue, turn on the **Prior Backup** switch.
   
    ![update](/content/docs/change-database/rollback-data-changes/bb-update.webp)

1. Create the issue and click **Rollout**. Scroll down, you'll find the comment with the backup information.

    ![comment](/content/docs/change-database/rollback-data-changes/bb-issue-done-prebackup-comment.webp)

1. Go to `bbdataarchive`, you'll find the table. You may query it via SQL Editor.

    ![comment](/content/docs/change-database/rollback-data-changes/bb-bbdataarchive.webp)


## SQL Rollback - MySQL
After a data change completes, Bytebase can parse MySQL binary logs and build rollback SQL statements from the logs. This allows you to revert that data change if needed.

### Requirements and limitations

- MySQL version is 5.7 or greater.
- MySQL has row-based logging enabled.
- The affected tables should have `PRIMARY KEY` or `UNIQUE` constraints.
- Bytebase cannot generate rollback statements that are bigger than `8 MB` currently.

### How to use

1. **Check if row-based logging is enabled**

    Connect to your MySQL instance and execute the following commands.

    A convenient way is to use the [SQL Editor Admin Mode](/docs/sql-editor/admin-mode).

    ```sql
    SHOW VARIABLES LIKE 'log_bin';
    ```

    The value should be `ON`.

    ```sql
    SHOW VARIABLES LIKE 'binlog_format';
    ```

    The value should be `ROW`.

1. **Check binlog retention time**

    Bytebase needs your MySQL binlog to generate rollback SQL statements. Your binlog retention time should be at least `1 hour (3600 seconds)`.

    The following commands returns the binary log expiration period in seconds.

    ```sql
    # >= MySQL 8.0
    SHOW VARIABLES LIKE 'binlog_expire_logs_seconds';
    # < MySQL 8.0
    SHOW VARIABLES LIKE 'expire_logs_days';
    ```

    <HintBlock type="info">

    If you are using a managed MySQL, please refer to your provider's documentation on querying binlog retention time.

    </HintBlock>

    <HintBlock type="warning">

    Bytebase cannot build rollback statements for a task from the distant past because the corresponding binlog may have already been purged.

    </HintBlock>

1. **Enable rollback SQL generation**

    Click **SQL Rollback** switch to request Bytebase to generate rollback SQL after data changes are completed.

1. **Rollback**

    Click **Preview rollback issue**.

    <HintBlock type="warning">

    The tables to perform rollbacks should have a `PRIMARY KEY` or `UNIQUE` constraint.

    </HintBlock>

### FAQ

1. **Why I get `The rollback statement is empty`?**

    Some common reasons might lead to empty rollback statement.

    - The task didn't change any row.
    - The binlog has been purged. You may need to extend your binlog retention time.
