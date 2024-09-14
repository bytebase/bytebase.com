---
title: Review Center
---

## Enter Review Center

If you **Change Data** or **Edit Schema** in **Databases** interface, **Rollout** is included in the workflow. On the contrary, in **Review Center**, you can only run SQL Checks of your edition and Create an Issue, but cannot Rollout the Issue.

Select your project. Enter **Review Center** from the left-side bar.

![review-center-select-project](/content/docs/sql-review/review-center-select-project.webp)

## Edit

**Review Center** is a section specifically designated to **Edit Schema(DDL)** or **Change Data(DML)**. You can see entries to DDL or DML by clicking the **Review SQL** button on the upper-right, where we choose one or several databases to edit and click **Next**.

You can either operate directly without coding in **Schema Editor** section, or write your own commands in **Raw SQL** section. Having completed your edition, click **Preview issue** to run checks and create.

You can see and edit your SQL commands in the **SQL** block. Click **Run checks** to check grammar. If `SQL review` passes, you can **Create**.

![review-center-run-checks](/content/docs/sql-review/review-center-run-checks.webp)

## Check and create issue

After you **Create**, `Task checks` will automatically run:

- **Connection**: check whether the databases are successfully connected
- **SQL review**: check whether the grammar of the commands is correct
- **Summary report**: an overall conclusion whether all checks are passed

![review-center-task-checks](/content/docs/sql-review/review-center-task-checks.webp)

You can still edit your code at this point.

![review-center-edit-before-creating](/content/docs/sql-review/review-center-edit-before-creating.webp)

If any check went wrong, you wouldn't be able to **Create issue**.

![review-center-task-checks-error](/content/docs/sql-review/review-center-task-checks-error.webp)

Fix the error if any, and **Create issue** when all checks are passed. Then the issue is successfully created and ready to Rollout some time in the future.