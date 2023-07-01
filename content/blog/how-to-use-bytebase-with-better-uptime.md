---
title: How to use Bytebase with Better Uptime
author: Zhe
published_at: 2022/04/21 10:35:39
feature_image: /content/blog/how-to-use-bytebase-with-better-uptime/bytebase-use-better-uptime.webp
tags: Tutorial
integrations: General
description: We use Better Uptime as a way to monitor our websites. With a feature called heartbeats, it is also an easy-to-use tool to monitor Bytebase automatic backup.
---

## What is Bytebase

[Bytebase](https://bytebase.com/) is a startup I am currently taking an internship at. Its aspiration is to build an open-source database tool for DBAs and developers – GitLab for database schema lifecycle management. We are a remote team and most of our development happens on GitHub.

## Why we use Better Uptime

[Better Uptime](https://betteruptime.com/) is the tool we use to monitor our websites.
![_](/content/blog/how-to-use-bytebase-with-better-uptime/better-uptime-monitoring-dashboard.webp)![_](/content/blog/how-to-use-bytebase-with-better-uptime/better-uptime-page-detail.webp)
Of all the Better Uptime monitor types, there is a type called **heartbeats**. Here are the benefits of using heartbeats quoted from [Better Uptime documentation.](https://docs.betteruptime.com/monitoring/monitor-types/cron-and-heartbeat-monitor)

> Every heartbeat comes with a unique URL you need to periodically make requests to in order for the heartbeat NOT to create a new incident.
> Think a database backup script you run every day in your CRON job. How do you know it runs correctly?
> Add a simple `curl "<your-heartbeat-url>"` command at the end of the script to monitor it.
> We will alert the current on-call person if the script fails to make a request to the URL every X minutes.

It happens that Bytebase supports automatic backup at the database level. Bytebase also supports enforcing backup schedule policies for each environment. e.g. DBA can require the database in the production environment to have daily backups.

In Bytebase [0.9.0](https://bytebase.com/changelog/bytebase-0-9-0), we introduced a new feature called **database webhook**.  It allows users to set a webhook endpoint if the automatic backup is enabled.  After a successful database backup, a POST request will be sent to it.  Isn't it perfect to use this feature with heartbeats?

## How to configure database webhook

It's quite simple. Just copy the URL from Better Uptime and save it in Bytebase. You are ready to go.
![_](/content/blog/how-to-use-bytebase-with-better-uptime/better-uptime-heartbeat.webp)![_](/content/blog/how-to-use-bytebase-with-better-uptime/bytebase-backup-webhook.webp)
