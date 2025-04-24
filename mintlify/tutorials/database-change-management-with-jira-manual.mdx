---
title: Manual Database Change with Jira
author: Adela
updated_at: 2024/09/30 21:15
tags: Tutorial
level: Beginner
integrations: Jira
category: Integration
estimated_time: '30 mins'
description: Manage database changes using Jira and Bytebase manually.
---

Jira is a leading issue tracking product for software development teams, aiding in planning, tracking, and releasing great software. Teams may also want to adopt Jira for the database change management process.

However, a database change workflow also involves deploying and tracking those changes, and Jira doesn't
have such capability. By integrating Bytebase, you can achieve this goal.

Bytebase is an open-source database DevSecOps solution for Developer, Security, DBA, and Platform Engineering teams. The GitLab for database DevSecOps.

![manual-jira](/content/docs/tutorials/database-change-management-with-jira-manual/manual-jira.webp)

This is a 2-series tutorials:

- Manual Database Change with Jira (this one)
- [Automate Database Change with Jira](/docs/tutorials/database-change-management-with-jira-automated/)

## Prerequisites

- A Jira workspace
- A Bytebase instance

## Workflow Overview

### Setup

1. Prepare a Jira project: Create a `Database Change` issue type with custom fields **SQL**, **database**.
1. Prepare a corresponding Bytebase project and database.

### Change process

1. (Jira) Developer creates a Jira `Database Change` issue filling the **SQL**, **database**, and **description** fields.
1. (Jira -> Bytebase) DBA reviews the Jira issue and goes to Bytebase to create an issue with the developer supplied **SQL**, **database**, and **description**.
1. (Jira) DBA updates the Jira issue status to indicate the change is in progress.
1. (Bytbease) DBA goes to Bytebase to roll out the database change.
1. (Jira) DBA updates the Jira issue status to indicate the change has completed.

![manual-jira](/content/docs/tutorials/database-change-management-with-jira-manual/manual-jira.webp)

## Setup

### Step 1 (Jira): Configure database change issue and custom fields

1. Create a Jira project.
   ![jira-details](/content/docs/tutorials/database-change-management-with-jira-manual/jira-details.webp)

1. The default issue fields `Summary`,`Description` are not enough for us to track the database changes, so we need to have a new issue type `Database Change` and customize the fields accordingly.

1. Here's the screenshot of the customized type `Database Change`. We added three additional fields:

   - Database
   - SQL
   - Bytebase issue link

   ![jira-create-issue](/content/docs/tutorials/database-change-management-with-jira-manual/jira-create-issue.webp)

### Step 2 (Bytebase): Create a project and database in Bytebase

1. Start Bytebase via Docker and register an account which will be granted `Workspace Admin` role.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

1. Click **Projects** on the sidebar, and then click **New Project**.

   ![bb-create-proj-api](/content/docs/tutorials/database-change-management-with-jira-manual/bb-create-proj-api.webp)

1. Bytebase has embedded sample database instances `Prod Sample Instance` and `Test Sample Instance` for you to explore the product.

1. Go to the project, and then click **New DB**. Select `Test Sample Instance`, fill in the database name `demodb`, and click **Create**.

   ![bb-create-db](/content/docs/tutorials/database-change-management-with-jira-manual/bb-create-db.webp)

## Change process

### Step 1 (Jira): Create a database change issue

You act as a developer, now go to the Jira project to create a `Database Change` issue, fill in the fields and click **Create**. Here's the screenshot of the issue.

![jira-todo](/content/docs/tutorials/database-change-management-with-jira-manual/jira-todo.webp)

### Step 2 (Jira -> Bytebase): Review the Jira issue and create a corresponding Bytebase issue

1. You act as a DBA, now visit the Jira project, and open the `Database Change` issue just created.

   ![jira-todo](/content/docs/tutorials/database-change-management-with-jira-manual/jira-todo.webp)

   The Jira issue contains the following info:

   1. **Database**: `demodb`
   1. **SQL**: `CREATE TABLE t2024 (id INT, name TEXT);`
   1. **Description**: `Create a table t2024, first to demodb`

1. Visit Bytebase, and go to the Bytebase project, click **Database** on the sidebar, you'll see the database `demodb` just created. Select the database, and click **Edit Schema**.

   ![bb-proj-db-edit](/content/docs/tutorials/database-change-management-with-jira-manual/bb-proj-db-edit.webp)

1. You'll be redirected to **Schema Editor**. Click **Raw SQL** tab, paste the **SQL** content in Jira issue to the text area, and then click **Preview issue**. An issue will be previewed with SQL filled in. Fill in the issue **Description**, and then click **Create**.

   ![bb-schema-editor](/content/docs/tutorials/database-change-management-with-jira-manual/bb-schema-editor.webp)

### Step 3 (Jira): Paste the Bytebase issue URL and update the Jira issue status

Copy the Bytebase issue URL, and paste it to the **Bytebase issue link** field in Jira issue. Then update the Jira issue status to `In Progress`.

![jira-in-progress](/content/docs/tutorials/database-change-management-with-jira-manual/jira-in-progress.webp)

### Step 4 (Bytebase): Roll out the database change in Bytebase

1. Go to Bytebase to roll out the database change.

   ![bb-issue-jira-done](/content/docs/tutorials/database-change-management-with-jira-manual/bb-issue-jira-done.webp)

1. Once change is rolled out, Bytebase will record the change in the database **Change History**.

   ![bb-db-history](/content/docs/tutorials/database-change-management-with-jira-manual/bb-db-history.webp)

1. You can also click **View change** to view the change diff.

   ![bb-view-diff-jira](/content/docs/tutorials/database-change-management-with-jira-manual/bb-view-diff-jira.webp)

### Step 5 (Jira): Update Jira status to Done

Visit Jira issue and set the status to `Done`. The whole process is completed.

![jira-done](/content/docs/tutorials/database-change-management-with-jira-manual/jira-done.webp)

## Summary and next

In this tutorial, you have successfully set up a database change workflow with Jira and Bytebase.

- Jira takes care of the review process and the overall progress tracking.
- Bytebase takes care of the database change rollout and history tracking.

On the other hand, there are still manual steps to move the fields' information and update the status
in Jira and Bytebase. In the [next tutorial](/docs/tutorials/database-change-management-with-jira-automated/), we will show you how to automate those by leveraging Jira/Bytebase webhook and API.
