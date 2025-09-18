---
title: 'What is pg_database_owner in Postgres'
author: Adela
updated_at: 2025/09/18 09:00
feature_image: /content/blog/what-is-pg-database-owner/cover.webp
tags: Explanation
description: 'A comprehensive guide to understanding pg_database_owner in Postgres'
---

Postgres 14, released on September 30, 2021, introduced a powerful new predefined role called `pg_database_owner`. This role represents a paradigm shift in how database ownership and privileges are managed, providing a dynamic and secure way to handle permissions for database owners. This comprehensive guide explores what `pg_database_owner` is, why it exists, how it works, and how you can leverage it effectively in your Postgres environment.

## What is pg_database_owner?

The `pg_database_owner` role is a special, predefined **built-in role** in Postgres that automatically represents the owner of the current database. Unlike traditional roles, you don't explicitly grant membership to `pg_database_owner`. Instead, membership is **implicit and context-dependent** — whoever owns the database you are currently connected to is automatically a member of this role.

This dynamic membership is the cornerstone of its utility. It allows you to grant privileges to `pg_database_owner` within a template database, and those privileges will be automatically inherited by the owner of any new database created from that template, eliminating the need for manual privilege management across multiple databases.

## Why pg_database_owner Exists

The introduction of `pg_database_owner` addresses two significant administrative challenges in Postgres:

### 1. Template Database Management
Before `pg_database_owner`, setting up consistent privileges across multiple databases required manual intervention for each new database. With this role, you can grant privileges to `pg_database_owner` in a template database, and every database created from that template automatically gives its owner those privileges — no additional grants needed.

### 2. Cleaner Security Defaults
Starting with Postgres 15, the `public` schema is owned by `pg_database_owner` rather than being publicly accessible. This change makes it easier for each database owner to control public schema privileges safely, reducing security risks associated with the traditional public schema permissions model.

## Key Characteristics and Properties

The `pg_database_owner` role has several unique characteristics that distinguish it from other roles in Postgres:

| Characteristic | Description |
| :--- | :--- |
| **Implicit Membership** | The owner of the current database is automatically a member |
| **Database Scope** | Membership is limited to the current database only |
| **No Initial Privileges** | The role has no privileges by default |
| **Template Inheritance** | Privileges granted in template databases are inherited by new databases |
| **Membership Restrictions** | Cannot be granted to users; cannot have explicit members |
| **Role Isolation** | Cannot be a member of any other role |
| **Public Schema Ownership** | Owns the `public` schema in each database (Postgres 15+) |

### Role Properties Summary
When you examine `pg_database_owner` in the system catalogs, you'll find it has minimal privileges:

- **rolsuper**: false (not a superuser)
- **rolinherit**: true (inherits privileges)
- **rolcreaterole**: false (cannot create roles)
- **rolcreatedb**: false (cannot create databases)
- **rolcanlogin**: false (cannot login directly)
- **rolreplication**: false (not for replication)
- **rolbypassrls**: false (cannot bypass row-level security)

## The Common Error and What It Means

One of the most frequent sources of confusion for users new to `pg_database_owner` is encountering this error:

```sql
GRANT pg_database_owner TO my_user;
ERROR: role "pg_database_owner" cannot have explicit members
```

This error occurs because membership in `pg_database_owner` is **implicit**, not explicit. You cannot and should not try to grant the role to users directly. Instead, you have two options:

1. **Grant privileges TO `pg_database_owner`** (the intended use case)
2. **Change the database owner** if you want a different user to be the effective `pg_database_owner`

## Practical Examples and Use Cases

### Example 1: Template Database Setup for Monitoring Functions

A common use case is providing database owners with access to monitoring functions without granting superuser privileges. Here's how to set this up in a template database:

```sql
-- Connect to the template1 database
\c template1

-- Create a function to view running queries
CREATE FUNCTION get_running_queries() 
RETURNS TABLE (pid int4, query text) AS $$
    SELECT pid, query FROM pg_stat_activity WHERE backend_type = 'client backend';
$$ LANGUAGE sql SECURITY DEFINER;

-- Revoke default public access and grant to the database owner
REVOKE ALL ON FUNCTION get_running_queries() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_running_queries() TO pg_database_owner;
```

Now, when you create a new database, the owner automatically has access to this monitoring function, while other users do not.

### Example 2: Schema-Level Privileges for Database Owners

You can grant comprehensive schema privileges to ensure database owners have full control over application schemas:

```sql
-- Inside a template database or any database where you want this pattern
GRANT USAGE, CREATE ON SCHEMA app TO pg_database_owner;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA app
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO pg_database_owner;

ALTER DEFAULT PRIVILEGES IN SCHEMA app
  GRANT USAGE, SELECT ON SEQUENCES TO pg_database_owner;
```

### Example 3: Transferring Database Ownership

If you need to change who the effective `pg_database_owner` is, you don't grant membership — you transfer ownership:

```sql
-- Transfer database ownership to a new user
ALTER DATABASE mydb OWNER TO new_owner;

-- Optionally, reassign owned objects if needed
REASSIGN OWNED BY old_owner TO new_owner;
```

After this change, `new_owner` automatically becomes the implicit member of `pg_database_owner` for `mydb`.

## Best Practices and Tips

### Do's
- **Use `pg_database_owner` in template databases** to create reusable privilege patterns
- **Grant privileges TO `pg_database_owner`** rather than to specific users when building templates
- **Leverage it for schema ownership** to give database owners appropriate control
- **Use it for application-specific functions** that should be available to database owners

### Don'ts
- **Don't try to grant `pg_database_owner` TO users** — it will fail with an error
- **Don't use it in role hierarchies** — it's not designed to be a group role
- **Don't expect cross-database functionality** — it's scoped to the current database only
- **Don't assume it has inherent privileges** — you must grant them explicitly

## Integration with Postgres 15+ Changes

Postgres 15 enhanced the utility of `pg_database_owner` by making it the default owner of the `public` schema. This change addresses long-standing security concerns about the public schema being accessible to all users by default. With `pg_database_owner` as the owner, each database owner can control access to the public schema according to their specific needs.

## Conclusion

The `pg_database_owner` role represents a thoughtful evolution in Postgres's privilege management system. It elegantly solves the problem of template-based privilege inheritance while providing a cleaner security model for database ownership. By understanding its implicit membership model and leveraging it in template databases, you can create more maintainable and secure Postgres environments.

Whether you're managing a multi-tenant application with many databases or simply want to streamline privilege management across your Postgres infrastructure, `pg_database_owner` offers a powerful tool for achieving consistent and secure database administration.