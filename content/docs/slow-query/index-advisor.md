---
title: Index Advisor
---

Bytebase provides an index advisor to help you speed up your [slow queries](/docs/slow-query/overview). The index advisor will analyze the slow queries and recommend the indexes that can speed up the slow queries.

## Prerequisites

The Bytebase index advisor based on the slow query logs and OpenAI API. Make sure that:

- You have enabled the [slow query logs](/docs/slow-query/overview) in your database and Bytebase console.
- You have sign up for an account on the [OpenAI platform](https://openai.com/product) and [obtain a confidential key](https://platform.openai.com/account/api-keys).

## Add the API key

Go to Bytebase console, click **Settings > General**. Scroll down to **AI Augmentation**, and fill in **OpenAI API Key** field.

![settings-general-ai](/docs/slow-query/settings-general-ai.webp)

## Index Advisor

1. Go to home, and click **Slow Queries** on the left bar.
2. Click interested slow query to open the detail page.
3. If the index advisor is enabled, you'll see the
   1. **Current Indexes** section, which shows the indexes that are currently used by the slow query.
   2. **Suggestions** section, which shows the indexes that can speed up the slow query.
   3. **Create Index** button, which allows you to create the suggested index.

![slow-query-index-advisor](/docs/slow-query/index-advisor.webp)

## Data Privacy

In order to advise indexes, Bytebase must provide the OpenAI platform with the tables and column names of the current database schema and SQL fingerprints(without any literals, use question marks `?` or variable signs `$1` instead). However, Bytebase does not transmit any data from the tables.
