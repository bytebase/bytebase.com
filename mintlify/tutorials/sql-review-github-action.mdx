---
title: 'SQL Review with GitHub Actions'
author: Adela
updated_at: 2025/03/03 18:15
tags: Tutorial
integrations: GitHub
category: 'Database CI/CD (GitOps)'
level: Intermediate
featured: true
estimated_time: '20 mins'
description: Learn how to use SQL Review via GitHub CI to enhance your database schema change process.
---

When modifying data in the database, it's crucial to ensure that the changes are both safe and accurate. Bytebase offers a feature called [SQL Review](/docs/sql-review/overview/), which allows you to evaluate your SQL changes before they are applied to the database. SQL Review can be invoked from the Bytebase GUI, API or CI.

This tutorial is part of the SQL Review series:

1.  [SQL Review with Bytebase GUI](/docs/tutorials/sql-review-gui/)
1.  SQL Review with CI
    - SQL Review with GitHub Actions (this one)
1.  [SQL Review with Bytebase API](/docs/tutorials/sql-review-api/)
1.  [Codify SQL Review Policies with Bytebase API](/docs/tutorials/api-sql-review-policy/)

This tutorial will show you how to integrate SQL Review with GitHub Actions to improve your database schema change process.

## Repository

https://github.com/bytebase/example-gitops-github-flow

## Prerequisites

Configure ngrok and create service account same as [Database GitOps with GitHub Actions](/docs/tutorials/gitops-github-workflow/#step-1-start-bytebase-with-ngrok).

## GitHub Action Workflow

This [sql-review.yml](https://github.com/bytebase/example-gitops-github-flow/blob/main/.github/workflows/sql-review.yml) workflow is the GitHub Action that will be triggered when a PR is created. It will check the SQL files in the PR and review them with Bytebase.

Configuration snippet:

```yaml
env:
BYTEBASE_URL: 'https://demo.bytebase.com'
BYTEBASE_SERVICE_ACCOUNT: 'ci@service.bytebase.com'
BYTEBASE_PROJECT: 'projects/project-sample'
BYTEBASE_TARGETS: 'instances/test-sample-instance/databases/hr_test,instances/prod-sample-instance/databases/hr_prod'
FILE_PATTERN: 'migrations/*.sql'
```

The deployment target is the database that the SQL files will be applied to. So the SQL Review policy is fetched based on the target database. Visit the [demo sql review policy page](https://demo.bytebase.com/sql-review) to see the `SQL Review Sample Policy` for the `Prod` environment.

![bb-sql-review-prod](/content/docs/tutorials/sql-review-github-action/bb-sql-review-prod.webp)

## Example PR

[Example PR](https://github.com/bytebase/example-gitops-github-flow/pull/1/files) contains 1 sql file in the `migrations` folder:

- `202503071616_create_ticket_table.sql`

Upon PR creation, the GitHub Action triggers SQL Review. A summary, including **affected rows**, **risk level**, and **advices**, is posted as a PR comment. With four files and two stages, there are eight lines of review results.

![gh-sql-review-summary](/content/docs/tutorials/sql-review-github-action/gh-sql-review-summary.webp)

Click the **Files changed** tab for detailed SQL review results posted inlined in the PR.

![gh-file-changed](/content/docs/tutorials/sql-review-github-action/gh-file-changed.webp)

You may correct the SQL files and push again. The SQL Review will be triggered again and the results will be updated.

## Summary

Now you have learned how to trigger SQL Review in GitHub Actions, you may also refer to the [SQL Review](/docs/sql-review/overview) document for more details.
