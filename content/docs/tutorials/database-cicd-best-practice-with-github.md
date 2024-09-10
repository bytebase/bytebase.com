---
title: The Database CI/CD Best Practice with GitHub
author: Changyu
updated_at: 2022/11/29 15:15
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

Here, we present **a complete Database CI/CD workflow**:

![database-devops-workflow](/content/docs/tutorials/database-cicd-best-practice-with-github/database-devops-workflow.webp)

1. The developer creates a Merge Request / Pull Request containing the SQL migration script;
2. SQL Review Action is automatically triggered to review SQL and offers suggestions to assist the code review;
3. After several possible iterations, the team leader or another peer on the dev teams approves the change and merges the SQL script into a branch;
4. The merge event automatically triggers the release pipeline in Bytebase and creates a release ticket capturing the intended change;
5. (Optional) an approval flow will be auto matched based on the change risk and be followed via Bytebase’s built-in UI;
6. Approved scripts are executed gradually according to the configured rollout stages;
7. The latest database schema is automatically written back to the code repository after applying changes. With this, the Dev team always has a copy of the latest schema. Furthermore, they can configure downstream pipelines based on the change of that latest schema;
8. Confirm the migration and proceed to the corresponding application rollout.

## Set Up Database CI/CD with GitHub in Bytebase (Free Plan)

Here's a step-by-step tutorial on how to set up this Database CI/CD with GitHub in Bytebase.

### Step 1 - Run Bytebase in Docker and set the External URL generated by ngrok

<IncludeBlock url="/docs/get-started/install/vcs-with-ngrok"></IncludeBlock>

### Step 2 - Add GitHub.com as a Git provider in Bytebase

1. Visit Bytebase via your ngrok URL. Click **gear icon** (Settings) > **Integration** > **GitOps**, choose `GitHub.com`, and click **Next**. You will see STEP 2. Copy the **Redirect URI**.

![bb-gitops-github](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-gitops-github.webp)

2. Copy the **Authorization callback URL**.

![bb-gitops-step2](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-gitops-step2.webp)

3. Open GitHub, and go to **Settings > Developer Settings > OAuth Apps**. Click **New OAuth App**.

![gh-oauth](/content/docs/tutorials/database-cicd-best-practice-with-github/gh-oauth.webp)

4. Scroll down on the new OAuth App page, paste the **Authorization callback URL**, then click **Update Application**.

![gh-auth-callback](/content/docs/tutorials/database-cicd-best-practice-with-github/gh-auth-callback.webp)

5. On the same page, you can also find **Client ID** and **Client secrets**.

![gh-client-id-secrets](/content/docs/tutorials/database-cicd-best-practice-with-github/gh-client-id-secrets.webp)

6. Switch back to the Bytebase console, fill Client ID and Client secrets in the form as **Application ID** and **Secret**.

![bb-gitops-step2](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-gitops-step2.webp)

7. Click **Next**. You will be redirected to the confirmation page. Click **Confirm and add**, and the Git provider is successfully added.

![bb-gitops-step3](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-gitops-step3.webp)

### Step 3 - Configure a GitOps Workflow in Bytebase

1. Create a repository named `bytebase-ngrok-gitops` in GitHub.

2. Go to Bytebase, go to the `Sample Project`. Click **GitOps** tab and choose `GitOps workflow`. Click **Configure GitOps**.

3. Choose `GitHub.com` (the git provider you just configured) and the repository you just created. You'll be redirected to STEP 3. Keep everything as default, scroll down to the bottom and check `Enable SQL Review CI via GitHub Action`. Click **Finish**.

   ![bb-project-gitops-sql-review-ci](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-project-gitops-sql-review-ci.webp)

4. After SQL Review CI is automatically setup, click **Review the pull request**. You'll be redirected to GitHub. Click **Merge** and you'll see the CI is automatically configured. It will be triggered later once a new merge request is created.

   ![gh-setup-sql-review-ci](/content/docs/tutorials/database-cicd-best-practice-with-github/gh-setup-sql-review-ci.webp)

5. Go back to Bytebase, you'll see the GitOps workflow is configured successfully.

### Step 4 - Create a Pull Request and Trigger SQL Review CI

1. Go to **Environments**, you'll see there's a SQL Review policy attached with `Prod`. Click **Edit**, you'll see three activated SQL Review rules which will be applied via CI.

   ![bb-sql-review-policy-not-null](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-sql-review-policy-not-null.webp)

2. To test SQL Review CI, we'll create a pull request to change the `Prod` database schema. However, it will voliate the SQL Review policy first. Go to `bytebase-ngrok-gitops` on GitHub.
3. Create a subdirectory `bytebase`, and create a sub-subdirectory `prod`. Within the `prod` directory, create a file `hr_prod##202309262500##ddl##add_nickname_table_employee.sql`. Copy the following SQL script into the file and commit the change in a new branch.

   ```sql
   ALTER TABLE "public"."employee"
   ADD COLUMN "nickname" text;
   ```

4. Create a pull request including the above commits. The SQL Review CI will run automatically and show the fail message. However, you can still merge it regardless of the CI result.

   ![gh-sql-review-failed](/content/docs/tutorials/database-cicd-best-practice-with-github/gh-sql-review-failed.webp)

   ![gh-sql-review-failed-detail](/content/docs/tutorials/database-cicd-best-practice-with-github/gh-sql-review-failed-detail.webp)

5. Update the SQL script and commit in the current branch. The SQL Review CI will run again and show the pass message. Click **Merge**.

   ```sql
   ALTER TABLE "public"."employee"
   ADD COLUMN "nickname" text NOT NULL DEFAULT '';
   ```

   ![gh-sql-review-pass](/content/docs/tutorials/database-cicd-best-practice-with-github/gh-sql-review-pass.webp)

6. Go back to project `Sample Project` in Bytebase, you'll see there's an issue created by a push event.

   ![bb-push-event-notification](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-push-event-notification.webp)

   ![bb-project-activity-push-event](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-project-activity-push-event.webp)

7. Click `issue/102` and redirect to the issue. Because there is no approval flow or manual rollout configured. The issue rolls out automatically. You may click **View change** to see the diff.

   ![bb-issue-done](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-issue-done.webp)

## Advanced Features (Enterprise Plan)

You may upgrade to Enterprise plan to explore more features.

Click **Start free trial** on the left bottom and upgrade to Enterprise plan,
Go to **Instances** to **Assign License** for the existing two instances.

### Manual Rollout

Go to **Environments** > **2.Prod**, Find **Rollout policy** section, and choose **Manual rollout** > **Require rolling out from DBA or workspace admin**.

    ![bb-environment-prod-manual](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-environment-prod-manual.webp)

### Custom Approval

1. Go to **Settings** > **Security & Policy** > **Custom Approval**. Set `Project Owner -> DBA` as Approval flow for **DDL** > **High Risk**.

   ![bb-custom-approval](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-custom-approval.webp)

2. Go to **Settings** > **Security & Policy** > **Risk Center**. Click **Add rule** and click **Load** for the first template. Click **Add**.

   ![bb-risk-center-ddl-high](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-risk-center-ddl-high.webp)

### LATEST Schema Write-back

After schema migration completes, Bytebase will write the latest schema back to the Git repository. So that
the team always has a canonical source of truth for the database schema in Git.

1. Go back to GitHub, and create a new branch with a file `employee##202309261700##ddl##add_country_table_employee.sql` under `bytebase/prod` directory. Copy the following SQL script into the file and commit the change.
   ```sql
   ALTER TABLE "public"."employee"
   ADD COLUMN "country" text NOT NULL DEFAULT '';
   ```
2. Go back to Bytebase, and go to the newly created issue. Because of the settings we made above, it matches the approval flow `Project Owner -> DBA`, for the **Assignee** field, you may leave it empty or choose one.

   ![bb-issue-waiting-for-review](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-issue-waiting-for-review.webp)

3. After following the approval flow to click **Approve**, the banner will show **Waiting for Rollout** instead. The **Assignee** then can click **Rollout**.

4. Go back to GitHub, you'll notice there's a new file `.hr_prod##LATEST.sql` under `bytebase/prod/` with the latest schema written back by Bytebase.

### Schema Drift

Bytebase has built-in [schema drift detection](/docs/change-database/drift-detection/) to detect unexpected schema changes. Let's use the [SQL Editor Admin Mode](/docs/sql-editor/admin-mode/) to simulate this.

1. Click **terminal icon** (SQL Editor) on the top right. You'll be redirected to **SQL Editor**. Click **Admin mode**. Everything you do in this mode is the same as connecting directly to the server, which is not recorded by Bytebase.

2. Select `(Prod) hr_prod` on the left, and paste and run the following script:

   ```sql
       ALTER TABLE "public"."employee"
       ADD COLUMN "credit_card" text NOT NULL DEFAULT '';
   ```

3. Go back to Bytebase Console, and click **Databases** > `hr_prod` under `Prod`. Click **Sync Now**. After seeing the success message, refresh the page. You'll see the schema drift. You may configure auto scan on instance detail page to avoid manual sync.

   ![bb-db-schema-drift](/content/docs/tutorials/database-cicd-best-practice-with-github/bb-db-schema-drift.webp)

4. Go to **Anomaly Center**, and you'll see the Schema drift there too.

## Summary

Now with Bytebase, you have a complete Database CI/CD workflow with GitHub. You can apply this workflow to your own project and customize it to fit your needs. If you have any questions, please feel free join and discuss in [Discord](https://discord.gg/huyw7gRsyA).

## Further Readings

- [The Database CI/CD Best Practice with GitLab](/docs/tutorials/database-cicd-best-practice-with-gitlab)
- [The Database CI/CD Best Practice with Azure DevOps](/docs/tutorials/database-cicd-best-practice-with-azure-devops)
- [The Database CI/CD Best Practice with Bitbucket](/docs/tutorials/database-cicd-best-practice-with-bitbucket)
- [Database as Code - the Good, the Bad and the Ugly](/blog/database-as-code)
