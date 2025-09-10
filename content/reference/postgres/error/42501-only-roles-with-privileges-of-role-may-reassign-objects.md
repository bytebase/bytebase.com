---
title: 'ERROR 42501: Permission denied to reassign objects in Postgres'
---

## Error Message

```sql
ERROR: permission denied to reassign objects
DETAIL: Only roles with privileges of role "source_role" may reassign objects owned by it.
```

## Description

This error occurs when attempting to use `REASSIGN OWNED BY` to transfer ownership of database objects from one role to another without having the necessary privileges. The operation requires membership in both the source role (current owner) and target role (new owner).

## Causes

- Current user lacks membership in the source role whose objects are being reassigned
- Current user lacks membership in the target role receiving ownership
- Attempting to reassign objects from a superuser role without being a superuser
- Missing inherited privileges from parent roles
- Attempting cleanup before dropping a role without proper permissions

## Solutions

1. **Grant role membership for both roles**:

   ```sql
   -- As a superuser, grant both role memberships
   GRANT source_role TO your_current_role;
   GRANT target_role TO your_current_role;

   -- Now reassign ownership
   REASSIGN OWNED BY source_role TO target_role;
   ```

2. **Execute as superuser**:

   ```sql
   -- Connect as postgres or another superuser
   \c database_name postgres

   REASSIGN OWNED BY old_role TO new_role;
   DROP OWNED BY old_role;  -- Drop remaining privileges
   DROP ROLE old_role;      -- Now safe to drop role
   ```

3. **Check current role memberships**:

   ```sql
   -- View your role memberships
   SELECT r.rolname AS role_name,
          r1.rolname AS member_of
   FROM pg_roles r
   JOIN pg_auth_members m ON r.oid = m.member
   JOIN pg_roles r1 ON m.roleid = r1.oid
   WHERE r.rolname = current_user;
   ```

4. **Use SET ROLE if you have indirect membership**:

   ```sql
   -- If you have the role through inheritance
   SET ROLE source_role;
   REASSIGN OWNED BY source_role TO target_role;
   RESET ROLE;
   ```

<HintBlock type="info">

Cloud database providers typically don't allow superuser privileges. Check with your provider about their specific permission model.

For more details on Postgres permission management, see [How to Manage Postgres Users and Roles](/blog/how-to-manage-postgres-users-and-roles).

</HintBlock>
