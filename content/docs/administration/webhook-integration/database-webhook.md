---
title: Database Webhook
---

![database-webhook](/docs/database-webhook.png)

User can set webhook URLs for databases. After a successful backup, an HTTP POST request will be sent to it.

User can integrate this with, for example, [Heartbeats provided by Better Uptime](https://docs.betteruptime.com/features/heartbeats) to monitor database backup status.

![Better Uptime Heartbeat](/docs/database-webhook-gitlab.png)
