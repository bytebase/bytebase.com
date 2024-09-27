---
title: Roles and Permissions
---

<TutorialBlock url="/docs/tutorials/how-to-manage-roles" title="How to Manage Roles" />

## Overview

Bytebase employs RBAC (Role-Based-Access-Control) and provides two role sets at the workspace and project level:

- Workspace roles: `Admin`, `DBA`, `Member`.
- Project roles: `Owner`, `Developer`, `Releaser`, `Querier`, `Exporter`, `Viewer`.

The workspace role maps to the role in an organization, while the project level role maps to the role in a specific team or project. Every user is assigned a workspace role, and if a particular user is involved in a particular project, then she will also be assigned a project role accordingly.

![org-role-mapping](/content/docs/rbac/org-role-mapping.webp)

Above diagram describes the mapping between an engineering org and the corresponding roles in the Bytebase workspace. Note, a particular user can be assigned multiple roles as well:

- A user can only be assigned one of the workspace roles.
- In a particular project, a user can be assigned one of the project roles, while a user can be assigned different project roles in the different projects.

Real-world scenarios:

- Organizations may not establish a dedicated DBA or platform engineering group. In such case, usaually the application engineering group head and the tech leads will wear those hats. Say a user named Alice can be a `Workspace DBA` and a `Project Owner` for Project Apollo at the same time.

- An application developer could be involved in multiple projects. In such case, that engineer would also be assigned project roles in different projects respectively. Say a user named Bob can be a `Workspace Member`, a `Project Owner` for Project Apollo and a `Project Developer` for Project Mars at the same time.

## Workspace roles

By default, the first registered user is granted the `Admin` role, all following registered users are granted `Member` role. `Admin` can update any user's role later.

| Workspace Permission                | Member | DBA | Admin |
| ----------------------------------- | ------ | --- | ----- |
| Change own name and password        | ✔️     | ✔️  | ✔️    |
| Add new user                        |        |     | ✔️    |
| View all users                      | ✔️     | ✔️  | ✔️    |
| Change any user's role              |        |     | ✔️    |
| De-activate/re-activate user        |        |     | ✔️    |
| Change any user's name and password |        |     | ✔️    |
| Add environment                     |        | ✔️  | ✔️    |
| View all environments               | ✔️     | ✔️  | ✔️    |
| Edit environment                    |        | ✔️  | ✔️    |
| Reorder environment                 |        | ✔️  | ✔️    |
| Archive environment                 |        | ✔️  | ✔️    |
| View all instances                  |        | ✔️  | ✔️    |
| Add instance                        |        | ✔️  | ✔️    |
| Edit instance                       |        | ✔️  | ✔️    |
| Archive instance                    |        | ✔️  | ✔️    |
| Sync instance schema                |        | ✔️  | ✔️    |
| Create database                     |        | ✔️  | ✔️    |
| View all databases                  |        | ✔️  | ✔️    |
| Create project                      | ✔️     | ✔️  | ✔️    |
| View all projects                   |        | ✔️  | ✔️    |
| Create issue                        |        | ✔️  | ✔️    |
| View all issues                     |        | ✔️  | ✔️    |
| Become issue assignee               |        | ✔️  | ✔️    |
| Re-assign issue                     |        | ✔️  | ✔️    |
| Add comment to all issues           |        | ✔️  | ✔️    |
| Subscribe to all issues             |        | ✔️  | ✔️    |
| Alter schema                        |        | ✔️  | ✔️    |
| Change data                         |        | ✔️  | ✔️    |
| Configure SQL Review Policy         |        | ✔️  | ✔️    |
| Manage version control system (VCS) |        |     | ✔️    |
| Manage sensitive data               |        | ✔️  | ✔️    |
| Manage database acccess control     |        | ✔️  | ✔️    |
| Manage IM integration               |        |     | ✔️    |
| Change logo                         |        |     | ✔️    |

## Project roles

Any user can create project. By default, the project creator is granted the `Project Owner` role.
`Workspace DBA` and `Workspace Admin` assume the `Project Owner` role for all projects.

| Project Permission           | Project Querier | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ---------------------------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Sync sheet from VCS          |                 |                  | ✔️                | ✔️            | ✔️            | ✔️              |
| Change project role          |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Edit project                 |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Archive project              |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Configure UI/GitOps workflow |                 |                  |                   | ✔️            | ✔️            | ✔️              |

## Database permissions

Bytebase does not define database specific roles. Whether a user can perform certain action to the database is based on the user's Workspace role and the role of the project owning the database.

| Database Permission | Project Querier | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ------------------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Query               | ✔️              |                  |                   | ✔️            | ✔️            | ✔️              |
| Export              |                 | ✔️               |                   | ✔️            | ✔️            | ✔️              |
| Take manual backup  |                 |                  | ✔️                | ✔️            | ✔️            | ✔️              |
| Enable backup       |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Edit database label |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Transfer database   |                 |                  |                   | ✔️            | ✔️            | ✔️              |

## Sheet permissions

User can save sheets from [SQL Editor](/docs/sql-editor/overview). A sheet always belongs to a project. Sheet has three visibility levels:

- Private
- Project
- Public

### Private Sheet

| Permission | Creator | Project Querier | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ---------- | ------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Star       | ✔️      |                 |                  |                   |               |               |                 |
| Read       | ✔️      |                 |                  |                   |               |               |                 |
| Write      | ✔️      |                 |                  |                   |               |               |                 |
| Delete     | ✔️      |                 |                  |                   |               |               |                 |

### Project Sheet

| Permission | Creator | Project Querier | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ---------- | ------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Star       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |
| Read       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |
| Write      | ✔️      |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Delete     | ✔️      |                 |                  |                   | ✔️            | ✔️            | ✔️              |

### Public Sheet

| Permission | Creator | Project Querier | Project Exporter | Project Developer | Project Owner | Others |
| ---------- | ------- | --------------- | ---------------- | ----------------- | ------------- | ------ |
| Star       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️     |
| Read       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️     |
| Write      | ✔️      |                 |                  |                   | ✔️            |        |
| Delete     | ✔️      |                 |                  |                   | ✔️            |        |

## Issue permissions

| Issue Permission          | Assignee | Creator | Project Querier | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ------------------------- | -------- | ------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Create issue              | N/A      | N/A     | ✔️              | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |
| Re-assign issue           | ✔️       | ✔️      |                 |                  |                   |               | ✔️            | ✔️              |
| Change issue status       | ✔️       |         |                 |                  |                   | Depends\*     | ✔️            | ✔️              |
| Edit name and description | ✔️       | ✔️      |                 |                  |                   |               | ✔️            | ✔️              |
| Edit SQL Statement        |          | ✔️      |                 |                  |                   |               |               |                 |
| Subscribe/Unsubscribe     | ✔️       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |
| Add comment               | ✔️       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |

\* `Project Owner` can change issue status when the current active [Environment Rollout Policy](/docs/administration/environment-policy/rollout-policy) is set to **Require manual rolling out**.
