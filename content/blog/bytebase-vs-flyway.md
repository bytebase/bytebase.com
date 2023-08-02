---
title: 'Bytebase vs. Flyway: a side-by-side database CI/CD tool comparison for 2023'
author: Changyu
published_at: 2023/06/14 19:21:21
feature_image: /content/blog/bytebase-vs-flyway/bytebase-vs-flyway-banner.webp
tags: Explanation
description: 'When looking for a database CI/CD and schema migration change tool, Bytebase and flyway are two common options. Understanding the differences between these two tools can help potential users choose the one that best meets their needs.'
---

> If Flyway is Git, then Bytebase is GitHub/GitLab.

When looking for a database CI/CD and schema migration change tool, Bytebase and flyway are two common options. Understanding the differences between these two tools can help potential users choose the one that best meets their needs.

## What Bytebase and Flyway have in common

- Native SQL supported.
- Database DevOps with version control system #GitOps (see [Database GitOps configuration](#database-gitops-configuration)).
- Schema Synchronization (see [Sync schema](#sync-schema)).
- Tiered pricing, offering both free and paid plan.
- Open source, Flyway has a long history, while Bytebase is growing faster.
  ![star-history](/content/blog/bytebase-vs-flyway/star-history.webp)

## What are the differences between Bytebase and Flyway?

While both Bytebase and Flyway are tools for database DevOps, there are some key differences between the two. Flyway main
product is its CLI and the java library. Bytebase also provides a CLI, while its main product is the GUI-based workspace
for developers and DBAs to collaborate.

|                                                                                              | Flyway           | Bytebase                             |
| -------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------ |
| [Product position](#product-position)                                                        | Schema change    | Schema Change, Data Query and Secure |
| [Developer interface](#developer-interface)                                                  | CLI              | GUI                                  |
| [Supported databases](#supported-databases)                                                  | 22 Only SQL DB   | 13 SQL & NoSQL DB                    |
| [Programming language and installation](#installation)                                       | Java + JVM       | Golang and no other dependency       |
| [Change execution](#change-execution)                                                        | SQL script + CLI | Issue + GUI                          |
| [Batch Change](#change-execution)                                                            | -                | ✅ Multi-environment / Multi-tenant  |
| [Database GitOps](#database-gitops-configuration)                                            | ✅               | ✅                                   |
| [SQL auto check](#sql-auto-check)                                                            | ✅ Paid version  | ✅ Available in Free version         |
| [Approval flow](#approval-flow)                                                              | -                | ✅                                   |
| [Change history](#change-history)                                                            | ✅               | ✅                                   |
| [Sync schema](#sync-schema)                                                                  | ✅               | ✅                                   |
| [Rollback](#rollback)                                                                        | ✅ Manual        | ✅ Auto generated rollback statement |
| [Schema drift detection](#schema-drift-detection)                                            | ✅ Manual        | ✅ Auto                              |
| [Slow query detection and advisor](#slow-query-detection-and-advisor)                        | -                | ✅                                   |
| [Data access control, security and compliance](#data-access-control-security-and-compliance) | -                | ✅                                   |

### Product position

- **Flyway**: A database schema change and version control tool.
  ![flyway-position](/content/blog/bytebase-vs-flyway/flyway-position.webp)

- **Bytebase**: In addition to database schema change and version control, Bytebase also provides data query, security, and governance features. It provides a GUI based collaboration workspace that helps DBAs and Developers manage the database development lifecycle.
  ![bytebase-position](/content/blog/bytebase-vs-flyway/bytebase-position.webp)

### Developer interface

- **Flyway**: A command-line tool. With JVM, it also provides Java API, Maven plugin and Gradle plugin. A simple graphical user interface (GUI) called Flyway Desktop is available for SQL Server, PostgreSQL and MySQL.
- **Bytebase**: A web-based GUI tool. It also provides a [command-line interface (CLI)](/docs/cli/overview/), [application programming interface (API)](/docs/api/overview/), [Terraform Provider](/docs/get-started/terraform/), and [GitHub App](/docs/sql-review/sql-advisor/github-app).

### Supported databases

- **Flyway**: 22 SQL databases - MySQL, PostgreSQL, IBM DB2, MS SQL Server, Oracle, PostgreSQL, MySQL, Snowflake ...
- **Bytebase**: 13 SQL and NoSQL databases - MySQL, PostgreSQL, ClickHouse, Snowflake, MongoDB, Redis, Redshift, Oracle, MS SQL Server ...

### Installation

- **Flyway**: Java-based tool, so you need to install a Java Virtual Machine (JVM) before users can install Flyway.
- **Bytebase**: Go-based tool, a self-contained bianry with no external dependency. Also provides [Docker](/docs/get-started/self-host/#docker/) and [Kubernetes](/docs/get-started/self-host/#kubernetes/) deployment.

### Change execution

- **Flyway**: CLI or GitOps. Users write SQL files and then run command `flyway migrate`.

![flyway-change](/content/blog/bytebase-vs-flyway/flyway-change.webp)

- **Bytebase**: Web-based GUI or GitOps. Users create issues with SQL which could be approved. An issue may include SQL running against one database, or batch change against multiple databases span across different [development environments](/docs/change-database/batch-change/#change-databases-from-multiple-environments) and [different tenants](/docs/change-database/batch-change/#change-databases-from-multiple-tenants).
  ![bytebase-issue](/content/blog/bytebase-vs-flyway/bytebase-issue.webp)

  Users can create tenant project to facilitate batch change. In tenant mode, users can do advanced canary release.
  ![bytebase-canary](/content/blog/bytebase-vs-flyway/bytebase-canary.webp)

  Users can also do online schema change for large tables to reduce downtime from hours to seconds.
  ![bytebase-online-schema-change](/content/blog/bytebase-vs-flyway/bytebase-online-schema-change.webp)

### Database GitOps configuration

- **Flyway**: Configure with VCS CI/CD workflow manually.
  ![flyway-ci-cd](/content/blog/bytebase-vs-flyway/flyway-ci-cd.webp)

- **Bytebase**: Point-and-Click GitOps workflow setup.
  ![bytebase-gitlab-gitops](/content/blog/bytebase-vs-flyway/bytebase-gitlab-gitops.webp)

  You may even enable SQL Review in GitLab automatically by clicking a checkbox while configuring GitOps workflow. (which is not in the video)
  ![bytebase-gitops-sql-review](/content/blog/bytebase-vs-flyway/bytebase-gitops-sql-review.webp)

  Check the video: [Setting up GitLab VCS integration for Bytebase (GitOps)](https://www.youtube.com/watch?v=51_bL7Vnqww&t=221s)

  Because Bytebase has the similar project concept as seen in GitLab/GitHub, the GitOps integration is nature to the developers.

### SQL auto check

SQL auto check helps developers write less buggy SQL and save DBAs manual review efforts.

- **Flyway**: Code Analysis
- **Bytebase**: [SQL Review](/docs/sql-review/overview/)

#### Supported Plan

- **Flyway**: Only in Team Plan or above
- **Bytebase**: Available in Free Plan

#### Number of rules

- **Flyway**: 10+ general rules or integrate a python app called SQLFluff to get more rules.
- **Bytebase**: 49 rules for MySQL, 38 rules for PostgreSQL, 18 rules for Oracle ...

#### How to configure

- **Flyway**: Predefined, users may set them active or not.
  ![flyway-code-analysis-rules](/content/blog/bytebase-vs-flyway/flyway-code-analysis-rules.webp)
- **Bytebase**: Rules are predefined, users can activate and choose error level for specific rules. The picked rule set will make a reusable policy which can be applied to environment, e.g. `Test`, `Staging`, `Prod`.
  ![bytebase-sql-review-rules](/content/blog/bytebase-vs-flyway/bytebase-sql-review-rules.webp)

#### How to trigger

- **Flyway**: Run `flyway check -code ....` command to produce a report.
  ![flyway-check-code](/content/blog/bytebase-vs-flyway/flyway-check-code.webp)
  ![flyway-code-analysis-report](/content/blog/bytebase-vs-flyway/flyway-code-analysis-report.webp)

- **Bytebase**: Three places to trigger SQL review by default, users may manually integrate it to other scenarios by API as well:

  1. When a database change is created as an issue.
     ![bytebase-issue-auto-sql-review](/content/blog/bytebase-vs-flyway/bytebase-issue-auto-sql-review.webp)

  2. When users query data from SQL Editor.
     ![bytebase-sql-editor-review](/content/blog/bytebase-vs-flyway/bytebase-sql-editor-review.webp)

  3. When users enable GitOps workflow, before a new SQL is merged into the main branch.
     ![bytebase-gitops-merge](/content/blog/bytebase-vs-flyway/bytebase-gitops-merge.webp)

### Approval flow

- **Flyway**: Not supported.
- **Bytebase**: Basic rollout and [risk-based custom approval flow](/docs/administration/custom-approval/).
  ![bytebase-rollout-policy](/content/blog/bytebase-vs-flyway/bytebase-rollout-policy.webp)
  ![bytebase-custom-approval-flow](/content/blog/bytebase-vs-flyway/bytebase-custom-approval-flow.webp)
  ![bytebase-risk-center](/content/blog/bytebase-vs-flyway/bytebase-risk-center.webp)

### Change history

- **Flyway**: Run `flyway info` to show a simple history table.
  ![flyway-info](/content/blog/bytebase-vs-flyway/flyway-info.webp)

- **Bytebase**: Change History tracking diffs and the originated issue.
  ![bytebase-change-history](/content/blog/bytebase-vs-flyway/bytebase-change-history.webp)
  ![bytebase-change-diff](/content/blog/bytebase-vs-flyway/bytebase-change-diff.webp)

### Sync schema

- **Flyway**: Via the flyway desktop, there is a way to generate a migration script to bring the target database schema in sync with the one you already created (usually dev).
  ![flyway-sync-schema](/content/blog/bytebase-vs-flyway/flyway-sync-schema.webp)

- **Bytebase**: Choose a specific schema version, auto calculate the diff with selected databases.
  ![bytebase-sync-schema-step1](/content/blog/bytebase-vs-flyway/bytebase-sync-schema-step1.webp)
  ![bytebase-sync-schema-step2](/content/blog/bytebase-vs-flyway/bytebase-sync-schema-step2.webp)

### Schema drift detection

- **Flyway**: Run `flyway check -drift ...` to produce a report indicating difference between target database and the one created by the migrations applied by Flyway.
- **Bytebase**: Will auto detect schema diff if someone manipulates the schemas out of Bytebase.
  ![bytebase-schema-drift](/content/blog/bytebase-vs-flyway/bytebase-schema-drift.webp)

### Rollback

- **Flyway**: Write rollback scripts manually. Supported in Team version or above.
- **Bytebase**: By using sync schema, users may revert to a specific version. Also support [auto rollback](/docs/change-database/rollback-data-changes/). For Free version, users can revert to the latest version, while for Pro version or above, users can choose any version.

### Slow query detection and advisor

- **Flyway**: Not supported.
- **Bytebase**: Will auto detect slow queries and send weekly summary report. Provide an AI-based index advisor to provide query optimization advice.
  ![bytebase-slow-query](/content/blog/bytebase-vs-flyway/bytebase-slow-query.webp)

### Data access control, security and compliance

- **Flyway**: Not supported.

- **Bytebase**: With centralized [SQL Editor](/docs/sql-editor/overview/), data access is [controlled](/docs/security/data-access-control/), [reviewed](/docs/security/data-query/), [audit-logged](/docs/security/audit-log/). Also provide [data masking](/docs/sql-editor/mask-data/), [watermark](/docs/security/watermark/).

  ![bytebase-sql-editor](/content/blog/bytebase-vs-flyway/bytebase-sql-editor.webp)

  Bytebase supports [RBAC](/docs/concepts/roles-and-permissions/), e.g. developers need to require permission to access or export databases via SQL Editor.
  ![bytebase-request-query-export](/content/blog/bytebase-vs-flyway/bytebase-request-query-export.webp)

  Everything that happened within Bytebase will be recorded for audit purposes.
  ![bytebase-audit](/content/blog/bytebase-vs-flyway/bytebase-audit.webp)

  Bytebase also supports [SSO](/docs/administration/sso/overview/), [IM webhook](/docs/change-database/webhook/) and etc.

## Summary

To summarize, Bytebase and Flyway are both viable options for database CI/CD. Flyway deliver its feature via its CLI, while Bytebase
offers a GUI-based collaboration space.

As an analogy, **Flyway is Git for database, and Bytebase is GitHub/GitLab for database**. Git is good for local and personal use. On the other hand, for team development which needs collaboration, review, access control and etc, GitHub/GitLab is more suitable.

---

Related comparisions:

- [Bytebase vs. Liquibase](/blog/bytebase-vs-liquibase/)
- [Flyway vs. Liquibase](/blog/flyway-vs-liquibase/)
