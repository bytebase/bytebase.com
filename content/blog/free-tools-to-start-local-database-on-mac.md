---
title: Top 3 Free Tools to Start a Local Database Instance on Mac
author: Mila
published_at: 2023/04/24 21:21:21
feature_image: /content/blog/local-db/local-db-cover.jpg
tags: Industry
featured: true
description: To manually spin up several different kinds (and versions) of database instances for testing can be gruesome. Here are some free tools to help you start a local database instance on Mac.
---

Bytebase is a Database CI/CD tool for DevOps teams. It currently supports 10+ databases including MySQL, PostgreSQL, Redis, and MariaDB. From development to testing, we need to deploy several different kinds of database instances, which can be rather time-consuming and labor-intensive if deployed one by one.

There are a handful of tools on the market to spin up local database instances quickly, and folks on my team have recommended several free tools, so I thought I'd do a round-up.

Some background info: I'm not a dev (am a developer-marketer, I would test/try out new features before they are rolled out) and I use a Mac.

## DBngin

[DBngin](https://dbngin.com/) currently supports PostgreSQL, MySQL and Redis. And it supports certain different versions of the same database, and can also run multiple versions of database instances on multiple ports at the same time, very convenient for testing!

![dbngin-ui](/content/blog/local-db/dbngin-ui.webp)

DBngin is [open source](https://github.com/TablePlus/DBngin), and they belong to the organization TablePlus (database GUI tool), which means DBngin can be connected to TablePlus, and you can visually manage your local databases.

![dbngin-free](/content/blog/local-db/dbngin-free.webp)

## Postgres.app

[Postgres.app](https://postgresapp.com/), as the name (and logo) implies, only supports Postgres.

![postgresapp-db](/content/blog/local-db/postgresapp-db.webp)

It's actually a complete PostgreSQL installer that packages Postgres into a standard Mac app, and it's perfectly fine if you don't know how to use the command line, because there's a super simple UI. So if you want to run PostgreSQL on your Mac, this is the one.

Postgres.app is also [open source](https://github.com/PostgresApp/PostgresApp) with active development.

## StackBricks

[StackBricks](https://stackbricks.app/) supports MariaDB (points for being the only tool in this round-up that supports MariaDB!), MySQL, PostgreSQL and Redis, and a wide range of their versions, as well as the ability to start multiple local databases on multiple ports.

![stackbricks](/content/blog/local-db/stackbricks.webp)

StackBricks is not open source (but still free to use), but there is [an Issue Tracker](https://github.com/tpetry/stackbricks-community) for your feature requests.

## My Thoughts

For me, as long as the tool suffices for testing purposes, I don't really have high requirements for performance, I would say a simple and easy-to-use UI & multiple database support are the differentiators. In fact, I have been using DBngin, but I tried StackBricks for the sake of writing this post, and it looks like StackBricks is quite good, so I'm gonna try it out for a while.

How do you spin up local database instances for testing?
