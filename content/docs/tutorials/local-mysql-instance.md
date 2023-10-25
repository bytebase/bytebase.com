---
title: Run a Local MySQL Instance
author: Adela
tags: Tutorial
published_at: 2022/10/07 11:15
integrations: MySQL
level: Beginner
estimated_time: '5 mins'
description: How to run a MySQL instance locally with Docker and how to add it as an **Instance** for testing purpose.
---

This document describes how to run a MySQL instance locally with Docker and how to add it as an **Instance** for testing purpose.

## Prerequisites

Before starting, make sure you have installed [Docker](https://www.docker.com/get-started/).

## Step 1 - Start a local MySQL server in Docker

1. Start Docker.
2. Run the command in the terminal

```bash
docker run --name mysqld \
  --publish 3306:3306 \
  -e MYSQL_ROOT_HOST=172.17.0.1 \
  -e MYSQL_ROOT_PASSWORD=testpwd1 \
  mysql/mysql-server:8.0
```

<HintBlock type="warning">

The setup below is for testing purpose and should NOT be used in production setup. Also the MySQL data will be wiped out after the container stops.

</HintBlock>

## Step 2 - Add the MySQL Server as an Instance

1. Click **Instances** on the top bar.
2. Click **Add Instance** on the instances page, and you will see **Create Instance** dialog box.
3. Fill the fields as follows:

- Choose **MySQL**
- **Instance Name**: MySQL Docker for Test
- **Environment**: Test
- **Host or Socket**: host.docker.internal
- **Port**: 3306
- **Username**: root
- **Password**: testpwd1

4. Click **Create**, and you can see the newly added instance in the table.
