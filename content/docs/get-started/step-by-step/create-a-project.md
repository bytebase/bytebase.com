---
title: Create a Project
---

`Project` is a logic unit to model a team effort. It's similar to the project concept in other dev tools such as Jira, GitLab. `Project` is the container to group logically related `Databases`, `Issues` and `Users` together. In Bytebase, A `Database` or an `Issue` always belongs to a single `Project`.

![bb-sample-project](/content/docs/get-started/step-by-step/create-a-project/bb-sample-project.webp)

This document guides you in creating a project, transfering a database into the project and assigning members. Make sure you have configured environments, instances, and members properly at the workspace level.

## Step 1 - Create a project

1. Click **Projects** on the navigation bar.
2. Click **Add Project**.
3. Enter **Project Name** and **Key**. Choose **Standard** Mode.
4. Click **Create**, and you will be redirected to the new project page.

![bb-create-new-project](/content/docs/get-started/step-by-step/create-a-project/bb-create-new-project.webp)

Now the project is created successfully, it is still empty. Next, you need to fill it with some **Databases**.

## Step 2 - Prepare a database in the project

In Bytebase, **Database** refers to a single database from a (Database) **Instance**, and a **Database** always belongs to a single **Project**. Bytebase periodically syncs the databases' info for all managed instances. After the sync, those synced databases are first placed as `Unassigned`, and waiting to be transferred to the user project later.

To make changes to a database, you need to place it in a user project first. There are two options:

- Option A) Transfer an existing database into the project.
- Option B) Create a new database in the project.

![bb-project-databases](/content/docs/get-started/step-by-step/create-a-project/bb-project-databases.webp)

### Option A) Transfer an existing database into the project

1. Go to the new project page you created or `Sample Project`.
2. Click **Transfer in DB**, and you will see **Transfer in database** dialog.
3. Choose **Transfer unassigned databases**,choose the database you want to transfer and click **Transfer**.

### Option B) Create a new database in the project

1. Go to the new project page you created or `Sample Project`.
2. Click **New DB**, and you will see **Create database** dialog.
3. Enter **New Database Name**, choose **Environment**, and then choose **Instance** you want the database to be located.
4. Click **Create**, and an issue of creating a database is created and rolled out automatically, you will be redirected to the issue page.

## Step 3 - Manage the members in the project

A project is only visible to its related **users**.

1. Go to the project page you created or `Sample Project`.
2. Click **Manage** > **Members** on the left sidebar, and you'll notice that you're **Project Owner** by default.
3. Click **Grant Access** to add new project members from the accounts already added at the workspace level. You can assign project-level roles to the members.

![bb-grant-access](/content/docs/get-started/step-by-step/create-a-project/bb-grant-access.webp)
