---
title: Database GitOps with Bitbucket Pipelines
author: Adela
updated_at: 2025/05/14 18:00
tags: Tutorial
integrations: Bitbucket
category: 'Database CI/CD (GitOps)'
level: Advanced
estimated_time: '40 mins'
featured: true
description: 'Learn the new GitOps workflow for database release with Bytebase.'
---

This is part of our database GitOps series with Bytebase:

- [Database GitOps with GitHub Actions](/docs/tutorials/gitops-github-workflow)
- [Database GitOps with Azure DevOps Pipeline](/docs/tutorials/gitops-azure-devops-workflow)
- [Database GitOps with GitLab CI](/docs/tutorials/gitops-gitlab-workflow)
- Database GitOps with Bitbucket Pipelines (this one)

---

This tutorial shows you how to build an database GitOps workflow using Bitbucket Pipelines and Bytebase API. You'll learn to create a streamlined database release workflow where you can:

- Submit schema migrations through Bitbucket
- Automatically run SQL reviews on pull requests
- Auto-create and deploy Bytebase releases when merging to `main`

While we use Bitbucket Pipelines in this guide, you can apply these concepts to other CI platforms like GitHub Actions, GitLab CI, or Azure DevOps using the Bytebase API.

<HintBlock type="info">

While we use PostgreSQL with Bitbucket Pipelines in this guide, you can apply these concepts to other SQL or NoSQL databases with any CI platforms like GitHub Actions, GitLab CI, or Azure DevOps using the Bytebase API.

</HintBlock>

## Repository

https://bitbucket.org/p0nyyy/cicd/

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

1. Create a new repository and copy the configuration file `bitbucket-pipelines.yml` from [https://bitbucket.org/p0nyyy/cicd/](https://bitbucket.org/p0nyyy/cicd/). It includes sql review and release creation.

1. Go into `bitbucket-pipelines.yml`, replace the variable in all 3 steps the values with your own and commit the changes.

   - **BYTEBASE_URL**: your ngrok url
   - **BYTEBASE_SERVICE_ACCOUNT**: `api-example@service.bytebase.com` (the service account you created in the previous step)
   - **BYTEBASE_SERVICE_ACCOUNT_SECRET**: the password of the service account

### Step 5 - Configure in Bitbucket

Before creating the migration files, you need to configure the environment in Bitbucket to match the environment in Bytebase.

1. Go to **Repository settings > Pipelines > Deployments**. Rename the environment name to `Test`-> `test` and `Production`-> `prod`.

   ![bitb-deployments](/content/docs/tutorials/gitops-bitbucket-workflow/bitb-deployments.webp)

1. Go to **Pipelines** to enable it for the pull request to the main branch. Without this the pipeline will not be triggered.

   ![bitb-enable-pipelines](/content/docs/tutorials/gitops-bitbucket-workflow/bitb-enable-pipelines.webp)

### Step 6 - Create the migration files

To create migration files to trigger release creation, the files have to match the following pattern:

- A migration file should start with digits, which is also its version. e.g. `202505141650_create_table_t1.sql`.
- A migration file may end with `ddl` or `dml` to indicate its change type. If it doesn't end with any of the two, its change type is DDL by default.

1. Within your repository, create the following migration files under `migration` directory:

   - 202505141650_create_table_t1.sql

   ```sql
   CREATE TABLE t1 (
    id SERIAL PRIMARY KEY,
    name TEXT
   );
   ```

1. Commit to a new branch and create a pull request, the `sql-review` pipeline will be triggered. There will be a warning in the SQL review result.

   ![bitb-notnull](/content/docs/tutorials/gitops-bitbucket-workflow/bitb-notnull.webp)

1. According to the SQL review result, you can do some changes to the SQL files and push to the branch. Then you should see the SQL review has passed. There are no warnings in the SQL review result.

   ```sql
    CREATE TABLE t1 (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
   );
   ```

1. When the SQL review is passed, you can merge the pull request. The `release` pipeline will be triggered to create a **release** in Bytebase and then roll out automatically on test but waiting for approval on prod.

1. Click into the pipelines and choose the merge pipeline, you can see release is created in test environment but waiting for approval on prod.

   ![bitb-waiting-prod](/content/docs/tutorials/gitops-bitbucket-workflow/bitb-waiting-prod.webp)

1. If you expand the log for `bytebase-action rollout ...`, you can follow the rollout link to Bytebase.

   ![bb-rollout-test](/content/docs/tutorials/gitops-bitbucket-workflow/bb-rollout-test.webp)

1. Click **Deploy** on deploy-to-prod stage in Bitbucket, the release will be deployed to prod environment.

   ![bitb-deploy-prod](/content/docs/tutorials/gitops-bitbucket-workflow/bitb-deploy-prod.webp)

   ![bb-rollout-prod](/content/docs/tutorials/gitops-bitbucket-workflow/bb-rollout-prod.webp)

## Summary

Now you have learned how to database GitOps with Bitbucket Pipelines. If you want to trigger a release creation with other git providers (e.g. GitHub, GitLab, Azure DevOps), you may customize the workflow file.
