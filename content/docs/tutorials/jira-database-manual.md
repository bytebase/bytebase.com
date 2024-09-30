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

Jira is a leading issue tracking product for software development teams, aiding in planning, tracking, and releasing great software. However, managing database changes often requires additional tools to track the actual change history. By integrating Bytebase, an open-source database DevOps tool, you can achieve this goal. This tutorial will guide you through managing database changes using Jira and Bytebase.

## Prerequisites

- Jira
- Docker

## Step 1: Create a Project in Jira, Customize the Fields and Create an Issue

1. Create a Project `API Sample`, and from the **Project settings >Details**, you can see the **Project Key** is `API`. You'll need this to map to Bytebase later.

    ![jira-details](/content/docs/tutorials/jira-database-manual/jira-details.webp)

1. The default issue fields `Summary`,`Description` are not enough for us to track the database changes, so we need to have a new issue type `database changes` and customize the fields for this type of issue.

1. Here's the screenshot of the customized type `Database Changes` and additional fields `Database`, `SQL`, `Bytebase issue link` in Jira. You can also customize the fields to better fit your needs.

    ![jira-create-issue](/content/docs/tutorials/jira-database-manual/jira-create-issue.webp)

1. Create an issue of this type, fill in the fields and click **Create**. Here's the screenshot of the issue.

    ![jira-issue-in-review](/content/docs/tutorials/jira-database-manual/jira-issue-in-review.webp)

## Step 2: Create a Project and Database in Bytebase

1. Start Bytebase via Docker and register an account which will be granted `Workspace Admin` role.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

2. Click **Projects** on the sidebar, and then click **New Project**. Fill in the project name `Jira API`, and project key `API`. The key must be the same as the project key in Jira.

    ![bb-create-proj-api](/content/docs/tutorials/jira-database-manual/bb-create-proj-api.webp)

3. Bytebase has embedded sample database instances `Prod Sample Instance` and `Test Sample Instance` for you to explore the product.

4. Go to the `Jira API` project, and then click **New DB**. Select `Test Sample Instance`, fill in the database name `demodb`, and click **Create**.

    ![bb-create-db](/content/docs/tutorials/jira-database-manual/bb-create-db.webp)

## Step 3: Mapping the Jira Issue to Bytebase

After the above preparation, it's time to act as the DBA (Database Administrator) to review and execute the SQL change.

1. Go to the `Jira API` project, and open the issue you created before. What we need is to copy the content to Bytebase.

    ![jira-issue-in-review](/content/docs/tutorials/jira-database-manual/jira-issue-in-review.webp)

1. Go to Bytebase in another browser tab, and go to the `Jira API` project, click **Database** on the sidebar, you'll see the database `demodb` we created before. Select the database, and click **Edit Schema**.

    ![bb-proj-db-edit](/content/docs/tutorials/jira-database-manual/bb-proj-db-edit.webp)

1. You'll be redirected to **Schema Editor**. Click **Raw SQL** tab, paste the **SQL** content in Jira issue to the text area, and then click **Preview issue**. An issue will be previewed with SQL filled in. Fill in the **Summary** and **Description** for the issue, and then click **Create**. If there's any error in the SQL, it will show a warning or error message. If not, the issue will rollout to the database (you can configure to add manual approval and approval flow to fit your needs).

    ![bb-issue-jira-done](/content/docs/tutorials/jira-database-manual/bb-issue-jira-done.webp)

1. Every change in Bytebase will be recorded in the **Change History** of the database.

    ![bb-db-history](/content/docs/tutorials/jira-database-manual/bb-db-history.webp)

1. You can also click **View change** to view the change diff.

    ![bb-view-diff-jira](/content/docs/tutorials/jira-database-manual/bb-view-diff-jira.webp)

1. After the issue is `Done` in Bytebase, copy the url of the issue, and paste it in the **Bytebase issue link** field in Jira issue and set the status to `Done`. The whole process is done.

    ![jira-issue-done](/content/docs/tutorials/jira-database-manual/jira-issue-done.webp)

## Conclusion and Next Step

In this tutorial, you have successfully mapped a Jira issue to Bytebase, and recorded the change history of the database in Bytebase. You also set up a manual database change flow.

In the next tutorial, you will learn how to set up an automatic workflow for mapping Jira issues to Bytebase issues, streamlining the process. Stay tuned!
