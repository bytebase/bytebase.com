---
title: Top Open Source MySQL Migration Tools in 2024
author: Mila
updated_at: 2024/02/06 09:00:00
feature_image: /content/blog/top-open-source-mysql-migration-tools/banner.webp
tags: Industry
featured: true
description: What are the top open source MySQL schema migration tools.
keypage: true
---

MySQL is the most popular open-source relational database management system (RDBMS) for storing and managing structured data. MySQL table migration is always a PITA. As such, several database schema migration tools for MySQL have emerged, and they provide different capabilities and experience.

In this post, we are reviewing several open-source database schema migration tools for MySQL:

- [gh-ost](https://github.com/github/gh-ost)
- [Skeema](https://www.skeema.io/)
- [Liquibase](https://www.liquibase.com/)
- [Flyway](https://flywaydb.org/)
- [Bytebase](https://www.bytebase.com/)

![star-history](/content/blog/top-open-source-mysql-migration-tools/star-history.webp)

## gh-ost

[gh-ost](https://github.com/github/gh-ost) is a triggerless online schema migration tool for MySQL. It's the
successor of trigger-based online schema migration tool [pt-online-schema-change¶](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html). Its triggerless enables database schema changes with minimal downtime and impact on the database's availability and performance. It was developed by GitHub and introduced in 2016 as an open-source project.

![gh-ost](/content/blog/top-open-source-mysql-migration-tools/gh-ost.webp)

> `gh-ost` stands for GitHub’s Online Schema Transmogrifier/Transfigurator/Transformer/Thingy

Traditional online schema migration methods often involve long maintenance windows or require taking the database offline. gh-ost aims to address these limitations by providing a non-blocking and online schema change solution.

All existing online schema change tools operate similarly: they create a _ghost_ table in the likeness of your original table, migrate that table while empty, slowly and incrementally copy data from your original table to the _ghost_ table, meanwhile propagating ongoing changes (any `INSERT`, `DELETE`, `UPDATE` applied to your table) to the _ghost_ table. Finally, at the right time, they replace your original table with the _ghost_ table. `gh-ost` uses the same pattern. However it differs from all existing tools by not using triggers. Instead, it leverages MySQL binlog to capture table changes, and asynchronously applies them onto the _ghost_ table.

## Skeema

[Skeema](https://www.skeema.io/) is a schema management system for MySQL and MariaDB. It enables management of table definitions and schema changes in a declarative fashion using pure SQL.

![skeema](/content/blog/top-open-source-mysql-migration-tools/skeema.webp)

Skeema supports a pull-request-based workflow for schema change submission, review, and execution. This permits your team to manage schema changes the same way as you manage code changes.

Skeema has a companion SaaS tool, Skeema Cloud Linter, that provides automatic linting of schema change commits and pull requests.

GitHub uses both Skeema and gh-ost to [automate its MySQL schema migration process](https://github.blog/2020-02-14-automating-mysql-schema-migrations-with-github-actions-and-more/).

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

## Bytebase

[Bytebase](https://github.com/bytebase/bytebase) is an all-in-one database DevOps and CI/CD solution. It's like GitHub/GitLab that provides a GUI workspace for developers and DBAs to collaborate on database changes. It's written in Go and TypeScript.

![issue-detail](/content/blog/top-open-source-postgres-migration-tools/issue-detail.webp)

It also provides configurable SQL lint rules to detect SQL anti-patterns.

![sql-review](/content/blog/top-open-source-postgres-migration-tools/sql-review.webp)

For MySQL, it also provides a GUI wrapper around gh-ost for online schema migration.

![bb-issue-ghost-config](/content/docs/change-database/online-schema-migration-for-mysql/bb-issue-ghost-config.webp)

Apart from taking care of database change management, Bytebase also provides a SQL Editor with data
access control, dynamic data masking and audit logs to control the query path.

![sql-editor](/content/blog/top-open-source-postgres-migration-tools/sql-editor.webp)

## Summary

| Name                                                | Interface | Language        | MySQL Only          | Highlight                               |
| --------------------------------------------------- | --------- | --------------- | ------------------- | --------------------------------------- |
| [gh-ost](https://github.com/github/gh-ost)          | CLI       | Go              | Y                   | Triggerless online schema migration.    |
| [Skeema](https://github.com/skeema/skeema)          | CLI       | Go              | N (MySQL + MariaDB) | Declarative pure-SQL schema management. |
| [Liquibase](https://github.com/liquibase/liquibase) | CLI       | Java            | N                   | Long-standing.                          |
| [Flyway](https://github.com/flyway/flyway)          | CLI       | Java            | N                   | Developer-friendly.                     |
| [Bytebase](https://github.com/bytebase/bytebase)    | GUI       | Go + TypeScript | N                   | All in one for team collaboration.      |

## Further Readings

- [Postgres vs. MySQL](/blog/postgres-vs-mysql)
- [Data Masking for MySQL Databases](/blog/mysql-data-masking/)
- [Top MySQL GUI Clients](/blog/top-mysql-gui-client/)
- [How to install local MySQL on Mac, Ubuntu, CentOS, Windows](/blog/how-to-install-local-mysql-on-mac-ubuntu-centos-windows/)
- [Postgres Migration Tools](/blog/top-open-source-postgres-migration-tools)
