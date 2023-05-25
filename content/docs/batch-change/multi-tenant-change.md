---
title: Change Databases from Multiple Tenants
---

<HintBlock type="info">

This feature is only available in the Enterprise Plan.

</HintBlock>

Bytebase allows you to change **a collection of databases with identical schemas**, these databases are often referred as [tenant databases](/docs/concepts/tenant-database).

## Scenarios

Typical scenarios of tenant databases are:

- A Software as a Service (SaaS) provider provides separate database instances for each of its customers (aka. tenants) alongside their application deployments.
- An internal platform team provides multi-region database deployments (e.g. US, EU), and have separate database instances in different deployment environments (e.g. Staging, Prod).

It is often desired to apply schema changes to databases across all tenants since these databases are homogeneous, but in a staged rollout fashion (aka. canary deployment) to minimize the risk of breaking all deployments.

You should consider using tenant databases when there are multiple database instances alongside multiple deployments for the same application.
For example, a software company offers medical record storage services for its customers, hospitals. Each hospital is considered as a tenant, and each tenant has to store their patient data in its own database for regulation or privacy purposes. This feature allows updating database schema for all tenants in a simple and consistent way. Other use cases include multi-location databases for supporting highly-available services where each location is a tenant.

Let's take the hospital example to follow the steps below.

## Prerequisites

- You have a running Bytebase with `Test` and `Prod` environments.
- You have at least two instances of the same database type, one for `Test` environment and others for `Prod` environment.

## Create a Project in Tenant Mode

Tenant projects empowers you to:

1. Roll out schema changes and data updates to mutiple tenant databases by their environments, tenant labels or any combination of them.
2. Progressively roll out through different stages, and only proceed to the next stage when all of rollouts in the current stage are successful.
3. When there is a new tenant database created, it will inherit the same schema structures.

<img src="/content/docs/batch-change/cmt-create-project.webp" width="50%" style={{ margin: '1% 0' }} alt="cmt-create-project" />

## Create Databases with Tenant Labels

Within the project, click **New DB** to create four databases as following and then click **Rollout** and **Resolve** one by one:

![cmt-create-4-db](/content/docs/batch-change/cmt-create-4-db.webp)

- `hospital_test` for `Test` environment with empty **Tenant** field
- `hospital_prod_1` for `Prod` environment with `h1` in **Tenant** field
- `hospital_prod_2` for `Prod` environment with `h2` in **Tenant** field
- `hospital_prod_3` for `Prod` environment with `h3` in **Tenant** field

In real life case, another way is to click **Transfer in DB** to transfer in your existing databases and then go into a specific database to edit the **Tenant**.

<img src="/content/docs/batch-change/cmt-db-edit-tenant.webp" width="65%" style={{ margin: '1% 0' }} alt="cmt-db-edit-tenant" />

## Adjust Deployment Configuration

Within the project, click **Databases** tab and you'll see the default deployment pipeline preview.

![cmt-db-default-tenant](/content/docs/batch-change/cmt-db-default-tenant.webp)

Scroll down and you will see the default deployment config.

![cmt-db-default-tenant-config](/content/docs/batch-change/cmt-db-default-tenant-config.webp)

Adjust the config deployment to the following by specifying Tenant. Besides the two default stages by environments, an extra stage for canary testing is added.

![cmt-db-after-config-tenant-config](/content/docs/batch-change/cmt-db-after-config-tenant-config.webp)

Scroll up and you will see the new pipeline preview.

![cmt-db-after-config-tenant](/content/docs/batch-change/cmt-db-after-config-tenant.webp)

## Alter Schema for Tenant Databases

1. Within the project, click **Alter Schema**. You'll see the popup.

![cmt-alter-schema](/content/docs/batch-change/cmt-alter-schema.webp)

2. Paste the following scripts into the **Raw SQL**, and click **Preview issue**.

```sql
CREATE TABLE `tm1` (
`id` INT COMMENT 'ID' NOT NULL,
`name` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`)
);
```

3. You'll be redirect to new issue preview page. Click **Create**, the issue with the configured pipeline will be created. SQL will be the same for all the tenant databases. Click **Approve** and **Rollout** if needed one database after another.
   ![cmt-create-issue](/content/docs/batch-change/cmt-create-issue.webp)

4. When it comes to stage with multiple databases, you may choose to **Rollout current stage** to rollout all databases under that stage.
   ![cmt-rollout-batch](/content/docs/batch-change/cmt-rollout-batch.webp)

5. Once the issue is completed, all tenant databases will have the same updated schema version.

![cmt-after-alter-schema](/content/docs/batch-change/cmt-after-alter-schema.webp)

## Add a New Database

Within a tenant project, if you add a new database, it will automatically inherit the identical schemas from others.

1. Click **New DB**, and create `hospital_prod_4` for `Prod` environment with `h4` in **Tenant** field.
2. Go to view database `hospital_prod_4`, you'll see the `tm1` table is already there.

![cmt-db-h4-table](/content/docs/batch-change/cmt-db-h4-table.webp)

## Specify Database Name Template

Typically, all tenant databases should have the same database name and will be placed on different database instances. For some use cases, tenant databases need to have different database names and may be on the same or different database instances. Users can define a database name template where the database name should include the tenant name. For example, a database name template can be `{{DB_NAME}}__{{TENANT}}`. If the database name is `hospital_prod`, and there are 3 tenants `h1`, `h2`, `h3`, the database name for the respective tenants are `hospital_prod__h1`, `hospital_prod__h2`, `hospital_prod__h3` having the same schema.

1. Within the project, click **Databases** tab and you'll see the **Tenant Database Name Template** section. Click **Edit**, input `{{DB_NAME}}__{{TENANT}}` and click **Update**.
   ![cmt-db-naming-template-update](/content/docs/batch-change/cmt-db-naming-template-update.webp)

2. Click **New DB**, if the database name doesn't match the template `{{DB_NAME}}__{{TENANT}}`, there will be an error. You need to name it `hospital_prod__h5`. Both `hospital_prod_h5`(separator should have two underscores instead of one) `hospital_prod__5` (tenant name should be h5 instead of 5) will cause error.
   ![cmt-db-name-error](/content/docs/batch-change/cmt-db-name-error.webp)

## GitOps

You can further adopt GitOps to batch change tenant databases.

<DocLinkBlock url="/docs/vcs-integration/tenant-gitops" title="Batch Change Tenant Databases"></DocLinkBlock>
