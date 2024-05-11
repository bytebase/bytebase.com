---
title: Core Concepts
---

![Bytebase data model](/content/docs/core-concepts/data-model-v2.webp)

## Workspace

The entire Bytebase instance runs a single workspace. Most of the time, the `Workspace` concept is transparent to the user since there is only one per Bytebase instance. We mention here because it's a common concept among SaaS products, and in Bytebase, the term `Workspace` is interchangeable with Bytebase instance. We do NOT plan to support multiple workspaces in Bytebase in the foreseeable future. You can run multiple Bytebase instances to achieve the similar result.

## User

A user in the Bytebase workspace is defined as a member. `member` models after a subject performing the operation. Most of the time, user corresponds to a human being. Bytebase also has a special robot user named "Bytebase" (ID=1) which conducts automatic operations.

Internally, Bytebase uses term `Principal` instead of `User` because former is more accurate to describe both human user and robot user.

## Role

See [Roles and Permissions](/docs/concepts/roles-and-permissions).

## Environment

`Environment` models after various environments in the development pipeline such as test, staging, prod. Most of the time, there is a 1:1 mapping between `Environment` and the real environment.

Most of the time, `Admins` and `DBAs` work with the `Environment`.

## Database Instance

`Database Instance` or simply `Instance` models after a single database instance which is usually accessed via a host:port address. A typical database instance could be your on-premises MySQL instance, an AWS RDS instance etc. Each `Database Instance` belongs to an `Environment`

Most of the time, `Admins` and `DBAs` work with the `Database Instance`.

## Database

`Database` refers to a single database from a Database Instance. A database is the one created by 'CREATE DATABASE xxx'. A database always belongs to a single `Project`.

Most of the time, `Developers` and `DBAs` work with the `Database`.

## Project

`Project` is a logic unit to model a team effort. It's similar to the project concept in other dev tools such as Jira, GitLab. `Project` is the container to group logically related `Databases`, `Issues` and `Users` together. In Bytebase, A `Database` or an `Issue` always belongs to a single `Project`. `Project` is also the peering entity with the VCS repository to setup [GitOps workflow](/docs/vcs-integration/add-gitops-connector).

Most of the time, `Developers` work with the `Project`.

## Issue

`Issue` represents a specific collaboration activity between `Member` and `DBA` such as creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

In Bytebase, `Issue` is optimized for **database domain**. An `Issue` always belongs to a `Project`. A single `Issue` is only dealing with a particular `Database Instance` (e.g. creating a database on a database instance). Except for creating database issue, most other issues are also associated with an existing `Database` (e.g. altering a table on a database).

Internally, the issue progression is represented by a `Pipeline`. A `Pipeline` contains multiple `Stages`, each usually corresponds to an `Environment`. A `Stage` contains multiple `Tasks` dealing with a specific database operation such as altering table. A single `Task` can run multiple times (e.g. failed first and then retry). Each run is represented by a `Task Run`.

## Sheet

`Sheet` is the entity where users store, run and share the SQL scripts. A paritcular sheet belongs
to a project and may or may not attach a database context. Users interacts with the Sheet from
[SQL Editor](/docs/sql-editor/manage-sql-scripts).

## Database Group and Table Group

A list of databases / tables usually having the same schema structure. Examples like per-tenant databases,
partitioned databases/tables. They are used in:

- []
- [Batch change](/docs/change-database/batch-change) to
  change many databases in a consistent manner.
