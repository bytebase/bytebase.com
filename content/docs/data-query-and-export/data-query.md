---
title: Data query approval flow
---

Bytebase supports data security governance functions within the organization and provides corresponding approval workflows. You can apply for permissions or approve permission requests submitted by other users.

Project owners can manually add the role of data queriers to control data query permissions. In Enterprise plan, user can apply for data query roles by submitting a request grant issue.

## Add data querier role manually

As a project owner, you can go to the project member management page and manually add the role of data queriers.

![add-new-member-with-querier-role](/docs/data-query-and-export/add-new-member-with-querier-role.webp)

## Apply for data querier role

<HintBlock type="info">

This feature is only available in the Enterprise Plan.

</HintBlock>

In Enterprise plan, user can apply for data querier role by submitting a request grant issue.

1. Go to the home page or project list page, and click **Request query**.

   ![request-querier-or-exporter-role](/docs/data-query-and-export/request-querier-or-exporter-role.webp)

2. Fill out the relevant form.

   ![request-querier-role-form](/docs/data-query-and-export/request-querier-role-form.webp)

   Including the following information:

   - **Project**: The project that the database belongs to.
   - **Database**: The database you want to query. You can select all or multiple databases.
   - **Expire days**: The number of days the query permission is valid. The default is 7 days.
   - **Reason**: The reason for applying for the query permission.

3. Click **Create** to submit the request.

After the request is approved, you can query the data in the specified database within the specified time.
