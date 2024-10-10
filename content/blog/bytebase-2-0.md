---
title: Bytebase 2.0 - the GitLab for Database DevOps
author: Tianzhou
updated_at: 2023/05/11 11:00:00
feature_image: /content/blog/bytebase-2-0/bytebase-database-devops-cover.webp
tags: Announcement
featured: true
description: Pioneering Database Change Management and bring the GitLab/GitHub experience to database development
---

Recent AI breakthroughs have excited us all. However, developers still struggle with mundane daily tasks.
One is dealing with databases, mundane yet requiring care—or you'll get a daring outage. Two years
ago, we created Bytebase to address this, [open-sourcing it on GitHub](https://github.com/bytebase/bytebase).
Compared to incumbents, Bytebase's growth outpaces theirs.

![star-history](/content/blog/bytebase-2-0/star-history.webp)

A year ago, we monetized Bytebase 1.0, welcoming global customers across industries. Today marks another
milestone: **Bytebase 2.0**.

## One to Twelve

![supported-database](/content/blog/bytebase-2-0/supported-database.webp)

Bytebase initially supported MySQL. Bytebase 2.0 now supports twelve:

- OLTP: MySQL, PostgreSQL, Oracle, SQL Server, MariaDB
- OLAP: Snowflake, ClickHouse
- NewSQL: Google Cloud Spanner, TiDB, OceanBase
- NoSQL: MongoDB, Redis

You can now deploy a single Bytebase instance to manage the heterogeneous database systems. Stay
tuned for more.

## New Cloud Offering

Accessing databases often favors internal network. Bytebase provides easy on-premise deployment with
a single binary, self-contained Docker image, and Helm chart. Though cloud services convenience
rivals on-premise, we release Bytebase Cloud as an additional option. Bytebase Cloud equals the
self-hosted version without user infrastructure management. To quickly experience Bytebase, sign up
for our [free cloud plan](https://hub.bytebase.com/workspace) and follow the quickstart guide.

![quickstart](/content/blog/bytebase-2-0/quick-start.webp)

## Pioneering Database Change Management (DCM)

We founded Bytebase because, as developers ourselves, we were dissatisfied with existing solutions.
After over two years developing, Bytebase emerged as the most comprehensive Database Change Management (DCM) solution.
Bytebase is establishing best practices for conducting database changes with its unique features:

- The first product to offer a GUI workspace for developers and DBAs to collaborate together.
- Native VCS and Terraform integration for GitOps/Database-as-Code.
- Batch mode for changing multiple environments and tenants consistently.
- Improve SQL code quality and consistency with 100+ lint rules for PostgreSQL and MySQL. Integrate
  this tool into GitHub or GitLab CI to always check code before commit or deploy.
- Terraform like stated-based database schema migration.
- Risk-centric, holistic view to manage database operations and custom approval flow.

![risk-center](/content/blog/bytebase-2-0/risk-center.webp)

## Enterprise-Ready

RBAC, SSO, 2FA, audit logs, watermarking are table stakes. Bytebase 2.0 also brings database
domain-specific enterprise features:

- DBA workflow and environment tier to enforce operation policy
- Sensitive data masking
- Data access control
- Database anomaly detection such as schema drift detection

Bytebase is Compliance-By-Design (CBD). We consult Big 4 auditing teams to design features understand
compliance requirements like SOC2, ISO 27001, etc. Customers adopt Bytebase to meet compliance around
data change and access control out of the box.

## Embracing AI

Bytebase incorporates recent AI breakthroughs into the product. You can already use natural language
to query the database from the Bytebase SQL Editor.

![chat-to-sql](/content/blog/bytebase-2-0/chat-to-sql.webp)

Bytebase 2.0 adds a new AI capability: to provide index advice for slow queries.

![chat-to-sql](/content/blog/bytebase-2-0/index-advisor.webp)

Last month, we also announced a new product: [SQL Chat](https://sqlchat.ai), a chat-based SQL client. Use natural language
to query your database.

![sql chat](/content/blog/bytebase-2-0/sql-chat.webp)

## New Website and Enriched Free Plan

For the past several months, we have been partnered with the talented [Pixel Point team](https://pixelpoint.io/) to redesign
our marketing site. In addition to cool animations, we have completely rebuilt the site's content to
deliver a better message to our audience.

![hero-section](/content/blog/bytebase-2-0/hero-section.webp)

We want every development team, regardless of size, to adopt best practices for database change
management. To achieve this, we make Bytebase more accessible to small and medium teams. As a
result, we moved several key features from the paid plan to the free plan in Bytebase 2.0:

- RBAC
- All 100+ SQL lint rules instead of just 2
- Remove the 10-user account limit
- Lift the instance limit from 10 to 20

## Quest beyond Database Schema Change

Bytebase was created to address a specific, long-standing problem: proper database schema change
management. Bytebase 2.0 has evolved into a Database DevOps platform, being capable of managing the
entire database development lifecycle: change, query, secure, govern all databases in a single place.

![lifecycle](/images/db-scheme-lg.png)

Our goal has remained unchanged since incubating Bytebase two years ago, to bring the GitLab/GitHub
experience to database development.
