---
title: Permission
---

<TutorialBlock url="/docs/tutorials/api-user-database-permission" title="User and Database Permissions with Bytebase API" />

|                       |                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------- |
| Workspace IAM Service | https://api.bytebase.com/#tag/workspaceservice/GET/v1/workspaces/{workspace}:getIamPolicy |
| Project IAM Service   | https://api.bytebase.com/#tag/projectservice/GET/v1/projects/{project}:getIamPolicy       |
| Role Service          | https://api.bytebase.com/#tag/roleservice/GET/v1/roles                                    |
| Auth Service          | https://api.bytebase.com/#tag/authservice/GET/v1/users                                    |
| Group Service         | https://api.bytebase.com/#tag/groupservice/GET/v1/groups                                  |

Bytebase employs RBAC and has 2 permission levels: **Workspace Level** and **Project Level**. **Permissions** are granted to **Roles**, and **Roles** are assigned to **Users** and **Groups**. Permission details such as expiration
time are stored in [CEL (Common Expression Language)](https://cel.dev).

If you have custom reporting requirements, you can call the Bytebase permission related API.
