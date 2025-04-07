---
title: How to set up MySQL using Docker
---

<HintBlock type="info">

If you are using Mac, you can use following tools which include MySQL docker images across many versions:

- [StackBricks](https://stackbricks.app/)
- [DBngin](https://dbngin.com/)

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
- Maps MySQL default port 3306 from the container to your host
- Runs MySQL in detached mode

### Step 3: Verify the Container is Running

```bash
docker ps
```

You should see your MySQL container in the list of running containers.

### Step 4: Connect to MySQL

Connect directly through the container using Docker CLI:

```bash
docker exec -it mysql-container mysql -uroot -p
```

This command opens a MySQL shell inside the running container, giving you direct access to your database server.

Alternatively, if you have the MySQL client installed on your host machine:

<HintBlock type="info">

To install MySQL client, you can refer to [this post](/blog/how-to-install-mysql-client-on-mac-ubuntu-centos-windows).

</HintBlock>

```bash
mysql -h 127.0.0.1 -P 3306 -uroot -p
```

### Step 5: Create a Database and User

Once connected to MySQL, you can create a database and user:

```sql
CREATE DATABASE my_database;
CREATE USER 'my_user'@'%' IDENTIFIED BY 'my_password';
GRANT ALL PRIVILEGES ON my_database.* TO 'my_user'@'%';
FLUSH PRIVILEGES;
```

You can exit MySQL server by `EXIT;`.

## Other Operations

### Persisting Data

To persist your MySQL data beyond the container lifecycle, use a volume when creating the container:

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

A bare minimum `docker-compose.yml` file with MySQL and an application:

```yaml
version: '1'

services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - '3306:3306'

  app:
    image: my-application:latest
    depends_on:
      - mysql
    environment:
      DB_HOST: mysql
      DB_NAME: mydatabase
      DB_USER: user
      DB_PASSWORD: password
    ports:
      - '8080:8080'

volumes:
  mysql_data:
```

Run with:

```bash
docker-compose up -d
```
