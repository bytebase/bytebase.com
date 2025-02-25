---
title: 'SQL Review with Bytebase API'
author: Ningjing
updated_at: 2025/02/24 16:15
tags: Tutorial
integrations: API
level: Intermediate
estimated_time: '30 mins'
description: This tutorial will walk you through using SQL Review via Bytebase API to improve your database schema change process.
---

When modifying data in the database, it's crucial to ensure that the changes are both safe and accurate. Bytebase offers a feature called [SQL Review](/docs/sql-review/overview/), which allows you to evaluate your SQL changes before they are applied to the database. SQL Review can be invoked from the Bytebase GUI, CI or API.

This is the first part of tutorial series of SQL Review:

1.  [SQL Review with Bytebase GUI](/docs/tutorials/sql-review-gui/)
1.  SQL Review with Bytebase API (This one)
1.  SQL Review with Bytebase CI (TBD)

This tutorial will walk you through using SQL Review in Bytebase with Bytebase API to improve your database schema change process. The **Community Plan** is sufficient for completing this tutorial.

## Prerequisites

Make sure you have completed the previous tutorial [SQL Review with Bytebase GUI](/docs/tutorials/sql-review-gui/).

If you want to test the SQL Review API locally, you may need to configure ngrok.

<IncludeBlock url="/docs/get-started/install/vcs-with-ngrok"></IncludeBlock>

## API Examples

You may call [Bytebase API](/docs/api/sql-review/) in your internal portal or GitHub Actions to trigger SQL Review. Check out https://github.com/bytebase/api-example/tree/main/issue-creation

![bb-api](/content/docs/tutorials/sql-review-api/bb-api.webp)

You can also call the API to configure SQL Review policies.

<TutorialBlock url="/docs/tutorials/api-sql-review-policy/" title="Codify SQL Review Policies with Bytebase API" />

## Summary

Now you have learned how to trigger SQL Review in Bytebase API. You may also refer to the [SQL Review](/docs/sql-review/overview) document for more details.
