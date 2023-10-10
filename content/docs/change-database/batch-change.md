---
title: Batch Change
---

Bytebase allows you to change a collection of databases in a single workflow. These databases usually have a homogenous structure while belong to different development environments, geographic locations, SaaS tenants or data centers. Bytebase supports three most typical batch change scenarios:

- [Change databases from multiple environments](#change-databases-from-multiple-environments)
- [Change databases from multiple tenants](#change-databases-from-multiple-tenants)
- [Change databases from database groups](#change-databases-from-database-groups)

While multi-environment change also supports multiple databases in one environment, the main difference between these two is that for multi-tenant change, all the databases in the project have identical schemas.

## Change databases from multiple environments

A development pipeline usually consists of multiple environments.
Each environment has its own isolated database to store the respective data. A schema change will be propagated from each databases following the development pipeline. You may have multiple databases in one stage as well.

In Bytebase, you can select multiple databases from different environments to apply the database change.

![Select database from multiple environments](/content/docs/change-database/batch-change/multi-environment-database-select.webp)

Then Bytebase will then create an issue to track the multi-database changes. You may roll out changes one database after another or batch rollout databases at the same stage.

## Change databases from multiple tenants

<EnterpriseOnlyBlock />

Bytebase allows you to change **a collection of databases with identical schemas**, these databases are often referred as [tenant databases](/docs/concepts/batch-mode/#tenant-database).

### Scenarios

Typical scenarios of tenant databases are:

- A Software as a Service (SaaS) provider provides separate database instances for each of its customers (aka. tenants) alongside their application deployments.
- An internal platform team provides multi-region database deployments (e.g. US, EU), and have separate database instances in different deployment environments (e.g. Staging, Prod).

It is often desired to apply schema changes to databases across all tenants since these databases are homogeneous, but in a staged rollout fashion (aka. canary deployment) to minimize the risk of breaking all deployments.

You should consider using tenant databases when there are multiple database instances alongside multiple deployments for the same application.
For example, a software company offers medical record storage services for its customers, hospitals. Each hospital is considered as a tenant, and each tenant has to store their patient data in its own database for regulation or privacy purposes. This feature allows updating database schema for all tenants in a simple and consistent way. Other use cases include multi-location databases for supporting highly-available services where each location is a tenant.

Let's take the hospital example to follow the steps below.

### Prerequisites

- You have a running Bytebase with `Test` and `Prod` environments.
- You have at least two instances of the same database type, one for `Test` environment and others for `Prod` environment.

### Create a Project in Tenant Mode

Tenant projects empowers you to:

1. Roll out schema changes and data updates to mutiple tenant databases by their environments, tenant labels or any combination of them.
2. Progressively roll out through different stages, and only proceed to the next stage when all of rollouts in the current stage are successful.
3. When there is a new tenant database created, it will inherit the same schema structures.

<img src="/content/docs/change-database/batch-change/cmt-create-project.webp" width="50%" style={{ margin: '1% 0' }} alt="cmt-create-project" />

### Create Databases with Tenant Labels

Within the project, click **New DB** to create four databases as following and then click **Rollout** and **Resolve** one by one:

![cmt-create-4-db](/content/docs/change-database/batch-change/cmt-create-4-db.webp)

- `hospital_test` for `Test` environment with empty **Tenant** field
- `hospital_prod_1` for `Prod` environment with `h1` in **Tenant** field
- `hospital_prod_2` for `Prod` environment with `h2` in **Tenant** field
- `hospital_prod_3` for `Prod` environment with `h3` in **Tenant** field

In real life case, another way is to click **Transfer in DB** to transfer in your existing databases and then go into a specific database to edit the **Tenant**.

<img src="/content/docs/change-database/batch-change/cmt-db-edit-tenant.webp" width="65%" style={{ margin: '1% 0' }} alt="cmt-db-edit-tenant" />

### Adjust Deployment Configuration

Within the project, click **Databases** tab and you'll see the default deployment pipeline preview.

![cmt-db-default-tenant](/content/docs/change-database/batch-change/cmt-db-default-tenant.webp)

Scroll down and you will see the default deployment config.

![cmt-db-default-tenant-config](/content/docs/change-database/batch-change/cmt-db-default-tenant-config.webp)

Adjust the config deployment to the following by specifying Tenant. Besides the two default stages by environments, an extra stage for canary testing is added.

![cmt-db-after-config-tenant-config](/content/docs/change-database/batch-change/cmt-db-after-config-tenant-config.webp)

Scroll up and you will see the new pipeline preview.

![cmt-db-after-config-tenant](/content/docs/change-database/batch-change/cmt-db-after-config-tenant.webp)

### Alter Schema for Tenant Databases

1. Within the project, click **Alter Schema**. You'll see the popup.

![cmt-alter-schema](/content/docs/change-database/batch-change/cmt-alter-schema.webp)

2. Paste the following scripts into the **Raw SQL**, and click **Preview issue**.

```sql
CREATE TABLE `tm1` (
`id` INT COMMENT 'ID' NOT NULL,
`name` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`)
);
```

3. You'll be redirect to new issue preview page. Click **Create**, the issue with the configured pipeline will be created. SQL will be the same for all the tenant databases. Click **Approve** and **Rollout** if needed one database after another.
   ![cmt-create-issue](/content/docs/change-database/batch-change/cmt-create-issue.webp)

4. When it comes to stage with multiple databases, you may choose to **Rollout current stage** to rollout all databases under that stage.
   ![cmt-rollout-batch](/content/docs/change-database/batch-change/cmt-rollout-batch.webp)

5. Once the issue is completed, all tenant databases will have the same updated schema version.

![cmt-after-alter-schema](/content/docs/change-database/batch-change/cmt-after-alter-schema.webp)

### Add a New Database

Within a tenant project, if you add a new database, it will automatically inherit the identical schemas from others.

1. Click **New DB**, and create `hospital_prod_4` for `Prod` environment with `h4` in **Tenant** field.
2. Go to view database `hospital_prod_4`, you'll see the `tm1` table is already there.

![cmt-db-h4-table](/content/docs/change-database/batch-change/cmt-db-h4-table.webp)

### GitOps

You can further adopt GitOps to batch change tenant databases. Head over to the doc [Batch Change Tenant Databases
](/docs/vcs-integration/tenant-gitops) for more details.

## Change databases from database groups

<EnterpriseOnlyBlock />

If you are responsible for managing horizontally partitioned databases that are distributed across multiple data centers worldwide, applying database changes from [database groups](/docs/concepts/batch-mode/#database-group) empowers you to manage these databases effectively and easily.

Follow the steps below to navigate through the process.

### Create a Database Group

1. Within a **tenant** project, click **New database group** in the **Database Groups** tab.

![bc-db-group-create](/content/docs/change-database/batch-change/bc-db-group-create.webp)

2. Fill in the required information. This includes details such as database group name, environment and rules for filtering the desired databases.

![bc-db-group-info](/content/docs/change-database/batch-change/bc-db-group-info.webp)

3. Click **Save**, you'll see the newly created `hotel_global` database group as below.

![bc-db-group-done](/content/docs/change-database/batch-change/bc-db-group-done.webp)

### Create a Table Group

1. Within a **tenant** project, click **New table group** in the **Database Groups** tab.

![bc-tb-group-create](/content/docs/change-database/batch-change/bc-tb-group-create.webp)

2. Fill in the required information.

![bc-tb-group-info](/content/docs/change-database/batch-change/bc-tb-group-info.webp)

3. Click **Save** to create the newly created `booking_global` table group.

Navigate to the details page of the `hotel_global` database group, you'll see the `booking_global` table group is already there.

![bc-tb-group-done](/content/docs/change-database/batch-change/bc-tb-group-done.webp)

### Batch Alter Schema All Tables in a Table Group

1. Within a **tenant** project, click **Alter Schema**.
2. Click **Munaul selection** and select **Database Group** to locate he `hotel_global` database group.
3. Select the `hotel_global` database group.

![bc-db-group-select](/content/docs/change-database/batch-change/bc-db-group-select.webp)

4. Enter the desired SQLs in the **Raw SQL** input box. For this example, enter the following SQL into the **Raw SQL** input box.

```sql
ALTER TABLE `booking_global`
    ADD COLUMN `status` boolean NOT NULL;
```

![bc-db-group-sql](/content/docs/change-database/batch-change/bc-db-group-sql.webp)

5. Click **Preview issue** to review the issue details on the issue details page.

![bc-db-group-preview](/content/docs/change-database/batch-change/bc-db-group-preview.webp)

6. Click **Create** to finalize the alter schema issue creation.
7. Click **Rollout current stage** to apply the schema change.

Let's examine the change history of physical tables in the `booking_global` table group with the following screenshots, you can see the newly added 'status' column in each physical table.

![bc-db-group-result](/content/docs/change-database/batch-change/bc-db-group-result.webp)
