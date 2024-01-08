---
title: 'Database CI/CD and Schema Migration with SQL Server'
author: Ningjing
published_at: 2024/1/8 18:15
feature_image: /content/docs/tutorials/database-change-management-with-sql-server/sqlserver-feature.webp
tags: Tutorial
integrations: 'SQL Server'
level: Beginner
estimated_time: '20 mins'
description: SQL Server is a widely used database management system developed by Microsoft for storing and retrieving structured data. This tutorial will guide you step-by-step to set up database change management for SQL Server in Bytebase.
---

A series of articles about Database CI/CD and Schema Migration with SQL Server.

- Database CI/CD and Schema Migration with SQL Server (this one)
- [Database CI/CD and Schema Migration with SQL Server and GitHub](/docs/tutorials/database-change-management-with-sql-server-and-github)

---

[Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server) is a widely used database management system developed by Microsoft for storing and retrieving structured data. It offers features for data management, scalability, performance optimization, security, and business intelligence.

This tutorial is a step-by-step guide to set up Database Change Management for SQL Server in Bytebase. With Bytebase, a team can have a formalized review and rollout process to make SQL Server database schema change and data change.

Bytebase provides a GUI for teams to **perform database changes** and **retain full migration history**. Bytebase Free Plan is sufficient for this tutorial.

## Prerequisites

Before you start, make sure you have the following downloaded and installed:

- One SQL Server instance
- [Docker](https://www.docker.com/)

## Step 1 - Deploy Bytebase via Docker

1. Make sure your Docker is running, and start the Bytebase Docker container with the following command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

1. Bytebase is now running via Docker, and you can access it via `localhost:5678`.

1. Visit `localhost:5678` in your browser. Register an account.
   ![bb-register](/content/docs/tutorials/database-change-management-with-sql-server/bb-register.webp)

## Step 2 - Add a SQL Server Instance to Bytebase

In this tutorial, ​an **Instance** is your SQL Server instance.

1. Login to the Bytebase Console.

1. Click **Instances** on the left sidebar and click **Add Instance**.

1. Add an `SQL Server` instance. Pay attention to **Environment**, let's choose `Prod` for this tutorial. Because there's a SQL Review policy enabled on `Prod` environment. You may go to **Environment** > **Prod** > **SQL Review Policy** to check the details.
   ![add-instance](/content/docs/tutorials/database-change-management-with-sql-server/bb-add-instance-mssql.webp)

## Step 3 - Go to the existing Project

In Bytebase, **Project** groups logically related **Databases, Issues** and **Users** together, which is similar to the project concept in other DevTools such as Jira and GitLab. So before you deal with the database, a Project must be presented.

Go to the **Projects** tab, and you'll see a default project called `Sample Project`. Click it, there are two sample PostgreSQL databases. We'll create a new SQL Server database in this project.

## Step 4 - Create a SQL Server database via Bytebase

In Bytebase, a **Database** is created by `CREATE DATABASE xxx`. A database always belongs to a single **Project**. An **Issue** represents a specific collaboration activity between Developer and DBA for when creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

1. Stay in the project `Sample Project`. Click on **New DB** to create a new database.

1. Fill in the form, and pay attention to these fields:
   ![create-db](/content/docs/tutorials/database-change-management-with-sql-server/bb-create-new-db.webp)

   - **Name**: can be anything, here we used `db_demo`
   - **Environment** - `Prod`
   - **Instance** - choose the instance you added in Step 2.

   Click **Create**.

1. Bytebase will create an issue to create the database automatically and without further configuration, the rollout is approved by default. The issue is Done after the rollout succeeds.
   ![bb-db-created-done](/content/docs/tutorials/database-change-management-with-sql-server/bb-db-created-done.webp)

## Step 5 - Create a table in SQL Server via Bytebase

In Step 4, you actually created an issue using UI workflow and then executed it. Let’s make it more explicit.

1. Go to project `Sample project`, check `db_demo` you created and click on **Edit Schema**.

1. You'll be redirected to an issue preview. Fill in the following SQL and click **Create**.

   ```SQL
   CREATE TABLE t1 (id INT);
   ```

1. After automatic checks, there's a pop-up window showing a SQL Review violation -- `Enforce NOT NULL constraint for columns`.

   ![bb-sql-review-violations](/content/docs/tutorials/database-change-management-with-sql-server/bb-sql-review-violations.webp)

1. Click **Back to edit**, and paste this and click **Create** again.

   ```SQL
   CREATE TABLE t1 (id INT NOT NULL DEFAULT 1);
   ```

1. After passing the automatic checks, the issue executes and the status becomes `Done`.

   ![bb-issue-create-table-done](/content/docs/tutorials/database-change-management-with-sql-server/bb-issue-create-table-done.webp)

## Summary and What's Next

Now you have connected SQL Server with Bytebase, and used the UI workflow to accomplish schema change. Bytebase will record the full migration history for you.

In the next post, you’ll try out GitOps workflow: store your SQL Server schema in GitHub and Bytebase will pick up the changes to the repo, bringing your SQL Server change workflow to the next level, aka **Database DevOps** - [Database as Code](/blog/database-as-code).
