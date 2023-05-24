---
title: Schema Editor
---

<HintBlock type="warning">

This feature is in beta and only available for MySQL and PostgreSQL.

Schema Editor for MySQL currently supports editing `Table` and `Column` objects.

Schema Editor for PostgreSQL currently supports editing `Schema`, `Table` and `Column` objects.

</HintBlock>

Bytebase's Schema Editor provides a spreadsheet-like editor to view and edit database structure. Users first use the Schema Editor to prepare the schema changes, then those changes will be converted into SQL statements and go through the [change workflow](/docs/change-database/change-workflow).

## How to use

By clicking on **Alter Schema** in the Quick Action panel and selecting the database, you will see the Schema Editor dialog.

![schema-editor-dialog](/content/docs/change-database/schema-editor/schema-editor-dialog.webp)

### Create table

To create a new table:

1. Select a database and click the **New Table** on the top of the table list tab.
   ![create-table-button](/content/docs/change-database/schema-editor/create-table-button.webp)
1. Enter the table name.
1. Add new column by clicking the **Add Column** on the top of column list tab.
   ![add-column-button](/content/docs/change-database/schema-editor/add-column-button.webp)
1. Specify the column's attributes: name, data type, default, comment, nullable, primary key and foreign key.
1. Click **Preview Issue**, then Bytebase will go to the issue creating page with the generated SQL statement.

### Alter table

To alter a table:

1. Open the table editor tab by clicking the table list.
1. Rename the table name by clicking the **Rename** dropdown item in table tree node.
   ![table-rename-button](/content/docs/change-database/schema-editor/table-rename-button.webp)
1. Add new column by clicking on the **Add Column**.
1. Specify the new column's attributes: name, data type, default, comment, nullable, primary key and foreign key.
1. Alter the existing column's attributes, if needed.
1. Click **Preview Issue**, then Bytebase will go to the issue creating page with the generated SQL statement.

### Drop table

To drop an existing table:

1. Hover to the table and click the **Drop Table** dropdown item, or the **Trash** button for the table row.
   ![drop-table-button](/content/docs/change-database/schema-editor/drop-table-button.webp)
1. Click **Preview Issue**, then Bytebase will go to the issue creating page with the generated SQL statement.
