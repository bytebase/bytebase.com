---
title: 'Migrating Postgres: from Render to Neon'
author: Tianzhou
published_at: 2023/06/12 10:00:00
feature_image: /content/blog/migrating-postgres-from-render-to-neon/migration.webp
tags: Engineering
featured: false
description: How we migrate the SQL Chat database from Render to Neon.
---

## Background

![sqlchat](/content/blog/migrating-postgres-from-render-to-neon/sqlchat-ui.webp)

3 months ago, we announced our 2nd product line - [SQL Chat](/blog/sql-chat/), a SQL client using
natural language to interact with the database. It's offered as a service at [sqlchat.ai](https://sqlchat.ai)
and is also [open-sourced](https://github.com/sqlchat/sqlchat) for self-hosting.

Recently, we added account, subscription feature, which requires a database to host those info.
Following describes SQL Chat Postgres transition from [Render](https://render.com) to [Neon](https://neon.tech).

## Starting with Render

The existing SQL Chat app is using Next.js and running on Vercel. We pick Postgres as the database
and use Prisma as the database client. As to the Postgres hosting provider, since we have already
[used Render extensively at Bytebase](/blog/how-bytebase-uses-render) and are pretty happy with it,
so we just spinned up a Postgres instance there as well.

## The Problem

The testing phase goes smoothly, however, soon after we deploy it to production, we hit the 100 max
connection limit.

![max-connection](/content/blog/migrating-postgres-from-render-to-neon/max_connection.webp)

The common solution is using PgBouncer and Render does provide a [pre-built
template](https://render.com/docs/databases#connection-pooling). The instruction is for deploying a
PgBouncer as a private service. However, since SQL Chat is hosted on Vercel, we need to make PgBouncer
public. We tried to run PgBouncer as a public web service, but we were not able to make it work 🫠.

![render-web-service](/content/blog/migrating-postgres-from-render-to-neon/render-web-service.webp)

## Switching to Neon

Around the same time. Vercel and Neon just [announced a partnership](https://vercel.com/blog/vercel-storage#vercel-postgres-complex-data-made-easy) to allow provisioning a Neon database
right from the Vercel project. We have known Neon since its inception, so we took a deep look and
gladly found that Neon provides [built-in connectioning pooling](https://neon.tech/docs/connect/connection-pooling).

We first tried to provision a Neon database from the Vercel console.

![vercel-neon](/content/blog/migrating-postgres-from-render-to-neon/vercel-neon.webp)

We originally thought Vercel will extablish a private connection to Neon. But from the dashboard,
Neon database is still exposed as a public URL. Realizing this, we turn to provision the database
from the Neon console directly.

![neon-console](/content/blog/migrating-postgres-from-render-to-neon/neon-console.webp)

Then we changed our Prisma config to point the database URL to Neon's connection pooling endpoint,
deployed and hit the following error when SQL Chat tries to migrate the database schema.

```zsh
Error undefined: Database error
Error querying the database: db error: ERROR: prepared statement
```

Fortunately, Neon's doc has already provided the [instruction](https://neon.tech/docs/guides/prisma-migrate#prisma-migrate-with-pgbouncer) to deal with this. Prisma allows to use connection
pooling endpoint for normal database access, on the other hand, for Prisma migrate, it requires a
direct database connection. And since Prisma 4.10.0, it provides a `directUrl` setting to do that.
We thus made the change and deployed, everything worked!

![sample-connection](/content/blog/migrating-postgres-from-render-to-neon/sample-connection.webp)

To further consolidate the stack, we also moved the SQL Chat sample database to Neon. Notice we also
use the connection pooling endpoint.

![neon-invoice](/content/blog/migrating-postgres-from-render-to-neon/neon-invoice.webp)

Last week, we received our first bill from Neon. Neon's pricing is usage based, $8/month for hosting
2 postgres instance with conenction pooling included, not a bad deal.

## Summary

This article is not suggesting that Render is inferior to Neon. In fact, most of our Go-based
backend infra is still running on Render, connecting to the Render Postgres instance. Render has
done a good job filling the gaps left by the classic Heroku.

On the other hand, there are 2 main reasons for adopting Neon in SQL Chat:

1. The power of Vercel as a distribution channel. SQL Chat chooses Next.js because of its dominant
   ecosystem. And Vercel as the primary sponsor is the go-to place to host Next.js app. After seeing
   the Vercel, Neon partnership, we know the integration between Vercel and Neon can only get better.

1. Neon provides a good database DX:

   - Built-in postgres connection pooling which is a requirement for any web app with decent traffic.
   - Good documentation around the common integration path. When we hit that Prisma error, the
     instruction is right there. The [data import doc](https://neon.tech/docs/import/import-from-postgres)
     is also easy to follow to migrate the data.

Our flagship product Bytebase is for teams to manage database changes in the same way as managing
code changes using GitLab/GitHub. This expeirence of buliding SQL Chat on Vercel + Neon also teaches
us to deliver a better product to our developers and DBAs.
