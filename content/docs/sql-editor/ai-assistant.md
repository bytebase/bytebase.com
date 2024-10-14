---
title: AI Assistant
feature_name: AI_ASSISTANT
---

## Setup

Enable [AI Assistant](/docs/ai-assistant). Afterward, an OpenAI icon will appear on the SQL Editor.
Clicking the icon will toggle the AI Assistant sidebar.

![sql-editor-text-to-sql](/content/docs/sql-editor/ai-assistant/toggle.webp)

<HintBlock type="info">

Bytebase sends the following info to the configured OpenAI endpoint:

- Tables and column names of the current database schema.

</HintBlock>

## Text2SQL

Use natural language to compose SQL and execute.

![sql-editor-text-to-sql](/content/docs/sql-editor/ai-assistant/text-to-sql.webp)

## Explain SQL

For complex statements like stored procedures, you can ask AI Assistant to explain.

![explain-sql](/content/docs/sql-editor/ai-assistant/explain-sql.webp)

## Find problem

AI Assistant can spot SQL problems.

![find-problem](/content/docs/sql-editor/ai-assistant/find-problem.webp)
