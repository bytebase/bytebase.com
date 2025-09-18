---
title: Bytebase Q3 2023 in Retrospect
author: Tianzhou
updated_at: 2023/10/10 18:21:21
feature_image: /content/blog/2023-q3-retrospect/2023-q3-retrospect-banner.webp
tags: Announcement
featured: true
description: As Q3 2023 comes to an end, let's take a look back at what we've accomplished at Bytebase in the past three months.
keypage: true
---

Hello October! Only a few more months before the new year rings in, let's take a look back at what we've accomplished at Bytebase in the past three months.

## Press

- Bytebase officially [crossed 1 Million downloads](/blog/one-million-downloads/).
- [Technology partnership with GitLab](/blog/bytebase-gitlab-technology-partner/).

## Popular Posts

- The MySQL and PostgreSQL Saga Series
  - Part I: [Postgres vs. MySQL](/blog/postgres-vs-mysql/)
  - Part II: [PlanetScale vs. Neon](/blog/planetscale-vs-neon/)
- Side-by-side comparison between [Bytebase and Liquibase](/blog/bytebase-vs-liquibase/), and [Bytebase and Flyway.](/blog/bytebase-vs-flyway/)

## Product Update

Bytebase keeps up with the bi-weekly release cadence and released 7 versions.

### [Database Integration](https://docs.bytebase.com/introduction/supported-databases/)

- Snowflake: support Task, Stream objects, and data access control.
- Redshift: support datashare query, data access control, and data masking.
- SQL Server: additional SQL review rules.
- Oracle: Schema Sync.

### Database Change Management

- Visual [Schema Editor](https://docs.bytebase.com/change-database/schema-editor/) for MySQL.
- Git-like database Branching for MySQL.
- Run SQL Review checks without requiring a rollout.
- Search the entire Issue history by title/description/instance/database/issue type/date range/creator/assignee/subscriber.
- Use markdown format in the Issue comment section.
- Revamped database change UI.

### SQL Editor

- Session persistence in admin mode.
- Revamped SQL Editor UI.

### Data Security

- [Data access control](https://docs.bytebase.com/security/database-permission/overview/) for query, export, and copy data.
- Dynamic [Data Masking](https://docs.bytebase.com/sql-editor/mask-data/) for MySQL, Postgres, TiDB, Oracle, SQL Server, MariaDB, and OceanBase.
- Enforce [sign-in frequency](https://docs.bytebase.com/administration/sign-in-restriction/#sign-in-frequency).
- [LDAP](https://docs.bytebase.com/administration/sso/ldap/) for SSO.
- Export [Audit Logs](https://docs.bytebase.com/security/audit-log/).

### Data Governance

- Schema Template with pre-defined columns and tables.

### General

- More granular [Instance-level license](https://docs.bytebase.com/administration/license/). Users can import all instances into Bytebase to manage, meanwhile, they can just purchase fewer instance licenses and assign them to a subset of instances requiring advanced features.
- Set up workspace-wide custom announcement banner.

---

We are still busy building several exciting features to be landed before the holiday season. See you in 3 months!
