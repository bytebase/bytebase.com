---
title: 'How to fix Error 1175: You are using safe update mode in updating the table'
---

## Error Message

When encountering MySQL Error 1175, you'll see a message similar to:

```sql
Error 1175: You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column
```

Or:

```sql
Error 1175: You are using safe update mode and you tried to update a table with a LIMIT clause but without a WHERE clause
```

## What It Means

This error occurs when you attempt to execute an UPDATE or DELETE statement without specifying conditions that use a key column (such as a primary key) in the WHERE clause, or when using LIMIT without a WHERE clause, while MySQL is running in safe update mode.

Safe update mode is a safety feature designed to prevent accidental mass updates or deletions by requiring that UPDATE and DELETE statements include a WHERE clause that references a key column or a LIMIT clause.

## Common Causes

1. **Missing WHERE clause**: Attempting to update or delete records without a WHERE clause
2. **Non-key column in WHERE**: Using a WHERE clause with columns that aren't keys
3. **SQL_SAFE_UPDATES enabled**: The MySQL session has safe update mode activated
4. **MySQL client settings**: SQL_SAFE_UPDATES is often enabled by default in MySQL Workbench
5. **Using LIMIT without WHERE**: Trying to limit updates/deletes without specifying which rows
6. **Missing primary key in table**: The table lacks a primary key altogether

## How to Fix

### Solution 1: Disable Safe Update Mode for Current Session

Temporarily disable safe update mode for your current session:

```sql
-- Disable safe update mode
SET SQL_SAFE_UPDATES = 0;

-- Run your update or delete statement
UPDATE table_name SET column1 = value1;

-- Optionally, re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;
```

### Solution 2: Use Key Columns in WHERE Clause

Modify your query to use a key column (like primary key) in the WHERE clause:

```sql
-- Before: Unsafe
UPDATE customers SET status = 'inactive';

-- After: Safe, using primary key
UPDATE customers SET status = 'inactive' WHERE customer_id > 0;
```

### Solution 3: Add LIMIT with WHERE Clause

Add both a WHERE clause and a LIMIT to control the scope of changes:

```sql
-- Add both WHERE and LIMIT
UPDATE customers SET status = 'inactive'
WHERE last_active_date < '2020-01-01'
LIMIT 100;
```

### Solution 4: Configure MySQL Client Settings

In MySQL Workbench, change this setting:

1. Go to Edit > Preferences
2. Select "SQL Editor" tab
3. Uncheck "Safe Updates" option
4. Reconnect to your database

### Solution 5: Use Primary Keys in Your Tables

Ensure your tables have primary keys:

```sql
-- Add primary key to existing table
ALTER TABLE table_name ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

-- Create new tables with primary keys
CREATE TABLE new_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    column1 VARCHAR(255),
    column2 INT
);
```

### Solution 6: Explicitly Acknowledge Mass Updates

If you really need to update all rows and understand the implications:

```sql
-- Using 1=1 to explicitly show intention to update all rows
UPDATE table_name SET column1 = value1 WHERE 1=1;
```

### Solution 7: Use Multi-Step Approach for Large Updates

Break large updates into smaller, safer operations:

```sql
-- Create temporary table with IDs to update
CREATE TEMPORARY TABLE temp_updates AS
SELECT id FROM large_table WHERE some_condition;

-- Update using the temporary table
UPDATE large_table
JOIN temp_updates ON large_table.id = temp_updates.id
SET large_table.status = 'updated';

-- Clean up
DROP TEMPORARY TABLE temp_updates;
```

## Cloud Vendor Considerations

When working with managed MySQL services:

- **AWS RDS**: Default parameter groups may have SQL_SAFE_UPDATES enabled
- **Google Cloud SQL**: Check instance flags for safe update settings
- **Azure Database for MySQL**: Review server parameters for safety settings

For cloud environments, consider:

1. Creating database parameter groups/flags with appropriate safe update settings for your needs
2. Using transaction wrappers for large updates to enable rollback if needed
3. Testing updates in staging environments before production
4. Using cloud provider's backup/snapshot features before major data modifications
