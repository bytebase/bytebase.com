---
title: Data Query Approval Flow
---

**Project Owners** can always manually add the role of **Project Querier** to control data query permissions. In **Enterprise Plan**, users can apply for **Project Querier** roles by submitting a request grant issue.

## Add Querier Role Manually

As a **Project Owner**, you can go to the project, click **Members** tab, find the user, click `+`  and choose **Project Querier**.
![bb-project-members-add-querier](/content/docs/security/data-query-and-export/bb-project-members-add-querier.webp)

## Apply for Querier Role

<EnterpriseOnlyBlock />

Users can apply for **Project Querier** role by submitting a request query issue.

1. Go to the home page or project page, and click **Request Query**.

   ![bb-home-request-query](/content/docs/security/data-query-and-export/bb-home-request-query.webp)

2. Fill out the relevant form.

   ![bb-request-query-all](/content/docs/security/data-query-and-export/bb-request-query-all.webp)

3. Click **Create** to submit the request.

After the request is approved, you can query the data in SQL Editor from the specified databases before the requested expiration time.

## Apply for Querier Role at Table Level

Users can apply for **Project Querier** role for specific tables.

1. In the request form, choose `Manual Select` for **Database**.

2. Select the databases and click **OK**.
   ![bb-request-query-tables](/content/docs/security/data-query-and-export/bb-request-query-tables.webp)

After the request is approved, you can query the data in SQL Editor from the specified tables before the requested expiration time.
