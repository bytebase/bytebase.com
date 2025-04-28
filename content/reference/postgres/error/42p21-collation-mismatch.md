---
title: 'ERROR 42P21: Collation mismatch'
---

## Error Message

```sql
ERROR: could not determine which collation to use for string comparison
HINT: Use the COLLATE clause to set the collation explicitly.
```

## Description

This error occurs when PostgreSQL cannot automatically determine which collation to use for string comparison operations. Collations determine how strings are sorted and compared, including language-specific rules for alphabetical ordering and case sensitivity.

## Causes

- Comparing strings with different collations
- Mixing strings from columns with different collations
- Using string operations across databases with different default collations
- Creating expressions that combine strings with ambiguous collation
- Using functions that require a specific collation determination

## Solutions

1. **Specify collation explicitly** in your queries:

   ```sql
   -- Instead of:
   SELECT * FROM users WHERE name = 'John';

   -- Specify the collation:
   SELECT * FROM users WHERE name = 'John' COLLATE "en_US";

   -- For comparisons between columns:
   SELECT * FROM users a JOIN users_archive b
     ON a.name COLLATE "en_US" = b.name COLLATE "en_US";
   ```

2. **Set a collation for an entire expression**:

   ```sql
   SELECT * FROM users
   ORDER BY (first_name || ' ' || last_name) COLLATE "en_US";
   ```

3. **Use collation in CREATE TABLE statements** for consistent behavior:

   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name TEXT COLLATE "en_US",
       email TEXT COLLATE "en_US"
   );
   ```

4. **For temporary operations**, cast to a specific collation:
   ```sql
   SELECT * FROM users
   WHERE name::text COLLATE "en_US" LIKE 'A%';
   ```

## Prevention

- Use consistent collations across your database schema
- Document the collations used in your application
- Set database and schema default collations appropriately
- Be explicit about collations in multinational or multilingual applications
- Consider using the C or POSIX collation for performance-critical operations that don't need language-specific sorting

<HintBlock type="info">

You can view available collations in PostgreSQL using the query:

```sql
SELECT * FROM pg_collation;
```

</HintBlock>
