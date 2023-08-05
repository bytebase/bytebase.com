---
title: Database as a Service (DBaaS) Provider 2023
author: Tianzhou
published_at: 2023/07/15 9:00:00
feature_image: /content/blog/database-as-a-service-dbaas-provider/cover.webp
tags: Industry
description: List of Database-as-a-Service providers in 2023.
---

Database-as-a-service (DBaaS) is a cloud computing service model where a third-party provider hosts and maintains a database for customers. This allows customers to use a database without having to set up and manage the underlying infrastructure themselves.

[Bytebase](/) needs to integrate with different DBaaS providers to manage their databases. And when talking with our customers, the hosting provider is a common topic. Below we compile a non-exhausitive list of the DBaaS providers on the market.
The list is grouped by database types.

## MySQL

- [AWS RDS for MySQL](https://aws.amazon.com/rds/mysql/)
- [AWS Aurora for MySQL](https://aws.amazon.com/rds/aurora/)
- [Google Cloud SQL for MySQL](https://cloud.google.com/sql/mysql)
- [Azure Database for MySQL](https://azure.microsoft.com/en-us/products/mysql)
- [Aiven for MySQL](https://aiven.io/mysql)
- [DigitalOcean for MySQL](https://www.digitalocean.com/products/managed-databases-mysql)
- [PlanetScale](https://planetscale.com/)
- [TiDB Serverless](https://www.pingcap.com/tidb-serverless/)

## PostgreSQL

- [AWS RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/)
- [AWS Aurora for PostgreSQL](https://aws.amazon.com/rds/aurora/)
- [Google Cloud SQL for PostgreSQL](https://cloud.google.com/sql/postgresql)
- [Google Cloud AlloyDB for PostgreSQL](https://cloud.google.com/alloydb)
- [Azure Database for PostgreSQL](https://azure.microsoft.com/en-us/products/postgresql)
- [Aiven for PostgreSQL](https://aiven.io/postgresql)
- [DigitalOcean for PostgreSQL](https://www.digitalocean.com/products/managed-databases-postgresql)
- [Neon](https://neon.tech)
- [CockroachDB](https://www.cockroachlabs.com/)
- [Supabase](https://supabase.com/database)
- [render](https://render.com/docs/databases)
- [crunchydata](https://www.crunchydata.com/products/crunchy-bridge)

## MongoDB

- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Amazon DocumentDB (with MongoDB compatibility)](https://aws.amazon.com/documentdb/)
- [Azure Cosmos DB for MongoDB](https://azure.microsoft.com/en-us/products/cosmos-db/)
- [DigitalOcean for MongoDB](https://www.digitalocean.com/products/managed-databases-mongodb)

## Redis

- [Redis Cloud](https://redis.com/redis-enterprise-cloud/overview/)
- [Amazon MemoryDB for Redis](https://aws.amazon.com/memorydb/)
- [Google Cloud Memorystore for Redis](https://cloud.google.com/memorystore)
- [Azure Cache for Redis](https://azure.microsoft.com/en-us/products/cache)
- [DigitalOcean Managed Redis](https://www.digitalocean.com/products/managed-databases-redis)
- [upstash Redis](https://upstash.com/)

## Analytics

_Because the OLAP databases are segmented, so we put different vendors under this single Analytics umbrella_

- [Snowflake](https://www.snowflake.com/en/)
- [Google BigQuery](https://cloud.google.com/bigquery)
- [Amazon Redshift](https://aws.amazon.com/redshift/)
- [Azure Synapse Analytics](https://azure.microsoft.com/en-us/products/synapse-analytics)
- [ClickHouse](https://clickhouse.com/)
- [Firebolt](https://www.firebolt.io/)

---

It's also common that different database types co-exist inside an organization. And if you want to manage the development
lifecycle for all of them, please check out [Bytebase](/).

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)
