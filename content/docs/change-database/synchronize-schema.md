---
title: Synchronize Schema
---

<HintBlock type="info">

For the Free Plan, you can only sync from the latest schema version.
Syncing from arbitrary schema versions is available in the Pro Plan and Enterprise Plan.

</HintBlock>

<TutorialBlock url="/docs/tutorials/how-to-synchronize-database-schemas" title="How to Synchronize Database Schemas" />

<HintBlock type="warning">

This feature is in beta. It only supports MySQL, PostgreSQL, TiDB, and Oracle.

MySQL currently supports `Table`, `Index`, `Constraint`, `View`, `Event`, `Trigger`, `Function`, and `Procedure`.

PostgreSQL currently supports `Schema`, `Table`, `Index`, `Constraint`, `Sequence`, `Extension`, `Function`, `Trigger`, and `Enum Type`.

TiDB currently supports `Table`, `Index`, `Constraint`, and `View`.

Oracle currently supports `Table`, `Index`, and `Constraint`.

</HintBlock>

Bytebase supports synchronizing a specified schema version of one database to others. To provide a better user experience, Bytebase displays the schema differences between the two selected databases and generates the suggested DDL statements (e.g. ALTER TABLE).

## How to use

### Step 1 - Go to the "Sync schema" page

Click the "Sync schema" button in the left navigation bar.

### Step 2 - Select source schema

You need to select the project and source database schema version that you want to synchronize.

![select-source-schema](/content/docs/change-database/synchronize-schema/select-source-schema.webp)

<HintBlock type="info">

In the Enterprise Plan, you can select an arbitrary schema version from the migration history. In other plans, you can only select the latest schema version.

</HintBlock>

### Step 3 - Select target databases

Select the target databases that will be synchronized with the chosen schema version in the previous step.

![select-target-databases](/content/docs/change-database/synchronize-schema/select-target-databases.webp)

After you have selected a target database, Bytebase will show a schema diff between the two databases and generate the DDL statements. And you can further edit the generated content.

![diff-preview](/content/docs/change-database/synchronize-schema/diff-preview.webp)

### Step 4 - Preview issue

With the generated DDL statements, you can preview and create an "Alter Schema" issue. This kicks off the [change workflow](/docs/change-database/change-workflow) for the applied database.
