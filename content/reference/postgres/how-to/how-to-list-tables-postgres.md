---
title: How to list tables in PostgreSQL
updated_at: 2025/05/07 14:00:00
---

_Official documentation: [The Information Schema](https://www.postgresql.org/docs/current/information-schema.html), [System Catalogs](https://www.postgresql.org/docs/current/catalogs.html)_

## Basic Approaches

PostgreSQL offers multiple ways to list tables:

1. Using `psql` meta-commands
2. Querying `information_schema.tables`
3. Querying `pg_catalog.pg_tables`

Each approach has advantages depending on your use case.

## Using psql Meta-Commands

### List Tables with \dt

```sql
-- List tables in current schema
\dt

-- List tables in a specific schema
\dt schema_name.*

-- List tables matching a pattern
\dt *users*

-- List tables with additional details (size, description)
\dt+
```

### List All Tables in All Schemas

```sql
-- List all tables in all schemas
\dt *.*

-- Include system tables
\dt *.*.*
```

## Querying Information Schema

The `information_schema` is a standardized way to access metadata across different database systems.

```sql
-- List all tables in current schema
SELECT table_name
FROM information_schema.tables
WHERE table_schema = current_schema()
AND table_type = 'BASE TABLE';

-- List all tables in all schemas
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
ORDER BY table_schema, table_name;

-- List tables with column information
SELECT t.table_schema, t.table_name, c.column_name, c.data_type
FROM information_schema.tables t
JOIN information_schema.columns c
  ON t.table_schema = c.table_schema
  AND t.table_name = c.table_name
WHERE t.table_schema = 'public'
AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name, c.ordinal_position;
```

### Filtering Tables

```sql
-- Find tables with specific naming patterns
SELECT table_name
FROM information_schema.tables
WHERE table_name LIKE '%user%'
AND table_schema = 'public'
AND table_type = 'BASE TABLE';

-- Find tables created after a specific date
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
ORDER BY table_schema, table_name;
```

## Querying pg_catalog

The `pg_catalog` schema contains PostgreSQL system tables with more PostgreSQL-specific details.

```sql
-- List all user tables
SELECT schemaname, tablename
FROM pg_catalog.pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY schemaname, tablename;

-- List tables with their sizes
SELECT
    n.nspname AS schema_name,
    c.relname AS table_name,
    pg_size_pretty(pg_total_relation_size(c.oid)) AS total_size
FROM pg_class c
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE c.relkind = 'r'
AND n.nspname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(c.oid) DESC;
```

## List Tables with Additional Information

### Tables with Row Counts

```sql
-- Approximate row counts (fast)
SELECT
    schemaname,
    relname AS table_name,
    n_live_tup AS row_count
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;

-- Exact row counts (slow for large tables)
SELECT
    schemaname AS schema_name,
    relname AS table_name,
    (SELECT count(*) FROM pg_catalog.pg_class c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
     WHERE c.relname = relname AND n.nspname = schemaname) AS row_count
FROM pg_stat_user_tables
ORDER BY schemaname, relname;
```

### Tables with Last Activity

```sql
SELECT
    schemaname AS schema_name,
    relname AS table_name,
    last_vacuum,
    last_autovacuum,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables
ORDER BY relname;
```

### Tables with Indexes

```sql
-- List tables and their indexes
SELECT
    t.schemaname AS table_schema,
    t.relname AS table_name,
    i.relname AS index_name,
    a.attname AS column_name
FROM pg_stat_user_tables t
JOIN pg_index ix ON t.relid = ix.indrelid
JOIN pg_class i ON ix.indexrelid = i.oid
JOIN pg_attribute a ON t.relid = a.attrelid AND a.attnum = ANY(ix.indkey)
ORDER BY t.relname, i.relname, a.attnum;
```

## Programmatic Access

### Using PL/pgSQL

```sql
-- Function to show tables with row counts
CREATE OR REPLACE FUNCTION show_tables_with_counts()
RETURNS TABLE (
    schema_name text,
    table_name text,
    row_count bigint
) AS $$
BEGIN
    FOR schema_name, table_name IN
        SELECT schemaname, tablename FROM pg_tables
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
    LOOP
        RETURN QUERY EXECUTE format(
            'SELECT %L::text, %L::text, count(*)::bigint FROM %I.%I',
            schema_name, table_name, schema_name, table_name
        );
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Usage:
-- SELECT * FROM show_tables_with_counts();
```

## Common Errors and Solutions

### "permission denied for table pg_tables"

This occurs when a non-privileged user tries to query system catalogs directly.

**Solution**: Use `information_schema` views which have more permissive access controls.

```sql
-- Use this instead of pg_tables
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_schema NOT IN ('pg_catalog', 'information_schema');
```

### "relation does not exist"

Make sure you're connected to the correct database and have proper search_path settings.

```sql
-- Check current database
SELECT current_database();

-- Check search path
SHOW search_path;

-- Set search path
SET search_path TO my_schema, public;
```

## Best Practices

1. **Use `\dt` for quick checks** in psql interactive sessions.

2. **Query `information_schema` for better portability** across different SQL databases.

3. **Use `pg_catalog` for PostgreSQL-specific information** like table sizes and row counts.

4. **Create custom functions** for frequently used table information queries.

5. **Include schema qualifiers** when working with multiple schemas to avoid ambiguity.

6. **Understand approximate vs. exact counts** - statistics-based counts are faster but approximate.

7. **Filter out system schemas** (`pg_catalog`, `information_schema`) when looking for user tables.

## References

- [PostgreSQL Documentation: psql](https://www.postgresql.org/docs/current/app-psql.html)
- [PostgreSQL Documentation: Information Schema](https://www.postgresql.org/docs/current/information-schema.html)
- [PostgreSQL Documentation: System Catalogs](https://www.postgresql.org/docs/current/catalogs.html)
- [PostgreSQL Documentation: pg_stat_user_tables](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-USER-TABLES-VIEW)
