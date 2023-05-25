---
title: SQL Primary Key - UUID or Auto Increment Integer / Serial?
author: Tianzhou
published_at: 2021/08/24 08:37:00
feature_image: /content/blog/choose-primary-key-uuid-or-auto-incement/uuid.webp
tags: Explanation
description: Pros and Cons between choosing UUID or auto increment integer / serial for SQL database.
---

> tl;dr **choosing Auto Increment Integer 95% of the time for readability.**

One of the first things when designing a new SQL database schema is to decide which type of **primary key** to use. And 99% of the time, developers need to choose between either UUID or Auto Increment Integer/Serial.

Developers may not realize initially, but choosing the primary key type can have consequential impact down the road and it's almost impossible to switch afterwards.

> _Choosing a proper primary key format requires a good understanding of both the business requirements as well as the underlying database system, so that the schema designer can make the educated tradeoff._

## **UUID**

There are 5 standard UUID formats nowadays. Most of the time, people either choose v4 (random UUID) or v1 (timestamp UUID)

- Globally unique. e.g. No false positive for finding items using log. Easy for migrating data between systems since collision is only theoratically possible.
- Stateless, it can be generated on the fly.
- A sense of secure since malicious user can't guess the ID. However, your security team would always insist that a public accessible UUID path does not meet the security standard.
- Version 1 UUID stores timestamp info, could be useful sometimes.
- Not readable.
- Not naturally sortable according to creation time. Though v1 UUID format contains timestamp, it encodes the timestamp using little-endian in that the least significant time appears first, which renders the UUID hard to sort according to creation time. People design their own UUID format to fix this and there is also a draft proposal to [standardize](https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format) it.
- For database like MySQL, Oracle, which uses clustered primary key, version 4 randomly generated UUID will hurt insertion performance if used as the primary key. This is because it requires reordering the rows to place the newly inserted row at the right position inside the clustered index. On the other hand, PostgreSQL uses heap instead of clustered primary key, thus using UUID as the primary key won't impact PostgreSQL's insertion performance.

## **Auto Increment Integer/Serial**

Using auto increment integer/serial as the primary key in your SQL database is also quite common and every major database engine provides the native support. e.g.

- MySQL - **AUTO_INCREMENT**
- PostgreSQL - **SERIAL**
- SQLite - **AUTOINCREMENT**
- Readable. This is especially valuable if we would expose it externally. Thinking of issue id, obviously, issue-123 is much more readable than issue-b1e92c3b-a44a-4856-9fe3-925444ac4c23.
- Less space. UUID always occupies 16 bytes. For Auto Increment Integer, when stored as Long format, it occupies 8 bytes. If the table itself has only a few columns, the extra primary key space overhead will become more significant.
- It can't be used in the distributed system since it's quite likely that different hosts could produce exactly the same number.
- It can't be generated on the fly. Instead, we must consult the database to figure out the next available primary key. In a distributed system, this often means to introduce a separate service to produce this sequential number. And that service becomes a single-point-of-failure (SPOF).
- Some business data can be exposed, since the latest ID could represent the total number of inventory. Attackers can also scan the integer range to explore leakage (though it shouldn't happen if ACL is implemented correctly).

## **Which one to choose?**

As listed above, there are Pros and Cons between the 2 approaches. But based on our experience, 95% of the time, the default choice should always be **Auto Increment Integer**. Why?

> _Readability, and readability leads simplicity. Number is easy to write, easy to remember and easy to communicate. The primary key is not only used by the system, it's also exposed to the end user (e.g. order #), inspected by the operation engineer, customer suppport etc..._

99.9% of the applications won't reach internet scale and they just consist of several models allowing CRUD operations, containing thousands of records. And doesn't need a distributed system.

Taking the classic issue tracking/project management tool as an example. The tool likely will have at most 5 figure projects each containing 5 figure issues. and issue id such as **issue/123** is definitely more readable than **issue/b1e92c3b-a44a-4856-9fe3-925444ac4c23**. In fact, all major issue tracking systems use integer as the issue id. Jira, Apple's Radar, Google's issue tracker etc... And most applications are less complex than those issue tracking tools.

There are valid cases of choosing UUID e.g. log entry. But most of the time, using UUID as the primary key is a sign of pre-mature optimization and it's also a choice hard to revert afterwards.

What do you think😊

> _BTW, if you like this article, you might also be interested in our product [Bytebase](https://bytebase.com), an open source, web-based schema change and version control tool. It will not tell you which primary key format to pick, but it will help you to collaborate with your Developer and DBA peers to reach a better consensus._

## **References**

1. [RFC 4122 (the original UUID RFC)](https://tools.ietf.org/html/rfc4122)
2. [New UUID proposal including timestamp ordered and randomness format](https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format)
3. [A brief history of the UUID](https://segment.com/blog/a-brief-history-of-the-uuid)
