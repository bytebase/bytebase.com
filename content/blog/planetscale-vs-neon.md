---
title: "PlanetScale vs. Neon: the Continued Saga between MySQL and PostgreSQL"
author: Tianzhou
updated_at: 2024/11/27 09:00
feature_image: /content/blog/planetscale-vs-neon/cover.webp
tags: Comparison
description: 'An extensive comparison between PlanetScale and Neon on architecture, compatibility, developer workflow,
scalability, operability, integration, compliance, pricing and more.'
---

This is a series of articles between MySQL and PostgreSQL:

- [MySQL vs. Postgres](/blog/postgres-vs-mysql)
- PlanetScale vs. Neon (this one)
- [TiDB vs. CockroachDB](/blog/tidb-vs-cockroachdb)

---

The last 2 years Stack Overflow survey ([2024](https://survey.stackoverflow.co/2024/technology/#1-databases), [2023](https://survey.stackoverflow.co/2023/#most-popular-technologies-database) shows that PostgreSQL has taken
over the first place spot from MySQL and become the most admired, desired database.

![stackoverflow](/content/blog/planetscale-vs-neon/stackoverflow.webp)

It seems that the love-hate relationship between MySQL and PostgreSQL will never end. From vanilla
MySQL vs. PostgreSQL, to distributed TiDB vs. CockroachDB, to cloud-native AWS Aurora vs. GCP AlloyDB, and now we
are entering the next chapter, the serverless, developer-oriented PlanetScale vs. Neon.

![planetscale](/content/blog/planetscale-vs-neon/planetscale.webp)

![neon](/content/blog/planetscale-vs-neon/neon.webp)

At Bytebase, we work with the MySQL / PostgreSQL ecosystems extensively. Our founders also build [Google Cloud SQL](https://cloud.google.com/sql), one of the largest hosted MySQL & Postgres cloud services.

Below we give an extensive comparison between PlanetScale and Neon from the following dimensions:

- [Architecture](#architecture)
- [Compatibility](#compatibility)
- [Developer Workflow](#developer-workflow)
- [Reliability](#reliability)
- [Scalability](#scalability)
- [Operability](#operability)
- [Integration](#integration)
- [Compliance](#compliance)
- [Open Source](#open-source)
- [Pricing](#pricing)
- [Funding](#funding)

## Architecture

PlanetScale is a distributed database based on [Vitess](https://vitess.io/). Vitess is a shared-nothing
architecture where each shard contains a MySQL primary node and set of replicas. VTGate proxy routes
the application request to the respective shard.

![vitess-arch](/content/blog/planetscale-vs-neon/vitess-arch.webp)

Neon is a shared-storage architecture. It separates the compute and storage. The compute part is
just normal PostgreSQL server, the storage part is a custom-built multi-tenant storage system shared
by all Postgres compute nodes.

![neon-arch](/content/blog/planetscale-vs-neon/neon-arch.webp)

## Compatibility

**[PlanetScale's MySQL compatibility](https://planetscale.com/docs/reference/mysql-compatibility) is constrained.**

1. [Underlying Vitess limitations](https://vitess.io/docs/15.0/reference/compatibility/mysql-compatibility/). Vitess shared-nothing architecture carries inherent compatibility limitations. Features requiring session maintenance or cross-shard coordination are challenging to implement.

1. Product trade-off. e.g. To support online DDL, PlanetScale disallows foreign keys entirely, which is more strict than Vitess' FK limitation.

1. Cloud operating model. No super privilege or LOAD DATA INFILE to access the host file system.

**Neon is [mostly compatible](https://neon.tech/docs/reference/compatibility) with vanilla PostgreSQL.**

Neon rebuilds the paging layer and just lightly changes the Postgres codebase. Neon's compatibility is only constrained by its cloud operating model, which are similar to other hosted database services (no superuser or host file system access).

## Developer Workflow

Both PlanetScale and Neon are targetting developers, and they are telling the same developer workflow story in different ways.

PlanetScale's story emphasizes the end-to-end experience, from branching, to schema migration, monitoring and revert.

![planetscale-workflow](/content/blog/planetscale-vs-neon/planetscale-workflow.webp)

Neon's story highlights the single branching feature. Their purpose-built paging layer has copy-on-write (CoW), which makes branching instantaneous and cost-effective.

![neon-branch](/content/blog/planetscale-vs-neon/neon-branch.webp)

## Reliability

Shared-nothing architecture is inherently fault-tolerant as data is sharded and replicated. Vitess
is a proven technology used by logos across the globe. PlanetScale has also proved its reliability
for not having notable outages for years.

![vitess-user](/content/blog/planetscale-vs-neon/vitess-user.webp)

Shared-storage architecture requires more engineering effort to make the logical SPOF storage component
fault tolerant. Neon details the work in [its architecture decisions](https://neon.tech/blog/architecture-decisions-in-neon).

As a database trailblazing new architecture, Neon's advantage is it sits on a solid foundation.
PostgreSQL itself is rock solid and fully transactional. Neon's Pageserver approach also aligns
perfectly with the WAL-based logging in PostgreSQL. Neon is also able to use Rust, a more suitable
system language to implement its storage layer.

## Scalability

PlanetScale, as its name suggests, is planet-scale. The shared-nothing architecture grants near-linear
scalability [up to 1 million QPS](https://planetscale.com/blog/one-million-queries-per-second-with-mysql). The underlying Vitess is originally developed inside YouTube to handle scalability
challenges and it's been battle-tested in other large internet companies ([1](https://slack.engineering/scaling-datastores-at-slack-with-vitess/), [2](https://www.cncf.io/case-studies/jdcom-vitess/)).

Neon can not scale as much as PlanetScale. After all, it's a single-node PostgreSQL instance. But
this single node can scale up quite well. Neon separates the storage and compute, thus each can scale individually. And in the cloud, storage is infinite, compute is abundant, only the network bandwidth is constrained. The separated architecture also infers elasticity, scale-to-zero is as easy as scale-up.

## Operability

**PlanetScale provides a complete managed database solution. It tries to take care of [every aspect of using the
database](https://planetscale.com/blog/all-the-tech-planetscale-replaces).**

![planetscale-tech](/content/blog/planetscale-vs-neon/planetscale-tech.webp)

- **Deploy requests** and **Branches** for database change workflow.
- **Insights** for monitoring.
- **Boost** for speeding up query performance.
- **Revert** for reverting the change.
- **Console** for mysql CLI experience in the browser.
- **Backup** for disaster recovery.

It's quite a lot to cover and PlanetScale manages to craft every pixel. e.g. [Boost](https://planetscale.com/features/boost) shows PlanetScale's strength to transform an [academic paper](https://jon.thesquareplanet.com/papers/phd-thesis.pdf) into a polished product.

![planetscale-boost](/content/blog/planetscale-vs-neon/planetscale-boost.webp)

**Neon is relatively new and provides essentials.**

- Disaster recovery is provided by its branching feature.
- A visual SQL Editor to interact with the database.

![neon-sql-editor](/content/blog/planetscale-vs-neon/neon-sql-editor.webp)

The SQL Editor is handy. Here Neon embeds an external view from [explain.dalibo.com](https://explain.dalibo.com/) to display the query plan. It looks a bit strange visually, but serves the purpose well.

## Integration

PlanetScale itself is already a comprehensive database platform. Its [doc site](https://planetscale.com/docs) also lists a handful of standard database integrations:

- Application frameworks from major languages.

- Monitoring with Datadog.

- Data transfer via Airbyte, Stitch, Hightouch.

Neon hasn't accumulated many standard database integrations yet. But Neon's unique capabilities unlock new integration frontiers:

- [Snaplet](https://docs.snaplet.dev/tutorials/neon/) uses Neon to instantaneously prepare production database snapshots for the testing environment.

- [Replit](https://neon.tech/blog/neon-replit-integration) leverages Neon's scale-to-zero to offer its users a minimum-cost database service.

- [Vercel](https://neon.tech/blog/neon-vercel-integration) pairs with Neon's database branching to provide a realistic preview deployment in minutes instead of hours.

## Compliance

PlanetScale has [SOC2 Type 2 and HIPAA](https://planetscale.com/docs/concepts/security). Neon has completed [SOC2 Type 2](https://neon.tech/docs/security/security-overview).

## Open Source

PlanetScale and Neon choose an identical strategy, open soucing their database codebase under the same liberal license and only charging the cloud service.

[![Star History](/content/blog/planetscale-vs-neon/star-history.webp)](https://star-history.com/#planetscale/beam&vitessio/vitess&neondatabase/neon&Date)

PlanetScale is based on a [Vitess fork](https://github.com/planetscale/vitess) under Apache-2.0. The team once built [gh-ost](https://github.com/github/gh-ost), the
best online schema migration tool for MySQL and probably among all open source RDBMS. They also open sourced [beam](https://github.com/planetscale/beam), a message board web app to showcase PlanetScale.

Neon also [open sources](https://github.com/neondatabase/neon) its entire database codebase under Apache-2.0 license.

## Pricing

PlanetScale employs a usage-based pricing on row reads/writes. This is atypical for a database service and raises [controversy](https://news.ycombinator.com/item?id=30457960). On one hand, it brings extra incentive for people to optimize queries, on the other hand, bad queries
are inevitable and MySQL query optimizer is also [flawed](https://news.ycombinator.com/item?id=29455852). To offset this concern, PlanetScale
recently introduced a new [Scaler Pro tier](https://planetscale.com/blog/announcing-scaler-pro) for unlimited row reads/writes.

![planetscale-pricing](/content/blog/planetscale-vs-neon/planetscale-pricing.webp)

Neon offers a usage-based pricing based on 4 metrics: **active compute time**, **data storage**, **data transfer out** and **data written**.
This pricing model is more traditional and predictable. Neon also provides a pricing calculator to estimate the cost.

![neon-pricing](/content/blog/planetscale-vs-neon/neon-pricing.webp)

## Funding

Both are well-funded companies led by industry veterans. PlanetScale has raised $105M so far, while Neon nabs $103M (including a very recent [$46M series B](https://neon.tech/blog/series-b-funding)).

## PlanetScale or Neon

|                    | PlanetScale                                                              | Neon                                                                     |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Architecture       | Shared-nothing, sharded compute and storage unit                         | Shared-storage, separated compute and storage                            |
| Compatibility      | Limited by the underlying shared-nothing architecture                    | Near-compatible                                                          |
| Developer Workflow | End-to-end experience                                                    | Instantaneous and cost-effective branching                               |
| Reilability        | Proven technology with track record                                      | New architecture on a solid foundation                                   |
| Scalability        | Scale out to near infinite                                               | Scale up to an extent, scale-to-zero elasticity                          |
| Operability        | Comprehensive, polished tooling                                          | Essential, pragmatic tooling                                             |
| Integration        | Typical database integrations                                            | Novel integrations enabled by instant branching and elasticity           |
| Compliance         | SOC 2 Type 2, HIPAA                                                      | SOC2 Type 1                                                              |
| Open Source        | Close-sourced paid cloud service; Open-sourced database under Apache-2.0 | Close-sourced paid cloud service; Open-sourced database under Apache-2.0 |
| Pricing            | Row reads/writes + storage + HA                                          | Computation + storage + data transfer                                    |
| Funding            | $105M                                                                    | $103M                                                                    |

Overall, PlanetScale provides a cohesive experience for every database task. Originally, it was a hosted MySQL-compatible Vitess service only for hyperscalers. Since [pivoting to developers](https://planetscale.com/blog/announcing-planetscale-the-database-for-developers), PlanetScale has
transformed into an advanced serverless database platform that happens to speak the MySQL dialect.

Neon debuted later, and has a very similar value proposition as the new PlanetScale. Unlike PlanetScale,
Neon knows its targeting audiences from day 1, and purposefully builds the technology catering to them:

- Git-like branch management, in particular, the instant branching including both schema and data.
- Serverless database with autoscaling up and down.
- Embrace the rise of Postgres and maintain near-perfect Postgres compatibility.

## Beyond PlanetScale and Neon

Today, when choosing the database system for your next project, the very first thing to consider is
no longer between [Postgres vs. MySQL](/blog/postgres-vs-mysql). Instead, it's whether to choose
RDBMS or other genres. RDBMS still dominates the database market by shares, however, ironically,
this space doesn't advance as much as other database segments in the cloud era. Customers do have [a plethora of choices](/blog/database-as-a-service-dbaas-provider/), but none is coming close to MongoDB Altas for NoSQL
or Snowflake for OLAP.

PlanetScale and Neon are similar to each other, they are also similar to MongoDB / Snowflake:

- Like MongoDB, PlanetScale uses shared-nothing architecture, provides
  a comprehensive database platform, is developer obsessed, and tells great product stories.

- Like Snowflake, Neon brings the novel shared-storage approach to the staggering OLTP architecture, uses Postgres dialect, and also values developer experience.

Both PlanetScale and Neon could become the next MongoDB / Snowflake for modern RDBMS database-as-a-service (DBaaS). We've all been waiting too long for this.

_A side note: PlanetScale has shifted its website art direction to a simplistic style, marking another drastic difference from Neon._

![website-planetscale](/content/blog/planetscale-vs-neon/website-planetscale.webp)
![website-neon](/content/blog/planetscale-vs-neon/website-neon.webp)

---

BTW, if you still stick with vanilla MySQL/Postgres and want PlanetScale's database change workflow or Neon's visual SQL Editor, please check out [Bytebase](/). Bytebase is a database tool for all mainstream databases, covering database change, query, security and governance all-in-one. It provides more customizable [change workflow](/docs/concepts/database-change-workflow/) and visual [SQL Editor](/docs/sql-editor/overview/) integrated with [access control](/docs/security/database-permission/overview/) and [data masking](/docs/security/data-masking/overview/).

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)

## Further Readings

- [Announcing PlanetScale: The database for developers](https://planetscale.com/blog/announcing-planetscale-the-database-for-developers)
- [All of the tech PlanetScale replaces](https://planetscale.com/blog/all-the-tech-planetscale-replaces)
- [One million queries per second with MySQL](https://planetscale.com/blog/one-million-queries-per-second-with-mysql)
- [Neon – Serverless Postgres](https://news.ycombinator.com/item?id=31536827)
- [Architecture decisions in Neon](https://neon.tech/blog/architecture-decisions-in-neon)
- [Database as a Service (DBaaS) Provider](/blog/database-as-a-service-dbaas-provider/)

## Other Comparisons

- [Postgres vs. MySQL](/blog/postgres-vs-mysql)
- [MySQL vs. MariaDB](/blog/mysql-vs-mariadb)
- [Postgres vs. MongoDB](/blog/postgres-vs-mongodb)
- [Neon vs. Supabase](/blog/neon-vs-supabase)
