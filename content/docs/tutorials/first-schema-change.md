---
title: Your First Schema Change in 5 Minutes
author: Ningjing
tags: Tutorial
published_at: 2024/1/16 11:15
integrations: General
level: Beginner
estimated_time: '5 mins'
pinned: true
description: How to perform your first schema change in 5 minutes via Bytebase.
---

In this tutorial, you'll use the sample databases Bytebase provides by default to get familiar with the product in the quickest way.

## Step 1 - Run via Docker

1. Install and start [Docker](https://www.docker.com/).
1. Open Terminal to run the command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

   When the Terminal shows the following message, the execution is successful.

   <IncludeBlock url="/docs/get-started/install/terminal-startup-output-success"></IncludeBlock>

   Now you have Bytebase running in Docker.

   ![dk-bb-running](/content/docs/tutorials/first-schema-change/dk-bb-running.webp)

1. Open Bytebase in [localhost:8080](http://localhost:8080/), fill in the fields and click **Create admin account**. You'll be redirected to the workspace.

   ![bb-register](/content/docs/tutorials/first-schema-change/bb-register.webp)

1. Follow the **Quikstart** guide on the bottom to click around or dismiss it by now. You can click your avatar on top right and click **Quickstart** on the dropdown menu to reopen it later.

   ![bb-first-workspace](/content/docs/tutorials/first-schema-change/bb-first-workspace.webp)

## Step 2 - One Issue with Two Stages

1. Click **My Issues** on the left sidebar, and click the issue `SAM-101` which is created by default.

   ![bb-my-issues](/content/docs/tutorials/first-schema-change/bb-my-issues.webp)

1. The issue is `waiting to rollout`. There's a pipeline consisting of two stages:

   1. **Test Stage**: apply to database `hr_test` on `Test Sample instance`
   2. **Prod Stage**: apply to database `hr_prod` on `Prod Sample instance`

   `Test` stage is `active` by default.

   ![bb-issue-test](/content/docs/tutorials/first-schema-change/bb-issue-test.webp)

1. Click **Prod Stage** to switch to it, and you will see the two stages share the same SQL but to different databases. You may also notice there's a warning sign for SQL review on the **Prod** stage. That's because when the issue is created, Bytebase will run task checks automatically. SQL review is one of them.

   ![bb-issue-prod](/content/docs/tutorials/first-schema-change/bb-issue-prod.webp)

1. Click the warning sign to see the details. If you wonder why only **Prod Stage** has the warning sign, it's because by default SQL Review is only configured for `Prod` environment. You can click the **Settings** (gear) on the top right, and click **Security & Policy** > **SQL Review** to have a look.

   ![bb-sql-review-not-null](/content/docs/tutorials/first-schema-change/bb-sql-review-not-null.webp)

## Step 3 - Roll out on Test Stage

1. Switch back to **Test Stage** and click **Rollout**. Click **Rollout** on the confirmation dialog.

   ![bb-test-rollout](/content/docs/tutorials/first-schema-change/bb-test-rollout.webp)

1. When the SQL is applied, there will be a checkmark on the **Test Stage**. Click **View change** and you'll see the diff.

   ![bb-issue-test-done](/content/docs/tutorials/first-schema-change/bb-issue-test-done.webp)

   ![issue-snapshot-diff](/content/docs/tutorials/first-schema-change/issue-snapshot-diff.webp)

## Step 4 - Roll out on Prod Stage

There are two ways to roll out on **Prod Stage** regarding the SQL review result.

1. If you are confident with the SQL, you can click **Rollout** directly. Check the **Rollout anyway**, and click **Rollout** on the confirmation dialog.

   ![bb-issue-prod-anyway](/content/docs/tutorials/first-schema-change/bb-issue-prod-anyway.webp)

1. Another way is to edit the SQL. Click **Edit** on top of the SQL, and add the `NOT NULL`. It will look like this:

   ```sql
   ALTER TABLE employee ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '';
   ```

   Click **Save**, the checks will be run again. This time the SQL review will pass and it will roll out automatically. The issue will become `Done` as well.

   ![bb-issue-done](/content/docs/tutorials/first-schema-change/bb-issue-done.webp)

   You may ask why it's rolling out automatically, it's because for **Community Plan**, the rollout policy is automatic if the SQL review passes. You may go to **Environments** to check.

   ![bb-env-automatic](/content/docs/tutorials/first-schema-change/bb-env-automatic.webp)

## Next Step

Now you have successfully performed your first schema change, the core workflow in Bytebase. If you
want to try manual review during rollout, please continue to [Deploy Schema Migration with Rollout Policy](/docs/tutorials/deploy-schema-migration/).
