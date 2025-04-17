---
title: 'TiDB vs. MySQL: a Complete Comparison in 2025'
author: Tianzhou
updated_at: 2025/04/13 12:00
feature_image: /content/blog/tidb-vs-mysql/cover.webp
tags: Comparison
description: 'An extensive comparison between TiDB and MySQL on license, architecture, performance, scalability, online ddl, compatibility, deployment options.'
---

<HintBlock type="info">

This post is maintained by Bytebase, an open-source database DevSecOps tool that can manage both TiDB and MySQL. We update the post every year.

</HintBlock>

| Update History | Comment          |
| -------------- | ---------------- |
| 2025/04/13     | Initial version. |

## TiDB Overview

TiDB (pronounced "tie-dee-bee," with "Ti" standing for Titanium) is an open-source NewSQL database that supports Hybrid Transactional and Analytical Processing (HTAP) workloads. Developed and maintained primarily by PingCAP, TiDB was designed to be MySQL compatible while addressing scalability challenges faced by traditional relational databases.

### History and Development

TiDB's development began with inspiration from Google's Spanner and F1 papers, aiming to create a distributed database that maintained SQL compatibility. The first general availability (GA) release of TiDB 1.0 was launched on October 16, 2017. Since then, TiDB has seen regular major releases. The most recent one is TiDB 8.5 GA on December 19, 2024.

### Architecture

TiDB's architecture consists of several key components that work together to provide a distributed database solution:

![tidb-arch](/content/blog/tidb-vs-mysql/tidb-arch.webp)

1. **TiDB Server**: The stateless SQL processing layer that receives SQL requests, parses and optimizes them, and generates distributed execution plans. This layer exposes MySQL-compatible endpoints, allowing applications to interact with TiDB as if it were a MySQL server.

2. **TiKV Server**: The distributed key-value storage layer that serves as the backbone of TiDB's data persistence. It stores data in a distributed manner across multiple nodes, ensuring high availability and fault tolerance through replication using the Raft consensus algorithm.

3. **Placement Driver (PD)**: The metadata management and scheduling layer. PD manages the metadata of the entire cluster, including topology and placement information of data. It also provides the TiDB Dashboard management UI and manages transaction identifiers.

4. **TiFlash**: A columnar storage engine designed specifically for analytical queries. TiFlash optimizes performance for hybrid transactional and analytical processing by caching data in a format suited for read-heavy analytical workloads.

This distributed architecture allows TiDB to scale horizontally by adding more nodes to the cluster, automatically sharding data into smaller pieces called "Regions" (approximately 100MB each) that are distributed across the storage nodes.

### Key Features

TiDB offers several distinctive features that set it apart:

- **Horizontal Scalability**: TiDB can expand both SQL processing and storage capacity by adding new nodes, with automatic data sharding and rebalancing.

- **MySQL Compatibility**: TiDB acts like a MySQL 8.0 server to applications, allowing users to continue using existing MySQL client libraries and tools.

- **Distributed Transactions**: TiDB supports ACID-compliant transactions across its distributed architecture, ensuring data consistency.

- **Cloud Native Design**: TiDB is built for cloud environments, with TiKV having graduated from the Cloud Native Computing Foundation (CNCF) in September 2020.

- **Real-time HTAP**: With both row-based (TiKV) and column-based (TiFlash) storage engines, TiDB efficiently handles both transactional and analytical workloads.

- **High Availability**: Using the Raft consensus algorithm, TiDB ensures data availability and automatic recovery from node failures.

## TiDB vs. MySQL

While TiDB and MySQL share SQL compatibility, they differ significantly in their design philosophy, architecture, and capabilities. Let's explore these differences across several key dimensions.

### License

**TiDB** is licensed under Apache 2.0, a permissive open-source license that allows for commercial use, modification, distribution, and private use without requiring derivative works to be open-sourced. This gives organizations flexibility in how they use and extend TiDB.

**MySQL**, on the other hand, uses a dual-licensing model:

- The Community Edition is available under the GNU General Public License (GPL) version 2, which requires derivative works to be open-sourced under the same license.
- The Enterprise Edition is available under a proprietary license from Oracle, offering additional features and support but requiring payment.

### Architecture

The architectural differences between TiDB and MySQL represent fundamentally different approaches to database design:

**TiDB** employs a distributed architecture with separate components for SQL processing, storage, and scheduling. This separation allows each component to scale independently based on workload requirements. Data is automatically sharded into Regions and distributed across storage nodes, with replication managed by the Raft consensus algorithm.

**MySQL** uses a monolithic architecture where a single server handles both SQL processing and storage. While it offers a pluggable storage engine architecture (allowing different engines like InnoDB, MyISAM, Memory, and Archive for different tables), the server itself remains a single unit. This design focuses on vertical scaling rather than horizontal distribution.

### Performance

**TiDB** is optimized for both OLTP and OLAP workloads (HTAP - Hybrid Transactional and Analytical Processing). Its distributed query processing allows parallel execution across nodes, which can significantly improve performance for complex queries and large datasets.

**MySQL** excels at OLTP workloads on a single node, offering very fast performance for simple queries. Its query cache can further accelerate frequently executed queries. However, performance is limited by single server resources and can degrade with very large datasets or complex analytical queries.

### Scalability

Scalability represents perhaps the most significant difference between these databases:

**TiDB** was designed for horizontal scalability from the ground up. It can scale to petabytes of data across hundreds of nodes with linear performance scaling by adding more TiDB or TiKV nodes. Data is automatically sharded and rebalanced across the cluster, and scaling operations can be performed without downtime.

**MySQL** was primarily designed for vertical scaling (adding more resources to a single server). While read scaling is possible through read replicas, write operations are limited by the capacity of a single server. Sharding at the application level or using third-party tools is required for horizontal scaling, often introducing complexity. [Vitess](https://vitess.io/) is a sharding solution built on top of MySQL.

### Online DDL Operations

Schema changes are a critical aspect of database management. Both MySQL and TiDB offer online DDL capabilities, but with different approaches.

**MySQL's Online DDL Approach**:

MySQL (specifically InnoDB) has [evolved its online DDL capabilities](https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl-operations.html) over recent versions, offering different algorithms for schema changes:

- **Multiple DDL Algorithms**:

  - `INSTANT`: The fastest option that only modifies metadata without touching table data
  - `INPLACE`: Rebuilds the table in place but allows concurrent DML in most cases
  - `COPY`: Creates a temporary table (blocks concurrent DML operations)

- **Operation-Specific Support**: Different operations have different levels of online support:

  - Creating or adding secondary indexes: Fully online (INPLACE, concurrent DML allowed)
  - Dropping an index: Fully online (INPLACE, only modifies metadata)
  - Adding a primary key: Partially online (INPLACE but rebuilds table, concurrent DML allowed)
  - Adding columns: Varies (some can be INSTANT, others require INPLACE or COPY)

- **Limitations**: Not all operations can be performed online:

  - Dropping a primary key: Requires table rebuild and blocks concurrent DML
  - Some column type changes: Require the COPY algorithm and block concurrent operations
  - Adding FULLTEXT or SPATIAL indexes: Allow INPLACE but block concurrent DML

- **External Tools**: For operations that can't be performed online natively, MySQL users often rely on external tools like [gh-ost](https://github.com/github/gh-ost), [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html), or [Facebook's OSC](https://github.com/facebookincubator/OnlineSchemaChange).

**TiDB's Online DDL Approach**:

TiDB implements a distributed, non-blocking approach to [DDL operations](https://docs.pingcap.com/tidb/stable/ddl-introduction/) that allows schema changes to be performed without interrupting ongoing database operations:

- **Asynchronous Schema Change Algorithm**: Based on Google's F1 paper, TiDB's implementation allows online table schema changes without blocking read/write operations.

- **Fast Online DDL**: [Introduced in TiDB 6.5](https://www.pingcap.com/blog/how-tidb-achieves-10x-performance-gains-in-online-ddl/), this feature achieves up to 10x performance improvement in operations like online index creation compared to previous versions.

- **No External Tools Required**: TiDB's approach eliminates the need for external schema change tools (like gh-ost or pt-osc) that are commonly used with MySQL.

- **Optimized Index Creation**: TiDB improves index creation through:

  - Transforming from a transactional batch-write mode to a file-based batch import mode
  - Optimizing data transmission by extracting only required columns before data transfer
  - Implementing parallel index ingesting to enhance efficiency

- **Performance Under Load**: TiDB maintains high performance for DDL operations even under heavy workloads, with benchmarks showing 8-13x faster performance than previous versions with 10K QPS.

Schema changes are often overlooked when evaluating databases. While MySQL provides robust online DDL capabilities—enhanced by external tools such as gh-ost and pt-online-schema-change—TiDB leverages its distributed architecture to manage schema changes more seamlessly and efficiently.

### Compatibility

**TiDB** provides MySQL protocol compatibility, acting like MySQL 8.0 to applications. It supports most MySQL syntax, data types, and functions, allowing existing MySQL applications to work with minimal changes. However, as TiDB was built from scratch rather than forked from MySQL, certain MySQL features (like stored procedure functionality) have limitations ([official compatibility doc](https://docs.pingcap.com/tidb/stable/mysql-compatibility/)).

For organizations heavily invested in MySQL-specific features or tools, these compatibility differences may require evaluation.

### Deployment Options

Both databases offer flexible deployment options:

**TiDB** can be deployed on-premises, in Kubernetes environments using TiDB Operator, or via the TiUP deployment tool for easy cluster management. Cloud deployment is supported on major cloud providers, and PingCAP offers TiDB Cloud as a managed service.

**MySQL** is available for on-premises deployment, as managed services on all major cloud platforms (Amazon RDS/Aurora, Azure Database for MySQL, Google Cloud SQL, Oracle MySQL Cloud Service), and in containerized environments. Various high-availability solutions like MySQL Group Replication, InnoDB Cluster, and NDB Cluster provide additional deployment flexibility.

## Comparison Table

| Feature                | TiDB                                                                                                                                                                                                      | MySQL                                                                                                                                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **License**            | Apache 2.0 (permissive open-source)                                                                                                                                                                       | Dual-licensing: GPL v2 (Community) and Proprietary (Enterprise)                                                                                                                                                               |
| **Architecture**       | Distributed architecture with separate components:<br/>- TiDB Server (SQL layer)<br/>- TiKV (distributed storage)<br/>- Placement Driver (coordination)<br/>- TiFlash (columnar storage)                  | Monolithic architecture:<br/>- Single server with pluggable storage engines<br/>- Primary engines: InnoDB                                                                                                                     |
| **Performance**        | - Optimized for HTAP workloads<br/>- Distributed query processing<br/>- Higher latency for simple queries<br/>- Strong for complex queries and large datasets                                             | - Optimized for OLTP workloads<br/>- Fast for simple queries<br/>- Query cache for frequent queries<br/>- Limited by single server resources                                                                                  |
| **Scalability**        | - Horizontal scalability by design<br/>- Scales to petabytes across hundreds of nodes<br/>- Automatic sharding and rebalancing<br/>- No downtime for scaling operations                                   | - Primarily vertical scaling<br/>- Read scaling through replicas<br/>- Limited by single server for writes<br/>- Scaling often requires downtime                                                                              |
| **Online DDL**         | - Fully distributed non-blocking approach<br/>- Fast Online DDL with 10x performance gains<br/>- No external tools required<br/>- Maintains performance under heavy load<br/>- Optimized for large tables | - Multiple algorithms (INSTANT, INPLACE, COPY)<br/>- Operation-specific support levels<br/>- Some operations require table rebuilds<br/>- External tools often needed for production<br/>- Performance can degrade under load |
| **Compatibility**      | - MySQL protocol compatible<br/>- Supports most MySQL syntax and features<br/>- Some MySQL features have limitations<br/>- Not a MySQL fork, built from scratch                                           | N/A                                                                                                                                                                                                                           |
| **Deployment Options** | - On-premises<br/>- Kubernetes with TiDB Operator<br/>- TiUP deployment tool<br/>- Cloud deployment<br/>- Docker<br/>- TiDB Cloud managed service                                                         | - On-premises<br/>- Major cloud platforms (RDS, Azure, GCP)<br/>- Docker                                                                                                                                                      |

Organizations typically start with MySQL due to its simplicity and familiarity, then transition to TiDB when facing scalability challenges. However, this scalability comes with trade-offs, especially around compatibility. To plan effectively for the long term, you should be cautious about features that TiDB does not support such as stored procedures.
