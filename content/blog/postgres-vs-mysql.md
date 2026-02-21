---
title: 'PostgreSQL vs MySQL: Which Database Should You Choose in 2026?'
author: Tianzhou
updated_at: 2026/02/20 12:00
feature_image: /content/blog/postgres-vs-mysql/cover.webp
tags: Comparison
description: 'PostgreSQL vs MySQL: in-depth comparison of performance, features, security, extensibility, JSON support, replication, and ecosystem. Updated for Postgres 18 and MySQL 9.x with real-world scaling references.'
---

<HintBlock type="info">

This post is maintained by Bytebase, an open-source database DevSecOps tool that can manage both Postgres and MySQL. We update the post every year.

</HintBlock>

| Update History | Comment                                |
| -------------- | -------------------------------------- |
| 2023/07/11     | Initial version.                       |
| 2024/09/16     | Added scaling and sharding references. |
| 2025/02/23     | Added online DDL.                      |
| 2026/02/03     | Updated for Postgres 18, MySQL 9.x, Stack Overflow 2025. |

This is a series of articles between MySQL and PostgreSQL:

- MySQL vs. Postgres (this one)
- [PlanetScale vs. Neon](/blog/planetscale-vs-neon)
- [TiDB vs. CockroachDB](/blog/tidb-vs-cockroachdb)

---

> For the impatience, jump to the [last section](#postgres-or-mysql) to see the comparison table. The [References](#references) collects many industry best practices.

In 2025, Snowflake [won DBMS of the Year 2024](https://db-engines.com/en/blog_post/109), with Postgres and Oracle as runners-up. Postgres remains one of the top climbers in the [DB-Engines rankings](https://db-engines.com/en/blog_post/110).

The Postgres dominance is also reflected in the Stack Overflow survey ([2025](https://survey.stackoverflow.co/2025/technology), [2024](https://survey.stackoverflow.co/2024/technology/#1-databases)). Postgres has been the most admired (65%) and desired (46%) database for the third year in a row.

![stackoverflow](/content/blog/postgres-vs-mysql/stackoverflow.webp)

As Postgres gains more momentum, it becomes harder to pick between Postgres and MySQL. MySQL is
probably still the world's most popular open source database by install base.

![mysql](/content/blog/postgres-vs-mysql/mysql.webp)

While Postgres positions itself as the world's most advanced open source relational database.

![postgres](/content/blog/postgres-vs-mysql/postgres.webp)

At Bytebase, we work with both databases extensively since the Bytebase product needs to integrate
with both databases as well as their derivatives. Our founders also build [Google Cloud SQL](https://cloud.google.com/sql), one of the largest hosted MySQL & Postgres cloud services.

Based on our operating experience, below we give an extensive comparison between Postgres and MySQL
from the following dimensions:

- [License](#license)
- [Connection Model](#connection-model)
- [Performance](#performance)
- [Features](#features)
  - [Object Hierarchy](#object-hierarchy)
  - [ACID Transaction](#acid-transaction)
  - [Security](#security)
  - [Query Optimizer](#query-optimizer)
  - [Online DDL](#online-ddl)
  - [Replication](#replication)
  - [JSON](#json)
  - [CTE (Common Table Expression)](#cte-common-table-expression)
  - [Window Functions](#window-functions)
- [Extensibility](#extensibility)
- [Usability](#usability)
- [Operability](#operability)
- [Ecosystem](#ecosystem)

_Unless otherwise specified, the comparison below is between the latest stable release, Postgres 18 vs. MySQL 9.x (using InnoDB). We also use Postgres instead of PostgreSQL throughout the article, though we know the latter is the official name, which is considered as [the biggest mistake in Postgres History](https://www.craigkerstiens.com/2018/10/30/postgres-biggest-mistake/)_.

## License

- MySQL community edition is licensed under GPL.
- Postgres is released under the PostgreSQL license which is a liberal Open Source license similar to
  the BSD or MIT licenses.

Even though MySQL adopts GPL, some people still are concerned that MySQL is owned by Oracle. It's also the
reason that MariaDB is forked from MySQL. Another limitation of GPL is it's infectious. This means that if you distribute MySQL as part of your software, you are obligated to make your source code available under the GPL or a GPL-compatible license. This can be restrictive for commercial software. Alternatively, you can purchase a commercial license from Oracle.

## Connection Model

Postgres uses process per connection where each connection spawns a new process. MySQL uses thread
per connection where each connection spawns a new thread. Thus Postgres provides better isolation, e.g.
an invalid memory access bug only crashes a single process instead of the entire database server. On
the other hand, the process model consumes more resources. Thus for Postgres production deployment,
it's recommended to proxy the connection via a connection pooler such as [PgBouncer](https://www.pgbouncer.org/) or [pgcat](https://github.com/postgresml/pgcat).

## Performance

For most workloads, the performance between Postgres and MySQL is comparable with at most 30% variations.
On the other hand, regardless of which database you choose, if your query misses an index, it could be 10x ~ 1000x degradation.

Postgres 18 introduces an asynchronous I/O (AIO) subsystem that can improve performance 2-3x for sequential scans, bitmap heap scans, and vacuum operations.

MySQL 9.2 improved hash join performance and the query optimizer continues to receive incremental improvements with each Innovation release.

Saying that, MySQL does have an edge over Postgres for extreme write-intensive workloads. You can read following
articles for details:

- [Why Uber Engineering Switched from Postgres to MySQL](https://www.uber.com/en-SG/blog/postgres-to-mysql-migration/)
- [The Part of PostgreSQL We Hate the Most](https://ottertune.com/blog/the-part-of-postgresql-we-hate-the-most/)

Unless your business reaches Uber-like scale, the sheer database performance is not a deciding factor.
Companies like [Instagram](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c), [Notion](https://www.notion.so/blog/sharding-postgres-at-notion) also able to herd
Postgres at super scale.

## Features

### Object Hierarchy

MySQL employs a 4 level system: `Instance.Database.Table.Column`

Postgres employs a 5 level system: `Instance.Database.Schema.Table.Column` (Instance in Postgres is often called `Cluster`).

### ACID Transaction

Both databases provide ACID transaction. Overall, Postgres provides a stronger transaction support:

| Database         | Scenario | Supported?                                                                             |
| ---------------- | -------- | -------------------------------------------------------------------------------------- |
| Before MySQL 8.0 | DML      | Yes                                                                                    |
| Since MySQL 8.0  | DML      | Yes                                                                                    |
| Before MySQL 8.0 | DDL      | No                                                                                     |
| Since MySQL 8.0  | DDL      | [Single statement atomic DDL](https://dev.mysql.com/doc/refman/8.0/en/atomic-ddl.html) |
| Postgres         | DML      | Yes                                                                                    |
| Postgres         | DDL      | Yes                                                                                    |

Check out [Postgres vs. MySQL: DDL Transaction Difference](/blog/postgres-vs-mysql-ddl-transaction) for a detailed analysis

### Security

Both Postgres and MySQL support RBAC.

Postgres supports the additional Row Level Security (RLS) out of the box, while MySQL needs to create
extra views to emulate this behavior.

For authentication, Postgres 18 adds OAuth 2.0 support for modern identity providers, while MySQL 9.1 introduces WebAuthn for Windows Hello authentication. Both have deprecated older methods (Postgres: MD5 → SCRAM-SHA-256).

### Query Optimizer

Postgres has a better query optimizer. More details in this [rant](https://news.ycombinator.com/item?id=29455852). Postgres 18 adds "skip scan" support for multicolumn B-tree indexes, allowing more efficient queries when leading columns are not specified.

### Online DDL

Postgres provides online DDL for the following cases:

1. `ADD COLUMN` without a default value.
1. (Postgres 11+) `ADD COLUMN` with a default value.
1. Specify `CONCURRENTLY` when running `CREATE INDEX`.
1. (Postgres 18+) Improved async I/O makes vacuum and other maintenance operations faster.

MySQL provides a more comprehensive support for online DDL. You can specify the `ALGORITHM` to be `INSTANT`, `INPLACE` or `COPY` when running `ALTER TABLE`.
In addition, there are [gh-ost](https://github.com/github/gh-ost), [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html) to support online DDL for MySQL where the native support is limited.

### Replication

For Postgres, the standard replication is physical replication using WAL. For MySQL, the standard
replication is logical replication using binlog.

Postgres also supports logical replication via its Publish/Subscribe mode.

### UUIDs

Postgres 18 introduces native `uuidv7()` function for timestamp-ordered UUIDs, combining global uniqueness with sequential ordering for better index performance. MySQL requires application-level UUID generation or custom functions.

### JSON

Both Postgres and MySQL support JSON column. Postgres supports more features:

- More operators to access JSON features.
- Allow to create index on JSON fields.

### CTE (Common Table Expression)

Postgres has a more comprehensive support for CTE:

- SELECT, UPDATE, INSERT, DELETE inside a CTE.
- SELECT, UPDATE, INSERT, DELETE following a CTE.

MySQL supports:

- SELECT inside a CTE.
- SELECT, UPDATE, and DELETE following a CTE.

### Window Functions

Window Frame Types: MySQL only supports the ROWS frame type, which allows you to define a frame consisting of a fixed number of rows. Postgres, on the other hand, supports both ROWS and RANGE frame types.

Range Units: MySQL only supports the UNBOUNDED PRECEDING and CURRENT ROW range units, while Postgres supports more range units, including UNBOUNDED FOLLOWING, and BETWEEN.

Performance: In general, Postgres implementation of window functions is considered more efficient and performant than MySQL implementation.

~Advanced Functions: Postgres supports more advanced window functions, such as LAG(), LEAD(), FIRST_VALUE(), and LAST_VALUE()~. MySQL 8.0 also supports these [window functions](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html).

### AI

Postgres leverages [pgvector](https://github.com/pgvector/pgvector) for vector operations, which has become the de-facto standard for AI/ML workloads. MySQL 9 introduces [VECTOR type](https://dev.mysql.com/doc/refman/9.0/en/mysql-nutshell.html) with up to 16,383 dimensions, though the support is still more limited compared to pgvector's rich indexing options (IVFFlat, HNSW).

## Extensibility

Postgres supports [extensions](https://www.postgresql.org/docs/current/sql-createextension.html). The
most outstanding one is [PostGIS](https://postgis.net/) which brings Geospatial capabilities to Postgres.
As the AI thrives, [pgvector](https://github.com/pgvector/pgvector) is becoming the de-facto standard for vector operations.
Besides, there is Foreign Data Wrapper (FDW) to allow querying into other data systems, pg_stat_statements
to track planning and execution statistics, and even pgvector to perform vector search for AI applications.

MySQL has a pluggable storage engine architecture and gives the birth of InnoDB. But today, InnoDB has
become the dominant storage engine in MySQL, so the pluggable architecture just serves as an API boundary rather
than being used for extension purposes.

MySQL 9.0+ introduces [JavaScript stored programs](https://dev.mysql.com/doc/refman/9.0/en/stored-routines-javascript.html) (Enterprise Edition), allowing stored procedures and functions to be written in JavaScript via GraalVM. This is a significant extensibility improvement for MySQL Enterprise users.

For auth, both Postgres and MySQL support pluggable authentication module (PAM).

## Usability

Postgres is more rigorous while MySQL is more forgivable:

- MySQL allows to include non-aggregated columns in a SELECT that uses the GROUP BY clause. Postgres doesn't.
- MySQL is case-insensitive by default. Postgres is case-sensitive by default.

MySQL allows to join tables from different databases. Postgres can only join tables inside a single database,
unless using the FDW extension.

## Operability

Due to the underlying storage engine design, Postgres has an infamous [XID wraparound issue](https://blog.sentry.io/transaction-id-wraparound-in-postgres/) under heavy load. Postgres 18 mitigates upgrade pain by preserving planner statistics during major-version upgrades, eliminating lengthy post-upgrade ANALYZE operations.

For MySQL, we encountered a few replication bugs when operating a huge MySQL fleet at Google Cloud. MySQL now follows a [three-month Innovation release cadence](https://dev.mysql.com/blog-archive/introducing-mysql-innovation-and-long-term-support-lts-versions/) with Long-Term Support (LTS) versions every two years, giving teams flexibility between stability and new features.

Those issues only occur in extreme load. For normal workload, both Postgres and MySQL are mature and
reliable. Database hosting platforms also provide integrated backup/restore, monitoring.

## Ecosystem

All common SQL tools support both Postgres and MySQL well. Because of Postgres' extensible architecture and the fact that it's still owned by the community, the Postgres ecosystem is more thriving in recent years. For every application platform offering a hosted database service, they all choose Postgres. From the [Heroku](https://www.heroku.com/) in the early days to the new [Supabase](https://supabase.com/), [render](https://render.com/), [Fly.io](https://fly.io/).

Also there are a series of Postgres derived databases targeting different workloads:

- [Timescale](https://www.timescale.com/) for time series.
- [FerretDB](https://www.ferretdb.com/) for MongoDB compatibility.
- [RisingWave](https://risingwave.com/) for streaming.
- [Neon](https://neon.tech/) for serverless.
- [PostgresML](https://postgresml.org/) for AI.

## Postgres or MySQL

|                  | Postgres                                                                             | MySQL                                                                |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| License          | Postgres License (MIT alike)                                                         | GPL                                                                  |
| Connection Model | Process per connection                                                               | Thread per connection                                                |
| Performance      | Internet scale                                                                       | Comparable with Postgres, better in extreme write-intensive workload |
| Features         | More advanced in transaction, security, query optimizer, JSON, CTE, window functions | Capable                                                              |
| Extensibility    | PAM + Extensions                                                                     | PAM                                                                  |
| Usability        | Rigorous and follow standard                                                         | Forgivable and follow convention                                     |
| Operability      | Good, a bit higher learning curve                                                    | Good, easy to use and operate                                        |
| Ecosystem        | Thriving community and more hosting providers                                        | Large install base                                                   |

Choosing between Postgres and MySQL is still hard and often causes [heated debate](https://news.ycombinator.com/item?id=35906604).
![hn](/content/blog/postgres-vs-mysql/hn.webp)

Overall, Postgres has more features, a more thriving community and ecosystem. While MySQL has an easier learning curve and a larger user base.

We observe the same industry trend as the stack overflow result, that Postgres is becoming more desired among developers.
But from our operating experience, the sophistication of Postgres does cost some handiness. If you are not familiar with
Postgres, we suggest you spin up an instance from the cloud provider, run a couple of queries to get a feel. Sometimes,
those extra goodies are not worthwhile and MySQL would be an easier choice.

---

It's also common that Postgres and MySQL co-exist inside an organization. And if you want to manage the database development
lifecycle for both of them, please check out [Bytebase](/).

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)

## Postgres vs MySQL Comparison Series

- [DDL Transaction Difference](/blog/postgres-vs-mysql-ddl-transaction)
- [Indexing Options](/blog/postgres-vs-mysql-indexing-options)
- [JSON Support](/blog/postgres-vs-mysql-json-support)
- [Online Index Creation](/blog/postgres-vs-mysql-online-index-creation)

## References

### Scaling and Sharding

- [Canva: From Zero to 50 Million Uploads per Day: Scaling Media at Canva - Nov 29, 2022](https://www.canva.dev/blog/engineering/from-zero-to-50-million-uploads-per-day-scaling-media-at-canva/)
- [Figma: How Figma’s databases team lived to tell the scale (Postgres) - Mar 14, 2024](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/)
- [GitHub: Partitioning GitHub’s relational databases to handle scale (MySQL) - Sep 27, 2021](https://github.blog/2021-09-27-partitioning-githubs-relational-databases-scale/)
- [Instagram: Sharding & IDs at Instagram (Postgres) - Dec 30, 2012](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c)
- [Notion: The Great Re-shard from Notion (Postgres) - July 17, 2023](https://www.notion.so/blog/the-great-re-shard)
- [Notion: Herding elephants: Lessons learned from sharding Postgres at Notion - Oct 6, 2021](https://www.notion.so/blog/sharding-postgres-at-notion)
- [Pinterest: Sharding Pinterest: How we scaled our MySQL fleet - Aug 17, 2015](https://medium.com/pinterest-engineering/sharding-pinterest-how-we-scaled-our-mysql-fleet-3f341e96ca6f)
- [Slack: Scaling Datastores at Slack with Vitess - Dec 1, 2020](https://slack.engineering/scaling-datastores-at-slack-with-vitess/)
- [MySQL At Uber](https://www.uber.com/blog/mysql-at-uber/)

### Upgrading and Migration

- [Airtable: Migrating Airtable to MySQL 8.0 - Jun 2, 2022](https://medium.com/airtable-eng/migrating-airtable-to-mysql-8-0-809f0398a493)
- [GitHub: Upgrading GitHub.com to MySQL 8.0 - Dec 17, 2023](https://github.blog/2023-12-07-upgrading-github-com-to-mysql-8-0/)
- [Klaviyo: Database Migration Service (Postgres) - Aug 29, 2023](https://klaviyo.tech/database-migration-service-case-study-1-6f9dd49d5855)
- [Klaviyo: Database Migration Service (MySQL) - May 9, 2023](https://klaviyo.tech/database-migration-service-case-study-1-6f9dd49d5855)
- [Retool: How Retool upgraded our 4 TB main application PostgreSQL database - Apr 15, 2022](https://retool.com/blog/how-we-upgraded-postgresql-database)

### Automation

- [GitHub: Automating MySQL schema migrations with GitHub Actions and more - Feb 14, 2020](https://github.blog/2020-02-14-automating-mysql-schema-migrations-with-github-actions-and-more/)
- [Goldman Sachs: Introducing Obevo: Get Your Database SDLC under Control - Dec 1, 2017](https://www.infoq.com/articles/Obevo-Introduction/)

### Tools

#### SQL Client

- [Top MySQL GUI client](/blog/top-mysql-gui-client)
- [Top Postgres GUI client](/blog/top-postgres-gui-client)
- [Top Open Source SQL Clients](/blog/top-open-source-sql-clients/)

#### Schema Migration

- [Top Database Schema Migration Tools](/blog/top-database-schema-change-tool-evolution/)

##### MySQL

- [gh-ost](https://github.com/github/gh-ost)
- [pt-online-schema-change](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html)
- [SB-OSC](https://github.com/sendbird/sb-osc)

##### Postgres

- [pgroll](https://github.com/xataio/pgroll)
- [reshape](https://github.com/fabianlindfors/reshape)

### Other Comparisons

- [Postgres vs. MongoDB](/blog/postgres-vs-mongodb)
- [MySQL vs. MariaDB](/blog/mysql-vs-mariadb)
- [PlanetScale vs. Neon](/blog/planetscale-vs-neon)
- [Neon vs. Supabase](/blog/neon-vs-supabase)

## FAQ

### Is PostgreSQL better than MySQL?

PostgreSQL offers more advanced features (better JSON support, CTEs, window functions, row-level security, and extensibility via extensions like PostGIS and pgvector). MySQL has an easier learning curve and performs better for extreme write-intensive workloads. For most modern applications, PostgreSQL is the more capable choice.

### Is PostgreSQL faster than MySQL?

For most workloads, performance is comparable (within 30% variation). PostgreSQL has a superior query optimizer and Postgres 18 adds async I/O for 2-3x improvement in sequential scans. MySQL has an edge for extreme write-intensive scenarios at Uber-like scale.

### Should I learn PostgreSQL or MySQL first?

If you are starting new, PostgreSQL is recommended as it follows SQL standards more closely and is the most desired database among developers (Stack Overflow 2025 survey). MySQL is a good choice if you are working with legacy web applications or LAMP-stack environments.

### Can PostgreSQL and MySQL coexist?

Yes, it is common for PostgreSQL and MySQL to coexist within an organization. Tools like [Bytebase](/) can manage the database development lifecycle for both databases from a single platform.

### What is the difference between PostgreSQL and MySQL licensing?

PostgreSQL uses a permissive BSD/MIT-like license with no restrictions. MySQL uses GPL, which requires distributing source code if you distribute MySQL as part of your software. Oracle also offers a commercial MySQL license for organizations that cannot comply with GPL.
