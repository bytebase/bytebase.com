---
title: "PlanetScale vs. Neon: the Developer-oriented, Serverless Database Comparision"
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
- [Open Source](#open-source)
- [Pricing](#pricing)

## Architecture

PlanetScale is a distributed database based on [Vitess](https://vitess.io/). Vitess is a shared-nothing
architecture where each shard contains a MySQL primary node and set of replicas. The key addition
is the VTGate proxy to route the request to the respective shard.

Neon is a shared-storage architecture. It seperates the compute and storage. The compute part is
just normal PostgreSQL server, the storage part is a custom-built multi-tenant storage system shared
by all Postgres compute nodes.

## Compatibility

[PlanetScale's MySQL compatibility](https://planetscale.com/docs/reference/mysql-compatibility) is constrained by 3 factors:

1. [Underlying Vitess limitations](https://vitess.io/docs/15.0/reference/compatibility/mysql-compatibility/). Shared-nothing architecture carries a bunch of compatibility limitations. Features requiring session maintenance or cross-shard operation are challenging to implement.

1. Product trade-off. e.g. To support online DDL, it disallows foreign key entirely, which is more strict than Vitess' foreign key limitation.

1. Cloud operating model. You can't have super privilege or LOAD DATA INFILE to access host file system.

[Neon's PostgreSQL compatibility](https://neon.tech/docs/reference/compatibility) is almost
as good as the vanilla PostgreSQL.

This is because Neon customizes the storage layer which is transparent to the application. Neon's compatibility is only constrained by its cloud operating model, which are similar to other hosted database services (AWS RDS for PostgreSQL, Google Cloud SQL for PostgreSQL).

## Branching

Both PlanetScale and Neon are advocating the code-like database development workflow. And the first
thing to cover is branching.

PlanetScale's story focuses on schema migration. They have built the state-of-the-art online
schema migration for MySQL (the 2nd time after they built [gh-ost](https://github.com/github/gh-ost)).

Neon's story centers around instant branching. Their purposefully built storage layer has copy-on-write (CoW),which makes branching instantaneous and cost-effective.

## Scalability

PlanetScale, as its name suggests, just scales. The shared-nothing architecture grants near-linear
scalability. The underlying Vitess is originally developed inside YouTube to handle scalability
challenge and it's been battle tested in other large internet companies ([1](https://slack.engineering/scaling-datastores-at-slack-with-vitess/), [2](https://www.cncf.io/case-studies/jdcom-vitess/)).

Neon can not scale as much as PlanetScale. After all, it's a single node PostgreSQL instance. Meanwhile
this single node can scale up to a very high degree. Neon separates the storage and compute,
cloud storage is infinite, cloud computing power also has a very high ceilling, then the scalability
is only constrained by the network bandwidth. Also thanks to the separation architecture, Neon enjoys
great elasticity since computing node can be scaled up/down easily.

---

It's also common that Postgres and MySQL co-exist inside an organization. And if you want to manage the database development
lifecycle for both of them, please check out [Bytebase](/).

![bytebase](/content/blog/planetscale-vs-neon/bytebase.webp)

## Further Readings

- [Postgres vs. MySQL](/blog/postgres-vs-mysql)
- [Announcing PlanetScale: The database for developers](https://planetscale.com/blog/announcing-planetscale-the-database-for-developers)
- [Neon – Serverless Postgres](https://news.ycombinator.com/item?id=31536827)
