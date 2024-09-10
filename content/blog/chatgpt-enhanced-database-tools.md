---
title: A (Non-Exhaustive) Summary of ChatGPT Enhanced Database Tools
author: Mila
updated_at: 2023/03/27 21:21:21
feature_image: /content/blog/chatgpt-enhanced-database-tools/cover.webp
tags: Industry
featured: true
description: We wonder if ChatGPT can help us in the field of database administration, and we dug deep into some toolings that have incorporated ChatGPT to make our life easier.
---

ChatGPT has only been around for less than half a year and we already cannot live without it. We wonder if ChatGPT can help us in the field of database administration, and we dug deep into some toolings that have incorporated ChatGPT to make our life easier.

## sqlTranslate

When it comes to databases, the first thing that comes to mind is whether ChatGPT can help us write SQL. [sqlTranslate](https://www.sqltranslate.app/) is a very simple tool that uses the OpenAI API to obtain the corresponding SQL statement by inputting natural language, or vice versa. You can also upload your own schema. Since it open-sourced three weeks ago, it has already gotten 2.6k stars and is [described by GitHub](https://twitter.com/github/status/1637937834865704960/photo/1) as an "incredibly useful weekend project". Looks like people have been suffering from SQL for way too long.

![_](/content/blog/chatgpt-enhanced-database-tools/sqltranslate.webp)

## AI2sql

[AI2sql](https://www.ai2sql.io/) is an AI-driven SQL query generator that has been around since 2021, and has recently incorporated OpenAI's GPT-3. Now engineers and non-engineers can write SQL easily without knowing the syntax. AI2sql is more comprehensive than sqlTranslate. The features include SQL syntax checking, formatting, and query generation, the databases supported covers the most popular ones on the market (such as MySQL, PostgreSQL, MongoDB, Oracle, etc.).

![_](/content/blog/chatgpt-enhanced-database-tools/ai2sql.webp)

## Aoi (葵)

[Aoi](https://github.com/shellfly/aoi) is a ChatGPT-driven dialogue agent program that can conduct natural language conversations with AI in your Terminal, and it can also be connected to your database to perform SQL tasks.

![_](/content/blog/chatgpt-enhanced-database-tools/aoi.webp)

## Bytebase

Bytebase is a database CI/CD tool that covers the entire life cycle of database development, and its SQL editor has also incorporated OpenAI's gpt-3.5-turbo in [its recent release](/changelog/bytebase-1-14-0), where you input natural language and have it converted to SQL. Stay tuned for a more advanced version chat bot 🤖️!

![_](/content/blog/chatgpt-enhanced-database-tools/bytebase-sqleditor.webp)

## DBeaver

As a veteran SQL client, in addition to visualization and management capabilities, [DBeaver](https://dbeaver.com/) also has a SQL editor, along with data & schema migration capabilities, and database connection monitoring. In early February, DBeaver also incorporated GPT-3 to have AI convert natural language to SQL. For instance, you can ask for "all invoices from Germany with a total of more than 4", or in German, "Zeig alle Rechnungen aus Deutschland mit der Gesamtsumme über 4," and it will automatically convert the request into a query.

![_](/content/blog/chatgpt-enhanced-database-tools/dbeaver.webp)

## OSSInsight

In a sense, [OSSInsight](https://ossinsight.io/) has been helping you write SQL since way before.

![_](/content/blog/chatgpt-enhanced-database-tools/ossinsight.webp)

But recently they embraced OpenAI and launched a new tool called "Data Explorer", making it easier to explore GitHub data. You can ask whatever interests you in plain language, and AI will generate SQL for them (and then query it).

![_](/content/blog/chatgpt-enhanced-database-tools/rust-or-go.webp)

The database behind OSSInsight is TiDB, and TiDB Cloud recently also launched an intelligent data exploration feature using OpenAI: [Chat2Query](https://www.pingcap.com/chat2query-an-innovative-ai-powered-sql-generator-for-faster-insights/), which is another tool that generates SQL queries based on your input and then queries and visualizes the database for you.

## Outerbase

[Outerbase](https://outerbase.com/) is a new tool that was officially released on Feb.15, 2023. Compared with traditional database management tools, Outerbase completely conforms to current aesthetics. Its user experience is similar to that of an Excel spreadsheet, and it uses GPT-3 to help users write SQL queries and generate dashboards, making it useful for both developers and data analysts.

![_](/content/blog/chatgpt-enhanced-database-tools/outerbase.webp)

## To wrap up

It looks like using ChatGPT to enhance data management and analysis for your databases is gonna be an SOP in the database industry. Of course, these tools are just the tip of the iceberg, and their integration with ChatGPT is still in its early stages. However, it is clear that the benefits of combining ChatGPT with database management tools are enormous. Moreover, besides text2sql, ChatGPT can be used in many other database-related fields, such as customer support, query assistance, database management, and data analysis (you can also consult ChatGPT about what else it's capable of).

DBAs: get ready to retire officially. Just kidding, but perhaps the long-established SQL clients such as Navicat are already feeling a bit nervous.
