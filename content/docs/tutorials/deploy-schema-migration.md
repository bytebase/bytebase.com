---
title: Deploy Schema Migration with Rollout Policy
author: Adela
updated_at: 2024/10/10 12:00
tags: Tutorial
integrations: General
category: 'Database CI/CD (GUI)'
level: Beginner
estimated_time: '30 mins'
featured: true
description: Bytebase offers a powerful GUI for schema migration deployments. This tutorial will show you how to use Bytebase to deploy schema migrations with features like SQL Review, custom approval, time scheduling, and more.
---

Bytebase offers a powerful GUI for schema migration deployments. This tutorial will show you how to use Bytebase to deploy schema migrations with features like SQL Review, custom approval, time scheduling, and more.

![4-steps-graph](/content/docs/tutorials/deploy-schema-migration/4-steps-graph.webp)

Bytebase offers **Community**, **Pro** and **Enterprise** [Plans](/pricing). Advanced plans
unlock new capabilities of deploying schema migrations and this tutorial will walk you through them progressively.

### Features covered

- Level 1 - [Automatic SQL Review](/docs/sql-review/overview/) (available in all plans)
- Level 2 - [Rollout Policy](/docs/administration/environment-policy/rollout-policy/) (available in all plans)
- Level 3 - [Custom Approval](/docs/administration/custom-approval/) (available in Enterprise)

### Preparation

1. Make sure your Docker is running, and start the Bytebase Docker container with the following command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

1. Bytebase is running successfully in Docker, and you can visit it via `localhost:8080`. Register an admin account and it will be granted the `workspace admin` role automatically.

### Level 1: Automatic rollout with SQL review (Community Plan)

1. Within Workspace, go to **Environments** > **Test** and **Environments** > **Prod**, you'll see

   - Check `automatic` as `Rollout policy`. Unless there's warning or error, rollout will be automatically executed after an issue is created.
   - `SQL Review` is enabled on `Prod` with a sample policy (with 20 rules).

   ![bb-env-community-test-prod](/content/docs/tutorials/deploy-schema-migration/bb-env-community-test-prod.webp)

1. Click **SQL Review Policy** to enter **SQL Review** under **CI/CD** section, where three rules have been activated. We'll intentionally violate the Column rule `Enforce NOT NULL constraints on columns`.

1. Go to `Sample Project` from top left. Go to **Database** > **Databases**, choose both `hr_prod` and `hr_test` databases to **Edit Schema**. Paste this command into **SQL** block, and **Create** this issue on top right:

   ```sql
   ALTER TABLE "public"."employee"
       ADD COLUMN "country" text;
   ```

1. SQL Review will run automatically along with some other checks. You'll see a warning for the task on `Prod`. Click `Prod Stage` of the pipe above for details.

   ![prod-warning-detail](/content/docs/tutorials/deploy-schema-migration/prod-warning-detail.webp)

1. Edit the SQL statement with this:

   ```sql
   ALTER TABLE "public"."employee"
   ADD COLUMN "country" text NOT NULL DEFAULT '';
   ```

1. Now you'll see the warning disappear and the issue rolls out automatically. Click **View change** to see the diff.

   ![view-change](/content/docs/tutorials/deploy-schema-migration/view-change.webp)

### Level 2: Manual rollout with dedicated roles(Community Plan)

You can specify multiple pre-defined roles to manually roll out the change.

If you want **Time scheduling** feature, you will need to upgrade to **Pro Plan**.

1. Within Workspace, go to **Environments** > **Prod**. Uncheck `Automatic`. Choose several roles according to your needs and also check `Issue Creator`. Click **Update** on bottom right.

   ![bb-env-manual](/content/docs/tutorials/deploy-schema-migration/bb-env-manual.webp)

1. Go to `Sample Project`, enter **Database** > **Databases** to **Edit Schema** for both databases. Paste this command into **SQL** block and **Create**.

   ```sql
   ALTER TABLE "public"."employee"
       ADD COLUMN "city" text NOT NULL DEFAULT '';
   ```

1. **Task checks** runs. SQL runs on `Test` automatically but waits to run on `Prod`. Click **Rollout** to trigger directly.

   ![issue-await](/content/docs/tutorials/deploy-schema-migration/issue-await.webp)

### Level 3: Manual rollout with custom approval (Enterprise Plan)

<HintBlock type="info">

You can [request a Enterprise trial](/contact-us/).

</HintBlock>

If you want the approval flow to be more dynamic based on the context like the type of SQL statements, the affected rows and etc, configure [custom approval flow](/docs/administration/custom-approval/).

Within Workspace, go to **Instances** and choose both instances to **Assign License**. Without doing this, the enterprise plan required for custom approval wouldn't be enabled on instances.

1. Go to **CI/CD** > **Custom Approval**. Choose `Project Owner -> DBA` as High Risk for DDL.

   ![custom-approval](/content/docs/tutorials/deploy-schema-migration/custom-approval.webp)

2. Click **the related risk rules** beside or **CI/CD** > **Risk Center**. **Add** on top right. Set `High` Risk and `DDL` as `The risk for the production environment is considered to be high.`

   ![risk-center-add-rule](/content/docs/tutorials/deploy-schema-migration/risk-center-add-rule.webp)

3. Click **IAM&Admin > Users&Groups** and add a DBA account. Click it in the **Active members** list, and edit its password. You'll need this account later to do the approval.

4. Within Workspace, go to **Environments** > **Prod**. Choose `Last Issue Approver` as `Rollout policy`.

5. Go to `Sample Project`, choose both databases to **Edit Schema**. Paste this command into **SQL** block and **Create**.

```sql
ALTER TABLE "public"."employee"
    ADD COLUMN "district" text NOT NULL DEFAULT '';
```

5. The approval flow is matched. Since it's in the pipeline, it will be brought forward to the `Test` stage to review earlier. Follow its order to approve. A `DBA` will be the one to do the rollout. If you didn't have a DBA in your Worksapce, you can Logout and register another DBA account, Login as the DBA to experience the entire workflow.

![custom-approval-await](/content/docs/tutorials/deploy-schema-migration/custom-approval-await.webp)

### Summary

You have now learned how to use Bytebase to deploy schema migration in a basic way. Bytebase also provides other advanced features for your interests:

- [GitOps](/docs/vcs-integration/overview/) - Observe Git code push events and trigger schema migration;
- [Batch changes](/docs/change-database/batch-change/) - Change multiple databases in a single workflow;
- [Changelist](/docs/changelist/) - Organize and apply changes sequentially, or export them for offline execution.

Join our [Discord channel](https://discord.com/invite/huyw7gRsyA) to discuss.
