---
title: Why Bytebase
description: Bytebase is a database schema change and version control management tool for teams. It consists of a web console and a backend. The backend has a migration core to manage database schema changes. It also integrates with VCS to enable version controlled schema management.
---

Bytebase is a **middleware** sitting between you and your database. It's the GitLab/GitHub for
Database DevOps, built for developers, DBAs and platform engineers. Bytebase can be used in 2 ways:

- **GUI** - Bytebase provides a collaboration workspace for teams to manage database development tasks.
- **API (headless)** - Bytebase can go headless. Teams can integrate [Bytebase API](/docs/api/overview/) into
  their development workflow.

![fish](/content/docs/what-is-bytebase/fish.webp)

## 8-in-1

[All the tools Bytebase replaces](/blog/all-database-tools-bytebase-replaces)

[![replaced-tools](/images/replaced-tools.webp)](/blog/all-database-tools-bytebase-replaces)

## Key Features

[SQL Review](/docs/sql-review/overview/)

Bytebase analyzes SQL changes to enforce rules in compliance with your organization's policy. The enforcement includes naming conventions, anti-SQL pattern detection and etc. Prod and non-prod environments can also enforce different rules respectively.

[Database CI/CD and Change Automation](/docs/change-database/change-workflow/)

Like code review, Bytebase streamlines the database change process. Within a single workflow, a database change can be reviewed and deployed from the dev environment all the way to the production environment.

[GitOps (Database-as-Code)](/docs/vcs-integration/overview/)

Bytebase keeps the complete schema change history. It also integrates with VCS systems. Teams can manage the SQL migration scripts in the VCS and trigger schema deployment on code commit.

[Batch Change and Query](/docs/change-database/batch-change/)

Bytebase allows you to change a collection of databases in a single workflow. It also allows you to issue
a single query against multiple databases.

[SQL Editor](/docs/sql-editor/overview/)

A web-based SQL Editor to query and export data. DBAs no longer need to give away sensitive database credentials when developers need to access the data.

[Dynamic Data Masking](/docs/security/data-masking/overview/)

Bytebase provides multi-level masking policy with workflow to grant unmasked data access.

[Data Access Control](/docs/security/data-query/)

Bytebase provides a suite of features to enable organizations to enforce data security policies, avoid data leaks and conform compliance.

[Data Rollback](/docs/change-database/rollback-data-changes/)

- Statement-level rollback

- Database-level manual and periodical backup and restore

- Point-in-time recovery (PITR)

[API](/docs/api/overview/)

Bytebase GUI is built on the Bytebase API. In theory, 3rd-party can build a new Bytebase
GUI based on the same API.

## Compare with Liquibase / Flyway / schemachange

If Liquibase, Flyway are Git, then Bytebase is GitLab/GitHub. And as an open source project, Bytebase
is growing way faster and ranked No.1 among alternatives.

![bytebase-vs-liquibase-flyway](/content/docs/what-is-bytebase/bytebase-vs-liquibase-flyway-schemachange.webp)

- [Bytebase vs. Liquibase](/blog/bytebase-vs-liquibase/)
- [Bytebase vs. Flyway](/blog/bytebase-vs-flyway/)
- [Bytebase vs. schemachange](/blog/snowflake-schema-change/)

## Compare with DBeaver / Navicat

SQL GUI Client such as MySQL Workbench, pgAdmin, DBeaver, Navicat provide a GUI to interact with the
database. Bytebase not only provides a GUI client, it can also enforce centralized data access control
for data security and governance.

- [Bytebase vs. DBeaver](/blog/bytebase-vs-dbeaver/)
- [Bytebase vs. Navicat](/blog/stop-using-navicat/)

## Compare with CloudBeaver

Both have web-based SQL clients. Additionally, Bytebase offers review workflow, more collaboration and security features.

[Bytebase vs. CloudBeaver](/blog/bytebase-vs-cloudbeaver/)

## Compare with Metabase

Metabase is a data visualization and business intelligence (BI) tool. It's built for data teams and business analysts
to make sense of the data.

Bytebase is a database development platform. It's built for the developer teams to perform database operations during the application development lifecycle.

[Bytebase vs. Metabase](/blog/bytebase-vs-metabase/)

## Compare with Jira

Jira is a general-purpose issue ticketing system. Bytebase is a database domain-specific change management system.
Bytebase provides an integrated experience to plan, review, and deploy database changes.

[Bytebase vs. Jira](/blog/use-jira-for-database-change/)
