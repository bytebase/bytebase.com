---
title: 'ERROR 1215 (HY000): Cannot add foreign key constraint'
---

## Error Message

```sql
ERROR 1215 (HY000): Cannot add foreign key constraint
```

## Description

This error occurs when you attempt to create a foreign key constraint, but MySQL cannot establish the relationship due to inconsistencies between the referenced and referencing columns or tables.

## Causes

- Data types of the foreign key and referenced columns don't match exactly
- Different character sets or collations between related columns
- The referenced column must have an index (primary key or unique)
- The referenced table or column doesn't exist
- The foreign key allows NULL but the referenced column doesn't
- Tables using different storage engines (e.g., MyISAM doesn't support foreign keys)
- Columns have the same data type but different lengths
- Current data would violate the constraint if added

## Solutions

1. **Match data types exactly**:

   ```sql
   -- Check column definitions
   DESCRIBE parent_table;
   DESCRIBE child_table;

   -- Modify child column to match parent column exactly
   ALTER TABLE child_table MODIFY COLUMN child_id INT UNSIGNED NOT NULL;
   ```

2. **Create or fix required indexes**:

   ```sql
   -- Check existing indexes
   SHOW INDEX FROM parent_table;

   -- Add missing index if needed (primary key is best)
   ALTER TABLE parent_table ADD PRIMARY KEY (parent_id);
   -- OR add a unique index
   ALTER TABLE parent_table ADD UNIQUE INDEX (parent_id);
   ```

3. **Check and fix engine types**:

   ```sql
   -- Check table engines
   SHOW TABLE STATUS WHERE Name IN ('parent_table', 'child_table');

   -- Convert to InnoDB if needed
   ALTER TABLE parent_table ENGINE = InnoDB;
   ALTER TABLE child_table ENGINE = InnoDB;
   ```

4. **Match character sets and collations**:

   ```sql
   -- Check character sets and collations
   SELECT TABLE_NAME, COLUMN_NAME, CHARACTER_SET_NAME, COLLATION_NAME
   FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = 'your_database'
   AND (TABLE_NAME = 'parent_table' OR TABLE_NAME = 'child_table')
   AND (COLUMN_NAME = 'parent_id' OR COLUMN_NAME = 'child_foreign_key');

   -- Fix mismatched character set/collation
   ALTER TABLE child_table
   MODIFY COLUMN child_foreign_key VARCHAR(50)
   CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

## Prevention

1. **Design tables with foreign keys in mind**:

   - Use consistent data types
   - Always include primary keys or unique indexes
   - Use the same character set and collation

2. **Check for existing data violations** before adding constraints:

   ```sql
   -- Find orphaned records
   SELECT c.id, c.child_foreign_key
   FROM child_table c
   LEFT JOIN parent_table p ON c.child_foreign_key = p.parent_id
   WHERE p.parent_id IS NULL AND c.child_foreign_key IS NOT NULL;
   ```

3. **Use consistent naming conventions** for primary and foreign keys

4. **Always use InnoDB** engine for tables that need foreign key constraints
