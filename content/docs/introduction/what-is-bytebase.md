---
title: Why Bytebase
description: Bytebase is a database schema change and version control management tool for teams. It consists of a web console and a backend. The backend has a migration core to manage database schema changes. It also integrates with VCS to enable version controlled schema management.
---

Our founding team previously built the Google Cloud database and API infrastructure. We envision Bytebase
to be the GitLab/GitHub equivalent for **Database DevSecOps**, specifically built for the developer, security, DBA and platform engineering teams.

Bytebase is a **middleware** sitting between you and your database. It can be used in 2 ways:

- **GUI** - Bytebase provides a collaboration workspace for teams to manage database development tasks for all database systems.
- **API (headless)** - Bytebase can go headless. Teams can leverage [Bytebase API](/docs/api/overview/) as the database operation backend and integrate with their own development workflow.

## 8-in-1

![venn](/content/docs/what-is-bytebase/venn.webp)

Bytebase is an all-in-one solution for database development lifecycle management. It replaces fragmented database tools and unifies the workflow in a single place. Check [all the tools Bytebase replaces](/blog/all-database-tools-bytebase-replaces).

## Key Features

[Database CI/CD and Change Automation](/docs/change-database/change-workflow/)

Like code review, Bytebase streamlines the database change process. Within a single workflow, a database change can be requested, reviewed, approved and deployed from the dev environment all the way to the production environment. It also supports [automated SQL Review](/docs/sql-review/overview/) and [GitOps (Database-as-Code)](/docs/vcs-integration/overview/).

[SQL Editor](/docs/sql-editor/overview/)

A web-based SQL Editor to query and export data. DBAs no longer need to give away sensitive database credentials when developers need to access the data.

[Database Permission](/docs/security/database-permission/query/)

Bytebase provides a suite of features to enable organizations to enforce data security policies, avoid data leaks and conform compliance.

[Dynamic Data Masking](/docs/security/data-masking/overview/)

Bytebase provides role-based multi-level masking policy with approval workflow to grant unmasked data access.

[1-click Rollback](/docs/change-database/rollback-data-changes/)

Bytebase provides streamlined 1-click data rollback.

[Batch Change and Query](/docs/change-database/batch-change/)

Bytebase allows you to change a collection of databases in a single workflow. It also allows you to issue
a single query against multiple databases.

[API](/docs/api/overview/)

Bytebase GUI is built on the public Bytebase API. In theory, 3rd-party can build a new Bytebase
GUI based on the same API.

## Compare with Liquibase / Flyway / schemachange

If Liquibase, Flyway are Git, then Bytebase is GitLab/GitHub. And as an open source project, Bytebase
is growing way faster and ranked No.1 among alternatives.

![bytebase-vs-liquibase-flyway](/content/docs/what-is-bytebase/bytebase-vs-liquibase-flyway-schemachange.webp)

- [Bytebase vs. Liquibase](/blog/bytebase-vs-liquibase/)
- [Bytebase vs. Flyway](/blog/bytebase-vs-flyway/)
- [Bytebase vs. schemachange](/blog/snowflake-schema-change/)

## Compare with CloudBeaver

Both have web-based SQL clients. Additionally, Bytebase offers review workflow, more collaboration and security features.

![bytebase-vs-cloudbeaver](/content/docs/what-is-bytebase/bytebase-vs-cloudbeaver.webp)

[Bytebase vs. CloudBeaver](/blog/bytebase-vs-cloudbeaver/)

## Compare with DBeaver / Navicat

SQL GUI Client such as MySQL Workbench, pgAdmin, DBeaver, Navicat provide a GUI to interact with the
database. Bytebase not only provides a GUI client, it can also enforce centralized data access control
for data security and governance.

- [Bytebase vs. DBeaver](/blog/bytebase-vs-dbeaver/)
- [Bytebase vs. Navicat](/blog/stop-using-navicat/)

## Compare with Metabase

Metabase is a data visualization and business intelligence (BI) tool. It's built for data teams and business analysts
to make sense of the data.

Bytebase is a database development platform. It's built for the developer teams to perform database operations during the application development lifecycle.

[Bytebase vs. Metabase](/blog/bytebase-vs-metabase/)

## Compare with Jira

Jira is a general-purpose issue ticketing system. Bytebase is a database domain-specific change management system.
Bytebase provides an integrated experience to plan, review, and deploy database changes.

[Bytebase vs. Jira](/blog/use-jira-for-database-change/)
