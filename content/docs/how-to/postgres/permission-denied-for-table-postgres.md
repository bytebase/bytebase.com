---
title: How to fix Permission denied for table in Postgres
updated_at: 2025/02/27 09:00:00
---

In PostgreSQL, the `Permission denied for table` or `Permission denied for relation` error usually occurs when a user attempts to perform an operation on a table without the necessary privileges. This error can surface during various operations such as `SELECT`, `INSERT`, `UPDATE`, `DELETE`, or even when trying to access table data through a JOIN operation. Common permission denied errors are:

```bash
ERROR:  permission denied for table mytable
ERROR:  permission denied for relation users
ERROR:  permission denied for schema public
```

Here are the common causes and suggestions for fixing this issue in PostgreSQL

## Schema/Table Reference

Ensure the operation is being performed on the correct schema and table, as PostgreSQL can have tables with the same name in different schemas.

## Check Current Permissions

```sql
-- For tables
SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'mytable';

-- For schemas
SELECT * FROM information_schema.role_usage_grants
WHERE object_name = 'myschema';

-- List all roles and their memberships
SELECT r.rolname, r.rolsuper, r.rolinherit,
       r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,
       ARRAY(SELECT b.rolname
             FROM pg_catalog.pg_auth_members m
             JOIN pg_catalog.pg_roles b ON (m.roleid = b.oid)
             WHERE m.member = r.oid) as memberof
FROM pg_catalog.pg_roles r
ORDER BY 1;
```

## Insufficient Privileges

The user does not have the required permissions on the table to perform the operation. PostgreSQL requires explicit permission grants for different operations on database objects.

You need to determine which operation the user is attempting to perform and grant the appropriate permissions. For example, to grant `SELECT` permission, you would use:

```sql
GRANT SELECT ON table_name TO user_name;
```

## Schema Permissions

PostgreSQL's permission model requires granting permissions through the ownership chain. The user might lack usage permissions on the schema that contains the table or the `search_path` is not set correctly, leading to PostgreSQL not finding the table in the expected schema.

Ensure the user has usage permissions on the schema and the schema is included in their search path:

```sql
GRANT USAGE ON SCHEMA schema_name TO user_name;
```

You can also adjust the `search_path` for the user:

```sql
ALTER USER user_name SET search_path TO schema_name, public;
```

## Database Permissions

Sometimes the issue is at the database level:

```sql
-- Grant connect permission to database
GRANT CONNECT ON DATABASE mydatabase TO username;

-- Grant create permission in database
GRANT CREATE ON DATABASE mydatabase TO username;
```

## Change Object Ownership

If appropriate, change the owner of the object:

```sql
-- Change table owner
ALTER TABLE mytable OWNER TO newowner;

-- Change schema owner
ALTER SCHEMA myschema OWNER TO newowner;
```

## Fix Superuser / Role Attribute Issues

<HintBlock type="info">

Cloud database providers forbid users to be superuser. You need to check with your cloud provider about the respective
permissions for their semi-superuser accounts.

</HintBlock>

Some operations require superuser privileges or specific role attributes:

```sql
-- Make a user superuser (use with caution)
ALTER USER username WITH SUPERUSER;

-- Grant createdb privilege
ALTER USER username WITH CREATEDB;

-- Grant createrole privilege
ALTER USER username WITH CREATEROLE;
```

## Role Membership

The user might not be a member of the role that has the necessary permissions on the table.

If the permissions are granted to a role that the user is supposed to inherit permissions from, ensure the user is correctly assigned to that role:

```sql
GRANT role_name TO user_name;
```

## Permission Issues after Restoring a Database

After pg_restore or similar operations, permissions might need to be reapplied:

```sql
-- Script to reassign ownership based on original database
-- (Run as superuser)
REASSIGN OWNED BY original_owner TO new_owner;
```

## Security Policies (Row-Level Security)

If Row-Level Security (RLS) is enabled on the table, the user might be blocked from accessing certain rows due to policy restrictions.

You might need to adjust the policies to ensure the user has access to the necessary rows. To manage RLS policies, use the `ALTER TABLE` command to modify or add policies that align with your access requirements.

---

Postgres permission model is more complex than MySQL. To learn the best practice, you can further check [How to Manage Postgres Users and Roles](/blog/how-to-manage-postgres-users-and-roles).
