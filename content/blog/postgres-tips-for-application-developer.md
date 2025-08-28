---
title: 5 Postgres Production Tips for Application Developers
author: Tianzhou
updated_at: 2025/08/28 18:00
feature_image: /content/blog/postgres-tips-for-application-developers/banner.webp
tags: Explanation
description: 5 quick wins for application developers to improve Postgres reliability and make both their own and DBA/infrastructure teams' lives easier.
---

As an application developer, you can make your PostgreSQL applications more reliable and maintainable with just a few key practices. Here are 5 essential tips that focus on what's within your control as a developer—not database administration tasks—plus a bonus technique for managing index. Implementing these will make your DBA and infrastructure teams much happier.

## 1. Set application_name for Better Debugging

Setting `application_name` in your database connections helps with debugging. Without it, all connections look identical in monitoring tools, making troubleshooting difficult.

### How to Implement

**PostgreSQL connection string:**

```plain
postgresql://user:password@localhost:5432/mydb?application_name=user-service
```

**Node.js with pg:**

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'mydb',
  user: 'myuser',
  password: 'mypassword',
  application_name: 'user-service',
});
```

**Python with psycopg2:**

```python
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="myuser",
    password="mypassword",
    application_name="user-service"
)
```

**Java with JDBC:**

```java
String url = "jdbc:postgresql://localhost:5432/mydb?ApplicationName=user-service";
Connection conn = DriverManager.getConnection(url, "myuser", "mypassword");
```

**Go with lib/pq:**

```go
import (
    "database/sql"
    _ "github.com/lib/pq"
)

connStr := "host=localhost dbname=mydb user=myuser password=mypassword application_name=user-service"
db, err := sql.Open("postgres", connStr)
```

### What You Get

Once configured, you can easily identify your application's database activity:

```sql
-- See all active connections from your service
SELECT pid, usename, application_name, state, query
FROM pg_stat_activity
WHERE application_name = 'user-service';

-- Monitor long-running queries from specific services
SELECT application_name, query, now() - query_start as duration
FROM pg_stat_activity
WHERE state = 'active'
AND now() - query_start > interval '30 seconds';
```

## 2. Configure Sane Timeouts

Database timeouts prevent applications from hanging indefinitely. Without proper timeout configuration, your application can consume all connection pool slots and impact service availability.

### The Four Critical Timeouts

1. **`statement_timeout`** - Maximum time for any single SQL statement. Prevents runaway queries from consuming resources indefinitely.

1. **`lock_timeout`** - Maximum time to wait for a lock. Prevents deadlock scenarios from blocking your application forever.

1. **`idle_in_transaction_timeout`** - Maximum time a transaction can remain idle. Prevents abandoned transactions from holding locks and blocking other operations.

1. **`transaction_timeout`** - Maximum time for an entire transaction (PostgreSQL 17+). Prevents long-running transactions from holding locks too long.

### How to Configure

**In connection string:**

```plain
postgresql://user:pass@localhost/db?options=-c%20statement_timeout=30s%20-c%20lock_timeout=10s%20-c%20transaction_timeout=60s
```

**At transaction level:**

```sql
BEGIN;
SET LOCAL statement_timeout = '30s';
SET LOCAL lock_timeout = '10s';
SET LOCAL transaction_timeout = '60s'; -- PostgreSQL 17+
-- Your transaction operations here
COMMIT;
```

### Recommended Values by Use Case

| Use Case                | statement_timeout | lock_timeout | idle_in_transaction_timeout | transaction_timeout |
| ----------------------- | ----------------- | ------------ | --------------------------- | ------------------- |
| **Web Applications**    | 30s               | 10s          | 60s                         | 60s                 |
| **Background Jobs**     | 300s+             | 30s          | 300s                        | 600s                |
| **Reporting/Analytics** | 0 (disabled)      | 60s          | 600s                        | 0 (disabled)        |

**Reasoning:**

- **Web Applications**: User-facing requests should fail fast; clean up abandoned web requests
- **Background Jobs**: Data processing can take longer; jobs can wait a bit more for locks
- **Reporting/Analytics**: Reports can take hours; shouldn't block operations; longer analysis sessions

<HintBlock type="info">

To learn more, please refer [Postgres Timeout Explained](/blog/postgres-timeout).

</HintBlock>

## 3. Use Online Schema Migration Options

Schema migrations in production require careful planning. Standard migrations can lock your tables for extended periods, impacting application availability. Here's how to perform schema changes safely without downtime.

### The Problem with Standard Migrations

Traditional migrations acquire exclusive locks that block all reads and writes to your tables:

```sql
-- DON'T: This blocks ALL SELECT, INSERT, UPDATE, DELETE on users table
ALTER TABLE users ADD COLUMN email_verified boolean DEFAULT false;

-- DON'T: This blocks ALL writes (INSERT, UPDATE, DELETE) on orders table for hours
CREATE INDEX ON orders (user_id, created_at);
```

When these operations run on large tables, they can:

- **Block all application queries** for minutes or hours
- **Cause connection pool exhaustion** as queries queue up waiting for locks
- **Trigger cascading failures** across your entire application stack

### Online Migration Strategies

1. Use `CREATE INDEX CONCURRENTLY`

   ```sql
   -- Safe: Builds index without blocking reads/writes
   -- Note: Cannot be run inside a transaction
   CREATE INDEX CONCURRENTLY idx_orders_user_created
   ON orders (user_id, created_at);
   ```

   <HintBlock type="info">

   To learn more production tips, please refer [Postgres CREATE INDEX CONCURRENTLY](/blog/postgres-create-index-concurrently).

   </HintBlock>

1. Add columns and constraints safely

   ```sql
   -- Step 1: Add constraint without validation (fast)
   ALTER TABLE users ADD CONSTRAINT email_verified_not_null
   CHECK (email_verified IS NOT NULL) NOT VALID;

   -- Step 2: Validate constraint (can be done later, non-blocking)
   ALTER TABLE users VALIDATE CONSTRAINT email_verified_not_null;

   -- Step 3: Convert to NOT NULL constraint
   ALTER TABLE users ALTER COLUMN email_verified SET NOT NULL;
   ```

## 4. Split PostgreSQL Roles for Different Operations

Implementing separate database roles for different operations improves security. This approach prevents accidental damage and makes operations more manageable.

### The Problem with Single "Super User" Approach

Many applications use a single database user with broad permissions:

```sql
-- DON'T: Single user with excessive privileges
GRANT ALL PRIVILEGES ON DATABASE myapp TO app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
```

This creates several problems:

- **Security risk**: Application has unnecessary DDL permissions
- **Operational risk**: Code bugs can drop tables or modify schema
- **Audit trail**: Can't distinguish between different operation types
- **Performance**: Can't optimize connections for specific use cases

### The Three-Role Strategy

1. Read-Only Role - For analytics, reporting, read replicas
1. Application Role - For normal CRUD operations
1. Migration Role - For schema changes and DDL operations

### Implementation Example

**Create the roles:**

```sql
-- 1. Read-only role for analytics/reporting
CREATE ROLE app_reader;
GRANT CONNECT ON DATABASE myapp TO app_reader;
GRANT USAGE ON SCHEMA public TO app_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_reader;
-- Automatically grant SELECT on future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO app_reader;

-- 2. Application role for normal operations
CREATE ROLE app_writer;
GRANT CONNECT ON DATABASE myapp TO app_writer;
GRANT USAGE ON SCHEMA public TO app_writer;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_writer;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_writer;
-- Auto-grant on future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_writer;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO app_writer;

-- 3. Migration role for schema changes
CREATE ROLE app_migrator;
GRANT CONNECT ON DATABASE myapp TO app_migrator;
GRANT ALL PRIVILEGES ON SCHEMA public TO app_migrator;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_migrator;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_migrator;
```

**Create actual users:**

```sql
-- Create users and assign roles
CREATE USER analytics_user PASSWORD 'secure_password';
GRANT app_reader TO analytics_user;

CREATE USER application_user PASSWORD 'secure_password';
GRANT app_writer TO application_user;

CREATE USER migration_user PASSWORD 'secure_password';
GRANT app_migrator TO migration_user;
```

## 5. Use UPSERT for Robust Operations

In production environments, operations fail, networks are unreliable, and retries are inevitable. UPSERT (`INSERT ... ON CONFLICT`) helps you handle these scenarios:

- Avoiding duplicate records when retrying failed requests
- Handling race conditions between concurrent operations
- Building idempotent operations that can be safely repeated
- Simplifying application logic for "create or update" patterns

### Ignore Duplicates

```sql
-- Pattern 1: Ignore duplicates
INSERT INTO users (email, name, created_at)
VALUES ('john@example.com', 'John Doe', NOW())
ON CONFLICT (email) DO NOTHING;
```

### Update on Conflict

```sql
-- Pattern 2: Update on conflict
INSERT INTO users (email, name, updated_at)
VALUES ('john@example.com', 'John Smith', NOW())
ON CONFLICT (email)
DO UPDATE SET
  name = EXCLUDED.name,
  updated_at = EXCLUDED.updated_at;
```

### Conditional Update

```sql
-- Pattern 3: Conditional update
INSERT INTO user_stats (user_id, login_count, last_login)
VALUES ($1, 1, NOW())
ON CONFLICT (user_id)
DO UPDATE SET
  login_count = user_stats.login_count + 1,
  last_login = EXCLUDED.last_login
WHERE user_stats.last_login < EXCLUDED.last_login;
```

## Bonus: Implement "Invisible" Indexes

PostgreSQL doesn't have native invisible indexes like some other databases, but you can simulate this behavior by manipulating the `indisvalid` flag in the `pg_index` system catalog. This technique allows you to temporarily disable an index without dropping it, which is useful for A/B testing query performance.

### Making an Index "Invisible"

```sql
-- Disable an existing index (make it invisible to the query planner)
UPDATE pg_index
SET indisvalid = false
WHERE indexrelid = 'idx_orders_status'::regclass;
```

### Making the Index "Visible" Again

```sql
-- Re-enable the index (make it visible to the query planner)
UPDATE pg_index
SET indisvalid = true
WHERE indexrelid = 'idx_orders_status'::regclass;
```

### Checking Index Status

```sql
-- See which indexes are currently disabled
SELECT
  schemaname,
  tablename,
  indexname,
  indisvalid AS is_valid
FROM pg_indexes
JOIN pg_index ON pg_indexes.indexname = pg_class.relname
JOIN pg_class ON pg_index.indexrelid = pg_class.oid
WHERE NOT indisvalid;
```

**Note**: PostgreSQL itself uses the `indisvalid` flag internally. When you run `CREATE INDEX CONCURRENTLY`, PostgreSQL automatically sets `indisvalid = false` until the index is fully built.

## Conclusion

These 5 tips are quick wins that focus on what's within your control as a developer. Adopting them will make both your life and your DBA/infrastructure teams' lives much easier:

1. **Set `application_name`** - Get instant visibility into which service is doing what
1. **Configure timeouts** - Prevent your application from hanging indefinitely
1. **Use online migrations** - Deploy schema changes without downtime
1. **Split database roles** - Follow the principle of least privilege
1. **Use UPSERT** - Handle failures and retries effectively

Start with `application_name` and timeouts—they take minutes to implement but provide immediate benefits. These practices make your applications more reliable while making everyone's job easier.
