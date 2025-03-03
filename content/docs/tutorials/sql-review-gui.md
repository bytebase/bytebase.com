---
title: 'SQL Review with Bytebase GUI'
author: Adela
updated_at: 2025/02/24 16:15
tags: Tutorial
level: Intermediate
estimated_time: '20 mins'
description: This tutorial will walk you through using SQL Review via Bytebase GUI to improve your database schema change process.
---

When modifying data in the database, it's crucial to ensure that the changes are both safe and accurate. Bytebase offers a feature called [SQL Review](/docs/sql-review/overview/), which allows you to evaluate your SQL changes before they are applied to the database. SQL Review can be invoked from the Bytebase GUI, CI or API.

This is the 3rd part of tutorial series of SQL Review:

1.  SQL Review with Bytebase GUI (this one)
1.  SQL Review with CI:
    - [SQL Review with GitHub Actions](/docs/tutorials/sql-review-github-action/)
1.  [SQL Review with Bytebase API](/docs/tutorials/sql-review-api/)
1.  [Codify SQL Review Policies with Bytebase API](/docs/tutorials/api-sql-review-policy/)

This tutorial will walk you through using SQL Review in Bytebase with Bytebase GUI to improve your database schema change process. The **Community Plan** is sufficient for completing this tutorial.

## Prerequisites

1. Make sure you have [Docker](https://www.docker.com/) installed, and if you don’t have important existing Bytebase data locally, you can start over from scratch by `rm -rf ~/.bytebase/data`.
1. Copy and paste the commands to start one Bytebase via Docker.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

## Configure SQL Review Policies

1. Register an admin account and it will be granted the `workspace admin` role automatically.

1. Click **CI/CD > SQL Review** on the left side menu. You can find there is already one default SQL Review policy named `SQL Review Sample Policy`.

   ![bb-sql-review-edit](/content/docs/tutorials/sql-review-gui/bb-sql-review-edit.webp)

1. Click **Edit**, you'll be redirected to the SQL Review policy edit page. Here you may specify different rules for different database engines, and here our sample database is PostgreSQL, so we'll focus on the PostgreSQL rules.

   ![bb-sql-review-sample-policy](/content/docs/tutorials/sql-review-gui/bb-sql-review-sample-policy.webp)

1. The default policy is attached to Environment `Prod`, you may click **Change attached resources** to attach it to other Environments or Projects. Here we'll keep it as is. You may also click **Change the template** to change the rules.

1. Click **Change the template**, keep the default template `Default SQL Review Template` and click **Next**. Add one rule `Enforce setting default value on columns`, set **Error Level** to `Error` and click **Confirm and update**.

   ![bb-sql-review-add-rule](/content/docs/tutorials/sql-review-gui/bb-sql-review-add-rule.webp)

## Trigger SQL Review

1. Go to `Sample Project`, since the default SQL Review policy is attached to the `Prod` environment, we'll create a new table on it. Click **Database > Databases** on the left side menu, select `hr_prod` and click **Edit Schema**.

   ![bb-db-edit-schema](/content/docs/tutorials/sql-review-gui/bb-db-edit-schema.webp)

1. Click **Add Table** while choosing `Prod hr_prod > public > Tables` on the left bar. Create a new table `t1` with one column `id` and `name`, intentionly unclick **Not Null** for `name` and click **Preview issue**.

   ![bb-edit-schema](/content/docs/tutorials/sql-review-gui/bb-edit-schema.webp)

1. The SQL Review will run automatically before the issue preview, and you can see the violations against our defined rules. Click **Continue anyway**.

   ![bb-schema-editor-sql-check](/content/docs/tutorials/sql-review-gui/bb-schema-editor-sql-check.webp)

1. After redirecting to the issue page, click **Create** and **Continue anyway**, the issue is created with SQL review red marked as there is some `Error`.

   ![bb-issue-sql-review-error](/content/docs/tutorials/sql-review-gui/bb-issue-sql-review-error.webp)

1. You may resolve this by changing the SQL as follows:

   ```sql
   CREATE TABLE "public"."t1" (
      "id" integer NOT NULL DEFAULT 0,
      "name" text NOT NULL DEFAULT ''
   );
   ```

   If you find that you can't edit the SQL, you can click **Setting** on the left side menu, and then check **Allow modify statement** or otherwise the SQL is not editable.

   ![bb-allow-modify](/content/docs/tutorials/sql-review-gui/bb-allow-modify.webp)

## Summary

Now you have learned how to trigger SQL Review in Bytebase GUI, you may also refer to the [SQL Review](/docs/sql-review/overview) document for more details. Next, let's learn how to [trigger SQL Review from your CI API](/docs/tutorials/sql-review-api/).
