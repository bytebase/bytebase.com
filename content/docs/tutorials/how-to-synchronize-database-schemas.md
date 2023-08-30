---
title: How to Synchronize Database Schemas
author: Ningjing
published_at: 2022/11/24 18:00
feature_image: /content/docs/tutorials/how-to-synchronize-database-schemas/sync-schema.webp
tags: Tutorial
integrations: General
level: Beginner
description: This article briefly describes the general scenarios of database schema synchronization and how to use this feature smoothly in Bytebase with pure UI operations.
---

This article briefly describes the general scenarios of **database schema synchronization** and how to use this feature smoothly in Bytebase with **pure UI operations**.

## General Scenarios

Bytebase's database **schema synchronization** feature (introduced in [1.8.0](/changelog/bytebase-1-8-0)） supports copying a specific schema version from one database to another. Without this feature, developers have to write SQL statements cautiously and apply them manually; Now with this feature, they can simply tell Bytebase which database schema needs to be replicated to the target database, and the whole process can be done from UI operations. This feature can solve the following scenarios:

### Scenario 1

During the product release process, for different environments, such as dev / staging / prod, you need to do schema synchronization. For example, the R&D release process from dev to staging, then to prod in the forward direction, or from prod to dev for testing purposes in the reverse direction.

### Scenario 2

For the production environment, databases with identical schemas, such as SaaS, multi-region game deployment, etc.

1. Manual modification by humans due to special ad-hoc reasons - causes database schema drift, which needs to reconciliation
2. The vendor maintains multiple product versions, so it also needs to reconcile the schema.

### Easy Steps

In the Bytebase Console:

1. Select the project first;
2. Select a specific database schema as the synchronization source;
3. Select the database you want to sync to;

Bytebase will then calculate the schema differences between these two and automatically generate the suggested DDL statements. (e.g., ALTER TABLE ......)

![sync-schema](/content/docs/tutorials/how-to-synchronize-database-schemas/sync-schema-ui.webp)

## Tutorial: Experience the feature in 5 mins

Here is how we install Bytebase and try out schema synchronization. Even if you have never tried Bytebase before, you can complete the process within 5 mins.

### Preparation Phase

0. Make sure you installed [Docker](https://www.docker.com/).

1. Copy and paste the commands to start one Bytebase and two MySQL instances via Docker.

```bash
docker run --init \
  --name bytebase \
  --restart always \
  --publish 5678:8080 \
  --health-cmd "curl --fail http://localhost:5678/healthz || exit 1" \
  --health-interval 5m \
  --health-timeout 60s \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:$$bb_version$$ \
  --data /var/opt/bytebase \
  --port 8080
```

```bash
docker run --name mysqldtest \
  --publish 3307:3306 \
  -e MYSQL_ROOT_HOST=172.17.0.1 \
  -e MYSQL_ROOT_PASSWORD=testpwd1 \
  mysql/mysql-server:8.0
```

```bash
docker run --name mysqldprod \
  --publish 3308:3306 \
  -e MYSQL_ROOT_HOST=172.17.0.1 \
  -e MYSQL_ROOT_PASSWORD=testpwd1 \
  mysql/mysql-server:8.0
```

2. Register and sign in **Bytebase Console**. Add two instances in two environments (**Test**/**Prod**), respectively. Username: `root`, Password:`testpwd1`
   ![2 instances](/content/docs/tutorials/how-to-synchronize-database-schemas/2instances.webp)

3. Create project **sync-schema**, and within the project, click **Create DB** to create databases as follows:
   ![2 databases](/content/docs/tutorials/how-to-synchronize-database-schemas/2databases.webp)

4. Go back to project **sync-schema** page, and click **Alter Schema**. Choose **dbtest** in **Test**, and click **Next**. Copy and paste the SQL below and click **Create**.

```sql
CREATE TABLE t1 (
   person_id INT,
   last_name VARCHAR(255),
   first_name VARCHAR(255),
   address VARCHAR(255),
   city VARCHAR(255)
);
```

5. Go back to project **sync-schema** page, and click **Alter Schema**. Choose **dbprod** in **Prod**, and click **Next**. Copy and paste the SQL below and click **Create**.

```sql
CREATE TABLE t2 (
   person_id INT,
   full_name VARCHAR(255)
);
```

### Feature Experience Phase

1. Go back to the project **sync-schema** page, click **Schema-Sync**, and fill in steps 1-3 to synchronize the schema of the **dbtest** database to **dbprod**:
   ![sync-schema UI](/content/docs/tutorials/how-to-synchronize-database-schemas/sync-schema-ui.webp)

2. Click **Preview Issue**, you will go to the new issue page with preview:
   ![issue SQL](/content/docs/tutorials/how-to-synchronize-database-schemas/issue-sql.webp)

3. Click **Create**, and the **Issue** is truly created. **Approve** and **Fix** the issue, the schema synchronization will be completed.
   ![dbprod t1](/content/docs/tutorials/how-to-synchronize-database-schemas/dbprod-t1.webp)

## Enterprise Plan

In Bytebase **Free**, you can choose the latest history version; In **Pro Plan** or **Enterprise Plan**, you can choose an arbitrary schema version from the full migration history.

From Bytebase [1.8.0](/changelog/bytebase-1-8-0), you can start a 14-day **Pro Plan** or **Enterprise Plan**
trial without credit card.
![dbprod t1](/content/docs/tutorials/how-to-synchronize-database-schemas/dbprod-t1.webp)

Is the experience smooth? Or do you encounter any problems? Feel free to join our [Discord Group](https://discord.gg/huyw7gRsyA) to talk about it!

In the following article, we’ll explain how Bytebase implements schema synchronization for MySQL from a technical perspective. Stay tuned!
