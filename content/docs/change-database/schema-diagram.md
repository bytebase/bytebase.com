---
title: Schema Diagram
---

<HintBlock type="info">

This feature is in beta.

</HintBlock>

Bytebase's Schema Diagram provides a database [Entity-Relation Diagram](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model).

## View Database Schema Diagram

Click **Schema Diagram** in the database detail page, you will see the Schema Diagram in a popup dialog.

![database-detail-page](/docs/change-database/schema-diagram/database-detail-page.webp)

![schema-diagram-dialog](/docs/change-database/schema-diagram/schema-diagram-dialog.webp)

**Drag the canvas** to move. Use **mouse wheel**, **trackpad** or **click the -/+ buttons** to zoom in and out.

Use the **search box** to filter databases by name.

![filter-databases](/docs/change-database/schema-diagram/filter-databases.webp)

Click the **Focus** button in the schema tree or the table header to toggle table highlighting.

![focus-tables](/docs/change-database/schema-diagram/focus-tables.webp)

Click the **Fit content within view** button to restore the initial position and zoom.

![fit-content-within-view](/docs/change-database/schema-diagram/fit-content-within-view.webp)

Click the **Screenshot** button to export current view as a PNG file.

![screenshot-button](/docs/change-database/schema-diagram/screenshot-button.webp)

## Working with Schema Editor

While using [Schema Editor](/docs/change-database/schema-editor), you may also preview the database schema and changes via Schema Diagram. Click the **Schema Diagram** and you will switch to the Schema Diagram tab.

![schema-editor-integration](/docs/change-database/schema-diagram/schema-editor-integration.webp)

Your temporary changes in Schema Editor will be highlighted and colorized to help you previewing schema changes.

![preview-schema-change](/docs/change-database/schema-diagram/preview-schema-change.webp)

Clicking on the **column name**, **column type** and **the pencil icon** beside the table name will navigate you to the corresponding editing interface in Schema Editor.

![edit](/docs/change-database/schema-diagram/edit.webp)
