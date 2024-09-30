---
title: Manage Database Change with Jira
author: Ningjing
updated_at: 2024/09/30 21:15
tags: Tutorial
level: Intermediate
integrations: Jira
estimated_time: '30 mins'
description: Manage database changes using Jira and Bytebase.
---

Jira is a leading issue tracking product for software development teams, aiding in planning, tracking, and releasing great software. Teams may also want to adopt Jira for the database change management process.

However, a database change workflow also involves deploying and tracking those changes, and Jira doesn't
have such capability. By integrating Bytebase, an open-source database DevOps tool, you can achieve this goal.

This tutorial will guide you through managing database changes using Jira and Bytebase.

## Prerequisites

- A Jira workspace
- A Bytebase instance

## Workflow Overview

### Setup

1. Prepare a Jira project.
1. Create a `database change` issue type with custom fields **SQL**, **database**.
1. Prepare a corresponding Bytebase project and database.

### Change process

1. Developer creates a Jira `database change` issue filling the **SQL**, **database**, and **description** fields.
1. DBA reviews the Jira issue and go to Bytebase to create an issue with the developer supplied **SQL**, **database**, and **description**.
1. DBA updates the Jira issue status to indicate the change is in progress.
1. DBA goes to Bytebase to roll out the database change.
1. DBA updates the Jira issue status to indicate the change has completed.

## Step 1: Create a Project in Jira, Customize the Fields and Create an Issue

1. Create a Project `API Sample`, and from the **Project settings >Details**, you can see the **Project Key** is `API`. You'll need this to map to Bytebase later.

   ![jira-details](/content/docs/tutorials/database-change-management-with-jira/jira-details.webp)

1. The default issue fields `Summary`,`Description` are not enough for us to track the database changes, so we need to have a new issue type `database changes` and customize the fields accordingly.

1. Here's the screenshot of the customized type `Database Changes`. We added three additional fields:

   - Database
   - SQL
   - Bytebase issue link

   ![jira-create-issue](/content/docs/tutorials/database-change-management-with-jira/jira-create-issue.webp)

1. Create an issue of this type, fill in the fields and click **Create**. Here's the screenshot of the issue.

   ![jira-issue-in-review](/content/docs/tutorials/database-change-management-with-jira/jira-issue-in-review.webp)

## Step 2: Create a Project and Database in Bytebase

1. Start Bytebase via Docker and register an account which will be granted `Workspace Admin` role.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

2. Click **Projects** on the sidebar, and then click **New Project**. Fill in the project name `Jira API`, and project key `API`. The key must be the same as the project key in Jira.

   ![bb-create-proj-api](/content/docs/tutorials/database-change-management-with-jira/bb-create-proj-api.webp)

3. Bytebase has embedded sample database instances `Prod Sample Instance` and `Test Sample Instance` for you to explore the product.

4. Go to the `Jira API` project, and then click **New DB**. Select `Test Sample Instance`, fill in the database name `demodb`, and click **Create**.

   ![bb-create-db](/content/docs/tutorials/database-change-management-with-jira/bb-create-db.webp)

## Step 3: Mapping the Jira Issue to Bytebase

After the above preparation, it's time to act as the DBA (Database Administrator) to review and execute the SQL change.

1. Go to the `Jira API` project, and open the issue you created before. What we need is to copy the content to Bytebase.

   ![jira-issue-in-review](/content/docs/tutorials/database-change-management-with-jira/jira-issue-in-review.webp)

1. Go to Bytebase in another browser tab, and go to the `Jira API` project, click **Database** on the sidebar, you'll see the database `demodb` we created before. Select the database, and click **Edit Schema**.

   ![bb-proj-db-edit](/content/docs/tutorials/database-change-management-with-jira/bb-proj-db-edit.webp)

1. You'll be redirected to **Schema Editor**. Click **Raw SQL** tab, paste the **SQL** content in Jira issue to the text area, and then click **Preview issue**. An issue will be previewed with SQL filled in. Fill in the **Summary** and **Description** for the issue, and then click **Create**. If there's any error in the SQL, it will show a warning or error message. If not, the issue will rollout to the database (you can configure to add manual approval and approval flow to fit your needs).

   ![bb-issue-jira-done](/content/docs/tutorials/database-change-management-with-jira/bb-issue-jira-done.webp)

1. Every change in Bytebase will be recorded in the **Change History** of the database.

   ![bb-db-history](/content/docs/tutorials/database-change-management-with-jira/bb-db-history.webp)

1. You can also click **View change** to view the change diff.

   ![bb-view-diff-jira](/content/docs/tutorials/database-change-management-with-jira/bb-view-diff-jira.webp)

1. After the issue is `Done` in Bytebase, copy the url of the issue, and paste it in the **Bytebase issue link** field in Jira issue and set the status to `Done`. The whole process is done.

   ![jira-issue-done](/content/docs/tutorials/database-change-management-with-jira/jira-issue-done.webp)

## Conclusion and Next Step

In this tutorial, you have successfully set up a database change workflow with Jira and Bytebase.

- Jira takes care of the review process and the overall progress tracking.
- Bytebase takes care of the database change rollout and history tracking.

On the other hand, there are still manual steps to move the information back and forth between Jira
and Bytebase. In the next tutorial, we will show you how to automate those by leveraging Jira trigger
and Bytebase API.
