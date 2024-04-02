---
title: Batch Change
---

<TutorialBlock url="/docs/tutorials/batch-change-with-database-group" title="Batch Change with Database Group" />

Bytebase allows you to change a collection of databases in a single workflow. These databases usually have a homogenous structure while belong to different development environments, geographic locations, SaaS tenants, data centers or data partitions.

## Change databases from multiple environments

A development pipeline usually consists of multiple environments.
Each environment has its own isolated database to store the respective data. A schema change will be propagated from each databases following the development pipeline. You may have multiple databases in one stage as well.

In Bytebase, you can select multiple databases from different environments to apply the database change.

![Select database from multiple environments](/content/docs/change-database/batch-change/multi-environment-database-select.webp)

Then Bytebase will then create an issue to track the multi-database changes. You may roll out changes one database after another or batch rollout databases at the same stage.

## Change databases from multiple tenants

<PricingPlanBlock feature_name='BATCH_CHANGE' />

Bytebase allows you to create a project in `batch` mode and change **a collection of databases with identical schemas**, these databases are often referred as `tenant databases`. Typical scenarios of tenant databases are:

- A Software as a Service (SaaS) provider provides separate database instances for each of its customers (aka. tenants) alongside their application deployments.
- An internal platform team provides multi-region database deployments (e.g. US, EU), and have separate database instances in different deployment environments (e.g. Staging, Prod).

You should consider using tenant databases when there are multiple database instances alongside multiple deployments for the same application. For example, a software company offers HR systems for its customers. Each customer is considered as a tenant, and each tenant has to store their employee data in its own database for regulation or privacy purposes. This feature allows updating database schema for all tenants in a simple and consistent way. Other use cases include multi-location databases for supporting highly-available services where each location is a tenant.

### Create a project in batch mode

Select `batch` mode when creating a project. You can also change it later under the project settings.

<img src="/content/docs/change-database/batch-change/create-project.webp" width="50%" style={{ margin: '1% 0' }} alt="cmt-create-project" />

### Create a database group

If you are responsible for managing horizontally partitioned databases that are distributed across multiple data centers worldwide, you can create `database groups` to manage these databases effectively and easily.

1. Within a **batch** project, click **New database group** in the **Database Groups** tab.

![db-group-create](/content/docs/change-database/batch-change/db-group-create.webp)

2. Fill in the required information. This includes details such as database group name, environment and rules for filtering the desired databases.

![db-group-info](/content/docs/change-database/batch-change/db-group-info.webp)

3. Click **Save**, you'll see the newly created `all-hr-group` database group as below.

![db-group-done](/content/docs/change-database/batch-change/db-group-done.webp)

### Create a table group

1. Within a **batch** project, click **New table group** in the **Database Groups** tab.

![tb-group-create](/content/docs/change-database/batch-change/tb-group-create.webp)

2. Fill in the required information.

![tb-group-info](/content/docs/change-database/batch-change/tb-group-info.webp)

3. Click **Save** to create the newly created `all-department` table group.

Navigate to the details page of the `all-hr-group` database group, you'll see the `all-department` table group is already there.

![tb-group-done](/content/docs/change-database/batch-change/tb-group-done.webp)

### Batch edit schema all tables in a table group

1. Within a **batch** project, click **Edit Schema**.
2. Click **Manual selection** and select **Database Group** to locate he `all-hr-group` database group.
3. Select the `all-hr-group` database group.

![db-group-select](/content/docs/change-database/batch-change/db-group-select.webp)

4. Enter the desired SQLs in the **Raw SQL** input box. For this example

```sql
ALTER TABLE `all-department`
    ADD COLUMN `head` TEXT NOT NULL;
```

Notice we are referring the table group id `all-department` instead of the table name here.

![db-group-sql](/content/docs/change-database/batch-change/db-group-sql.webp)

5. Click **Preview issue** to review the issue details on the issue details page. You will notice the table group is expanded into the underlying tables. Since there are 6 tables under the group, 1 per each database, thus Bytebase creates 6 tasks.

![db-group-preview](/content/docs/change-database/batch-change/db-group-preview.webp)

## Deployment config

<PricingPlanBlock feature_name='BATCH_CHANGE' />

It is often desired to apply schema changes to databases across all tenants since these databases are homogeneous, but in a staged rollout fashion (aka. canary deployment) to minimize the risk of breaking all deployments.

For batch mode project, you can configure deployment config under **Project Settings**. In the example below, we are creating
a 3-stage deployment config to roll out changes to Asia, Europe, North America progressively in the production environment:

1. The 1st stage contains 2 databases in `prod` environment with the `location=asia` label.
2. The 2nd stage contains 2 databases in `prod` environment with the `location=eu` label.
3. The 3rd stage contains 2 databases in `prod` environment with the `location=na` label.

![deployment-config-setting](/content/docs/change-database/batch-change/deployment-config-setting.webp)

Then you can choose to roll our changes using the deployment config.

![deployment-config-select](/content/docs/change-database/batch-change/deployment-config-select.webp)

And Bytebase creates the staged rollout accordingly.

![deployment-config-issue](/content/docs/change-database/batch-change/deployment-config-issue.webp)
