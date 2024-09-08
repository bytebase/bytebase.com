---
title: 'Features I wish PostgreSQL had as a developer'
author: Tianzhou
updated_at: 2024/03/29 9:00:00
feature_image: /content/blog/features-i-wish-postgres-had/banner.webp
tags: Industry
featured: true
description: 'A list of features I wish PostgreSQL had. It is mainly around improving development workflow and inspired by Git. While acquiring Git-like behavior is challenging in database because of the stateful nature.'
---

We have been working with PostgreSQL and other databases for a while. In the realm of database management, PostgreSQL stands out for its robustness and flexibility. However, as developers navigate the complexities of modern application development, there are additional functionalities that could streamline their workflows. Here are the features I wish PostgreSQL had to make developers' lives easier:

## Versioned Schema

The PG catalog only stores the current schema. Schema migration tools usually need to create an external table to store the schema migration history. A built-in versioned schema will be beneficial:

1. Standardize the format. e.g. The version string, the status indicating whether the schema change is in progress.
2. Consistency. When schema migration history is stored externally, it's hard to guarantee the consistency between the migration history and the actual schema.
3. Rollback. If a new schema change introduces issues, versioning allows for safer rollbacks to previous stable states, minimizing downtime and impact on users.
4. Process enforcement. With a versioned schema and the migration history, it's easier to enforce that only a single schema migration can run on a database at any point in time.

## Online Schema Migration

PostgreSQL has been improving this area over the years, but there are still cases where altering the schema would block the database. [pg-osc](https://github.com/shayonj/pg-osc), [reshape](https://github.com/fabianlindfors/reshape) are built to tackle this. Ideally, PostgreSQL can encapsulate the long schema migration process:

- Temp tables created as part of the migration are internal tables. Thus it won't pollute the user space.
- Postgres exposes a migration progress percentage.

## State-based Migration (Declarative)

The typical way to do schema migration is to compose a list of `ALTER TABLE` statements. This becomes hard to track the latest schema state as the migration accumulates. It's more intuitive for the developers to specify the desired state. Ideally, PostgreSQL could allow developers to specify the desired `CREATE TABLE` schema, the engine then reconcile it with the latest schema, figure out the diff, and plan the migration path internally.

## Branching

During development, it's desirable to have a high-fidelity testing environment as close as the prod environment. The challenge is to fork the production database quickly enough (for compliance, it also needs to sanitize the sensitive data). What if PostgreSQL could have the instant git-like branching?

## Archived Table

To prevent deleting data by mistake, we invent soft-delete pattern by having a `is_deleted` column. However, this brings extra complexities around foreign key, unique index enforcement. Ideally, PostgreSQL could allow users to configure an archived table. The removed data is moved to the archived table first and purged after a configured retention period. This simplifies application logic and data compliance work.

## Label

PostgreSQL allows adding [SECURITY LABEL](https://www.postgresql.org/docs/current/sql-security-label.html) to the objects. I wish it could be extended to a more generic label system where users can attach arbitrary KV pairs. This would be useful in data dictionary, reporting, and orchestrating developer workflow. e.g.

- Find all tables/databases owned by a particular application.
- Require additional review when changing tables matching a certain label.

## Git Integration

Snowflake added this one in the [2023 summit](https://medium.com/snowflake/streamlining-devops-with-snowflake-and-git-integration-fc0b76a40a76):

![snowflake-git](/content/blog/features-i-wish-postgres-had/snowflake-git.webp)

This allows developers to keep the stored procedures, user-defined functions, and operational scripts in the same place as the application code. Thus they will adopt the same version control best practices.

Similar to how Foreign Data Wrapper (FDW) is implemented, the core PostgreSQL could provide the underlying infrastructure, and the specific VCS integration can be implemented as an extension.

## Summary

As to the database development workflow, Git is always the source of inspiration. Git is invented to
manage the stateless code, the hard part is to adapt Git to manage the stateful database. Companies
have already been pushing the frontiers:

- [Neon](https://neon.tech/) rebuilds the Postgres engine to enable serverless and instant branching.
- [Xata](https://xata.io/) offers serverless, branching, as well as zero-downtime schema migration.
- [Snaplet](https://snaplet.dev/) for seeding and sanitization.
- [Supabase](https://supabase.com/) for an entire application platform around Postgres.
- [Bytebase](https://bytebase.com/) for unifying all human-to-postgres operations including schema migration, ad-hoc change, data access control, and dynamic masking.

What's your most desired PostgreSQL feature?
