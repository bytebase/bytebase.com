---
title: Database GitOps with Azure DevOps Pipeline
author: Adela
updated_at: 2025/03/28 18:00
tags: Tutorial
integrations: 'API, Azure DevOps'
category: 'Database CI/CD (GitOps)'
level: Advanced
estimated_time: '40 mins'
description: 'Learn the new GitOps workflow for database release with Bytebase.'
---

This is part of our database GitOps series with Bytebase:

- [Database GitOps with GitHub Actions](/docs/tutorials/gitops-github-workflow)
- Database GitOps with Azure DevOps Pipeline (this one)
- [Database GitOps with GitLab CI](/docs/tutorials/gitops-gitlab-workflow)

---

This tutorial shows you how to build a database GitOps workflow using Azure DevOps Pipeline and Bytebase API. You'll learn to create a streamlined database release workflow where you can:

- Submit SQL migrations through Azure DevOps
- Automatically run SQL reviews on pull requests
- Auto-create and deploy Bytebase releases when merging to `main`

While we use Azure DevOps Pipeline in this guide, you can apply these concepts to other CI platforms like GitHub Actions, GitLab CI, or Bitbucket Pipelines using the Bytebase API.

<HintBlock type="info">

This tutorial code repository is at [https://dev.azure.com/bytebase-hq/\_git/bytebase-example](https://dev.azure.com/bytebase-hq/_git/bytebase-example)

</HintBlock>

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

### Step 4 - Copy from the Example Repository and Configure Variables

1. Create a new project. Copy `pipelines` folder from [https://dev.azure.com/bytebase-hq/\_git/bytebase-example](https://dev.azure.com/bytebase-hq/_git/bytebase-example). There are two workflows in this repository:

   - `pipelines/check-release.yml`: [Lint the SQL](/docs/sql-review/overview/) migration files after the PR is created.
   - `pipelines/rollout-release.yml`: Create a release in Bytebase after the PR is merged to the `main` branch.

1. Go into `pipelines/check-release.yml` and `pipelines/rollout-release.yml`. In the `env` section, replace the variable values with your own and commit the changes.

   - **BYTEBASE_URL**: your ngrok url
   - **BYTEBASE_SERVICE_ACCOUNT**: `api-example@service.bytebase.com` (the service account you created in the previous step)
   - **BYTEBASE_PROJECT**: `projects/project-sample` (the sample project in the Bytebase)
   - **BYTEBASE_TARGETS**: `instances/test-sample-instance/databases/hr_test,instances/prod-sample-instance/databases/hr_prod` (the two default databases in the sample project)
   - **FILE_PATTERN**: `migrations/*.sql` (the pattern of the migration files)

1. Go to branch policy for `main` branch, add `check-release` as a required check. You don't need to add `rollout-release` as a required check because it will be triggered automatically when the PR is merged.

   ![ad-branch-policy](/content/docs/tutorials/gitops-azure-devops-workflow/ad-branch-policy.webp)

   ![ad-policy-build](/content/docs/tutorials/gitops-azure-devops-workflow/ad-policy-build.webp)

### Step 5 - Create the migration files

To create migration files to trigger release creation, the files have to match the following pattern:

- A migration file should start with digits, which is also its version. e.g. `202503131500_create_table_t1_ddl.sql`.
- A migration file may end with 'ddl' or 'dml' to indicate its change type. If it doesn't end with any of the two, its change type is DDL by default.

1. Within your forked repository, create the following migration files under `migrations` directory:

   - 202503131500_create_table_t1_ddl.sql

   ```sql
   CREATE TABLE t1 (
    id SERIAL PRIMARY KEY,
    name TEXT
   );
   ```

1. Commit to a new branch and create a pull request, the `check-release` workflow will be triggered. There will be a warning in the SQL review result.

   ![ad-check-pass](/content/docs/tutorials/gitops-azure-devops-workflow/ad-check-pass.webp)

   ![ad-check-warning](/content/docs/tutorials/gitops-azure-devops-workflow/ad-check-warning.webp)

1. According to the SQL review result, you can do some changes to the SQL files and push to the branch. Then you should see the SQL review has passed. There are no warnings in the SQL review result.

   ```sql
    CREATE TABLE t1 (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
   );
   ```

   ![ad-check-no-warning](/content/docs/tutorials/gitops-azure-devops-workflow/ad-check-no-warning.webp)

1. When the SQL review is passed, you can merge the pull request. The `rollout-release` workflow will be triggered to create a **release** in Bytebase and then roll out automatically.

   ![ad-rollout](/content/docs/tutorials/gitops-azure-devops-workflow/ad-rollout.webp)

1. You need to permit the release to be deployed to the production environment the first time.

   ![ad-rollout-permit](/content/docs/tutorials/gitops-azure-devops-workflow/ad-rollout-permit.webp)
   ![ad-rollout-prod](/content/docs/tutorials/gitops-azure-devops-workflow/ad-rollout-prod.webp)

1. If you click the test stage and expand the different sections, you can follow the links to Bytebase.

   ![bb-rollout-preview](/content/docs/tutorials/gitops-azure-devops-workflow/bb-rollout-preview.webp)

1. You may customize the workflow file to trigger deployment manually according to your needs.

## Summary

Now you have learned how to database GitOps with Azure DevOps Pipeline. If you want to trigger a release creation with other git providers (e.g. GitLab, Bitbucket, [GitHub Actions](/docs/tutorials/gitops-github-workflow)), you may customize the workflow file.
