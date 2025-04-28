---
title: 'Postgres Error Reference'
---

This page lists the common Postgres errors that you may encounter.

Complete error list can be found in the [Postgres official documentation](https://www.postgresql.org/docs/current/errcodes-appendix.html).

## Data Integrity Errors

- [**ERROR 23505**](/reference/postgres/error/23505-duplicate-key-value): Duplicate key value violates unique constraint

  ```sql
  ERROR: duplicate key value violates unique constraint "table_pkey"
  DETAIL: Key (id)=(1) already exists.
  ```

- [**ERROR 23503**](/reference/postgres/error/23503-foreign-key-violation): Insert or update violates foreign key constraint

  ```sql
  ERROR: insert or update on table "child_table" violates foreign key constraint "fk_constraint_name"
  DETAIL: Key (parent_id)=(100) is not present in table "parent_table".
  ```

- [**ERROR 23514**](/reference/postgres/error/23514-check-constraint-violation): Check constraint violation

  ```sql
  ERROR: new row for relation "users" violates check constraint "check_age_positive"
  DETAIL: Failing row contains (1, John, -5).
  ```

## Permission and Dependency Errors

- [**ERROR 42501**](/reference/postgres/error/42501-permission-denied-for-table-postgres): Permission denied for table

  ```sql
  ERROR: permission denied for table users
  ```

- [**ERROR 2B000**](/reference/postgres/error/2b000-dependent-privilege-descriptors): Cannot drop role because objects depend on it

  ```sql
  ERROR: cannot drop role "admin" because some objects depend on it
  DETAIL: 3 objects in database "mydb" depend on role "admin"
  ```

- [**ERROR 2BP01**](/reference/postgres/error/2bp01-dependent-objects-still-exist): Cannot drop schema because objects depend on it

  ```sql
  ERROR: cannot drop schema "public" because other objects depend on it
  DETAIL: table users depends on schema public
  HINT: Use DROP ... CASCADE to drop the dependent objects too.
  ```

## Concurrency and Locking Errors

- [**ERROR 40P01**](/reference/postgres/error/40p01-deadlock-detected): Deadlock detected

  ```sql
  ERROR: deadlock detected
  DETAIL: Process 1234 waits for ShareLock on transaction 5678; blocked by process 5432.
  Process 5432 waits for ShareLock on transaction 8765; blocked by process 1234.
  HINT: See server log for query details.
  ```

- [**ERROR 55P03**](/reference/postgres/error/55p03-lock-not-available): Lock not available

  ```sql
  ERROR: could not obtain lock on relation "orders"
  DETAIL: Lock request timed out after 60000 milliseconds.
  HINT: Close other transactions occupying the relation before retrying.
  ```

## Type and Syntax Errors

- [**ERROR 42804**](/reference/postgres/error/42804-datatype-mismatch): Datatype mismatch

  ```sql
  ERROR: column "age" is of type integer but expression is of type text
  HINT: You will need to rewrite or cast the expression.
  ```

- [**ERROR 42P21**](/reference/postgres/error/42p21-collation-mismatch): Collation mismatch

  ```sql
  ERROR: could not determine which collation to use for string comparison
  HINT: Use the COLLATE clause to set the collation explicitly.
  ```

## Connection Errors

- [**ERROR 53300**](/reference/postgres/error/53300-too-many-connections): Too many connections

  ```sql
  ERROR: sorry, too many clients already
  DETAIL: All connection slots are currently in use.
  HINT: Consider increasing max_connections (currently 100).
  ```

---
