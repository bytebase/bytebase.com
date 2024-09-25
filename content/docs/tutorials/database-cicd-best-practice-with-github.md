---
title: The Database CI/CD Best Practice with GitHub
author: Changyu
updated_at: 2024/09/25 18:15
feature_image: /content/docs/tutorials/database-cicd-best-practice-with-github/database-cicd-best-practice-with-github.webp
tags: Tutorial
integrations: GitHub
level: Intermediate
estimated_time: '30 mins'
description: We already have CI/CD for code delivery, why not the database? Imagine applying and deploying database changes the same way you would application code.
---

_Wanna other VCS providers instead?_ 👉

- [The Database CI/CD Best Practice with GitLab](/docs/tutorials/database-cicd-best-practice-with-gitlab)
- [The Database CI/CD Best Practice with Azure DevOps](/docs/tutorials/database-cicd-best-practice-with-azure-devops)
- [The Database CI/CD Best Practice with Bitbucket](/docs/tutorials/database-cicd-best-practice-with-bitbucket)

---

Database change is a tricky part of the application development process: it usually involves multiple databases from different environments and cross-team collaboration, to add on top of it, databases are touch and go. It got us thinking: **can we treat database the same way we treat application code?**

DORA (DevOps Research & Assessment) [pointed out](https://cloud.google.com/architecture/devops/devops-tech-database-change-management) that integrating database work into the software delivery process positively contributes to continuous delivery. It’s about time to make databases a part of the CI/CD cycle.

But how does it work, really?

## Critical Elements of Database CI/CD

To answer the "how", we first need to sort out the typical database change workflow. Before SQL statements can be safely applied to the database, there are two key steps: **review & change**.

#### SQL Review

This step is to make sure that the changes:

1. Implement the business logic accurately;
2. Follow database design best practices;

Here, the devs are generally responsible for the former task and the DBAs for the latter. The DevOps philosophy looks to solve this problem by integrating Ops and Devs. The reality is that when DBA exists in an organization, it is difficult to merge the two teams directly. One potential solution is to retain the DBA’s task while enabling dev teams to pre-review the SQL. This **shift-left approach** can significantly reduce the chance of release delays. Moreover, if there are no DBAs in an organization, then it is even more crucial to empower the dev team with the capability to make sure the SQL doesn’t wreak havoc on the database.

#### SQL Change Execution

This step is to make sure that:

- **Statements are executed correctly.** We don’t want wrong database connections, insufficient permissions, object name conflicts, or basic syntax errors on our hands.
- **All planned statements are executed.** Omissions may occur when there are many scripts to be executed or if there are multiple target databases for batch execution.
- **The change executions process should not impact the business.** Hardware resource exhaustion and locking the table for an extended period are not pleasant for the company.

To avoid change-related errors, reducing the manual aspects is also crucial: the more things are automated, the fewer chances for mistakes to happen. Pre-configured pipelines to automatically apply SQL to the databases? That sounds rad. In order to avoid affecting regular business operations negatively, various zero-downtime change techniques should be adopted, especially for databases with large datasets.

Thus, the critical elements for implementing Database CI/CD should **enable dev teams to perform SQL reviews** and **streamlined SQL change rollout**.

#### SQL Review and Change Rollout with VCS Integration

Let’s first explore how to enable the dev teams to perform SQL reviews themselves.

Very few developers are experts at reviewing SQL statements for "architecturally correctness" and even for senior DBAs, the manual checks can be highly inefficient and error-prone. Fortunately, the industry has created various automated review tools by integrating different SQL check specifications.

However, these tools have one common problem - they are all designed for the DBAs. On the one hand, these tools often require higher operational privileges to the databases and are thus not suitable to be used directly by developers. On the other hand, developers have their IDE, and a separate external arbitrator is the last thing they need. Imagine how bad it would be when you have to copy & paste code between multiple tools.

So what should a developer-friendly SQL review tool look like?

We usually perform the traditional code review process on version control systems (VCS), and the same should be applied to SQL. Therefore, SQL review tools should be integrated into the code review workflow. Bytebase has made [SQL Review Action available on the GitHub Marketplace](https://github.com/marketplace/actions/sql-review); once enabled, SQL Review Actions will be triggered as you submit PR on GitHub.

Let’s look at how to implement streamlined SQL change rollouts.

Standalone SQL deployment tools are not uncommon. These tools typically upload SQL scripts manually, proceed with the deployment via an approval flow, and then provide feedback after the rollout is complete. This model accurately depicts how the developers and the DBAs work independently, and the fragmented process is one of the most common reasons for delayed releases. After all, who can guarantee that there will never be a mistake when you are constantly moving SQL scripts between multiple systems manually?

We need a more efficient and automated release process. Let’s recall the classic CI/CD workflow for application code: commit changes > code review > merge branch > auto-build > auto-deploy. **Since we’ve already implemented SQL review on GitHub Actions, why can’t we include the subsequent rollout process?**

Well, yes, we can!

A SQL change rollout tool for Database CI/CD should have the ability to integrate with VCS. Once your SQL scripts have been vetted and merged into the target branch, the release process is triggered, and the scripts are automatically pushed to Bytebase. Of course, the DBA can perform another sanity check before executing the SQL against the target database.

## A Complete Database CI/CD Workflow

<IncludeBlock url="/docs/tutorials/share/database-workflow"></IncludeBlock>

## Set Up Database CI/CD with GitHub in Bytebase (Free Plan)

Here's a step-by-step tutorial on how to set up this Database CI/CD with GitHub in Bytebase.

### Step 1 - Run Bytebase in Docker and set the External URL generated by ngrok

<IncludeBlock url="/docs/get-started/install/vcs-with-ngrok"></IncludeBlock>

### Step 2 - Add GitHub.com as a Git provider in Bytebase

1. Visit Bytebase via your ngrok URL. Click **CI/CD** > **GitOps**, choose `GitHub.com`.

   ![bb-gitops-github](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-gitops-github.webp)

1. Follow the **fine-grained personal access token** link to [https://github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta) and click **Generate new token**. Fill in the fields, then select the permission as follows and click **Generate token**.

   - Contents (Read-only)
   - Metadata (Read-only)
   - Pull requests (Read and write)
   - Webhooks (Read and write)

1. Copy the generated token, go back to Bytebase, and paste the token into the field and click **Confirm and add**. The provider is added successfully.

### Step 3 - Configure a GitOps Workflow in Bytebase

1. Go to GitHub, create a new project `bb-gitops-2024`.

1. Go to Bytebase, go to the `Sample Project`. Click **Integration >GitOps** on the left and click **Add GitOps connector**. Choose `GitHub.com` (the git provider you just configured) and `xxxx/bb-gitops-2024` (the repository you just created).

1. Keep the default settings for the remaining fields and click **Finish**. The gitops connector is created successfully.

   ![bb-gitops-github-configure](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-gitops-github-configure.webp)

### Step 4 - Configure SQL Review in Prod

<IncludeBlock url="/docs/tutorials/share/sql-review-not-null"></IncludeBlock>

### Step 5 - Create a Pull Request and Trigger SQL Review CI

1. Go to `bb-gitops-2024` on GitHub.com. Add a new file `2024092500_create_table_t2024.sql` under `bytebase/` which is the directory configured in the previous step. Copy the following SQL script into the file and commit the change to a new branch which will then create a Pull Request.

   ```sql
   CREATE TABLE "public"."t2024" (
         "id" integer PRIMARY KEY,
         "name" text
   );
   ```

1. Wait for a while, there is a SQL Review comment added. As we configured in the previous step, `NOT NULL` is a warning level SQL Review rule.

   ![github-sql-review-warning](/content/docs/tutorials/database-cicd-best-practice-with-github/github-sql-review-warning.webp)

1. Edit our sql file as following and commit it on the same branch, and merge the MR.

   ```sql
   CREATE TABLE "public"."t2024" (
         "id" integer NOT NULL PRIMARY KEY,
         "name" text NOT NULL
   );
   ```

1. There will be a new comment saying the PR has triggered a Bytebase rollout.
   ![github-merged](/content/docs/tutorials/database-cicd-best-practice-with-github/github-merged.webp)

1. Follow the link to go to Bytebase. There's an issue with two stages, this is because we have two databases in this project, by default, the SQL will be applied to all databases within the project. If you merge the previous version SQL script, the SQL Review task run here will show yellow warning and waiting for rollout. Click **Resolve** to resolve the issue.

   ![bb-issue-rollout-github](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-issue-rollout-github.webp)

1. After the rollout completes, click **View change** to see the diff.

   ![bb-view-diff](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-view-diff.webp)

1. You may also go to a specific database page to view all its change history.

   ![bb-db-change-history](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-db-change-history.webp)

## Advanced Features (Enterprise Plan)

<IncludeBlock url="/docs/tutorials/share/database-workflow-advanced-features"></IncludeBlock>

## Summary

Now with Bytebase, you have a complete Database CI/CD workflow with GitHub. You can apply this workflow to your own project and customize it to fit your needs. If you have any questions, please feel free join and discuss in [Discord](https://discord.gg/huyw7gRsyA).

## Further Readings

- [The Database CI/CD Best Practice with GitLab](/docs/tutorials/database-cicd-best-practice-with-gitlab)
- [The Database CI/CD Best Practice with Azure DevOps](/docs/tutorials/database-cicd-best-practice-with-azure-devops)
- [The Database CI/CD Best Practice with Bitbucket](/docs/tutorials/database-cicd-best-practice-with-bitbucket)
- [Database as Code - the Good, the Bad and the Ugly](/blog/database-as-code)
