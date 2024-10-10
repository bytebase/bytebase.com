---
title: Bytebase 3.0 - Database DevSecOps Platform
author: Tianzhou
updated_at: 2024/10/24 10:24:00
feature_image: /content/blog/bytebase-3-0/cover.webp
tags: Announcement, Hidden
featured: true
description: Database DevSecOps, maintain developer velocity without compromising data security
---

After 17+ months of bake, 5000+ commits, and 33 minor/patch releases, we are announcing Bytebase 3.0 today.

## More databases

![database](/content/blog/bytebase-3-0/database.webp)

Bytebase 2.0 supports 12 database types. This number turns to 22. Redshift, StarRocks, RisingWave, Hive, Elasticsearch, BigQuery, DynamoDB, Databricks, CockroachDB, and OceanBase (Oracle Mode) are new additions. Bytebase wants to be the single database development platform for all heterogeneous databases in your organization.

## The security part of database operations

Security is intrinsic to database operations. However, typical database solutions sacrifice security for the sake of efficiency (wide-open) or vice versa (fully-gated).

![trolley-problem](/content/blog/bytebase-3-0/trolley-problem.webp)

Bytebase provides a collaboration workspace for developers, DBAs, and security engineers to handle human-to-db database operations:

1. Schema migration.
1. One-off, ad-hoc change.
1. Data query.

Beyond centralizing the database operations, Bytebase also provides [SQL Review to lint SQL statements](/docs/sql-review/overview/), [1-click rollback](/docs/change-database/rollback-data-changes/), [data access control](/docs/security/data-access-control/), [dynamic data masking](/docs/security/data-masking/overview/), etc. To achieve these capabilities, Bytebase needs to understand the SQL dialects of the target database systems and we build parsers [for](https://github.com/bytebase/mysql-parser) [each](https://github.com/bytebase/postgresql-parser) [of](https://github.com/bytebase/plsql-parser) [them](https://github.com/bytebase/tsql-parser).

## Revamped API

We have rebuilt our entire API infrastructure since 2.0. The new API speaks both gRPC and http/REST with fine-granular permissions to control every aspect of Bytebase. Our customers use Bytebase API in ways that fit their best:

- Build custom GitOps workflow to check and deploy database changes.
- Embed Bytebase SQL Editor and use API to configure the data access and masking policies.
- Make Bytebase headless, treating it as a pure database deployment backend.

https://api.bytebase.com is ubiquitous because the Bytebase UI console is also built on this API.

## AI assistant

Database is a perfect candidate to apply the recent AI breakthrough. Besides the common Text2SQL capability, Bytebase incorporates AI into other places:

- Suggest index optimization for slow queries.
- Explain cryptic stored procedures.
- Fix and rewrite SQLs.

## Our continued mission

As an [open-source project](https://github.com/bytebase/bytebase), Bytebase has crossed 11k GitHub stars and is the fastest-growing database project. Bytebase has been downloaded over 4,000,000 times across the globe, from [the tiny island in the middle of the Pacific Ocean](https://www.google.com/maps/place/French+Polynesia) to [one of the most successful game makers on the planet](https://www.mihoyo.com/). The 3.0 release is a lockstep advancement toward our founding mission from 2021: to be the unified platform for all human-to-database operations across all databases.

---

_Upgrading to 3.0 should be as simple as bumping the version number and restarting (of course, don’t forget to back up just in case). Please follow the [upgrade guide](/docs/get-started/upgrade/) for details._
