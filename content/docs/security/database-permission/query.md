---
title: Data Query
---

Bytebase users query data from [SQL Editor](/docs/sql-editor/run-queries/). Bytebase can enforce query access control for a particular user at the database, schema or table level.

## Assign Project Querier Role

`Workspace Admin`, `Workspace DBA` or `Project Owner` can manually grant `Project Querier` role to users/groups.

### Assign at Project level

**Select Project** and go to **Manage > Members**. Then **Grant Access**.

![project-members-grant](/content/docs/security/database-permission/query/project-members-grant.webp)

Select Users or Groups, assign `Project Querier` role, choose the database object, Expiration and click **Confirm**.

You can choose the entire database, a particular schema, or a particular table.

![project-members-querier](/content/docs/security/database-permission/query/project-members-querier.webp)

### Assign at Workspace level

`Workspace Admin` can assign `Project Querier` role at the workspace level. This will grant query permission to _all databases_ within _all projects_.

From the workspace page, go to **IAM & Admin > Members**, **Grant Access** to Select users/groups and assign `Project Querier` to them.

![assign-workspace](/content/docs/security/database-permission/query/assign-workspace.webp)

## Request Project Querier Role

<PricingPlanBlock feature_name='QUERY_EXPORT_APPROVAL_WORKFLOW' />

<TutorialBlock url="/docs/tutorials/just-in-time-part1/" title="Just-in-Time Database Access" />

Users can also apply for `Project Querier` role by submitting an issue. Approval flow matches the `Request Querier Role` in [custom approval](/docs/administration/custom-approval/) if configured.

### Request at Project level

Within project page, click **Request Query Role**. You can either choose all databases or specific databases, schema or tables to request for access.

![project-request-querier-role](/content/docs/security/database-permission/query/project-request-querier-role.webp)

Click **OK** and the issue will be created. By configuring [custom approval](/docs/administration/custom-approval/), it will match the corresponding approvers.

![bb-issue-querier-role](/content/docs/security/database-permission/query/bb-issue-querier-role.webp)

After the request is approved, you can query data in SQL Editor from the specified databases before the requested expiration time.

![bb-issue-querier-done](/content/docs/security/database-permission/query/bb-issue-querier-done.webp)

### Request from SQL Editor

You can also request the access within SQL Editor.

Enter SQL Editor. Click **Select a database to start**, and **Show databases without query permissions**, where you can **Request query** for database, schema, or a particular table.

![sql-editor-request](/content/docs/security/database-permission/query/sql-editor-request.webp)

## Restrict data copying in SQL Editor

Applicable to `Workspace Admin` or `Workspace DBA`.

Go to **Environments**, If **Restrict data copying in SQL Editor** is checked, then no one can copy data from databases belonging to that environment via SQL Editor.

![restrict-data-copy](/content/docs/security/database-permission/query/restrict-data-copy.webp)
