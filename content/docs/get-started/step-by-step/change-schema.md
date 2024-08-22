---
title: Make a Database Schema Change
---

**Issues** represents a collaboration between developer and DBA (like creating a database or altering a schema). It's similar to the issue concept in other issue management tools.

Bytebase supports **Edit Schema** (DDL) and **Change Data** (DML). Taking **Edit Schema** as an example, this doc guides you to run a SQL UI Workflow in a project. 

Make sure you have a project with databases and members.

## Create an issue

Go to your project page, choose one or several databases to **Edit Schema**.

E.g If you chose one. In **Schema Editor**, you can operate directly on databases or tables without coding. E.g. add a new table or a new column. In **Raw SQL**, **Sync SQL from Schema Editor** and you'll see your operation by code. You can also operate other schema changes.

![edit-schema-1](/content/docs/get-started/step-by-step/change-schema/edit-schema-1.webp)
    
![edit-schema-2](/content/docs/get-started/step-by-step/change-schema/edit-schema-2.webp)
    
![edit-schema-3](/content/docs/get-started/step-by-step/change-schema/edit-schema-3.webp)

Checks will run automatically. If any check fails, fix the error and **Retry**. You can move on when all checks pass.

If you chose several: code in the **SQL** section, then **Create** and **Rollout**.

## Rollout an issue

If there's a SQL review warning, you may fix it by editing SQL then **Rollout**, or click **Rollout** and then **Rollout anyway**.

After rolling out, the issue is `Done`.

## Summary

Here's a graph showing the full four steps of issues.

![graph-4-steps](/content/docs/get-started/step-by-step/change-schema/graph-4-steps.webp)

Since for now, you haven't configured [Custom Approval](/docs/administration/custom-approval/), the approval process will be skipped. You haven't configured [Rollout Policy](/docs/administration/environment-policy/rollout-policy/), unless there is something wrong with the auto checks, the issue will be rolled out automatically.

Now you have completed the basic UI workflow to change database. There is another more advanced workflow - GitOps workflow. If you want to try **Database-as-Code** - [Run a GitOps Workflow](/docs/vcs-integration/overview).
