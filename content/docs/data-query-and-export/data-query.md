---
title: Data Query Approval flow
---

**Project Owners** can manually add the role of **Project Querier** to control data query permissions. In **Enterprise Plan**, users can apply for **Project Querier** roles by submitting a request grant issue.

## Add Querier role manually

As a **Project Owner**, you can go to the project, click **Settings**, find the **Management members** section, and manually add the role of **Project Querier**.
![add-new-member-with-querier-role](/content/docs/data-query-and-export/add-new-member-with-querier-role.webp)

## Apply for Querier role

<HintBlock type="info">

This feature is only available in the Enterprise Plan.

</HintBlock>

Users can apply for **Project Querier** role by submitting a request grant issue.

1. Go to the home page or project list page, and click **Request query**.

   ![request-querier-or-exporter-role](/content/docs/data-query-and-export/request-querier-or-exporter-role.webp)

2. Fill out the relevant form.

   ![request-querier-role-form](/content/docs/data-query-and-export/request-querier-role-form.webp)

   Including the following information:

   - **Project**: The project that the database belongs to.
   - **Database**: The database you want to query. You can select all or multiple databases.
   - **Expire days**: The number of days the query permission is valid. The default is 7 days.
   - **Reason**: The reason for applying for the query permission.

3. Click **Create** to submit the request.

After the request is approved, you can query the data in the specified database within the specified time.
