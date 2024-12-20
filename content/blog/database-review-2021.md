---
title: Database Review 2021 and 2022 Prediction
author: Tianzhou
updated_at: 2022/02/01 10:00:00
feature_image: /content/blog/database-review-2021-bytebase/uncharted-waters.webp
tags: Industry
description: What happened in database industry in 2021. OLAP (Snowflake, Databricks, ClickHouse, Firebolt, ClickHouse), OLTP (PostgreSQL, PlanetScale, SQLite) and open source.
---

## Hot Market

Year 2021 is definitely a big year for the database industry. Though Snowflake and MongoDB have had their ups and downs in the secondary market, the former still stood over $100 billion market cap at the end of the year; the latter also crossed $35 billion mark, 50% YoY, and nearly 1700% gain since its listing 17 year ago.

![_](/content/blog/database-review-2021-bytebase/stock.webp)

MongoDB  >> Snowflake >>> NASDAQ > S&P 500

Thanks to the secondary market boom, Databricks is about to become the next multi-billion dollar IPO, CockroachDB, ClickHouse, Yugabyte, PlanetScale, Firebolt, SingleStore (formerly MemSQL) have all raised large funding rounds (all in 2 rounds), and of course, PingCAP, which just had the largest funding round in China at the end of 2021.

|             | Funding (Round)       | Date             |
| ----------- | --------------------- | ---------------- |
| PingCAP     | $270M (D)             | 2020.11          |
| Firebolt    | $37M (A) + $127M (B)  | 2020.12 + 2021.6 |
| SingleStore | $80M (E) + $80M (F)   | 2020.12 + 2021.9 |
| CockroachDB | $160M (E) + $278M (F) | 2021.1 + 2021.12 |
| Yugabyte    | $48M (B) + $188M (C)  | 2021.3 + 2021.10 |
| PlanetScale | $30M (B) + $50M (C)   | 2021.6 + 2021.10 |
| ClickHouse  | $50M (A) + $250M (B)  | 2021.9 + 2021.10 |

The AI hype is cooling down, the blockchain opportunists jump from Bitcoin to the metaverse, then people read Snowflake's and MongoDB's earnings release and realize what makes the real money, the classic OLTP / OLAP (Online Transaction Processing and Analysis) database that every company relies on every day.

## Proven Technology

There has been no underlying technology breakthrough in the database industry in these two years. After a round of NoSQL fuss 10 years ago, we have returned to the relational model with SQL as the interface. The only notable addition is the distributed architecture inspired by Google Spanner.

Although the concept of autonomous/self-driving DB has been around for many years, the database still needs DBAsit. Query and Index Optimization, the most suitable scenario for AI, has not been applied in the mainstream database since [Google's 2018 paper](https://research.google/pubs/pub46518/).

Optane, a persistent memory, has been out for several years but has not seen large deployments in the industry.

The technology has stagnated, but because the underlying architecture has matured and stabilized, database companies have had time to polish their products and monetize the technology into commercial products. And the consensus way to monetize is via Cloud.

## Destined Cloud

A giant gap lies between the underlying database technology and the deliverable product. Luckily, Cloud Platform can fill that gap. MongoDB is soaring on Atlas. Confluent, the company based on Apache Kafka completed a $10 billion IPO; $100 billion Snowflake, is a cloud product from Day 1; [Firebolt](https://firebolt.io), [Gigapipe](https://gigapipe.com) and ClickHouse Inc all offer the managed service based on ClickHouse.

As revealed from the [leaked Google BigQuery revenue](https://www.theinformation.com/articles/internal-google-data-reveals-its-bigger-than-snowflake-in-key-cloud-business):

> The enterprise is growing so fast that Snowflake has projected it will generate roughly $1.13 billion in revenue for the year ending January, double the amount for its previous fiscal year. But Google Cloud’s data analytics unit, which consists mostly of a data warehousing product, BigQuery, has already generated around $1.5 billion in revenue so far this fiscal year.

We can see that the profits/revenue/growth of database cloud services are extremely impressive. It’s not whether to go cloud, but whether to embrace cloud from Day 1.

In particular, in the OLAP space, while the market is betting on the next Snowflake, Databricks, the two just had a benchmark fight.

## OLAP

### Databricks vs Snowflake

The benchmark debate between the two is eventful, with the the co-founders of both sides taking the field.

- First Databricks blogged about [setting official data warehouse performance records](https://databricks.com/blog/2021/11/02/databricks-sets-official-data-warehousing-performance-record.html).
- Then Snowflake fired back with [industry benchmarks and competitive integrity](https://www.snowflake.com/blog/industry-benchmarks-and-competing-with-integrity/).
- Next Databricks rebutted [Snowflake claims similar price/performance to Databricks, but not as fast!](https://databricks.com/blog/2021/11/15/snowflake-claims-similar-price-performance-to-databricks-but-not-so-fast.html).

Technically speaking, performance metrics matters, otherwise Snowflake and Databricks would not engage in this fight, and the industry would not have various benchmarks, TPC series (TPC-C, TPC-H, TPC-DS), Sysbench, YCSB. Just as mediocre engineering managers can only track the lines of code (LOC) to measure productivity, the most obvious thing to evaluate a database system is the price-performance ratio.

But in terms of products, if scores were really that important, Apple wouldn't be the company with the highest market capitalization. Performance is just a table stake, and the performance of your product can't be exponentially different from your opponent's, or you won't even have a fight. But the end-to-end application performance depends on many factors:

- A proper database schema design according to the business logic.
- Proper index.
- Avoid long transaction.
- Reduce the number of round trips between application and database.

Any of the above can boost performance significantly, which would probably offset the marginal performance difference among database systems.

And performance is just one aspect of the database system. The core part of the database is called Engine, just like a car engine, in addition to speed, specs such as stability, fuel consumption, durability, and maintenance cost are also important, along with tires, bearings, exterior polish, interior decoration, and steering, to deliver the entire driving experience.

In fact, Snowflake and Databricks are both product-oriented companies. If you have a chance to read Snowflake's documentation and use its Cloud portal / SQL Editor, you can feel that this is a well-designed product, ranging from data modeling (the virtual dataware concept) to the UX. As for Databricks, it also has a taste for tools as they have acquired products like [Redash](https://databricks.com/blog/2020/06/24/welcoming-redash-to-databricks.html), readers who are interested can also search `developer experience site: databricks` on Google.

Of course, it could be a key differentiator if the performance is way better. In 2021, such a product happened to emerge.

### ClickHouse

![_](/content/blog/database-review-2021-bytebase/dbengine-clickhouse.webp)

As you can see from the DB-Engines chart, besides Snowflake, ClickHouse has the steepest curve. So is the GitHub star:

![_](/content/blog/database-review-2021-bytebase/clickhouse-star-history.webp)

Source [https://star-history.com/#ClickHouse/ClickHouse](https://star-history.com/#ClickHouse/ClickHouse)

ClickHouse has existed for some time, incubated in the Russian Internet giant Yandex, ByteDance, the owner of TikTok also claims to have a ClickHouse cluster with over 15,000 nodes. 2021 is the year of ClickHouse, in August, the just formed ClickHouse Inc, immediately announced two funding rounds totaling $300 millions.

If compared with Snowflake, ClickHouse documentation, ecosystem tools are pretty behind. But ClickHouse has unmatched single-table query performance and also supports on premise deployment, it fits the fast growing internet business requirements perfectly.

So if the technology is really strong enough, it is possible to put the product aside, for a moment. Still ClickHouse has formed ClickHouse Inc to build the cloud product. It already seems to be an afterthought after [Gigapipe](https://gigapipe.com/) and [Firebolt](https://firebolt.io) debuts.

### Firebolt

If Firebolt is 50% of what it advertises, it's time to short Snowflake.

Let’s take a look at the Firebolt manifesto:

![_](/content/blog/database-review-2021-bytebase/firebolt-leap.webp)
![_](/content/blog/database-review-2021-bytebase/snowflake-firebolt.webp)

Of course, Snowflake is a great product, and over the years it has grown into a one-stop platform that Firebolt, as a startup, is nowhere near in terms of product breadth. But Firebolt is targeting Snowflake's core competence Price / Performance / Usability, and their website claims:

> Firebolt has shown that you can have the speed of ClickHouse or Druid with the simplicity and flexibility of Snowflake, and about 1/10th the cost of Snowflake, from gigabyte to petabyte scale.

These are also their [own words](https://techcrunch.com/2021/06/24/firebolt-raises-127m-more-for-its-new-approach-to-cheaper-and-more-efficient-big-data-analytics/)：

> If you’re not using Snowflake or BigQuery already, we prefer you come back to us later.

I have not really tried their products, but from the articles I read and the demos I watched, Firebolt is indeed one of the strongest startups in the OLAP space right now. Their entire marketing website is well designed. If we just look at the marketing style of the website, Firebolt represents the next generation.

But let's read the data from [The Information](https://www.theinformation.com/articles/internal-google-data-reveals-its-bigger-than-snowflake-in-key-cloud-business?rc=qf5adr) again:

> While the cloud-based portion of the data warehousing is growing rapidly, much of the overall market still consists of legacy products that organizations run themselves. According to IDC, at the end of 2020 Oracle had a 30.5% share of the $13.4 billion worldwide market for data warehousing software, followed by Microsoft with 28.9%, IBM with 11.3%, SAP with 8% and Teradata with 6.6%. Aside from Teradata, none of the companies break out cloud-based data warehousing revenue.

In fact, the vast majority of systems are not on the cloud yet. It seems that even though there are quite a few new players in the market, everyone is still able to differentiate and acquire a fair share.

The AP segment is filled with new contenders Snowflake, Databricks, ClickHouse, Firebolt. While on the TP side, things are a bit different.

## OLTP

### PostgreSQL

![_](/content/blog/database-review-2021-bytebase/dbengine-postgres.webp)

Although AP systems are growing rapidly, the database industry is still dominated by TP systems in absolute terms, and among them, PostgreSQL (PG), a 25-year-old database, has been thriving in recent years.

In fact, PG has won the DB-Engine DBMS of the year award 3 times in the last 5 years (Snowflake / MySQL in 2021 and 2019 respectively). PG is gaining popularity for several reasons (since PG's main competitor is MySQL, the following is more of a comparison with MySQL):

1. Licensing concern after Oracle acquires MySQL. Personally, I think Oracle has made a lot of important improvements to MySQL after the acquisition, but licensing is a real risk, especially if the other side is Oracle.
2. PG has the inherent architecture advantage, its advanced/extended features are much ahead of MySQL. For example, although MySQL also has Geospatial, JSON functionality, it is still quite inferior to PG's PostGIS, JSON-B.
3. PG has a much more sophisticated query engine than MySQL. Not long ago, a former MySQL query engine engineer [ranted](https://blog.sesse.net/blog/tech/2021-12-05-16-41_leaving_mysql.html) before leaving the MySQL team. In fact, PG can have above average AP capabilities with a little tuning (many OLAP products like AWS Redshift are based on PostgreSQL).
4. The logical isolation of PG is at the database level, where a PG instance can create many databases and then assign each database to a different tenant. Although MySQL instances can also create multiple databases, because the databases are connected by default, this makes it necessary to assign a separate MySQL instance to each tenant. In single-tenant mode, MySQL's ease of use is superior, but in today's SaaS, multi-tenant service scenario, PG has a big advantage. That's why PG has been adopted by [Heroku](https://www.heroku.com) early on, to the new Heroku-like [render](https://render.com), and ~~[Supabase](https://supabase.com)~~ (correction, Supabase actually offers full a PG instance). They can offer a low or even free database plan because they can serve many users with a single PG instance.

PG is batteries included. When a company chooses PG, it gets a database with OLTP, OLAP, Document (JSON-B), FTS (tsvector/tsquery), Time-series (TimescaleDB), Geospatial (PostGIS), Multi-tenancy capabilities (batteries included). To summarize it in a simple formula:

PostgreSQL = MySQL + Poor man version of (ClickHouse + MongoDB\* + Elasticsearch + InfluxDB) + Geospatial + Multi-tenancy

Although PG can't compete with the ClickHouse in single-table query performance, or Elasticsearch in text retrieval, and even in transactional processing capabilities, it’s also [inferior to MySQL](https://eng.uber.com/postgres-to-mysql-migration), but the premise of having a single database system to serve all scenarios is too attractive.

Of course, PG still has some shortcomings, such as the infamous Transaction ID Wraparound. In addition, if the storage engine adopts the MySQL InnoDB / Oracle undo logging, the performance will probably gain. But these are minor flaws, not to mention, PG is run by a non-profit open source community.

PG has maintained the cadence of releasing a major version every year, so let's take a look at [PostgreSQL 14 release note](https://www.postgresql.org/about/news/postgresql-14-released-2318/):

![_](/content/blog/database-review-2021-bytebase/postgres-14.webp)

So whether it's Snowflake, Databricks or PostgreSQL, whether it's an AP or TP system, proprietary or open source, they all know that developers matter. And in 2021, a new TP database product was launched to specifically target the developers.

### PlanetScale

The company has been around since 2018, but what caught my attention was the article [Announcing PlanetScale: The database for developers](https://planetscale.com/blog/announcing-planetscale-the-database-for-developers) published on its website this year. Before that, the company offered managed Vitess, a distributed middleware based on MySQL, which originated from Youtube and supported the whole Youtube business for a long time (Youtube later switched to Spanner for the sake of unifying the Google storage technology stack). Although the underlying layer is still Vitess, PlanetScale has pivoted to address application development workflow, including schema changes, database branching, autoscaling, etc.

![_](/content/blog/database-review-2021-bytebase/planetscale-workflow.webp)

In 2021, two companies that have re-defined the developer workflow today went IPO, GitLab and HashiCorp, both with a market cap of over $10 billion. PlanetScale folks also see this opportunity in the database market and they have also partnered with Vercel, the company about to redefine the frontend developer workflow.

![_](/content/blog/database-review-2021-bytebase/vercel.webp)

The tech stack started with LAMP (Linux + Apache + MySQL + PHP), then came MEAN (MongoDB + Express + Angular + Node), and now there is a new VP (Vercel + PlanetScale) stack that could introduce another paradigm shift.

![_](/content/blog/database-review-2021-bytebase/planetscale.webp)

And when it comes to acronym names, there's another one coming up in 2021

![_](/content/blog/database-review-2021-bytebase/gosh-stack.webp)

Oh my **GoSH**.

### SQLite

While the authors of curl [may not agree](https://daniel.haxx.se/blog/2021/10/21/the-most-used-software-components-in-the-world/) that SQLite is the most deployed software component in the world, SQLite is undoubtedly the most deployed database, with perhaps dozens or hundreds on a single phone, and in almost every app from Notes to WhatsApp. SQLite is not a complete database system (DBMS), but it has a complete storage engine and SQL interface, and it has good enough performance for most application needs. It's a library and uses a single file to hold data, which makes application access and data management very easy. In 2021, several interesting projects have emerged from the SQLite ecosystem:

1. [Litestream](https://litestream.io/)，SQLite disaster recovery solution based on WAL (written by Ben Johnson, who is also the author of Golang BoltDB).
2. [Hosting SQLite databases on GitHub Pages](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)，A very clever implementation of VFS with block read support using HTTP Range requests.
3. [Serverless SQLite](https://sql.lspgn.workers.dev/), SQLite services deployed via Cloudflare workers + WASM.
4. [Datasette](https://datasette.io/), an open source multi-tool for exploring and publishing data based on SQLite.

2021 SQLite hot topics on HackerNews.

![_](/content/blog/database-review-2021-bytebase/sqlite-hacker-news.webp)

One of the nice features of SQLite is that it keeps all the data on a single file. Even though Apple is trying to hide the concept of files from users on mobile devices, the entire computer world, especially the developer world, operates on files as the atomic unit. AWS oldest service S3, provides the hosted files; Code repos tracks version info per file.

SQLite's slogan - Small. Fast. Reliable. Choose any three.

![_](/content/blog/database-review-2021-bytebase/sqlite.webp)

SQLite is also an open source software, released under the non-conventional Public Domain:

> SQLite is open-source, meaning that you can make as many copies of it as you want and do whatever you want with those copies, without limitation.

In the current open source landscape, SQLite's license is quite unique. SQLite carries the web3 characteristics, both in terms of its license and its usage scenario. If the world of web3 is decentralized, computation happens in Edge, data is in the hands of individuals, and services are provided not by companies but by individuals. Couldn't all data be stored on a single SQLite file and provide bespoke services according to personal will? And at that point, SQLite will be the undisputed most deployed software component.

## Polarized Open Source

Except for Snowflake and ClickHouse based Firebolt, all of the database products listed earlier are open source. The internet is built on top of open source database systems such as MySQL, PostgreSQL, SQLite, and Redis. With the exception of PostgreSQL, most open source databases are backed by commercial companies. And not only databases, but the entire software infra space has completely shifted to treat open source as a business model.

The database industry has just realized this a few years ago, mainly because it saw MongoDB has become a sustainable business based on open source. Other products such as [Timescale](https://blog.timescale.com/blog/building-open-source-business-in-cloud-era-v2), [Yugabyte](https://blog.yugabyte.com/why-we-changed-yugabyte-db-licensing-to-100-open-source/) have taken the similar step.

But while a lot of capital is pouring into companies in the open source industry, many individual contributors are still unable to earn a steady income from open source. GitHub Sponsors is actively working on this problem, but it won’t happen overnight. The log4j vulnerability alarmed us again.

![_](/content/blog/database-review-2021-bytebase/xkcd-log4j.webp)

Derived from the classic https://xkcd.com/2347

![_](/content/blog/database-review-2021-bytebase/xkcd-dependency.webp)

So in 2021, we see a more polarized split, on one end, there are a group of open source enthusiasts hiding in a dark room, maintaining the core components that underpin the internet backbone. On the other end, another group of commercial companies, based on open source software, have received generous checks from VCs.

## 2022 Prediction

1. PlanetScale will be widely adopted, Vercel + PlanetScale, the VP stack will bring a new paradigm shift to the developer workflow, especially to attract a lot of front-end and full-stack developers.
2. There will be a new database coming out, and the main selling point will be developer workflow.
3. There will be startups building ClickHouse tools, and receive a lot of funding.
4. Firebolt will be the fastest-funded database company ever.
5. There will be killer solution based on SQLite.
6. There will be an open source tool built for application database development 😀

## Parting words

1. The database itself is just a technology. Technology can’t sell, only solution does. So what needs to be built is the cloud platform, tooling, developer ecosystem and best practices around the database development workflow.
2. The database engine is the core, but performance is only one of the puzzle, the engine space is already crowded, but there are plenty rooms around the database development workflow. To differentiate, investing developer experience and betting on defining the new developer workflow.
3. Pay attention to SQLite.
4. Choose PostgreSQL, you won’t regret it.

See you in 2023!

---

_Continue reading other year's review:_

- [Database Review 2022](/blog/database-review-2022)
