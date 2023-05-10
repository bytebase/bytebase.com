---
title: Manage Neon Database
description: Tutorial on how to manage Neon PostgreSQL database
---

## Overview

[Neon](https://neon.tech/) is a fully managed serverless PostgreSQL that offers cool features such as [database branching](https://neon.tech/docs/introduction/branching/), and bottomless storage.

You can create a PostgreSQL instance on Neon and use Bytebase to manage the database development lifecycle for those databases.

While Neon already has developer-oriented features like branching, Bytebase adds extra value to offer a systematic database development and change workflow. This is especially useful for cross-functional teams requiring collaboration (e.g. having dedicated DBA or platform engineering team apart from the application development teams).

## Prerequisites

- [Sign up](https://console.neon.tech/) for Neon, you can sign in with a Github or Google account.
- After signing in, you are directed to the Neon Console where you can [set up your project](https://neon.tech/docs/get-started-with-neon/setting-up-a-project/).

## The Procedure

### Step 1 - Set up project on Neon and collect connection info

Once you have set up your project, an `.env` file will be generated that contains the connection details for your Neon databases, download the file (and make sure to keep it safe!).

![neon-project-details](/docs/how-to/integrations/neon-project-details.webp)

Within the file, we will need the following details to establish connection with Bytebase.

![env-file-details](/docs/how-to/integrations/neon-env-file-details.webp)

### Step 2 - Add Neon database instance to Bytebase

From your Bytebase **Create Instance** page, choose **Add Instance**, fill in the details to create the connection as follows:

1. **Database:** `PostgreSQL`.
2. **Instance Name:** any name of your choosing, e.g. `neon-bb`.
3. **Environment:** `Prod` or `Test` (select the environment you want to add the instance to).
4. **Host or Socket:** the **PGHOST** from the `.env` file
5. **Port:** 5432 (Neon uses the default PostgreSQL port of 5432 to connect)
6. **Username:** copy the **PGUSER** from the `.env` file
7. **Password:** copy the **PGPASSWORD** from the `.env` file
8. **Database:** copy the **PGDATABASE** from the `.env` file

![neon-bytebase-create-instance](/docs/how-to/integrations/neon-bytebase-create-instance.webp)

See [Add an Instance](/docs/get-started/configure-workspace/add-an-instance) for more details.

### Step 3 - Check if the database instance is properly imported

All databases should be synced properly. Expect some delay if the database instance is large.

![neon-bytebase-instance](/docs/how-to/integrations/neon-bytebase-instance.webp)

So should the tables under the databases.

![neon-bytebase-database](/docs/how-to/integrations/neon-bytebase-database.webp)