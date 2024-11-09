---
title: Use Cases
description: The common use cases Engineering teams use Bytebase.
---

Bytebase provides a centralized database development portal for Developers/DBAs/Platform Engineers to collaborate on database-related tasks. This page lists the common Bytebase use cases.

## Database Security

Organizations want to limit database access and enforce approval flow to conform compliance and avoid data leaks. Bytebase provides a suite of features to support this:

- [Database Permission](/docs/security/database-permission/overview)
- [Data Masking](/docs/security/data-masking/overview)
- [Watermark](/docs/security/watermark)
- [Audit Log](/docs/security/audit-log)

## Multi-Database Management

Organizations normally have more than one database system for managing OLTP and OLAP workload. Bytebase supports all [mainstream databases](/docs/introduction/supported-databases).

## Database Change Automation

Similar to how GitLab/GitHub streamlines the code delivery, Bytebase streamlines the database change deployment from the non-prod environment all the way to the prod environment. Bytebase also supports GitOps with [built-in VCS integration](/docs/vcs-integration/overview) and custom CI integration via [API](/docs/api/overview/).

## Schema Enforcement

Data quality and system robustness are largely determined by the database schema. And being able to enforce standards consistently is the key to a high-quality schema. Bytebase can enforce [100+ SQL Review rules](/docs/sql-review/overview) including naming convention, anti-SQL pattern detections and etc. You can also configure each individual rule for prod and non-prod environments respectively.

## Multi-Tenant Service

A SaaS service may provision separate databases for each of its tenants. It's painful and error-prone to make sure a database change is consistently applied to each individual tenant's database. Bytebase can [change databases from multiple tenants](/docs/change-database/batch-change/#change-databases-from-multiple-tenants).

## Partitioned Database

As data grows, databases and tables maybe partitioned into smaller chucks. Meanwhile, you still want to
apply the same database change to all partitions since they share the same schema. It's painful and error-prone to make sure a database change is consistently applied to each partition. Bytebase can [batch change many databases in a consistent manner](/docs/change-database/batch-change/#change-database-group).

## Internal Development Platform (IDP)

The Bytebase UI console is built on the [public API](/docs/api/overview/). If you have your own IDP
and want to integrate database capabilities, you can treat Bytebase as a headless backend and call the API.
