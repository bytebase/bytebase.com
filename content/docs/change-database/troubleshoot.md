---
title: Troubleshoot
---

## PostgreSQL

### ERROR: must be owner of table xxx (SQLSTATE 24501)

You may encounter this error when executing the schema migration on PostgreSQL databases.

When Bytebase executes schema migration on PostgreSQL databases, it will not use the configured user
in the instance to execute. Instead, it uses [`SET LOCAL ROLE`](https://github.com/bytebase/bytebase/blob/b79d79d81279a29ab6e9f147632f5a2631755299/backend/plugin/db/pg/pg.go#L340-L341) to swtich to the
targetting PostgreSQL database owner.

Bytebase does this because if you are creating a table, it's likely you want the created table
owner to be the database owner speficic to the database instead of that shared Bytebase user.

However, for some sophiscated setup where database owner and table owner are different, this causes problem.
Because only table owner can alter that table schema, and if the database owner is not a member of
the table owner, then the exeuction will throw the `ERROR: must be owner of table xxx` error.

One way to workaround this is to grant the table owner permission to the database onwer:

```sql
GRANT <<TABLE_OWNER>> TO <<DATABASE_OWNER>>
```
