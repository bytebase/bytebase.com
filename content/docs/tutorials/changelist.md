---
title: Steamline Database Schema Changes with Changelist
author: Ningjing
published_at: 2024/01/23 18:00
tags: Tutorial
integrations: General
level: Intermediate
estimated_time: '15 mins'
description: This tutorial will instruct you on how to use Bytebase Changelist to generate an issue that compiles all necessary schema changes sequentially.
---

This tutorial will instruct you on how to use Bytebase Changelist to generate an issue that compiles all necessary schema changes sequentially. It covers three key types: change history, branch, and raw SQL.

## Step 1 - Run via Docker

1. Install and start [Docker](https://www.docker.com/).
1. Open Terminal to run the command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

   When the Terminal shows the following message, the execution is successful.

   <IncludeBlock url="/docs/get-started/install/terminal-startup-output-success"></IncludeBlock>

   Now you have Bytebase running in Docker.

   ![dk-bb-running](/content/docs/tutorials/changelist/dk-bb-running.webp)

1. Open Bytebase in [localhost:8080](http://localhost:8080/), fill in the fields and click **Create admin account**. You'll be redirected to the workspace.

   ![bb-register](/content/docs/tutorials/changelist/bb-register.webp)

1. Follow the **Quikstart** guide on the bottom to click around or dismiss it by now. You can click your avatar on top right and click **Quickstart** on the dropdown menu to reopen it later.

   ![bb-first-workspace](/content/docs/tutorials/changelist/bb-first-workspace.webp)

## Step 2 - Create a Schema Change

1. Click **Select Project** on the top left, and choose `Sample Project`.
1. Check `hr_test` and click **Edit Schema**.
    ![bb-proj-db-test](/content/docs/tutorials/changelist/bb-proj-db-test.webp)
1. Via Schema Editor, add a new column to table `employee`:
   - **Name**: `type`
   - **Type**: `text`
   - **Default**: `contract`
   - **Not Null**: checked
  Click **Preview issue**.
    ![bb-prod-edit-schema-type](/content/docs/tutorials/changelist/bb-prod-edit-schema-type.webp)
1. You'll be redirected to an issue preview, click **Create**, an issue will be created automatically. After automatic checks, the issue will be in `Done` state which means the schema change has been applied to `Test` environment.
    ![bb-issue-done-test-type](/content/docs/tutorials/changelist/bb-issue-done-test-type.webp)

1. Click **View change** on the issue, or click **Change History** on the left sidebar and choose. You'll see the schema change diff.
    ![bb-issue-diff-type-test](/content/docs/tutorials/changelist/bb-issue-diff-type-test.webp)

## Step 3 - Create a Branch

1. Within project `Sample Project`, click **Branches** on the left sidebar, and click **+ New Branch**. Give it a **Name**, and choose `Baseline version`, `Prod` and `hr_prod` as **Source**. Click **Create**.

    ![bb-branch-create](/content/docs/tutorials/changelist/bb-branch-create.webp)

1. You'll be redirected to the branch page, click **Edit**, and add a new column to table `employee`:
   - **Name**: `nickname`
   - **Type**: `text`
   - **Default**: empty string
   - **Not Null**: checked
    Click **Save**.
    ![bb-branch-feature-nickname](/content/docs/tutorials/changelist/bb-branch-feature-nickname.webp)

## Step 4 - Create a Changelist

1. Within the project `Sample Project`, click **Changelists** on the left sidebar, and click **+ New Changelist**. Give it a **Name**, and click `Add`. A changelist will be created.

1. Within the changelist, click **+** to add changes.

    ![bb-changelist-empty](/content/docs/tutorials/changelist/bb-changelist-empty.webp)

1. There're three types of change sources: 1-Change History 2-Branch 3-Raw SQL.

    ![bb-change-source](/content/docs/tutorials/changelist/bb-change-source.webp)

1. You have already prepared two in the previous steps. Let's add them to the list along with another of raw SQL.

    ```sql
    ALTER TABLE "public"."employee"
    ADD COLUMN "city" text NOT NULL DEFAULT '';
    ```
    Reorder them like this.

    ![bb-changelist-3](/content/docs/tutorials/changelist/bb-changelist-3.webp)

1. After clicking **Apply to databases**, choose `hr_test` and click **Next**. You'll be redirected to the issue page. These changes are listed as tasks. Click **Create** to apply them to `Prod` environment. These tasks will be executed in order. If any of them fails, the rest will be blocked.

    ![bb-changelist-issue-3-tasks](/content/docs/tutorials/changelist/bb-changelist-issue-3-tasks.webp)

## Summary

Now that you've learned how to effectively manage database schema changes using Bytebase Changelist, you can leverage this along with Bytebase's other features to streamline your database development process.