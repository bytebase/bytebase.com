---
title: Introducing MongoDB Support in Bytebase
author: Candy
updated_at: 2023/01/12 13:37:17
feature_image: /content/blog/introducing-mongodb-support-in-bytebase/cover.webp
tags: Announcement
integrations: MongoDB
featured: true
description: Bytebase 1.11.0 brings MongoDB support. This blog post walks you through managing MongoDB with Bytebase.
---

## Why MongoDB

MongoDB is a popular document-oriented database with the scalability and flexibility that you want with the querying and indexing that you need. MongoDB stores data records as documents (specifically BSON documents) which are gathered together in collections. A database stores one or more collections of documents.

As the [DB-Engines](https://db-engines.com/en/ranking) ranking shows, MongoDB is the only NoSQL database in the top 5.
![db-rank-3](/content/blog/introducing-mongodb-support-in-bytebase/db-rank-3.webp)

Some Bytebase customers also have MongoDB besides MySQL/PostgreSQL, and they ask us if Bytebase can support MongoDB so they can manage all transactional database changes via Bytebase. Before MongoDB, Bytebase only supports databases having SQL interface. But the customers' request is reasonable, so the Bytebase team accepts the challenge and today we are excited to announce the MongoDB support.

## Manage MongoDB Changes

With [Bytebase 1.11.0](https://www.bytebase.com/changelog/bytebase-1-11-0), you can add an instance to connect to a MongoDB deployment, then you can:

- Create an issue to create, update and delete documents in UI workflow and GitOps workflow. See the screenshot below to insert documents into the collection “student”.
  ![insert-doc](/content/blog/introducing-mongodb-support-in-bytebase/insert-doc.webp)

- Explore the migration history in the database details page.
  ![migration-his](/content/blog/introducing-mongodb-support-in-bytebase/migration-his.webp)

- Run mongosh commands in SQL Editor admin mode.
  ![admin-mode](/content/blog/introducing-mongodb-support-in-bytebase/admin-mode.webp)

## Try MongoDB Yourself

Bytebase supports MongoDB 4.0, 5.0, and 6.0. Please follow [installation guide](https://docs.bytebase.com/get-started/deploy-with-docker) to try it out. You can also join our [discord](https://discord.gg/huyw7gRsyA) to discuss all things Bytebase, share your feedback, and get help from the community.
