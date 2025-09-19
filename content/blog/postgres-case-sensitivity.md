---
title: 'Postgres Case Sensitivity Explained'
author: Adela
updated_at: 2025/09/19 18:00
feature_image: /content/blog/postgres-case-sensitivity/cover.webp
tags: Explanation
description: 'An engineering perspective to evaluate Postgres case sensitivity'
---

PostgreSQL's case sensitivity rules can surprise even experienced developers. Here's the concise, no-gotchas guide.

## 1. Identifiers (table/column names)

* **Unquoted identifiers are folded to lowercase.**

  ```sql
  CREATE TABLE Customer (ID int, UserName varchar(50));
  -- Actually created as: customer(id, username)
  
  SELECT * FROM customer;   -- ✅ works
  SELECT * FROM Customer;   -- ✅ works (folded to lowercase)
  ```

* **Quoted identifiers preserve case and must be referenced exactly.**

  ```sql
  CREATE TABLE "Customer" ("ID" int, "UserName" varchar(50));
  
  SELECT * FROM "Customer";           -- ✅ works
  SELECT * FROM customer;             -- ❌ ERROR: relation "customer" does not exist
  SELECT id FROM "Customer";          -- ❌ ERROR: column "id" does not exist
  ```

**Best practice:** avoid quoted identifiers. Use lowercase `snake_case` (e.g., `order_items`, `created_at`).

## 2. Strings (data values)

* **String comparisons are case-sensitive by default.**

  ```sql
  SELECT 'abc' = 'ABC';  -- false
  INSERT INTO users (username) VALUES ('JohnDoe'), ('janedoe');
  SELECT * FROM users WHERE username = 'johndoe';  -- 0 rows
  ```

* **Case-insensitive matching**

  * Functions and operators:

    ```sql
    SELECT * FROM users WHERE lower(username) = 'johndoe';  -- ✅ finds 1 row
    SELECT * FROM users WHERE username ILIKE 'john%';       -- ✅ case-insensitive LIKE
    SELECT * FROM users WHERE username ~* '^john';          -- ✅ case-insensitive regex
    ```

  * `citext` extension:

    ```sql
    CREATE EXTENSION IF NOT EXISTS citext;
    CREATE TABLE users (id SERIAL, username CITEXT UNIQUE);
    SELECT * FROM users WHERE username = 'johndoe';  -- ✅ automatically case-insensitive
    ```

  * Nondeterministic collations (PostgreSQL 12+):

    ```sql
    CREATE COLLATION case_insensitive (
        provider = icu, 
        locale = 'und-u-ks-level2', 
        deterministic = false
    );
    CREATE TABLE users (username TEXT COLLATE "case_insensitive");
    ```

## 3. Indexing for case-insensitive search

* Functional index to avoid full scans:

  ```sql
  CREATE INDEX users_name_lower_idx ON users (lower(name));
  -- Query must match the expression:
  SELECT * FROM users WHERE lower(name) = lower($1);
  ```

* For prefix searches:

  ```sql
  CREATE INDEX users_name_lower_like_idx ON users (lower(name) text_pattern_ops);
  SELECT * FROM users WHERE lower(name) LIKE lower($1) || '%';
  ```

## 4. ORMs & migrations: common pitfalls

* Some ORMs emit **quoted identifiers**, locking you into exact casing everywhere. Prefer ORM settings that generate unquoted, lowercase names.
* Mixing quoted and unquoted names across migrations leads to "why can't it find my table?" bugs — standardize on lowercase, unquoted schema objects.

```sql
-- Wrong: Mixing quoted and unquoted
CREATE TABLE user_accounts (user_id SERIAL);
ALTER TABLE "user_accounts" ADD COLUMN email VARCHAR(100);  -- ❌ Fails

-- Correct: Consistent unquoted
ALTER TABLE user_accounts ADD COLUMN email VARCHAR(100);    -- ✅ Works
```

## Quick Rules of Thumb

1. **Schema:** lowercase + unquoted identifiers, always.
2. **Search:** use `ILIKE`, `lower()` with functional indexes, or `citext`.
3. **Avoid quoted names** unless you have a compelling reason.
4. **ORMs:** configure to generate lowercase, unquoted schema objects.

That's it — you'll stay consistent, avoid case traps, and keep queries fast.