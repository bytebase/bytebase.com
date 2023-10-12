---
title: 'DevOps: Database Change Management with TiDB'
author: Ningjing
published_at: 2023/01/03 21:15
feature_image: /content/docs/tutorials/database-change-management-with-tidb/db-change-tidb.webp
tags: Tutorial
integrations: TiDB
level: Beginner
description: TiDB is an open-source NewSQL database that supports Hybrid Transactional and Analytical Processing workloads. This tutorial will guide you step-by-step to set up database change management for TiDB in Bytebase.
---

A series of articles about DevOps: Database Change Management with TiDB

- DevOps: Database Change Management with TiDB (this one)
- [DevOps: Database Change Management with TiDB and GitHub](/docs/tutorials/database-change-management-with-tidb-and-github)

---

[TiDB](https://www.pingcap.com/tidb/) is an open-source NewSQL database that supports Hybrid Transactional and Analytical Processing (HTAP) workloads. It is **MySQL compatible** and can provide horizontal scalability, strong consistency, and high availability.

This tutorial will guide you step-by-step to set up database change management for TiDB in Bytebase. With Bytebase, a team can have a formalized review and rollout process to make TiDB schema change and data change.

Bytebase provides a GUI for teams to **perform database changes** and **retain the full migration history**. You can use Bytebase free version to finish the tutorial.

There is also a bonus section about **drift detection** for those advanced users if needed.

## Prerequisites

Before you start this tutorial, make sure:

- You have [deployed a local TiDB Cluster](https://docs.pingcap.com/tidb/stable/quick-start-with-tidb).
- You have [Docker](https://www.docker.com/) installed locally.

## Step 1 - Start Bytebase in Docker

1. Make sure your docker daemon is running, and start the Bytebase docker container by typing the following command in the terminal.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

2. Bytebase is running successfully in Docker, and you can visit it via `localhost:5678`.
   ![docker](/content/docs/tutorials/database-change-management-with-tidb/docker.webp)

3. Visit `localhost:5678` in your browser. Register the first admin account which will be granted `Workspace Owner`.
   ![register](/content/docs/tutorials/database-change-management-with-tidb/register.webp)

## Step 2 - Add a TiDB cluster in Bytebase

In Bytebase, ​​an **Instance** could be your on-premises MySQL instance, an AWS RDS instance etc, in this tutorial, a TiDB account.

1. Visit `localhost:5678` and login as `Workspace Owner`.
   ![login](/content/docs/tutorials/database-change-management-with-tidb/login.webp)

2. Click **Add Instance**.
   ![add-instance](/content/docs/tutorials/database-change-management-with-tidb/add-instance.webp)

3. Add a TiDB instance. You need to pay attention to some fields:
   ![create-instance](/content/docs/tutorials/database-change-management-with-tidb/create-instance.webp)

- **Environment**: choose `Test`, if you choose `Prod`, you will need approval for all future change requests. In this tutorial, let's try to keep it simple. (However, it’s all configurable later.)
- **Account name** / **Port**: host.docker.internal / 4000
- **Username and password**: root / (leave it empty)

## Step 3 - Create a Project

In Bytebase, **Project** is the container to group logically related **Databases, Issues** and **Users** together, which is similar to the project concept in other dev tools such as Jira, GitLab. So before you deal with the database, a project must be created.

1. After the instance is created, click **Projects** on the top bar.

2. Click **New Project** to create a new project `TestTiDB`, key is `TT`, mode is `standard`. Click **Create**.
   ![proj-new-project](/content/docs/tutorials/database-change-management-with-tidb/proj-new-proj.webp)

## Step 4 - Create a database in TiDB via Bytebase

In Bytebase, a **Database** is the one created by `CREATE DATABASE xxx`. A database always belongs to a single **Project**. **Issue** represents a specific collaboration activity between Developer and DBA such as creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

1. After the project is created, go to the project and click **New DB**.
   ![new-db](/content/docs/tutorials/database-change-management-with-tidb/new-db.webp)

2. Fill the form with **Name** - `demo`, **Environment** - `Test`, and **Instance** - `TiDB instance`. Click **Create**.
   ![create-db](/content/docs/tutorials/database-change-management-with-tidb/create-db.webp)

3. Bytebase will create an issue “CREATE DATABASE ….” automatically. Because it’s for the `Test` environment, the issue will run without waiting for your approval by default. Click **Resolve**, and the issue is Done. The database is created.
   ![issue-create-demo-done](/content/docs/tutorials/database-change-management-with-tidb/issue-create-demo-done.webp)

4. Go back to the home page by clicking **Home** on the left sidebar. If it’s the first time you use Bytebase, it’ll show a celebration. On the home page, you can see the project, the database, and the issue you just resolved.
   ![home-tidb-demo](/content/docs/tutorials/database-change-management-with-tidb/home-tidb-demo.webp)

## Step 5 - Create a table in TiDB via Bytebase

In Step 4, you actually created an issue in UI workflow and then executed it. Let’s make it more explicit.

1. Go to project `TestTiDB`, and click **Alter Schema**.
   ![proj-testtidb-alter-schema](/content/docs/tutorials/database-change-management-with-tidb/proj-testtidb-alter-schema.webp)
2. Choose `demo` and click **Next**.
   ![alter-schema](/content/docs/tutorials/database-change-management-with-tidb/alter-schema.webp)
3. Input title, SQL, and Assignee, and click **Create**.

```sql
CREATE TABLE t1 (
  id BIGINT NOT NULL,
  nickname VARCHAR(255)
);
```

4. Bytebase will do some basic checks and then execute the SQL. Since it’s for `Test` environment, the issue is automatically approved by default. Click **Resolve issue**.
   ![issue-create-t1](/content/docs/tutorials/database-change-management-with-tidb/issue-create-t1.webp)

5. The issue status will become Done.
   ![issue-create-t1-done](/content/docs/tutorials/database-change-management-with-tidb/issue-create-t1-done.webp)

6. On the issue page, click **view migration**. You will see diff for each migration.
   ![db-demo-migration-t1](/content/docs/tutorials/database-change-management-with-tidb/db-demo-migration-t1.webp)

7. You can also go to **Migration History** under the project to view the full history. Or go into a specific database to view its history.
   ![proj-testtidb-mh](/content/docs/tutorials/database-change-management-with-tidb/proj-testtidb-mh.webp)
   ![db-demo-mh](/content/docs/tutorials/database-change-management-with-tidb/db-demo-mh.webp)

## Bonus Section - Schema Drift Detection

To follow this section, you need to have **Team Plan** or **Enterprise Plan** (you can start 14 days trial directly in the product without credit card).
![trial-14-days](/content/docs/tutorials/database-change-management-with-tidb/trial-14-days.webp)

Now you can see the full migration history of database `demo`. However, what is **Establish new baseline**? When should it be used?

By adopting Bytebase, we expect teams to use Bytebase exclusively for all schema changes. Meanwhile, if someone has made TiDB schema change out side of Bytebase, obviously Bytebase won’t know it. And because Bytebase has recorded its own copy of schema, when Bytebase compares that with the live schema having that out-of-band schema change, it will notice a discrepancy and surface a schema drift anomaly. If that change is intended, then you should establish new baseline to reconcile the schema state again.

In this section, you’ll be guided through this process.

1. Go to the Terminal, and connect to TiDB.
   ![terminal-mysql-tidb-4000](/content/docs/tutorials/database-change-management-with-tidb/terminal-mysql-tidb-4000.webp)
   and add a COLUMN there. Make sure the new column is added.
   ![terminal-t1](/content/docs/tutorials/database-change-management-with-tidb/terminal-t1.webp)

2. Wait for 10 mins (as Bytebase does the check roughly every 10 mins). Go back to Bytebase, and you can find the Schema Drift on database `demo`:
   ![db-demo-schema-drift](/content/docs/tutorials/database-change-management-with-tidb/db-demo-schema-drift.webp)

The Anomaly Center also surfaces the drift:
![ac-schema-drift](/content/docs/tutorials/database-change-management-with-tidb/ac-schema-drift.webp)

3. Click **View diff**, you will see the exact drift.
   ![demo-schema-drift-age](/content/docs/tutorials/database-change-management-with-tidb/demo-schema-drift-age.webp)

4. Use baseline to reconcile the schema state from the live database schema. Go to demo > **Migration History** and click **Establish new baseline**.
   ![db-demo-new-baseline](/content/docs/tutorials/database-change-management-with-tidb/db-demo-new-baseline.webp)

5. It will create an issue. Click **Resolve** to make it done.
   ![issue-establish-demo-baseline-done](/content/docs/tutorials/database-change-management-with-tidb/issue-establish-demo-baseline-done.webp)

6. Go back to demo or Anomaly Center, and you will find the Drift is gone.
   ![db-demo-no-anomalies](/content/docs/tutorials/database-change-management-with-tidb/db-demo-no-anomalies.webp)
   ![ac-no-anomaly](/content/docs/tutorials/database-change-management-with-tidb/ac-no-anomaly.webp)

## Summary and Next

Now you have connected TiDB with Bytebase, and tried out the UI workflow to do schema change. Bytebase will record the full migration history for you. With **Team or Enterprise Plan**, you can even have schema drift detection.

In the next article, you’ll try out GitOps workflow, which will store your TiDB schema in GitHub and trigger the change upon committing the change to the repository, to bring your TiDB change workflow to the next level of Database DevOps - [Database as Code](/blog/database-as-code).
