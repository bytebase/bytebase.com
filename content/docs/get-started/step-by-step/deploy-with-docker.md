---
title: Deploy with Docker
---

It's recommended to run Bytebase with Docker which is the easiest way to get you started.

## Prerequisites
Before starting, make sure you have installed [Docker](https://www.docker.com/get-started/).


## Run the command
Run the following command to start Bytebase on container port `8080` and map it to localhost port `5678`.

<IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

If you ran Bytebase before, you can reset all data by running this command:

```bash
rm -rf ~/.bytebase/data
```