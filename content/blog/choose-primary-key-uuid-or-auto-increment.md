---
title: UUID or Auto Increment Integer / Serial as the Database Primary Key?
author: Tianzhou
published_at: 2024/08/05 08:00:00
feature_image: /content/blog/choose-primary-key-uuid-or-auto-increment/uuid.webp
tags: Explanation
featured: true
description: Pros and Cons between choosing UUID or auto increment integer / serial as the primary key for SQL database.
---

One of the first things when designing a new SQL database schema is to decide which type of **primary key** to use. And 99% of the time, developers need to choose between either UUID or Auto Increment Integer/Serial.

Developers may not realize initially, but choosing the primary key type can have consequential impact down the road and it's almost impossible to switch afterwards.

**Choosing a proper primary key format requires a good understanding of both the business requirements as well as the underlying database system, so that the schema designer can make the educated tradeoff.**

## **Auto Increment Integer/Serial**

Using auto increment integer/serial as the primary key in your SQL database is also quite common and every major database engine provides the native support. e.g.

- MySQL - **AUTO_INCREMENT**
- PostgreSQL - **SERIAL**
- SQL Server - **IDENTITY**
- SQLite - **AUTOINCREMENT**

### Pros

- Readable. This is especially valuable if we would expose it externally. Thinking of issue id, obviously, `issue-123` is much more readable than `issue-b1e92c3b-a44a-4856-9fe3-925444ac4c23`.
- Less space. UUID always occupies 16 bytes. For Auto Increment Integer, when stored as Long format, it occupies 8 bytes. If the table itself has only a few columns, the extra primary key space overhead will become more significant.

### Cons

- It can't be used in the distributed system since it's quite likely that different hosts could produce exactly the same number.
- It can't be generated on the fly. Instead, we must consult the database to figure out the next available primary key. In a distributed system, this often means to introduce a separate service to produce this sequential number. And that service becomes a single-point-of-failure (SPOF).
- Some business data can be exposed, since the latest ID could represent the total number of inventory. Attackers can also scan the integer range to explore leakage (though it shouldn't happen if ACL is implemented correctly).

## **UUID**

The original UUID standard includes 5 UUID formats. Most of the time, people either choose UUIDv1 (timestamp) or UUIDv4 (random).

### Pros

- Globally unique. e.g. No false positive for finding items using log. Easy for migrating data between systems since collision is only theoretically possible.
- Stateless, it can be generated on the fly.
- A sense of secure since malicious user can't guess the ID. However, your security team would always insist that a public accessible UUID path does not meet the security standard.
- Version 1 UUID stores timestamp info, could be useful sometimes.

### Cons

- Not readable.
- Not naturally sortable according to creation time. Though v1 UUID format contains timestamp, it encodes the timestamp using little-endian in that the least significant time appears first, which renders the UUID hard to sort according to creation time.
- For database like MySQL, Oracle, which uses clustered primary key, both UUIDv1 and UUIDv4 will hurt insertion performance if used as the primary key. This is because it requires reordering the rows to place the newly inserted row at the right position inside the clustered index. On the other hand, PostgreSQL uses heap instead of clustered primary key, thus using UUID as the primary key won't impact PostgreSQL's insertion performance.

### UUIDv7 - Best of Both Worlds (Almost)

Bespoke solutions are invented to address the limitation of UUID including [Snowflake ID](https://en.wikipedia.org/wiki/Snowflake_ID), [ulid](https://github.com/ulid/spec), [cuid](https://github.com/paralleldrive/cuid2). IETF also published
a draft in April 2021 to propose a new UUID format. And in May 2024, IETF finally approved the draft. The approved UUIDv7
format:

```bash
 ## uuid7 layout
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           unix_ts_ms                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          unix_ts_ms           |  ver  |       rand_a          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|var|                        rand_b                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                            rand_b                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

The most significant difference from UUIDv1 is the first 48 bits (unix_ts_ms) store big-endian unsigned number of the Unix Epoch timestamp in milliseconds. This means that UUIDs generated at a later time will have higher values, making it easier to sort and query by creation time. Since UUIDv7 is time-ordered, it reduces the need for random I/O operations when inserting new records in databases. This can lead to better performance and more efficient indexing.

|                | Auto Increment | UUIDv1          | UUIDv7           |
| -------------- | -------------- | --------------- | ---------------- |
| Sortable       | ✅             | ❌              | ✅               |
| Time precision | ❌             | ✅ (nanosecond) | ✅ (millisecond) |
| Global Unique  | ❌             | ✅              | ✅               |
| Stateless      | ❌             | ✅              | ✅               |
| Readable       | ✅             | ❌              | ❌               |

Due to the inherent limitation of UUID, UUIDv7 is still not as human-readable as integer and occupies more space. On the other hand, UUIDv7 has addressed the biggest shortcoming from the previous versions. We expect industry will gradually abandon the bespoke solution and converge on UUIDv7 as the primary key for most use cases.

## **References**

1. [RFC 4122 (original UUID RFC)](https://tools.ietf.org/html/rfc4122)
1. [RFC 9562 (new UUID RFC)](https://datatracker.ietf.org/doc/html/rfc9562)
