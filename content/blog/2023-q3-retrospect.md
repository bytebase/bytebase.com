---
title: Bytebase Q3 2023 in Retrospect
author: Tianzhou
published_at: 2023/10/10 18:21:21
feature_image: /content/blog/2023-q3-retrospect-banner.webp
tags: Announcement
featured: true
description: As Q3 2023 comes to an end, let's take a look back at what we've accomplished at Bytebase in the past three months.
---

Hello October! Only a few more months before the new year rings in, let's take a look back at what we've accomplished at Bytebase in the past three months.

## Press

- Bytebase officially [crossed 1 Million downloads](/blog/one-million-downloads/).
- [Technology partnership with GitLab](/blog/bytebase-gitlab-technology-partner/).
- [How Bytebase helps a single DBA](/blog/ev-manufacturer-case-study/) to work with 1000+ developers to adopt Database DevOps for a top EV Manufacturer.

## Popular Posts

- The MySQL and PostgreSQL Saga Series
  - Part I: [Postgres vs. MySQL](/blog/postgres-vs-mysql/)
  - Part II: [PlanetScale vs. Neon](/blog/planetscale-vs-neon/)
- Side-by-side comparison between [Bytebase and Liquibase](/blog/bytebase-vs-liquibase/), and [Bytebase and Flyway.](/blog/bytebase-vs-flyway/)

## Product Update

Bytebase keeps up with the bi-weekly release cadence and released 7 versions.

### [Database Integration](/docs/introduction/supported-databases/)

- Snowflake: support Task, Stream objects, and data access control.
- Redshift: support datashare query, data access control, and data masking.
- SQL Server: additional SQL review rules.
- Oracle: Schema Sync.
- RisingWave: basic support.

### GitOps Integration

- Support [GitHub Enterprise](/docs/vcs-integration/github-enterprise/).
- Support [Azure DevOps](/docs/vcs-integration/azure-devops/).

### Database Change Management

- Visual [Schema Editor](/docs/change-database/schema-editor/) for MySQL.
- Git-like database Branching for MySQL.
- Run SQL Review checks without requiring a rollout.
- Search the entire Issue history by title/description/instance/database/issue type/date range/creator/assignee/subscriber.
- Use markdown format in the Issue comment section.
- Revamped database change UI.

### SQL Editor

- Session persistence in admin mode.
- Revamped SQL Editor UI.

### Data Security

- [Data access control](/docs/security/data-access-control/) for query, export, and copy data.
- Dynamic [Data Masking](/docs/sql-editor/mask-data/) for MySQL, Postgres, TiDB, Oracle, SQL Server, MariaDB, and OceanBase.
- Enforce [sign-in frequency](/docs/administration/sign-in-frequency/).
- [LDAP](/docs/administration/sso/ldap/) for SSO.
- Export [Audit Logs](/docs/security/audit-log/).

### Data Governance

- Schema Template with pre-defined columns and tables.

### General

- More granular [Instance-level license](/docs/administration/license/). Users can import all instances into Bytebase to manage, meanwhile, they can just purchase fewer instance licenses and assign them to a subset of instances requiring advanced features.
- Set up workspace-wide custom announcement banner.

---

We are still busy building several exciting features to be landed before the holiday season. See you in 3 months!
