---
title: Data Export Approval Flow
---

**Project Owner** can always export data directly from the result panel in SQL Editor. However, for **Project Exporter**, the behavior is different depending on the plan.
   ![bb-request-export-owner](/content/docs/security/data-query-and-export/bb-request-export-owner.webp)
## Enterprise Plan

You need to have **Project Querier** role first, and then click **Request Export** either from the result panel in SQL Editor or from project page.
   ![bb-request-export-querier-sql-editor](/content/docs/security/data-query-and-export/bb-request-export-querier-sql-editor.webp)

   ![bb-homepage-request-export](/content/docs/security/data-query-and-export/bb-homepage-request-export.webp)

### How to Request Export

1. After clicking **Request Export**, fill out the relevant form. There're two methods: `SQL` and `Databases`.
   ![bb-request-export-sql-db](/content/docs/security/data-query-and-export/bb-request-export-sql-db.webp)

2. Click **Create** to submit the request and wait for approval.
   ![bb-request-export-waiting](/content/docs/security/data-query-and-export/bb-request-export-waiting.webp)

### How to Download in Export Center
Once the request is approved, you can go to the **Export Center** to download the exported file.

   ![bb-export-center](/content/docs/security/data-query-and-export/bb-export-center.webp)

   The export action only supports one-time export. If you need to export again, you need to submit a new request.

## Free or Pro Plan
- **Project Querier** can't download data nor request export. The only way to export data is to ask **Project Owner** to assign **Project Exporter** role to you.

   ![bb-export-sql-editor-no-perm](/content/docs/security/data-query-and-export/bb-export-sql-editor-no-perm.webp)

- **Project Exporter** can export data directly from the result panel in SQL Editor. You need to have **Project Querier** role first to access data and the result panel.
### How to Add Exporter Role Manually

As a **Project Owner**, you can go to the project, and click **Members** tab. Find the user, click `+`  and choose **Project Exporter**. 
