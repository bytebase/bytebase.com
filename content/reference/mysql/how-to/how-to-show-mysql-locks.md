---
title: How to show MySQL locks in InnoDB
---

## Using Performance Schema

The Performance Schema provides the most detailed information about InnoDB locks:

1. First, ensure Performance Schema is enabled:

   ```sql
   SHOW VARIABLES LIKE 'performance_schema';
   ```

2. Query the data_locks table to see current locks:

   ```sql
   SELECT * FROM performance_schema.data_locks;
   ```

3. For more readable output with relevant information only:

   ```sql
   SELECT
     object_schema AS database_name,
     object_name AS table_name,
     lock_type,
     lock_mode,
     lock_status,
     thread_id
   FROM performance_schema.data_locks;
   ```

4. To see which sessions are waiting for locks and which are blocking:
   ```sql
   SELECT
     r.trx_id waiting_transaction,
     r.trx_mysql_thread_id waiting_thread,
     r.trx_query waiting_query,
     b.trx_id blocking_transaction,
     b.trx_mysql_thread_id blocking_thread,
     b.trx_query blocking_query
   FROM information_schema.innodb_lock_waits w
   JOIN information_schema.innodb_trx b ON b.trx_id = w.blocking_trx_id
   JOIN information_schema.innodb_trx r ON r.trx_id = w.requesting_trx_id;
   ```

## Using Information Schema Tables

The INFORMATION_SCHEMA also provides valuable lock information:

1. View active transactions and their lock status:

   ```sql
   SELECT * FROM information_schema.innodb_trx;
   ```

2. Find transactions that have been running for too long:
   ```sql
   SELECT
     trx_id,
     trx_state,
     trx_started,
     trx_mysql_thread_id,
     trx_query
   FROM information_schema.innodb_trx
   WHERE trx_state = 'RUNNING'
   AND timestampdiff(SECOND, trx_started, now()) > 30;
   ```

## Show Engine InnoDB Status

For a comprehensive view of InnoDB's internal state including locks:

```sql
SHOW ENGINE INNODB STATUS;
```

Look for the "TRANSACTIONS" section in the output, which shows active transactions and their lock status.

## Identifying and Resolving Deadlocks

1. View the last deadlock that occurred:

   ```sql
   SHOW ENGINE INNODB STATUS;
   ```

2. In the output, find the "LATEST DETECTED DEADLOCK" section.

3. To continuously monitor for deadlocks, you can enable deadlock logging:

   ```sql
   SET GLOBAL innodb_print_all_deadlocks = 1;
   ```

4. Deadlocks will then be logged to the MySQL error log.
