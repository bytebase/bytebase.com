---
title: Three Ways to Integrate Automatic SQL Review into GitHub
author: Cayden
updated_at: 2022/12/08 09:00
feature_image: /content/blog/integrate-sql-review-into-github/overview.webp
tags: Explanation
integrations: GitHub
featured: true
description: The three ways to integrate Bytebase SQL Review with GitHub. GitHub Action, GitHub App, and GitOps CI
---

## Overview

The review of SQL change scripts is a critical part of the database change process, which used to be
the sole responsibility of the DBA. Developers often submitted the SQL scripts to the DBA just before
the changes go live, leaving the DBAs minimal time to review the scripts (or request changes), making it difficult to ensure the quality of changes.

Bytebase is a database CI/CD tool for developers to make sane database changes with powerful
automatic SQL Review capabilities. To better accommodate developers' workflow, Bytebase integrates
its capabilities into GitHub, allowing developers to manage SQL scripts in their GitHub repositories
and perform SQL Review there. This eliminates the need to switch between multiple tools and, more
importantly, allowing SQL Review to be conducted at the Pull Request (PR) stage rather than waiting
until the deployment stage (shift-left).

![shift-left](/content/blog/integrate-sql-review-into-github/shift-left.webp)

To cope with different needs, Bytebase provides three integration modes for users to choose from:

- [GitHub Action](#github-action)
- [GitHub App](#github-app)
- [GitOps CI](#gitops-ci)

In this article, we will introduce the differences between the three modes in detail.

## GitHub Action

Bytebase automates GitHub Action-based SQL Review by simply putting pre-generated workflow files
into the `.github` directory to integrate SQL Review rules into the CI process.

### Setup

1. Obtain the GitHub Action workflow file

   Visit the [Bytebase GitHub Action](https://github.com/marketplace/actions/sql-review) to fetch
   the appropriate configuration file.

1. Manually create a workflow file to activate the default SQL Review rules

   You need to manually create the workflow file `.github/workflows/sql-review.yml` in your repository
   and modify a few key parameters based on the provided template to cater to your needs.

1. Customize the SQL Review template

   If you are not satisfied with the default review rules, Bytebase provides a visual SQL Review
   rule configuration page [SQL Review Guide](/sql-review-guide), where you can export your custom
   rule to a YAML file with one click, and point the override-file-path parameter in the Action
   workflow file to that file to make the custom rule take effect.

   The detailed configuration process can be found in the [GitHub Action document](https://docs.bytebase.com/sql-review/github-action).

### Result

Once configured, when SQL is detected in the submitted PR, the SQL Review process will be
triggered automatically and the detailed review results will be displayed inline in the changed
file.

![file-comment](/content/blog/integrate-sql-review-into-github/file-comment.webp)

### Pros and Cons

✅ **Free.** Users can use GitHub Action for free.

✅ **Lightweight.** Users don't need to deploy any additional components, just generate a single file
in the code repository and activate it.

✅ **Multiple database types are supported at the same time.** You need to explicitly specify the
database type by file path to support SQL Review for multiple databases at the same time.

❌ **More complex configuration.** Initial configuration or updating SQL Review rules is more complex
due to the need to manually edit YAML.

❌ **Basic SQL Review capability.** Due to the inability to connect to a database, this mode can only
review SQL text based on static rules.

❌ **Single active SQL Review policy.** Only one set of SQL Review rules are allowed to be active at
the same time.

❌ **Single presentation.** SQL Review results can only be viewed in the file being reviewed and
there is no overview of SQL Review results.

❌ **CI-only.** This mode only covers SQL Review and is not integrated with the subsequent SQL
deployment processes.

## GitHub App

You can install the Bytebase GitHub App into your repository and integrate the SQL Review process
into the CI.

### Setup

1. Install the [Bytebase GitHub App](https://www.bytebase.com/docs/sql-review/github-app)
   and activate SQL Review by connecting with a specific repository.
1. Customize SQL Review Rules

   You can visually configure your own SQL Review rules at [hub.bytebase.com](https://hub.bytebase.com),
   and all changes will take effect immediately. See the [GitHub App documentation](https://www.bytebase.com/docs/sql-review/github-app) for more details on the configuration process.

### Result

Once configured, the review process will be triggered automatically when SQL is detected in the
submitted PR.

You can see the overview of the SQL Review results in the PR overview.

![file-comment](/content/blog/integrate-sql-review-into-github/file-comment.webp)

Per file detailed review results will also be displayed inline in the file.

![pr-comment](/content/blog/integrate-sql-review-into-github/pr-comment.webp)

### Pros and Cons

✅ **Free.** Users can use the APP for free.

✅ **Lightweight.** Users don't need to deploy any additional components, just one click to deploy the
GitHub App and activate it.

✅ **Easy to configure.** Point-and-Click configuration.

✅ **Comprehensive presentation.** You can view the SQL Review results in both the PR overview and
per-file page.

❌ **Basic SQL Review capability.** Due to the inability to connect to a database, this mode can only
review SQL text based on static rules.

❌ **Explicitly specify the database type.** Due to the inability to connect to a database, this schema
can only be explicitly configured to take effect on one of the supported database types.

❌ **Single active SQL Review policy.** Only one set of SQL Review rules are allowed to be active at
the same time.

❌ **CI-only.** This mode only covers SQL Review and is not integrated with the subsequent SQL
deployment processes.

## GitOps CI

The Bytebase Console-based integration mode provides more powerful functionality:

1. Unlock more advanced SQL Review rules by connecting with the changed database.
1. Integrate with the subsequent CD processes.

### Setup

1. Deploy Bytebase Console and complete the basic configuration

   This mode requires the deployment of Bytebase Console, and you need to import your database environment into Bytebase.
   Please refer to [Bytebase Installation Guide](https://www.bytebase.com/docs/get-started/deploy-with-docker)
   for the detailed process.

1. Activate SQL Review CI with one click

   The GitHub Action can be configured automatically by configuring GitOps Workflow in the Project
   Configuration page from Bytebase Console.

1. Customizing SQL Review rules

   If you are not satisfied with the default SQL Review rules, you can configure it visually from the
   Bytebase Console and all changes will take effect immediately.

   See the [GitOps CI documentation](https://www.bytebase.com/docs/sql-review/gitops-ci)
   for details on how to do this.

### Result

Once configured, the review process will be triggered automatically when SQL is detected in the
submitted PR.

![file-comment](/content/blog/integrate-sql-review-into-github/file-comment.webp)

### Pros and Cons

✅ **Easy to configure.** Point-and-Click configuration.

✅ **Advanced SQL Review capabilities.** Because Bytebase can connect to the database to fetch the
structure and statistic, it can provide more advanced SQL Review capabilities.

✅ **Multiple SQL Review policies in effect at the same time.** Multiple SQL Review policies can be
configured, associated with specific environments (Test, Prod).

✅ **Integration with CD.** Automatically triggers the subsequent SQL deployment process after
the SQL Review passes and the code is merged, enabling a streamlined database CI/CD experience.
This unifies the SQL Review standards between the application developer and DBA teams.

✅ **No need to specify database type.** Bytebase can connect to the database to determine the database
type automatically.

❌ **Paid subscription.** Bytebase Enterprise subscription is required.

❌ **More setup.** Users need to deploy Bytebase Console and prepare the database environment.

❌ **Single presentation.** SQL Review results can only be viewed in the file being reviewed and
there is no overview of SQL Review results.

## Comparison Table

|                       | GitHub Action                  | GitHub App                                    | GitOps CI                                                          |
| --------------------- | ------------------------------ | --------------------------------------------- | ------------------------------------------------------------------ |
| For                   | **Individual and small teams** | **Individual and small teams**                | **Teams needing complete database change management**              |
| Pricing               | Free                           | Free                                          | Enterprise subscription                                            |
| Setup                 | Deploy GitHub Action           | Deploy GitHub App                             | Deploy Bytebase Concole and prepare database environment           |
| Configuration         | Code-based with UI assistance  | Point-and-Click                               | Point-and-Click                                                    |
| SQL Review Capability | Pure SQL statement based       | Pure SQL statement based                      | SQL statement + database metadata and statistics                   |
| Result Presentation   | Per-file inline comment        | Per-file inline comment + PR overview comment | Per-file inline comment                                            |
| Policy                | Single active policy           | Single active policy                          | Multiple active policies, auto match with the database environment |
| CI/CD Integration     | SQL Review only                | SQL Review only                               | SQL Review and SQL change deployment, streamlined CI/CD            |
