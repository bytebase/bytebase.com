---
title: ChatSQL
---

Input your natural language and Bytebase will convert it into SQL.

## Prerequisites

Before starting, make sure you have sign up for an account on the [OpenAI platform](https://openai.com/product) and [obtain a confidential key](https://platform.openai.com/account/api-keys).

## Add the API key

Go to Bytebase console, click **Settings > General**. Scroll down to **AI Augmentation**, and fill in **OpenAI API Key** field.

![settings-general-ai](/docs/sql-editor/settings-general-ai.webp)

## Query in SQL Editor

1. Go to home, and click **SQL Editor** on the left bar.
2. Input in the natural language field and press **Enter**.
3. You'll see the generated SQL on the left. Click the play icon and the SQL will execute.

![sql-editor-chatsql](/docs/sql-editor/sql-editor-chatsql.webp)

## Data privacy

In order to convert your request into an SQL query, Bytebase must provide the OpenAI platform with the tables and column names of the current database schema. However, Bytebase does not transmit any data from the tables.
