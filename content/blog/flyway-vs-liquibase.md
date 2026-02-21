---
title: 'Flyway vs. Liquibase: The Definitive Comparison in 2026'
author: Cayden
updated_at: 2026/02/20 12:00
feature_image: /content/blog/flyway-vs-liquibase/flyway-vs-liquibase-banner.webp
tags: Comparison
description: 'Compare Flyway vs Liquibase side-by-side: features, pricing, supported databases, SQL auto check, rollback, and schema drift detection. Updated for Flyway 2026 and Liquibase 5.0.'
keypage: true
---

<HintBlock type="info">

This post is maintained by Bytebase, an open-source database DevSecOps tool that is a Liquibase/Flyway alternative. We update the post every year.

</HintBlock>

| Update History | Comment                                                 |
| -------------- | ------------------------------------------------------- |
| 2023/06/27     | Initial version.                                        |
| 2025/05/23     | Update for 2025.                                        |
| 2026/02/03     | Flyway 2026, Liquibase 5.0, pricing/licensing changes.  |

When looking for a database CI/CD and schema migration change tool, Flyway and Liquibase are two common options. Understanding the differences between these two tools can help potential users choose the one that best meets their needs.

Both are popular Liquibase alternatives and Flyway alternatives to each other — this guide breaks down every aspect to help you decide which database migration tool is right for your team.

## What Flyway and Liquibase have in common

- Java-based, providing Java SDK and CLI.
- Provide open-source community version and closed-source commercial version.
- Native SQL supported, however Liquibase requires XML changelog to define the changes.
- Database CI/CD with version control system #GitOps (see [Database GitOps configuration](#database-gitops-configuration)).
- Auto SQL check (see [Auto SQL check](#sql-auto-check)).
- Schema Synchronization (see [Sync schema](#sync-schema)).
- Tiered pricing, offering both free and paid plan.
- Open source, both has long history.
  ![star-history](/content/blog/flyway-vs-liquibase/star-history-flyway-vs-liquibase.webp)

## What are the differences between Flyway and Liquibase?

While both Flyway and Liquibase are tools for database CI/CD, there are some key differences between the two. The following table summarizes the differences between Flyway and Liquibase.

|                                                        | Flyway                          | Liquibase                              |
| ------------------------------------------------------ | ------------------------------- | -------------------------------------- |
| [Product position](#product-position)                  | Schema Change & Version Control | Schema Change & Version Control        |
| [Developer interface](#developer-interface)            | CLI + Flyway Desktop            | CLI                                    |
| [Supported databases](#supported-databases)            | 22 Only SQL + MongoDB (preview) | 50 SQL & NoSQL DB                      |
| [Programming language and installation](#installation) | Java + JVM                      | Java + JVM                             |
| [Change execution](#change-execution)                  | SQL script + CLI                | Changelog (SQL, XML, JSON, YAML) + CLI |
| [Change orchestration](#change-orchestration)          | Numbering of SQL files          | Changelog + Flow                       |
| [Database GitOps](#database-gitops-configuration)      | ✅                              | ✅                                     |
| [SQL auto check](#sql-auto-check)                      | ✅                              | ✅                                     |
| [Change history](#change-history)                      | ✅                              | ✅                                     |
| [Sync schema](#sync-schema)                            | ✅                              | ✅                                     |
| [Rollback](#rollback)                                  | ✅                              | ✅                                     |
| [Schema drift detection](#schema-drift-detection)      | ✅                              | ✅                                     |

### Product position

- **Flyway**: A database schema change and version control tool.
  ![flyway-position](/content/blog/bytebase-vs-flyway/flyway-position.webp)

- **Liquibase**: A database schema change and version control tool. It helps you track, manage, and automate changes to your database.
  ![liquibase-position](/content/blog/flyway-vs-liquibase/liquibase-position.webp)

### Developer interface

- **Flyway**: A command-line tool with Java API, Maven plugin, and Gradle plugin. Flyway Desktop has been enhanced with full Schema Model view and Git history tracking, available for SQL Server, PostgreSQL, MySQL, and other supported databases.

- **Liquibase**: Primarily a command-line tool. The Liquibase Hub GUI was sunset in May 2023, with focus shifting to CLI and integration capabilities.

### Supported databases

- **Flyway**: 22+ SQL databases with support for:

  - MongoDB (Native Connectors mode only; JDBC support removed in 2025)
  - SinglestoreDB
  - Google Cloud Spanner
  - EnterpriseDB
  - TimescaleDB
  - Postgres 18, SQL Server 2025, Oracle 26ai (added 2025)
  - Full compatibility for all databases in Community version

- **Liquibase**: 50+ SQL and NoSQL databases with enhanced support for:
  - Databricks (added 2025)
  - Google BigQuery (including DATABASECHANGELOGHISTORY table support)
  - Continued MongoDB support
  - Snowflake with OAuth/PKI authentication

### Installation

- **Flyway**: Java-based tool requiring JVM installation. In 2025, configuration has moved to unified flyway.toml format, deprecating the older JSON format.

- **Liquibase**: Java-based tool requiring JVM installation. **Liquibase 5.0+ requires Java 17 minimum** (Java 8/11 deprecated). MacOS .dmg installer was deprecated in favor of Homebrew installation.

### Change execution

- **Flyway**: CLI or GitOps. Users write SQL files and then run command `flyway migrate`. In 2025, enhanced capabilities for script migrations and callbacks have been added to the Community version.

![flyway-change](/content/blog/bytebase-vs-flyway/flyway-change.webp)

- **Liquibase**: CLI or GitOps. Users specify the changes by defining a `changelog` and then run a command. In 2025, flow enhancements provide more sophisticated orchestration capabilities.

![liquibase-changelog](/content/blog/flyway-vs-liquibase/liquibase-changelog.webp)
![liquibase-update](/content/blog/flyway-vs-liquibase/liquibase-update.webp)

### Change orchestration

- **Flyway**: Number the SQL files in the order you want them to be executed.

  ![liquibase-change-order](/content/blog/flyway-vs-liquibase/flyway-change-order.webp)

- **Liquibase**: Specify the order of changes in the changelog file. In 2025, Flow capabilities have been enhanced with conditionals and more advanced orchestration features.

  ![liquibase-change-order](/content/blog/flyway-vs-liquibase/liquibase-change-order.webp)

Liquibase continues to be more flexible as it can specify arbitrary orders, and the enhanced [flow file](https://docs.liquibase.com/liquibase-pro/flow/home.html) capabilities in 2025 make orchestrating complex steps even more powerful.

### Database GitOps configuration

- **Flyway**: Configure with VCS CI/CD workflow manually. In 2025, integration with Test Data Manager and Docker for dedicated development databases improves the GitOps workflow.

- **Liquibase**: Configure with VCS CI/CD workflow manually. In 2025, enhanced validation and error messaging improve the GitOps experience.

  ![flyway-ci-cd](/content/blog/bytebase-vs-flyway/flyway-ci-cd.webp)
  ![liquibase-gitlab-gitops](/content/blog/flyway-vs-liquibase/liquibase-gitlab-gitops.webp)

### SQL auto check

SQL auto check helps developers write less buggy SQL and save DBAs manual review efforts.

- **Flyway**: Code Analysis with enhanced drift detection in 2025
- **Liquibase**: SQL Quality check with improved Policy Checks in 2025

#### Supported plan

- **Flyway**: Enterprise only (Teams discontinued in 2025)
- **Liquibase**: Paid tiers only (Starter and above)

#### Number of rules

- **Flyway**: 10+ general rules or integrate SQLFluff for more rules
- **Liquibase**: Enhanced policy checks with more comprehensive validation in 2025

#### How to configure

- **Flyway**: Predefined, users may set them active or not. In 2025, improved configuration through unified flyway.toml.

  ![flyway-code-analysis-rules](/content/blog/bytebase-vs-flyway/flyway-code-analysis-rules.webp)

- **Liquibase**: Predefined, users may set levels while calling. Python-based Custom Policy Checks available in paid tiers.

  ![liquibase-quality-check](/content/blog/flyway-vs-liquibase/liquibase-quality-check.webp)

#### How to trigger

- **Flyway**: Run `flyway check -code ....` command to produce a report.
  ![flyway-check-code](/content/blog/bytebase-vs-flyway/flyway-check-code.webp)
  ![flyway-code-analysis-report](/content/blog/bytebase-vs-flyway/flyway-code-analysis-report.webp)

- **Liquibase**: Run `check` command or manually integrate this command in automation. Users may go to admin console to view logs.
  ![liquibase-validate-result](/content/blog/flyway-vs-liquibase/liquibase-validate-result.webp)

### Change history

- **Flyway**: Run `flyway info` to show `flyway_schema_history` table. In 2025, enhanced info filters provide more granular control.

  ![flyway-info](/content/blog/bytebase-vs-flyway/flyway-info.webp)

- **Liquibase**: Simple Database Change Logs. In 2025, new parameters for the `history` command and improved Operation Reports.

  ![liquibase-logs](/content/blog/flyway-vs-liquibase/liquibase-logs.webp)

### Sync schema

- **Flyway**: Via Flyway Desktop, generate a migration script to bring the target database schema in sync. In 2025, the new backup-based baseline approach allows restoring a backup file instead of creating a database from scratch in the baseline script.

  ![flyway-sync-schema](/content/blog/bytebase-vs-flyway/flyway-sync-schema.webp)

- **Liquibase**: Support `diff-changelog` to compare databases and create a deployable changelog to sync. In 2025, enhanced Drift Report capabilities improve schema synchronization.

### Rollback

- **Flyway**: Write rollback scripts manually. Enterprise only (Community does not support rollback).

- **Liquibase**: Support `rollback-one-changeset` or `rollback`. Enhanced Rollback Report in paid tiers.

### Schema drift detection

- **Flyway**: Run `flyway check -drift ...` to produce a report indicating difference between target database and the one created by the migrations applied by Flyway. Enhanced in 2025 with more comprehensive code analysis.

- **Liquibase**: Run `liquibase diff --format=json` to produce a report indicating difference between target database and source database. In 2025, improved Drift Report capabilities with better visualization.

## Flyway enhancements in 2025-2026

Key features released in [2025](https://www.red-gate.com/blog/redgate-flyway-2025-year-in-review):

- **State-based deployments** - Work the way you want with declarative schema definitions
- **Backups as baseline** - Use database backups instead of lengthy baseline scripts, solving issues with invalid objects or external server references
- **Improved drift detection** - Snapshots and drift resolution scripts to identify and resolve schema drift
- **Database support** - Added support for Postgres 18, SQL Server 2025, Oracle 26ai

[January 2026 updates](https://www.red-gate.com/blog/redgate-flyway-product-updates-january-2026):

- **AI-powered migration descriptions** - Flyway Desktop 8 generates descriptions based on migration script contents
- **New shadow database dialog** - Option to let Flyway create shadow databases automatically
- **Schema model view** - View all object definitions in Flyway Desktop
- **SQLFluff 4.0.0** - Upgraded from 3.5.0

**Important licensing change**: Since May 2025, Flyway only offers Community (free) and Enterprise (paid). The Teams tier was discontinued for new customers.

## Liquibase enhancements in 2025-2026

[Liquibase 5.0](https://docs.liquibase.com/community/release-notes/5-0) was released in September 2025 as a major release:

- **Java 17 minimum requirement** - Java 8 and 11 deprecated for improved performance and security
- **Liquibase Secure 5.0** - Certified enterprise distribution with integrated extensions, drivers, and policies
- **Liquibase Secure Developer** - New VS Code extension for enterprise users
- **AI Changelog Generator** - MCP Server powered tool to convert natural language to production-ready changelogs (Private Preview)
- **Databricks support** - Added database connection support

Flow and automation enhancements:

- **Conditional Flow File logic** - Based on action exit codes with new `continueOnError` property
- **Snowflake OAuth/PKI authentication** - Simplified authentication for Snowflake's token-based requirements
- **New policy check** - `FormattedSqlHeaderRequired` ensures proper SQL file formatting
- **Python checks enhancements** - New `get_config_value()` helper function

**Important licensing change**: Liquibase Community has adopted the [Functional Source License (FSL)](https://docs.liquibase.com/community/release-notes/5-0) to ensure long-term sustainability while keeping the software free for developers.

## Pricing

Flyway uses a per-user licensing model, while Liquibase uses a per-application/database-type licensing model.

| Aspect               | Flyway                            | Liquibase                                        |
| -------------------- | --------------------------------- | ------------------------------------------------ |
| **Free Tier**        | Community                         | Community (FSL license)                          |
| **Paid Tiers**       | Enterprise only                   | 4 tiers: Starter, Growth, Business, Enterprise   |
| **Licensing Model**  | Per-user                          | Per-application + database types                 |
| **Entry-Level**      | Enterprise (contact for quote)    | Starter: up to 5 apps, 1 DB type                 |
| **Mid-Tier**         | —                                 | Growth (10 apps, 3 DB types), Business (25 apps) |
| **Enterprise**       | Unlimited (custom pricing)        | Unlimited apps & DB types, 24/7 support          |
| **Pricing**          | Contact sales                     | Contact sales (all tiers)                        |

## Summary

Both Flyway and Liquibase are Java-based, offering with SDKs and CLI support, and follow a [migration-based](/blog/database-version-control-state-based-vs-migration-based/#migration-based-version-control-imperative) approach to schema changes.
They also leverage the same open-source monetization strategy. While Flyway is generally considered more developer-friendly, Liquibase offers a broader set of advanced features.

The key difference is that Liquibase introduces the Changelog and Flow concepts, enabling users to specify explicit migration ordering, preconditions, labels, and contexts. In contrast, Flyway determines migration order based solely on file naming conventions.

Both tools offer a Git-like experience for database migrations. However, if you're seeking a GitHub/GitLab-style experience with a user-friendly GUI and team collaboration features, consider our own Bytebase. Continue reading for a side-by-side comparison with each tool:

- [Bytebase vs. Liquibase](/blog/bytebase-vs-liquibase/)
- [Bytebase vs. Flyway](/blog/bytebase-vs-flyway/)

## FAQ

### Is Liquibase free?

Liquibase Community Edition is free under the Functional Source License (FSL). Paid tiers (Starter, Growth, Business, Enterprise) unlock additional features like policy checks and advanced orchestration.

### Is Flyway free?

Flyway Community Edition is free and open-source. Since May 2025, the only paid option is Flyway Enterprise (the Teams tier was discontinued).

### Which is better, Flyway or Liquibase?

It depends on your needs. Flyway is simpler and more developer-friendly with SQL-first approach. Liquibase offers more flexibility with its Changelog and Flow concepts, broader database support (50+ vs 22+), and more granular migration ordering. For teams needing a GUI and collaboration features, consider a tool like [Bytebase](/).

### What are alternatives to Liquibase and Flyway?

Popular alternatives include [Bytebase](/), Atlas, SchemaHero, and Skeema. Bytebase offers a web-based GUI with built-in SQL review, GitOps integration, and team collaboration features that both Flyway and Liquibase lack.

### Does Flyway support rollback?

Flyway supports rollback only in the Enterprise edition. You must write rollback scripts manually. Liquibase supports rollback in paid tiers with automatic rollback capabilities.
