---
title: 'ERROR 23503: Insert or update on table violates foreign key constraint'
---

## Error Message

```sql
ERROR: insert or update on table "child_table" violates foreign key constraint "fk_constraint_name"
DETAIL: Key (parent_id)=(100) is not present in table "parent_table".
```

## Description

This error occurs when you try to insert or update a row in a table with a foreign key reference, but the referenced value doesn't exist in the parent table. Foreign key constraints ensure referential integrity between tables.

## Causes

- Inserting a row with a foreign key value that doesn't exist in the referenced table
- Updating a foreign key column to a value that doesn't exist in the referenced table
- Missing parent records in data import operations
- Incorrect order of operations when inserting related data

## Solutions

1. **Add the missing reference first**:

   ```sql
   -- First, insert the parent record
   INSERT INTO parent_table (id, name) VALUES (100, 'Parent Name');

   -- Then, insert the child record
   INSERT INTO child_table (id, parent_id) VALUES (1, 100);
   ```

2. **Fix the foreign key value**:

   ```sql
   -- Use a value that exists in the parent table
   INSERT INTO child_table (id, parent_id)
   VALUES (1, (SELECT id FROM parent_table LIMIT 1));
   ```

3. **For bulk operations**:

   - Temporarily disable foreign key constraints (use with caution):

   ```sql
   SET session_replication_role = 'replica';
   -- Perform your inserts/updates
   SET session_replication_role = 'origin';
   ```

4. **Use deferred constraints** (must be defined as DEFERRABLE):
   ```sql
   BEGIN;
   SET CONSTRAINTS ALL DEFERRED;
   -- Insert operations in any order
   COMMIT;
   ```

## Prevention

- Ensure parent records exist before creating child records
- Use appropriate cascade options when defining foreign keys
- Validate data before attempting inserts or updates
- Consider using application-level validation for complex relationships

<HintBlock type="info">

The error message includes details about which foreign key constraint was violated and what value caused the problem, making it easier to troubleshoot.

</HintBlock>
