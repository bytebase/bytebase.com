---
title: 'How to fix Error 1062: Duplicate entry'
---

## Error Message

When encountering MySQL Error 1062, you'll see a message similar to:

```sql
ERROR 1062 (23000): Duplicate entry '123' for key 'PRIMARY'
```

Or variations such as:

```sql
ERROR 1062 (23000): Duplicate entry 'example@email.com' for key 'users.email'
ERROR 1062 (23000): Duplicate entry 'product-slug' for key 'products.UQ_slug'
```

## What It Means

This error occurs when you attempt to insert or update a record with a value that already exists in a field that has a unique constraint. The unique constraint could be a primary key, unique index, or unique key.

MySQL enforces data integrity by preventing duplicate values in these fields, causing the insert or update operation to fail.

## Common Causes

1. **Primary key violations**: Attempting to insert a record with a primary key that already exists
2. **Unique index violations**: Inserting data that would violate a unique index constraint
3. **Batch imports**: Loading data from external sources without checking for duplicates
4. **Auto-increment issues**: Explicitly setting auto-increment values that already exist
5. **Multi-master replication**: Conflicts arising from concurrent writes to different master servers
6. **Application logic errors**: Application code not checking for existing records before insertion
7. **INSERT IGNORE misuse**: Expecting INSERT IGNORE to handle a different kind of error

## How to Fix

### Solution 1: Use INSERT ... ON DUPLICATE KEY UPDATE

For cases where you want to update existing records rather than inserting duplicates:

```sql
INSERT INTO users (id, name, email, last_login)
VALUES (1, 'John Doe', 'john@example.com', NOW())
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  last_login = VALUES(last_login);
```

### Solution 2: Use REPLACE INTO

Replace existing records with new data (note: this deletes and re-creates the row, so all non-provided columns will reset to default values):

```sql
REPLACE INTO users (id, name, email)
VALUES (1, 'John Doe', 'john@example.com');
```

### Solution 3: Check if Records Exist Before Inserting

Validate existence before attempting insertion:

```sql
-- Method 1: Using INSERT ... SELECT with NOT EXISTS
INSERT INTO users (name, email)
SELECT 'John Doe', 'john@example.com'
FROM dual
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'john@example.com'
);

-- Method 2: Using application-level checks
-- First query to check existence, then INSERT only if not found
```

### Solution 4: Use INSERT IGNORE

Silently ignore duplicate records without error (use cautiously):

```sql
INSERT IGNORE INTO users (id, name, email)
VALUES (1, 'John Doe', 'john@example.com');
```

### Solution 5: Handle Batch Imports with De-duplication

For bulk imports, pre-process or filter duplicate data:

```sql
-- Create a temporary table for incoming data
CREATE TEMPORARY TABLE temp_import (
  id INT,
  name VARCHAR(255),
  email VARCHAR(255)
);

-- Load data into temporary table
LOAD DATA INFILE 'data.csv' INTO TABLE temp_import;

-- Insert only non-duplicates
INSERT INTO users (id, name, email)
SELECT t.id, t.name, t.email
FROM temp_import t
LEFT JOIN users u ON t.email = u.email
WHERE u.email IS NULL;
```

### Solution 6: Use Auto-increment Keys Properly

Let MySQL handle auto-increment values:

```sql
-- Don't specify the auto-increment column
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');

-- Or explicitly set to NULL
INSERT INTO users (id, name, email) VALUES (NULL, 'John Doe', 'john@example.com');
```

### Solution 7: Update Existing Records

If you know the record exists and want to update it:

```sql
UPDATE users
SET name = 'John Doe', last_login = NOW()
WHERE email = 'john@example.com';
```

## Cloud Vendor Considerations

When working with MySQL in cloud environments:

- **AWS Aurora**: Use cluster-aware features to avoid duplicate key issues in multi-master setups
- **Google Cloud SQL**: Consider read-replica configurations to reduce write conflicts
- **Azure Database for MySQL**: Leverage monitoring tools to track duplicate key errors

For distributed systems:

1. Consider using UUIDs instead of auto-increment keys to reduce conflicts
2. Implement proper retry logic with exponential backoff for transient duplicate key errors
3. Use the cloud provider's transaction isolation features appropriately
4. For multi-region deployments, consider conflict resolution strategies suitable to your application
