---
title: 'Bytebase vs. Liquibase'
author: Changyu
published_at: 2023/06/08 19:21:21
feature_image: /content/blog/bytebase-vs-liquibase/bytebase-vs-liquibase.webp
tags: Explanation
description: 'When looking for a database schema change or version control tool, Bytebase and Liquibase are two popular options. Understanding the differences between these two tools can help potential users choose the one that best meets their needs.'
---
When looking for a database schema change or version control tool, Bytebase and Liquibase are two popular options. Understanding the differences between these two tools can help potential users choose the one that best meets their needs.

## What Bytebase and Liquibase have in common

- Primarily migration-based database change
- State-based database change supported in some case
- Native SQL supported
- Database CI/CD configuration (see [Database GitOps configuration](#database-gitops-configuration))
- Auto SQL check (see [Auto SQL check](#sql-auto-check))
- Sync schema (see [Sync schema](#sync-schema))
- Three-tier pricing Free, Pro Plan, and Enterprise Plan.
- Open source, Liquibase has a long history, while Bytebase has high speed.
    ![star-history](/content/blog/bytebase-vs-liquibase/star-history.webp)

## What are the differences between Bytebase and Liquibase?

While both Bytebase and Liquibase are tools for database schema change and version control, there are some key differences between the two.
In general, if we say Liquibase is Git for database, then Bytebase is more than GitHub/GitLab.

| | Liquibase | Bytebase |
|---|---|---|
| [Product position](#product-position) | Schema change | Schema Change, Data Query and Secure |
| [Product form](#product-form---how-to-interact) | CLI | GUI |
| [Supported databases](#supported-databases) | 50 | 13 |
| [Programming language and installation](#installation) | Java | Go |
| [Change execution](#change-execution) | Changelog + CLI | Issue + GUI|
| [Change execution advance](#change-execution) | - | Batch / Multi-tenant / Online Schema Change|
| [Database GitOps](#database-gitops-configuration) | ✅ | ✅  |
| [SQL auto check](#sql-auto-check) | ✅ Pro | ✅ Free  |
| [Approval flow](#approval-flow) | - | ✅  |
| [Change history](#change-history) | ✅ | ✅  |
| [Sync schema](#sync-schema) | ✅ | ✅  |
| [Rollback](#rollback) | ✅ | ✅  |
| [Schema drift detection](#schema-drift-detection) | - | ✅  |
| [Slow query detection and advisor](#slow-query-detection-and-advisor) | - | ✅  |
| [Data query, security and compliance](#data-query-security-and-compliance) | - | ✅  |

### Product position

- **Liquibase**: A database schema change and version control tool. It helps you track, manage, and automate changes to your database.
    ![liquibase-position](/content/blog/bytebase-vs-liquibase/liquibase-position.webp)

- **Bytebase**: In addition to database schema change and version control, Bytebase also provides data query, security, and compliance features. A collaboration workspace that helps DBAs and Developers manage the database development lifecycle.
    ![bytebase-position](/content/blog/bytebase-vs-liquibase/bytebase-position.webp)

### Product form - How to interact

- **Liquibase**: A command-line tool. A simple graphical user interface (GUI) called Liquibase Hub is available with the Pro Plan, but it has [sunset in May 2023](https://www.liquibase.com/blog/liquibase-hub-sunset).
- **Bytebase**: A web-based GUI tool. It also provides a command-line interface (CLI) and an application programming interface (API).

### Supported databases

- **Liquibase**: 50 - IBM DB2, MS SQL Server, Oracle, PostgreSQL, MySQL, Snowflake, MongoDB, Clickhouse ...
- **Bytebase**: 13 - MySQL, PostgreSQL, ClickHouse, Snowflake, MongoDB, Oracle, MS SQL Server ...

### Installation

- **Liquibase**: Java-based tool, so you need to install a Java Virtual Machine (JVM) before you can install Liquibase.
- **Bytebase**: Go-based tool, use docker to deploy.

### Change execution

- **Liquibase**: CLI or GitOps. Users specify the changes by defining a `changelog.xml`  file and then run a command.

![liquibase-changelog](/content/blog/bytebase-vs-liquibase/liquibase-changelog.webp)
![liquibase-update](/content/blog/bytebase-vs-liquibase/liquibase-update.webp)

- **Bytebase**: Web-based GUI or GitOps. Users create issues with SQL which could be approved. An issue may include SQL running against one stage, or batch change against several stages in a pipeline.
    ![bytebase-issue](/content/blog/bytebase-vs-liquibase/bytebase-issue.webp)

    Users can create tenant project to facilitate batch change as well. In tenant mode,  users may do canary release.
    ![bytebase-canary](/content/blog/bytebase-vs-liquibase/bytebase-canary.webp)

    Users may do online schema change for MySQL.
    ![bytebase-online-schema-change](/content/blog/bytebase-vs-liquibase/bytebase-online-schema-change.webp)

### Database GitOps configuration

- **Liquibase**: Configure with GitLab CI/CD.
    ![liquibase-gitlab-gitops](/content/blog/bytebase-vs-liquibase/liquibase-gitlab-gitops.webp)

   Check the video: [How to Set Up GitLab CI/CD Pipelines with Liquibase](https://www.youtube.com/watch?v=ZBFhDayoRYo)

- **Bytebase**: Choose GitOps workflow in a project.
    ![bytebase-gitlab-gitops](/content/blog/bytebase-vs-liquibase/bytebase-gitlab-gitops.webp)

    You may even enable SQL Review in GitLab automatically by clicking a checkbox while configuring GitOps workflow.  (which is not in the video)
    ![bytebase-gitops-sql-review](/content/blog/bytebase-vs-liquibase/bytebase-gitops-sql-review.webp)

    Check the video: [Setting up GitLab VCS integration for Bytebase (GitOps)](https://www.youtube.com/watch?v=51_bL7Vnqww&t=221s)

Both Bytebase and Liquibase can be configured to use Database GitOps. However, Bytebase's approach is slightly easier thanks to its GUI.

### SQL auto check

SQL auto check (according to configured rules) helps developers write less buggy SQL and helps DBAs save efforts while achieving better results. They both support this.

- **Liquibase**: SQL Quality check [https://www.liquibase.com/quality-checks](https://www.liquibase.com/quality-checks)
- **Bytebase**: SQL Review [https://www.bytebase.com/docs/sql-review/review-rules/](https://www.bytebase.com/docs/sql-review/review-rules/)

#### Supported Plan

- **Liquibase**: Pro Plan
- **Bytebase**: Free Plan

#### Number of rules

- **Liquibase**: 10 general rules
- **Bytebase**: 49 rules for MySQL, 38 rules for PostgreSQL, 18 rules for Oracle ...

#### How to configure

- **Liquibase**: Predefined, you may set levels while calling.
    ![liquibase-quality-check](/content/blog/bytebase-vs-liquibase/liquibase-quality-check.webp)
- **Bytebase**: Rules are predefined, you can activate and choose error level for specific rules. The picked rule set will make a reusable policy which can be applied to environment, e.g. `Prod`.
    ![bytebase-sql-review-rules](/content/blog/bytebase-vs-liquibase/bytebase-sql-review-rules.webp)


#### How to trigger

- **Liquibase**: Run `check` command or manually integrate this command in automation. Users may go to admin console to view logs.
![liquibase-validate-result](/content/blog/bytebase-vs-liquibase/liquibase-validate-result.webp)

- **Bytebase**: Three places to trigger SQL review by default, users may manually integrate it to other scenarios by API as well:
  1. When a database change is created as an issue.
    ![liquibase-changeset](/content/blog/bytebase-vs-liquibase/liquibase-changeset.webp)

  2. When users query data from SQL Editor.
    ![bytebase-sql-editor-review](/content/blog/bytebase-vs-liquibase/bytebase-sql-editor-review.webp)

  3. When users enable GitOps workflow, before a new SQL is merged into the main branch.
    ![bytebase-gitops-merge](/content/blog/bytebase-vs-liquibase/bytebase-gitops-merge.webp)


### Approval flow

- **Liquibase**: Not supported.
- **Bytebase**: Basic rollout and custom approval flow adjusted by risk-level.
    ![bytebase-rollout-policy](/content/blog/bytebase-vs-liquibase/bytebase-rollout-policy.webp)
    ![bytebase-custom-approval-flow](/content/blog/bytebase-vs-liquibase/bytebase-custom-approval-flow.webp)
    ![bytebase-risk-center](/content/blog/bytebase-vs-liquibase/bytebase-risk-center.webp)

### Change history

- **Liquibase**: Simple Database Change Logs.
    ![liquibase-logs](/content/blog/bytebase-vs-liquibase/liquibase-logs.webp)

- **Bytebase**: Change History, you may view diff for each issue.
    ![bytebase-change-history](/content/blog/bytebase-vs-liquibase/bytebase-change-history.webp)
    ![bytebase-change-diff](/content/blog/bytebase-vs-liquibase/bytebase-change-diff.webp)

### Sync schema

- **Liquibase**: Support `diff-changelog` to compare databases and to create a deployable changelog to sync.
- **Bytebase**: Choose a spefic schema version, calculate the diff with selected databases and then create an issue to sync.
    ![bytebase-sync-schema-step1](/content/blog/bytebase-vs-liquibase/bytebase-sync-schema-step1.webp)
    ![bytebase-sync-schema-step2](/content/blog/bytebase-vs-liquibase/bytebase-sync-schema-step2.webp)

### Rollback

- **Liquibase**: Support `rollback-one-changeset` or `rollback`.
- **Bytebase**: By using sync schema, users may revert to a specific version.

### Schema drift detection

- **Liquibase**: Not supported.
- **Bytebase**: Will auto detect schema diff if someone manipulates the schemas out of Bytebase.
    ![bytebase-schema-drift](/content/blog/bytebase-vs-liquibase/bytebase-schema-drift.webp)

### Slow query detection and advisor
- **Liquibase**: Not supported.
- **Bytebase**: Will auto detect slow queries and send weekly summary report. Provide an index advisor to help speed up slow queries.
    ![bytebase-slow-query](/content/blog/bytebase-vs-liquibase/bytebase-slow-query.webp)


### Data query, security and compliance

- **Liquibase**: Users need other database query clients to deal with the following, e.g. navicat, dbeaver, etc.

- **Bytebase**: Provides SQL Editor by default, in which users may share sheets, configure access control and anonymize data.

    ![bytebase-sql-editor](/content/blog/bytebase-vs-liquibase/bytebase-sql-editor.webp)

    Bytebase supports RBAC, e.g. developers need to require permission to access or export databases via SQL Editor.
    ![bytebase-request-query-export](/content/blog/bytebase-vs-liquibase/bytebase-request-query-export.webp)

    Everything that happened within Bytebase will be recorded for audit purposes.
    ![bytebase-audit](/content/blog/bytebase-vs-liquibase/bytebase-audit.webp)

    Bytebase also supports SSO, IM webhook and etc.


## Summary
To summarize, Bytebase and Liquibase are both viable options for schema change. However, if you need a tool that also supports collaboration and data security, Bytebase may be a better choice.
