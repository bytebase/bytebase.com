---
title: Index Advisor
feature_name: INDEX_ADVISOR
---

Bytebase provides an index advisor to help you speed up your [slow queries](/docs/slow-query/overview). The index advisor will analyze the slow queries and recommend the indexes that can speed up the slow queries.

## Prerequisites

The Bytebase index advisor based on the slow query logs and OpenAI API. Make sure that:

- Enable the [slow query logs](/docs/slow-query/overview) in your database and Bytebase console.
- Enable [AI Assistant](/docs/ai-assistant).

## Index Advisor

1. Go to home, and click **Slow Queries** on the left bar.
2. Click interested slow query to open the detail page.
3. If the index advisor is enabled, you'll see the
   1. **Current Indexes** section, which shows the indexes that are currently used by the slow query.
   2. **Suggestions** section, which shows the indexes that can speed up the slow query.
   3. **Create Index** button, which allows you to create the suggested index.

![slow-query-index-advisor](/content/docs/slow-query/index-advisor.webp)

## Data Privacy

Bytebase sends the following info to OpenAI:

- Tables and column names of the current database schema.
- SQL fingerprints without any literals (use question marks ? or variable signs $1 instead).
