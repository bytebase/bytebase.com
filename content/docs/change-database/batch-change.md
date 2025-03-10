---
title: Batch Change
---

<TutorialBlock url="/docs/tutorials//batch-change-with-database-group" title="Batch Change with Database Group" />

Bytebase allows you to change a collection of databases in a single workflow. These databases usually have a homogenous structure while belonging to different development environments, geographic locations, SaaS tenants, data centers or data partitions.

## Change databases from multiple environments

A development pipeline usually consists of multiple environments.
Each environment has its isolated database to store the respective data. A schema change will be propagated from each database following the development pipeline. You may have multiple databases in one stage as well.

In Bytebase, you can select multiple databases from different environments to apply the database change.

    ![bb-db-edit-schema](/content/docs/change-database/batch-change/bb-db-edit-schema.webp)

Then Bytebase will then create an issue to track the multi-database changes. You may roll out changes one database after another or batch rollout databases at the same stage.

## Database group

<PricingPlanBlock feature_name='BATCH_CHANGE' />

If you always change a fixed set of databases together, you can pre-define a `database group` to enclose those databases. Typical scenarios of using database group are:

- A Software as a Service (SaaS) provider provides separate database instances for each of its customers (aka. tenants) alongside their application deployments.
- For compliance and performance reasons, companies provision separate database instances in US, EU, AP respectively.
- For scaling, companies create partitioned databases.

### Create a database group

1. Within a project, click **Database > Groups** on the left-side bar. Then click **New database group** to create a new database group.

   ![bb-project-groups-create](/content/docs/change-database/batch-change/bb-project-groups-create.webp)

1. Fill in the name and rules for filtering the desired databases. You can enable [Multitenancy](#multitenancy) to enforce extra schema consistency.

   ![bb-new-db-group-with-raw](/content/docs/change-database/batch-change/bb-new-db-group-with-raw.webp)

   _If you want to use a **database label** as a filter condition, you may use **raw expression** with the following structure:_

   ```
   Where resource.labels.YOUR_LABEL_KEY == "YOUR_LABEL_VALUE"
   and has(resource.labels.YOUR_LABEL_KEY)
   ```

1. Click **Save**, you'll see the newly created group in the list.

### Batch change databases in a group

1. Within the project, click **Database > Groups** on the left-side bar. Click **Edit Schema**, choose **Database Group**, select the database group you'll operate and click **Next**.

   ![bb-db-group-edit](/content/docs/change-database/batch-change/bb-db-group-edit.webp)

1. An issue with the selected databases will be previewed. Add the SQL in the text field and click **Create**. The issue is created and waiting for approval.

   ![bb-issue-batch-created](/content/docs/change-database/batch-change/bb-issue-batch-created.webp)

### Multitenancy

<HintBlock type="warning">

This feature is deprecated since 3.5.0.

</HintBlock>

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

## Deployment Config

<HintBlock type="warning">

This feature is deprecated since 3.5.0.

</HintBlock>

`Deployment Config` determines how databases or database groups are deployed in order.

![deployment-config](/content/docs/change-database/batch-change/deployment-config.webp)

The above screenshot defines a 3 staged rollout:

1. 1st stage roll outs the prod databases from Asia.
1. 2nd stage roll outs the prod databases from Europe.
1. 3rd stage roll outs the prod databases from North America.

![staged-rollout](/content/docs/change-database/batch-change/staged-rollout.webp)

If **all changed databases** are included by the deployment config, Bytebase will roll out them in order
according to the defined deployment config.

If only some of the changed databases are included by the deployment config, Bytebase will not follow the deployment config.
Instead Bytebase will roll out them according to their corresponding environments.
