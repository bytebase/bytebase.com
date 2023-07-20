---
title: 'DevOps: Database Change Management with PostgreSQL'
author: Ningjing
published_at: 2023/02/14 12:15
feature_image: /content/docs/tutorials/database-change-management-with-postgresql/feature-image.webp
tags: Tutorial
integrations: PostgreSQL
level: Beginner
description: PostgreSQL is the world's most advanced open-source relational database management system. This tutorial will guide you step-by-step to set up database change management for PostgreSQL in Bytebase.
---

A series of articles about DevOps: Database Change Management with PostgreSQL.

- DevOps: Database Change Management with PostgreSQL (this one)
- [DevOps: Database Change Management with PostgreSQL and GitHub](/docs/tutorials/database-change-management-with-postgresql-and-github/)

---

[PostgreSQL](https://www.postgresql.org/) is the world's most advanced open-source relational database management system.

This tutorial is a step-by-step guide to setting up **Database Change Management** for PostgreSQL in Bytebase. With Bytebase, a team can have a formalized review and rollout process to make PostgreSQL database schema change and data change.

Bytebase provides a GUI for teams to perform **Database Changes** and retain full **Change History**. Bytebase **Free Plan** is sufficient for this tutorial.

In the end, there is a bonus section about **Schema Drift Detection** for those advanced users.

## Features included

- Change Workflow
- Schema Editor
- SQL Advisor
- Change History
- SQL Editor Admin Mode
- Drift Detection

## Prerequisites

Before you start, make sure you have [Docker](https://www.docker.com/) installed.

## Step 1 - Deploy Bytebase via Docker

1. Make sure your Docker daemon is running, and start the Bytebase Docker container with following command:

```bash
docker run --init \
  --name bytebase \
  --platform linux/amd64 \
  --restart always \
  --publish 5678:8080 \
  --health-cmd "curl --fail http://localhost:5678/healthz || exit 1" \
  --health-interval 5m \
  --health-timeout 60s \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:%%bb_version%% \
  --data /var/opt/bytebase \
  --port 8080
```

2. Bytebase is now running via Docker, and you can access it via `localhost:5678`.
   ![docker](/content/docs/tutorials/database-change-management-with-postgresql/docker.webp)

1. Visit `localhost:5678` in your browser. Register the first admin account which will be granted [`Workspace Owner`](/docs/concepts/roles-and-permissions).
   ![register](/content/docs/tutorials/database-change-management-with-postgresql/register.webp)

## Step 2 - Add PostgreSQL in Bytebase

In Bytebase, ​​an Instance could be your on-premises PostgreSQL instance, an AWS RDS instance etc, in this tutorial.

1. Visit `localhost:5678` and log in.
   ![login](/content/docs/tutorials/database-change-management-with-postgresql/login.webp)

2. Click **Instances** on the top bar you’ll see there is a sample PostgreSQL instance that is embedded. If you want to use your own instance, click **Add instance**. To keep it simple, we’ll use the built-in sample instance for this tutorial.
   ![bb-instances](/content/docs/tutorials/database-change-management-with-postgresql/bb-instances.webp)

## Step 3 - Create a Project

In Bytebase, **Project** is the container to group logically related **Databases**, **Issues** and **Users** together, which is similar to the project concept in other dev tools such as Jira, GitLab. So before you deal with the database, a project must be created.

Click **Projects** on the top bar, and you’ll see there is already a sample project. We’ll use it for this tutorial. You can also click **New Project** to create a new one.
![bb-projects](/content/docs/tutorials/database-change-management-with-postgresql/bb-projects.webp)

## Step 4 - Create a database in PostgreSQL via Bytebase

In Bytebase, a **Database** is the one created by "CREATE DATABASE xxx". A database always belongs to a single **Project**. **Issue** represents a specific collaboration activity between Developer and DBA such as creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

1. Go back to **Home**, and click **New DB**.
   ![bb-home-new-db](/content/docs/tutorials/database-change-management-with-postgresql/bb-home-new-db.webp)

2. Fill the form with

- **Project**:`Sample Project`
- **Name**: `demo`
- **Environment**: `Prod`
- **Instance**: `Postgres Sample instance`
- **Database owner name**: `bbsample`
  And click **Create**.
  ![bb-create-db](/content/docs/tutorials/database-change-management-with-postgresql/bb-create-db.webp)

3. It will create an issue "CREATE DATABASE …" automatically. Because it’s for `Prod` environment, the issue won’t run till you click **Approve**. Click **Resolve**, and the issue is `Done`. The database is created.
   ![bb-issue-demo-approve](/content/docs/tutorials/database-change-management-with-postgresql/bb-issue-demo-approve.webp)

![bb-issue-demo-done](/content/docs/tutorials/database-change-management-with-postgresql/bb-issue-demo-done.webp)

4. Go back to the home page by clicking **Home** on the left sidebar. On the home page, you can see the newly created database `demo`, and the issue you just resolved.
   ![bb-home-demo-created](/content/docs/tutorials/database-change-management-with-postgresql/bb-home-demo-created.webp)

## Step 5 - Create a table in PostgreSQL via Bytebase

In Step 4, you actually created an issue in **UI workflow** and then executed it. Let’s make it more explicit.

1. Go to project `Sample Project`, and click **Alter Schema**.
   ![bb-project-alter-schema](/content/docs/tutorials/database-change-management-with-postgresql/bb-project-alter-schema.webp)

2. Choose `demo` and click **Next**. It could generate a pipeline if you have different databases for different environments.
   ![bb-alter-schema-demo](/content/docs/tutorials/database-change-management-with-postgresql/bb-alter-schema-demo.webp)

3. There are two options **Schema Editor** and **Raw SQL**, here we choose **Schema Editor** to create a table `t1` via UI. Click **Add Column** to add a `name` column. Click **Preview issue**.
   ![bb-schema-editor](/content/docs/tutorials/database-change-management-with-postgresql/bb-schema-editor.webp)

4. **Title** and **SQL** will be filled automatically. You can select the **Assignee** to review the issue and then click **Create**.
   ![bb-issue-new-t1](/content/docs/tutorials/database-change-management-with-postgresql/bb-issue-new-t1.webp)

5. Bytebase will run some basic checks and wait for the **Assignee** to approve.
   ![bb-issue-checks-approve](/content/docs/tutorials/database-change-management-with-postgresql/bb-issue-checks-approve.webp)

6. Click **Approve** and the SQL will execute. Click **Resolve issue** and the issue status will become `Done`.
   ![bb-issue-t1-resolve](/content/docs/tutorials/database-change-management-with-postgresql/bb-issue-t1-resolve.webp)

7. On the issue page, click **View change**. You will see the database difference.
   ![bb-view-change](/content/docs/tutorials/database-change-management-with-postgresql/bb-view-change.webp)

8. You can also go to **Change History** under the project to view the full history. Or go into a specific database to view its history.
   ![bb-project-change-history](/content/docs/tutorials/database-change-management-with-postgresql/bb-project-change-history.webp)

![bb-db-demo-change-history](/content/docs/tutorials/database-change-management-with-postgresql/bb-db-demo-change-history.webp)

## Bonus Section - Schema Drift Detection

This section requires you to have **Enterprise Plan** (you can start 14 days trial directly in the product without credit card).
![bb-start-14-days-trial](/content/docs/tutorials/database-change-management-with-postgresql/bb-start-14-days-trial.webp)

Now you can see the full change history of `demo`. However, what is Establish new baseline? When should it be used?

By adopting Bytebase, we expect teams to use Bytebase exclusively for all schema changes. Meanwhile, if someone has made PostgreSQL schema change **outside of Bytebase**, obviously Bytebase won’t know it. And because Bytebase has recorded its own copy of schema, when Bytebase compares that with the live schema having that out-of-band schema change, it will notice a discrepancy and surface a schema drift anomaly. If that change is intended, then you should use baseline the schema state again to reconcile.

In this section, you’ll be guided through this process.

1. You can use an external GUI or terminal to make a change to `demo`. In this tutorial, we use Bytebase **SQL Editor’s Admin mode** which also counts when we say **change outside of Bytebase**. Go to **SQL Editor**, and switch to **Admin mode**.
   ![bb-sql-editor-admin](/content/docs/tutorials/database-change-management-with-postgresql/bb-sql-editor-admin.webp)

When you make a change in Admin mode, it will not record any history as in a normal process [www.bytebase.com/docs/sql-editor/admin-mode](/docs/sql-editor/admin-mode)

2. Paste the following and then press **Enter**:

```sql
ALTER TABLE t1
ADD COLUMN age integer;`
```

3. Paste the following and then press **Enter** to verify it’s there:

```sql
SELECT
  table_name,
  column_name,
  data_type
FROM
  information_schema.columns
WHERE
  table_name = 't1';
```

![bb-sql-admin-verify](/content/docs/tutorials/database-change-management-with-postgresql/bb-sql-admin-verify.webp)
Admin mode skips Bytebase system and works as an external input. The change will take effect in Bytebase GUI in the next sync.

4. Wait for 10 mins. Go to **Anomaly Center**, and you can find the **Schema Drift**.
   ![bb-anomaly-center-1-drift](/content/docs/tutorials/database-change-management-with-postgresql/bb-anomaly-center-1-drift.webp)

5. Click View diff, and you’ll see the drift.
   ![bb-drift-diff-age](/content/docs/tutorials/database-change-management-with-postgresql/bb-drift-diff-age.webp)

6. You may also find the drift by clicking **Databases** > **demo**.
   ![bb-databases-demo-1-drift](/content/docs/tutorials/database-change-management-with-postgresql/bb-databases-demo-1-drift.webp)

7. Go to **Databases** > **demo** > **Change History** and click **Establish new baseline**.
   ![bb-databases-demo-new-baseline](/content/docs/tutorials/database-change-management-with-postgresql/bb-databases-demo-new-baseline.webp)

8. It will create an issue. Click **Approve** and **Resolve** to make it `Done`.
   ![bb-issue-baseline-done](/content/docs/tutorials/database-change-management-with-postgresql/bb-issue-baseline-done.webp)

9. Go back to **Databases** > **demo** or **Anomaly Center**, and you will find the drift is gone.
   ![bb-databases-demo-0-drift](/content/docs/tutorials/database-change-management-with-postgresql/bb-databases-demo-0-drift.webp)
   ![bb-anomaly-center-0-drift](/content/docs/tutorials/database-change-management-with-postgresql/bb-anomaly-center-0-drift.webp)

## Summary and Next

Now you have connected PostgreSQL with Bytebase, and tried out the UI workflow to do schema change. Bytebase will record the full change history for you. With **Enterprise Plan**, you can even have schema drift detection.

In the next article, you’ll try out GitOps workflow, which will store your PostgreSQL schema in GitHub and trigger the change upon committing the change to the repository, to bring your PostgreSQL change workflow to the next level of Database DevOps - [Database as Code](/blog/database-as-code).
