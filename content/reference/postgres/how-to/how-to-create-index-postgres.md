---
title: How to Create Index in Postgres
updated_at: 2025/02/27 12:00:00
---

## Basic Index Creation

The simplest form of index creation uses the `CREATE INDEX` command:

```sql
CREATE INDEX idx_customers_email ON customers (email);
```

This creates a B-tree index (the default type) on the `email` column of the `customers` table. Available index types are: `B-tree`, `Hash`, `GIN (Generalized Inverted Index)`, `GiST (Generalized Search Tree)`, `BRIN (Block Range INdex)`.

## Creating Multi-Column Indexes

To index multiple columns in a single index:

```sql
CREATE INDEX idx_orders_customer_date ON orders (customer_id, order_date);
```

Multi-column indexes are useful for queries that filter on multiple columns together.

## Unique Indexes

To enforce uniqueness across column values:

```sql
CREATE UNIQUE INDEX idx_users_username ON users (username);
```

## Partial Indexes

```sql
CREATE INDEX idx_orders_status ON orders (order_id) WHERE status = 'pending';
```

This is useful when you frequently query only specific subsets of data.

## Expression Indexes

```sql
CREATE INDEX idx_customers_lower_email ON customers (LOWER(email));
```

This enables efficient case-insensitive searches.

## INCLUDE Clause (Covering Indexes)

```sql
CREATE INDEX idx_products_category ON products (category_id) INCLUDE (price, name);
```

This can eliminate the need for table lookups when the included columns are part of the query.

## Concurrent Index Creation

For production environments, use `CONCURRENTLY` to avoid blocking writes:

```sql
CREATE INDEX CONCURRENTLY idx_name ON table_name (column_name);
```

This creates the index without locking the table for writes but takes longer to complete.

## Managing Indexes

### Listing Indexes

```sql
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'your_table';
```

### Dropping Indexes

```sql
DROP INDEX index_name;
```

### Renaming Indexes

```sql
ALTER INDEX index_name RENAME TO new_index_name;
```

## Running Indexes in Production

Managing indexes in production environments requires careful planning and monitoring to maintain database performance and availability.

### Planning Index Operations

1. **Maintenance Windows**: Schedule index creation, rebuilding, or removal during periods of low database activity.

2. **Impact Assessment**: Before creating a new index on large tables, estimate the required time and disk space using similar tables or by testing in a staging environment.

3. **Incremental Implementation**: Apply index changes incrementally rather than rebuilding all indexes simultaneously.

### Concurrent Operations

<HintBlock type="info">

You can enforce `CONCURRENTLY` in [Bytebase SQL Review rules](<(/docs/sql-review/review-rules/#index.create-concurrently)>).

</HintBlock>

Always use the `CONCURRENTLY` option in production to avoid locking tables:

```sql
CREATE INDEX CONCURRENTLY idx_transactions_date ON transactions (transaction_date);
```

Similarly, for dropping indexes:

```sql
DROP INDEX CONCURRENTLY idx_transactions_date;
```

Note that concurrent operations:

- Take longer to complete
- Require more resources
- Can fail if there are conflicting operations

### Monitoring Index Health

Regularly monitor your indexes in production:

1. **Size and Bloat**:

```sql
SELECT pg_size_pretty(pg_relation_size('idx_name')) AS index_size;
```

2. **Usage Statistics**:

```sql
SELECT schemaname, relname, indexrelname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

3. **Missing Indexes** - Identify queries that could benefit from indexes:

```sql
SELECT * FROM pg_stat_statements
WHERE query ILIKE '%your_table%'
ORDER BY total_time DESC;
```

### Index Maintenance

1. **Reindexing** - Rebuild bloated indexes:

```sql
REINDEX CONCURRENTLY INDEX idx_name;
```

2. **Automated Maintenance** - Set up regular maintenance jobs to:
   - Rebuild bloated indexes
   - Remove unused indexes
   - Update statistics with `ANALYZE`
