---
title: Must be owner of table in Postgres
---


The `Must be owner of table` error in PostgreSQL occurs when a user attempts to perform an operation that requires ownership privileges on a table, such as altering the table's structure, dropping the table, or changing ownership. This error indicates that the user executing the command does not have sufficient rights on the table to carry out the operation.

You are more likely to run into this issue if you use a 3rd-party service to create the tables on behalf of you. Because the 3rd-party service will use its own database user to create the table, and the created table owner will be that database user.

Here are the common causes and suggested fixes for this issue:


## Performing Ownership-Required Operations

Operations like `ALTER TABLE`, `DROP TABLE`, or `REINDEX TABLE` require the user to be the owner of the table or a superuser in PostgreSQL.

If it's appropriate for the user to own the table, an existing superuser or the current owner can change the table's ownership to the user. This can be done using the `ALTER TABLE` command:

```sql
ALTER TABLE table_name OWNER TO new_owner;
```

## Lack of Superuser Privileges

Even if a user has been granted all privileges on a table, certain operations still require superuser status or ownership of the table because these operations can affect the table's fundamental structure or behavior.

For operations that necessarily require superuser privileges, perform the operation using a superuser account. This approach should be used cautiously, as superuser accounts have unrestricted access to the database system.

Also note, cloud database providers only provide semi-superuser privileges. You can't perform certain operations at all.

If changing ownership or using a superuser account is not feasible, you can also manage access through roles. A superuser can grant the role that owns the table to the user needing to perform the operation:

```sql
GRANT role_name TO user_name;
```

## Use `EVENT TRIGGER` to Change Ownership after Table Creation

In scenarios where tables are frequently created and ownership needs to be managed dynamically, consider using event triggers to automatically change ownership of newly created tables to a specific role or user


You can also use `EVENT TRIGGER` to automate the ownership changes.

```sql
CREATE OR REPLACE FUNCTION fn_change_table_ownership()
RETURNS event_trigger
LANGUAGE plpgsql
AS $$
DECLARE
    obj record;
BEGIN
    FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands() WHERE command_tag = 'CREATE TABLE'
    LOOP
        -- Change the ownership of the table. Replace 'new_owner' with the desired role or user.
        EXECUTE 'ALTER TABLE ' || obj.schema_name || '.' || obj.object_name || ' OWNER TO new_owner';
    END LOOP;
END;
$$;
```

After creating the function, the next step is to create an event trigger that fires on `CREATE TABLE` events.
This trigger will call the function you just created.

```sql
CREATE EVENT TRIGGER trg_change_table_ownership
ON ddl_command_end
WHEN TAG IN ('CREATE TABLE')
EXECUTE FUNCTION fn_change_table_ownership();
```

This trigger activates after any `CREATE TABLE` operation completes and calls the fn_change_table_ownership() function to change the ownership of the newly created table(s).

---

Postgres permission model is more complex than MySQL. To learn the best practice, you can further check [How to Manage Postgres Users and Roles](/blog/how-to-manage-postgres-users-and-roles).