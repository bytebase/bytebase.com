---
title: Data Query Approval Flow
---

**Project Owners** can always manually add the role of **Project Querier** to control data query permissions. In **Enterprise Plan**, users can apply for **Project Querier** roles by submitting a request grant issue.

## Assign Project Querier Role

For all plans, **Project Owners** can manually assign the **Project Querier** role to users or groups.

1. As a **Project Owner**, you can go to the project, click **Manage > Members** and then click `Grant Access`.
   ![bb-project-members-grant](/content/docs/security/data-query-and-export/bb-project-members-grant.webp)
1. Select the user or group, assign the role of **Project Querier**, choose the databases, exipration and click **Confirm**.
   ![bb-project-members-querier](/content/docs/security/data-query-and-export/bb-project-members-querier.webp)

## Request Project Querier Role

For **Enterprise plan**, you, as a developer, can request **Project Querier** role by submitting a request query issue.

1. Go to the project page, and click **Request Query Role**.

   ![bb-project-apply-querier.png](/content/docs/security/data-query-and-export/bb-project-apply-querier.webp)

1. Fill out the form, you can either choose all databases or specific databases or tables.

   ![bb-project-request-querier-role-all](/content/docs/security/data-query-and-export/bb-project-request-querier-role-all.webp)

   ![bb-project-request-querier-role-table](/content/docs/security/data-query-and-export/bb-project-request-querier-role-table.webp)

1. Click **OK** and the issue will be created. By configuring [custom approval](/docs/administration/custom-approval/), it will match the corresponding approvers.
   ![bb-issue-querier-role](/content/docs/security/data-query-and-export/bb-issue-querier-role.webp)

1. After the request is approved, you can query the data in SQL Editor from the specified databases before the requested expiration time.
   ![bb-issue-querier-done](/content/docs/security/data-query-and-export/bb-issue-querier-done.webp)

