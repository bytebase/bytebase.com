---
title: 'How to fix relation already exists in Postgres - ERROR [42P07]'
---

| Code    | Name              | Class                                            |
| ------- | ----------------- | ------------------------------------------------ |
| `42P07` | `duplicate_table` | Syntax Error or Access Rule Violation (Class 42) |

## Overview

The `SQLSTATE[42P07]` error in PostgreSQL occurs when attempting to create a database object (like a table, view, sequence, or index) that already exists in the database. The full error message typically appears as:

```bash
ERROR:  relation "table_name" already exists
SQLSTATE[42P07]: Duplicate table: 7 ERROR:  relation "table_name" already exists
```

This guide will help you understand the causes of this error and provide solutions to resolve it.

## Common Causes

1. **Attempting to create a table that already exists**
   - Running a `CREATE TABLE` statement for a table that's already in the database
2. **Migration or schema issues**
   - Running migrations multiple times
   - Failed to roll back previous migration attempts
3. **Concurrent operations**
   - Multiple processes trying to create the same relation simultaneously
4. **Case sensitivity confusion**

   - PostgreSQL treats "users" and "Users" as the same table name by default (unless quoted)

5. **Object exists in another schema**
   - An object with the same name exists in the search path, but possibly in a different schema

## Diagnostic Steps

### 1. Verify if the relation exists

```sql
-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name = 'your_table_name'
);

-- List all tables in the database
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_schema NOT IN ('pg_catalog', 'information_schema');

-- Check for specific table
\dt your_table_name
```

### 2. Check object ownership and schema

```sql
-- Find all tables with a specific name (across all schemas)
SELECT n.nspname AS schema_name, c.relname AS table_name
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname = 'your_table_name' AND c.relkind = 'r';
```

## Solutions

### 1. Use "IF NOT EXISTS" clause

Add the `IF NOT EXISTS` clause to your `CREATE` statements to prevent the error:

```sql
CREATE TABLE IF NOT EXISTS your_table_name (
    id SERIAL PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Drop the existing relation first

If appropriate, drop the existing table before creating it:

```sql
DROP TABLE IF EXISTS your_table_name;
CREATE TABLE your_table_name (
    id SERIAL PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. For migrations/frameworks

#### a. Reset your migrations (if in development)

```bash
# Example for frameworks like Laravel
php artisan migrate:fresh

# Django
python manage.py migrate your_app zero
python manage.py migrate your_app
```

#### b. Fix migration files

Review your migration files and ensure they use idempotent approaches:

- Use `IF NOT EXISTS` clauses
- Add conditions to check for existence
- Ensure proper up/down migration functions

### 4. Rename your new relation

If you need both relations, consider renaming the new one:

```sql
CREATE TABLE your_table_name_new (
    id SERIAL PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Qualify with schema name

Be explicit about which schema to use:

```sql
CREATE TABLE my_schema.your_table_name (
    id SERIAL PRIMARY KEY,
    name TEXT
);
```

### 6. For frameworks and ORMs

#### Laravel/PHP

```php
// Use Blueprint with timestamps
Schema::create('your_table_name', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

// Check if table exists first
if (!Schema::hasTable('your_table_name')) {
    Schema::create('your_table_name', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->timestamps();
    });
}
```

#### Django/Python

```python
# In your models.py, use migrations system
class YourModel(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
```

#### Node.js/Knex

```javascript
// Use Knex migrations with hasTable check
exports.up = function (knex) {
  return knex.schema.hasTable('your_table_name').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('your_table_name', function (table) {
        table.increments('id');
        table.string('name');
        table.timestamps(true, true);
      });
    }
  });
};
```

## Prevention Best Practices

1. **Always use idempotent operations**

   - Add `IF NOT EXISTS` to CREATE statements
   - Add `IF EXISTS` to DROP statements

2. **Implement proper migration patterns**

   - Use version control for your migrations
   - Have proper up/down methods in migrations
   - Test migrations thoroughly before production

3. **Use schema version tracking**

   - Maintain a version table for your schema
   - Check versions before applying changes

4. **Consider naming conventions**

   - Use consistent casing (typically lowercase for PostgreSQL objects)
   - Use prefixes for different application modules

5. **Transaction management**
   - Wrap related DDL statements in transactions
   - Use savepoints for complex operations

## Special Considerations

### Working with temporary tables

Temporary tables exist only in your current session but can still cause this error:

```sql
-- Better approach for temp tables
DROP TABLE IF EXISTS temp_analysis;
CREATE TEMPORARY TABLE temp_analysis AS
SELECT * FROM main_table WHERE condition;
```

### Views and indexes also cause this error

Remember that this error applies to all relations, not just tables:

```sql
-- For views
CREATE OR REPLACE VIEW my_view AS
SELECT * FROM my_table;

-- For indexes
DROP INDEX IF EXISTS my_index;
CREATE INDEX my_index ON my_table(column_name);
```

## Troubleshooting in Multi-tenant Applications

In multi-tenant applications using schemas for isolation:

```sql
-- Check all schemas for this relation
SELECT n.nspname AS schema_name
FROM pg_namespace n
JOIN pg_class c ON c.relnamespace = n.oid
WHERE c.relname = 'your_table_name';

-- Create in specific tenant schema
CREATE TABLE tenant_123.your_table_name (...);
```

## When Nothing Else Works

If you've tried everything and still face issues:

1. Check for database triggers that might be interfering
2. Verify PostgreSQL user permissions
3. Check for any database extension conflicts
4. Consult your database logs for more detailed errors:
   ```bash
   tail -f /var/log/postgresql/postgresql-[version]-main.log
   ```

---

**Remember**: This error is generally harmless but indicates a potential logic issue in your application or migration process. Taking time to properly handle object creation can save troubleshooting time later.
