---
title: 'Master SQL Review with GUI, GitOps and API'
author: Ningjing
updated_at: 2024/08/14 16:15
tags: Tutorial
integrations: API
level: Intermediate
estimated_time: '40 mins'
description: This tutorial will walk you through using SQL Review in Bytebase to improve your database schema change process.
---

When modifying data in the database, it's crucial to ensure that the changes are both safe and accurate. Bytebase offers a feature called [SQL Review](/docs/sql-review/overview/), which allows you to evaluate your SQL changes before they are applied to the database. SQL Review can be initiated through the Bytebase GUI, a GitOps workflow, or via API.

This tutorial will walk you through using SQL Review in Bytebase to improve your database schema change process. The Community Plan is sufficient for completing this tutorial.

![sql-review-3](/content/docs/tutorials/sql-review/sql-review-3.webp)

## Prerequisites

1. Make sure you have [Docker](https://www.docker.com/) installed, and if you don’t have important existing Bytebase data locally, you can start over from scratch by `rm -rf ~/.bytebase/data`.
1. Copy and paste the commands to start one Bytebase via Docker.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

## Configure SQL Review Policies

### UI

1. Register an admin account and it will be granted the `workspace admin` role automatically.

1. Click **Security & Policy > SQL Review** on the left side menu. You can find there is already one default SQL Review policy named `Default SQL Review Policy`.

   ![bb-sql-review-edit](/content/docs/tutorials/sql-review/bb-sql-review-edit.webp)

1. Click **Edit**, you'll be redirected to the SQL Review policy edit page. Here you may specify different rules for different database engines, and here our sample database is PostgreSQL, so we'll focus on the PostgreSQL rules.

   ![bb-sample-policy-prod](/content/docs/tutorials/sql-review/bb-sample-policy-prod.webp)

1. The default policy is attached to Environment `Prod`, you may click **Change attached resources** to attach it to other Environments or Projects. Here we'll keep it as is. You may also click **Change the template** to change the rules.

   ![bb-sample-policy-prod](/content/docs/tutorials/sql-review/bb-sample-policy-prod.webp)

1. Click **Change the template**, keep the default template `Default SQL Review Template` and click **Next**. Add one rule `Enforce setting default value on columns`, set **Error Level** to `Error` and click **Confirm and update**.

   ![bb-sql-review-default-value](/content/docs/tutorials/sql-review/bb-sql-review-default-value.webp)

### GitOps

<TutorialBlock url="/docs/tutorials/api-sql-review/" title="Codify SQL Review Policies with Bytebase API" />

## Case 1: Trigger SQL Review in Bytebase GUI

1. Go to `Sample Project`, since the default SQL Review policy is attached to the `Prod` environment, we'll create a new table on it. Click Database > Databases on the left side menu, select `hr_prod` and click **Edit Schema**.

   ![bb-db-edit-schema](/content/docs/tutorials/sql-review/bb-db-edit-schema.webp)

1. Click **Add Table** while choosing `Prod hr_prod > public > Tables` on the left bar. Create a new table `t1` with one column `id` and `name`, intentionly unclick **Not Null** for `name` and click **Preview issue**.

   ![bb-edit-schema](/content/docs/tutorials/sql-review/bb-edit-schema.webp)

1. The SQL Review will run automatically before the issue preview, and you can see the violations against our defined rules. Click **Continue anyway**.

   ![bb-schema-editor-sql-check](/content/docs/tutorials/sql-review/bb-schema-editor-sql-check.webp)

1. After redirecting to the issue page, click **Create** and **Continue anyway**, the issue is created with SQL review red marked as there is some `Error`.

   ![bb-issue-sql-review-error](/content/docs/tutorials/sql-review/bb-issue-sql-review-error.webp)

1. You may resolve this by changing the SQL as the following:

   ```sql
   CREATE TABLE "public"."t1" (
      "id" integer NOT NULL DEFAULT 0,
      "name" text NOT NULL DEFAULT ''
   );
   ```

   Here you need firstly click **Settings** on the left side menu, and then check **Allow modify statement** or otherwise the SQL is not editable.

   ![bb-allow-modify](/content/docs/tutorials/sql-review/bb-allow-modify.webp)

## Case 2: Trigger SQL Review in GitOps Workflow

### Start ngrok

<IncludeBlock url="/docs/get-started/install/vcs-with-ngrok"></IncludeBlock>

### Configure GitOps

1. Use your domain from ngrok to visit Bytebase (if you use localhost, it won't work). Click **Integrations > GitOps** on the left side menu and then follow the instructions to set up a GitHub.com integration.

   1. Go to your GitHub repository, click **Settings > Developer Settings > Personal access tokens** and generate a new token. Choose `All repository` as **Repository access** and configure the token permission according to Bytebase's instructions.

   1. Go back to Bytebase, paste the personal access token and click **Confirm and add**.

   _You may read the [GitOps](/docs/vcs-integration/add-git-provider/) document for more details._

1. Create a repository `bb-gitops-814` in your GitHub account which will be used to submit SQL changes.

1. Create another project `Sample Project GitOps` and click **New DB** on the **Database > Databases**. Choose `Prod Sample Instance`, name `gitops_prod`, environment `Prod`, database owner name `bbsample` and click **Create**.

1. Within the project, click **Integration > GitOps** and then **Add Repository**. Choose the repository `bb-gitops-814` and click **Add GitOps connector**. Follow the 3 steps, keep the default settings and click **Finish**. Now the workflow is set.

   ![bb-project-gitops](/content/docs/tutorials/sql-review/bb-project-gitops.webp)

1. Go back to `bb-gitops-814` on GitHub, create a file `202408141500_create_t2.sql` under `bb-gitops-814/bytebase/` folder. Add the following SQL:

   ```sql
   CREATE TABLE "public"."t2" (
      "id" integer NOT NULL PRIMARY KEY,
      "name" text NULL
   );
   ```

1. Commit changes, create a new branch and click **Propose changes**. Then click **Create pull request**. On the new Pull Request page, you may see the SQL Review comment.

   ![gh-pr-sql-review](/content/docs/tutorials/sql-review/gh-pr-sql-review.webp)

1. Edit the commit as follows and commit directly to the branch, and you may find the SQL Review comment is updated.

   ```sql
   CREATE TABLE "public"."t2" (
      "id" integer NOT NULL DEFAULT 0 PRIMARY KEY,
      "name" text NOT NULL DEFAULT ''
   );
   ```

   ![gh-pr-sql-review-0](/content/docs/tutorials/sql-review/gh-pr-sql-review-0.webp)

1. Merge the pull request in GitHub, and you may find the issue created and executed in Bytebase.

   ![gh-pr-merged](/content/docs/tutorials/sql-review/gh-pr-merged.webp)

   ![bb-gitops-issue-done](/content/docs/tutorials/sql-review/bb-gitops-issue-done.webp)

## Case 3: Trigger SQL Review by Bytebase API

You may call [Bytebase API](/docs/api/sql-review/) in your internal portal or GitHub Actions to trigger SQL Review. We don't go into details here, but you may refer to the following examples:

- [🐙 API Example](https://github.com/bytebase/api-example)

  Sample portal to call Bytebase API to trigger schema change including SQL Review.
  ![bb-api](/content/docs/tutorials/sql-review/bb-api.webp)

- [🐙 API in GitHub Actions Example](https://github.com/bytebase/cicd-github-actions-example)

  Sample github custom actions to call Bytebase API to coordinate the schema migration in Bytebase with the GitHub PR workflow.
  ![bb-gh-action](/content/docs/tutorials/sql-review/bb-gh-action.webp)

## Summary

Now you have learned how to trigger SQL Review in Bytebase GUI, GitHub, or by API. You may also refer to the [SQL Review](/docs/sql-review/) document for more details.
