---
title: AI Assistant
---

<HintBlock type="warning">

Bytebase sends the database schema to OpenAI or your configured endpoint. Bytebase does not send the table data.
You can check the [relevant code](https://github.com/bytebase/bytebase/blob/main/frontend/src/plugins/ai/logic/prompt.ts).

</HintBlock>

AI Assistant uses OpenAPI or its compatible service to argument the database development workflow.

## Enable AI Assistant

Go to Bytebase console, click **Settings > General**. Scroll down to **AI Assistant**.

![openai](/content/docs/ai-assistant/openai.webp)

- **OpenAI API Key**. The Open API key you obtained [here](https://platform.openai.com/account/api-keys).
- **OpenAI API Endpoint**. If you use an OpenAPI compatible service or access OpenAPI via a proxy, you can optionally specify the custom endpoint.

## Use self-hosted model

<TutorialBlock url="/docs/tutorials/self-host-llama/" title="Self-host Llama3 for Bytebase AI Assistant" />

## Features

- [SQL Editor AI Assistant](/docs/sql-editor/ai-assistant)
- [Index Advisor](/docs/slow-query/index-advisor)
