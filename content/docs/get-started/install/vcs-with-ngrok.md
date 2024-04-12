---
title: VCS with ngrok
---

[ngrok](https://ngrok.com/) is a reverse proxy tunnel, and in our case, we need it for a public network address in order to receive webhooks from VCS. ngrok we used here is for demonstration purposes. For production use, we recommend using [Caddy](https://caddyserver.com/).

    ![ngrok-reverse-proxy](/content/docs/get-started/vcs-with-ngrok/ngrok-reverse-proxy.webp)

1. Run Bytebase in [Docker](https://www.docker.com/) with the following command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

1. Bytebase is running successfully in Docker, and you can visit it via `localhost:8080`. Register an admin account and it will be granted the `workspace admin` role automatically.

1. Login to [ngrok Dashboard](https://dashboard.ngrok.com/get-started/setup) and complete the **Getting Started** steps to install and configure. If you want to use the same domain each time you launch ngrok, go to **Cloud Edge > Domains**, where you'll find the domain `<<YOURS>>.ngrok-free.app` linked to your account.

1. Run the ngrok command `ngrok http --domain=<<YOURS>>.ngrok-free.app 8080` to start ngrok with your specific domain, and you will see the output displayed below:
   
   ![terminal-ngrok](/content/docs/get-started/vcs-with-ngrok/ngrok-terminal.webp)

1. Log in Bytebase and click the **gear icon (Settings)** on the top right. Click **General** under Workspace. Paste `<<YOURS>>.ngrok-free.app` as **External URL** under **Network** section and click **Update**.

   ![external-url](/content/docs/get-started/vcs-with-ngrok/bb-external-url.webp)

1. Now you can access Bytebase via `<<YOURS>>.ngrok-free.app`.
