---
title: Automating Database Schema Change workflow Using GitHub Actions
author: Ningjing
published_at: 2024/03/19 17:00
tags: Tutorial
integrations: GitHub
level: Advanced
estimated_time: '30 mins'
description: 'In this article, you will delve into a practical example from Bytebase, demonstrating how to automate database schema change workflow using GitHub Actions and Bytebase API.'
---

Bytebase is a database DevOps and CI/CD tool for Developer, DBA and Platform Engineering teams. Its user-friendly GUI streamlines collaborative database management, making it more accessible than ever.

To integrate Bytebase seamlessly into existing CI/CD pipelines with GitHub, without imposing additional workload on developers, utilizing the [Bytebase API](docs/api/overview/) is crucial.

This article offers a hands-on example, demonstrating how to automate database schema changes alongside application code using GitHub Actions and Bytebase API. The repository is at [https://github.com/bytebase/ci-example](https://github.com/bytebase/ci-example).

We will following `Sample Workflow - Create Migration Issue on PR Approval` in our example. After understanding the workflow, you may adjust it to suit your own needs.

![workflow-illustration](/content/docs/tutorials/github-ci/workflow.webp)

## Run Bytebase

Suppose Bytebase is running at `https://bytebase.example.com/`. To begin, we'll first set up the necessary data to support our API interactions.

1. **Service account**: As an admin, we add a [service account](/docs/api/authentication/#service-account) `ci@service.bytebase.com` with the `Workspace DBA` role, which will be used to authenticate the API calls.

   ![bb-workspace-members-ci](/content/docs/tutorials/github-ci/bb-workspace-members-ci.webp)

2. **A database in a project**: We have a project called `Example`, and a database: `example`.

   ![bb-project-database](/content/docs/tutorials/github-ci/bb-project-database.webp)

## Prepare GitHubs Actions

Go and check the example on GitHub [https://github.com/bytebase/ci-example](https://github.com/bytebase/ci-example).

The repository contains several GitHub Action workflows, you may go to `.github/workflows` to view.

![gh-workflows](/content/docs/tutorials/github-ci/gh-workflows.webp)

We will following `Sample Workflow - Create Migration Issue on PR Approval` in our example which will involve the following workflows:

- `bytebase-sql-review.yml`: on PR change. Thus any SQL review violation will block the PR.
- `bytebase-upsert-migration.yml` on PR approval. Creates the migration after approval, and even migration script changes afterwards, the migration issue will also be updated accordingly.
- `bytebase-check-migration-status.yml`: on PR change. Thus PR will be blocked until migration completes.


## Sample Workflow, Three Demo PRs

To illustrate the workflow, we have prepared three PRs to showcase the different stages of the database schema change process.

### PR 1: Not passing SQL review on GitHub

Before we delve into the workflow, let's set up the SQL Review policy in Bytebase. The example database is on the `Prod` environment, where we will configure SQL review policy. Here we have a policy that checks for `NOT NULL` constraints, which we will violate in the PR.

![bb-environment-sql-review](/content/docs/tutorials/github-ci/bb-environment-sql-review.webp)

![bb-sql-review-policy-not-null](/content/docs/tutorials/github-ci/bb-sql-review-policy-not-null.webp)

Returning to GitHub Actions and digging into the code, the `bytebase-sql-review.yml` workflow is triggered on PR change. It scans the SQL files named following the pattern `**.up.sql` within the pull request and identifies any violations of the SQL review policy.

Configure the environment.

```yaml
   bytebase-sql-review:
      runs-on: ubuntu-latest
      env:
         BYTEBASE_URL: "https://bytebase-ci.zeabur.app"
         BYTEBASE_SERVICE_ACCOUNT: "ci@service.bytebase.com"
         DATABASE: "instances/prod-instance/databases/example"
   ...
```

After authentication, we call the Bytebase API `/sql/check` to check the SQL files and by parsing the response, we can emit annotations for each advice and mark the check as failed if any `ERROR` or `WARNING` is found.

```yaml
     name: SQL Review
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Login to Bytebase
        ...
      - name: Review
        id: review
        uses: ./.github/actions/sql-review
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          pattern: "**/*.up.sql"
          url: ${{ env.BYTEBASE_URL }}
          token: ${{ steps.login.outputs.token }}
          headers: '{"Accept-Encoding": "deflate, gzip"}'
          database: ${{ env.DATABASE }}
      ...
```

We create our [first PR](https://github.com/bytebase/github-action-example/pull/15) with several SQL files, and it triggers both `bytebase-sql-review.yml` and `bytebase-check-migration-status.yml`. After these checks are completed, the PR is blocked due to failures.

![gh-pr1-blocked](/content/docs/tutorials/github-ci/gh-pr1-blocked.webp)

Click on the **Details** for SQL Review.

![gh-sql-review-warning](/content/docs/tutorials/github-ci/gh-sql-review-warning.webp)

You may also go to **Files changed** to view the annotations.

![gh-sql-review-warning-file-annotation](/content/docs/tutorials/github-ci/gh-sql-review-warning-file-annotation.webp)


### PR 2: Passing SQL review and waiting for Approval on GitHub

For demo purposes, we then fix the SQL files and create a [second PR](https://github.com/bytebase/github-action-example/pull/16). In real-life scenarios, you may choose to update the SQL files within the same PR.

After completing these checks, the PR is blocked due to failures, but this time SQL review has passed.

In real-life scenarios, the PR also encompasses application code. Because the SQL migration has passed the basic SQL review checks, it is now time for a tech leader to **approve** this PR.

![gh-pr2-blocked](/content/docs/tutorials/github-ci/gh-pr2-blocked.webp)


### PR 3: Migration completed and PR is mergable on GitHub

Following PR 2 we create [PR 3](https://github.com/bytebase/github-action-example/pull/18), the developer who creates the PR assigns the tech leader to review. The tech leader approves the PR, and the `bytebase-upsert-migration.yml` workflow is triggered. It checks the SQL files named like `**.up.sql` within the pull request and creates a rollout issue in Bytebase.

```yaml
   bytebase-upsert-migration:
    runs-on: ubuntu-latest
    # Runs only if PR is approved and target branch is main
    if: github.event.review.state == 'approved' && github.event.pull_request.base.ref == 'main'
    env:
      BYTEBASE_URL: "https://bytebase-ci.zeabur.app"
      BYTEBASE_SERVICE_ACCOUNT: "ci@service.bytebase.com"
      PROJECT: "example"
      DATABASE: "instances/prod-instance/databases/example"
      ISSUE_TITLE: "[${{ github.repository }}#${{ github.event.pull_request.number }}] ${{ github.event.pull_request.title }}"
      DESCRIPTION: "Triggered by ${{ github.event.repository.html_url }}/pull/${{ github.event.pull_request.number }} ${{ github.event.pull_request.title }}"
    name: Upsert Migration
    steps:
    ...
```

Go to Bytebase and view the created issue, which consists of two tasks due to the presence of two `**.up.sql` files in the PR.

![bb-issue-user-post](/content/docs/tutorials/github-ci/bb-issue-user-post.webp)

You may notice there is an approval flow attached, that's because we set up a default custom approval flow for DDL.

![bb-custom-approval](/content/docs/tutorials/github-ci/bb-custom-approval.webp)

After the DBA approves and rolls out the migrations, the issue status will become `Done`.

![bb-issue-done](/content/docs/tutorials/github-ci/bb-issue-done.webp)

Go back to GitHub, click **Details** for the failed `bytebase-check-migration-status.yml` workflow, and then click **Re-run all jobs**.

![gh-pr2-blocked](/content/docs/tutorials/github-ci/gh-pr2-blocked.webp)

![gh-re-run](/content/docs/tutorials/github-ci/gh-re-run.webp)

It checks the migration status in Bytebase and return `pass` if it's `Done`, indicating the database migration has been completed. The PR is now ready to be merged, which means the application code is ready to be deployed.

![gh-re-run-pass](/content/docs/tutorials/github-ci/gh-re-run-pass.webp)

![gh-all-pass-ready-merge](/content/docs/tutorials/github-ci/gh-all-pass-ready-merge.webp)

## Summary

In this article, we've explored how to automate database schema changes using GitHub Actions and Bytebase API. Additionally, we've shown how to configure SQL Review and establish a custom approval workflow within Bytebase. Our example followed the `Sample Workflow - Create Migration Issue on PR Approval`. Keep in mind that workflows can vary based on the organization's needs. After completing this one, you may want to explore other workflows, such as `Sample Workflow - Create Migration Issue on PR Creation`, on your own.
