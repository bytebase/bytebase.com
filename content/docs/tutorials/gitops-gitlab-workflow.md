---
title: Database GitOps with GitLab CI
author: Adela
updated_at: 2025/05/12 18:00
tags: Tutorial
integrations: GitLab
category: 'Database CI/CD (GitOps)'
level: Advanced
estimated_time: '40 mins'
description: 'Learn the new GitOps workflow for database release with Bytebase.'
---

This is part of our database GitOps series with Bytebase:

- [Database GitOps with GitHub Actions](/docs/tutorials/gitops-github-workflow)
- [Database GitOps with Azure DevOps Pipeline](/docs/tutorials/gitops-azure-devops-workflow)
- Database GitOps with GitLab CI (this one)
- [Database GitOps with Bitbucket Pipelines](/docs/tutorials/gitops-bitbucket-workflow)

---

This tutorial shows you how to build an database GitOps workflow using GitLab CI and Bytebase API. You'll learn to create a streamlined database release workflow where you can:

- Submit schema migrations through GitLab
- Automatically run SQL reviews on merge requests
- Auto-create and deploy Bytebase releases when merging to `main`

While we use GitLab CI in this guide, you can apply these concepts to other CI platforms like GitHub Actions, Bitbucket Pipelines, or Azure DevOps using the Bytebase API.

<HintBlock type="info">

While we use PostgreSQL with GitLab CI in this guide, you can apply these concepts to other SQL or NoSQL databases with any CI platforms like GitHub Actions, Bitbucket Pipelines, or Azure DevOps using the Bytebase API.

</HintBlock>

## Repository

https://gitlab.com/bytebase-sample/gitops-example

## Prerequisites

- [Docker](https://www.docker.com/) installed
- An [ngrok](https://ngrok.com/) account

## Automatic Rollout across environments

### Step 1 - Start Bytebase with ngrok

<IncludeBlock url="/docs/get-started/install/vcs-with-ngrok"></IncludeBlock>

### Step 2 - Create Service Account

<IncludeBlock url="/docs/share/tutorials/create-service-account-gitops"></IncludeBlock>

### Step 3 - Configure SQL Review in Bytebase

<IncludeBlock url="/docs/share/tutorials/config-sql-review"></IncludeBlock>

_Note: Usually we enable SQL review for `Prod` environment as above. In this demo, we would switch to enable it for `Test` to fit the following GitLab CI workflow._

### Step 4 - Copy the Example Repository and Configure Variables

1. Create a new repository and copy the configuration files from [https://gitlab.com/bytebase-sample/gitops-example](https://gitlab.com/bytebase-sample/gitops-example). There are two ymls in this repository:

   - `.gitlab-ci.yml`: The CI pipeline for the repository which includes the SQL review and release creation.
   - `bytebase-review.yml`: [Lint the SQL](/docs/sql-review/overview/) migration files after the MR is created.
   - `bytebase-release.yml`: Create a release in Bytebase after the MR is merged to the `main` branch.

1. Go into `bytebase-review.yml` and `bytebase-release.yml`. In the `env` section, replace the variable values with your own and commit the changes.

   - **BYTEBASE_URL**: your ngrok url
   - **BYTEBASE_SERVICE_ACCOUNT**: `api-example@service.bytebase.com` (the service account you created in the previous step)
   - **BYTEBASE_SERVICE_ACCOUNT_SECRET**: the password of the service account

### Step 5 - Create the migration files

To create migration files to trigger release creation, the files have to match the following pattern:

- A migration file should start with digits, which is also its version. e.g. `202505121650_create_table_t1.sql`.
- A migration file may end with `ddl` or `dml` to indicate its change type. If it doesn't end with any of the two, its change type is DDL by default.

1. Within your repository, create the following migration files under `migration` directory:

   - 202505121650_create_table_t1.sql

   ```sql
   CREATE TABLE t1 (
    id SERIAL PRIMARY KEY,
    name TEXT
   );
   ```

1. Commit to a new branch and create a merge request, the `sql-review` pipeline will be triggered. There will be a warning in the SQL review result.

   ![gl-sql-review-warning](/content/docs/tutorials/gitops-gitlab-workflow/gl-sql-review-warning.webp)

1. According to the SQL review result, you can do some changes to the SQL files and push to the branch. Then you should see the SQL review has passed. There are no warnings in the SQL review result.

   ```sql
    CREATE TABLE t1 (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
   );
   ```

1. When the SQL review is passed, you can merge the merge request. The `release` pipeline will be triggered to create a **release** in Bytebase and then roll out automatically.

1. Click into the pipelines, you can see the release pipeline is triggered and passed. Click the number of the pipeline, you can see the stages.

   ![gl-pipelines](/content/docs/tutorials/gitops-gitlab-workflow/gl-pipelines.webp)

   ![gl-pipelines-stages](/content/docs/tutorials/gitops-gitlab-workflow/gl-pipelines-stages.webp)

1. If you click the `deploy-to-test` and expand the logs, you can follow the links to Bytebase.

   ![bb-rollout](/content/docs/tutorials/gitops-gitlab-workflow/bb-rollout.webp)

## Summary

Now you have learned how to database GitOps with GitLab CI. If you want to trigger a release creation with other git providers (e.g. GitHub, Bitbucket, Azure DevOps), you may customize the workflow file.
