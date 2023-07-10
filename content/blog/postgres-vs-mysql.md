---
title: 'Postgres vs. MySQL: a Complete Comparison in 2023'
author: Tianzhou
published_at: 2023/07/10 12:00
feature_image: /content/blog/postgres-vs-mysql/cover.webp
tags: Industry
featured: true
description: 'An extensive comparison between Postgres and MySQL on performance, features, security,
extensibility, usability, architecture, ecosystem and more.'
---

The [2023 Stack Overflow survey](https://survey.stackoverflow.co/2023/) shows that Postgres has taken
over the first place spot from MySQL and become the most admired, desired databases.

As Postgres gains more momentum, it becomes harder to pick between Postgres and MySQL. MySQL is
probably still the world's most popular open source database by install base. While Postgres positions
itself as the world's most advanced open source relational database.

At Bytebase, we work with both databases extensively since the Bytebase product needs to integrate
with both databases as well as their derivatives. Our founders also build [Google Cloud SQL](https://cloud.google.com/sql), one of the largest hosted MySQL & Postgres cloud sevices at Google Cloud SQL.

Based on our operating experience, below we give an extensive comparision between Postgres and MySQL
from the following dimensions:

## Performance

For most workloads, the performance between Postgres and MySQL are comparable with at most 30% variations.
On the other hand, regardless of which database you choose, if your query misses an index, it could be 10x ~ 1000x degradation.

Saying that, MySQL does have an edge over Postgres for super heavy workloads. You can read following
articles for details:

- [Why Uber Engineering Switched from Postgres to MySQL](https://www.uber.com/en-SG/blog/postgres-to-mysql-migration/)
- [The Part of PostgreSQL We Hate the Most](https://ottertune.com/blog/the-part-of-postgresql-we-hate-the-most/)

Unless your business reaches uber-like scale, the mere database performance is not a deciding factor.
Commpanies like [Instagram](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c), [Notion](https://www.notion.so/blog/sharding-postgres-at-notion) also able to herd
postgres at super scale.

## Features

Both databases provide s

## Security

## Extensibility

## Usability

## Architecture

## Ecosystem

## Watchout

## References

- [Ask HN: It's 2023, how do you choose between MySQL and Postgres?](https://news.ycombinator.com/item?id=35906604)
- [The Part of PostgreSQL We Hate the Most](https://ottertune.com/blog/the-part-of-postgresql-we-hate-the-most/)
