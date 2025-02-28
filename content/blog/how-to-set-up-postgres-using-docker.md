---
title: How to Set Up Postgres Using Docker
author: Ayra
updated_at: 2024/09/10 12:00:00
feature_image: /content/blog/how-to-set-up-postgres-using-docker/banner.webp
tags: How-To
featured: true
description: 'Set up a local Postgres database with Docker.'
---

<HintBlock type="info">

If you are using Mac, you can use following tools which include Postgres docker images across many versions:

- [StackBricks](https://stackbricks.app/)
- [DBngin](https://dbngin.com/)
- [Postgres.app](https://postgresapp.com/)

</HintBlock>

## Step 1: Pull the Official PostgreSQL Image

We need to pull the official PostgreSQL image from Docker Hub. Open your terminal or command prompt and run:

```text
docker pull postgres
# -- Instead, for a certain version of postgres, e.g. 14.5, run:
# docker pull postgres:14.5
```

And wait for the latest version of the PostgreSQL image to be downloaded.

![step1](/content/blog/how-to-set-up-postgres-using-docker/step1.webp)

## Step 2: Create and Run a PostgreSQL Container

Now that we've downloaded the image, we can create and run a PostgreSQL container:

```text
docker run -d --name mypostgres -p 5432:5432 -e POSTGRES_PASSWORD=yourpassword postgres
```

This command runs the container in **detached mode** in the background, assigns a **name** to it, maps the container's **port** 5432 to the host's port 5432, sets the **password** for the default postgres user, and specifies the image to use for creating the **postgres** container.

Check whether the PostgreSQL container is running with this command:

```text
docker ps
```

![step2](/content/blog/how-to-set-up-postgres-using-docker/step2.webp)

## Step 3: Connect to the PostgreSQL Database and Operate

### Connect from the host machine

You can use the psql cammand to connect to your database.

```text
psql -h localhost -U postgres
```

### Connect within Docker

Or open an interactive terminal inside the container and connect to the PostgreSQL database with the postgres user.

```text
docker exec -it mypostgres psql -h localhost -U postgres
```

Then we can operate with SQL command after the "#".

![step3](/content/blog/how-to-set-up-postgres-using-docker/step3.webp)
