---
title: 'What is pg_database_owner in Postgres'
author: Adela
updated_at: 2025/09/18 09:00
feature_image: /content/blog/what-is-pg-database-owner/cover.webp
tags: Explanation
description: 'A comprehensive guide to understanding pg_database_owner in Postgres'
---

PostgreSQL 14 (released September 30, 2021) introduced a powerful predefined role: **`pg_database_owner`**. This role changes how database ownership and privileges are managed by providing a dynamic way to handle permissions for database owners.

## What is `pg_database_owner`?

`pg_database_owner` is a **built-in role** that automatically maps to the **owner of the current database**.

* You don’t grant it to users.
* Membership is **implicit and context-dependent** — whoever owns the database is the “member.”

This allows privileges granted to `pg_database_owner` in template databases to carry over automatically when new databases are created from them.

## Why it Exists

Two main problems it solves:

1. **Template Database Privileges**
   Before, ensuring consistent privileges across databases required manual grants. Now, you can grant to `pg_database_owner` in a template, and new DBs automatically apply them.

2. **Safer Defaults**
   Starting in PostgreSQL 15, the `public` schema is owned by `pg_database_owner`. This gives each DB owner direct control over schema access, fixing the long-standing risk of overly permissive defaults.

## Key Characteristics

| Property                           | Description                                    |
| ---------------------------------- | ---------------------------------------------- |
| **Implicit membership**            | Always maps to the database owner              |
| **Database scope**                 | Valid only in the current database             |
| **No login**                       | Cannot log in directly                         |
| **No explicit members**            | You cannot `GRANT ... TO pg_database_owner`    |
| **Template inheritance**           | Privileges granted in a template DB carry over |
| **Isolation**                      | Cannot be part of role hierarchies             |
| **Public schema ownership (v15+)** | Owns the `public` schema                       |

## Common Error

Trying to grant it explicitly produces an error:

```sql
GRANT pg_database_owner TO my_user;
ERROR: role "pg_database_owner" cannot have explicit members
```

✅ Correct usage:

* Grant privileges *to* `pg_database_owner`
* Or transfer DB ownership if you want a new effective owner

```sql
ALTER DATABASE mydb OWNER TO new_owner;
```

## Practical Examples

**Schema Privileges**

```sql
GRANT USAGE, CREATE ON SCHEMA app TO pg_database_owner;
ALTER DEFAULT PRIVILEGES IN SCHEMA app
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO pg_database_owner;
```

**Template Setup**
Grant monitoring or utility functions to `pg_database_owner` in a template DB so every new database owner gets access automatically.

## Best Practices

**Do:**

* Use it in template DBs for consistent privileges
* Grant privileges *to it*, not users
* Leverage it for schema or function access

**Don’t:**

* Try to grant it to users (will fail)
* Expect cross-database scope
* Assume it has privileges by default

## Conclusion

`pg_database_owner` is a small but important change: it gives PostgreSQL a clean, dynamic way to handle database ownership and privilege inheritance. Whether you’re building multi-tenant apps or just want safer defaults, it simplifies privilege management and improves security.