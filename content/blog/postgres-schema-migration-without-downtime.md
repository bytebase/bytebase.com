---
title: Postgres Schema Migration without Downtime Best Practice
author: Tianzhou
updated_at: 2025/09/02 11:00
feature_image: /content/blog/postgres-schema-migration-without-downtime/banner.webp
tags: Explanation
description: Learn how Postgres locks affect schema migrations and which DDL operations conflict with DML to achieve zero-downtime deployments.
keypage: true
---

## Understanding Postgres Locks

Postgres uses a [sophisticated locking system](https://www.postgresql.org/docs/current/explicit-locking.html) with multiple lock modes. DDL operations often acquire locks that conflict with routine DML operations like `INSERT`, `UPDATE`, and `DELETE`. This means a seemingly harmless schema change can bring your entire application to a halt if not executed carefully.

Let's understand what locks DML operations acquire:

| DML                        | Lock Mode         | Description                                                            |
| -------------------------- | ----------------- | ---------------------------------------------------------------------- |
| `SELECT`                   | **ACCESS SHARE**  | Only conflicts with ACCESS EXCLUSIVE                                   |
| `INSERT`/`UPDATE`/`DELETE` | **ROW EXCLUSIVE** | Conflicts with SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE |

Now we can see how the two most common schema migration operations conflict with DML:

| DDL Operation              | Lock Mode            | SELECT        | INSERT/UPDATE/DELETE |
| -------------------------- | -------------------- | ------------- | -------------------- |
| `ALTER TABLE` (most cases) | **ACCESS EXCLUSIVE** | ❌ **BLOCKS** | ❌ **BLOCKS**        |
| `CREATE INDEX`             | **SHARE**            | ✅ Allows     | ❌ **BLOCKS**        |

Many `ALTER TABLE` forms acquire an **ACCESS EXCLUSIVE** lock, which is the most restrictive lock in Postgres. This completely blocks your application - no reads, no writes, nothing can happen on that table until the operation completes.

`CREATE INDEX` uses a **SHARE** lock, which allows `SELECT` statements but blocks all write operations (`INSERT`, `UPDATE`, `DELETE`). For a large table, index creation can take hours, effectively making your application read-only.

Both scenarios cause downtime. In the following sections, we'll explore alternatives that avoid these blocking behaviors.

## ALTER TABLE without Downtime

While most `ALTER TABLE` operations acquire `ACCESS EXCLUSIVE` locks, Postgres provides several techniques to avoid downtime for common schema changes.

### Adding Columns with DEFAULT Values

Since [Postgres 11](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commit;h=16828d5c0273b4fe5f10f42588005f16b415b2d8), adding a column with a `DEFAULT` value no longer requires a table rewrite in many cases.

```sql
-- ✅ Fast operation (Postgres 11+)
-- No table rewrite, minimal lock time
ALTER TABLE users ADD COLUMN status text DEFAULT 'active';

-- ❌ Slow operation (requires table rewrite)
-- Only use if you need a non-constant default
ALTER TABLE users ADD COLUMN created_at timestamp DEFAULT now();
```

**How it works**: Postgres stores the default value in the system catalog instead of rewriting every row. When you read a row that doesn't have the new column, Postgres automatically returns the default value.

### Adding Constraints in Two Phases

For constraints that need validation against existing data, use the `NOT VALID` approach:

#### Check Constraints

```sql
-- Step 1: Add constraint without validating existing data
-- Fast - only blocks briefly to update catalog
ALTER TABLE users ADD CONSTRAINT users_age_positive
  CHECK (age > 0) NOT VALID;

-- Step 2: Validate existing data (can take time but doesn't block writes)
-- Uses SHARE UPDATE EXCLUSIVE lock - allows reads/writes
ALTER TABLE users VALIDATE CONSTRAINT users_age_positive;
```

#### Foreign Key Constraints

```sql
-- Step 1: Add foreign key without validation
-- Fast - only updates catalog, doesn't validate existing data
ALTER TABLE orders ADD CONSTRAINT orders_user_id_fk
  FOREIGN KEY (user_id) REFERENCES users(id) NOT VALID;

-- Step 2: Validate existing relationships
-- Can take time but allows concurrent operations
ALTER TABLE orders VALIDATE CONSTRAINT orders_user_id_fk;
```

### Setting Columns to NOT NULL

The safest approach for `SET NOT NULL` is a four-step process:

```sql
-- Step 1: Add a check constraint (fast with NOT VALID)
ALTER TABLE users ADD CONSTRAINT users_email_not_null
  CHECK (email IS NOT NULL) NOT VALID;

-- Step 2: Validate the constraint (allows concurrent operations)
ALTER TABLE users VALIDATE CONSTRAINT users_email_not_null;

-- Step 3: Set NOT NULL (fast since constraint guarantees no nulls)
ALTER TABLE users ALTER COLUMN email SET NOT NULL;

-- Step 4: Drop the redundant check constraint
ALTER TABLE users DROP CONSTRAINT users_email_not_null;
```

**Why this works**: The final `SET NOT NULL` is fast because Postgres can see from the validated constraint that no null values exist.

**Postgres 18 Update**: The upcoming Postgres 18 introduces a [simplified form](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commitdiff;h=a379061a2) that allows `NOT NULL` constraints to use the `NOT VALID` attribute directly:

```sql
-- Postgres 18+ - Simplified approach
ALTER TABLE users ALTER COLUMN email SET NOT NULL NOT VALID;
ALTER TABLE users VALIDATE CONSTRAINT users_email_not_null;
```

## CREATE INDEX without Downtime

Instead of the blocking `CREATE INDEX`, use `CREATE INDEX CONCURRENTLY` to build indexes without interfering with application traffic:

```sql
-- ❌ Blocks all writes during index creation
CREATE INDEX idx_users_email ON users(email);

-- ✅ Allows writes to continue during index creation
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

`CREATE INDEX CONCURRENTLY` uses a **SHARE UPDATE EXCLUSIVE** lock instead of a **SHARE** lock, allowing `INSERT`, `UPDATE`, and `DELETE` operations to continue normally while the index is being built.

**Trade-offs**: While concurrent index creation avoids downtime, it takes longer to complete and has some limitations (cannot be used inside transactions, requires more careful error handling).

For a comprehensive guide on concurrent index creation, see our detailed article on [CREATE INDEX CONCURRENTLY](/blog/postgres-create-index-concurrently).

## Use lock_timeout

Regardless of the lock level, all DDL operations should use [lock_timeout](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-LOCK-TIMEOUT) to prevent creating lock queues that can freeze your application.

### The Lock Queue Problem

When an `ACCESS EXCLUSIVE` operation waits for existing queries to complete, it blocks all subsequent operations from starting. Your application can appear completely frozen while waiting for one long query to finish.

```sql
-- Session 1: Long-running query (holds ACCESS SHARE)
SELECT COUNT(*) FROM large_table; -- Takes 5 minutes

-- Session 2: DDL waiting for ACCESS EXCLUSIVE
ALTER TABLE large_table ALTER COLUMN description TYPE text; -- Waits behind the SELECT

-- Session 3: New application query
SELECT * FROM large_table WHERE id = 123; -- BLOCKED by waiting DDL!
```

### Set lock_timeout

The `lock_timeout` parameter can be set at multiple levels:

```sql
-- Option 1: Session level (temporary)
SET lock_timeout = '5s';

-- Option 2: Role level (recommended - persistent across sessions)
CREATE ROLE ddl_user WITH LOGIN PASSWORD 'secure_password';
ALTER ROLE ddl_user SET lock_timeout = '5s';

-- Option 3: Database level (applies to all connections)
ALTER DATABASE mydb SET lock_timeout = '5s';
```

Setting `lock_timeout` at the Postgres role level is recommended because:

1. The setting applies to all sessions for that role
1. No need to remember to set it in each DDL session

```sql
-- Use the dedicated DDL user for schema migrations
-- Connect as ddl_user and run:
ALTER TABLE users ALTER COLUMN description TYPE text;
```

If the operation can't acquire the lock within 5 seconds, it fails with an error instead of blocking the application indefinitely.

### Retry Logic

Combine `lock_timeout` with retry logic to handle busy periods:

```sql
-- Example DDL script with retry logic
DO $$
DECLARE
    max_attempts INTEGER := 10;
    attempt INTEGER := 1;
    success BOOLEAN := FALSE;
BEGIN
    WHILE attempt <= max_attempts AND NOT success LOOP
        BEGIN
            SET lock_timeout = '2s';
            ALTER TABLE users ALTER COLUMN description TYPE text;
            success := TRUE;
            RAISE NOTICE 'DDL succeeded on attempt %', attempt;
        EXCEPTION
            WHEN lock_not_available THEN
                RAISE NOTICE 'Attempt % failed, retrying in 30 seconds...', attempt;
                PERFORM pg_sleep(30);
                attempt := attempt + 1;
        END;
    END LOOP;

    IF NOT success THEN
        RAISE EXCEPTION 'DDL failed after % attempts', max_attempts;
    END IF;
END $$;
```

<HintBlock type="info">

Bytebase automatically handles [retry logic](https://github.com/bytebase/bytebase/blob/c32bf12c40fec3adc16f56c274d490e407465b04/backend/plugin/db/pg/pg.go#L439-L460) during schema migrations.

</HintBlock>

## Conclusion

Achieving zero-downtime Postgres schema migrations requires understanding locks and applying the right techniques:

1. **Understand the impact**: Know which DDL operations block your application
1. **Use modern Postgres features**: Leverage `CONCURRENTLY`, `NOT VALID`, and other optimizations
1. **Always set lock_timeout**: Prevent lock queues that can freeze your application
1. **Plan for retries**: Handle busy periods gracefully with retry logic

By following these practices, you can deploy schema changes confidently without impacting your users.

## References

1. [Postgres locking mode](https://www.postgresql.org/docs/current/explicit-locking.html)
1. [Postgres 11: ADD COLUMN with DEFAULT optimization](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commit;h=16828d5c0273b4fe5f10f42588005f16b415b2d8)
1. [Postgres 18: NOT NULL constraints with NOT VALID](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commitdiff;h=a379061a2)
1. [How to Use Postgres CREATE INDEX CONCURRENTLY](/blog/postgres-create-index-concurrently)
