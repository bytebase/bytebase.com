---
title: Deploy Schema Migration with Rollout Policy
author: Ningjing
updated_at: 2023/11/3 14:15
tags: Tutorial
integrations: General
level: Beginner
estimated_time: '30 mins'
pinned: true
description: Bytebase offers a powerful GUI for schema migration deployments. This tutorial will show you how to use Bytebase to deploy schema migrations with features like SQL Review, custom approval, time scheduling, and more.
---

Bytebase offers a powerful GUI for schema migration deployments. This tutorial will show you how to use Bytebase to deploy schema migrations with features like SQL Review, custom approval, time scheduling, and more.

![graph-4-steps](/content/docs/tutorials/deploy-schema-migration/graph-4-steps.webp)

Bytebase offers **Community**, **Pro** and **Enterprise** [Plans](/pricing). Advanced plans
unlock new capabilities of deploying schema migrations and this tutorial will walk you through them progressively.

### Features covered

- Level 1 - [Automatic SQL Review](/docs/sql-review/overview/) (available in all plans)
- Level 2 - [Rollout Policy](/docs/administration/environment-policy/rollout-policy/) (available in Pro and Enterprise)
- Level 3 - [Custom Approval](/docs/administration/custom-approval/) (available in Enterprise)

### Preparation

1. Make sure your Docker is running, and start the Bytebase Docker container with the following command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

2. Bytebase is running successfully in Docker, and you can visit it via `localhost:8080`. Register an admin account and it will be granted the `workspace admin` role automatically.

### Level 1: Automatic rollout with SQL review (Community Plan)

1. Go to **Environments** > **Test** and **Environments** > **Prod**, you'll see
   1. The `Rollout policy` is `automatic`. **Unless there's some warning or error, the rollout will be automatically executed after the issue is created**.
   2. `SQL Review` is enabled on `Prod` with a sample policy.

![bb-env-rollout-automatic-test-prod](/content/docs/tutorials/deploy-schema-migration/bb-env-rollout-automatic-test-prod.webp)

2. Click `SQL Review Sample Policy` to go to SQL Review policy, there're three rules activated. Let's pay attention to `Enforce NOT NULL constraints on columns` rule, and we'll try to violate it.

![bb-sql-review-sample-policy](/content/docs/tutorials/deploy-schema-migration/bb-sql-review-sample-policy.webp)

3. Go to `Sample Project`, click **Edit Schema**, choose both `Test` and `Prod` databases, and click **Next**. Paste the following SQL statements into **Raw SQL**, and click **Preview issue**.

```sql
ALTER TABLE "public"."employee"
    ADD COLUMN "country" text;
```

4. SQL Review checks will dry run before the issue is created. Here let's create the issue regardless of the dry run result.
5. After the issue is created, SQL Review will run automatically along with some other checks. You'll see there's a warning for the task on `Prod`.

![bb-issue-warning-prod](/content/docs/tutorials/deploy-schema-migration/bb-issue-warning-prod.webp)

![bb-issue-sql-review-warning](/content/docs/tutorials/deploy-schema-migration/bb-issue-sql-review-warning.webp)

6. Click **Edit**, paste this SQL statement and click **Save**. Apply this change to all tasks. The SQL checks will run again, and you'll see the warning disappear and it will roll out automatically.

```sql
ALTER TABLE "public"."employee"
ADD COLUMN "country" text NOT NULL DEFAULT '';
```

![bb-issue-done-free](/content/docs/tutorials/deploy-schema-migration/bb-issue-done-free.webp)

7. Click **View change** to see the diff or go to **Change History** to view all changes.

![bb-issue-done-show-diff](/content/docs/tutorials/deploy-schema-migration/bb-issue-done-show-diff.webp)

![bb-proj-change-list](/content/docs/tutorials/deploy-schema-migration/bb-proj-change-list.webp)

### Level 2: Manual rollout with dedicated roles and scheduled time (Pro Plan)

With Pro Plan, you'll get two additional features:

- Manual rollout policy. You can specify multiple pre-defined roles to manually roll out the change.
- Time scheduling. You can specify a particular time to roll out the change.

To simplify the process, we'll use 14-day enterprise trial here. Click the **Start free trial** to upgrade.

1. Go to **Environments** > **Prod**, choose `Manual rollout by dedicated roles` and check all the roles. Click **Update**.

![bb-env-prod-manual](/content/docs/tutorials/deploy-schema-migration/bb-env-prod-manual.webp)

2. Go to `Sample Project`, click **Edit Schema**, choose both `Test` and `Prod` databases, and click **Next**. Paste the following SQL statements into **Raw SQL**, and click **Preview issue**.

```sql
ALTER TABLE "public"."employee"
    ADD COLUMN "city" text NOT NULL DEFAULT '';
```

3. Click **Create**, and after **Task checks** runs, you'll see the SQL running on `Test` automatically but waiting to run on `Prod`.

![bb-issue-prod-waiting](/content/docs/tutorials/deploy-schema-migration/bb-issue-prod-waiting.webp)

4. Click **Rollout** to trigger directly or set a **Rollout time**.

![bb-proj-set-rollout-time](/content/docs/tutorials/deploy-schema-migration/bb-proj-set-rollout-time.webp)

### Level 3: Manual rollout with custom approval (Enterprise Plan)

If you want the approval flow to be more dynamic based on the context like the type of SQL statements, the affected rows and etc,
then you can configure [custom approval flow](/docs/administration/custom-approval/).

Go to **Instances** and click **Assign License** for both instances. Without doing this, the enterprise plan required for custom approval won't be enabled on instances.

1. Click **Settings** (the gear icon) > **Security & Policy** > **Custom Approval**. Choose `Project Owner -> DBA` as High Risk for DDL.

![bb-custom-approval](/content/docs/tutorials/deploy-schema-migration/bb-custom-approval.webp)

2. Click **the related risk rules** or **Settings** (the gear icon) > **Security & Policy** > **Risk Center**. Click **Add rule**. Set `High` Risk and `DDL` as `The risk for the production environment is considered to be high.`

![bb-risk-center-add-rule](/content/docs/tutorials/deploy-schema-migration/bb-risk-center-add-rule.webp)

3. Click **Settings** (the gear icon) and add a DBA account. Click it in the **Active members** list, and edit its password. You'll need this account later to do the approval.

4. Go to **Environments** > **Prod**, you now unlock the third option for rollout policy `Manual rollout by the last approver from the custom approval flow`. Choose it.

![bb-env-prod-manual-approval](/content/docs/tutorials/deploy-schema-migration/bb-env-prod-manual-approval.webp)

4. Go to `Sample Project`, click **Edit Schema**, choose both `Test` and `Prod` databases, and click **Next**. Paste the following SQL statements into **Raw SQL**, and click **Preview issue**.

```sql
ALTER TABLE "public"."employee"
    ADD COLUMN "district" text NOT NULL DEFAULT '';
```

5. Create the issue and the approval flow is matched. Since it's in the pipeline, it will be brought forward to the `Test` stage to review earlier. Follow its order to approve. `DBA` will be the one to do the rollout.

![bb-issue-custom-approval-waiting](/content/docs/tutorials/deploy-schema-migration/bb-issue-custom-approval-waiting.webp)

### Summary

You have now learned how to use Bytebase to deploy schema migration in a basic way. Bytebase also provides other advanced features for your interests:

- [GitOps](/docs/vcs-integration/overview/) - Observe Git code push events and trigger schema migration;
- [Batch changes](/docs/change-database/batch-change/) - Change multiple databases in a single workflow;
- [Changelist](/docs/changelist/) - Organize and apply changes sequentially, or export them for offline execution.

Join our [Discord channel](https://discord.com/invite/huyw7gRsyA) to discuss.
