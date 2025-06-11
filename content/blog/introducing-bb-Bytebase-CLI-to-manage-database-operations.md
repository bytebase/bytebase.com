---
title: 'Introducing bb - a Bytebase CLI tool to manage database operations'
author: Candy
updated_at: 2022/05/27 09:57:57
feature_image: /content/blog/introducing-bb-bytebase-cli-to-manage-database-operations/bb.webp
tags: Hidden, Announcement
featured: true
description: This article describes how to install and run Bytebase CLI bb
---

## What is `bb`

Bytebase is an open source database DevOps tool, it's the GitLab for managing databases throughout the application development lifecycle. It offers a web-based workspace for DBAs and Developers to collaborate and manage the database change safely and efficiently.

We released Bytebase Web UI on July 13, 2021. Ten months later, we are excited to announce the release of Bytebase CLI, named `bb`.

Developers can execute `bb` commands to manage MySQL and PostgreSQL database (change database schema, restore database, etc.) after installing `bb`. Most importantly, developers can integrate MySQL and PostgreSQL schema change into the CI/CD workflow by integrating `bb` with the CI/CD system, such as GitLab CI, GitHub Actions, and Jenkins.

The following is a list of commands provided by Bytebase CLI `bb` that can manage a database. More is coming soon:

- [migrate](https://docs.bytebase.com/cli/overview#migrate): apply schema migration to the database.
- [dump](https://docs.bytebase.com/cli/overview#dump): dump a database schema and data.
- [restore](https://docs.bytebase.com/cli/overview#restore): restore a database schema and data from a dump file.

This blog post gives an overview of how to install Bytebase CLI `bb` and how to execute `bb` commands. For integrating Bytebase CLI `bb` into the CI/CD system, see [Integrating with GitLab CI](https://docs.bytebase.com/cli/integrate-with-gitlab).

## Installing `bb`

Install `bb` into the folder /usr/local/bin on macOS or Linux by entering the command below:

```text
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/bytebase/install/HEAD/install.sh)"
```

![installation](/content/blog/introducing-bb-bytebase-cli-to-manage-database-operations/bb-installing.webp)

Enter the following command to verify the installation:

```text
bb --help
```

Then you should see help output:

![help information](/content/blog/introducing-bb-bytebase-cli-to-manage-database-operations/bb-help.webp)

## Running `bb`

To execute `bb` commands, we need a database, see [Getting Started](https://docs.bytebase.com/cli/overview#start-a-local-mysql-server-via-docker).

Let's take database schema change as an example.

First of all, enter the following command to display the database schema:

```text
bb dump --dsn mysql://root:passwd@localhost:3306/bytebase_test_todo --schema-only
```

You should see there is a table named "author":

![the table named "author"](/content/blog/introducing-bb-bytebase-cli-to-manage-database-operations/bb-before-change.webp)

Then, add a column named "phone_no" into the table "author" with the following `migrate` command:

```text
bb migrate \
  --dsn mysql://root:passwd@localhost:3306/bytebase_test_todo \
  --command "ALTER TABLE author ADD COLUMN phone_no VARCHAR(15);"
```

Finally, verify database schema with the following `dump` command:

```text
bb dump --dsn mysql://root:passwd@localhost:3306/bytebase_test_todo --schema-only
```

![The schema of the table is changed](/content/blog/introducing-bb-bytebase-cli-to-manage-database-operations/bb-after-change.webp)

Please try it out, head over to [the documentation](https://docs.bytebase.com/cli/overview) to learn more, let us know how we can [improve it](https://github.com/bytebase/bytebase/issues).
