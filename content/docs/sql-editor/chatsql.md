---
title: Query with Natural Language
feature_name: CHATSQL
---

Input your natural language and Bytebase will convert it into SQL.

## Prerequisites

Before starting, make sure you have sign up for an account on the [OpenAI platform](https://openai.com/product) and [obtain a confidential key](https://platform.openai.com/account/api-keys).

## Add the API key

Go to Bytebase console, click **Settings > General**. Scroll down to **AI Augmentation**, and fill in **OpenAI API Key** field.

![settings-general-ai](/content/docs/sql-editor/settings-general-ai.webp)

## Query in SQL Editor

![sql-editor-chatsql](/content/docs/sql-editor/chatsql.webp)

After configuring the OpenAI key, an OpenAI icon will appear on the SQL Editor. Clicking the icon will toggle between
the SQL and natural language mode.

## Data privacy

In order to convert your request into an SQL query, Bytebase must provide the OpenAI platform with the tables and column names of the current database schema. However, Bytebase does not transmit any data from the tables.
