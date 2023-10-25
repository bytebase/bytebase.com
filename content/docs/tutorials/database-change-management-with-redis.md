---
title: 'DevOps: Database Change Management with Redis'
author: Ningjing
published_at: 2023/04/14 11:15
feature_image: /content/docs/tutorials/database-change-management-with-redis/feature-image.webp
tags: Tutorial
integrations: Redis
level: Beginner
reading_time: '20 mins'
description: Redis is an open-source in-memory data structure store used as a database, cache, message broker, and streaming engine.This tutorial will guide you step-by-step to set up database change management for Redis in Bytebase.
---

A series of articles about DevOps: Database Change Management with Redis.

- DevOps: Database Change Management with Redis (this one)
- [DevOps: Database Change Management with Redis and GitHub](/docs/tutorials/database-change-management-with-redis-and-github)

---

[Redis](https://redis.io/) is an open source (BSD licensed), in-memory data structure store used as a database, cache, message broker, and streaming engine.

This tutorial will guide you step-by-step to set up database change management for Redis in Bytebase. With Bytebase, a team can have a formalized review and rollout process to make Redis data change.

You’ll have a GUI and You can use Bytebase free version to finish the tutorial.

## Features included

- Change Workflow
- SQL Editor Admin Mode
- Change History

## Prerequisites

Before you start this tutorial, make sure:

- You have [a local running Redis](https://redis.io/docs/getting-started/installation/).
- You have [Docker](https://www.docker.com/) installed locally.

## Step 1 - Start Bytebase in Docker

1. Make sure your docker daemon is running, and start the Bytebase docker container.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

2. Bytebase is running successfully in Docker, and you can visit it via `localhost:5678`.
   ![docker](/content/docs/tutorials/database-change-management-with-redis/docker.webp)

3. Visit localhost:5678 in your browser. Register the first admin account which will be granted [`Workspace Owner`](/docs/concepts/roles-and-permissions).
   ![register](/content/docs/tutorials/database-change-management-with-redis/register.webp)

## Step 2 - Add Redis in Bytebase

In Bytebase, ​​an Instance could be your on-premises MySQL instance, an AWS RDS instance etc, in this tutorial, a Redis Cloud account or a self-managed instance.

1. Visit `localhost:5678` and log in as `Workspace Owner`.
   ![login](/content/docs/tutorials/database-change-management-with-redis/login.webp)

2. Click **Add Instance**.
   ![bb-add-instance](/content/docs/tutorials/database-change-management-with-redis/bb-add-instance.webp)

3. Add a **Redis instance** and click **Create**.

Pay attention to some fields:

- **Environment**: choose `Test`, if you choose `Prod`,  issues will wait for approval by default. In this tutorial, we try to keep it simple. However, it’s all configurable.
- **Host or Socket**: `host.docker.internal`.
- **Username & Password**: keep them empty.

![bb-instance-ch-self-managed](/content/docs/tutorials/database-change-management-with-redis/bb-create-instance-redis.webp)

## Step 3 - Create a project

In Bytebase, **Project** is the container to group logically related **Databases**, **Issues** and **Users** together, which is similar to the project concept in other dev tools such as Jira, GitLab. So before you deal with the database, a project must be created.

1. After the instance is created, click **Projects** on the top bar.

2. Click **New Project** to create a new project `TestRedis`, key is `TR`, mode is `standard`. Click **Create**.
   ![bb-projects-new](/content/docs/tutorials/database-change-management-with-redis/bb-projects-new.webp)

## Step 4 - Transfer a database in Redis

In Bytebase, a **Database** always belongs to a single **Project**. **Issue** represents a specific collaboration activity between Developer and DBA such as creating a database, altering a schema or change data. It's similar to the issue concept in other issue management tools.

1. After the project is created. Click **Transfer in DB** on the project top bar.
   ![bb-project-new-db](/content/docs/tutorials/database-change-management-with-redis/bb-project-transfer-in-db.webp)

1. Choose one of them and click **Transfer**.
   ![bb-create-db](/content/docs/tutorials/database-change-management-with-redis/bb-project-transfer-in-redis-0.webp)

## Step 5 - Add some data in Redis

1. Go back to the project and click **Change Data**. Choose `0` and click **Next**.
   ![bb-project-change-data](/content/docs/tutorials/database-change-management-with-redis/bb-project-change-data.webp)

2. Input `set name adela` in the **Statement** fieldbox and click **Create**. Wait for its execution and click **Resolve**.
   ![bb-issue-set-name-adela-done](/content/docs/tutorials/database-change-management-with-redis/bb-issue-set-name-adela-done.webp)

## Step 6 - Query the data

1. Click the terminal icon beside database `0`, and you'll be redirected to SQL Editor
   ![bb-issue-database](/content/docs/tutorials/database-change-management-with-redis/bb-issue-database.webp)

2. Switch to Admin mode, input `get name`, and click **Run**. You'll see the result.
   ![bb-sql-editor-query-name](/content/docs/tutorials/database-change-management-with-redis/bb-sql-editor-query-name.webp)

## Step 7 - View change history

1. Go back to project and click **Change History**, you'll see the list of all data changes.
   ![bb-project-change-history](/content/docs/tutorials/database-change-management-with-redis/bb-project-change-history.webp)

## Summary and Next

Now you have connected Redis with Bytebase, and tried out the UI workflow to do schema change. Bytebase will record the full change history for you. With **Enterprise Plan**, you can even have drift detection.

In the next article, you’ll try out GitOps workflow, which will store your Redis schema in GitHub and trigger the change upon committing the change to the repository, to bring your Redis change workflow to the next level, aka **Database DevOps** - [Database as Code](/blog/database-as-code).
