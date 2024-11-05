---
title: 'MySQL vs. MariaDB: a Complete Comparison in 2024'
author: Tianzhou
updated_at: 2024/11/05 08:00
feature_image: /content/blog/mysql-vs-mariadb/cover.webp
tags: Industry
featured: true
description: 'While MariaDB was initially a fork of MySQL, the two have evolved over time. This post will explore a detailed comparison between MySQL and MariaDB, focusing on key aspects such as performance, licensing, compatibility, and feature set'
---

<HintBlock type="info">

This post is updated regularly.

</HintBlock>

While MariaDB was initially a fork of MySQL, the two have evolved over time, each with its own strengths and development priorities. Recently, [MariaDB is acquired by K1](https://mariadb.com/newsroom/press-releases/k1-acquires-a-leading-database-software-company-mariadb-and-appoints-new-ceo/), marking the new journey for MariaDB.

At Bytebase, we work with both databases extensively since the Bytebase product needs to integrate
with both databases. Our founders also build [Google Cloud SQL](https://cloud.google.com/sql). Drawing from our operational experience, we outline below the respective strengths of MySQL and MariaDB.

_Unless otherwise specified, the comparison below is between the latest stable release, MySQL 8.0 vs. MariaDB 11.5_.

## Popularity

MySQL as the world's most popular open source database, is still overwhelmingly more popular than MariaDB.

![db-engines](/content/blog/mysql-vs-mariadb/db-engines.webp)
![google-trends](/content/blog/mysql-vs-mariadb/google-trends.webp)

MariaDB itself is more popular in Europe than the rest of the world.

![google-trends](/content/blog/mysql-vs-mariadb/google-trends-region.webp)

## License

MySQL employs dual licensing model:

- **GPL (General Public License) Version 2**: MySQL’s open-source version is licensed under the GNU GPL v2. This means that if you use MySQL in a project that is also open-source and licensed under the GPL, you can use MySQL without purchasing a commercial license.

- **Proprietary License**: If you want to embed or distribute MySQL in a closed-source or proprietary product, you need to obtain a commercial license from Oracle, the company that owns MySQL. This is often used by companies that don't want to comply with the GPL terms.

MariaDB is licensed under GPLv2. It remains strictly open-source with no proprietary version.

It may seem at first glance that MariaDB is more "strict" because it lacks the commercial licensing option that MySQL offers, but in reality, the interpretation is a bit different.

- MySQL offers more commercial flexibility by providing a paid option for proprietary use, making it more appealing to companies wanting to develop closed-source software while avoiding the GPL’s obligations.
- MariaDB, on the other hand, is more open-source focused and does not offer a proprietary version, which can be seen as either more "strict" or more "free" depending on your perspective. MariaDB prioritizes openness and community control, ensuring that its code and features remain accessible to all without the possibility of being locked behind a commercial paywall.

## Features where MySQL Shines

### Native Data Dictionary

MySQL 8.0 introduced a Native Data Dictionary, which is used to store metadata (like table definitions and schema information) in transactional tables within the InnoDB engine. This eliminates the need for traditional `.frm` files and improves the management of metadata, especially during upgrades and changes.

MariaDB still relies on the older `.frm` file-based system for table definitions and metadata, lacking this modern approach.

### JSON

MySQL has developed robust, native JSON support starting with MySQL 5.7. This includes JSON data types, JSON functions, and indexing mechanisms to efficiently store, query, and manipulate JSON data.

MariaDB can store JSON-like data using standard text fields or its dynamic columns feature, but it lacks the fully integrated JSON support and functions that MySQL offers.

### InnoDB Cluster and Group Replication:

MySQL has implemented InnoDB Cluster with Group Replication for high availability and fault tolerance. Group Replication allows for distributed, multi-master replication with automatic failover, making it easier to set up highly available, self-healing clusters.

MariaDB has its own replication features like Galera Cluster, but it does not have the same native, tightly integrated Group Replication feature that MySQL offers, especially for InnoDB.

### Ecosystem

Due to the wide adoption, all major cloud database providers support MySQL.

| Cloud Provider | MySQL | MariaDB |
| -------------- | ----- | ------- |
| AWS            | ✅    | ✅      |
| Azure          | ✅    | ✅      |
| GCP            | ✅    | ❌      |
| Alibaba Cloud  | ✅    | ✅      |
| DigitalOcean   | ✅    | ❌      |
| Aiven          | ✅    | ❌      |

Also database tools prioritize MySQL support. Take online scheme migration tool as an example. While
[pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html) supports
both MySQL and MariaDB, [gh-ost](https://github.com/github/gh-ost) doesn't support MariaDB [officially](https://github.com/github/gh-ost/issues/725).

## Features where MariaDB Shines

### Storage Engines

Though MySQL has a pluggable storage engine architecture, InnoDB is the only viable choice. For MaiaDB, besides the default InnoDB, it also has:

- **Aria**: A crash-safe alternative to MyISAM that offers better performance in read-heavy workloads.
- **MyRocks**: A storage engine optimized for SSDs, providing better compression and write optimization, particularly for large datasets.

### System-versioned Tables (Temporal Tables)

MariaDB introduced system-versioned tables (often referred to as temporal tables) in MariaDB 10.3. This feature allows you to track the historical changes of data in a table automatically by keeping a history of row versions over time. It’s particularly useful for auditing, data recovery, and version control of data in relational databases.

### Flashback

MariaDB supports a flashback feature using temporal tables, which allows users to revert tables to a previous state or view historical data without needing to implement complex backup and recovery mechanisms.

### Thread Pooling

MariaDB offers thread pooling as part of its open-source distribution, which helps in managing large numbers of concurrent connections by reducing the overhead of spawning and managing multiple threads. This improves performance in high-concurrency environments.

MySQL offers thread pooling, but it is only available in the Enterprise Edition, not the community version.

### Oracle Compatibility

MariaDB is more Oracle-compatible than MySQL due to the introduction of some Oracle-like features:

- Sequences: MariaDB supports sequence objects, which are more in line with Oracle's sequences (MySQL relies on auto-increment columns).

- PL/SQL Syntax: MariaDB has added PL/SQL-like syntax as of MariaDB 10.3. This allows for easier migration of Oracle’s PL/SQL code into MariaDB without significant changes.

### CREATE OR REPLACE PROCEDURE

MariaDB supports CREATE OR REPLACE for stored procedures starting from MariaDB 10.1.

MySQL does not support CREATE OR REPLACE for stored procedures. In MySQL, you need to first DROP the procedure before creating a new one. This is not ideal:

- **Temporary Loss of Functionality**: During the time the procedure is dropped, it is no longer available for use by applications or queries. This can lead to errors or downtime in production environments, especially if the procedure is accessed frequently.
- **Loss of Permission**: When you DROP a stored procedure, any specific permissions or grants (such as GRANT EXECUTE) associated with that procedure are removed. After recreating the procedure, you must manually reassign those permissions.

### Dynamic Columns

MariaDB has a unique Dynamic Columns feature, allowing you to store non-relational data (such as JSON-like structures) in a relational table without needing to define the structure beforehand. This enables MariaDB to handle flexible data types while still using a relational schema.

MySQL offers JSON data type support (which MariaDB lacks), but Dynamic Columns provide a different level of flexibility for users who prefer not to use JSON but still need semi-structured data.

## MariaDB Road Ahead

The ill-fated IPO led to MariaDB's acquisition by K1, a private equity firm likely less interested in the intricacies of the database business and more focused on seizing an opportunity. Viewing the troubled MariaDB as a bargain, K1 swooped in with plans to restructure the company, stabilize it, and eventually will sell it off to another buyer.

On the other hand, the open-source MariaDB project still carries the torch passed down by its creator, Michael 'Monty' Widenius. It was born from a desire to keep the MySQL spirit alive after concerns arose about Oracle’s control. With a strong focus on openness and being driven by the community, MariaDB still has a fighting chance. Who knows? Maybe, like the PostgreSQL community, MariaDB’s supporters will rally, grow stronger, and create something even more impactful in the years to come.

---

It's also possible that MySQL and MariaDB co-exist inside an organization. And if you want to manage the database development lifecycle for both of them, please check out [Bytebase](/).

Updated 2024/10/05 - It was noted that MariaDB has had Atomic DDL since MariaDB 10.6.

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)

## Other Comparisons

- [MySQL vs. Postgres](/blog/postgres-vs-mysql)
- [Postgres vs. MongoDB](/blog/postgres-vs-mongodb)
- [PlanetScale vs. Neon](/blog/planetscale-vs-neon)
- [Neon vs. Supabase](/blog/neon-vs-supabase)
