---
title: Permission denied for table in Postgres
---

In PostgreSQL, the `Permission denied for table` or `Permission denied for relation` error usually occurs when a user attempts to perform an operation on a table without the necessary privileges. This error can surface during various operations such as `SELECT`, `INSERT`, `UPDATE`, `DELETE`, or even when trying to access table data through a JOIN operation. Here are the common causes and suggestions for fixing this issue in PostgreSQL

## Schema/Table Reference

Ensure the operation is being performed on the correct schema and table, as PostgreSQL can have tables with the same name in different schemas.

## Insufficient Privileges

The user does not have the required permissions on the table to perform the operation. PostgreSQL requires explicit permission grants for different operations on database objects.

You need to determine which operation the user is attempting to perform and grant the appropriate permissions. For example, to grant `SELECT` permission, you would use:

```sql
GRANT SELECT ON table_name TO user_name;
```

## Role Membership

The user might not be a member of the role that has the necessary permissions on the table.

If the permissions are granted to a role that the user is supposed to inherit permissions from, ensure the user is correctly assigned to that role:

```sql
GRANT role_name TO user_name;
```

## Schema Permissions

The user might lack usage permissions on the schema that contains the table or the search_path is not set correctly, leading to PostgreSQL not finding the table in the expected schema.

Ensure the user has usage permissions on the schema and the schema is included in their search path:

```sql
GRANT USAGE ON SCHEMA schema_name TO user_name;
```

You can also adjust the `search_path` for the user:

```sql
ALTER USER user_name SET search_path TO schema_name, public;
```

## Security Policies (Row-Level Security)

If Row-Level Security (RLS) is enabled on the table, the user might be blocked from accessing certain rows due to policy restrictions.

You might need to adjust the policies to ensure the user has access to the necessary rows. To manage RLS policies, use the `ALTER TABLE` command to modify or add policies that align with your access requirements.

---

Postgres permission model is more complex than MySQL. To learn the best practice, you can further check [How to Manage Postgres Users and Roles](/blog/how-to-manage-postgres-users-and-roles).