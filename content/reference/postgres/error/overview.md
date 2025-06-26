---
title: 'Postgres Error Reference'
---

This page lists the common Postgres errors that you may encounter, organized by category for easier navigation.

Complete error list can be found in the [Postgres official documentation](https://www.postgresql.org/docs/current/errcodes-appendix.html).

## Data Integrity & Constraint Errors

These errors occur when data violates database constraints such as unique keys, foreign keys, or check constraints.

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

## Query Structure & Aggregation Errors

These errors occur due to incorrect SQL query structure, GROUP BY usage, data type issues, and aggregate function problems.

- [**ERROR 42803**](/reference/postgres/error/42803-aggregate-function-calls-cannot-be-nested): Aggregate function calls cannot be nested

  ```sql
  ERROR: aggregate function calls cannot be nested
  LINE 1: SELECT MAX(COUNT(*)) FROM orders GROUP BY customer_id;
  ```

- [**ERROR 42803**](/reference/postgres/error/42803-column-must-appear-in-group-by-clause): Column must appear in the GROUP BY clause or be used in an aggregate function

  ```sql
  ERROR: column "orders.customer_name" must appear in GROUP BY clause or be used in an aggregate function
  LINE 1: SELECT customer_id, customer_name, COUNT(*) FROM orders GROUP BY customer_id;
  ```

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

## Schema & Object Management Errors

These errors relate to creating, dropping, or modifying database objects and their dependencies.

- [**ERROR 42P07**](/reference/postgres/error/42p07-relation-already-exists-postgres): Relation already exists

  ```sql
  ERROR: relation "users" already exists
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

- [**ERROR 2BP01**](/reference/postgres/error/2bp01-cannot-drop-constraint-used-by-foreign-key-constraint-postgres): Cannot drop constraint used by foreign key constraint

  ```sql
  ERROR: cannot drop constraint "users_pkey" on table "users" because constraint "orders_user_id_fkey" on table "orders" requires it
  HINT: You can drop constraint "orders_user_id_fkey" on table "orders" instead.
  ```

- [**ERROR**](/reference/postgres/error/cannot-change-return-type-of-existing-function): Cannot change return type of existing function

  ```sql
  ERROR: cannot change return type of existing function
  DETAIL: Row type defined by OUT parameters is different.
  HINT: Use DROP FUNCTION first.
  ```

## Permission & Authentication Errors

These errors relate to user permissions, ownership, and access control issues.

- [**ERROR 42501**](/reference/postgres/error/42501-permission-denied-for-table-postgres): Permission denied for table

  ```sql
  ERROR: permission denied for table users
  ```

- [**ERROR 42501**](/reference/postgres/error/42501-must-be-owner-of-table-postgres): Must be owner of table

  ```sql
  ERROR: must be owner of table users
  ```

## Concurrency & Locking Errors

These errors occur in multi-user environments due to transaction conflicts, deadlocks, and locking issues.

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

## Connection & Resource Errors

These errors are related to server configuration limits, resource constraints, and connection management.

- [**ERROR 53300**](/reference/postgres/error/53300-too-many-connections): Too many connections

  ```sql
  ERROR: sorry, too many clients already
  DETAIL: All connection slots are currently in use.
  HINT: Consider increasing max_connections (currently 100).
  ```

## Backup & Restore Tool Errors

These errors occur when using PostgreSQL backup and restore utilities like pg_dump and pg_restore.

- [**pg_dump: error: aborting because of server version mismatch**](/reference/postgres/error/pgdump-aborting-because-of-server-version-mismatch): Version mismatch between pg_dump and PostgreSQL server

  ```bash
  pg_dump: error: aborting because of server version mismatch
  ```

- [**pg_restore: error: input file appears to be a text format dump**](/reference/postgres/error/pgrestore-input-file-appears-to-be-a-text-format-dump): Attempting to use pg_restore on plain text SQL dump

  ```bash
  pg_restore: error: input file appears to be a text format dump. Please use psql.
  ```

## Replication Errors

These errors occur when using PostgreSQL logical replication features, including publication/subscription setup and maintenance.

- [**ERROR: logical replication target relation is missing some replicated columns**](/reference/postgres/error/logical-replication-target-relation-missing-replicated-columns): Target table missing columns that exist in source table

  ```sql
  ERROR: logical replication target relation "public.t" is missing some replicated columns
  ```

- [**ERROR: cannot delete from table because it does not have a replica identity and publishes deletes**](/reference/postgres/error/cannot-delete-from-table-no-replica-identity): Table lacks proper row identification for DELETE/UPDATE replication

  ```sql
  ERROR: cannot delete from table "nopk" because it does not have a replica identity and publishes deletes
  HINT: To enable deleting from
  ```

---
