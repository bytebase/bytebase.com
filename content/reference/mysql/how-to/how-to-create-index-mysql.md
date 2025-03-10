---
title: How to CREATE INDEX in MySQL
updated_at: 2025/03/10 12:00:00
---

_Official documentation: [CREATE INDEX](https://dev.mysql.com/doc/refman/8.0/en/create-index.html)_

<HintBlock type="info">

When designing indexes, consider the query patterns that will use them. Not every column needs an index, and too many indexes can slow down write operations and increase storage requirements.

Organizations often enforce index standards. You can implement [approval processes](/docs/administration/custom-approval/) or [automated schema reviews](/docs/sql-review/review-rules/#column) via Bytebase.

</HintBlock>

## Basic Index Creation

The simplest form of index creation uses the `CREATE INDEX` command:

```sql
CREATE INDEX idx_customers_email ON customers (email);
```

This creates a BTREE index (the default type) on the `email` column of the `customers` table.

## Index Types in MySQL

MySQL supports several index types: `BTREE`, `HASH`, `FULLTEXT`, and `SPATIAL`.

```sql
-- B-TREE index (default)
CREATE INDEX idx_name ON table_name (column_name);

-- HASH index (only for MEMORY tables)
CREATE INDEX idx_hash ON memory_table (column_name) USING HASH;

-- FULLTEXT index for text searching
CREATE FULLTEXT INDEX idx_fulltext ON articles (title, body);

-- SPATIAL index for geographic data
CREATE SPATIAL INDEX idx_location ON stores (location);
```

## Creating Multi-Column Indexes

To index multiple columns in a single index:

```sql
CREATE INDEX idx_orders_customer_date ON orders (customer_id, order_date);
```

Multi-column indexes are useful for queries that filter on multiple columns together, particularly when following the leftmost prefix principle.

## Unique Indexes

To enforce uniqueness across column values:

```sql
CREATE UNIQUE INDEX idx_users_username ON users (username);
```

## Index Prefix (Column Partial Indexing)

For large string columns, you can index just a prefix of the column:

```sql
-- Index only the first 20 characters of the description
CREATE INDEX idx_products_description ON products (description(20));
```

This is especially useful for `TEXT`, `BLOB`, or long `VARCHAR` columns.

## Functional (Expression) Indexes

MySQL 8.0.13+ supports functional indexes:

```sql
-- Create index on a function result
CREATE INDEX idx_customers_lower_email ON customers ((LOWER(email)));
```

This enables efficient case-insensitive searches.

## Invisible Indexes

In MySQL 8.0+, you can create invisible indexes for testing purposes:

```sql
CREATE INDEX idx_test ON orders (status) INVISIBLE;
```

Invisible indexes are maintained but not used by the optimizer unless explicitly requested.

## FULLTEXT Indexes

For natural language searches:

```sql
-- Create FULLTEXT index
CREATE FULLTEXT INDEX idx_articles_content ON articles (title, content);

-- Query using FULLTEXT
SELECT * FROM articles
WHERE MATCH(title, content) AGAINST('keyword' IN NATURAL LANGUAGE MODE);
```

## Descending Indexes

MySQL 8.0+ supports explicit descending indexes:

```sql
CREATE INDEX idx_orders_date_desc ON orders (order_date DESC);
```

## Managing Indexes

### Listing Indexes

```sql
SHOW INDEXES FROM table_name;
```

### Dropping Indexes

```sql
DROP INDEX index_name ON table_name;
```

### Renaming Indexes (Requires dropping and recreating)

```sql
-- MySQL doesn't support direct renaming of indexes
DROP INDEX old_index_name ON table_name;
CREATE INDEX new_index_name ON table_name (column_name);
```

## Running Indexes in Production

Managing indexes in production environments requires careful planning and monitoring to maintain database performance and availability.

### Planning Index Operations

1. **Maintenance Windows**: Schedule index creation or removal during periods of low database activity.

2. **Impact Assessment**: Before creating a new index on large tables, estimate the required time and disk space using similar tables or by testing in a staging environment.

3. **Online DDL**: Use [MySQL's online DDL capabilities](https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl-operations.html) when available:

```sql
ALTER TABLE orders ADD INDEX idx_status (status), ALGORITHM=INPLACE, LOCK=NONE;
```

### Monitoring Index Health

Regularly monitor your indexes in production:

1. **Size Information**:

```sql
SELECT
    table_name,
    index_name,
    stat_value * @@innodb_page_size as size_bytes,
    ROUND((stat_value * @@innodb_page_size) / (1024 * 1024), 2) as size_mb
FROM mysql.innodb_index_stats
WHERE stat_name = 'size'
AND database_name = 'your_database'
ORDER BY size_mb DESC;
```

2. **Usage Statistics**:

```sql
SELECT * FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE object_schema = 'your_database'
AND object_name = 'your_table';
```

3. **Duplicate or Redundant Indexes**:

```sql
-- Using sys schema (MySQL 5.7+)
SELECT * FROM sys.schema_redundant_indexes
WHERE table_schema = 'your_database';
```

### Index Maintenance

1. **Optimization** - Rebuild indexes and reclaim space:

```sql
OPTIMIZE TABLE your_table;
```

2. **Analyze** - Update index statistics:

```sql
ANALYZE TABLE your_table;
```

3. **Automated Maintenance** - Set up regular maintenance jobs to:
   - Rebuild fragmented indexes with `OPTIMIZE TABLE`
   - Update statistics with `ANALYZE TABLE`
   - Monitor and remove unused indexes
