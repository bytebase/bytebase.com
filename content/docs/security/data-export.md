---
title: Data Export
---

There are two ways to export data:

- Obtain the **Project Exporter** role to export repeatedly.
- Request a one-time export in the **Export Center**.

## Project Exporter Role

`Project Owner` can export data directly from the result panel in SQL Editor. This requires both [`Project Querier`](/docs/security/data-query) and `Project Exporter` roles.

![bb-sql-editor-export](/content/docs/security/data-export/bb-sql-editor-export.webp)

`Project Owner` can Assign `Project Exporter` role to users in **Manage > Members** of the project. You can Manually select databases/shcema/tables and alter Max export rows.

![bb-project-members-grant](/content/docs/security/data-export/bb-project-members-grant.webp)

For **Enterprise Plan**, you can request **Project Exporter** role in **Database > Databases** of the project.

![bb-project-apply-exporter](/content/docs/security/data-export/bb-project-apply-exporter.webp)

![bb-project-request-export-issue](/content/docs/security/data-export/bb-project-request-export-issue.webp)

## One-time Export Request

Enter **Export Center** either within a project or from workspace level, where you **Request Export**, select a database and click **Next**.

![bb-project-export-center](/content/docs/security/data-export/bb-project-export-center.webp)

![bb-export-center](/content/docs/security/data-export/bb-export-center.webp)

You'll be creating an issue. Enable **Encrypt** and set **Password** if needed, fill your query commands in **SQL** block. **Create** the issue. By configuring [custom approval](/docs/administration/custom-approval/), it will match the corresponding approvers.

![bb-1-export-preview](/content/docs/security/data-export/bb-1-export-preview.webp)

After approval, you can click **Export** to download the exported file.

![bb-1-export-export](/content/docs/security/data-export/bb-1-export-export.webp)

The exported issue will be displayed in the **Export Center**.

![bb-1-export-project-list-export](/content/docs/security/data-export/bb-1-export-project-list-export.webp)

![bb-1-export-list-export](/content/docs/security/data-export/bb-1-export-list-export.webp)
