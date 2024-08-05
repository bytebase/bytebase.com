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

## Change database group

<PricingPlanBlock feature_name='BATCH_CHANGE' />

Bytebase allows you to define a `database group` to change **a collection of databases with identical schemas**. Typical scenarios of using database group are:

- A Software as a Service (SaaS) provider provides separate database instances for each of its customers (aka. tenants) alongside their application deployments.
- For compliance and performance reasons, companies provision separate database instances in US, EU, AP respectively.
- For scaling, companies create partitioned databases.

### Create a database group

1. Within a project, click **Database > Groups** on the left-side bar. Then click **New database group** to create a new database group.

   ![bb-project-groups-create](/content/docs/change-database/batch-change/bb-project-groups-create.webp)

1. Fill in the name and rules for filtering the desired databases. You can enable [Multitenancy](#multitenancy) to enforce extra
   schema consistency.

   ![bb-new-db-group-create-multi-t](/content/docs/change-database/batch-change/bb-new-db-group-create-multi-t.webp)

1. Click **Save**, you'll see the newly created group in the list.

### Batch change databases in a group

1. Within the project, click **Database > Groups** on the left-side bar. Click **Edit Schema**, choose **Database Group**, select the database group you'll operate and click **Next**.

   ![bb-db-group-edit](/content/docs/change-database/batch-change/bb-db-group-edit.webp)

1. An issue with the selected databases will be previewed. Add the SQL in the text field and click **Create**. The issue is created and waiting for approval.

   ![bb-issue-batch-created](/content/docs/change-database/batch-change/bb-issue-batch-created.webp)

### Multitenancy

<HintBlock type="info">

Only applicable if the new database is created via Bytebase.

</HintBlock>

If the database group enables `Multitenancy`, Bytebase will enforce extra schema consistencies:

- If a new database is added to the database group, the new database will be applied with the schema from the first database in the database group.

- Further, if the new database is created via Bytebase when there is an ongoing change to the database group. The new database will be added to the change issue automatically.

  The example below shows we are adding `hr_prod_7` to the existing `hr_prod` database group. And there is an ongoing change
  to the `hr_prod` group.

  ![bb-db-7](/content/docs/change-database/batch-change/bb-db-add-7.webp)

  Bytebase appends `hr_prod_7` to the change as well.

  ![bb-issue-add-7](/content/docs/change-database/batch-change/bb-issue-add-7.webp)
