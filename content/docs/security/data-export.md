---
title: Data Export Approval Flow
---

There are two ways to export data:

- Obtain the **Project Exporter** role to export frequently.
- Request a one-time export in the **Export Center**.

## Project Exporter Role

**Project Owner** can always export data directly from the result panel in SQL Editor. You, as a developer, in order to view the result and export in SQL Editor, must have both [**Project Querier**](/docs/security/data-query) (to query and view the result) and **Project Exporter** roles.
   ![bb-sql-editor-export](/content/docs/security/data-query-and-export/bb-sql-editor-export.webp)

**Project Owner** can assign the **Project Exporter** role to users on **Manage > Members** in the project.

   ![bb-project-members-grant](/content/docs/security/data-query-and-export/bb-project-members-grant.webp)

For **Enterprise Plan**, you can also request **Project Querier** role on **Database > Databases** in the project.

   ![bb-project-apply-exporter](/content/docs/security/data-query-and-export/bb-project-apply-exporter.webp)

   ![bb-project-request-export-issue](/content/docs/security/data-query-and-export/bb-project-request-export-issue.webp)
## One-time Export Request

Sometimes, you only need to export data once. In this case, you can request a one-time export in the **Export Center**.

1. There are two entries: one is **Export Center** within a project and the other is in the global **Export Center**.

   ![bb-project-export-center](/content/docs/security/data-query-and-export/bb-project-export-center.webp)

   ![bb-export-center](/content/docs/security/data-query-and-export/bb-export-center.webp)

1. After clicking **Request Export**, select the database and click **Next**.

   ![bb-export-data-select-db](/content/docs/security/data-query-and-export/bb-export-data-select-db.webp)

1. An issue preview will be displayed. Fill in the SQL to query the data, and click **Run checks** to auto-run SQL review. Select the **Format**, enable **Encrypt** if needed and click **Create**.

   ![bb-1-export-preview](/content/docs/security/data-query-and-export/bb-1-export-preview.webp)

1. The issue will be created. By configuring [custom approval](/docs/administration/custom-approval/), it will match the corresponding approvers.

   ![bb-1-export-created](/content/docs/security/data-query-and-export/bb-1-export-created.webp)

1. After the corresponding approvers approve the issue, you can click **Export** to download the exported file.

   ![bb-1-export-export](/content/docs/security/data-query-and-export/bb-1-export-export.webp)

1. The exported issues will be displayed in the **Export Center**.

   ![bb-1-export-project-list-export](/content/docs/security/data-query-and-export/bb-1-export-project-list-export.webp)

   ![bb-1-export-list-export](/content/docs/security/data-query-and-export/bb-1-export-list-export.webp)
