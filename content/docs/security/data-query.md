---
title: Data Query
---

`Workspace Admin` or `Project Owner` can always manually grant `Project Querier` role to users. 

Meanwhile, as is more often the case, users sometimes find their query access limited. When this happens, they can apply for `Project Querier` role by submitting a request grant issue on the spot.

## Assign `Project Querier` Role

For all plans, `Workspace Admin` or `Project Owner` can manually assign `Project Querier` role to users or groups.

### Assign generally within Workspace -> IAM & Admin

As `Workspace Admin`, you can assign `Project Querier` role.

Within Workspace level, go to **Members** section under **IAM & Admin** on the left-side bar. **Grant Access** to Select users and Assign `Project Querier` to them.

Thus they will be granted access to all databases within all projects.

![assign-workspace](/content/docs/security/data-query/assign-workspace.webp)

### Assign specifically within a certain project

On the other hand, **Select Project** and go to **Manage > Members**. Then you can **Grant Access** as a `Project Owner`.

![project-members-grant](/content/docs/security/data-query/project-members-grant.webp)

Select Users or Groups, Assign role of `Project Querier`, choose Databases, Exipration and click **Confirm**.

As to the choice of Databases within this Project level, it can actually be several Databases, Schema or Tables in particular.

![project-members-querier](/content/docs/security/data-query/project-members-querier.webp)

## Request Project Querier Role

For Enterprise plan, you, as a developer, can request `Project Querier` role by submitting a request query issue.

### Within Project level

Within project page, click **Request Query Role**. You can either choose all databases or specific databases, schema or tables to request for access.

![project-request-querier-role](/content/docs/security/data-query/project-request-querier-role.webp)

Click **OK** and the issue will be created. By configuring [custom approval](/docs/administration/custom-approval/), it will match the corresponding approvers.
   
![bb-issue-querier-role](/content/docs/security/data-query/bb-issue-querier-role.webp)

After the request is approved, you can query data in SQL Editor from the specified databases before the requested expiration time.
   
![bb-issue-querier-done](/content/docs/security/data-query/bb-issue-querier-done.webp)

### Within SQL Editor

You can also request the access within SQL Editor.

Enter Bytebase SQL Editor from any **SQL Editor** button. **Select a database to start**, and **Show databases without query permissions**, where you can **Request query** for each of the databases. The request can be specified only to the databases level, meaning you can only request access for the whole database, but not the schema or tables under it.

![sql-editor-request](/content/docs/security/data-query/sql-editor-request.webp)

Choose the databases you want to request access for, then click **OK**. An issue will be created, just wait for it to be approved and you will be able to access those data.

![sql-editor-issue](/content/docs/security/data-query/sql-editor-issue.webp)

## Restrict data copying in SQL Editor

Applicable to `Workspace Admin` or `Workspace DBA`.

Go to **Environments**, If **Restrict data copying in SQL Editor** is checked, then no one can copy data from databases belonging to that environment via SQL Editor.

![restrict-data-copy](/content/docs/security/data-query/restrict-data-copy.webp)
