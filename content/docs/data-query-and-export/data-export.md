---
title: Data export approval flow
---

Project owners can manually add the role of data exporter to control data export permissions. In Enterprise plan, user can apply for data exporter roles by submitting a request grant issue.

## Add data exporter role manually

In Free and Pro plan, user can add data exporter role manually.

As a project owner, you can go to the project member management page and manually add the role of data exporter.

Before adding the data exporter role, you need to add the data querier role first to ensure that the user has the permission to query the data.

Once the data exporter role is added, the user can export the query result of the specified database in SQL Editor.

![export-data-button-in-sql-editor](/docs/data-query-and-export/export-data-button-in-sql-editor.webp)

## Apply for data exporter role

<HintBlock type="info">

This feature is only available in the Enterprise Plan.

</HintBlock>

In Enterprise plan, users need to apply for data exporter role before exporting data for data security governance.

1. Go to the home page or project list page, and click **Export data**.

   ![request-querier-or-exporter-role](/docs/data-query-and-export/request-querier-or-exporter-role.webp)

2. Fill out the relevant form.

   ![request-exporter-role-form](/docs/data-query-and-export/request-exporter-role-form.webp)

   Including the following information:

   - **Project**: The project that the database belongs to.
   - **Database**: The database you want to export.
   - **Export rows**: The number of rows you want to export. The default is 1000 rows.
   - **Export format**: The format of the exported file. The default is CSV.
   - **Reason**: The reason for applying for the exporter permission.

3. Click **Create** to submit the request.

4. After the request is approved, click **Export** to export the data.

   ![export-data-button](/docs/data-query-and-export/export-data-button.webp)

   The export action only supports one-time export. If you need to export again, you need to submit a new request.
