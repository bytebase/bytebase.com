---
title: 'ERROR 1217 (23000): Cannot delete or update a parent row'
---

## Error Message

```sql
ERROR 1217 (23000): Cannot delete or update a parent row: a foreign key constraint fails (`database`.`child_table`, CONSTRAINT `fk_constraint_name` FOREIGN KEY (`child_column`) REFERENCES `parent_table` (`parent_column`))
```

## Description

This error occurs when you attempt to delete or update a row in a parent table that has referenced rows in a child table. MySQL enforces referential integrity through foreign key constraints, preventing operations that would leave "orphaned" child records.

## Causes

- Attempting to delete a parent record that has related child records
- Modifying the primary key of a parent record that's referenced by child records
- Foreign key constraint lacks appropriate ON DELETE action
- Foreign key constraint lacks appropriate ON UPDATE action
- Application not handling parent-child relationships properly
- Import/export processes not respecting referential integrity
- Overly restrictive foreign key configuration

## Solutions

1. **Delete child records first**:

   ```sql
   -- First, delete the child records
   DELETE FROM order_items WHERE order_id = 1001;

   -- Then delete the parent record
   DELETE FROM orders WHERE id = 1001;
   ```

2. **Modify foreign key constraint to use CASCADE**:

   ```sql
   -- Drop the existing foreign key constraint
   ALTER TABLE child_table DROP FOREIGN KEY fk_constraint_name;

   -- Recreate with CASCADE options
   ALTER TABLE child_table
   ADD CONSTRAINT fk_constraint_name
   FOREIGN KEY (child_column) REFERENCES parent_table(parent_column)
   ON DELETE CASCADE
   ON UPDATE CASCADE;
   ```

3. **Use SET NULL for optional relationships**:

   ```sql
   -- First, ensure the child column allows NULL
   ALTER TABLE child_table MODIFY COLUMN child_column INT NULL;

   -- Drop the existing foreign key constraint
   ALTER TABLE child_table DROP FOREIGN KEY fk_constraint_name;

   -- Recreate with SET NULL option
   ALTER TABLE child_table
   ADD CONSTRAINT fk_constraint_name
   FOREIGN KEY (child_column) REFERENCES parent_table(parent_column)
   ON DELETE SET NULL
   ON UPDATE SET NULL;
   ```

4. **Use transaction to handle related records**:

   ```sql
   START TRANSACTION;

   -- Delete child records
   DELETE FROM order_items WHERE order_id = 1001;
   DELETE FROM order_shipping WHERE order_id = 1001;
   DELETE FROM order_payments WHERE order_id = 1001;

   -- Delete parent record
   DELETE FROM orders WHERE id = 1001;

   COMMIT;
   ```

## Prevention

1. **Design appropriate foreign key constraints** during schema creation:

   ```sql
   CREATE TABLE child_table (
       id INT PRIMARY KEY,
       parent_id INT,
       FOREIGN KEY (parent_id) REFERENCES parent_table(id)
       ON DELETE CASCADE
       ON UPDATE CASCADE
   );
   ```

2. **Use soft deletes** instead of hard deletes:

   ```sql
   -- Add a 'deleted' column to parent table
   ALTER TABLE parent_table ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

   -- Instead of deleting, mark as deleted
   UPDATE parent_table SET is_deleted = TRUE WHERE id = 1001;
   ```

3. **Document entity relationships** and cascade behaviors for developers

4. **Test deletion operations** on sample data before running in production
