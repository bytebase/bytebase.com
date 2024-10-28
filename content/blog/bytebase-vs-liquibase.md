---
title: 'Bytebase vs. Liquibase: a side-by-side comparison for database schema migration'
author: Changyu
updated_at: 2023/06/08 19:21:21
feature_image: /content/blog/bytebase-vs-liquibase/bytebase-vs-liquibase-banner.webp
tags: Explanation
description: 'When looking for a database CI/CD and schema migration change tool, Bytebase and Liquibase are two common options. Understanding the differences between these two tools can help potential users choose the one that best meets their needs.'
---

> If Liquibase is Git, then Bytebase is GitHub/GitLab.

When looking for a database CI/CD and schema migration change tool, Bytebase and Liquibase are two common options. Understanding the differences between these two tools can help potential users choose the one that best meets their needs.

## What Bytebase and Liquibase have in common

- Native SQL supported.
- Database CI/CD with version control system #GitOps (see [Database GitOps configuration](#database-gitops-configuration)).
- Auto SQL check (see [Auto SQL check](#sql-auto-check)).
- Schema Synchronization (see [Sync schema](#sync-schema)).
- Tiered pricing, offering both free and paid plan.
- Open source, Liquibase has a long history, while Bytebase is growing faster.
  ![star-history](/content/blog/bytebase-vs-liquibase/star-history.webp)

## What are the differences between Bytebase and Liquibase?

While both Bytebase and Liquibase are tools for database CI/CD, there are some key differences between the two. Liquibase main
product is its CLI and the java library. Bytebase also provides a CLI, while its main product is the GUI-based workspace
for developers and DBAs to collaborate.

|                                                                                              | Liquibase       | Bytebase                             |
| -------------------------------------------------------------------------------------------- | --------------- | ------------------------------------ |
| [Product position](#product-position)                                                        | Schema change   | Schema Change                        |
| [Developer interface](#developer-interface)                                                  | CLI             | GUI, API                             |
| [Supported databases](#supported-databases)                                                  | 50              | 22                                   |
| [Programming language and installation](#installation)                                       | Java + JVM      | Golang and no other dependency       |
| [Change execution](#change-execution)                                                        | Changelog + CLI | Issue + GUI                          |
| [Batch Change](#change-execution)                                                            | -               | ✅ Multi-environment / Multi-tenant  |
| [Database GitOps](#database-gitops-configuration)                                            | ✅              | ✅                                   |
| [SQL auto check](#sql-auto-check)                                                            | ✅ Paid version | ✅ Available in Free version         |
| [Approval flow](#approval-flow)                                                              | -               | ✅                                   |
| [Change history](#change-history)                                                            | ✅              | ✅                                   |
| [Sync schema](#sync-schema)                                                                  | ✅              | ✅                                   |
| [Rollback](#rollback)                                                                        | ✅ Manual       | ✅ Auto generated rollback statement |
| [Schema drift detection](#schema-drift-detection)                                            | ✅ Manual       | ✅ Auto                              |
| [Slow query detection and advisor](#slow-query-detection-and-advisor)                        | -               | ✅                                   |
| [Data access control, security and compliance](#data-access-control-security-and-compliance) | -               | ✅                                   |

### Product position

- **Liquibase**: A database schema change and version control tool. It helps you track, manage, and automate changes to your database.
  ![liquibase-position](/content/blog/bytebase-vs-liquibase/liquibase-position.webp)

- **Bytebase**: In addition to database schema change and version control, Bytebase also provides data query, security, and governance features. It provides a GUI based collaboration workspace that helps DBAs and Developers manage the database development lifecycle.
  ![bytebase-position](/content/blog/bytebase-vs-liquibase/bytebase-position.webp)

### Developer interface

- **Liquibase**: A command-line tool. A simple graphical user interface (GUI) called Liquibase Hub is available with the Pro Plan, but it has sunset in May 2023.
- **Bytebase**: A web-based GUI tool. It also provides [application programming interface (API)](/docs/api/overview/), [Terraform Provider](/docs/get-started/terraform/), and [GitHub App](/docs/sql-review/github-app).

### Supported databases

- **Liquibase**: 50 - IBM DB2, MS SQL Server, Oracle, PostgreSQL, MySQL, Snowflake, MongoDB, ClickHouse ...
- **Bytebase**: 22 - MySQL, PostgreSQL, ClickHouse, Snowflake, MongoDB, Redis, Redshift, Oracle, MS SQL Server ...

### Installation

- **Liquibase**: Java-based tool, so you need to install a Java Virtual Machine (JVM) before users can install Liquibase.
- **Bytebase**: Go-based tool, a self-contained binary with no external dependency. Also provides [Docker](/docs/get-started/self-host/#docker/) and [Kubernetes](/docs/get-started/self-host/#kubernetes/) deployment.

### Change execution

- **Liquibase**: CLI or GitOps. Users specify the changes by defining a `changelog` and then run a command.

![liquibase-changelog](/content/blog/bytebase-vs-liquibase/liquibase-changelog.webp)
![liquibase-update](/content/blog/bytebase-vs-liquibase/liquibase-update.webp)

- **Bytebase**: Web-based GUI or GitOps. Users create issues with SQL which could be approved. An issue may include SQL running against one database, or batch change against multiple databases span across different [development environments](/docs/change-database/batch-change/#change-databases-from-multiple-environments) and [different tenants](/docs/change-database/batch-change/#change-databases-from-multiple-tenants).
  ![bytebase-issue](/content/blog/bytebase-vs-liquibase/bytebase-issue.webp)

  Users can create tenant project to facilitate batch change. In tenant mode, users can do advanced canary release.
  ![bytebase-canary](/content/blog/bytebase-vs-liquibase/bytebase-canary.webp)

  Users can also do online schema change for large tables to reduce downtime from hours to seconds.
  ![bytebase-online-schema-change](/content/blog/bytebase-vs-liquibase/bytebase-online-schema-change.webp)

### Database GitOps configuration

- **Liquibase**: Integrate with VCS CI workflow.
  ![liquibase-gitlab-gitops](/content/blog/bytebase-vs-liquibase/liquibase-gitlab-gitops.webp)

- **Bytebase**: Point-and-Click GitOps workflow setup.
  ![bytebase-gitlab-gitops](/content/blog/bytebase-vs-liquibase/bytebase-gitlab-gitops.webp)

  You may even enable SQL Review in GitLab automatically by clicking a checkbox while configuring GitOps workflow. (which is not in the video)
  ![bytebase-gitops-sql-review](/content/blog/bytebase-vs-liquibase/bytebase-gitops-sql-review.webp)

  Check the video: [Setting up GitLab VCS integration for Bytebase (GitOps)](https://www.youtube.com/watch?v=51_bL7Vnqww&t=221s)

  Because Bytebase has the similar project concept as seen in GitLab/GitHub, the GitOps integration is nature to the developers.

### SQL auto check

SQL auto check helps developers write less buggy SQL and save DBAs manual review efforts.

- **Liquibase**: SQL Quality check
- **Bytebase**: [SQL Review](/docs/sql-review/overview/)

#### Supported Plan

- **Liquibase**: Only in Pro Plan and above
- **Bytebase**: Available in Free Plan

#### Number of rules

- **Liquibase**: 10 general rules
- **Bytebase**: 49 rules for MySQL, 38 rules for PostgreSQL, 18 rules for Oracle ...

#### How to configure

- **Liquibase**: Predefined, users may set levels while calling.
  ![liquibase-quality-check](/content/blog/bytebase-vs-liquibase/liquibase-quality-check.webp)
- **Bytebase**: Rules are predefined, users can activate and choose error level for specific rules. The picked rule set will make a reusable policy which can be applied to environment, e.g. `Test`, `Staging`, `Prod`.
  ![bytebase-sql-review-rules](/content/blog/bytebase-vs-liquibase/bytebase-sql-review-rules.webp)

#### How to trigger

- **Liquibase**: Run `check` command or manually integrate this command in automation. Users may go to admin console to view logs.
  ![liquibase-validate-result](/content/blog/bytebase-vs-liquibase/liquibase-validate-result.webp)

- **Bytebase**: Three places to trigger SQL review by default, users may manually integrate it to other scenarios by API as well:

  1. When a database change is created as an issue.
     ![bytebase-issue-auto-sql-review](/content/blog/bytebase-vs-liquibase/bytebase-issue-auto-sql-review.webp)

  2. When users query data from SQL Editor.
     ![bytebase-sql-editor-review](/content/blog/bytebase-vs-liquibase/bytebase-sql-editor-review.webp)

  3. When users enable GitOps workflow, before a new SQL is merged into the main branch.
     ![bytebase-gitops-merge](/content/blog/bytebase-vs-liquibase/bytebase-gitops-merge.webp)

### Approval flow

- **Liquibase**: Not supported.
- **Bytebase**: Basic rollout and [risk-based custom approval flow](/docs/administration/custom-approval/).
  ![bytebase-rollout-policy](/content/blog/bytebase-vs-liquibase/bytebase-rollout-policy.webp)
  ![bytebase-custom-approval-flow](/content/blog/bytebase-vs-liquibase/bytebase-custom-approval-flow.webp)
  ![bytebase-risk-center](/content/blog/bytebase-vs-liquibase/bytebase-risk-center.webp)

### Change history

- **Liquibase**: Simple Database Change Logs.
  ![liquibase-logs](/content/blog/bytebase-vs-liquibase/liquibase-logs.webp)

- **Bytebase**: Change History tracking diffs and the originated issue.
  ![bytebase-change-history](/content/blog/bytebase-vs-liquibase/bytebase-change-history.webp)
  ![bytebase-change-diff](/content/blog/bytebase-vs-liquibase/bytebase-change-diff.webp)

### Sync schema

- **Liquibase**: Support `diff-changelog` to compare databases and to create a deployable changelog to sync.
- **Bytebase**: Choose a specific schema version, auto calculate the diff with selected databases.
  ![bytebase-sync-schema-step1](/content/blog/bytebase-vs-liquibase/bytebase-sync-schema-step1.webp)
  ![bytebase-sync-schema-step2](/content/blog/bytebase-vs-liquibase/bytebase-sync-schema-step2.webp)

### Rollback

- **Liquibase**: Support `rollback-one-changeset` or `rollback`.
- **Bytebase**: By using sync schema, users may revert to a specific version. Also support [auto rollback](/docs/change-database/rollback-data-changes/).

### Schema drift detection

- **Liquibase**: Not supported.
- **Bytebase**: Will auto detect schema diff if someone manipulates the schemas out of Bytebase.
  ![bytebase-schema-drift](/content/blog/bytebase-vs-liquibase/bytebase-schema-drift.webp)

### Slow query detection and advisor

- **Liquibase**: Not supported.
- **Bytebase**: Will auto detect slow queries and send weekly summary report. Provide an AI-based index advisor to provide query optimization advice.
  ![bytebase-slow-query](/content/blog/bytebase-vs-liquibase/bytebase-slow-query.webp)

### Data access control, security and compliance

- **Liquibase**: Not supported.

- **Bytebase**: With centralized [SQL Editor](/docs/sql-editor/overview/), data access is [controlled](/docs/security/data-access-control/), [reviewed](/docs/security/data-query/), [audit-logged](/docs/security/audit-log/). Also provide [data masking](/docs/sql-editor/mask-data/), [watermark](/docs/security/watermark/).

  ![bytebase-sql-editor](/content/blog/bytebase-vs-liquibase/bytebase-sql-editor.webp)

  Bytebase supports [RBAC](/docs/concepts/roles-and-permissions/), e.g. developers need to require permission to access or export databases via SQL Editor.
  ![bytebase-request-query-export](/content/blog/bytebase-vs-liquibase/bytebase-request-query-export.webp)

  Everything that happened within Bytebase will be recorded for audit purposes.
  ![bytebase-audit](/content/blog/bytebase-vs-liquibase/bytebase-audit.webp)

  Bytebase also supports [SSO](/docs/administration/sso/overview/), [IM webhook](/docs/change-database/webhook/) and etc.

## Summary

To summarize, Bytebase and Liquibase are both viable options for database CI/CD. Liquibase deliver its feature via its CLI, while Bytebase
offers a GUI-based collaboration space.

As an analogy, **Liquibase is Git for database, and Bytebase is GitHub/GitLab for database**. Git is good for local and personal use. On the other hand, for team development which needs collaboration, review, access control and etc, GitHub/GitLab is more suitable.

Related comparisions:

- [Bytebase vs. Flyway](/blog/bytebase-vs-flyway/)
- [Flyway vs. Liquibase](/blog/flyway-vs-liquibase/)
