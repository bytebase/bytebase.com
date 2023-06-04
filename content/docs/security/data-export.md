---
title: Data Export Approval Flow
---

**Project Owners** can manually add the role of data exporter to control data export permissions. In **Enterprise Plan**, users can apply for data exporter roles by submitting a request grant issue.

## Add Exporter role manually

As a **Project Owner**, you can go to the project, click **Settings**, find the **Management members** section, and manually add the role of **Project Exporter**.

Before adding the **Project Exporter** role, you need to add the **Project Querier** role first to ensure that the user has permission to query the data.

In **Free or Pro Plan**, once the **Project Exporter** role is added, the user can export the query result of the specified database in SQL Editor.

![export-data-button-in-sql-editor](/content/docs/security/data-query-and-export/export-data-button-in-sql-editor.webp)

In **Enterprise Plan**, data export should be done by applying for **Exporter** role.

## Apply for Exporter role

<HintBlock type="info">

This feature is only available in the Enterprise Plan.

</HintBlock>

In **Enterprise plan**, users need to apply for **Project Exporter** role before exporting data for data security governance.

1. Go to the home page or project list page, and click **Export data**.

   ![request-querier-or-exporter-role](/content/docs/security/data-query-and-export/request-querier-or-exporter-role.webp)

2. Fill out the relevant form.

   ![request-exporter-role-form](/content/docs/security/data-query-and-export/request-exporter-role-form.webp)

   Including the following information:

   - **Project**: The project that the database belongs to.
   - **Database**: The database you want to export.
   - **Export rows**: The number of rows you want to export. The default is 1000 rows.
   - **Export format**: The format of the exported file. The default is CSV.
   - **Reason**: The reason for applying for the exporter permission.

3. Click **Create** to submit the request.

4. After the request is approved, click **Export** to export the data.

   ![export-data-button](/content/docs/security/data-query-and-export/export-data-button.webp)

   The export action only supports one-time export. If you need to export again, you need to submit a new request.
