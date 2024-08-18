---
title: Create a Project
---

**Project** is a logic unit to model a team effort. It's similar to the project concept in other dev tools such as Jira, GitLab. **Project** is the container to group logically related **Databases**, **Issues** and **Users** together.

In Bytebase, A **Database** or an **Issue** always belongs to a single **Project**.

Make sure you have configured environments, instances, and members properly at the workspace level.

## Prepare a database in the project

Bytebase periodically syncs the databases' info for all managed instances. To make changes to a database, you need to place it in a user project first. A new project is still empty right after it's created, you need to fill it with some Databases.

Go to the project page where you can **create a new database** or **transfer an existing database into the project**.

![manage-db](/content/docs/get-started/step-by-step/create-a-project/manage-db.webp)

![manage-db-2](/content/docs/get-started/step-by-step/create-a-project/manage-db-2.webp)

## Manage the members in the project

A project is only visible to its related **users**.

Go to the project page. Click **Manage** > **Members** on the left sidebar, where you're `Project Owner` by default. **Grant Access** to add new project members from workspace level accounts. You can assign project-level roles to the members.