---
title: 'Database CI/CD and Schema Migration with MariaDB'
author: Ningjing
published_at: 2023/06/16 17:15
feature_image: /content/docs/tutorials/database-change-management-with-mariadb/bytebase-mariadb-banner.webp
tags: Tutorial
integrations: MariaDB
level: Beginner
estimated_time: '20 mins'
description: MariaDB is the world's most advanced open-source relational database management system. This tutorial will guide you step-by-step to set up database change management for MariaDB in Bytebase.
---

A series of articles about Database CI/CD and Schema Migration with MariaDB.

- Database CI/CD and Schema Migration with MariaDB (this one)
- [Database CI/CD and Schema Migration with MariaDB and GitHub](/docs/tutorials/database-change-management-with-mariadb-and-github/)

---

[MariaDB](https://mariadb.org/) is a community-developed, commercially supported fork of the MySQL relational database management system (DBMS), intended to remain free and open-source software under the GNU General Public License.

This tutorial is a step-by-step guide to setting up **Database Change Management** for MariaDB in Bytebase. With Bytebase, a team can have a formalized review and rollout process to make MariaDB database schema change and data change.

Bytebase provides a GUI for teams to perform **Database Changes** and retain full **Change History**. Bytebase **Free Plan** is sufficient for this tutorial.

In the end, there is a bonus section about **Schema Drift Detection** for those advanced users.

## Features included

- Change Workflow
- Change History
- SQL Editor Admin Mode
- Drift Detection

## Prerequisites

Before you start, make sure you have

- [Docker](https://www.docker.com/) installed. You can follow the [official guide](https://docs.docker.com/get-docker/) to install it.
- In this tutorial, we'll use [StackBricks](https://stackbricks.app/) to run MariaDB. You can also use other tools.

## Step 1 - Deploy Bytebase via Docker

1. Make sure your Docker daemon is running, and start the Bytebase Docker container with following command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

1. Run StackBricks, and create two MariaDB instances:

   - `mariaDB test`,`3307`
   - `mariaDB prod`,`3308`

   ![stackbricks](/content/docs/tutorials/database-change-management-with-mariadb/stackbricks-2-instances.webp)

1. Bytebase and MariaDB are now running via Docker.
   ![docker](/content/docs/tutorials/database-change-management-with-mariadb/docker.webp)

## Step 2 - Add MariaDB in Bytebase

In Bytebase, ​​an Instance could be your on-premises MySQL instance, an AWS RDS MySQL instance and etc. In this tutorial, it's MariaDB instances.

1. Visit `localhost:8080` in your browser. Register the first admin account which will be granted [`Workspace Admin`](/docs/concepts/roles-and-permissions).
   ![bb-register-admin.webp](/content/docs/tutorials/database-change-management-with-mariadb/bb-register-admin.webp)

2. Click **Instances** on the top bar and click **Add instance**, choose `MariaDB`. Fill the form with the following information and click **Create**.

   - **Instance Name**: `MariaDB test`
   - **Environment**: `Test`
   - **Host or Socket** and **Port**: `host.docker.internal` and `3307`
   - **Username and password**: `root` and your password

3. Click **Add instance** again, choose `MariaDB`. Fill the form with the following information and click **Create**.
   - **Instance Name**: `MariaDB prod`
   - **Environment**: `Prod`
   - **Host or Socket** and **Port**: `host.docker.internal` and `3307`
   - **Username and password**: `root` and your password

## Step 3 - Create a Project

In Bytebase, **Project** is the container to group logically related **Databases**, **Issues** and **Users** together, which is similar to the project concept in other dev tools such as Jira, GitLab. So before you deal with the database, a project must be created.

1. Click **Projects** on the top bar.
2. Click **New Project** to create a new one with `Demo UI` as **Project Name**, `DUI` as **Key** and `Standard` as **Mode**.

## Step 4 - Create a database in MariaDB via Bytebase

In Bytebase, a **Database** is the one created by "CREATE DATABASE xxx". A database always belongs to a single **Project**. **Issue** represents a specific collaboration activity between Developer and DBA such as creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

1. Go to the project `Demo UI`, and click **New DB**.

2. Fill the form with the following information and click **Create**.

   - **Name**: `demo_db`
   - **Environment**: `Test`
   - **Instance**: `MariaDB test`

   It will create an issue "CREATE DATABASE …" automatically. Because it’s for `Test` environment, the issue will automatically run then becomes `Done`. The database is created.
   ![bb-issue-demo_db_test-done](/content/docs/tutorials/database-change-management-with-mariadb/bb-issue-demo_db_test-done.webp)

3. Click **New DB** again, fill the form with the following information and click **Create**.

   - **Name**: `demo_db`
   - **Environment**: `Prod`
   - **Instance**: `MariaDB prod`

   It will create an issue "CREATE DATABASE …" automatically. Because it’s for `Prod` environment, the issue will require manual rollout. Click **Rollout** to run then becomes `Done`. The database is created.

4. Go back to project `Demo UI`, click **Databases** tab, and you can see there're two databases there.

## Step 5 - Create a table in MariaDB via Bytebase

In Step 4, you actually created an issue in **UI workflow** and then executed it. Let’s make it more explicit.

1. Go to project `Demo UI`, and click **Alter Schema**. Here you can choose either one or both.
   ![bb-alter-schema-test-prod](/content/docs/tutorials/database-change-management-with-mariadb/bb-alter-schema-test-prod.webp)

2. Check both `demo_db` and click **Next**. It will generate a pipeline.

3. Input the SQL as following, and click **Apply to other tasks**. Click **Create**.

   ```sql
   CREATE TABLE t1(
      Id INT AUTO_INCREMENT,
      PRIMARY KEY(Id)
   )
   ```

4. Bytebase will run SQL automatically on Test environment, but wait for manual rollout on Prod. It's by default configuration, you can adjust it on **Environments** page.

   ![bb-issue-test-done-prod](/content/docs/tutorials/database-change-management-with-mariadb/bb-issue-test-done-prod.webp)

5. Click **Rollout** and the SQL will execute and the issue will become `Done`.

6. On the issue page, click **View change**. You will see the difference.
   ![bb-issue-diff](/content/docs/tutorials/database-change-management-with-mariadb/bb-issue-diff.webp)

7. You can also go to **Change History** under the project to view the full history. Or go into a specific database to view its history.
   ![bb-demo-ui-history](/content/docs/tutorials/database-change-management-with-mariadb/bb-demo-ui-history.webp)

## Bonus Section - Schema Drift Detection

This section requires you to have **Enterprise Plan** (you can start 14 days trial directly in the product without credit card). Click **Start free trial** on the bottom of left sidebar.

By adopting Bytebase, we expect teams to use Bytebase exclusively for all schema changes. Meanwhile, if someone has made MariaDB schema change **outside of Bytebase**, obviously Bytebase won’t know it. And because Bytebase has recorded its own copy of schema, when Bytebase compares that with the live schema having that out-of-band schema change, it will notice a discrepancy and surface a schema drift anomaly. If that change is intended, then you should use baseline the schema state again to reconcile.

In this section, you’ll be guided through this process.

1. You can use an external GUI or terminal to make a change to `demo-db`. In this tutorial, we use Bytebase **SQL Editor’s Admin mode** which also counts when we say **change outside of Bytebase**. Go to **SQL Editor**, and switch to **Admin mode**.

When you make a change in Admin mode, it will not record any history as in a normal process [www.bytebase.com/docs/sql-editor/admin-mode](/docs/sql-editor/admin-mode)

2. Paste the following and then press **Enter**:

```sql
ALTER TABLE t1
ADD COLUMN name VARCHAR(255);`
```

![bb-sql-editor-admin-alter-t1](/content/docs/tutorials/database-change-management-with-mariadb/bb-sql-editor-admin-alter-t1.webp)
Admin mode skips Bytebase system and works as an external input. The change will take effect in Bytebase GUI in the next sync.

1. Wait for 10 mins. Go to **Anomaly Center**, and you can find the **Schema Drift**.
   ![bb-anomaly-center-1-drift](/content/docs/tutorials/database-change-management-with-mariadb/bb-anomaly-center-1-drift.webp)

2. Click View diff, and you’ll see the drift.
   ![bb-demo_db-drift-diff](/content/docs/tutorials/database-change-management-with-mariadb/bb-demo_db-drift-diff.webp)

3. You may also find the drift by clicking **Databases** > `demo_db`.

4. Go to **Databases** > `demo_db` > **Change History** and click **Establish new baseline**.
   ![bb-demo_db-establish-new-baseline](/content/docs/tutorials/database-change-management-with-mariadb/bb-demo_db-establish-new-baseline.webp)

5. It will create an issue and the issue will be `Done`.
   ![bb-issue-demo_db-baseline-done]pngntent/docs/tutorials/database-change-management-with-mariadb/bb-issue-demo_db-baseline-done.webp)

6. Go back to **Databases** > `demo_db` or **Anomaly Center**, and you will find the drift is gone.

## Summary and Next

Now you have connected MariaDB with Bytebase, and tried out the UI workflow to do schema change. Bytebase will record the full change history for you. With **Enterprise Plan**, you can even have schema drift detection.

In the next article, you’ll try out GitOps workflow, which will store your MariaDB schema in GitHub and trigger the change upon committing the change to the repository, to bring your MariaDB change workflow to the next level of Database DevOps - [Database as Code](/blog/database-as-code).
