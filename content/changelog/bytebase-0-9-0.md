---
title: Bytebase 0.9.0
published_at: 2021/12/09 13:05:33
description: Add cmd+k command bar experience. Add database webhook
---

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._

## 🚀 New Features

### cmd+k command bar experience

![_](/content/changelog/0.9.0/kbar.webp)
User can now use cmd+k to invoke the command bar to quickly navigate among different Bytebase sections.

### Add database backup webhook

User can set up a webhook endpoint for the database and after a successful backup, Bytebase will send a POST request to the configured webhook endpoint.

As an example, user can use this feature to integrate with Better Uptime's [Heartbeats](https://docs.betteruptime.com/features/heartbeats) feature to monitor the status of database backups. In case Bytebase does not regularly send requests to Heartbeat endpoint configured on Better Uptime, Better Uptime will trigger the corresponding alert rule.
![_](/content/changelog/0.9.0/backup-webhook.webp)![_](/changelog/0.9.0/backup-webhook-better-uptime.webp)

### Gitpod Code Preview

We added one-click button on our GitHub front page to launch [Bytebase](https://github.com/bytebase/bytebase) in [Gitpod](https://www.gitpod.io/). Now user is only one click away from having a fully-fledged dev environment to play with Bytebase!
![_](/content/changelog/0.9.0/gitpod.webp)

## 🐞 Bug Fixes

- Fix tooltip position
- Add the missing EVENT privilege to the instruction for configuring the MySQL user connection

## 🎠 Community

- Add commit guide docs
- Special shout out to [@suzaku](https://github.com/suzaku) for contributing PRs (a lot!)
