---
title: Database Release CI/CD with GitHub Action
author: Ningjing
updated_at: 2025/02/17 18:00
tags: Tutorial
integrations: API, GitHub
level: Advanced
estimated_time: '40 mins'
description: 'Learn how to automate database release CI/CD using GitHub Actions and Bytebase API.'
---

This tutorial demonstrates how to automate database release CI/CD using GitHub Actions and Bytebase API. You'll learn how to:

- Set up a workflow where developers can submit SQL migration files to GitHub
- Implement automated SQL review checks for pull requests
- Automatically create releases in Bytebase after merging to the `main` branch and roll out to the database
- Manually rollout the release to the database by stage (for **Pro or Enterprise plan**)

While this guide uses GitHub Actions, the same principles can be applied to other CI/CD platforms like GitLab CI, Bitbucket Pipelines, or Azure DevOps using the Bytebase API.

<HintBlock type="info">

This tutorial code repository is at [https://github.com/bytebase/release-cicd-workflows-example

](https://github.com/bytebase/release-cicd-workflows-example

)

</HintBlock>

## Prerequisites

- [Docker](https://www.docker.com/) installed
- An [ngrok](https://ngrok.com/) account

## Step 1 - Start Bytebase with ngrok

<IncludeBlock url="/docs/get-started/install/vcs-with-ngrok"></IncludeBlock>

## Step 2 - Create Service Account

<IncludeBlock url="/docs/share/tutorials/create-service-account"></IncludeBlock>

If you have **Enterprise Plan**, you can create a **Custom Role** for the service account which require fewer permissions, and assign this role instead of DBA:

- plans.create
- plans.get
- plans.preview
- releases.check
- releases.create
- releases.get
- rollouts.create
- rollouts.get
- rollouts.list
- sheets.create
- sheets.get
- taskRuns.create
- planCheckRuns.list
- planCheckRuns.run

## Step 3 - Fork the Example Repository and Configure Variables

1. Go to the [bytebase-release-cicd-workflows-example](https://github.com/bytebase/release-cicd-workflows-example

) repository and fork it. There are two workflows in this repository:

- `.github/workflows/bytebase-check-release.yml`: Check the release SQL syntax when there's a pull request.
- `.github/workflows/bytebase-release-cicd.yml`: Create a release in Bytebase when there's a merge to the `main` branch.

1. Go into `.github/workflows/bytebase-release-cicd.yml` and `.github/workflows/bytebase-check-release.yml`. In the `env` section, replace the variable values with your own and commit the changes.

   - **BYTEBASE_URL**: your ngrok url
   - **BYTEBASE_PROJECT**: `projects/project-sample` (the sample project in the Bytebase)
   - **BYTEBASE_SERVICE_ACCOUNT**: `api-example@service.bytebase.com` (the service account you created in the previous step)
   - **BYTEBASE_TARGETS**: `instances/test-sample-instance/databases/hr_test,instances/prod-sample-instance/databases/hr_prod` (the two default databases in the sample project)

1. You may paste the password of the service account you created in the previous step directly after **service-secret** or replace **service-secret** value as `${{secrets.BYTEBASE_PASSWORD}}`. Go to **Settings > Secrets and Variables > Actions**, click **New repository secret**, and add **BYTEBASE_PASSWORD**.

1. Go to **Actions** tab, enable actions workflow run.

## Step 4 - Create the Release and Roll out

To create migration files to trigger release creation, the files have to match the following pattern:

- A migration file should start with digits, which is also its version. e.g. `20250101001_create_table_ddl.sql`.
- A migration file may end with 'ddl' or 'dml' to indicate its change type. If it doesn't end with any of the two, its change type is DDL by default.

1. Within your forked repository, create the following migration files under `migrations` directory:

   - 20250101001_create_table_t1_ddl.sql

   ```sql
   CREATE TABLE t1 (
     id INT
   );
   ```

   - 20250101002_drop_t2_create_table_t2_ddl.sql

   ```sql
   DROP TABLE t1;
   CREATE TABLE t2 (
     id INT
   );
   ```

1. Commit to a new branch and create a pull request, the `bytebase-check-release` workflow will be triggered.

   ![gh-sql-review-no-pass](/content/docs/tutorials/github-release-cicd-workflow/gh-sql-review-no-pass.webp)

   You got this SQL review is because by default, there is a SQL review configured on `Prod` environment in Bytebase.

   ![bb-sql-review](/content/docs/tutorials/github-release-cicd-workflow/bb-sql-review.webp)

1. According to the SQL review result, you can do some changes to the SQL files and push to the branch. Then you should see the SQL review has passed.

   ```sql
   CREATE TABLE t1(id INT PRIMARY KEY NOT NULL);
   ```

   ```sql
   ALTER TABLE t1 RENAME TO "t1_del";

   DROP TABLE "t1_del";

   CREATE TABLE t2(id INT PRIMARY KEY NOT NULL);
   ```

   ![gh-sql-review-pass](/content/docs/tutorials/github-release-cicd-workflow/gh-sql-review-pass.webp)

1. When the SQL review is passed, you can merge the pull request. The `bytebase-release-cicd` workflow will be triggered to create a **release** in Bytebase and then roll out automatically. Go to **Actions** tab, you can see the workflow run and pass.

   ![gh-cicd-release-pass](/content/docs/tutorials/github-release-cicd-workflow/gh-cicd-release-pass.webp)

1. If you click the link in the **Create release** section, you can see the release is created in Bytebase.

   ![bb-release](/content/docs/tutorials/github-release-cicd-workflow/bb-release.webp)

1. If you click the link in the **Rollout** section, you can see the rollout is applied to the databases.

   ![bb-rollout](/content/docs/tutorials/github-release-cicd-workflow/bb-rollout.webp)

## Breakdown of the GitHub Action Workflow

1. Check out your repo and log in to Bytebase to gain the access token.

   ```yaml
   - name: Checkout
     uses: actions/checkout@v4
   - name: Login to Bytebase
     id: login
     uses: bytebase/login-action@main
     with:
       bytebase-url: ${{ env.BYTEBASE_URL }}
       service-key: ${{ env.BYTEBASE_SERVICE_ACCOUNT }}
       service-secret: ${{ secrets.BYTEBASE_PASSWORD }}
   ```

1. The **create_release** step scans the files matching the pattern and collects them into a bundle. Note that these files should also obey the naming scheme mentioned above.

   The bundle is first sent to check. If the check passes, a release is then created on Bytebase.

   ```yaml
   - name: Create release
     id: create_release
     uses: bytebase/create-release-action@v1
     with:
       url: ${{ env.BYTEBASE_URL }}
       token: ${{ steps.login.outputs.token }}
       project: ${{ env.BYTEBASE_PROJECT }}
       file-pattern: ${{ env.FILE_PATTERN }}
       check-release: 'FAIL_ON_ERROR'
       targets: ${{ env.BYTEBASE_TARGETS }}
       validate-only: 'false'
   ```

1. Create a rollout and wait for completion.

   ```yaml
   - name: Create plan
     id: create_plan
     uses: bytebase/create-plan-from-release-action@v1
     with:
       url: ${{ env.BYTEBASE_URL }}
       token: ${{ steps.login.outputs.token }}
       project: ${{ env.BYTEBASE_PROJECT }}
       release: ${{ steps.create_release.outputs.release }}
       targets: ${{ env.BYTEBASE_TARGETS }}
       # 'FAIL_ON_ERROR' will fail the action if plan checks report errors.
       # Use 'SKIP' to skip the check.
       # Use 'FAIL_ON_WARNING' to fail if plan checks report warning.
       check-plan: 'FAIL_ON_ERROR'
       validate-only: 'false'

   - name: Rollout
     id: rollout
     uses: bytebase/rollout-action@v1
     with:
       url: ${{ env.BYTEBASE_URL }}
       token: ${{ steps.login.outputs.token }}
       plan: ${{ steps.create_plan.outputs.plan }}
       # set target-stage to exit after the stage completes
       # target-stage: 'Test Stage'
   ```

   These are the steps:

   - create the plan from the release
   - check the plan
   - create the rollout
   - wait for the rollout to complete

   In the **create_plan** step, you can set check-plan to FAIL_ON_ERROR to fail the action if plan checks report errors. Use SKIP to skip plan checks. Use FAIL_ON_WARNING to fail the action if plan checks report warning.

   The rollout pipeline stages are created on demand in the **wait_rollout** step. You can use target-stage to early exit the step. When the target stage completes, it exits. If target-stage is not provided or not found, wait_rollout will wait until all stages complete. The target-stage is a stage title in the deployment config in the project setting.

1. You can also apply releases to databases on Bytebase UI. If you wish, you can set up an action to just create the release and manually roll out later.

   ![bb-manual-apply](/content/docs/tutorials/github-release-cicd-workflow/bb-manual-apply.webp)

## Step 5 - Manual Rollout for Pro or Enterprise Plan

If you have **Pro** or **Enterprise** plan, you can manually rollout the release to the database by stage.

1. Upgrade your Bytebase plan to **Pro** or **Enterprise** plan, assign the license to your instances.

1. Click **Environments** on the left sidebar, click **Prod** tab, set **Rollout Policy** as `Manual rollout by dedicated roles`.

1. Go to the `.github/workflows/bytebase-release-cicd.yml` file, uncomment the last line and commit the changes.

   ```yaml
   target-stage: 'Test Stage'
   ```

1. You can find the stage name in the **Deployment Config** under `Sample Project`.

   ![bb-deployment-config](/content/docs/tutorials/github-release-cicd-workflow/bb-deployment-config.webp)

1. Create a new branch with this file, and create a pull request. Merge it to the `main` branch.

   - 20250101003_create_table_t3_ddl.sql

   ```sql
       CREATE TABLE t3(id INT PRIMARY KEY NOT NULL);
   ```

1. Go to the **Actions** tab, you can see the workflow run and pass. Expand the **Rollout** section, the rollout is created and the stage is skipped.

   ![gh-rollout-skip](/content/docs/tutorials/github-release-cicd-workflow/gh-rollout-skip.webp)

1. Click the link in the **Rollout** section, you will go to the **Rollout Pipeline** in Bytebase.

   ![bb-manual-rollout](/content/docs/tutorials/github-release-cicd-workflow/bb-manual-rollout.webp)

1. Click the arrow button, and click **Confirm**. The **Prod Stage** will be created.

   ![bb-confirm-add](/content/docs/tutorials/github-release-cicd-workflow/bb-confirm-add.webp)

1. Click into the script and click **Run**. The script will be applied to the prod database.

   ![bb-prod-run](/content/docs/tutorials/github-release-cicd-workflow/bb-prod-run.webp)

1. Go back to the **Rollout Pipeline** page, you can see the **Prod Stage** is completed.

   ![bb-rollout-done](/content/docs/tutorials/github-release-cicd-workflow/bb-rollout-done.webp)

## Summary

Now you have learned how to create a release and then rollout to the database in Bytebase with GitHub Action. If you want to trigger a release creation with other git providers (e.g. GitLab, Bitbucket, Azure DevOps), you may customize the workflow file.
