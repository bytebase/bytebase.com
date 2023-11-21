---
title: Make a Database Schema Change
---

`Issue` represents a specific collaboration activity between developer and DBA such as creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

![issue-detail](/content/docs/get-started/step-by-step/change-schema/issue-detail.webp)

This document guides you to run a SQL UI Workflow in a project. Make sure you have already created a project with databases and members in it.

Bytebase supports both **Edit Schema** (DDL) and **Change Data** (DML). This document takes **Edit Schema** as an example.

## Step 1 - Create an issue

1. Go to the project page you created, click **Edit Schema**, and you will see an **Edit Schema** dialog box.
2. Choose one or several databases. If you choose one, the **Issue** will compose them into a **Pipeline** later; if you choose several, then it's all about that specific database.

    ![bb-project-edit-schema](/content/docs/get-started/step-by-step/change-schema/bb-project-edit-schema.webp)

3. Click **Next**, you'll be prompted with **Schema Editor** if it supports the database type. With or without its help, after filling the SQL, you will be redirected to the new issue page.

    ![bb-schema-editor](/content/docs/get-started/step-by-step/change-schema/bb-schema-editor.webp)

4. If it's a pipeline, you may need to click **Apply to other tasks**. Put someone as **Assignee** to take responsibility, and click **Create**. Checks will run automatically. If any of the checks fail, you will need to fix the error and click **Retry**. If all checks pass, you can move on.

    ![bb-issue-warning](/content/docs/get-started/step-by-step/change-schema/bb-issue-warning.webp)

## Step 2 - Rollout an issue

Since there's an SQL review warning, you may fix it by editing the SQL and click **Rollout** or click **Rollout** and then check **Rollout anyway**.

    ![bb-rollout-anyway](/content/docs/get-started/step-by-step/change-schema/bb-rollout-anyway.webp)

After rolling out, the issue is `Done`.

    ![bb-issue-done](/content/docs/get-started/step-by-step/change-schema/bb-issue-done.webp)   

Here's a graph showing the full four steps of issues.

    ![graph-4-steps](/content/docs/get-started/step-by-step/change-schema/graph-4-steps.webp)

Since for now, you haven't configured [Custom Approval](/docs/administration/custom-approval/), the approval process will be skipped. You haven't configured [Rollout Policy](/docs/administration/environment-policy/rollout-policy/), unless there is something wrong with the auto checks, the issue will be rolled out automatically.

## Summary

Now you have completed the basic UI workflow to change database. There is another more advanced workflow - GitOps workflow. If you want to try **Database-as-Code** - [Run a GitOps Workflow](/docs/vcs-integration/overview).
