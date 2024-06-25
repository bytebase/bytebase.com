---
title: Deploy with Docker
---

It's recommended to [run Bytebase with Docker](/docs/get-started/self-host/#docker) which is the easiest way to get you started.

Run the following command to start Bytebase on container port `8080` and map it to localhost port `8080`.

<IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

If you ran Bytebase before, you can reset all data by running this command:

```text
rm -rf ~/.bytebase/data
```
