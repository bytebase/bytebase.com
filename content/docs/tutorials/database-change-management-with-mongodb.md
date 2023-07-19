---
title: 'DevOps: Database Change Management with MongoDB'
author: Ningjing
published_at: 2023/03/21 11:15
feature_image: /content/docs/tutorials/database-change-management-with-mongodb/feature-image.webp
tags: Tutorial
integrations: MongoDB
level: Beginner
description: MongoDB is a document database used to build highly available and scalable internet applications. This tutorial will guide you step-by-step to set up database change management for MongoDB in Bytebase.
---

A series of articles about DevOps: Database Change Management with MongoDB.

- DevOps: Database Change Management with MongoDB (this one)
- [DevOps: Database Change Management with MongoDB and GitHub](/docs/tutorials/database-change-management-with-mongodb-and-github)

---

[MongoDB](https://mongodb.com/) is a document database used to build highly available and scalable internet applications.

This tutorial will guide you step-by-step to set up database change management for MongoDB (Cloud and Server) in Bytebase. With Bytebase, a team can have a formalized review and rollout process to make MongoDB data change.

You’ll have a GUI and the full change history. You can use Bytebase free version to finish the tutorial.

## Features included

- Change Workflow
- Change History

## Prerequisites

Before you start this tutorial, make sure:

- You have either of
  - a [MongoDB Atlas](https://mongodb.cloud/) account
  - a [MongoDB Server](https://www.mongodb.com/try/download/community) running.
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
   ![docker](/content/docs/tutorials/database-change-management-with-mongodb/docker.webp)

3. Visit localhost:5678 in your browser. Register the first admin account which will be granted [`Workspace Owner`](/docs/concepts/roles-and-permissions).
   ![register](/content/docs/tutorials/database-change-management-with-mongodb/register.webp)

## Step 2 - Add MongoDB in Bytebase

In Bytebase, ​​an Instance could be your on-premises MySQL instance, an AWS RDS instance etc, in this tutorial, a MongoDB Atlas account or a MongoDB Server instance.

1. Visit `localhost:5678` and log in as `Workspace Owner`.
   ![login](/content/docs/tutorials/database-change-management-with-mongodb/login.webp)

2. Click **Add Instance**.
   ![bb-add-instance](/content/docs/tutorials/database-change-management-with-mongodb/bb-add-instance.webp)

3. Add a **MongoDB instance** and click **Create**.

Pay attention to some fields:

**Environment**: choose `Test`, if you choose `Prod`,  issues will wait for approval by default. In this tutorial, we try to keep it simple. However, it’s all configurable.

### Cloud (MongoDB Atlas)

If you use Cloud version.

Go to Atlas MongoDB **Security** > **Network Access** and add IP allowing access from `Anywhere`.

Go to Atlas MongoDB **Deployment** > **Database**, and click **Connect**.
![atlas-connect](/content/docs/tutorials/database-change-management-with-mongodb/atlas-connect.webp)

Click **Connect to your application**.

![atlas-connect-to-cluster](/content/docs/tutorials/database-change-management-with-mongodb/atlas-connect-to-cluster.webp)

Find this string `cluster0.8bxxxbz.mongodb.net`. Go back to Bytebase, put the string into **Host or Socket**, and leave **Port** empty.

Choose `mongodb+srv://` as **Connection String Schema**.

### Server

If you run MongoDB server, fill in **Host or Socket** with `host.docker.internal`.

Choose `mongodb://` as **Connection String Schema**.

## Step 3 - Create a project with MongoDB instance

In Bytebase, **Project** is the container to group logically related **Databases**, **Issues** and **Users** together, which is similar to the project concept in other dev tools such as Jira, GitLab. So before you deal with the database, a project must be created.

1. After the instance is created, click **Projects** on the top bar.

2. Click **New Project** to create a new project `TestMongo`, key is `TMG`, mode is `standard`. Click **Create**.

## Step 4 - Create a database in MongoDB via Bytebase

In Bytebase, a **Database** is the one created by 'CREATE DATABASE xxx'. A database always belongs to a single **Project**. **Issue** represents a specific collaboration activity between Developer and DBA such as creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

1. Go into the project `TestMongo`. Click **New DB** on the project top bar.
   ![bb-project-new-db](/content/docs/tutorials/database-change-management-with-mongodb/bb-project-new-db.webp)

2. Fill the form with **New Database Name** - `dbdemo`, **New Collection Name** - `cdemo`, **Environment** - `Test`, and your created instance. Click **Create**.
   ![bb-create-db](/content/docs/tutorials/database-change-management-with-mongodb/bb-create-db.webp)

3. It will create an issue automatically. Because it’s for `Test` environment, the issue will run without waiting for your approval by default. Click **Resolve**, and the issue is `Done`. A database and a collection are created.
   ![bb-issue-dbdemo-done](/content/docs/tutorials/database-change-management-with-mongodb/bb-issue-dbdemo-done.webp)

4. Go back to the home page by clicking **Home** on the left sidebar. On the home page, you can see the project, the database, and the issue you just resolved.

## Step 5 - Add data in MongoDB via Bytebase

In Step 4, you created an issue to create a database and a collection via UI workflow and then executed it. Let’s try to create another issue to add data to it.

1. Go to project `TestMongoDB`, and click **Change Data**.
   ![bb-project-change-data](/content/docs/tutorials/database-change-management-with-mongodb/bb-project-change-data.webp)

2. Choose `dbdemo` and click **Next**. It could generate a pipeline if you have different databases for different environments.
   ![bb-project-change-data-select-db](/content/docs/tutorials/database-change-management-with-mongodb/bb-project-change-data-select-db.webp)

3. Input statement as follows, and click **Create**.

```other
db.cdemo.insertOne({
  id: 1,
  name: "Adela"
})
```

4. Bytebase will do some basic checks and then execute the statement. Since it’s for `Test` environment, the issue is automatically approved by default. Click **Resolve issue**, and the issue status will become `Done`.
   ![bb-issue-insert-done](/content/docs/tutorials/database-change-management-with-mongodb/bb-issue-insert-done.webp)

5. Go to **Change History** under the project to view the full history. Or go into a specific database to view its history.
   ![bb-project-change-history](/content/docs/tutorials/database-change-management-with-mongodb/bb-project-change-history.webp)
   ![bb-db-change-history](/content/docs/tutorials/database-change-management-with-mongodb/bb-db-change-history.webp)

## Summary and Next

Now you have connected MongoDB with Bytebase, and tried out the UI workflow to do data change. Bytebase will record the full change history for you.

In the next article, you’ll try out GitOps workflow, which will store your MongoDB in GitHub and trigger the change upon committing the change to the repository, to bring your MongoDB change workflow to the next level, aka **Database DevOps** - [Database as Code](/blog/database-as-code).
