---
title: Data Export
---

Bytebase users obtain `Project Exporter` role to export data repeatedly or request a one-time export in **Export Center**.

## Assign Project Exporter Role

### Project level

**Select Project** and go to **Manage > Members**. `Project Exporter` role can be assigned in **Grant Access**.

![project-exporter-grant](/content/docs/security/data-export/project-exporter-grant.webp)

Select Users or Groups, assign `Project Exporter` role. You can Manually select databases/shcema/tables and alter Max export rows. Choose Expiration and click **Confirm**.

### Workspace level

`Workspace Admin` can assign `Project Exporter` role at the workspace level. This will grant export permission to _all databases_ within _all projects_.

From the workspace page, go to **IAM & Admin > Members**, **Grant Access** to Select users/groups and assign `Project Exporter` to them.

![assign-workspace](/content/docs/security/data-export/assign-workspace.webp)

## Request Project Exporter Role

### Within SQL Editor

Data can be directly exported from result panel in SQL Editor. This requires [`Project Querier`](/docs/security/data-query) besides `Project Exporter` roles, for query permission is the precondition of data export.

![sql-editor](/content/docs/security/data-export/sql-editor.webp)

Without export permission, you'll have to **Request Export**.

![sql-editor-request-export](/content/docs/security/data-export/sql-editor-request-export.webp)

You will be redirected to an issue page. **Create** the issue. After approval, you'll be able to **Export**.

![sql-editor-export](/content/docs/security/data-export/sql-editor-export.webp)

### Project level

<PricingPlanBlock feature_name='QUERY_EXPORT_APPROVAL_WORKFLOW' />

**Request Exporter Role** in **Database > Databases** of the project, where you can Manually select databases/shcema/tables and alter Max export rows.

![request-exporter-role](/content/docs/security/data-export/request-exporter-role.webp)

### One-time Export Request

Enter **Export Center** within a project, where you **Request Export**, select a database and click **Next**.

![export-center](/content/docs/security/data-export/export-center.webp)

You'll be creating an issue. Enable **Encrypt** and set **Password** if needed, fill your query commands in **SQL** block. **Create** the issue. By configuring [custom approval](/docs/administration/custom-approval/), it will match the corresponding approvers.

![export-preview](/content/docs/security/data-export/export-preview.webp)

After approval, you can click **Export** to download the exported file.

![export](/content/docs/security/data-export/export.webp)

The exported issue will be displayed in **Export Center**.

![export-list](/content/docs/security/data-export/export-list.webp)
