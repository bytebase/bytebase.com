---
title: Query with Natural Language
feature_name: QUERY_WITH_NATURAL_LANGUAGE
---

Input your natural language and Bytebase will convert it into SQL.

## Prerequisites

- Enable [AI Assistant](/docs/ai-assistant).

## Query in SQL Editor

![sql-editor-text-to-sql](/content/docs/sql-editor/text-to-sql.webp)

After configuring the OpenAI key, an OpenAI icon will appear on the SQL Editor. Clicking the icon will toggle between
the SQL and natural language mode.

## Data privacy

Bytebase sends the following info to OpenAI:

- Tables and column names of the current database schema.
