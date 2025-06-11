---
title: Bytebase 3.0 - DevSecOps for Database
author: Tianzhou
updated_at: 2024/10/24 10:24:00
feature_image: /content/blog/bytebase-3-0/cover.webp
tags: Announcement
featured: true
description: Database DevSecOps, maintain developer velocity without compromising data security
---

After 17 months of baking, over 5000 commits, we’re excited to announce the launch of Bytebase 3.0 today!

## Expanded Databases

![database](/content/blog/bytebase-3-0/database.webp)

Bytebase 2.0 supported 12 database types. With Bytebase 3.0, this number has increased to 22. [Redshift](https://aws.amazon.com/redshift/), [StarRocks](https://starrocks.com/), [RisingWave](https://risingwave.com/), [Hive](https://hive.apache.org/), [Elasticsearch](https://www.elastic.co/elasticsearch), [BigQuery](https://cloud.google.com/bigquery), [DynamoDB](https://aws.amazon.com/dynamodb/), [Databricks](https://www.databricks.com/), [CockroachDB](https://www.cockroachlabs.com/), and [OceanBase (Oracle Mode)](https://en.oceanbase.com/) are new additions. Bytebase aims to be the single database development platform for managing and developing all the diverse databases in your organization.

## Securing Database Operations

Security is fundamental to database operations. Unfortunately, many standard solutions tend to compromise security in favor of efficiency, resulting in wide-open access, while others take the opposite approach, locking down access completely.

![trolley-problem](/content/blog/bytebase-3-0/trolley-problem.webp)

Bytebase provides a collaboration workspace for developers, DBAs, and security engineers to handle human-to-db database operations:

1. Schema migration.
1. One-off, ad-hoc change.
1. Data query.

In addition to centralizing database operations, Bytebase offers features such as [SQL Review for linting SQL statements](https://docs.bytebase.com/sql-review/overview/), [one-click rollbacks](https://docs.bytebase.com/change-database/rollback-data-changes/), [data access control](https://docs.bytebase.com/security/database-permission/overview/), and [dynamic data masking](https://docs.bytebase.com/security/data-masking/overview/). To deliver these capabilities, Bytebase must comprehend the SQL dialects of various target database systems, which is why we build custom parsers [for](https://github.com/bytebase/mysql-parser) [each](https://github.com/bytebase/postgresql-parser) [of](https://github.com/bytebase/plsql-parser) [them](https://github.com/bytebase/tsql-parser).

## AI Assistant

![text-to-sql](/content/blog/bytebase-3-0/text-to-sql.webp)

Databases are ideal candidates for leveraging recent AI breakthroughs. In addition to the well-known Text2SQL capability, Bytebase integrates AI in various other ways:

- Suggesting index optimizations for slow queries.
- Explaining cryptic stored procedures.
- Fixing and rewriting SQL statements.

## Revamped API

![api](/content/blog/bytebase-3-0/api.webp)

We’ve completely rebuilt our API infrastructure. The new API speaks both gRPC and HTTP/REST, offering fine-grained IAM permissions that allow for precise control over every aspect of Bytebase. Our customers utilize the Bytebase API in ways that best suit their needs:

- Create custom GitOps workflows to review and deploy database changes.
- Embed the Bytebase SQL Editor and configure data access and masking policies through the API.
- Operate Bytebase in headless mode, using it solely as a database deployment backend.

https://api.bytebase.com is versatile, the Bytebase UI console itself is built entirely on this API.

## Our Continued Mission

As an [open-source project](https://github.com/bytebase/bytebase), Bytebase has surpassed 11,000 GitHub stars, making it the fastest-growing database project.

![star-history](/content/blog/bytebase-3-0/star-history.webp)

It has been downloaded over 4 million times worldwide, reaching users from [a small island in the middle of the Pacific Ocean](https://www.google.com/maps/place/French+Polynesia) to [some of the most successful game developers on the planet](https://www.mihoyo.com/). The 3.0 release is a steady step toward our founding mission from 2021: to become the unified platform for all human-to-database operations across all databases.

---

_You can obtain Bytebase directly or through the [AWS](https://aws.amazon.com/marketplace/seller-profile?id=seller-mqp4ph2m6bzzc) and [GCP](https://console.cloud.google.com/marketplace/product/bytebase-public/bytebase) marketplaces. To learn more, [schedule a demo](/request-demo/) with us._

_Upgrading to version 3.0 is designed to be straightforward—just increase the version number and restart (but don’t forget to back up your data as a precaution), please refer to the [upgrade guide](https://docs.bytebase.com/get-started/upgrade/)._
