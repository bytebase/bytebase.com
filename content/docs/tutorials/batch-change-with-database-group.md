---
title: Batch Change with Database Group
author: Ningjing
published_at: 2023/06/20 18:00
feature_image: /content/docs/tutorials/batch-change-with-database-group/batch-change-db-group-banner.webp
tags: Tutorial
integrations: General
level: Intermediate
estimated_time: '15 mins'
description: This article describes using Database Group and Table Group to batch change databases.
---

Bytebase [2.2.0](/changelog/bytebase-2-2-0/) introduced [**database group**](/docs/concepts/data-model/#database-group-and-table-group), a new feature that provides a new way to facilitate batch change, in addition to batch changing **multiple environments** and **multiple tenants**.

![database-partition](/content/docs/tutorials/batch-change-with-database-group/database-partition.webp)

As data grows, databases and tables maybe partitioned into smaller chucks. Meanwhile, you still want to
apply the same database change to all partitions since they share the same schema. It's painful and error-prone to make sure a database change is consistently applied to each partition.

You can use Database Group to model those database partitions and change them in a consistent way.

## Prerequisites

This tutorial requires [Docker](https://www.docker.com/) to be installed.

## Step 1 - Start Bytebase and MySQL

1. Make sure your Docker daemon is running. Copy and paste the commands to start one Bytebase and two MySQL instances via Docker.

<IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

```text
docker run --name mysqldtest \
  --publish 3307:3306 \
  -e MYSQL_ROOT_HOST=172.17.0.1 \
  -e MYSQL_ROOT_PASSWORD=testpwd1 \
  mysql/mysql-server:8.0
```

```text
docker run --name mysqldprod \
  --publish 3308:3306 \
  -e MYSQL_ROOT_HOST=172.17.0.1 \
  -e MYSQL_ROOT_PASSWORD=testpwd1 \
  mysql/mysql-server:8.0
```

## Step 2 - Prepare the Console

1. Register and sign in **Bytebase Console** via `localhost:8080`. Click **Add Instance** to add two instances in two environments respectively.

   - **Host or Socket**: `host.docker.internal` | **Port**: `3307`/`3308`
   - **Environment**: `Test`/`Prod`
   - **Username**: `root` | **Password**:`testpwd1`

2. Create project `Group Demo` as **Name**, `GD` as **Key** `Batch Mode` as **Mode** and click **Create**. Here you need to upgrade to **Enterprise Plan** with 14 days trial period.
   ![bb-create-project-upgrade](/content/docs/tutorials/batch-change-with-database-group/bb-create-project-upgrade.webp)

3. Within the project, click **Create DB** to create eight databases as follows:
   - `demo_db_test` in `Test` environment and it will run automatically. Because by default, issue in `Test` environment will rollout automatically;
   - `demo_db_prod_asia` in `Prod` environment and click **Rollout**;
   - `demo_db_prod_europe` in `Prod` environment and click **Rollout**;
   - `demo_db_prod_africa` in `Prod` environment and click **Rollout**;
   - `demo_db_prod_australia` in `Prod` environment and click **Rollout**;
   - `demo_db_prod_north_america` in `Prod` environment and click **Rollout**;
   - `demo_db_prod_south_america` in `Prod` environment and click **Rollout**;
   - `demo_db_prod_antarctica` in `Prod` environment and click **Rollout**.

## Step 3 - Group Databases and Create Tables in Batch

1. Within the project `Group Demo`, click **Database Groups** tab, and click **New database group**. Fill in the form as follows:

   - **Name**: `demo-all` | **Environment**: `Prod`
   - **Condition**: Where `Database name` `startsWith` `demo_db_prod`
     ![bb-new-db-group-demo-all](/content/docs/tutorials/batch-change-with-database-group/bb-new-db-group-demo-all.webp)
     You may create other database group such as:
   - **Name**: `demo-human` | **Environment**: `Prod`
   - **Condition**: Where `Database name` `startsWith` `demo_db_prod`
     `and` `Database name` `!=` `demo_db_prod_antarctica`
     ![bb-new-db-group-demo-human](/content/docs/tutorials/batch-change-with-database-group/bb-new-db-group-demo-human.webp)

2. Within the project, click **Alter Schema**. Choose **Manual Selection** > **Database Group** > `demo-all`, and click **Next**. Copy and paste the SQL below and click **Create**.

   ```sql
   CREATE TABLE t1 (
      id INTEGER PRIMARY KEY
   );
   ```

3. On the issue page, click the **down arrow** and choose **Rollout** to run one database first. If it's OK, then click **Rollout current stage** to run all.
   ![bb-issue-7-db-t1](/content/docs/tutorials/batch-change-with-database-group/bb-issue-7-db-t1.webp)
   ![bb-issue-7-db-t1-one-db-passed](/content/docs/tutorials/batch-change-with-database-group/bb-issue--7-db-t1-one-db-passed.webp)

4. Repeat 2 to 3 to create another issue for another table `t2`:
   ```sql
   CREATE TABLE t2 (
      id INTEGER PRIMARY KEY
   );
   ```

## Step 4 - Group Tables and Alter tables in Batch

1. Within the project `Group Demo`, click **Database Groups** tab, and click **New table group**. Fill in the form as follows:

   - **Database Group**: `demo-all` | **Environment**: `Prod` | **Name**: `demo-all-t`
   - **Condition**: Where `Table name` `startsWith` `t`
     ![bb-new-table-group-t](/content/docs/tutorials/batch-change-with-database-group/bb-new-table-group-t.webp)

2. Click **New table group** again. Fill in the form as follows:

   - **Database Group**: `demo-all` | **Environment**: `Prod` | **Name**: `demo-all-t1`
   - **Condition**: Where `Table name` `==` `t1`

3. Within the project, click **Alter Schema**. Choose **Manual Selection** > **Database Group** > `demo-all`, and click **Next**. You'll see the following field.
   ![bb-table-alter-schema-t1-t](/content/docs/tutorials/batch-change-with-database-group/bb-table-alter-schema-t1-t.webp)

4. Here we choose `demoall_t` which includes `t1` and `t2`. Uncomment the last line, replace it with the SQL below and click **Create**.

   ```sql
   ALTER TABLE demoall_t ADD COLUMN name VARCHAR(255) NOT NULL;
   ```

5. On the issue page, click the **down arrow** and choose **Rollout** to run one database first. If it's OK, then click **Rollout current stage** to run all.
   ![bb-issue-14-alter-schema](/content/docs/tutorials/batch-change-with-database-group/bb-issue-14-alter-schema.webp)

## Summary

Now you have learned how to use database group and table group to run batch changes in Bytebase. Bytebase also provides other ways to batch change databases across multiple environments, SaaS tenants. Please refer to [Batch Change](/docs/change-database/batch-change/) for more details.
