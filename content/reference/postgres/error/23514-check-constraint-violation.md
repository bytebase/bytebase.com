---
title: 'ERROR 23514: New row for relation violates check constraint'
---

## Error Message

```sql
ERROR: new row for relation "users" violates check constraint "check_age_positive"
DETAIL: Failing row contains (1, John, -5).
```

## Description

This error occurs when you try to insert or update a row with values that violate a CHECK constraint defined on the table. CHECK constraints enforce business rules and data validity based on custom conditions.

## Causes

- Inserting data that doesn't meet the condition specified in the CHECK constraint
- Updating rows with values that violate the constraint
- Constraint conditions that reference other columns or complex expressions
- Misunderstanding the logic of the constraint

## Solutions

1. **Modify the data to comply with the constraint**:

   ```sql
   -- Instead of:
   INSERT INTO users (id, name, age) VALUES (1, 'John', -5);

   -- Use a valid value:
   INSERT INTO users (id, name, age) VALUES (1, 'John', 25);
   ```

2. **Examine the constraint definition** to understand what conditions must be met:

   ```sql
   SELECT pg_get_constraintdef(oid)
   FROM pg_constraint
   WHERE conname = 'check_age_positive';
   ```

3. **For bulk operations**:

   - Filter out non-compliant data before importing:

   ```sql
   INSERT INTO users (id, name, age)
   SELECT id, name, age FROM source_data
   WHERE age >= 0;
   ```

4. **If appropriate, modify the constraint** (requires administrator privileges):
   ```sql
   ALTER TABLE users DROP CONSTRAINT check_age_positive;
   ALTER TABLE users ADD CONSTRAINT check_age_positive CHECK (age >= 0 OR age IS NULL);
   ```

## Prevention

- Validate data at the application level before sending it to the database
- Document CHECK constraints for developers to understand data requirements
- Use appropriate default values when possible
- Consider using triggers for more complex validation logic

<HintBlock type="info">

The error message usually includes the name of the constraint ("check_age_positive" in this example) and the failing row data, which helps identify what violated the constraint.

</HintBlock>
