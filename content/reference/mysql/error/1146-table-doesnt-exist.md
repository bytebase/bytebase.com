---
title: "ERROR 1146 (42S02): Table Doesn't Exist"
updated_at: 2026/03/19 09:00:00
---

## Error Message

```sql
ERROR 1146 (42S02): Table 'mydb.users' doesn't exist
```

## Description

MySQL error 1146 means the query references a table that MySQL cannot find in the specified database. The error message includes the fully qualified name (`database.table`) so you can see exactly which table and database MySQL looked in.

## Causes

- **Typo in the table name.** `SELECT * FROM uesrs` fails when the table is `users`.
- **Wrong database.** The table exists in `production` but the connection is to `staging`. MySQL only sees tables in the currently selected database (or explicitly qualified ones).
- **Table was dropped or never created.** A migration failed, a manual `DROP TABLE` happened, or the CREATE statement was never run.
- **Case sensitivity on Linux.** MySQL table names map to files on disk. On Linux (case-sensitive filesystem), `Users` and `users` are different tables. On macOS and Windows, they're the same.
- **InnoDB data dictionary mismatch.** The `.frm` file (MySQL 5.7 and earlier) or the InnoDB data dictionary (MySQL 8.0+) is out of sync with the actual tablespace files. This happens after a crash, incomplete restore, or manual file manipulation.
- **Corrupted table.** Improper server shutdown, disk failure, or interrupted operations can corrupt table metadata.
- **Missing privileges.** If the user has no privileges on the table at all, MySQL may report it as not existing rather than access denied (depending on configuration).

## Solutions

1. **Verify the table exists:**

   ```sql
   -- List all tables in the current database
   SHOW TABLES;

   -- Search across databases
   SELECT table_schema, table_name
   FROM information_schema.tables
   WHERE table_name LIKE '%users%';
   ```

2. **Check which database you're connected to:**

   ```sql
   SELECT DATABASE();

   -- Switch to the correct database
   USE production;
   ```

3. **Check case sensitivity:**

   ```sql
   -- Check the server setting
   SHOW VARIABLES LIKE 'lower_case_table_names';
   ```

   | Value | Behavior |
   |-------|----------|
   | 0 | Case-sensitive (Linux default) |
   | 1 | Stored lowercase, compared case-insensitively (Windows default) |
   | 2 | Stored as given, compared case-insensitively (macOS default) |

4. **Run pending migrations:**

   ```bash
   # Check migration status with your tool
   flyway info
   # Or check in Bytebase's change history
   ```

5. **Check and repair tables after a crash:**

   ```sql
   -- MySQL 8.0+: check table status
   CHECK TABLE mydb.users;

   -- For MyISAM tables
   REPAIR TABLE mydb.users;
   ```

   ```bash
   # Check all tables in a database
   mysqlcheck -u root -p --check mydb
   ```

6. **Restore from backup if table data is lost:**

   ```bash
   # Restore a single table from a mysqldump backup
   mysql -u root -p mydb < backup.sql
   ```

7. **Verify user privileges:**

   ```sql
   SHOW GRANTS FOR CURRENT_USER;
   ```

## Common scenarios

**After server crash or unclean shutdown:** InnoDB tables may show as missing if the redo log recovery didn't complete. Restart MySQL and check the error log (`/var/log/mysql/error.log`) for recovery messages. If the tablespace file (`.ibd`) still exists, InnoDB will usually recover the table on restart.

**During mysqldump or backup:** If a table is dropped by another session while mysqldump is running, the dump will fail with 1146. Use `--single-transaction` for InnoDB tables to get a consistent snapshot.

**In Docker or Kubernetes:** Containers with ephemeral storage lose all data on restart. If you see 1146 after a container restart, the database volume was not persisted. Mount a volume for `/var/lib/mysql`.

<HintBlock type="info">

Bytebase tracks all schema changes with a full [audit trail](https://www.bytebase.com/docs/change-database/change-workflow/), so you can identify when and by whom a table was dropped. For MySQL installation and client setup, see [How to install MySQL client](/reference/mysql/how-to/how-to-install-mysql-client-on-mac-ubuntu-centos-windows/).

</HintBlock>
