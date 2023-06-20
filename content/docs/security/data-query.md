---
title: Data Query Approval flow
---

**Project Owners** can manually add the role of **Project Querier** to control data query permissions. In **Enterprise Plan**, users can apply for **Project Querier** roles by submitting a request grant issue.

## Add Querier role manually

As a **Project Owner**, you can go to the project, click **Settings**, find the **Management members** section, and manually add the role of **Project Querier**.
![add-new-member-with-querier-role](/content/docs/security/data-query-and-export/add-new-member-with-querier-role.webp)

## Apply for Querier role

<EnterpriseOnlyBlock />

Users can apply for **Project Querier** role by submitting a request grant issue.

1. Go to the home page or project list page, and click **Request query**.

   ![request-querier-or-exporter-role](/content/docs/security/data-query-and-export/request-querier-or-exporter-role.webp)

2. Fill out the relevant form.

   ![request-querier-role-form](/content/docs/security/data-query-and-export/request-querier-role-form.webp)

   Including the following information:

   - **Project**: The project that the database belongs to.
   - **Database**: The database you want to query. You can select all or multiple databases.
   - **Expire days**: The number of days the query permission is valid. The default is 7 days.
   - **Reason**: The reason for applying for the query permission.

3. Click **Create** to submit the request.

After the request is approved, you can query the data in SQL Editor from the specified databases before the requested expiration time.

## Apply for Querier role at table level

Users can apply for **Project Querier** role for specific tables.

1. In the request form, click **Manual Select** on the **Database** row.
   ![request-querier-manual-select](/content/docs/security/data-query-and-export/request-querier-manual-select.webp)

2. Click **Select**, check the tables you need on the left side and click **Confirm**.
   ![request-query-table-level](/content/docs/security/data-query-and-export/request-query-table-level.webp)

After the request is approved, you can query the data in SQL Editor from the specified tables before the requested expiration time.
