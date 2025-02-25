---
title: 'Master SQL Review with Bytebase API'
author: Ningjing
updated_at: 2025/02/24 16:15
tags: Tutorial
integrations: API
level: Intermediate
estimated_time: '30 mins'
description: This tutorial will walk you through using SQL Review via Bytebase API to improve your database schema change process.
---

When modifying data in the database, it's crucial to ensure that the changes are both safe and accurate. Bytebase offers a feature called [SQL Review](/docs/sql-review/overview/), which allows you to evaluate your SQL changes before they are applied to the database. SQL Review can be initiated through the Bytebase GUI, CI or API.

This is the first part of tutorial series of SQL Review:

   1. [Master SQL Review with Bytebase GUI](/docs/tutorials/sql-review-gui/)
   1. Master SQL Review with Bytebase API (This one)
   1. Master SQL Review with Bytebase CI

This tutorial will walk you through using SQL Review in Bytebase with Bytebase API to improve your database schema change process. The **Community Plan** is sufficient for completing this tutorial.

## Prerequisites

Make sure you have completed the previous tutorial [1.Master SQL Review with Bytebase GUI](/docs/tutorials/sql-review-gui/).

## Bytebase API Examples

You may call [Bytebase API](/docs/api/sql-review/) in your internal portal or GitHub Actions to trigger SQL Review. We don't go into details here, but you may refer to the following examples:

### Trigger SQL Review

- [🐙 Bytebase API Example for Issue Creation with SQL Review](https://github.com/bytebase/api-example/tree/main/issue-creation)

  Sample portal to call Bytebase API to trigger schema change including SQL Review.
  ![bb-api](/content/docs/tutorials/sql-review-api/bb-api.webp)

### Configure SQL Review Policies

- [🐙 Bytebase API Example for SQL Review Configuration](https://github.com/bytebase/api-example/tree/main/sql-review)

## May need ngrok

<IncludeBlock url="/docs/get-started/install/vcs-with-ngrok"></IncludeBlock>

## Summary

Now you have learned how to trigger SQL Review in Bytebase API. You may also refer to the [SQL Review](/docs/sql-review/) document for more details.
