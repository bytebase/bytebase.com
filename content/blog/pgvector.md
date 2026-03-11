---
title: 'pgvector: How to Add Vector Search to PostgreSQL'
author: Adela
updated_at: '2026/03/09 09:00'
feature_image: /content/blog/pgvector/banner.webp
tags: Explanation
keypage: true
description: 'pgvector adds vector storage and similarity search to PostgreSQL. Learn how to install it, query embeddings, build indexes, and decide when it is enough.'
---

pgvector is a PostgreSQL extension that lets you store vectors in a table column and search them by similarity. It reached version 0.8.2 in late 2025 and is now included by default on most hosted PostgreSQL services (AWS RDS, Google Cloud SQL, Supabase, Neon). If you already run PostgreSQL, you can add vector search without a separate database.

Vectors are arrays of numbers that represent meaning. A sentence about "database migrations" and a sentence about "schema changes" would have vectors that sit close to each other, even though they share no keywords. This closeness is what makes vector search useful for AI applications: it finds semantically related content rather than exact word matches.

## What pgvector stores

An embedding model converts text into a list of numbers. Send "I love coffee" to the model and it returns 1,536 numbers. Send "I enjoy espresso" and it returns a nearly identical list — even though the words are completely different. Send "database migration" and the numbers look nothing like either of those. The model learned these relationships from patterns in text; you don't define them yourself.

pgvector adds a column type to PostgreSQL that stores these lists. You set the dimension count when you create the column (1,536 for OpenAI's `text-embedding-3-small`) and it stays fixed. When you search, pgvector finds the rows whose numbers are closest to your query — which means closest in meaning, not in wording.

## Installing pgvector

On a self-hosted PostgreSQL server:

```bash
# Ubuntu/Debian
sudo apt install postgresql-16-pgvector

# macOS with Homebrew
brew install pgvector
```

Then enable it inside the database:

```sql
CREATE EXTENSION vector;
```

On hosted services (RDS, Google Cloud SQL, Supabase, Neon), the package is already installed. `CREATE EXTENSION vector;` is all you need.

## Storing and querying vectors

You add a `vector` column to any table and store embeddings like any other value:

```sql
CREATE TABLE documents (
  id        SERIAL PRIMARY KEY,
  content   TEXT,
  embedding vector(1536)
);
```

In practice, you generate embeddings in application code by sending text to an embedding model (OpenAI, Cohere, a local model), then insert the returned array. To search, you pass a query embedding and order by distance:

```sql
-- Find the 5 documents most similar to a query
SELECT content, embedding <=> $1 AS distance
FROM documents
ORDER BY embedding <=> $1
LIMIT 5;
```

The `<=>` operator computes cosine distance, the most common choice for text. pgvector also supports L2 distance (`<->`) and inner product (`<#>`). The key advantage over dedicated vector databases: you can combine vector search with any SQL filter or join in the same query.

## Indexing for performance

Without an index, every similarity query scans every row. That works fine up to ~100,000 rows but slows down beyond that. Add an HNSW index to switch to approximate nearest-neighbor search, which is much faster at the cost of very slightly less precision:

```sql
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);
```

HNSW can be created on an empty table and handles new inserts without rebuilding. Use `CREATE INDEX CONCURRENTLY` on large tables to avoid locking. pgvector also has an IVFFlat index type for lower memory usage, but HNSW is the better default for most cases.

## pgvector vs. a dedicated vector database

The main alternative to pgvector is a purpose-built vector database: Pinecone, Weaviate, Qdrant, or Milvus. The right choice depends on scale and operational complexity.

| Factor | pgvector | Dedicated vector DB |
|--------|----------|---------------------|
| Setup | `CREATE EXTENSION` | Separate service to run |
| SQL joins and filters | Yes, natively | Metadata filtering only |
| ACID transactions | Yes | Varies |
| Comfortable scale | Up to ~10M rows | Hundreds of millions |
| Operational overhead | Existing PostgreSQL infra | New service to manage |
| Managed options | RDS, Supabase, Neon | Pinecone, Weaviate Cloud |

For most teams building a first RAG pipeline or adding semantic search to an existing product, pgvector is the right starting point. You get vector search without adding infrastructure, and your vectors live next to your relational data where you can query them together.

Purpose-built databases make sense at very large scale (50M+ vectors), when you need extremely low query latency, or when you want built-in hybrid search. [PostgreSQL vs MongoDB](/blog/postgres-vs-mongodb/) covers a related trade-off: MongoDB Atlas has its own vector search, and if your data is already there, it may be the simpler path.

## pgvector and schema migrations

Adding pgvector to a production database is a schema change like any other: you enable an extension, add columns, and build indexes. A few things worth knowing:

- HNSW index builds are CPU-intensive. Use `CREATE INDEX CONCURRENTLY` on production tables.
- Switching embedding models means changing the dimension count, which requires dropping the old column and backfilling all embeddings. Plan this as a multi-step migration.

pgvector follows the same lifecycle as any other PostgreSQL extension: enable it in staging first, verify the version matches production, then roll it out. [What is database migration?](/blog/what-is-database-migration/) covers safe sequencing. pgvector is also consistently listed among the [top PostgreSQL extensions](/blog/top-postgres-extension/) in active use.

[Bytebase](https://www.bytebase.com) handles PostgreSQL schema migrations with a review step before SQL runs in production, keeping a full history of every change — including extension additions and index builds. For teams managing pgvector alongside other [PostgreSQL schema changes](/blog/postgres-schema-migration-without-downtime/), that review step catches problems before they reach production.

## FAQ

**Does pgvector work with all PostgreSQL hosting providers?**
Most major providers include it as of 2024: AWS RDS (PostgreSQL 15.2+), Google Cloud SQL, Azure Database for PostgreSQL, Supabase, Neon, and Render.

**How many vectors can pgvector handle?**
Most teams run comfortably up to 5-10 million vectors on a well-sized PostgreSQL instance. Approximate indexes (HNSW, IVFFlat) help the most past 100,000 rows. Beyond ~50M vectors, a dedicated vector database is worth evaluating.

**Is pgvector production-ready?**
Yes. pgvector 0.7.0 (March 2024) added HNSW indexing, which was the main gap for production workloads. Version 0.8.2 is the current stable release. It runs in production at Supabase, Neon, and many teams building RAG applications.
