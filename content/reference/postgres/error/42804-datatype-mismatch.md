---
title: 'ERROR 42804: Column is of type X but expression is of type Y'
---

## Error Message

```sql
ERROR: column "age" is of type integer but expression is of type text
HINT: You will need to rewrite or cast the expression.
```

## Description

This error occurs when you try to assign a value of one data type to a column of an incompatible data type. PostgreSQL has strict type checking and requires explicit type conversions in many cases.

## Causes

- Inserting or updating a column with a value of the wrong data type
- Using incompatible types in WHERE clauses or JOIN conditions
- Mixing data types in functions or operators
- Attempting implicit conversions that PostgreSQL doesn't support

## Solutions

1. **Use explicit casting** to convert between compatible types:

   ```sql
   -- Instead of:
   INSERT INTO users (name, age) VALUES ('John', '30');

   -- Use casting:
   INSERT INTO users (name, age) VALUES ('John', '30'::integer);
   -- Or:
   INSERT INTO users (name, age) VALUES ('John', CAST('30' AS integer));
   ```

2. **Fix the data type in your query**:

   ```sql
   -- Instead of comparing different types:
   SELECT * FROM users WHERE id = '1';

   -- Use the correct type:
   SELECT * FROM users WHERE id = 1;
   ```

3. **For string concatenation**, cast non-text types:

   ```sql
   -- Instead of:
   SELECT name || ' is ' || age || ' years old' FROM users;

   -- Cast to text:
   SELECT name || ' is ' || age::text || ' years old' FROM users;
   ```

## Prevention

- Know your column data types before writing queries
- Use parameterized queries in application code to let the driver handle type conversions
- Be explicit about type conversions to make code more readable
