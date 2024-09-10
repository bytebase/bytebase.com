---
title: 'Flyway (Redgate) vs. Liquibase: a side-by-side comparison for database schema migration'
author: Changyu
updated_at: 2024/03/04 19:21:21
feature_image: /content/blog/flyway-vs-liquibase/flyway-vs-liquibase-banner.webp
tags: Explanation
description: 'When looking for a database CI/CD and schema migration change tool, Flyway and Liquibase are two common options. Understanding the differences between these two tools can help potential users choose the one that best meets their needs.'
---

When looking for a database CI/CD and schema migration change tool, Flyway (Redgate) and Liquibase are two common options. Understanding the differences between these two tools can help potential users choose the one that best meets their needs.

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

|                                                        | Flyway                          | Liquibase                       |
| ------------------------------------------------------ | ------------------------------- | ------------------------------- |
| [Product position](#product-position)                  | Schema Change & Version Control | Schema Change & Version Control |
| [Developer interface](#developer-interface)            | CLI                             | CLI                             |
| [Supported databases](#supported-databases)            | 22 Only SQL                     | 50 SQL & NoSQL DB               |
| [Programming language and installation](#installation) | Java + JVM                      | Java + JVM                      |
| [Change execution](#change-execution)                  | SQL script + CLI                | Changelog (XML) + CLI           |
| [Change order](#change-order)                          | Numbering of SQL files          | Changelog (XML)                 |
| [Database GitOps](#database-gitops-configuration)      | ✅                              | ✅                              |
| [SQL auto check](#sql-auto-check)                      | ✅                              | ✅                              |
| [Change history](#change-history)                      | ✅                              | ✅                              |
| [Sync schema](#sync-schema)                            | ✅                              | ✅                              |
| [Rollback](#rollback)                                  | ✅                              | ✅                              |
| [Schema drift detection](#schema-drift-detection)      | ✅                              | ✅                              |

### Product position

- **Flyway**: A database schema change and version control tool.
  ![flyway-position](/content/blog/bytebase-vs-flyway/flyway-position.webp)

- **Liquibase**: A database schema change and version control tool. It helps you track, manage, and automate changes to your database.
  ![liquibase-position](/content/blog/flyway-vs-liquibase/liquibase-position.webp)

### Developer interface

- **Flyway**: A command-line tool. With JVM, it also provides Java API, Maven plugin and Gradle plugin. A simple graphical user interface (GUI) called Flyway Desktop is available for SQL Server, PostgreSQL and MySQL.

- **Liquibase**: A command-line tool. A simple graphical user interface (GUI) called Liquibase Hub is available with the Pro Plan, but it has sunset in May 2023.

### Supported databases

- **Flyway**: 22 SQL databases - MySQL, PostgreSQL, IBM DB2, MS SQL Server, Oracle, PostgreSQL, MySQL, Snowflake ...
- **Liquibase**: 50 SQL and NoSQL databases - IBM DB2, MS SQL Server, Oracle, PostgreSQL, MySQL, Snowflake, MongoDB, Clickhouse ...

### Installation

- **Flyway**: Java-based tool, so you need to install a Java Virtual Machine (JVM) before users can install Flyway.

- **Liquibase**: Java-based tool, so you need to install a Java Virtual Machine (JVM) before users can install Liquibase.

### Change execution

- **Flyway**: CLI or GitOps. Users write SQL files and then run command `flyway migrate`.

![flyway-change](/content/blog/bytebase-vs-flyway/flyway-change.webp)

- **Liquibase**: CLI or GitOps. Users specify the changes by defining a `changelog` and then run a command.

![liquibase-changelog](/content/blog/flyway-vs-liquibase/liquibase-changelog.webp)
![liquibase-update](/content/blog/flyway-vs-liquibase/liquibase-update.webp)

### Change order

- **Flyway**: Number the SQL files in the order you want them to be executed.
  ![liquibase-change-order](/content/blog/flyway-vs-liquibase/flyway-change-order.webp)
- **Liquibase**: Specify the order of changes in the changelog file.
  ![liquibase-change-order](/content/blog/flyway-vs-liquibase/liquibase-change-order.webp)

### Database GitOps configuration

- **Flyway**: Configure with VCS CI/CD workflow manually.

- **Liquibase**: Configure with VCS CI/CD workflow manually.
  ![flyway-ci-cd](/content/blog/bytebase-vs-flyway/flyway-ci-cd.webp)
  ![liquibase-gitlab-gitops](/content/blog/flyway-vs-liquibase/liquibase-gitlab-gitops.webp)

### SQL auto check

SQL auto check helps developers write less buggy SQL and save DBAs manual review efforts.

- **Flyway**: Code Analysis
- **Liquibase**: SQL Quality check

#### Supported plan

- **Flyway**: Only in Team Plan or above
- **Liquibase**: Only in Pro Plan and above

#### Number of rules

- **Flyway**: 10+ general rules or integrate a python app called SQLFluff to get more rules.
- **Liquibase**: 10 general rules

#### How to configure

- **Flyway**: Predefined, users may set them active or not.
  ![flyway-code-analysis-rules](/content/blog/bytebase-vs-flyway/flyway-code-analysis-rules.webp)

- **Liquibase**: Predefined, users may set levels while calling.
  ![liquibase-quality-check](/content/blog/flyway-vs-liquibase/liquibase-quality-check.webp)

#### How to trigger

- **Flyway**: Run `flyway check -code ....` command to produce a report.
  ![flyway-check-code](/content/blog/bytebase-vs-flyway/flyway-check-code.webp)
  ![flyway-code-analysis-report](/content/blog/bytebase-vs-flyway/flyway-code-analysis-report.webp)

- **Liquibase**: Run `check` command or manually integrate this command in automation. Users may go to admin console to view logs.
  ![liquibase-validate-result](/content/blog/flyway-vs-liquibase/liquibase-validate-result.webp)

### Change history

- **Flyway**: Run `flyway info` to show `flyway_schema_history` table.
  ![flyway-info](/content/blog/bytebase-vs-flyway/flyway-info.webp)
- **Liquibase**: Simple Database Change Logs.
  ![liquibase-logs](/content/blog/flyway-vs-liquibase/liquibase-logs.webp)

### Sync schema

- **Flyway**: Via the flyway desktop, there is a way to generate a migration script to bring the target database schema in sync with the one you already created (usually dev).
  ![flyway-sync-schema](/content/blog/bytebase-vs-flyway/flyway-sync-schema.webp)
- **Liquibase**: Support `diff-changelog` to compare databases and to create a deployable changelog to sync.

### Rollback

- **Flyway**: Write rollback scripts manually. Supported in Team version.
- **Liquibase**: Support `rollback-one-changeset` or `rollback`.

### Schema drift detection

- **Flyway**: Run `flyway check -drift ...` to produce a report indicating difference between target database and the one created by the migrations applied by Flyway.
- **Liquibase**: Run `liquibase diff --format=json` to produce a report indicating difference between target database and source database.

## Summary

Flyway and Liquibase are the two well-established tools for database CI/CD. They are similar in many ways, both are Java based, provide and only provide Java SDK and CLI, without GUI and API, adopt [migration-based](/blog/database-version-control-state-based-vs-migration-based/#migration-based-version-control-imperative) schema migration, and
use the same open-source monetization strategy.

The most significant difference is Liquibase has an additional [Changelog concept](https://docs.liquibase.com/concepts/changelogs/home.html) to allow user to specify explicit migration ordering, preconditions, labels and context,
while Flyway relies on the [file naming](https://flywaydb.org/documentation/concepts/migrations#naming-1) to determine the order.

Both tools provide a git-like experience for database migrations. On the other hand, if you are looking for a GitHub/GitLab experience with a nice GUI and team collaboration features, please check out our own Bytebase and continue reading the side-by-side comparison with each of them:

- [Bytebase vs. Liquibase](/blog/bytebase-vs-liquibase/)
- [Bytebase vs. Flyway](/blog/bytebase-vs-flyway/)
