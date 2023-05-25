---
title: Deploy to render
---

[render](https://render.com) is a cloud application hosting provider. Bytebase provides a [render blueprint](https://github.com/bytebase/render) to deploy Bytebase to render.

## Prerequisites

You need a [render](https://render.com) account (free signup).

## Overview

The Bytebase render deployment contains a web service and a PosgreSQL database. The [blueprint](https://github.com/bytebase/render/blob/main/render.yaml) uses render's free plan, you can fork the repository if you want to change the plan or the deploy region.

<HintBlock type="info">

The free plan can only create at most one free PostgreSQL database. Because the Bytebase deployment requires a PostgreSQL database to store its own metadata, thus it will use up the quota.

</HintBlock>

## Steps

Visit https://dashboard.render.com/blueprints and follow [render doc](https://render.com/docs/infrastructure-as-code) to create the blueprint instance. When connecting the repository, choose our public repo https://github.com/bytebase/render or your forked repo.

![choose-repo](/content/docs/get-started/install/render-blueprint-repo.webp)

Choose a Service Group Name such as `bytebase`.

![choose-repo](/content/docs/get-started/install/render-blueprint-name.webp)

After the deployment, you should see render has created a Web Service and a PostgreSQL database.

![status](/content/docs/get-started/install/render-blueprint-status.webp)

Visit the created Web Service page and click the URL to start using Bytebase.

![status](/content/docs/get-started/install/render-blueprint-web.webp)
