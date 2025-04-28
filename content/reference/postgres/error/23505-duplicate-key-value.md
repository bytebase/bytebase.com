---
title: 'ERROR 23505: Duplicate key value violates unique constraint'
---

## Error Message

```sql
ERROR: duplicate key value violates unique constraint "table_pkey"
DETAIL: Key (id)=(1) already exists.
```

## Description

This error occurs when you attempt to insert or update a record with a value that already exists in a column with a unique constraint. The unique constraint could be a primary key, unique index, or an explicitly defined unique constraint.

## Causes

- Inserting a new row with a primary key or unique key value that already exists
- Updating a row to have a value that conflicts with an existing row
- Bulk imports where data contains duplicate values for unique columns
- Using a sequence that was reset to generate primary keys for new rows

## Solutions

1. **For INSERT operations**:

   - Use `INSERT ... ON CONFLICT` to handle duplicate entries gracefully:

   ```sql
   INSERT INTO users (id, name)
   VALUES (1, 'Alice')
   ON CONFLICT (id) DO NOTHING;

   -- Or update the existing row:
   INSERT INTO users (id, name)
   VALUES (1, 'Alice')
   ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
   ```

2. **For application code**:

   - Check for existence before inserting:

   ```sql
   SELECT EXISTS(SELECT 1 FROM users WHERE id = 1);
   ```

3. **For migrating data**:

   - Remove duplicates from the source data before import
   - Use a temporary table to identify and handle duplicates

4. **For batch operations**:
   - Use a unique temporary identifier if you need to temporarily violate constraints

## Prevention

- Use database-generated values (like serial or identity columns) for primary keys
- Add validation in your application layer
- Use transactions to verify data before committing changes
- Consider using natural keys only when uniqueness is guaranteed

<HintBlock type="info">

The exact constraint name in the error message (e.g., "table_pkey") can help you identify which table and column has the conflict.

</HintBlock>
