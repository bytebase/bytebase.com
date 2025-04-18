---
title: How to install MariaDB using Docker
---

<HintBlock type="info">

If you are using Mac, you can use [StackBricks](https://stackbricks.app/) which include MariaDB docker images across many versions.

</HintBlock>

## Step-by-step Guide

### Prerequisites

Before you start, make sure you have [Docker](https://www.docker.com/products/docker-desktop) installed on your system.

### Step 1: Pull the MariaDB Docker Image

First, you need to pull the official MariaDB image from Docker Hub:

```bash
docker pull mariadb
```

If you need a specific version, you can specify it with a tag:

```bash
docker pull mariadb:10.11
```

### Step 2: Create a Docker Volume (Optional)

To persist your data beyond the container's lifecycle, create a Docker volume:

```bash
docker volume create mariadb_data
```

### Step 3: Run the MariaDB Container

Launch a MariaDB container with the following command:

```bash
docker run --name mariadb-container \
  -e MARIADB_ROOT_PASSWORD=my-secret-pw \
  -p 3306:3306 \
  -v mariadb_data:/var/lib/mysql \
  -d mariadb
```

This command:

- Names the container `mariadb-container`
- Sets the root password to `my-secret-pw` (change this to a secure password)
- Maps port 3306 on your host to port 3306 in the container
- Mounts the `mariadb_data` volume to the container's data directory
- Runs the container in detached mode

### Step 4: Verify the Installation

Check if your container is running:

```bash
docker ps
```

You should see your MariaDB container in the list.

### Step 5: Connect to MariaDB

<HintBlock type="info">

To install MariaDB client, you can refer to [this post](/reference/mariadb/how-to/how-to-install-mariadb-client-on-mac-ubuntu-centos-windows).

</HintBlock>

Connect to your MariaDB server using the command-line client:

```bash
docker exec -it mariadb-container mariadb -uroot -p
```

When prompted, enter your root password. You should see the MariaDB prompt:

```bash
MariaDB [(none)]>
```

Alternatively, if you have the MariaDB client installed on your host machine:

```bash
mariadb -h 127.0.0.1 -P 3306 -u root -p
```

### Step 6: Create a Database and User

Now, create a database and a user with appropriate permissions:

```sql
CREATE DATABASE mydb;
CREATE USER 'myuser'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'%';
FLUSH PRIVILEGES;
```

### Step 7: Configure MariaDB (Optional)

If you need to customize MariaDB configuration, you can mount a custom configuration file:

1. Create a `my.cnf` file on your host system with your custom settings
2. Stop and remove the existing container:
   ```bash
   docker stop mariadb-container
   docker rm mariadb-container
   ```
3. Start a new container with the config file mounted:
   ```bash
   docker run --name mariadb-container \
     -e MARIADB_ROOT_PASSWORD=my-secret-pw \
     -p 3306:3306 \
     -v mariadb_data:/var/lib/mysql \
     -v /path/to/my.cnf:/etc/mysql/conf.d/my.cnf \
     -d mariadb
   ```

## Common Operations

To stop the container:

```bash
docker stop mariadb-container
```

To start the container:

```bash
docker start mariadb-container
```

To restart the container:

```bash
docker restart mariadb-container
```

To view container logs

```bash
docker logs mariadb-container
```

## Using Docker Compose (Recommended)

For production environments, using Docker Compose is recommended. Create a `docker-compose.yml` file:

```yaml
version: '3'
services:
  mariadb:
    image: mariadb
    container_name: mariadb-container
    restart: always
    environment:
      MARIADB_ROOT_PASSWORD: my-secret-pw
      MARIADB_DATABASE: mydb
      MARIADB_USER: myuser
      MARIADB_PASSWORD: mypassword
    ports:
      - '3306:3306'
    volumes:
      - mariadb_data:/var/lib/mysql
      # Uncomment to use custom configuration
      # - ./my.cnf:/etc/mysql/conf.d/my.cnf

volumes:
  mariadb_data:
```

Start your MariaDB container using Docker Compose:

```bash
docker-compose up -d
```
