---
title: Roles and Permissions
---

<TutorialBlock url="/docs/tutorials/how-to-manage-roles" title="How to Manage Roles" />

## Overview

Bytebase employs RBAC (Role-Based-Access-Control). Permissions are assigned to roles and roles are
granted to the users and groups.

**Workspace Roles**

Built-in roles: `Workspace Admin`, `Workspace DBA`, `Workspace Member`.

The workspace role maps to the roles at the organization level. Every Bytebase user has `Workspace Member` role.
Users can also be granted `Workspace Admin`, `Workspace DBA`. These 2 roles should be granted judiciously though.

**Project Roles**

- Built-in roles: `Project Owner`, `Project Developer`, `Project Releaser`, `SQL Editor User` (previously called `Project Querier`), `Project Exporter`, `Project Viewer`.
- [Custom roles](/docs/administration/custom-roles/).

In addition to the inherent `Workspace Member` role, most users will be granted project roles. These roles
allow users to perform specific database operations.

<HintBlock type="info">

To grant users a project role for all the projects, grant that project role at the workspace level.

</HintBlock>

![org-role-mapping](/content/docs/rbac/org-role-mapping.webp)

Above diagram describes the mapping between an engineering org and the corresponding roles in the Bytebase workspace. Note, a particular user can be assigned multiple roles as well:

- A user can only be assigned multiple workspace roles.
- In a particular project, a user can be assigned multiple project roles. A user can also be assigned different project roles in the different projects.

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
| Manage database access control      |        | ✔️  | ✔️    |
| Manage IM integration               |        |     | ✔️    |
| Change logo                         |        |     | ✔️    |

## Project roles

Any user can create project. By default, the project creator is granted the `Project Owner` role.
`Workspace DBA` and `Workspace Admin` assume the `Project Owner` role for all projects.

| Project Permission           | SQL Editor User | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ---------------------------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Sync sheet from VCS          |                 |                  | ✔️                | ✔️            | ✔️            | ✔️              |
| Change project role          |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Edit project                 |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Archive project              |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Configure UI/GitOps workflow |                 |                  |                   | ✔️            | ✔️            | ✔️              |

## Database permissions

Bytebase does not define database specific roles. Whether a user can perform certain action to the database is based on the user's Workspace role and the role of the project owning the database.

| Database Permission | SQL Editor User | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ------------------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Query               | ✔️              |                  |                   | ✔️            | ✔️            | ✔️              |
| Export              |                 | ✔️               |                   | ✔️            | ✔️            | ✔️              |
| Edit database label |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Transfer database   |                 |                  |                   | ✔️            | ✔️            | ✔️              |

## Sheet permissions

User can save sheets from [SQL Editor](/docs/sql-editor/overview). A sheet always belongs to a project. Sheet has three visibility levels:

- Private
- Project
- Public

### Private Sheet

| Permission | Creator | SQL Editor User | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ---------- | ------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Star       | ✔️      |                 |                  |                   |               |               |                 |
| Read       | ✔️      |                 |                  |                   |               |               |                 |
| Write      | ✔️      |                 |                  |                   |               |               |                 |
| Delete     | ✔️      |                 |                  |                   |               |               |                 |

### Project Sheet

| Permission | Creator | SQL Editor User | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ---------- | ------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Star       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |
| Read       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |
| Write      | ✔️      |                 |                  |                   | ✔️            | ✔️            | ✔️              |
| Delete     | ✔️      |                 |                  |                   | ✔️            | ✔️            | ✔️              |

### Public Sheet

| Permission | Creator | SQL Editor User | Project Exporter | Project Developer | Project Owner | Others |
| ---------- | ------- | --------------- | ---------------- | ----------------- | ------------- | ------ |
| Star       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️     |
| Read       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️     |
| Write      | ✔️      |                 |                  |                   | ✔️            |        |
| Delete     | ✔️      |                 |                  |                   | ✔️            |        |

## Issue permissions

| Issue Permission          | Assignee | Creator | SQL Editor User | Project Exporter | Project Developer | Project Owner | Workspace DBA | Workspace Admin |
| ------------------------- | -------- | ------- | --------------- | ---------------- | ----------------- | ------------- | ------------- | --------------- |
| Create issue              | N/A      | N/A     |                 | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |
| Re-assign issue           | ✔️       | ✔️      |                 |                  |                   |               | ✔️            | ✔️              |
| Change issue status       | ✔️       |         |                 |                  |                   | Depends\*     | ✔️            | ✔️              |
| Edit name and description | ✔️       | ✔️      |                 |                  |                   |               | ✔️            | ✔️              |
| Edit SQL Statement        |          | ✔️      |                 |                  |                   |               |               |                 |
| Subscribe/Unsubscribe     | ✔️       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |
| Add comment               | ✔️       | ✔️      | ✔️              | ✔️               | ✔️                | ✔️            | ✔️            | ✔️              |

\* `Project Owner` can change issue status when the current active [Environment Rollout Policy](/docs/administration/environment-policy/rollout-policy) is set to **Require manual rolling out**.
