---
title: 'ERROR 1062 (23000): Duplicate entry'
---

## Error Message

```sql
ERROR 1062 (23000): Duplicate entry '123' for key 'PRIMARY'
```

Or variations such as:

```sql
ERROR 1062 (23000): Duplicate entry 'example@email.com' for key 'users.email'
ERROR 1062 (23000): Duplicate entry 'product-slug' for key 'products.UQ_slug'
```

## Description

This error occurs when you attempt to insert or update a record with a value that already exists in a field that has a unique constraint. The unique constraint could be a primary key, unique index, or unique key.

## Causes

- Attempting to insert a record with a primary key that already exists
- Inserting data that would violate a unique index constraint
- Loading data from external sources without checking for duplicates
- Explicitly setting auto-increment values that already exist
- Conflicts arising from concurrent writes to different master servers
- Application code not checking for existing records before insertion
- Expecting INSERT IGNORE to handle a different kind of error

## Solutions

1. **Use INSERT ... ON DUPLICATE KEY UPDATE**:

   ```sql
   INSERT INTO users (id, name, email, last_login)
   VALUES (1, 'John Doe', 'john@example.com', NOW())
   ON DUPLICATE KEY UPDATE
     name = VALUES(name),
     last_login = VALUES(last_login);
   ```

2. **Use REPLACE INTO**:

   ```sql
   REPLACE INTO users (id, name, email)
   VALUES (1, 'John Doe', 'john@example.com');
   ```

3. **Check if records exist before inserting**:

   ```sql
   -- Using INSERT ... SELECT with NOT EXISTS
   INSERT INTO users (name, email)
   SELECT 'John Doe', 'john@example.com'
   FROM dual
   WHERE NOT EXISTS (
     SELECT 1 FROM users WHERE email = 'john@example.com'
   );
   ```

4. **Use INSERT IGNORE**:

   ```sql
   INSERT IGNORE INTO users (id, name, email)
   VALUES (1, 'John Doe', 'john@example.com');
   ```

## Prevention

1. **Use auto-increment keys** properly:

   ```sql
   -- Don't specify the auto-increment column
   INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');
   ```

2. **Implement proper validation** in application code before database operations

3. **Handle batch imports** with de-duplication:

   ```sql
   -- Insert only non-duplicates
   INSERT INTO users (id, name, email)
   SELECT t.id, t.name, t.email
   FROM temp_import t
   LEFT JOIN users u ON t.email = u.email
   WHERE u.email IS NULL;
   ```

4. **Use transactions** when performing multiple related inserts
