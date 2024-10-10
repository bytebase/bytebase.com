---
title: Your First Schema Change in 5 Minutes
author: Ningjing
tags: Tutorial
updated_at: 2024/10/10 20:00
integrations: General
level: Beginner
estimated_time: '5 mins'
pinned: true
description: How to perform your first schema change in 5 minutes via Bytebase.
---

In this tutorial, you'll use the default sample databases to get familiar with the product in the quickest way.

## Step 1 - Run via Docker

1. Install and start [Docker](https://www.docker.com/).
1. Open Terminal to run the command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

   Bytebase starts successfully if you see following message.

   <IncludeBlock url="/docs/get-started/install/terminal-startup-output-success"></IncludeBlock>

   Now you have Bytebase running in Docker.

   ![dk-bb-running](/content/docs/tutorials/first-schema-change/dk-bb-running.webp)

1. Open Bytebase in [localhost:8080](http://localhost:8080/), fill in the fields and click **Create admin account**. You'll be redirected to Workspace.
   ![account](/content/docs/tutorials/first-schema-change/account.webp)

1. You can click your avatar on top right and **Quickstart** from the dropdown menu.
   ![quickstart](/content/docs/tutorials/first-schema-change/quickstart.webp)

## Step 2 - One Issue with Two Stages

1. Click **My Issues** on the left sidebar, and click the issue `SAM-101` which is created by default.
   ![issue](/content/docs/tutorials/first-schema-change/issue.webp)

1. The issue is `waiting to rollout`. There's a pipeline consisting of two stages:

   1. **Test Stage**: apply to database `hr_test` on `Test Sample instance`
   2. **Prod Stage**: apply to database `hr_prod` on `Prod Sample instance`

   `Test` stage is `active` by default.

   ![issue-test](/content/docs/tutorials/first-schema-change/issue-test.webp)

1. Click **Prod Stage** to switch to it, and you will see the two stages share the same SQL but to different databases. You may also notice there's a warning sign for SQL review on the `Prod` stage. That's because when the issue is created, Bytebase will run task checks automatically.
   ![issue-prod](/content/docs/tutorials/first-schema-change/issue-prod.webp)

1. Click the warning sign to see the details. If you wonder why only `Prod` stage has the warning sign, it's because by default SQL Review is only configured for `Prod` environment.

   ![sql-review-not-null](/content/docs/tutorials/first-schema-change/sql-review-not-null.webp)

## Step 3 - Roll out on Test Stage

1. Switch back to **Test Stage** and click **Rollout**. Click **Rollout** on the confirmation dialog.

1. When the SQL is applied, there will be a checkmark on the **Test Stage**. Click **View change** and you'll see the change history diff.
   ![view-change-test](/content/docs/tutorials/first-schema-change/view-change-test.webp)

   ![issue-snapshot-diff](/content/docs/tutorials/first-schema-change/issue-snapshot-diff.webp)

## Step 4 - Roll out on Prod Stage

There are two ways to roll out on **Prod Stage** regarding the SQL review result.

1. If you are confident with the SQL, you can click **Rollout** directly. Tick **Rollout anyway**, and click **Rollout** on the confirmation dialog.
   ![prod-anyway](/content/docs/tutorials/first-schema-change/prod-anyway.webp)

1. Another way is to edit SQL. Click **Edit** on top of SQL block, add `NOT NULL`. It will be like:

   ```sql
   ALTER TABLE employee ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '';
   ```

   Click **Save**, the checks will be run again. This time the SQL review will pass. The issue will roll out and become `Done`.

   ![issue-done](/content/docs/tutorials/first-schema-change/issue-done.webp)

   You may go to **Environments** to alter whether it rolls out automatically.

   ![bb-env-automatic](/content/docs/tutorials/first-schema-change/bb-env-automatic.webp)

## Next Step

Now you have successfully performed your first schema change, the core workflow in Bytebase. If you
want to try manual review during rollout, please continue to [Deploy Schema Migration with Rollout Policy](/docs/tutorials/deploy-schema-migration/).
