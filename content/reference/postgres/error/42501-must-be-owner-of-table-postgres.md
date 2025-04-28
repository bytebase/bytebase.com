---
title: 'ERROR 42501: Must be owner of table in Postgres'
---

| Code    | Name                     | Class                                            |
| ------- | ------------------------ | ------------------------------------------------ |
| `42501` | `insufficient_privilege` | Syntax Error or Access Rule Violation (Class 42) |

## Error Message

```sql
ERROR: must be owner of table mytable
```

## Description

This error occurs when a user attempts to perform an operation that requires ownership privileges on a table, such as altering the table structure, dropping the table, or changing ownership.

## Causes

- User is not the owner of the table
- Tables created by different users (e.g., admin, migration tools)
- Ownership issues after database restoration or cloning
- Role membership changes

## Solutions

### 1. Check current ownership

```sql
-- Check table ownership
SELECT tablename, tableowner
FROM pg_tables
WHERE tablename = 'mytable';
```

### 2. Switch to the owner role

```sql
-- If you have permission to switch roles
SET ROLE owner_username;

-- After operations, switch back
RESET ROLE;
```

### 3. Transfer ownership

```sql
-- Must be executed by superuser or current owner
ALTER TABLE table_name OWNER TO new_owner;
```

### 4. Bulk change ownership

```sql
-- Transfer all objects owned by old_owner to new_owner
REASSIGN OWNED BY old_owner TO new_owner;
```

### 5. Use EVENT TRIGGER for automation

```sql
-- Create function to automatically change ownership of new tables
CREATE OR REPLACE FUNCTION fn_change_table_ownership()
RETURNS event_trigger LANGUAGE plpgsql AS $$
DECLARE obj record;
BEGIN
    FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands()
               WHERE command_tag = 'CREATE TABLE'
    LOOP
        EXECUTE 'ALTER TABLE ' || obj.schema_name || '.' ||
                obj.object_name || ' OWNER TO new_owner';
    END LOOP;
END; $$;

-- Create trigger
CREATE EVENT TRIGGER trg_change_table_ownership
ON ddl_command_end WHEN TAG IN ('CREATE TABLE')
EXECUTE FUNCTION fn_change_table_ownership();
```

<HintBlock type="info">

Cloud database providers typically don't allow superuser privileges. Check with your provider about their specific permission model.

For more details on Postgres permission management, see [How to Manage Postgres Users and Roles](/blog/how-to-manage-postgres-users-and-roles).

</HintBlock>
