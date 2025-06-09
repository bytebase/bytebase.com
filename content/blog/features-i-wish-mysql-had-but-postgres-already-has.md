---
title: 'Features I Wish MySQL Had but Postgres Already Has'
author: Tianzhou
updated_at: 2025/06/09 20:00:00
feature_image: /content/blog/features-i-wish-mysql-had-but-postgres-already-has/banner.webp
tags: Industry
description: 'Areas where PostgreSQL shines and MySQL falls short.'
---

At Bytebase, we work extensively with PostgreSQL and MySQL. Both databases have pros and cons. In this post, we’ll highlight where PostgreSQL shines and MySQL falls short.

## Transactional DDL

One of PostgreSQL's most underrated features is its support for transactional DDL (Data Definition Language). In PostgreSQL, you can wrap schema changes in transactions and roll them back if something goes wrong. Even better, PostgreSQL supports savepoints within DDL transactions for fine-grained control.

```sql
-- PostgreSQL: This works!
BEGIN;
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
SAVEPOINT after_column_add;
CREATE INDEX idx_users_email_verified ON users(email_verified);
-- Oops, index creation failed, but we can keep the column
ROLLBACK TO SAVEPOINT after_column_add;
-- Try a different index approach
CREATE INDEX CONCURRENTLY idx_users_email_verified ON users(email_verified);
COMMIT;
```

In MySQL, DDL statements are auto-committed, meaning there's no going back once you execute them. This makes database migrations risky, especially in production environments.

## Custom Types and Domains

PostgreSQL allows you to create custom data types and domains, providing better data modeling capabilities and stronger type safety.

```sql
-- PostgreSQL: Create custom types
CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');
CREATE DOMAIN email AS TEXT CHECK (VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email email,  -- Custom domain with validation
    current_mood mood  -- Custom enum type
);
```

MySQL's ENUM support is limited and doesn't offer the same flexibility. Custom domains with built-in validation rules help enforce data integrity at the database level, reducing the need for application-level validation and ensuring consistency across all applications that access the database.

## Array Types

PostgreSQL's native array support is incredibly powerful for storing and querying lists of values without requiring separate tables.

```sql
-- PostgreSQL: Arrays are first-class citizens
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT,
    tags TEXT[],  -- Array of tags
    view_counts INTEGER[]  -- Array of daily view counts
);

-- Query with array operations
SELECT * FROM articles
WHERE 'postgresql' = ANY(tags)
AND array_length(view_counts, 1) > 7;
```

It's worth noting that PostgreSQL arrays don't support referential integrity constraints yet - you can't have foreign key relationships on array elements. Despite this limitation, native array support eliminates the need for many-to-many relationship tables in certain scenarios and can significantly simplify data models.

## Common Table Expressions (CTEs)

PostgreSQL has supported CTEs since version 8.4 (2009), while MySQL only added basic CTE support in version 8.0 (2018). PostgreSQL's implementation is more mature and feature-complete.

```sql
-- PostgreSQL: Recursive CTEs for hierarchical data
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: subordinates
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy ORDER BY level, name;
```

PostgreSQL's CTE implementation supports more advanced features like `MATERIALIZED` and `NOT MATERIALIZED` hints, giving you control over query optimization strategies.

## Row Level Security (RLS)

PostgreSQL's Row Level Security allows you to implement fine-grained access control directly at the database level.

```sql
-- PostgreSQL: Enable RLS and create policies
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy for user-specific data
CREATE POLICY user_documents ON documents
    FOR ALL TO app_user
    USING (owner_id = current_setting('app.current_user_id')::INTEGER);

-- Policy for multi-tenant applications
CREATE POLICY tenant_isolation ON documents
    FOR ALL TO app_user
    USING (tenant_id = current_setting('app.tenant_id')::INTEGER);

-- Users can only see their own documents automatically
SELECT * FROM documents;  -- Only returns user's documents in their tenant
```

While RLS is excellent for simple `user_id` or `tenant_id` filtering, it becomes complex for more sophisticated authorization rules involving roles, permissions, or dynamic relationships. However, it still serves as a valuable defense-in-depth mechanism in your database security chain, ensuring that even if application-level security fails, sensitive data remains protected.

MySQL lacks built-in RLS, forcing developers to implement access control in application code or through complex view structures.

## Partial Indexes

PostgreSQL allows you to create indexes with WHERE clauses, making them smaller and more efficient for specific query patterns.

```sql
-- PostgreSQL: Index only active users
CREATE INDEX idx_active_users ON users (last_login)
WHERE status = 'active';

-- Index only pending orders
CREATE INDEX idx_pending_orders ON orders (created_at)
WHERE status = 'pending';
```

MySQL requires you to index the entire column, leading to larger indexes and potentially slower performance when you only need to optimize queries for a subset of data.

## Spatial Support

While both databases support spatial data, PostgreSQL's PostGIS extension provides far more comprehensive geospatial capabilities.

```sql
-- PostgreSQL with PostGIS: Advanced spatial queries
SELECT name,
       ST_Distance(location, ST_MakePoint(-73.935242, 40.730610)) as distance_km
FROM restaurants
WHERE ST_DWithin(location, ST_MakePoint(-73.935242, 40.730610), 1000)  -- Within 1km
ORDER BY location <-> ST_MakePoint(-73.935242, 40.730610)  -- KNN search
LIMIT 10;
```

MySQL's spatial support, while improving, doesn't match the depth and performance of PostGIS. For applications requiring serious geospatial functionality, PostgreSQL with PostGIS is the clear winner.

## Vector Support

With the rise of AI, PostgreSQL has embraced vector storage and similarity search through pgvector.

```sql
-- PostgreSQL with pgvector: Store and search embeddings
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding VECTOR(1536)  -- OpenAI embedding dimension
);

-- Find similar documents using cosine similarity
SELECT content, 1 - (embedding <=> '[0.1, 0.2, ...]'::vector) AS similarity
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 5;
```

MySQL recently added vector support in version 9.0 with basic VECTOR data types and limited distance functions, but PostgreSQL's pgvector extension remains more mature with broader operator support, better indexing options (IVFFlat, HNSW), and a richer ecosystem of vector operations.

## Parser

PostgreSQL adheres more closely to SQL standards and provides better error messages and more predictable behavior. MySQL's parser has historically been more lenient, which can lead to subtle bugs and makes it harder to write portable SQL.

For tooling developers, the [libpg_query](https://github.com/pganalyze/libpg_query) project extracts PostgreSQL's actual parser code, providing 100% compatibility with PostgreSQL's SQL parsing behavior. For MySQL, the most widely used parser is from [TiDB](https://github.com/pingcap/tidb/tree/master/pkg/parser), but it has compatibility differences since it was built specifically for TiDB's needs rather than pure MySQL compatibility.

## Openness

PostgreSQL pairs a permissive PostgreSQL License (akin to BSD) with an extensible architecture, giving developers full freedom to embed, modify, or commercialize the database without license friction. Its community operates in the open: design discussions happen on the public [pgsql-hackers mailing list](https://www.postgresql.org/list/pgsql-hackers/), and every commit carries an explanatory message—see, for instance, the recent PG 18 additions of [virtual generated columns](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commit;h=83ea6c54025bea67bcd4949a6d58d3fc11c3e21b) and [NOT VALID NOT NULL constraints](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commitdiff;h=a379061a22a8fdf421e1a457cc6af8503def6252).

By contrast, MySQL’s dual-licensing model (GPL plus commercial) restricts downstream choices, and its main public touchpoint is an [opaque bug tracker](https://bugs.mysql.com/)—some issues are hidden from both the community and the original reporter.

As MongoDB’s CEO put it on the FY26 Q1 earnings call:

![mongo-on-pg-openness](/content/blog/features-i-wish-mysql-had-but-postgres-already-has/mongo-on-pg-openness.webp)

_Open source, open standard, and most importantly, not owned by any one vendor._

PostgreSQL embodies that ideal in a way MySQL cannot.
