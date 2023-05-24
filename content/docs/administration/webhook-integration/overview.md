---
title: Webhook Integration
---

<HintBlock type="warning">

Please make sure the [--external-url](/docs/get-started/install/external-url) is set correctly.

</HintBlock>

## Project webhook

User can configure project-level webhooks to let Bytebase post messages to the configured webhook endpoint upon various events.

For example, **[Slack](https://slack.com/)**.

Read [Project Webhook](/docs/administration/webhook-integration/project-webhook) in detail.

![Post to a slack channel](/content/docs/webhook-slash-example.png)

## Database webhook

User can configure database-level webhooks to let Bytebase post the configured webhook endpoint upon a successful backup.

For example, **[Better Uptime Heartbeats](https://docs.betteruptime.com/monitoring/monitor-types/cron-and-heartbeat-monitor)**.

![Integrate with Better Uptime Heartbeats](/content/docs/webhook-integrate-example.png)

Read [Database Webhook](/docs/administration/webhook-integration/database-webhook) in detail.

## External approval

Alongside project webhook notifications, users can configure issues to be approved by external systems by following [External Approval](/docs/administration/webhook-integration/external-approval).
