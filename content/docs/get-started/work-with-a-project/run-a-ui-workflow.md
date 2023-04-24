---
title: Run a SQL UI Workflow
---

**Issue** represents a specific collaboration activity between developer and DBA such as creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

In Bytebase, **Issue** is optimized for database domain. An **Issue** always belongs to a **Project**. A single Issue is only dealing with a particular **Database Instance** (e.g. creating a database on a database instance). Except for creating database issue, most other issues are also associated with an existing **Database** (e.g. altering a table on a database).

Internally, the issue progression is represented by a **Pipeline**. A **Pipeline** contains multiple **Stages**, each usually corresponds to an **Environment**. A **Stage** contains multiple **Tasks** dealing with a specific database operation such as altering table. A single **Task** can run multiple times (e.g. failed first and then retry). Each run is represented by a **Task Run**.

This document guides you to run a SQL UI Workflow in a project. Make sure you have already created a project with databases and members in it.

Bytebase supports both **Alter Schema** (DDL) and **Change Data** (DML). This document takes **Alter Schema** as an example.

## Step 1 - Create an issue

1. Go to the project page you created, click **Alter Schema**, and you will see an **Alter Schema** dialog box.
2. Choose **Alter multiple databases**, it will display databases for each environment and the **Issue** will compose them into a **Pipeline** later. Here if you choose **Alter single database**, then it's all about that specific database.

![alter-schema](/docs/get-started/work-with-a-project/run-a-ui-workflow/alter-schema.webp)

3. Click **Next**, choose **Normal migration**, and click **Next**, you will be redirected to the new issue page.
4. Fill in the SQL query in the **SQL** box, put someone as **Assignee**, and click **Create**. Checks will run automatically. If any of the checks fail, you will need to fix the error and click **Retry**. If all checks pass, you can move on.

![issue-form](/docs/get-started/work-with-a-project/run-a-ui-workflow/issue-form.webp)

## Step 2 - Approve an issue

Only the **Assignee** or the **Project Owner** can approve an issue that requires manual approval.

- Go to the issue page you’re assigned, and click **Approve** if you think it’s right.
- The SQL will run, if it’s successful, it will display **Done** up there.
- After SQL runs successfully for each environment in the pipeline is created, click **Resolve issue**, and the **Issue** is **Done**.

![done](/docs/get-started/work-with-a-project/run-a-ui-workflow/done.webp)

## Summary

Now you have completed the basic UI workflow in Bytebase. There is another more advanced workflow - GitOps workflow. If you want to try **Database-as-Code** - [Run a GitOps Workflow](/docs/vcs-integration/overview).
