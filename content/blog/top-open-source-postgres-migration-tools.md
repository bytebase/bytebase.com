---
title: Top Open Source Postgres Migration Tools in 2025
author: Tianzhou
updated_at: 2025/03/16 09:00:00
feature_image: /content/blog/top-open-source-postgres-migration-tools/cover.webp
tags: Industry
featured: true
description: What are the top open source Postgres schema migration tools.
---

<HintBlock type="info">

This post is maintained by Bytebase, an open-source database Management Software. We update the post once per year.

</HintBlock>

| Update History | Comment          |
| -------------- | ---------------- |
| 2024/01/16     | Initial version. |
| 2024/03/16     | Update for 2025. |

PostgreSQL is the DBMS of the Year 2023 and the runner-up in 2024. On the other hand,
database schema migration in Postgres is still PITA. In this post, we are reviewing several open source
database schema migration tools for Postgres.

[![starhistory](/content/blog/top-open-source-postgres-migration-tools/star-history.webp)](https://star-history.com/#bytebase/bytebase&xataio/pgroll&liquibase/liquibase&flyway/flyway&graphile/migrate&fabianlindfors/reshape&Date)

## Bytebase

[Bytebase](https://github.com/bytebase/bytebase) is an all-in-one database DevOps and CI/CD solution. It's like GitHub/GitLab that provides
a GUI workspace for developers and DBAs to collaborate on database changes. It's written in Go and TypeScript.

![issue-detail](/content/blog/top-open-source-postgres-migration-tools/issue-detail.webp)

It also provides configurable SQL lint rules to detect SQL anti-patterns such as `NOT NULL` enforcement.

![sql-review](/content/blog/top-open-source-postgres-migration-tools/sql-review.webp)

Apart from taking care of database change management, Bytebase also provides a SQL Editor with data
access control, dynamic data masking and audit logs to control the query path.

![sql-editor](/content/blog/top-open-source-postgres-migration-tools/sql-editor.webp)

## Liquibase

[Liquibase](https://github.com/liquibase/liquibase) is arguably the most well-known product in this segment. It's CLI-based and written in Java.

In Liquibase, the schema migrations are organized as `Changeset` and `Changelog`. Probably due to its age and root in Java, the most commonly used form is XML (YAML and JSON support have been added later):

![_](/images/products/liquibase/liquibase-xml.webp)

Plain SQL is also supported with proper annotation:

![_](/images/products/liquibase/liquibase-sql.webp)

## Flyway

[Flyway](https://github.com/flyway/flyway) is another open source project with a long history and a large customer base. Its core product includes the CLI and a Java library.

Flyway has been acquired by Redgate, while it still retains a developer-oriented approach. This can be
felt from its website.

![_](/images/products/flyway/flyway-migration.webp)

Liquibase and Flyway are closely matched in their offerings. The key distinction between them is their target audiences: Liquibase is oriented towards serving enterprise clients, whereas Flyway presents itself as more developer-friendly and approachable.

## Reshape

[Reshape](https://github.com/fabianlindfors/reshape) takes a novel approach to achieve zero-downtime
schema migrations. It's CLI based and written in Rust. Reshape schema migration consists of 3 phases:

1. **Start migration** (`reshape migration start`): Sets up views and triggers to ensure both the new and old schema are usable at the same time.

1. **Roll out application**: Your application can be gradually rolled out without downtime. The existing deployment will continue using the old schema whilst the new deployment uses the new schema.

1. **Complete migration** (`reshape migration complete`): Removes the old schema and any intermediate data and triggers.

The author is now working on [ReshapeDB](https://reshapedb.com/), a new database built from the ground up to make zero-downtime schema and data migrations as simple and safe as possible.

![_](/images/products/reshape/reshape.webp)

FWIW, [pgroll](https://github.com/xataio/pgroll) is another Postgres schema
migration tool inspired by Reshape. pgroll is CLI based and written in Go. It's built by [Xata](https://xata.io/), the serverless database platform built on the top of PostgreSQL.

![_](/images/products/pgroll/pgroll-migration-flow.webp)

## graphile-migrate

[graphile-migrate](https://github.com/graphile/migrate) is an [opinionated](https://github.com/graphile/migrate?tab=readme-ov-file#opinions) SQL-powered productive roll-forward migration tool for PostgreSQL.

graphile-migrate is also CLI-based, written in TypeScript. It can also work with [PostGraphile](https://www.graphile.org/postgraphile/) to generate GraphQL schemas upon database changes.

Another novel idea graphile-migrate introduces is the `commit`, `uncommit` commands. It enables a
git-like workflow when developing against the local database.

- `graphile-migrate commit` commits the current migration into the `committed/` folder, resetting the
  current migration. Resets the shadow database.

- `graphile-migrate uncommit` Moves the latest commit out of the committed migrations folder and back to the current migration
  (assuming the current migration is empty-ish). Removes the migration tracking entry from **ONLY** the local database.

## pgschema

[pgschema](https://github.com/pgschema/pgschema) is a new CLI-based tool, written in Go. It features a terraform-like declarative schema migration workflow:

- **Dump** a Postgres schema in a developer-friendly format with support for all common objects
- **Edit** a schema to the desired state
- **Plan** a schema migration by comparing desired state with current database state
- **Apply** a schema migration with concurrent change detection, transaction-adaptive execution, and lock timeout control

[![asciicast](https://asciinema.org/a/vXHygDMUkGYsF6nmz2h0ONEQC.svg)](https://asciinema.org/a/vXHygDMUkGYsF6nmz2h0ONEQC)

## Summary

| Name                                                    | Interface | Language        | Postgres Only | Highlight                                                          |
| ------------------------------------------------------- | --------- | --------------- | ------------- | ------------------------------------------------------------------ |
| [Bytebase](https://github.com/bytebase/bytebase)        | GUI       | Go + TypeScript | N             | All in one for team collaboration.                                 |
| [Liquibase](https://github.com/liquibase/liquibase)     | CLI       | Java            | N             | Long-standing.                                                     |
| [Flyway](https://github.com/flyway/flyway)              | CLI       | Java            | N             | Developer-friendly.                                                |
| [Reshape](https://github.com/fabianlindfors/reshape)    | CLI       | Rust            | Y             | Zero-downtime based on view.                                       |
| [pgroll](https://github.com/xataio/pgroll)              | CLI       | Go              | Y             | Inspired by Reshape and more accessible via its database platform. |
| [graphile-migrate](https://github.com/graphile/migrate) | CLI       | TypeScript      | Y             | Opinionated with git-like workflow.                                |
| [pgschema](https://github.com/pgschema/pgschema)        | CLI       | Go              | Y             | Terraform-like declarative schema migration workflow               |

## Further Readings

- [Top Postgres Extensions](/blog/top-postgres-extension/)
- [Top Postgres GUI Clients](/blog/top-postgres-gui-client/)
- [Postgres vs. MySQL](/blog/postgres-vs-mysql)
- [Postgres vs. MongoDB](/blog/postgres-vs-mongodb)
- [MySQL Migration Tools](/blog/top-open-source-mysql-migration-tools)
