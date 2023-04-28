---
title: Database Change Management with GitHub using Bytebase Cloud
author: Ningjing
published_at: 2023/04/17 16:15
feature_image: /blog/database-change-management-with-github-using-bytebase-cloud/feature-image.webp
tags: Tutorial
integrations: MySQL, GitHub
level: Intermediate
description: Bytebase provide its SaaS version since 1.15.0, this tutorial will bring your schema change to the next level by introducing the GitOps workflow, where you commit schema change script to the GitHub repository, which will in turn trigger the schema deployment pipeline in Bytebase Cloud.
---

This is a series of articles about Database Change Management using Bytebase Cloud. We take Amazon Aurora MySQL as an example and is also applicable to Amazon Aurora Serverless.

- [Database Change Management using Bytebase Cloud](/blog/database-change-management-using-bytebase-cloud)
- Database Change Management with GitHub using Bytebase Cloud (this one)

---

In the last article [Database Change Management using Bytebase Cloud](/blog/database-change-management-using-bytebase-cloud), you have tried **UI workflow** in Bytebase.

This tutorial will bring your schema change to the next level by introducing the **GitOps workflow**, where you commit the schema change script to the GitHub repository, which will in turn trigger the schema deployment pipeline in Bytebase.

You can use Bytebase free version to finish the tutorial.

## Features included

- GitOps Workflow

## Prerequisites

Before you start this tutorial, make sure you have the following ready:

- Followed our previous UI-based change tutorial [Database Change Management using Bytebase Cloud](/blog/database-change-management-using-bytebase-cloud).
- An Amazon Aurora MySQL instance.
- A GitHub account.
- A public GitHub repository, e.g  `aurora-mysql-test-bb-saas`.

## Step 1 - Connect Bytebase with GitHub.com

1. Visit Bytebase Cloud Console. Click **Settings** on the top bar, and then click **Workspace** > **GitOps**. Choose **GitHub.com** and click **Next**.

![bb-settings-gitops-1-github](/blog/database-change-management-with-github-using-bytebase-cloud/bb-settings-gitops-1-github.webp)

2. Follow the instructions within **STEP 2**, and in this tutorial, we will use a personal account instead of an organization account. The configuration is similar.

3. Go to your GitHub account. Click your avatar on the top right, and then click **Settings** on the dropdown menu.
   ![github-dropdown](/blog/database-change-management-with-github-using-bytebase-cloud/github-dropdown.webp)

4. Click **Developer Settings** at the bottom of the left sidebar. Click **OAuth Apps**, and add a **New OAuth App**.
   ![github-oauth-apps](/blog/database-change-management-with-github-using-bytebase-cloud/github-oauth-apps.webp)

5. Fill **Application name** and then copy the **Homepage** and **Authorization callback URL** in Bytebase STEP 2 and fill them. Click **Register application**.

6. After the OAuth application is created, click **Generate a new client secret**. Copy the **Client ID** and the newly generated **Client Secret**, paste them back into Bytebase's **Application ID** and **Secret**.
   ![github-clientid-secret](/blog/database-change-management-with-github-using-bytebase-cloud/github-clientid-secret.webp)
   ![bb-settings-gitops-2](/blog/database-change-management-with-github-using-bytebase-cloud/bb-settings-gitops-2.webp)

7. Click **Next**. You will be redirected to the confirmation page. Click **Confirm and add**, and the Git provider is successfully added.
   ![github-auth](/blog/database-change-management-with-github-using-bytebase-cloud/github-auth.webp)
   ![bb-settings-gitops-3](/blog/database-change-management-with-github-using-bytebase-cloud/bb-settings-gitops-3.webp)

## Step 2 - Enable GitOps workflow

1. Go to your project `TestAurora`, click **GitOps**, and choose **GitOps Workflow**. Click **Configure GitOps**.

2. Choose `GitHub.com` - the provider you just added. It will display all the repositories you can manipulate. Choose `aurora-mysql-test-bb-saas`.
   ![bb-project-gitops-github-list](/blog/database-change-management-with-github-using-bytebase-cloud/bb-project-gitops-github-list.webp)

3. Keep the default setting, and click **Finish**.

## Step 3 - Change schema by pushing SQL schema change files to GitHub

1. In your GitHub repository `aurora-mysql-test-bb-saas`, create a folder `bytebase`, then create a subfolder `Test`, and create a SQL file using the naming convention `{{ENV_ID}}/{{DB_NAME}}##{{VERSION}}##{{TYPE}}##{{DESCRIPTION}}.sql`. It is the default configuration for the file path template setting under project `TestAurora` > **GitOps**.

   `test/db_demo##202303100000##ddl##create_t2.sql`

   - `test` corresponds to `{{ENV_ID}}`
   - `db_demo` corresponds to `{{DB_NAME}}`
   - `202303100000` corresponds to `{{VERSION}}`
   - `ddl` corresponds to `{{TYPE}}`
   - `create_t2` corresponds to `{{DESCRIPTION}}`

Paste the sql script in it.

```sql
CREATE TABLE t2
(
   id BIGINT NOT NULL,
   course VARCHAR(255)
);
```

![vscode](/blog/database-change-management-with-github-using-bytebase-cloud/vscode.webp)

2. Commit and push this file.

3. Go to Bytebase, and go into project `TestAurora`. You’ll find there is a new `Push Event` and a new `issue 107` created.
   ![bb-project-push-event](/blog/database-change-management-with-github-using-bytebase-cloud/bb-project-push-event.webp)

4. Click `issue/107` and go to the issue page. Click **Resolve issue**, and the issue will be `Done`. You’ll see:
   - The issue is created via GitHub.com
   - The issue is executed without approval because it’s on `Test` environment where manual approval is skipped by default. The Assignee is `Bytebase`, because the execution is automatic, and requires no manual approval.
   - The SQL is exactly the one we have committed to the GitHub repository.
   - The Creator is `A`, because the GitHub user you use to commit the change has the same email address found in the Bytebase member list.

![bb-issue-github-create-t2-done](/blog/database-change-management-with-github-using-bytebase-cloud/bb-issue-github-create-t2-done.webp)

5. Click **View change**, you can view the schema diff.
   ![bb-dbdemo-diff](/blog/database-change-management-with-github-using-bytebase-cloud/bb-dbdemo-diff.webp)

6. If you have **Pro or Enterprise plan**, go to GitHub repository, and you will see besides your committed sql, there is a `.db_demo##LATEST.sql` file. Because you have configured [Schema path template](/docs/vcs-integration/name-and-organize-schema-files#schema-path-template) before, Bytebase will write back the latest schema to that specified path after completing the schema change. Thus you have access to an update-to-date full schema at any time.
   ![github-LATEST](/blog/database-change-management-with-github-using-bytebase-cloud/github-LATEST.webp)

## Summary and What's Next

Now that you have tried the **GitOps workflow**, which stores your Amazon Aurora schema in GitHub and triggers the change upon committing change to the repository, to bring your Amazon Aurora change workflow to the next level of Database DevOps - [Database as Code](/blog/database-as-code).

You can check out [GitOps docs](/docs/vcs-integration/overview) to learn more configuration details.

In the real world, you might have separated feature and main branches corresponding to your development and production environment, you can check out [GitOps with Feature Branch Workflow](/docs/how-to/workflow/gitops-feature-branch) to learn the setup. Have a try and look forward to your feedback!
