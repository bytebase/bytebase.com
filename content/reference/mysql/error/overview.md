---
title: 'MySQL Error Reference'
---

This page lists the common MySQL errors that you may encounter.

Complete error list can be found in the [MySQL official documentation](https://dev.mysql.com/doc/mysql-errors/8.0/en/).

## Connection Errors

- [**ERROR 1040** (HY000)](/reference/mysql/error/1040-too-many-connections): Too Many Connections

  ```sql
  ERROR 1040 (HY000): Too many connections
  ```

- [**ERROR 1130** (HY000)](/reference/mysql/error/1130-host-not-allowed-to-connect): Host is not allowed to connect

  ```sql
  ERROR 1130 (HY000): Host 'client-hostname' is not allowed to connect to this MySQL server
  ```

- [**ERROR 2002** (HY000)](/reference/mysql/error/2002-cant-connect-local-mysql-server): Can't connect to local MySQL server through socket

  ```sql
  ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)
  ```

- [**ERROR 2003** (HY000)](/reference/mysql/error/2003-cant-connect-mysql-server): Can't connect to MySQL server on '[host]'

  ```sql
  ERROR 2003 (HY000): Can't connect to MySQL server on 'hostname' (110)
  ```

- [**ERROR 2013** (HY000)](/reference/mysql/error/2013-lost-connection-mysql-server): Lost connection to MySQL server during query
  ```sql
  ERROR 2013 (HY000): Lost connection to MySQL server during query
  ```

## Privilege Errors

- [**ERROR 1041** (42000)](/reference/mysql/error/1041-you-are-not-allowed-to-create-a-user-with-grant): You are not allowed to create a user with GRANT

  ```sql
  ERROR 1041 (42000): You are not allowed to create a user with GRANT
  ```

- [**ERROR 1044** (42000)](/reference/mysql/error/1044-access-denied-for-user-to-database): Access denied for user to database

  ```sql
  ERROR 1044 (42000): Access denied for user 'username'@'hostname' to database 'db_name'
  ```

- [**ERROR 1045** (42000)](/reference/mysql/error/1045-access-denied-for-user-using-password): Access denied for user 'username'@'hostname' (using password: YES)

  ```sql
  ERROR 1045 (42000): Access denied for user 'username'@'hostname' (using password: YES)
  ```

- [**ERROR 1049** (42000)](/reference/mysql/error/1049-unknown-database): Unknown Database

  ```sql
  ERROR 1049 (42000): Unknown database 'db_name'
  ```

- [**ERROR 1142** (42000)](/reference/mysql/error/1142-command-denied-to-user): Command denied to user

  ```sql
  ERROR 1142 (42000): SELECT command denied to user 'username'@'hostname' for table 'table_name'
  ```

- [**ERROR 1396** (HY000)](/reference/mysql/error/1396-operation-failed-for-user): Operation failed for user
  ```sql
  ERROR 1396 (HY000): Operation CREATE USER failed for 'username'@'hostname'
  ```

## Data Modification Errors

- [**ERROR 1062** (23000)](/reference/mysql/error/1062-duplicate-entry): Duplicate entry

  ```sql
  ERROR 1062 (23000): Duplicate entry '123' for key 'PRIMARY'
  ```

- [**ERROR 1153** (08S01)](/reference/mysql/error/1153-packet-bigger-than-max-allowed-packet): Got a packet bigger than 'max_allowed_packet'

  ```sql
  ERROR 1153 (08S01): Got a packet bigger than 'max_allowed_packet' bytes
  ```

- [**ERROR 1175** (HY000)](/reference/mysql/error/1175-using-safe-update-mode): You are using safe update mode

  ```sql
  ERROR 1175 (HY000): You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column
  ```

- [**ERROR 1213** (40001)](/reference/mysql/error/1213-deadlock-found): Deadlock found when trying to get lock
  ```sql
  ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
  ```

## Foreign Key Errors

- [**ERROR 1215** (HY000)](/reference/mysql/error/1215-cannot-add-foreign-key): Cannot add foreign key constraint

  ```sql
  ERROR 1215 (HY000): Cannot add foreign key constraint
  ```

- [**ERROR 1216** (23000)](/reference/mysql/error/1216-cannot-add-child-row): Cannot add or update a child row: a foreign key constraint fails

  ```sql
  ERROR 1216 (23000): Cannot add or update a child row: a foreign key constraint fails
  ```

- [**ERROR 1217** (23000)](/reference/mysql/error/1217-cannot-delete-parent-row): Cannot delete or update a parent row: a foreign key constraint fails

  ```sql
  ERROR 1217 (23000): Cannot delete or update a parent row: a foreign key constraint fails
  ```

- [**ERROR 1451** (23000)](/reference/mysql/error/1451-cannot-delete-parent-row): Cannot delete or update a parent row: a foreign key constraint fails
  ```sql
  ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails
  ```

---
