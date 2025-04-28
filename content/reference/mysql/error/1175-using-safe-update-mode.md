---
title: 'ERROR 1175: You are using safe update mode'
---

## Error Message

```sql
Error 1175: You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column
```

Or:

```sql
Error 1175: You are using safe update mode and you tried to update a table with a LIMIT clause but without a WHERE clause
```

## Description

This error occurs when you attempt to execute an UPDATE or DELETE statement without specifying conditions that use a key column in the WHERE clause, or when using LIMIT without a WHERE clause, while MySQL is running in safe update mode.

## Causes

- Missing WHERE clause in UPDATE or DELETE statements
- Using a WHERE clause with columns that aren't keys
- MySQL session has safe update mode activated (`SQL_SAFE_UPDATES = 1`)
- MySQL Workbench has safe update mode enabled by default
- Trying to limit updates/deletes without specifying which rows
- Table lacks a primary key altogether

## Solutions

1. **Disable safe update mode for current session**:

   ```sql
   -- Disable safe update mode
   SET SQL_SAFE_UPDATES = 0;

   -- Run your update or delete statement
   UPDATE table_name SET column1 = value1;

   -- Optionally, re-enable safe update mode
   SET SQL_SAFE_UPDATES = 1;
   ```

2. **Use key columns in WHERE clause**:

   ```sql
   -- Before: Unsafe
   UPDATE customers SET status = 'inactive';

   -- After: Safe, using primary key
   UPDATE customers SET status = 'inactive' WHERE customer_id > 0;
   ```

3. **Add LIMIT with WHERE clause**:

   ```sql
   -- Add both WHERE and LIMIT
   UPDATE customers SET status = 'inactive'
   WHERE last_active_date < '2020-01-01'
   LIMIT 100;
   ```

4. **Configure MySQL client settings**:

   In MySQL Workbench:

   - Go to Edit > Preferences
   - Select "SQL Editor" tab
   - Uncheck "Safe Updates" option
   - Reconnect to your database

## Prevention

1. **Design queries with proper WHERE clauses**:

   - Always include conditions in UPDATE and DELETE statements
   - Use primary keys or indexed columns in conditions

2. **Add primary keys to all tables**:

   ```sql
   -- Add primary key to existing table
   ALTER TABLE table_name ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;
   ```

3. **Use transactions for major updates**:

   ```sql
   START TRANSACTION;
   -- Perform update or delete
   -- Verify the changes
   COMMIT; -- or ROLLBACK if needed
   ```

4. **Consider using safe mode** in production environments to prevent accidental updates
