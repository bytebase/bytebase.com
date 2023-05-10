---
title: Manage Render Database
description: Tutorial on how to manage Render PostgreSQL database
---

## Overview

[Render](https://render.com/) is a hosting service that allows you to deploy almost anything to the cloud, including static sites, web apps, Dockerfiles, APIs. And that includes [PostgreSQL databases](https://render.com/docs/databases).

You can create PostgreSQL databases on Render and use Bytebase to manage the database development lifecycle for those databases.

## Prerequisites

- [Sign up](https://dashboard.render.com/) for a Render account.
- After signing up, [create](https://dashboard.render.com/new/database) a PostgreSQL database. Feel free to choose the [Free Plan](https://render.com/docs/free), but note that free databases will expire in 90 days and Render will delete them if not upgraded.

## The Procedure

### Step 1 - Add Render database instance to Bytebase

Visit your Render dashboard and click on the database you created. We will need the connection details from this page.

![render-database-connections](/docs/how-to/integrations/render-database-connections.webp)

From your Bytebase **Create Instance** page, choose **Add Instance**, fill in the details to create the connection as follows:

1. **Database:** `PostgreSQL`.
2. **Instance Name:** any name of your choosing, e.g. `render-db`.
3. **Environment:** `Prod` or `Test` (select the environment you want to add the instance to).
4. **Host or Socket:** from your Render database page, copy the **External Database URL** to your text editor. The URL will look like `postgres://<username>:<password>@<host>:<port>/<database>`. Copy the `<host>:<port>` part to the Host or Socket field.
5. **Port:** 5432 (Render uses the default PostgreSQL port of 5432 to connect)
6. **Username:** copy the **Username** from your Render database page.
7. **Password:** copy the **Password** from your Render database page.
8. **Database:** copy the **Database** name from your Render database page.

![render-bytebase-create-instance](/docs/how-to/integrations/render-bytebase-create-instance.webp)

See [Add an Instance](/docs/get-started/configure-workspace/add-an-instance) for more details.

### Step 2 - Check if the database instance is properly imported

All databases should be synced properly. Expect some delay if the database instance is large.

![render-bytebase-instance](/docs/how-to/integrations/render-bytebase-instance.webp)

So should the tables under the databases.

![render-bytebase-database](/docs/how-to/integrations/render-bytebase-database.webp)