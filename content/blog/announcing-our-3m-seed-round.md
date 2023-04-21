---
title: Announcing our $3M Seed Round
author: Tianzhou
published_at: 2021/11/19 11:29:26
feature_image: /blog/announcing-our-3m-seed-round/banner.webp
tags: Announcement
featured: true
description: We are excited to announce that we've raised a $3M seed round, led by Matrix Partners China with participation from Dongxu Huang, co-Founder/CTO of PingCAP (the company behind TiDB).
---

We are excited to announce that we've raised a $3M seed round, led by [Matrix Partners China](https://www.matrixpartners.com.cn/index.php/en/) with participation from Dongxu Huang, co-Founder/CTO of [PingCAP](https://pingcap.com) (the company behind TiDB).

We wrote our first LOC in Jan, open sourced version 0.1 in July supporting managing MySQL and GitLab integration. Since then, we kept iterating all the way to the current version 0.8, adding TiDB, PostgreSQL, ClickHouse, Snowflake, webhook as well as many other improvements.

Today is a milestone for us. We would like to use this opportunity to share our thoughts, next steps, and the story behind the funding.

For those not familiar with Bytebase, it's a tool for managing database schema change and version control for teams. It offers a web-based collaboration workspace to help DBAs and Developers manage the lifecycle of application database schemas.

To understand why we need a new tool for database management, let's look at what's changed during the past 50 years of database industry evolution.

## The Three-Stage Evolution of Database

### 1970 ~ 2010 Cornerstone

SQL and relational databases have stood the test of times as the cornerstone of software development, from the birth of the relational model, to SQL and System R, then the commercial databases represented by Oracle/SQL Server/DB2 and the proliferation of open source databases such as MySQL/PostgreSQL/SQLite.

Most software that needs to persist state uses relational databases to read and write data.

At this stage, the problem that the database solves is to fulfill the application needs to Create, Read, Update, Delete (CRUD) data through a standard interface (SQL).

### 2010 ~ 2020 Web-scale

After 2010, the internet service exploded. All previous database systems can't keep up with the business demand, and the industry has emerged several solutions:

1. NoSQL system such as MongoDB.

2. Distributed middleware based on MySQL/PostgreSQL.

3. NewSQL solution with built-in distributed capabilities pioneered by Google Spanner.

At this stage, the problem the database industry tackles is to support super large scale internet services.

### 2020 ~  Beyond performance

The previous two stages are driven by the IT advancement and the internet explosion. However, transitioning CRUD operations from simple data to huge data is like changing the jet engine while in flight. We have only barely made it, however leaving many loopholes inevitably.

As the operation difficulties piled up, the industry is looking for the next era of architecture featured with operational efficiency and ease of use.

For example, HTAP was born as companies getting sick of maintaining separate OLAP and OLTP systems. Take another example, autonomous database, the concept gaining momentum in the past several years, combines heuristic rules and machine learning to reduce the operational burden of managing a database. A more intuitive example can be seen from major cloud and various database vendors. They are all fueling their growth engine by providing user-friendly cloud platforms (Snowflake Data Cloud, MongoDB Atlas and etc...).

## Relationship between engine and tool

We call the core piece inside a database system the kernel or engine. Just like a car engine, in the aforementioned database evolution stage 1 and 2, we are solving the problem of keeping the engine running reliably and fast without bursting the cylinder. The main challenge in these two stages is to advance the engine itself.

Now at stage 3, our current stage, people starts to care the driving experience. Thus, the tooling starts to play a growing role. Looking at every cloud platform, each public cloud database service offering is weaving a set of tools around the database engine (our founding team helps to build the one at [Google Cloud](https://cloud.google.com/sql)).

The industry has transitioned from the engine monologue to the stage where the engine and the tools orchestrate together.

Of course, tools still need to be built around the engine. In many cases, if the engine itself does not provide the capabilities, the tools may even not be able to do anything. When building Bytebase, we did realize that some of the solutions, such as schema version management, would be simpler and saner if the engine itself supports it natively.

If we are to build a new database from scratch now, how to differentiate it from the other 200+ existing ones?

**It's not just better performance.**

We would probably consider optimizing developer experience by including devops features like data branching, schema change and version management, backup and recovery, data masking, monitoring, logging, stress testing, diagnosing, continuous inspection, multi-tenant support, and more.

The current mainstream databases did not pay much attention to these scenarios when designed. They mainly focused on the core engine capability, while neglecting the overall driving/developer/operation experience.

So, let's go for yet another database engine?

![_](/blog/announcing-our-3m-seed-round/xkcd.webp)Standards from [https://xkcd.com/927](https://xkcd.com/927)

## Bytebase's take

Bytebase did not choose to build a new database from scratch. Instead, we try to complement the existing database systems via tooling. In particular, we tackle systems that have been widely used, while still lacking a decent tooling ecosystem. MySQL and PostgreSQL are such examples. We choose this approach because we believe it's hard to leapfrog to a new database system overnight and what most customers want is to help them to tame their existing database systems. This also plays to our strengths since we have previously built the database tooling for one of the largest database fleets and developer organizations in both US and China (Google Cloud and Ant Group).

## Bytebase's next step

Database schema change is the unskippable step during the development process. MySQL/PostgreSQL has been popular for 20+ years, yet still, there is no complete schema change solution in the industry.

This is a great entry point to start with.

Bytebase near term focus is to deliver the industry's best solution for database schema change and version control. We have already supported multiple databases including MySQL, PostgreSQL, TiDB, Snowflake, ClickHouse together with the GitLab, webhook integration. Meanwhile, we are laying the ground work to build the next generation database tooling system.

## The funding story

To build Bytebase to be the best of its kind, we need to assemble a team with top-tier frontend, backend, design and product expertise.

Therefore, we look for venture funding to turbocharge our product development speed.

Bytebase has the honor to be backed by Matrix Partners China. There are accidental factors in play, initially, we were introduced by a middleman who got acquainted with our founder via a Chinchilla.

![_](/blog/announcing-our-3m-seed-round/chinchilla.webp)The chinchilla leading the $$$ investment

More importantly, we do acknowledge each other's values and work ethic.

Bytebase is probably the first Chinese company building an open source developer tool and targeting the global market from Day 1.

Matrix Partners China has been pioneering venture investment in open source infra in China and have a portfolio of extraordinary open source startups. We believe that Matrix can not only empathize with our strategy, but also offer us sounding advice based on their experience.

Besides Matrix Partners China,  Dongxu Huang, co-founder/CTO of PingCAP also joins as our angel and advisor. This is another serendipity, we happened to sit with him in a meetup and poked him to try Bytebase inside a docker and watched him successfully deployed the application in 5 seconds. Guess he was pretty much sold on the spot since not a lot products can live up to their promise on the marketing site.

![_](/blog/announcing-our-3m-seed-round/frontpage.webp)

## We are hiring

The people we partner with determine the height of the achievement. Bytebase is a team that believes in the unlimited potential of individuals.

This funding enables us to recruit talented individuals to execute our vision to build the next generation database tooling system.

We are looking for full-stack, front-end engineers as well as interns to join us. Check out our [JD](https://bytebase.com/jobs) if you are interested, we are employing a unique interview process and our interview questions are also [open sourced](https://github.com/bytebase/interview).

Back to build 🚀

![_](/blog/announcing-our-3m-seed-round/landing.webp)
