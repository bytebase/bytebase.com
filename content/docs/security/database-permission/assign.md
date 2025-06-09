---
title: Assign a Role
---

You may want to assign a role to a user or group, it can be done at workspace level or project level.

## Workspace Level

At workspace level, as a **Workspace Admin**, click **IAM & Admin > Members** on the left sidebar.

Here you may grant existing workspace roles or project roles to a user or group. For project level roles, it will be applied to all projects in the workspace. User might have 0 project level roles, but they must have at least one workspace level role. By default, a user has **Workspace Member** role.

![bb-workspace-grant-access](/content/docs/security/database-permission/assign/bb-workspace-grant-access.webp)

## Project Level

At project level, as a **Workspace Admin**/**Workspace DBA** or **Project Owner** of the project, click **Manage > Members** on the left sidebar.

Here you may grant existing project roles to a user or group.

![bb-project-grant-access](/content/docs/security/database-permission/assign/bb-project-grant-access.webp)

You can also revoke or edit an assigned role.

![bb-project-revoke-access](/content/docs/security/database-permission/assign/bb-project-revoke-access.webp)