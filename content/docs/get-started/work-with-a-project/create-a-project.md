---
title: Create a Project
---

This document guides you to create a project, transfer a database into the project and assign users. Make sure you have configured environments, instances, and members properly at the workspace level.

## Step 1 - Create a project

1. Click **Projects** on the navigation bar.
2. Click **Add Project**.
3. Enter **Project Name** and **Key**. Choose **Standard** Mode.
4. Click **Create**, and you will be redirected to the new project page.

![create-a-project](/docs/get-started/work-with-a-project/create-a-project/create-a-project.webp)

Now the project is created successfully, it is still empty. Next, you need to fill it with some **Databases**.

## Step 2 - Prepare a database in the project

In Bytebase, **Database** refers to a single database from a (Database) **Instance**, and a **Database** always belongs to a single **Project**. Bytebase periodically syncs the databases' info for all managed instances. After the sync, those synced databases are first placed in the **Default Project**, and waiting to be transferred to the user project later.

To make changes to a database, you need to place it in a user project first. There are two options:

- Option A) Transfer an existing database into the project.
- Option B) Create a new database in the project.

![add-databases](/docs/get-started/work-with-a-project/create-a-project/add-databases.webp)

### Option A) Transfer an existing database into the project

1. Go to the new project page you created.
2. Click **Transfer in DB**, and you will see **Transfer in database from other projects** dialog.
3. Choose **From Default Project**, and choose the database you want to transfer.
4. Leave **Location** and **Tenant** empty, click **Transfer** and you will see that database listed on your project page.

### Option B) Create a new database in the project

1. Go to the new project page you created.
2. Click **New DB**, and you will see **Create database** dialog.
3. Enter **New Database Name**, choose **Environment**, and then choose **Instance** you want the database to be located.
4. Click **Create**, and an issue of creating a database is created automatically, you will be redirected to the issue page. If the database is in test environment, the issue will run without approval.

## Step 3 - Manage the members in the project

A project is only visible to its related **users**.

1. Go to the project page you created.
2. Click **Settings** on the project tab bar, you will see **Manage members** section, and you’re **Project Owner** by default.
3. Click **Select user** to add new project member from the users who have been already added at the workspace level.

![project-members](/docs/get-started/work-with-a-project/create-a-project/project-members.webp)
