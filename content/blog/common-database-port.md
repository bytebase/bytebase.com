---
title: Common Database Port Numbers in 2025
author: Ayra
updated_at: 2025/04/11 12:00:00
feature_image: /content/blog/common-database-port/banner.webp
tags: Industry
description: A comprehensive reference guide to standard port numbers used by popular database systems in 2025
---

## Relational Databases

| Database System      | Default Port | Notes                                                    |
| -------------------- | ------------ | -------------------------------------------------------- |
| MySQL / MariaDB      | 3306         | MySQL's classic port; MariaDB adopted the same           |
| PostgreSQL           | 5432         | Postgres convention since the early days                 |
| Oracle Database      | 1521         | The TNS Listener port; 2483/2484 for TCPS                |
| Microsoft SQL Server | 1433         | Default instance port; named instances use dynamic ports |
| IBM Db2              | 50000        | Standard port; additional services use 50001-50050 range |
| SQLite               | N/A          | File-based database with no network port                 |

## NoSQL Databases

| Database System | Default Port | Notes                                                        |
| --------------- | ------------ | ------------------------------------------------------------ |
| MongoDB         | 27017        | 27018 (shard server), 27019 (config server)                  |
| Redis           | 6379         | Often used with Sentinel (26379) and Cluster (16379)         |
| Cassandra       | 9042         | CQL native transport port; 7000 for inter-node communication |
| Elasticsearch   | 9200         | REST API; 9300 for inter-node communication                  |
| CouchDB         | 5984         | HTTP API; 6984 for HTTPS                                     |
| DynamoDB        | N/A          | AWS service with no direct port access                       |
| HBase           | 16000        | Master port; 16020/16030 for region servers                  |
| Couchbase       | 8091         | Web console; 8092 (API), 8093 (query), 11210 (data)          |
| InfluxDB        | 8086         | HTTP API port; 8088 for RPC service                          |
| ScyllaDB        | 9042         | CQL compatible port (same as Cassandra)                      |

## NewSQL

| Database System      | Default Port | Notes                                               |
| -------------------- | ------------ | --------------------------------------------------- |
| CockroachDB          | 26257        | SQL interface; 8080 for admin UI                    |
| TiDB                 | 4000         | SQL interface; 10080 for status                     |
| ClickHouse           | 9000         | Native protocol; 8123 for HTTP interface            |
| SingleStore (MemSQL) | 3306         | MySQL-compatible port; 9104 for Ops UI              |
| YugabyteDB           | 5433         | 5433 For YSQL; 9042 for YCQL (Cassandra compatible) |
| QuestDB              | 8812         | PostgreSQL wire protocol; 9000 for REST             |

## Graph Databases

| Database System | Default Port | Notes                                           |
| --------------- | ------------ | ----------------------------------------------- |
| Neo4j           | 7687         | Bolt protocol; 7474 for HTTP and 7473 for HTTPS |
| ArangoDB        | 8529         | HTTP API port                                   |
| Amazon Neptune  | N/A          | AWS service without direct port access          |
| JanusGraph      | N/A          | Uses underlying storage ports                   |
| TigerGraph      | 14240        | GraphStudio UI port                             |
| DGraph          | 8080         | HTTP port; 9080 for gRPC                        |

## Vector Databases

| Database System | Default Port | Notes                              |
| --------------- | ------------ | ---------------------------------- |
| Pinecone        | N/A          | Cloud service with API access only |
| Milvus          | 19530        | Data service port                  |
| Weaviate        | 8080         | REST API port                      |
| Qdrant          | 6333         | gRPC port; 6334 for REST API       |
| Chroma          | 8000         | API server port                    |

## Database Management Tools

| Tool            | Default Port | Notes                     |
| --------------- | ------------ | ------------------------- |
| phpMyAdmin      | 80/443       | Web server ports          |
| pgAdmin         | 80/443       | Web server ports          |
| MongoDB Compass | N/A          | Desktop client            |
| DBeaver         | N/A          | Desktop client            |
| Adminer         | 80/443       | Web server ports          |
| Bytebase        | 8080         | Web UI for database CI/CD |
