---
title: 'ERROR 42P07: Relation already exists in Postgres'
---

| Code    | Name              | Class                                            |
| ------- | ----------------- | ------------------------------------------------ |
| `42P07` | `duplicate_table` | Syntax Error or Access Rule Violation (Class 42) |

## Error Message

```sql
ERROR: relation "users" already exists
```

## Description

This error occurs when attempting to create a database object (table, view, sequence, or index) that already exists in the database.

## Causes

- Attempting to create a table that already exists
- Running migrations multiple times
- Failed rollbacks of previous migrations
- Case sensitivity confusion (PostgreSQL treats "users" and "Users" as the same by default)
- Object exists in another schema within the search path

## Solutions

### 1. Use IF NOT EXISTS clause

```sql
CREATE TABLE IF NOT EXISTS your_table_name (
    id SERIAL PRIMARY KEY,
    name TEXT
);
```

### 2. Drop the existing relation first

```sql
DROP TABLE IF EXISTS your_table_name;
CREATE TABLE your_table_name (
    id SERIAL PRIMARY KEY,
    name TEXT
);
```

### 3. Check if the relation exists

```sql
-- Verify if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name = 'your_table_name'
);

-- Find all tables with this name across schemas
SELECT n.nspname AS schema_name, c.relname AS table_name
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname = 'your_table_name' AND c.relkind = 'r';
```

### 4. Use schema qualification

```sql
CREATE TABLE my_schema.your_table_name (
    id SERIAL PRIMARY KEY,
    name TEXT
);
```

## Prevention Best Practices

1. Always use idempotent operations with `IF NOT EXISTS` and `IF EXISTS` clauses
2. Implement proper migration patterns with version control
3. Use schema version tracking
4. Follow consistent naming conventions
5. Wrap related DDL statements in transactions

<HintBlock type="info">

This error applies to all relations (tables, views, indexes), not just tables. The same prevention techniques apply to all these objects.

</HintBlock>
