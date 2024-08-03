---
title: Batch Change
---

Bytebase allows you to change a collection of databases in a single workflow. These databases usually have a homogenous structure while belonging to different development environments, geographic locations, SaaS tenants, data centers or data partitions.

## Change databases from multiple environments

A development pipeline usually consists of multiple environments.
Each environment has its isolated database to store the respective data. A schema change will be propagated from each database following the development pipeline. You may have multiple databases in one stage as well.

In Bytebase, you can select multiple databases from different environments to apply the database change.

    ![bb-db-edit-schema](/content/docs/change-database/batch-change/bb-db-edit-schema.webp)

Then Bytebase will then create an issue to track the multi-database changes. You may roll out changes one database after another or batch rollout databases at the same stage.

## Change databases from multiple tenants

<PricingPlanBlock feature_name='BATCH_CHANGE' />

Bytebase allows you to create a database group in `Multitenancy` mode and change **a collection of databases with identical schemas**, these databases are often referred to as `tenant databases`. Typical scenarios of tenant databases are:

- A Software as a Service (SaaS) provider provides separate database instances for each of its customers (aka. tenants) alongside their application deployments.
- An internal platform team provides multi-region database deployments (e.g. US, EU), and has separate database instances in different deployment environments (e.g. Staging, Prod).

You should consider using tenant databases when there are multiple database instances alongside multiple deployments for the same application. For example, a software company offers HR systems for its customers. Each customer is considered a tenant, and each tenant has to store their employee data in its own database for regulation or privacy purposes. This feature allows updating the database schema for all tenants in a simple and consistent way. Other use cases include multi-location databases for supporting highly available services where each location is a tenant.

### Step 1 - Create a tenant database group

If you are responsible for managing horizontally partitioned databases that are distributed across multiple data centers worldwide, you can create `database groups` to manage these databases effectively and easily.

1. Within a project, click **Database > Groups** on the left-side bar. Then click **New database group** to create a new database group.

   ![bb-project-groups-create](/content/docs/change-database/batch-change/bb-project-groups-create.webp)

2. Fill in the name and rules for filtering the desired databases. There is a option **Multitenancy** to enable the database group to be used for tenant databases. If it's checked, then all the databases to be added to this group are tenant databases which have the same schema.

   ![bb-new-db-group-create-multi-t](/content/docs/change-database/batch-change/bb-new-db-group-create-multi-t.webp)

3. Click **Save**, you'll see the newly created group in the list.

### Step 2 - Batch change databases in a group

1. Within the project, click **Database > Groups** on the left-side bar. Click **Edit Schema**, choose **Database Group**, select the database group you'll operate and click **Next**.

   ![bb-db-group-edit](/content/docs/change-database/batch-change/bb-db-group-edit.webp)

1. An issue with the selected databases will be previewed. Add the SQL in the text field and click **Create**. The issue is created and waiting for approval.

   ![bb-issue-batch-created](/content/docs/change-database/batch-change/bb-issue-batch-created.webp)

### Step 3 - Add a new database to the group while there is a change going on

1. Go to **Database > Databases**, click **New DB**, and create a new database according to the database group rules. The database will be added to the database group automatically.

   ![bb-db-7](/content/docs/change-database/batch-change/bb-db-add-7.webp)

1. Go back to the issue page, now you can see the newly added database in the issue. It's because we have enabled the `Multitenancy` option when creating the database group which ensures all the databases in the group have the same schema.

   ![bb-issue-add-7](/content/docs/change-database/batch-change/bb-issue-add-7.webp)

1. Click **Approve** approve the issue and then click **Rollout**. The schema change will be applied to all the databases in the group. To verify the change, you can check the database schema in SQL Editor.

   ![bb-issue-7-done](/content/docs/change-database/batch-change/bb-issue-7-done.webp)

   ![bb-sql-editor-7](/content/docs/change-database/batch-change/bb-sql-editor-7.webp)

### Step 4- Add a new database to the group when there is no change going on

1. Go to **Database > Databases**, click **New DB**, and create another database according to the database group rules. The database will be added to the database group automatically.

1. Go to SQL Editor and check the schema of the newly added database. You'll see the schema is the same as the other databases in the group.

![bb-sql-editor-8](/content/docs/change-database/batch-change/bb-sql-editor-8.webp)
