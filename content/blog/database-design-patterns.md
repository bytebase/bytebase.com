---
title: 'Database Design Patterns Every Developer Should Know'
author: Adela
updated_at: 2026/03/11 09:00
feature_image: /content/blog/database-design-patterns/banner.webp
tags: Explanation
description: 'Six database design patterns for production systems: normalization, star schema, EAV, polymorphic associations, multi-tenancy, and anti-patterns.'
---

Database design patterns are reusable structural approaches to organizing tables, relationships, and indexes in a relational database. Picking the wrong pattern early on is expensive. The pattern you choose defines your query performance ceiling, your data integrity guarantees, and how painful your next schema migration will be.

This guide covers six patterns that show up in most production systems, the trade-offs behind each, and the anti-patterns that cause real-world outages.

## What are database design patterns?

A database design pattern is a repeatable solution to a common data modeling problem. It is a structural decision about how tables relate to each other, how data is split or combined, and where you put the boundaries between entities. Some patterns optimize for write safety (normalization), others for read speed (star schema), others for flexibility (EAV, JSONB columns), and others for organizational isolation (multi-tenancy). Most production databases use several patterns together.

## Normalization (1NF through 3NF)

Normalization removes redundant data by splitting it across related tables. The goal is to make sure each fact is stored exactly once, so updates only happen in one place.

**First Normal Form (1NF):** Every column holds a single value. No comma-separated lists, no arrays stuffed into a VARCHAR. Each row is uniquely identifiable by a [primary key](/blog/primary-key-vs-foreign-key/).

**Second Normal Form (2NF):** Every non-key column depends on the entire primary key, not just part of it. This matters when you have composite keys. If an `order_items` table is keyed on `(order_id, product_id)`, the `product_name` depends only on `product_id` and should live in a separate `products` table.

**Third Normal Form (3NF):** Non-key columns depend only on the primary key, not on other non-key columns. If a `customers` table has `city` and `state`, and `city` determines `state`, then `state` should move to a `cities` table. This eliminates transitive dependencies.

### When to denormalize

3NF is the default target for transactional systems. But read-heavy workloads (dashboards, reports, search) often need denormalized data to avoid expensive multi-table joins. Denormalization means deliberately adding redundancy, like storing `total_orders_count` directly on a customer row instead of computing `COUNT(*)` from the orders table on every request.

The rule: start normalized, denormalize when you have measured evidence that a specific query is too slow.

## Star schema and snowflake schema

These patterns are for analytical workloads, not transactional ones.

**Star schema** puts a central fact table (containing measures like revenue, quantity, or duration) surrounded by denormalized dimension tables (date, product, customer, region). Each query is one join from fact to dimension. It is simple and fast.

**Snowflake schema** normalizes the dimension tables into sub-dimensions. A `location` dimension splits into `city → state → country` tables. This saves storage and improves data integrity at the cost of more joins.

| | Star schema | Snowflake schema |
|---|:-:|:-:|
| **Dimension tables** | Denormalized | Normalized into sub-tables |
| **Query joins** | Fewer | More |
| **Storage** | Higher (redundant data) | Lower |
| **Query speed** | Faster | Slower |
| **Best for** | Dashboards, ad-hoc BI | Complex hierarchies, storage-sensitive environments |

Modern columnar warehouses (Snowflake, BigQuery, Redshift) have optimized away much of the performance penalty of snowflake schemas, so the choice is less about speed and more about how your team thinks about the data. Star schema remains the default for most [analytics use cases](/blog/top-database-schema-diagram-tools/) because it is easier to understand and query.

## Entity-Attribute-Value (EAV)

EAV stores data in three columns: `entity_id`, `attribute_name`, and `value`. Instead of a wide table with one column per attribute, each attribute becomes a row.

```sql
-- EAV table
CREATE TABLE product_attributes (
    entity_id   INT REFERENCES products(id),
    attribute   VARCHAR(100),
    value       VARCHAR(255)
);

-- A T-shirt has size and color; a laptop has cpu and ram_gb.
-- Both go in the same table.
INSERT INTO product_attributes VALUES (1, 'size', 'XL');
INSERT INTO product_attributes VALUES (1, 'color', 'blue');
INSERT INTO product_attributes VALUES (2, 'cpu', 'M3 Pro');
INSERT INTO product_attributes VALUES (2, 'ram_gb', '36');
```

**When it looks attractive:** Product catalogs with hundreds of optional attributes. Clinical records with thousands of possible fields per patient.

**Why it usually fails:** Every query that retrieves multiple attributes requires self-joins or pivot operations. Filtering is slow because `value` is always VARCHAR (no type checking, no numeric indexing). Magento 1.x used EAV for product data and was notorious for poor query performance at scale. PostgreSQL benchmarks show that JSONB is over 50,000x faster than EAV for unindexed queries, while producing a database 3x smaller.

**The modern alternative:** Use typed columns for core fields and a JSONB column for the variable remainder:

```sql
CREATE TABLE products (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    price       DECIMAL(10,2) NOT NULL,
    category_id INT REFERENCES categories(id),
    attributes  JSONB DEFAULT '{}'
);
```

Rule of thumb: if you write `WHERE attributes->>'status' = 'active'` in most queries, `status` should be a proper column, not buried in JSON.

## Polymorphic associations

A polymorphic association uses a single [foreign key](/blog/primary-key-vs-foreign-key/) column plus a "type" column to reference rows in multiple different tables.

```sql
CREATE TABLE comments (
    id              SERIAL PRIMARY KEY,
    body            TEXT,
    commentable_id  INT,          -- could point to posts, photos, or videos
    commentable_type VARCHAR(50)  -- 'Post', 'Photo', or 'Video'
);
```

This pattern is common in Rails and Django ORMs. The problem: the database cannot enforce a foreign key constraint because `commentable_id` points to different tables depending on `commentable_type`. That means no CASCADE deletes, no referential integrity checks, and orphaned records that accumulate silently.

GitLab's engineering documentation explicitly recommends against polymorphic associations. The alternative: separate association tables per type.

```sql
CREATE TABLE post_comments (
    id      SERIAL PRIMARY KEY,
    body    TEXT,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE photo_comments (
    id       SERIAL PRIMARY KEY,
    body     TEXT,
    photo_id INT REFERENCES photos(id) ON DELETE CASCADE
);
```

More tables, but the database enforces every relationship. This is almost always the right trade-off for systems that need long-term data integrity.

## Multi-tenant patterns

Multi-tenancy decides how you isolate customer data when multiple organizations share the same application. There are three standard approaches, each with a different cost-isolation trade-off.

**Shared schema (pool model):** All tenants share the same tables. A `tenant_id` column on every table separates the data. Cheapest and simplest, but a missing `WHERE tenant_id = ?` filter can leak data across tenants.

**Schema-per-tenant:** Each tenant gets a separate schema within the same database instance. Supported in PostgreSQL and SQL Server, but not in MySQL. Bytebase's analysis [found that it introduces complexity comparable to database-per-tenant](/blog/multi-tenant-database-architecture-patterns-explained/) without proportional isolation benefits.

**Database-per-tenant (silo model):** Each tenant gets a fully separate database. Maximum isolation, but the highest operational cost. Managing schema migrations across hundreds of databases requires [dedicated tooling](/blog/how-to-handle-database-schema-change/).

| | Shared schema | Schema-per-tenant | Database-per-tenant |
|---|:-:|:-:|:-:|
| **Cost** | Lowest | Medium | Highest |
| **Data isolation** | Weakest | Medium | Strongest |
| **Per-tenant customization** | None | Some | Full |
| **Migration complexity** | One migration | Per-schema | Per-database |
| **Best for** | Startups, MVPs | Mid-tier SaaS | Enterprise, regulated industries |

Start with shared schema unless you have a compliance requirement (HIPAA, GDPR data residency) that demands physical isolation. PostgreSQL's [row-level security](/blog/postgres-row-level-security-limitations-and-alternatives/) can add a database-enforced isolation layer on top of application-level `tenant_id` filtering.

## Anti-patterns to avoid

These are the design decisions that cause production incidents.

**The God Table.** One table stores everything: users, orders, products, logs. It starts with 50 columns and grows to 200. Splitting into focused tables typically reduces query times by 80% or more.

**Missing primary keys.** Always use a [surrogate primary key](/blog/choose-primary-key-uuid-or-auto-increment/) (auto-increment integer or UUID). Natural keys like name + date of birth lead to collisions and mixed-up records.

**Over-normalization.** Splitting data across too many tables where simple queries require 10+ joins. A fintech startup decomposed currency codes, transaction types, and timestamp components into separate lookup tables, and the system collapsed under peak load.

**Storing money as FLOAT.** Floating-point arithmetic causes rounding errors. `0.1 + 0.2 = 0.30000000000000004` in most languages. Use DECIMAL(10,2) for monetary values.

**No indexes on filtered columns.** Index the columns that appear in your WHERE clauses and JOIN conditions, and use EXPLAIN to validate. Too many indexes slow writes; too few cause full table scans.

**Wrong data types.** Dates stored as VARCHAR prevent range queries. Enums stored as freeform strings allow typos. Use DATE/TIMESTAMP for times, DECIMAL for money, and ENUM or lookup tables for fixed value sets.

Getting the pattern right at the [schema design](/blog/top-database-schema-design-best-practices/) stage is cheaper than fixing it in production.

## How Bytebase helps enforce design patterns

[Bytebase](/) is a database DevSecOps platform that catches pattern violations before they reach production. Its [SQL review](/blog/what-is-sql-review/) policy can enforce rules like:

- [Every table must have a primary key](/blog/sql-review-rule-explained-require-primary-key/)
- Column naming must follow conventions (e.g., `_id` suffix for foreign keys, `_at` suffix for timestamps)
- [CASCADE operations must be explicitly approved](/blog/sql-review-rule-explained-prohibit-cascade/)
- Specific column types are required for specific data (TIMESTAMP for dates, DECIMAL for currency)

These rules run automatically on every [schema change](/blog/what-is-database-schema/) before it is applied, which means pattern violations get caught in review, not in a 3 AM incident.

## Further readings

- [Top 10 Database Schema Design Best Practices](/blog/top-database-schema-design-best-practices/)
- [What is a Database Schema?](/blog/what-is-database-schema/)
- [Multi-Tenant Database Architecture Patterns Explained](/blog/multi-tenant-database-architecture-patterns-explained/)
- [Primary Key vs Foreign Key](/blog/primary-key-vs-foreign-key/)
- [DDL vs DML in SQL](/blog/what-is-ddl-and-dml-in-sql-database/)
- [How to Handle Database Migration / Schema Change](/blog/how-to-handle-database-schema-change/)
