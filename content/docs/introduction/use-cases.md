---
title: Use Cases
description: This page lists some popular Bytebase use cases.
---

Before understanding use cases, it's useful to know [what Bytebase is](/docs/introduction/what-is-bytebase). This page lists some popular Bytebase use cases.

## Multi-Database Management

Organizations normally have more than one database system for managing OLTP and OLAP workload. Bytebase supports all [mainstream databases](/docs/introduction/supported-databases)

## Database Change Automation

Similar to how GitLab/GitHub streamlines the code delivery, Bytebase streamlines the database change deployment from the non-prod environment all the way to the prod environment. Bytebase also integrates with VCS to enable GitOps workflow. You can manage database change scripts in VCS and Bytebase will start a new deployment process whenever observing the new change scripts.

You can also integrate Bytebase's CLI bb into your existing CI/CD workflow.

## Data Access Control

Organizations want to limit database access and enforce approval flow to conform compliance and avoid data leaks. Bytebase provides a suite of features to support this:

- [Data Query Approval Flow](/docs/security/data-query)
- [Data Export Approval Flow](/docs/security/data-export)
- [Anonymize Data](/docs/security/anonymize-data)
- [Data Access Control](/docs/security/data-access-control)
- [Watermark](/docs/security/watermark)
- [Audit Log](/docs/security/audit-log)

## Database Developer Portal

As the engineering team grows, there will form a platform team or a dedicated DBA team to manage the database infrastructure and support developers to interact with their application databases. Bytebase provides a centralized portal for Developers/DBAs/Platform Engineers to collaborate on database-related tasks such as reviewing database changes, querying data, backing up and restoring databases and etc.

## Partitioned Database and Tables

As data grows, databases and tables maybe partitioned into smaller chucks. Meanwhile, you still want to
apply the same database change to all partitions since they share the same schema. It's painful and error-prone to make sure a database change is consistently applied to each partition. Bytebase has [Database Group](/docs/concepts/batch-mode/#database-group) and can [change databases from database groups](/docs/change-database/batch-change/#change-databases-from-database-groups).

## Multi-Tenant Service

A SaaS service may provision separate databases for each of its tenants. It's painful and error-prone to make sure a database change is consistently applied to each individual tenant's database. Bytebase has [Tenant database](/docs/concepts/batch-mode/#tenant-database) and can [change databases from multiple tenants](/docs/change-database/batch-change/#change-databases-from-multiple-tenants).

## Schema Enforcement and Engineering Excellence

Data quality and system robustness are largely determined by the database schema. And being able to enforce standards consistently is the key to a high-quality schema. Bytebase can enforce schema rules including naming convention, anti-SQL pattern detections and etc. You can also configure each individual rule for prod and non-prod environments respectively.
