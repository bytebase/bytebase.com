---
title: 'Bytebase 1.9.1 Deep Dive'
author: Tianzhou
published_at: 2022/12/20 17:21:21
feature_image: /content/blog/1-9-1-new-features/1.9.1-banner.webp
tags: Explanation
description: Last week, we released Bytebase 1.9.1. Let's take a deeper look into the new features - schema editor, mark issues as Need Attention, data access control, and data anonymization.
---

The penultimate release of 2022 brings Bytebase from 1.9.0 to [1.9.1](/changelog/bytebase-1-9-1). Although it’s only a PATCH version, the 237 commits still bring us tons of new features. Let’s take a closer look at what's released during this World Cup cycle ⚽️.

## Schema Editor

First up is the [Schema editor](/docs/change-database/schema-editor).

For most developers, handwriting SQL is troublesome and error-prone. So, we made a visual Schema Editor that can generate SQL statements with just a few clicks.

![_](/content/blog/1-9-1-new-features/schema-editor.webp)

We included the support for MySQL and TiDB first, and PostgreSQL will be available soon.

## Need Attention

Next ups is a small yet sweet feature.

The issue creator might want to remind the reviewer during the review process. We added the **[Need Attention](/docs/change-database/change-workflow/issue-need-attention)** feature, which adds a reminder bell to the Review interface. The corresponding issue title will become bold in the reviewer interface when you click it.

![_](/content/blog/1-9-1-new-features/need-attention-bell.webp)

![_](/content/blog/1-9-1-new-features/need-attention-bold.webp)

The overall interaction took inspiration from Google’s internal Code Review tool. I remember clearly the day I first saw a bold entry in my review list. I’ve used it ever since, and I think it can improve the process’s efficiency.

Regarding how to nudge people, some collaborative tools choose to ping others, others choose to use bolded font. Direct or restrained, the design philosophy is just included in these interaction details.

## Data Access Control

Now, let’s chat about Bytebase’s security capabilities.

We introduced [Data Access Control](/docs/security/data-access-control) with this release, leveraging Access Control Policy and Environment Tier.

Some users suggested that they don’t want developers to access all databases in the production environment by default. This can be achieved by the DBA setting the `Environment Tier` to `Protected`. But at the same time, the user wants to open access to some databases in this environment, which is possible by whitelisting those databases.

![_](/content/blog/1-9-1-new-features/protected-env.webp)

![_](/content/blog/1-9-1-new-features/accesss-control-env.webp)

The overall Bytebase design follows the same security practice of default blacklisting. This is yet another feature focusing on data security after [Data Anonymization](/docs/security/anonymize-data).

## Data Anonymization

In the last release, we introduced data anonymization for MySQL.

In this cycle, we have enhanced its capabilities, and it now tops the mainstream goInception-based solutions in the market.

| Query Type                   | Bytebase | goInception |
| ---------------------------- | -------- | ----------- |
| Simple query statements      | ✔️       | ✔️          |
| Subquery                     | ✔️       | ❌          |
| NATURE JOIN                  | ✔️       | ❌          |
| JOIN ... USING(...)          | ✔️       | ❌          |
| Common Table Expression(CTE) | ✔️       | ❌          |

goInception claims to be able to anonymize data. Still, it’s a bit too easy to bypass😓. Companies, if you use goInception, I am sweating for your data security.

And unlike goInception, which only supports MySQL, we will soon bring full data anonymization capabilities to PostgreSQL.

## Summary

Well, that’s it for this release. The next one in two weeks will also be the last of 2022.

Our 2021 goal was to cover the basic capabilities needed in database development. From my recent communication with users, I can tell that this piece is pretty much achieved: when they ask if we have a particular feature, most of the time, we can answer YES.

Next year, our task will move from satisfying users’ pain points to gradually bringing them delights. Frankly speaking, compared with the coding tools, the database tools are still relatively primitive. Although existing database tools inherit DBA’s expertise, they lack an understanding of DevTools and the overall developer workflow.

At AWS re:Invent 2022, Amazon released its one-stop developer platform, CodeCatalyst, joining GitHub, GitLab, and JetBrains. All of these claim to be one-stop, but let’s be honest, none of them really is, because they haven’t scratched the surface of database development. The developer workflow is not self-contained without including the database development activity.

After all, databases are indispensable to most applications.

![_](/content/blog/1-9-1-new-features/amazon-codecatalyst.webp)

![_](/content/blog/1-9-1-new-features/github.webp)

![_](/content/blog/1-9-1-new-features/jetbrains.webp)

![_](/content/blog/1-9-1-new-features/gitlab.webp)
