---
title: Use Cases
description: This page lists some popular Bytebase use cases.
---

Before understanding use cases, it's useful to know [what Bytebase is](/docs/introduction/what-is-bytebase). This page lists some popular Bytebase use cases.

## Multi-Database Management

Organizations normally have more than one database system for managing OLTP and OLAP workload. Bytebase supports popular database systems including MySQL, PostgreSQL, ClickHouse, TiDB, and Snowflake.

## Database Change Automation

Similar to how GitLab/GitHub streamlines the code delivery, Bytebase streamlines the database change deployment from the non-prod environment all the way to the prod environment. Bytebase also integrates with VCS to enable GitOps workflow. You can manage database change scripts in VCS and Bytebase will start a new deployment process whenever observing the new change scripts.

You can also integrate Bytebase's CLI bb into your existing CI/CD workflow.

## Database Developer Portal

As the engineering team grows, there will form a platform team or a dedicated DBA team to manage the database infrastructure and support developers to interact with their application databases. Bytebase provides a centralized portal for Developers/DBAs/Platform Engineers to collaborate on database-related tasks such as reviewing database changes, querying data, backing up and restoring databases and etc.

## Multi-Tenant Service

A SaaS service may provision separate [tenant databases](/docs/concepts/tenant-database) for each of its tenants. It's painful and error-prone to make sure a database change is consistently applied to each individual tenant's database. Bytebase provides [management capability](/docs/batch-change/overview) to group those databases and manages the lifecycle of those databases in a single workflow.

## Schema Enforcement and Engineering Excellence

Data quality and system robustness are largely determined by the database schema. And being able to enforce standards consistently is the key to a high-quality schema. Bytebase can enforce schema rules including naming convention, anti-SQL pattern detections and etc. You can also configure each individual rule for prod and non-prod environments respectively.
