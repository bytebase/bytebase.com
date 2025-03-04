---
title: How to Set Up MySQL Using Docker
author: Ayra
updated_at: 2025/03/05 12:00:00
feature_image: /content/blog/how-to-set-up-mysql-using-docker/banner.webp
tags: How-To
featured: true
description: 'Set up a local MySQL database with Docker.'
---

<HintBlock type="info">

If you are using Mac, you can use following tools which include MySQL docker images across many versions:
- [DBngin](https://dbngin.com/) - A free all-in-one database version manager
- [Homebrew](https://brew.sh/) - Package manager for macOS

</HintBlock>

## Step-by-step Guide

### Prerequisites

Before you start, make sure you have [Docker](https://www.docker.com/products/docker-desktop) installed on your system.

### Step 1: Pull the MySQL Docker Image

Open your terminal and run:

```bash
docker pull mysql:8.0
```

This command downloads the official MySQL 8.0 image. You can replace `8.0` with your preferred version.

### Step 2: Create and Run a MySQL Container

```bash
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=your_password -p 3306:3306 -d mysql:8.0
```

This command:
- Creates a container named `mysql-container`
- Sets the root password to `your_password` (change this!)
- Maps port 3306 from the container to your host
- Runs MySQL in detached mode

### Step 3: Verify the Container is Running

```bash
docker ps
```

You should see your MySQL container in the list of running containers.

![container-running](/content/blog/how-to-set-up-mysql-using-docker/container-running.webp)

### Step 4: Connect to MySQL

Connect directly through the container using Docker CLI:

```bash
docker exec -it mysql-container mysql -uroot -p
```

This command opens a MySQL shell inside the running container, giving you direct access to your database server.

Alternatively, if you have the MySQL client installed on your host machine:

```bash
mysql -h 127.0.0.1 -P 3306 -uroot -p
```

When prompted, enter the password you specified.

### Step 5: Create a Database and User

Once connected to MySQL, you can create a database and user:

```sql
CREATE DATABASE my_database;
CREATE USER 'my_user'@'%' IDENTIFIED BY 'my_password';
GRANT ALL PRIVILEGES ON my_database.* TO 'my_user'@'%';
FLUSH PRIVILEGES;
```

You can exit MySQL server by `EXIT;`.

## More Optional Operations

### Persisting Data

To persist your MySQL data beyond the container lifecycle, use a volume:

```bash
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=your_password -p 3306:3306 -v mysql-data:/var/lib/mysql -d mysql:8.0
```

This creates a Docker volume named `mysql-data` that persists your database files.

### Common Docker MySQL Commands

Stop the container:
```bash
docker stop mysql-container
```

Start an existing container:
```bash
docker start mysql-container
```

Remove the container:
```bash
docker rm mysql-container
```

### Using Docker Compose (Recommended for Development)

For a more manageable setup, create a `docker-compose.yml` file:

```yaml
version: '3'
services:
  mysql:
    image: mysql:8.0
    container_name: mysql-container
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: my_database
      MYSQL_USER: my_user
      MYSQL_PASSWORD: my_password
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

Run with:
```bash
docker-compose up -d
```

## Conclusion

You now have a MySQL database running in Docker! This setup is ideal for development environments as it's isolated, reproducible, and easy to manage.

For production deployments, consider additional security configurations and backup strategies.
