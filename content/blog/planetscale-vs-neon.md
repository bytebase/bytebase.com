---
title: "PlanetScale vs. Neon: the Serverless Database Duel for the Developers"
author: Tianzhou
published_at: 2023/08/01 12:00
feature_image: /content/blog/planetscale-vs-neon/cover.webp
tags: Industry
featured: true
description: 'An extensive comparison between PlanetScale and Neon on performance, features, security,
extensibility, usability, architecture, ecosystem and more.'
---

The [2023 Stack Overflow survey](https://survey.stackoverflow.co/2023/) shows that Postgres has taken
over the first place spot from MySQL and become the most admired, desired database.

![stackoverflow](/content/blog/planetscale-vs-neon/stackoverflow.webp)

As Postgres gains more momentum, it becomes harder to pick between Postgres and MySQL. MySQL is
probably still the world's most popular open source database by install base.

![mysql](/content/blog/planetscale-vs-neon/mysql.webp)

While Postgres positions itself as the world's most advanced open source relational database.

![postgres](/content/blog/planetscale-vs-neon/postgres.webp)

At Bytebase, we work with both databases extensively since the Bytebase product needs to integrate
with both databases as well as their derivatives. Our founders also build [Google Cloud SQL](https://cloud.google.com/sql), one of the largest hosted MySQL & Postgres cloud services.

Based on our operating experience, below we give an extensive comparison between PlanetScale and Neon
from the following dimensions:

- [Architecture](#architecture)
- [Compatibility](#compatibility)
- [Branching](#branching)
- [Scalability](#scalability)
- [Usability](#usability)
- [Operability](#operability)
- [Integration](#integration)
- [Compliance](#compliance)
- [Pricing](#pricing)

_Unless otherwise specified, the comparison below is between the latest major release, Postgres 15 vs. MySQL 8.0 (using InnoDB). We also use Postgres instead of PostgreSQL throughout the article, though we know the latter is the official name, which is considered as [the biggest mistake in Postgres History](https://www.craigkerstiens.com/2018/10/30/postgres-biggest-mistake/)_.

## License

- MySQL community edition is licensed under GPL.
- Postgres is released under the PostgreSQL license which is a liberal Open Source license similar to
  the BSD or MIT licenses.

Even though MySQL adopts GPL, some people still are concerned that MySQL is owned by Oracle. It's also the
reason that MariaDB is forked from MySQL.

## Connection Model

Postgres uses process per connection where each connection spawns a new process. MySQL uses thread
per connection where each connection spawns a new thread. Thus Postgres provides better isolation, e.g.
an invalid memory access bug only crashes a single process instead of the entire database server. On
the other hand, the process model consumes more resources. Thus for Postgres production deployment,
it's recommended to proxy the connection via a connection pooler such as [PgBouncer](https://www.pgbouncer.org/) or [pgcat](https://github.com/postgresml/pgcat).

## Performance

For most workloads, the performance between Postgres and MySQL is comparable with at most 30% variations.
On the other hand, regardless of which database you choose, if your query misses an index, it could be 10x ~ 1000x degradation.

Saying that, MySQL does have an edge over Postgres for extreme write-intensive workloads. You can read following
articles for details:

- [Why Uber Engineering Switched from Postgres to MySQL](https://www.uber.com/en-SG/blog/postgres-to-mysql-migration/)
- [The Part of PostgreSQL We Hate the Most](https://ottertune.com/blog/the-part-of-postgresql-we-hate-the-most/)

Unless your business reaches Uber-like scale, the sheer database performance is not a deciding factor.
Companies like [Instagram](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c), [Notion](https://www.notion.so/blog/sharding-postgres-at-notion) also able to herd
Postgres at super scale.

## Features

### Object Hierarchy

MySQL employs a 4 level system:

1. Instance
1. Database
1. Table
1. Column

Postgres employs a 5 level system:

1. Instance (also called cluster)
1. Database
1. Schema
1. Table
1. Column

### ACID Transaction

Both databases provide ACID transaction. Overall, Postgres provides a stronger transaction support:

| Database         | Scenario | Supported?                                                                                                        |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| Before MySQL 8.0 | DML      | Yes                                                                                                               |
| Since MySQL 8.0  | DML      | Yes                                                                                                               |
| Before MySQL 8.0 | DDL      | No                                                                                                                |
| Since MySQL 8.0  | DDL      | [Yes, but can't be performed within another transaction](https://dev.mysql.com/doc/refman/8.0/en/atomic-ddl.html) |
| Postgres         | DML      | Yes                                                                                                               |
| Postgres         | DDL      | Yes                                                                                                               |

### Security

Both Postgres and MySQL support RBAC.

Postgres supports the additional Row Level Security (RLS) out of the box, while MySQL needs to create
extra views to emulate this behavior.

### Query Optimizer

Postgres has a better query optimizer. More details in this [rant](https://news.ycombinator.com/item?id=29455852).

### Replication

For Postgres, the standard replication is physical replication using WAL. For MySQL, the standard
replication is logical replication using binlog.

Postgres also supports logical replication via its Publish/Subscribe mode.

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

Advanced Functions: Postgres supports more advanced window functions, such as LAG(), LEAD(), FIRST_VALUE(), and LAST_VALUE().

## Extensibility

Postgres supports [extensions](https://www.postgresql.org/docs/current/sql-createextension.html). The
most outstanding one is [PostGIS](https://postgis.net/) which brings Geospatial capabilities to Postgres.
Besides, there is Foreign Data Wrapper (FDW) to allow querying into other data systems, pg_stat_statements
to track planning and execution statistics, and even pgvector to perform vector search for AI applications.

MySQL has a pluggable storage engine architecture and gives the birth of InnoDB. But today, InnoDB has
become the dominant storage engine in MySQL, so the pluggable architecture just serves as an API boundary rather
than being used for extension purposes.

For auth, both Postgres and MySQL support pluggable authentication module (PAM).

## Usability

Postgres is more rigorous while MySQL is more forgivable:

- MySQL allows to include non-aggregated columns in a SELECT that uses the GROUP BY clause. Postgres doesn't.
- MySQL is case-insensitive by default. Postgres is case-sensitive by default.

MySQL allows to join tables from different databases. Postgres can only join tables inside a single database,
unless using the FDW extension.

## Operability

Due to the underlying storage engine design, Postgres has an infamous [XID wraparound issue](https://blog.sentry.io/transaction-id-wraparound-in-postgres/) under heavy load.

For MySQL, we encountered a few replication bugs when operating a huge MySQL fleet at Google Cloud.

Those issues only occur in extreme load. For normal workload, both Postgres and MySQL are mature and
reliable. Database hosting platforms also provide integrated backup/restore, monitoring.

## Ecosystem

All common SQL tools support both Postgres and MySQL well. Because of Postgres' extensible architecture and the fact that it's still owned by the community, the Postgres ecosystem is more thriving in recent years. For every application platform offering a hosted database service, they all choose Postgres. From the [Heroku](https://www.heroku.com/) in the early days to the new [Supabase](https://supabase.com/), [render](https://render.com/), [Fly.io](https://fly.io/).

PlanetScale more self-contained

Neon, Snaplet, Vercel, Hasura

## Compliance

SOC 2

## PlanetScale or Neon

|                  | PlanetScale                                                                          | Neon                                                                 |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| License          | Postgres License (MIT alike)                                                         | GPL                                                                  |
| Connection Model | Process per connection                                                               | Thread per connection                                                |
| Performance      | Internet scale                                                                       | Comparable with Postgres, better in extreme write-intensive workload |
| Features         | More advanced in transaction, security, query optimizer, JSON, CTE, window functions | Capable                                                              |
| Extensibility    | PAM + Extensions                                                                     | PAM                                                                  |
| Usability        | Rigorous and follow standard                                                         | Forgivable and follow convention                                     |
| Operability      | Good, a bit higher learning curve                                                    | Good, easy to use and operate                                        |
| Ecosystem        | Thriving community and more hosting providers                                        | Large install base                                                   |

It's year 2023, and choosing between Postgres and MySQL is still hard and often causes [heated debate](https://news.ycombinator.com/item?id=35906604).
![hn](/content/blog/planetscale-vs-neon/hn.webp)

Overall, Postgres has more features, a more thriving community and ecosystem. While MySQL has an easier learning curve and a larger user base.

We observe the same industry trend as the stack overflow result, that Postgres is becoming more desired among developers.
But from our operating experience, the sophistication of Postgres does cost some handiness. If you are not familiar with
Postgres, we suggest you spin up an instance from the cloud provider, run a couple of queries to get a feel. Sometimes,
those extra goodies are not worthwhile and MySQL would be an easier choice.

---

It's also common that Postgres and MySQL co-exist inside an organization. And if you want to manage the database development
lifecycle for both of them, please check out [Bytebase](/).

![bytebase](/content/blog/planetscale-vs-neon/bytebase.webp)

## Further Readings

- [Postgres vs. MySQL](/blog/postgres-vs-mysql)
- [Announcing PlanetScale: The database for developers](https://planetscale.com/blog/announcing-planetscale-the-database-for-developers)
- [Serverless Postgres built for the cloud](https://neon.tech/blog/hello-world)
