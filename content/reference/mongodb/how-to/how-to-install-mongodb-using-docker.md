---
title: How to install MongoDB using Docker
---

## Prerequisites

1. **Docker installed** on your system

   - For installation instructions, visit [Get Docker](https://docs.docker.com/get-docker/)
   - Verify installation with: `docker --version`

2. **Docker Compose** (optional but recommended)
   - Usually included with Docker Desktop
   - Verify with: `docker-compose --version`

## Method 1: Using Docker Run Command

### Step 1: Pull the MongoDB Image

```bash
docker pull mongodb/mongodb-community-server
```

This downloads the official MongoDB Community Server image.

### Step 2: Create a Docker Volume (Optional)

To persist your MongoDB data beyond the container's lifecycle:

```bash
docker volume create mongodb_data
```

### Step 3: Run MongoDB Container

Basic run command:

```bash
docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server
```

With data persistence using the volume:

```bash
docker run --name mongodb -d -p 27017:27017 -v mongodb_data:/data/db mongodb/mongodb-community-server
```

With authentication enabled:

```bash
docker run --name mongodb -d -p 27017:27017 -v mongodb_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongodb/mongodb-community-server
```

### Step 4: Verify MongoDB is Running

```bash
docker ps
```

This should show your MongoDB container running.

## Method 2: Using Docker Compose

Docker Compose makes it easier to manage your MongoDB container configuration.

### Step 1: Create a docker-compose.yml File

Create a `docker-compose.yml` file in your project directory:

```bash
mkdir mongodb-docker
cd mongodb-docker
touch docker-compose.yml
```

### Step 2: Add MongoDB Configuration

Open the `docker-compose.yml` file and add:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongodb/mongodb-community-server
    container_name: mongodb
    ports:
      - 27017:27017
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    restart: unless-stopped

volumes:
  mongodb_data:
    driver: local
```

### Step 3: Start MongoDB with Docker Compose

In the directory containing your `docker-compose.yml` file:

```bash
docker-compose up -d
```

### Step 4: Verify MongoDB is Running

```bash
docker-compose ps
```

## Connecting to Your MongoDB Container

1. **Connect to the MongoDB shell inside the container**:

```bash
docker exec -it mongodb mongosh
```

2. **If you configured authentication, connect with**:

```bash
docker exec -it mongodb mongosh --username admin --password password
```

Alternatively, if you have the `mongosh` installed on your host machine:

<HintBlock type="info">

To install `mongosh`, you can refer to [this post](/reference/mongodb/how-to/how-to-install-mongodb-shell-on-mac-ubuntu-centos-windows).

</HintBlock>

```bash
mongosh --username admin --password password
```

## Creating a MongoDB with Replica Set

For applications requiring a replica set (like those using transactions), create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  mongodb-1:
    image: mongodb/mongodb-community-server
    container_name: mongodb-1
    command: ['--replSet', 'rs0', '--bind_ip_all']
    ports:
      - 27017:27017
    volumes:
      - mongodb_data_1:/data/db
    restart: unless-stopped

  mongodb-2:
    image: mongodb/mongodb-community-server
    container_name: mongodb-2
    command: ['--replSet', 'rs0', '--bind_ip_all']
    ports:
      - 27018:27017
    volumes:
      - mongodb_data_2:/data/db
    restart: unless-stopped

  mongodb-3:
    image: mongodb/mongodb-community-server
    container_name: mongodb-3
    command: ['--replSet', 'rs0', '--bind_ip_all']
    ports:
      - 27019:27017
    volumes:
      - mongodb_data_3:/data/db
    restart: unless-stopped

volumes:
  mongodb_data_1:
  mongodb_data_2:
  mongodb_data_3:
```

Start the containers:

```bash
docker-compose up -d
```

Initialize the replica set:

```bash
docker exec -it mongodb-1 mongosh --eval "rs.initiate({
  _id: 'rs0',
  members: [
    {_id: 0, host: 'mongodb-1:27017'},
    {_id: 1, host: 'mongodb-2:27017'},
    {_id: 2, host: 'mongodb-3:27017'}
  ]
})"
```

## Customizing MongoDB Configuration

To use a custom configuration file:

1. Create a MongoDB configuration file `mongod.conf`:

```yaml
storage:
  dbPath: /data/db
  journal:
    enabled: true

systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log
  logAppend: true

net:
  port: 27017
  bindIp: 0.0.0.0

security:
  authorization: enabled
```

2. Update your `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongodb/mongodb-community-server
    container_name: mongodb
    ports:
      - 27017:27017
    volumes:
      - mongodb_data:/data/db
      - mongodb_log:/var/log/mongodb
      - ./mongod.conf:/etc/mongod.conf
    command: ['--config', '/etc/mongod.conf']
    restart: unless-stopped

volumes:
  mongodb_data:
  mongodb_log:
```

## Troubleshooting

### Container Fails to Start

Check the logs:

```bash
docker logs mongodb
```

### Cannot Connect to MongoDB

Verify the container is running and the port is correctly mapped:

```bash
docker ps
```

### Permission Issues with Volumes

Ensure the mounted volumes have the correct permissions:

```bash
docker exec -it mongodb ls -la /data/db
```
