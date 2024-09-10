---
title: Automating Database Schema Change workflow Using GitHub Actions
author: Ningjing
updated_at: 2024/03/19 17:00
tags: Tutorial
integrations: GitHub
level: Advanced
estimated_time: '30 mins'
description: 'In this article, you will delve into a practical example from Bytebase, demonstrating how to automate database schema change workflow using GitHub Actions and Bytebase API.'
---

> Tutorial repository [https://github.com/bytebase/github-action-example](https://github.com/bytebase/github-action-example)

Developers like to keep their schema migration scripts in Git along with the application code. Thus
the migration scripts will be reviewed and version-controlled in the same way as the application code.
However, developers still have to manually paste the migration script into their SQL client or ask the DBAs
to run it against the target database. This is inefficient and error-prone:

- What if you paste the wrong script / miss the script?
- What if you run the script against the wrong database?

This tutorial teaches how to get rid of this manual process and fully automate database schema change
using GitHub Actions and Bytebase API.

![workflow](/content/docs/tutorials/github-ci/workflow.webp)

Above shows a typical workflow:

1. Developer creates a PR containing the migration script. After PR is created, it triggers a GitHub
   Action to lint the SQL by calling Bytebase [SQL Review API](/docs/api/sql-review/).

1. TL approves the PR.

1. Upon PR approval, it triggers a GitHub Action to create a Bytebase rollout issue.
   The issue contains the migration script changes.

1. Depending on the configured [approval](/docs/administration/custom-approval/) and [rollout policy](/docs/administration/environment-policy/rollout-policy/), it may require manual approval and rollout from DBA. Another GitHub Action is configured to block the PR merge until Bytebase rolls out the schema migration. Sometimes, a PR contains both code and schema changes. This setup guarantees **the schema migration is applied before the code deployment**.

1. Bytebase deploys the schema change and marks the issue as Done.

1. PR re-runs the migration status check and now it turns green.

1. Now PR can be merged.

## Prepare Bytebase

Suppose Bytebase is running at `https://bytebase.example.com/`. To begin, we'll first set up the necessary data to support our API interactions.

1. **Service account**: As an admin, we add a [service account](/docs/api/authentication/#service-account) `ci@service.bytebase.com` with the `Workspace DBA` role, which will be used to authenticate the API calls.

   ![bb-workspace-members-ci](/content/docs/tutorials/github-ci/bb-workspace-members-ci.webp)

   <HintBlock type="info">

   To limit the service account permissions, you can choose to grant `Workspace Member` instead of `Workspace DBA`.
   And then in the particular project, grant the account the permission to create an issue.

   </HintBlock>

1. **A database in a project**: We have a project called `Example`, and a database: `example`.

   ![bb-project-database](/content/docs/tutorials/github-ci/bb-project-database.webp)

## Prepare GitHubs Actions

Go and check the example on GitHub [https://github.com/bytebase/ci-example](https://github.com/bytebase/ci-example).

The repository contains several GitHub Action workflows, you may go to `.github/workflows` to view.

![gh-workflows](/content/docs/tutorials/github-ci/gh-workflows.webp)

We will use the following workflows:

- `bytebase-sql-review.yml`: Triggered on PR change. Thus any SQL review violation will block the PR.
- `bytebase-upsert-migration.yml` Triggered on PR approval. Creates the Bytebase migration issue after approval.
  And whenever the migration scripts change afterwards, the migration issue will also be updated accordingly.
- `bytebase-check-migration-status.yml`: Triggered on PR change. Thus PR will be blocked until migration completes.

## Sample Workflow, Four Phases

To illustrate the workflow, we have divided it into four phases to showcase the database schema change process.

### Phase 1: Not passing SQL review on GitHub

Before we delve into the workflow, let's set up the SQL Review policy in Bytebase. The example database is on the `Prod` environment, where we will configure SQL review policy. Here we have a policy that checks for `NOT NULL` constraints, which we will violate in the PR.

![bb-environment-sql-review](/content/docs/tutorials/github-ci/bb-environment-sql-review.webp)

![bb-sql-review-policy-not-null](/content/docs/tutorials/github-ci/bb-sql-review-policy-not-null.webp)

Returning to GitHub Actions and digging into the code, the `bytebase-sql-review.yml` workflow is triggered on PR change. It scans the SQL files named following the pattern `**.up.sql` in the PR and reports any SQL review policy violations.

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

After authentication, we call the Bytebase API `/sql/check` to lint the migration files. We parse the response
and emit GitHub inline annotations for each advice and mark the check as failed if any `ERROR` or `WARNING` is found.

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

We create a [PR](https://github.com/bytebase/github-action-example/pull/15) with several SQL files, and it triggers both `bytebase-sql-review.yml` and `bytebase-check-migration-status.yml`. After these checks are completed, the PR is blocked due to failures.

![gh-pr1-blocked](/content/docs/tutorials/github-ci/gh-pr1-blocked.webp)

Click on the **Details** for SQL Review.

![gh-sql-review-warning](/content/docs/tutorials/github-ci/gh-sql-review-warning.webp)

You may also go to **Files changed** to view the annotations.

![gh-sql-review-warning-file-annotation](/content/docs/tutorials/github-ci/gh-sql-review-warning-file-annotation.webp)

### Phase 2: Passing SQL review and waiting for TL's approval on GitHub

We then fix the SQL files and pushes. After completing these checks, the PR is still blocked due to failures, but this time SQL review has passed.

In real-life scenarios, the PR also encompasses application code. Because the SQL migration has passed the basic SQL review checks, it is now time for a tech leader to **approve** this PR.

![gh-waiting-for-approval](/content/docs/tutorials/github-ci/gh-waiting-for-approval.webp)

The developer who creates the PR assigns the tech leader to review on GitHub.

![gh-add-reviewers](/content/docs/tutorials/github-ci/gh-add-reviewers.webp)

### Phase 3: TL approves on GitHub and migration issue is created in Bytebase

The assigned tech leader approves the PR, and another workflow `bytebase-upsert-migration.yml` is triggered.

![gh-waiting-for-check](/content/docs/tutorials/github-ci/gh-waiting-for-check.webp)

It checks the SQL files named like `**.up.sql` within the pull request and creates a rollout issue in Bytebase.

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

Go to Bytebase and view the created issue, which consists of two tasks corresponding to the presence of two `**.up.sql` files in the PR.

![bb-issue-user-post](/content/docs/tutorials/github-ci/bb-issue-user-post.webp)

You may notice there is an approval flow attached to the created issue, that's because we set up a default [custom approval flow for DDL](/docs/administration/custom-approval/).

![bb-custom-approval](/content/docs/tutorials/github-ci/bb-custom-approval.webp)

### Phase 4: Migration completed and PR is mergable on GitHub

After the DBA approves and rolls out the migrations, the issue status will become `Done`.

![bb-issue-done](/content/docs/tutorials/github-ci/bb-issue-done.webp)

Go back to GitHub, click **Details** for the failed `bytebase-check-migration-status.yml` workflow, and then click **Re-run all jobs**.

![gh-pr2-blocked](/content/docs/tutorials/github-ci/gh-pr2-blocked.webp)

![gh-re-run](/content/docs/tutorials/github-ci/gh-re-run.webp)

It checks the migration status in Bytebase and return `pass` if it's `Done`, indicating the database migration has been completed. The PR is now ready to be merged, which means the application code is ready to be deployed.

![gh-re-run-pass](/content/docs/tutorials/github-ci/gh-re-run-pass.webp)

![gh-all-pass-ready-merge](/content/docs/tutorials/github-ci/gh-all-pass-ready-merge.webp)

## Summary

Keep in mind that workflows can be tuned according to your organization's needs:

1. You can attach the workflow to different branches depending on your branching strategy (e.g. trunk-based or not).

1. You can use different migration file formats and different migration file structures.

1. You can determine when to create the migration issue, upon PR approval or creation.

Whatever workflow you choose, with the help of GitHub Actions and Bytebase API, you can now keep
your migration scripts in the repository, let the migration scripts go through the same code review
process and automate the schema migration deployment.
