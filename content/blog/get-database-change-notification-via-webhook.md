---
title: Get Database Change Notification via Webhook
author: Candy
published_at: 2022/05/16 09:42:58
feature_image: /blog/get-database-change-notification-via-webhook/fish-hook.webp
tags: How-To
description: For better collaboration, DBAs and developers need to be notified when there is any update of the database changes. With Bytebase, you can configure webhooks at a project-level so that Bytebase can post database change notifications to the webhook endpoint.
---

Bytebase is an open-source database schema change and version control management tool for DBAs and developers.

For better collaboration, DBAs and developers need to be notified when there is any update of the database changes. With Bytebase, you can configure webhooks at a project-level so that Bytebase can post database change notifications to the webhook endpoint. You can receive notifications via your specified message systems such as Slack, Teams. The following is a list of activities that can be configured to trigger a webhook:

- A new issue is created
- The status of an issue is updated
- The status of a task under an issue is updated
- The information of an issue is updated
- A new comment is added to an issue

Meanwhile, there are 2 types of webhooks on a project-level:

- Pre-defined webhook
- Custom webhook

## Pre-defined webhook

With pre-defined webhook, users can receive database change notifications via Slack, Discord, Teams, DingTalk, Feishu, WeCom.

## Custom webhook

With custom webhook, Bytebase can post database change notifications to your own message systems such as in-house Ops Platform. For the HTTP message format of custom webhook, see [Project Webhook](/docs/administration/webhook-integration/project-webhook#custom).

Special thanks to [@Cluas](https://github.com/Cluas) for the PR [feat: add custom project webhook](https://github.com/bytebase/bytebase/pull/1184)!

## How to configure webhook

You can complete the webhook configuration in 3 steps:

**Step 1**. On the Project page, click "Webhooks"
![_](/blog/get-database-change-notification-via-webhook/project-webhook.webp)
**Step 2**. Click "Add a webhook", then choose an endpoint (take Slack as an example), and enter "Name" and "[Webhook url](/docs/administration/webhook-integration/project-webhook#supported-webhook-endpoints)"
![_](/blog/get-database-change-notification-via-webhook/webhook-config.webp)
**Step 3**. Select the triggers and click "Create"
![_](/blog/get-database-change-notification-via-webhook/webhook-event-type.webp)
As a result, you can now receive database change notifications via Slack:
![_](/blog/get-database-change-notification-via-webhook/webhook-slack.webp)
