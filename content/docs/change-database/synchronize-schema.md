---
title: Synchronize Schema
---

<HintBlock type="warning">

This feature is in beta and only available for MySQL and PostgreSQL.

Synchronize Schema for MySQL currently supports synchronizing `Table`, `Index`, `Constraint`, `View`, `Event`, `Trigger`, and `Function` objects.

Synchronize Schema for PostgreSQL currently supports synchronizing `Schema`, `Table`, `Index`, `Constraint`, `Sequence`, `Extension`, `Function`, `Trigger`, and `Enum Type` objects.

</HintBlock>

Bytebase supports synchronizing a specified schema version of one database to another. To provide a better user experience, Bytebase displays the schema differences between the two selected databases and generates the suggested DDL statements (e.g. ALTER TABLE).

## How to use

The entry of `Sync Schema` is in the quick action button group on the home page and project detail page. After clicking, you will see the following dialog.

![sync-schema-dialog](/docs/change-database/synchronize-schema/sync-schema-dialog.webp)

### Step 1 - Select project

### Step 2 - Select schema version

The schema version is selected from the database's migration history.

<HintBlock type="info">

In the Enterprise Plan, you can select an arbitrary schema version from the migration history. In other plans, you can only select the latest schema version.

</HintBlock>

### Step 3 - Apply to database

Select the database that will be synchronized with the chosen schema version in the previous step.

After you have selected a schema and database, Bytebase will show a schema diff between the two databases and generate the DDL statements. And you can further edit the generated content.

### Step 4 - Preview issue

With the generated DDL statements, you can preview and create an "Alter Schema" issue. This kicks off the [change workflow](/docs/change-database/change-workflow) for the applied database.
