---
title: 'DevOps: Database Change Management with ClickHouse'
author: Ningjing
published_at: 2023/03/01 11:15
feature_image: /content/docs/tutorials/database-change-management-with-clickhouse/feature-image.webp
tags: Tutorial
integrations: ClickHouse
level: Beginner
description: ClickHouse is an open-source column-oriented DBMS for online analytical processing. This tutorial will guide you step-by-step to set up database change management for ClickHouse in Bytebase.
---

This is a series of articles about DevOps: Database Change Management with ClickHouse.

- DevOps: Database Change Management with ClickHouse (this one)
- [DevOps: Database Change Management with ClickHouse and GitHub](/docs/tutorials/database-change-management-with-clickhouse-and-github)

---

[ClickHouse](https://clickhouse.com/) is a fast open-source column-oriented database management system that allows generating analytical data reports in real-time using SQL queries.

This tutorial will guide you step-by-step to set up database change management for ClickHouse (Cloud and self-managed) in Bytebase. With Bytebase, a team can have a formalized review and rollout process to make ClickHouse schema change and data change.

You’ll have a GUI and the full change history. You can use Bytebase free version to finish the tutorial.

There is also a bonus section about drift detection for those advanced users if needed.

## Features included

- Change Workflow
- Change History
- Drift Detection

## Prerequisites

Before you start this tutorial, make sure:

- You have either of
  - a [ClickHouse Cloud](https://clickhouse.cloud/) account
  - a self-managed ClickHouse running. You can follow [How to Run ClickHouse with Docker](https://www.bytebase.com/blog/how-to-run-clickhouse-with-docker-and-connect-using-mysql-client).
- You have [Docker](https://www.docker.com/) installed locally.

## Step 1 - Start Bytebase in Docker

1. Make sure your docker daemon is running, and start the Bytebase docker container.

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

2. Bytebase is running successfully in Docker, and you can visit it via `localhost:5678`.
   ![docker](/content/docs/tutorials/database-change-management-with-clickhouse/docker.webp)

3. Visit localhost:5678 in your browser. Register the first admin account which will be granted [`Workspace Owner`](/docs/concepts/roles-and-permissions).
   ![register](/content/docs/tutorials/database-change-management-with-clickhouse/register.webp)

## Step 2 - Add ClickHouse in Bytebase

In Bytebase, ​​an Instance could be your on-premises MySQL instance, an AWS RDS instance etc, in this tutorial, a ClickHouse Cloud account or a self-managed instance.

1. Visit `localhost:5678` and log in as `Workspace Owner`.
   ![login](/content/docs/tutorials/database-change-management-with-clickhouse/login.webp)

2. Click **Add Instance**.
   ![bb-add-instance](/content/docs/tutorials/database-change-management-with-clickhouse/bb-add-instance.webp)

3. Add a **ClickHouse instance** and click **Create**.

Pay attention to some fields:

**Environment**: choose `Test`, if you choose `Prod`,  issues will wait for approval by default. In this tutorial, we try to keep it simple. However, it’s all configurable.

If you use Cloud version. Go to your ClickHouse Cloud account, and click **View connection string**.

**Host or Socket** and **Port** are in the grey box as parameters.

**Username** and **Password** are generated and stored in `clickhouse_credentials.txt` while you registered the ClickHouse Cloud account.
![ch-cloud-view-connection-string](/content/docs/tutorials/database-change-management-with-clickhouse/ch-cloud-view-connection-string.webp)
![ch-cloud-view-host](/content/docs/tutorials/database-change-management-with-clickhouse/ch-cloud-view-host.webp)
![ch-cloud-view-password](/content/docs/tutorials/database-change-management-with-clickhouse/ch-cloud-view-password.webp)

Be sure to allow access to this service from `Anywhere`.
![ch-cloud-anywhere](/content/docs/tutorials/database-change-management-with-clickhouse/ch-cloud-anywhere.webp)

Choose `CA Certificate` for SSL Connection, if you use macOS, open the file `/etc/ssl/cert.pem`, copy the content as a whole then paste it into the **CA Certificate** field box. Click **Test Connection** to verify it’s working.

![bb-instance-ch-cloud](/content/docs/tutorials/database-change-management-with-clickhouse/bb-instance-ch-cloud.webp)

4. If you use self-managed version of ClickHouse, fill in instance form as the following image and click **Create**.
   ![bb-instance-ch-self-managed](/content/docs/tutorials/database-change-management-with-clickhouse/bb-instance-ch-self-managed.webp)

## Step 3 - Create a project with ClickHouse instance

In Bytebase, **Project** is the container to group logically related **Databases**, **Issues** and **Users** together, which is similar to the project concept in other dev tools such as Jira, GitLab. So before you deal with the database, a project must be created.

1. After the instance is created, click **Projects** on the top bar.

2. Click **New Project** to create a new project `TestClickHouse`, key is `TCH`, mode is `standard`. Click **Create**.
   ![bb-projects-new](/content/docs/tutorials/database-change-management-with-clickhouse/bb-projects-new.webp)

## Step 4 - Create a database in ClickHouse via Bytebase

In Bytebase, a **Database** is the one created by 'CREATE DATABASE xxx'. A database always belongs to a single **Project**. **Issue** represents a specific collaboration activity between Developer and DBA such as creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

1. After the project is created. Click **New DB** on the project top bar.
   ![bb-project-new-db](/content/docs/tutorials/database-change-management-with-clickhouse/bb-project-new-db.webp)

2. Fill the form with **Name** - `db_demo`, **Environment** - `Test`, and **Instance** - `ClickHouse instance`. Click **Create**.
   ![bb-create-db](/content/docs/tutorials/database-change-management-with-clickhouse/bb-create-db.webp)

3. It will create an issue “CREATE DATABASE ….” automatically. Because it’s for `Test` environment, the issue will run without waiting for your approval by default. Click **Resolve**, and the issue is `Done`. The database is created.
   ![bb-issue-dbdemo-done](/content/docs/tutorials/database-change-management-with-clickhouse/bb-issue-dbdemo-done.webp)

4. Go back to the home page by clicking **Home** on the left sidebar. On the home page, you can see the project, the database, and the issue you just resolved.
   ![bb-home-dbdemo-done](/content/docs/tutorials/database-change-management-with-clickhouse/bb-home-dbdemo-done.webp)

## Step 5 - Create a table in ClickHouse via Bytebase

In Step 4, you created an issue to create a database via UI workflow and then executed it. Let’s try to create another issue to alter that database.

1. Go to project `TestClickHouse`, and click **Alter Schema**.
   ![bb-project-alter-schema](/content/docs/tutorials/database-change-management-with-clickhouse/bb-project-alter-schema.webp)

2. Choose `db_demo` and click **Next**. It could generate a pipeline if you have different databases for different environments.
   ![bb-alter-schema-select-db](/content/docs/tutorials/database-change-management-with-clickhouse/bb-alter-schema-select-db.webp)

3. Input SQL as follows, and click **Create**.

```other
CREATE TABLE
 t1 (id UInt64, name String) ENGINE = MergeTree
ORDER BY id;
```

4. Bytebase will do some basic checks and then execute the SQL. Since it’s for `Test` environment, the issue is automatically approved by default. Click **Resolve issue**, and the issue status will become `Done`.
   ![bb-issue-create-table-done](/content/docs/tutorials/database-change-management-with-clickhouse/bb-issue-create-table-done.webp)

5. On the issue page, click **View change**. You will see diff for the change.
   ![bb-dbdemo-change-diff](/content/docs/tutorials/database-change-management-with-clickhouse/bb-dbdemo-change-diff.webp)

6. You can also go to **Change History** under the project to view the full history. Or go into a specific database to view its history.
   ![bb-project-change-history](/content/docs/tutorials/database-change-management-with-clickhouse/bb-project-change-history.webp)
   ![bb-db-change-history](/content/docs/tutorials/database-change-management-with-clickhouse/bb-db-change-history.webp)

## Bonus Section - Drift Detect

This section requires you to have **Enterprise Plan** (you can start 14 days trial directly in the product without credit card).

Now you can see the full change history of `db_demo`. However, what is **Establish new baseline**? When should it be used?

By adopting Bytebase, we expect teams to use Bytebase exclusively for all schema changes. Meanwhile, if someone has made ClickHouse schema change out side of Bytebase, obviously Bytebase won’t know it. And because Bytebase has recorded its own copy of schema, when Bytebase compares that with the live schema having that out-of-band schema change, it will notice a discrepancy and surface a schema drift anomaly. If that change is intended, then you should baseline the schema state again to reconcile.

In this section, you’ll be guided through this process.

1. Go to ClickHouse Cloud, click **Open SQL console**, and add a column `age` there. Make sure the new column is added.

```other
ALTER TABLE t1 ADD COLUMN age UInt8;
```

![ch-cloud-dbdemo-add-age](/content/docs/tutorials/database-change-management-with-clickhouse/ch-cloud-dbdemo-add-age.webp)

2. Wait for about 10 mins for Bytebase to detect the drift. Go back to Bytebase, and you can find the **Schema Drift** on:

database db_demo
![bb-drift-dbdemo](/content/docs/tutorials/database-change-management-with-clickhouse/bb-drift-dbdemo.webp)

Anomaly Center
![bb-drift-ac](/content/docs/tutorials/database-change-management-with-clickhouse/bb-drift-ac.webp)

3. Click **View diff**, you will see the exact drift.
   ![bb-view-drift-diff](/content/docs/tutorials/database-change-management-with-clickhouse/bb-view-drift-diff.webp)

4. Go to `db_demo` > **Change History** and click **Establish new baseline** to reconcile the schema.
   ![bb-dbdemo-create-new-baseline](/content/docs/tutorials/database-change-management-with-clickhouse/bb-dbdemo-create-new-baseline.webp)

5. It will create a baseline issue. Click **Resolve** to mark it done.
   ![bb-issue-dbdemo-baseline-done](/content/docs/tutorials/database-change-management-with-clickhouse/bb-issue-dbdemo-baseline-done.webp)

6. Go back to `db_demo` or Anomaly Center, and you will find the drift is gone.
   ![bb-dbdemo-no-drift](/content/docs/tutorials/database-change-management-with-clickhouse/bb-dbdemo-no-drift.webp)
   ![bb-ac-no-drift](/content/docs/tutorials/database-change-management-with-clickhouse/bb-ac-no-drift.webp)

## Summary and Next

Now you have connected ClickHouse with Bytebase, and tried out the UI workflow to do schema change. Bytebase will record the full change history for you. With **Enterprise Plan**, you can even have drift detection.

In the next article, you’ll try out GitOps workflow, which will store your ClickHouse schema in GitHub and trigger the change upon committing the change to the repository, to bring your ClickHouse change workflow to the next level, aka **Database DevOps** - [Database as Code](/blog/database-as-code).
