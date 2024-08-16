---
title: Troubleshoot
---

## Duplicate version

This happens if a migration version has been attempted (regardless of whether it's successful or not) and you are trying to apply the same version.

Once the migration is attempted, regardless of whether it's successful or not, its version string is occupied and can't be reused.

This error is more common in GitOps flow when you try to modify an existing migration file. Refer to the [GitOps troubleshoot](/docs/vcs-integration/troubleshoot/#duplicate-version)
to learn the correct workflow.

## PostgreSQL

_Also applicable to Redshift and RisingWave_

<HintBlock type="info">

Following permission errors are likely to happen if either conditions meet:

1. Your PostgreSQL instance in hosted in the cloud, which means the configured Bytebase database instance
   user does not have `superuser` role.
1. Your database/table has different owners.

</HintBlock>

### ERROR: permission denied to set role xxx (SQLSTATE 42501)

You may encounter this error when executing the schema migration on PostgreSQL databases.

When Bytebase executes schema migration on PostgreSQL databases, it will not use the configured user
in the instance to execute. Instead, it uses [`SET LOCAL ROLE`](https://github.com/bytebase/bytebase/blob/b79d79d81279a29ab6e9f147632f5a2631755299/backend/plugin/db/pg/pg.go#L340-L341) to switch to the
targeting PostgreSQL database owner.

Bytebase does this because if you are creating a table, it's likely you want the created table
owner to be the database owner specific to the database instead of that shared Bytebase user.

You need to grant the database owner permission to the Bytebase user configured in the PostgreSQL instance.

```sql
-- Suppose the Bytebase user is `bytebase`
-- INHERIT FALSE is sufficient for `SET LOCAL ROLE`
GRANT <<DATABASE_OWNER>> TO bytebase WITH INHERIT FALSE
```

### ERROR: must be owner of table xxx (SQLSTATE 42501)

You may encounter this error when executing the schema migration on PostgreSQL databases.

When Bytebase executes schema migration on PostgreSQL databases, it will not use the configured user
in the instance to execute. Instead, it uses [`SET LOCAL ROLE`](https://github.com/bytebase/bytebase/blob/b79d79d81279a29ab6e9f147632f5a2631755299/backend/plugin/db/pg/pg.go#L340-L341) to switch to the
targeting PostgreSQL database owner.

Bytebase does this because if you are creating a table, it's likely you want the created table
owner to be the database owner specific to the database instead of that shared Bytebase user.

However, for some sophisticated setup where database owner and table owner are different, this causes problem.
Because only table owner can alter that table schema, and if the database owner is not a member of
the table owner, then the execution will throw the `ERROR: must be owner of table xxx` error.

One way to workaround this is to grant the table owner permission to the database owner:

```sql
GRANT <<TABLE_OWNER>> TO <<DATABASE_OWNER>>
```

### ERROR: permission denied for table xxx (SQLSTATE 42501)

See above.

### ERROR: permission denied for table xxx pg_dump: detail: Query was: LOCK TABLE xxx IN ACCESS SHARE MODE

You may encounter this error when executing the schema migration on PostgreSQL databases.

When Bytebase executes schema migration, it will use pg_dump to record the before/after schema snapshot.

This error happens when the user configured in the Bytebase PostgreSQL instance doesn't have the SELECT permission on the table. Let's suppose the Bytebase user
configured in the Bytebase PG instance is called `bytebase`. You should do grant
the table owner permission to `bytebase`:

```sql
GRANT SELECT ON TABLE <<TABLE_NAME>> TO bytebase
```
