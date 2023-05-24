---
title: 'Bytebase 1.11.0 Deep Dive'
author: Tianzhou
published_at: 2023/01/17 23:21:21
feature_image: /content/blog/1-11-0-new-features/1-11-0-banner.webp
tags: Explanation
description: We are thrilled to announce the first release launch of 2023, marking a new beginning for our product and our valued customers. The version number was upgraded from 1.10.0 to 1.11.0. - MongoDB - Schema Diagram - Schema Editor.
---

We are thrilled to announce the first release launch of 2023, marking a new beginning for our product and our valued customers. The version number was upgraded from 1.10.0 to 1.11.0. With almost 200 commits, let's see what new features are introduced 👇
![github-commits](/content/blog/1-11-0-new-features/github-commits.webp)

## MongoDB

First of all, Bytebase unveils the first NoSQL support in its history, MongoDB, thus extending our coverage from the relative comfort zone of SQL relational databases to NoSQL, and another article will go into detail about this. There is another new database supported in this release, so if you are interested, deploy it and see it by yourself :)

![create-instance-mongo](/content/blog/1-11-0-new-features/create-instance-mongo.webp)

## Schema Diagram

The next one is the Schema Diagram, which is a feature that many users have wished for, since it is more intuitive to see the diagram.

Our Schema Diagram is automatically laid out, which took us some effort. The last diagram below is Bytebase's own complex Schema, which looks quite well. The one on the far right is our `Principal` table, which stores user information, user-centric :P

![diagram-employee](/content/blog/1-11-0-new-features/diagram-employee.webp)

![fit-content-within-view](/content/blog/1-11-0-new-features/fit-content-within-view.webp)

![diagram-bytebase](/content/blog/1-11-0-new-features/diagram-bytebase.webp)

## Schema Editor

Finally, we will talk about Schema Editor, which supports MySQL in the last release, and PostgreSQL this time.

Our Schema Editor has highlights for add, delete, and update, and it is linked to the Schema diagram just mentioned. Changes to the Schema are highlighted in the Schema Diagram, and it's easy to switch from Schema Diagram to Schema Editor.

![editor-diagram](/content/blog/1-11-0-new-features/editor-diagram.webp)

![schema-editor-highlight](/content/blog/1-11-0-new-features/schema-editor-highlight.webp)

![diagram-full](/content/blog/1-11-0-new-features/diagram-full.webp)

![diagram-from-date](/content/blog/1-11-0-new-features/diagram-from-date.webp)

That's all for this deep dive.

Today is also the second anniversary of Bytebase. The initial idea from day one was to create a developer tool that covers the **entire database development lifecycle of change, query, management, and security**, and to create a new category of **Database Development Platform** in the industry.

We have been working towards this goal for two years, and last year we were accepted by **CNCF Landscape** as the only product in the [**database CI/CD category**](https://landscape.cncf.io/?selected=bytebase), and we started to get enterprise-paying customers.

Last year, we kept a bi-weekly release cadence and announced 25 releases (never missed a beat). We will keep the momentum this year and drive more innovations to delight our customers:

- **Different** database development tasks
- **Multiple** database systems
- **Unified** process
- **Single** tool
  ![new-world](/content/blog/1-11-0-new-features/new-world.webp)
