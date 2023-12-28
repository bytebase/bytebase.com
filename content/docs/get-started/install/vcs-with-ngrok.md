---
title: VCS with ngrok
---

[ngrok](https://ngrok.com/) is a reverse proxy tunnel, and in our case, we need it for a public network address in order to receive webhooks from VCS. ngrok we used here is for demonstration purposes. For production use, we recommend using [Caddy](https://caddyserver.com/).

    ![ngrok-reverse-proxy](/content/docs/get-started/vcs-with-ngrok/ngrok-reverse-proxy.webp)

1. Login to [ngrok Dashboard](https://dashboard.ngrok.com/get-started/setup) and follow its **Getting Started** steps to install and configure.

1. Run ngrok:

   ```bash
   ngrok http 8080
   ```

   and obtain the public URL `https://b725-103-197-71-76.ap.ngrok.io`:
   ![terminal-ngrok](/content/docs/get-started/vcs-with-ngrok/terminal-ngrok.webp)

1. Run Bytebase in [Docker](https://www.docker.com/) with the following command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

1. Bytebase is running successfully in Docker, and you can visit it via `localhost:8080`. Register an admin account and it will be granted the `workspace admin` role automatically.

1. Click the **gear icon (Settings)** on the top right. Click **General** under Workspace. Paste `https://b725-103-197-71-76.ap.ngrok.io` as External URL under Network section and click Update.

   ![external-url](/content/docs/get-started/vcs-with-ngrok/set-external-url.webp)

1. Bytebase is running successfully in Docker, and you can visit it via `https://b725-103-197-71-76.ap.ngrok.io`.
