---
title: Docker (5 seconds)
---

This document guides you to run Bytebase in docker, which takes less than 5 seconds.

## Prerequisites

Before starting, make sure you have installed [Docker](https://www.docker.com/get-started/).

### Special notes for running on Linux

<HintBlock type="warning">

If you run Bytebase inside Docker on Linux and want to connect the database intance on the same host, then you need to supply the additional `--add-host host.docker.internal:host-gateway --network host` flags.

</HintBlock>

## Run locally (e.g. localhost:5678)

Run the following command to start Bytebase on container port 80 and bind to localhost:5678.

```bash
docker run --init \
  --name bytebase \
  --platform linux/amd64 \
  --restart always \
  --publish 5678:80 \
  --health-cmd "curl --fail http://localhost:5678/healthz || exit 1" \
  --health-interval 5m \
  --health-timeout 60s \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:%%bb_version%% \
  --data /var/opt/bytebase \
  --port 80
```

Bytebase will store its data under `~/.bytebase/data` , you can reset all data by running command:

```bash
rm -rf ~/.bytebase/data
```

Check [Server Startup Options](/docs/reference/command-line) for other startup options.

## Allow external access via URL

<HintBlock type="info">

For your setup, you need to replace https://bytebase.example.com with the actual URL your users would visit Bytebase from. See [Configure External URL](/docs/get-started/install/external-url).

</HintBlock>

Run the following command to start Bytebase on port 80 and visit Bytebase from https://bytebase.example.com

```bash
docker run --init \
  --name bytebase \
  --platform linux/amd64 \
  --restart always \
  --publish 80:80 \
  --health-cmd "curl --fail http://localhost:80/healthz || exit 1" \
  --health-interval 5m \
  --health-timeout 60s \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:%%bb_version%% \
  --data /var/opt/bytebase \
  --external-url https://bytebase.example.com \
  --port 80
```

## Troubleshoot

Run the following if something goes wrong.

```bash
docker logs bytebase
```

Normally you should see this:

<IncludeBlock url="/docs/get-started/install/terminal-output"></IncludeBlock>

### Unable to start Bytebase with Docker

#### Using [Colima](https://github.com/abiosoft/colima)

Due to the vm mechanism of colima, try to use the `--mount` option when starting colima as shown below:

```bash
mkdir ~/volumes
colima start --mount ~/volumes:w
docker run --init \
  --name bytebase \
  --platform linux/amd64 \
  --restart always \
  --publish 80:80 \
  --volume ~/.bytebase/data:/var/opt/bytebase bytebase/bytebase:%%bb_version%% \
  --data /var/opt/bytebase \
  --external-url https://bytebase.example.com \
  --port 80
```
