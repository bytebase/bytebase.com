---
title: Use Cases
description: The common use cases Engineering teams use Bytebase.
---

Bytebase provides a centralized database development portal for Developers/DBAs/Platform Engineers to collaborate on database-related tasks. This page lists the common Bytebase use cases.

## Multi-Database Management

Organizations normally have more than one database system for managing OLTP and OLAP workload. Bytebase supports all [mainstream databases](/docs/introduction/supported-databases).

## Database Change Automation

Similar to how GitLab/GitHub streamlines the code delivery, Bytebase streamlines the database change deployment from the non-prod environment all the way to the prod environment. Bytebase also integrates with VCS to enable GitOps workflow. You can manage database change scripts in VCS and Bytebase will start a new deployment process whenever observing the new change scripts.

You can also integrate Bytebase's SQL lint into your existing CI/CD workflow.

- [The Database CI/CD Best Practice with GitHub](/docs/tutorials/database-cicd-best-practice-with-github)
- [The Database CI/CD Best Practice with GitLab](/docs/tutorials/database-cicd-best-practice-with-gitlab)

## Schema Enforcement

Data quality and system robustness are largely determined by the database schema. And being able to enforce standards consistently is the key to a high-quality schema. Bytebase can enforce [100+ SQL Review rules](/docs/sql-review/overview) including naming convention, anti-SQL pattern detections and etc. You can also configure each individual rule for prod and non-prod environments respectively.

## Data Access Control and Masking

Organizations want to limit database access and enforce approval flow to conform compliance and avoid data leaks. Bytebase provides a suite of features to support this:

- [Data Query Approval Flow](/docs/security/data-query)
- [Data Export Approval Flow](/docs/security/data-export)
- [Data Masking](/docs/security/mask-data)
- [Data Access Control](/docs/security/data-access-control)
- [Watermark](/docs/security/watermark)
- [Audit Log](/docs/security/audit-log)

## Partitioned Database and Tables

As data grows, databases and tables maybe partitioned into smaller chucks. Meanwhile, you still want to
apply the same database change to all partitions since they share the same schema. It's painful and error-prone to make sure a database change is consistently applied to each partition. Bytebase has [Database Group](/docs/concepts/batch-mode/#database-group) and can [change databases from database groups](/docs/change-database/batch-change/#change-databases-from-database-groups).

## Multi-Tenant Service

A SaaS service may provision separate databases for each of its tenants. It's painful and error-prone to make sure a database change is consistently applied to each individual tenant's database. Bytebase has [Tenant database](/docs/concepts/batch-mode/#tenant-database) and can [change databases from multiple tenants](/docs/change-database/batch-change/#change-databases-from-multiple-tenants).
