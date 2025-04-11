---
title: Common Database Port Numbers in 2025
author: Ayra
updated_at: 2025/04/11 12:00:00
feature_image: /content/blog/common-database-port/banner.webp
tags: Industry
description: A comprehensive reference guide to standard port numbers used by popular database systems in 2025, including relational, NoSQL, and NewSQL databases.
---

## Introduction

Database port numbers are essential communication endpoints that allow applications to connect to database servers. Understanding default ports is crucial for configuring firewalls, troubleshooting connectivity issues, and setting up secure database environments. This guide provides a comprehensive reference for the most common database port numbers in 2025.

While many database systems maintain their traditional port numbers for backward compatibility, some newer systems and cloud-native databases have established different conventions. This article covers standard ports for popular database systems across relational, NoSQL, and NewSQL categories.

## Relational Databases

| Database System      | Default Port       | Notes                                                    |
| -------------------- | ------------------ | -------------------------------------------------------- |
| MySQL / MariaDB      | 3306               | MySQL's classic port; MariaDB adopted the same           |
| PostgreSQL           | 5432               | Postgres convention since the early days                 |
| Oracle Database      | 1521               | The TNS Listener port; 2483/2484 for TCPS                |
| Microsoft SQL Server | 1433               | Default instance port; named instances use dynamic ports |
| IBM Db2              | 50000              | Standard port; additional services use 50001-50050 range |
| SQLite               | N/A                | File-based database with no network port                 |
| Amazon Aurora        | 3306 / 5432        | Uses MySQL or PostgreSQL compatible ports                |
| Google Cloud SQL     | 3306 / 5432 / 1433 | Based on chosen database engine                          |
| Azure SQL Database   | 1433               | Same as standard SQL Server                              |

## NoSQL Databases

| Database System | Default Port | Notes                                                        |
| --------------- | ------------ | ------------------------------------------------------------ |
| MongoDB         | 27017        | 27018 (shard server), 27019 (config server)                  |
| Redis           | 6379         | Often used with Sentinel (26379) and Cluster (16379)         |
| Cassandra       | 9042         | CQL native transport port; 7000 for inter-node communication |
| Elasticsearch   | 9200         | REST API; 9300 for inter-node communication                  |
| Neo4j           | 7687         | Bolt protocol; 7474 for HTTP and 7473 for HTTPS              |
| CouchDB         | 5984         | HTTP API; 6984 for HTTPS                                     |
| DynamoDB        | N/A          | AWS service with no direct port access                       |
| HBase           | 16000        | Master port; 16020/16030 for region servers                  |
| Couchbase       | 8091         | Web console; 8092 (API), 8093 (query), 11210 (data)          |
| InfluxDB        | 8086         | HTTP API port; 8088 for RPC service                          |
| ScyllaDB        | 9042         | CQL compatible port (same as Cassandra)                      |

## NewSQL and Time-Series Databases

| Database System      | Default Port | Notes                                          |
| -------------------- | ------------ | ---------------------------------------------- |
| CockroachDB          | 26257        | SQL interface; 8080 for admin UI               |
| TiDB                 | 4000         | SQL interface; 10080 for status                |
| ClickHouse           | 9000         | Native protocol; 8123 for HTTP interface       |
| TimescaleDB          | 5432         | Uses PostgreSQL port (extension of PostgreSQL) |
| SingleStore (MemSQL) | 3306         | MySQL-compatible port; 9104 for Ops UI         |
| YugabyteDB           | 5433         | For YSQL; 9042 for YCQL (Cassandra compatible) |
| QuestDB              | 8812         | PostgreSQL wire protocol; 9000 for REST        |
| PingCAP TiFlash      | 3930         | TiFlash service for TiDB analytics             |

## Graph Databases

| Database System | Default Port | Notes                                  |
| --------------- | ------------ | -------------------------------------- |
| Neo4j           | 7687         | Bolt protocol port                     |
| ArangoDB        | 8529         | HTTP API port                          |
| Amazon Neptune  | N/A          | AWS service without direct port access |
| JanusGraph      | N/A          | Uses underlying storage ports          |
| TigerGraph      | 14240        | GraphStudio UI port                    |
| DGraph          | 8080         | HTTP port; 9080 for gRPC               |

## Vector Databases

| Database System | Default Port | Notes                              |
| --------------- | ------------ | ---------------------------------- |
| Pinecone        | N/A          | Cloud service with API access only |
| Milvus          | 19530        | Data service port                  |
| Weaviate        | 8080         | REST API port                      |
| Qdrant          | 6333         | gRPC port; 6334 for REST API       |
| Vespa           | 8080         | HTTP port for queries              |
| ChromaDB        | 8000         | API server port                    |

## Database Management Tools

| Tool            | Default Port | Notes                     |
| --------------- | ------------ | ------------------------- |
| phpMyAdmin      | 80/443       | Web server ports          |
| pgAdmin         | 80/443       | Web server ports          |
| MongoDB Compass | N/A          | Desktop client            |
| DBeaver         | N/A          | Desktop client            |
| Adminer         | 80/443       | Web server ports          |
| Bytebase        | 8080         | Web UI for database CI/CD |

## Security Best Practices

As database security has become increasingly critical, here are some best practices for port management in 2025:

1. **Change Default Ports**: Modify default ports to reduce the effectiveness of automated scanning.

2. **Use Firewalls**: Restrict access to database ports only to necessary client IP addresses.

3. **Implement TLS/SSL**: Encrypt all database communications, especially for cloud-deployed databases.

4. **Port Knocking**: Consider advanced techniques like port knocking for sensitive database systems.

5. **VPN Access**: Use VPN technology to secure database connections from remote locations.

6. **Zero Trust Networking**: Implement database access via identity-aware proxies rather than direct port exposure.

7. **Container Networking**: For containerized databases, use overlay networks and avoid exposing ports directly.

8. **Cloud Service Endpoints**: Use private endpoints in cloud environments instead of public IP access.

## Cloud Database Services

Most cloud database services don't expose traditional ports directly but rather use endpoints with standard ports behind the scenes:

- **Amazon RDS**: Uses underlying database engine ports but accessed via endpoints
- **Azure Cosmos DB**: Uses HTTPS (443) for all communications
- **Google Cloud Spanner**: Accessed via API over HTTPS (443)
- **Snowflake**: Accessed via HTTPS (443) endpoints

## Special Configurations

### Multi-Instance Deployments

When running multiple instances of the same database system on a single server:

- **MySQL**: Configure different ports (3306, 3307, 3308, etc.)
- **PostgreSQL**: Configure different ports (5432, 5433, 5434, etc.)
- **MongoDB**: Configure different ports (27017, 27018, 27019, etc.)

### Container Deployments

Container orchestration systems like Kubernetes often use:

- Internal cluster networking for pod-to-pod communication
- Service objects that may map to different external ports
- Ingress controllers that route traffic based on hostnames rather than ports

## Conclusion

Understanding database port numbers remains important for system administration, security configuration, and troubleshooting connectivity issues. While the core database systems maintain their traditional ports for compatibility, newer systems, especially cloud-native databases, may use different approaches to connectivity.

As we continue through 2025, the trend toward abstracted connectivity through service endpoints, APIs, and container networking means that direct port management is becoming less common for end users, but the knowledge of standard ports remains valuable for database professionals.

When setting up a new database environment, always refer to the latest documentation for your specific version, as port configurations may change with new releases or in specialized deployment scenarios.
