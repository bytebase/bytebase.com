---
title: 千帆竞速，各领江湖 | 万字长文回顾 2021 年数据库行业
author: Tianzhou
updated_at: 2022/01/25 11:25:12
feature_image: /content/blog/database-review-2021-bytebase/uncharted-waters.webp
tags: Industry, Hidden, Chinese
description: 成熟的技术，注定的上云，疯狂的市场，割裂的开源。
---

## 大热的市场

21 年绝对是数据库的大年。二级市场上 Snowflake 和 MongoDB 起起伏伏，前者年底还是站上了 1000 亿美金市值；后者也收在了 350 亿美金，累计一年涨幅 50%，而和他 17 年上市相比，已经涨了近 17 倍。

![_](/content/blog/database-review-2021-bytebase/stock.webp)

MongoDB  >> Snowflake >>> NASDAQ > S&P 500

得益于二级市场的良好表现，数据库赛道的相关 Startup 也获得资本市场热捧。Databricks 即将成为下一个数百亿美金的 IPO。CockroachDB，Clickhouse，Yugabyte，PlanetScale，Firebolt，SingleStore (原 MemSQL) 都进行了大规模融资 (都还是 2 轮)，当然也不能忘了 20 年底刚创下国内 Infra/开源最大融资记录的 PingCAP。

|             | 融资额 (轮次)         | 时间             |
| ----------- | --------------------- | ---------------- |
| PingCAP     | $270M (D)             | 2020.11          |
| Firebolt    | $37M (A) + $127M (B)  | 2020.12 + 2021.6 |
| SingleStore | $80M (E) + $80M (F)   | 2020.12 + 2021.9 |
| CockroachDB | $160M (E) + $278M (F) | 2021.1 + 2021.12 |
| Yugabyte    | $48M (B) + $188M (C)  | 2021.3 + 2021.10 |
| PlanetScale | $30M (B) + $50M (C)   | 2021.6 + 2021.10 |
| ClickHouse  | $50M (A) + $250M (B)  | 2021.9 + 2021.10 |

当 AI 的热度逐渐散去，区块链的饼从比特币画到了元宇宙，大家再去读 Snowflake，MongoDB 的财报时，才又意识到其实最能稳稳挣 (大) 钱的还是每个公司日常都要依赖的经典 OLTP / OLAP (在线事务处理和分析) 数据库场景。

## 成熟的技术

笔者不在学术圈，但至少从工业界看，这两年数据库从底层技术来说并没有什么突破式创新。经过 10 年前一轮 NoSQL 的打打闹闹，大家又回到了以 SQL 作为接口的关系型模型上，当然底下都换成了分布式引擎，不过这也是快 10 年前 Google Spanner 的架构了。

AI 的赋能也同样有限，虽然自治数据库 (autonomous/self-driving DB) 概念喊了好多年，但数据库还是需要专职的 DBA 保驾护航。数据库里最适合 AI 落地的查询和索引优化 (Query and Index Optimization) 在 Google 18 年的[论文后](https://research.google/pubs/pub46518/), 也没有看到在主流数据库里应用的案例。

具备持久化能力的内存 Optane (傲腾) 虽然出了好几年，但尚未在业界大规模部署，数据库针对他进行的存储引擎重构也就更需时日。

技术虽然有所停滞，但也因为底层技术架构的成熟稳定，数据库公司有了打磨产品的时间。当然我们也可以换一个角度，技术成熟后，便是商业化变现的大好时机，所以公司的重心都投入到把技术包装成商业化产品上，而各方基于自家数据库系统构建的云平台就成了最核心的变现阵地。

## 注定的上云

数据库系统本身只是一项技术，从技术到产品之间还要跨过一道可用性的鸿沟，而最终商品的果实更是挂在那一头的树枝上。我们需要迈过云平台 (Cloud Platform) 这座桥梁，再爬上分发 (Distribution) 的那把梯子，才能摘下最终商品的果实。所以我们看到 MongoDB 靠着 Atlas 云平台高歌猛进；Kafka 身后的 Confluent 完成了百亿美金的 IPO 后股价还继续扶摇直上；千亿美金的 Snowflake 从 Day 1 就是一个云产品；ClickHouse 眼看着 [Gigapipe](https://gigapipe.com/), [Firebolt](https://firebolt.io) 要来窃取果实，也赶紧成立了一家公司，构建自己的云平台。

早前 [Google BigQuery](https://www.theinformation.com/articles/internal-google-data-reveals-its-bigger-than-snowflake-in-key-cloud-business) 泄露出了他的营收信息：

> The enterprise is growing so fast that Snowflake has projected it will generate roughly $1.13 billion in revenue for the year ending January, double the amount for its previous fiscal year. But Google Cloud’s data analytics unit, which consists mostly of a data warehousing product, BigQuery, has already generated around $1.5 billion in revenue so far this fiscal year,

可以看到数据库云服务的利润/营收/增长都极其可观。大家考虑的点已经不是到底该不该做云平台，而是是否 Day 1 就直接做云平台。

尤其在 OLAP 领域，市场都在下注下一个 Snowflake，Databricks，结果这两家先在年底为了 Benchmark 吵了起来。

## OLAP

### 砖 (Databricks) 拍雪花 (Snowflake)

Snowflake 和 Databricks 这次 benchmark 的事件还闹得不小，两边的 co-founder 都上阵了。首先是 Databricks 发博客，[Databricks Sets Official Data Warehousing Performance Record](https://databricks.com/blog/2021/11/02/databricks-sets-official-data-warehousing-performance-record.html)，然后 Snowflake 回击，[Industry Benchmarks and Competing with Integrity](https://www.snowflake.com/blog/industry-benchmarks-and-competing-with-integrity/)，接着 Databricks 反驳,  [Snowflake Claims Similar Price/Performance to Databricks, but Not So Fast!](https://databricks.com/blog/2021/11/15/snowflake-claims-similar-price-performance-to-databricks-but-not-so-fast.html)。

从技术上说，性能指标不能说不重要，不然 Snowflake 和 Databricks 不会争得那么厉害，业界也不会有各种 benchmark，TPC 系列 (TPC-C，TPC-H，TPC-DS)，Sysbench, YCSB，Oceanbase 登顶 TPC-C, TPC-H 也是中国数据库行业的里程碑事件。就像不懂技术的管理者只能关注代码行数 (LOC) 来衡量研发效能, 一般的企业也很难分清 Snowflake 和 Databricks 的差别，采购时最看重的就是性价比，而那个性在非行业资深人员眼里其实就是看个性能跑分了。

但从产品来讲，如果跑分真的那么重要，那 Apple 就不会是市值最高的公司。性能只是一个 table stake，你的产品性能是不能和对手有指数级差距，不然连上牌桌机会都没有。但整条链路的快慢主要还是取决于结合业务场景的调优，设计合理的模型，创建正确的索引能带来千倍的提升，避免长事务，减少应用和数据库的交互数也能有数倍的收益。

而且速度只是数据库其中的一项核心指标。数据库内部最核心的一部分叫做引擎 (Engine)，就像汽车引擎一样，除了速度之外，诸如稳定性，油耗，耐久度，维护成本这些指标也同样重要，再加上轮胎，轴承，外装，内饰，操控方式这些，才能一起交付整个驾驶的体验。

事实上 Snowflake 和 Databricks 都是注重产品体验的公司。如果大家有机会去研读 Snowflake 的文档，使用一下他的 Cloud portal / SQL Editor，就能感受到这是一个从建模到交互都精心设计过的产品。至于 Databricks，我想他这次向 Snowflake 发难更多还是『碰瓷』，为了配合接下来的 IPO 再冲冲估值吧。Databricks 本身是一家重视产品也有工具品味的公司，他们会去[收购 Redash](https://databricks.com/blog/2020/06/24/welcoming-redash-to-databricks.html) 这样的产品，读者有兴趣也不妨搜索 “developer experience” site:databricks.com/blog 看看。

当然性能如果好很多的话，就是另外一回事了，21 年 Snowflake, Databricks 这条 AP 赛道上，恰好就有这么一款数据库以洪荒之力杀了出来。

### ClickHouse

![_](/content/blog/database-review-2021-bytebase/dbengine-clickhouse.webp)

从 DB-Engines 的涨幅可以看到，除开 Snowflake，ClickHouse 就是剩下最陡峭的那根了。GitHub star 也涨势喜人。

![_](/content/blog/database-review-2021-bytebase/clickhouse-star-history.webp)

Source [https://star-history.com/#ClickHouse/ClickHouse](https://star-history.com/#ClickHouse/ClickHouse)

ClickHouse 的存在有一段时间了，孵化于俄罗斯的互联网巨头 Yandex，在国内大厂也有大规模部署，比如字节有超过 15000 个节点。ClickHouse 21 年整个生态一下子就起来了，8 月成立了单独的 ClickHouse Inc，立马完成 3 亿美金两轮融资。

ClickHouse 很好地诠释了『一力降十会』，如果和 Snowflake 做对比，他的文档，周边工具可以说是全方位地被吊打。但是他的单表查询性能实在是太强悍了，又是私有化部署，所以精准地切中了互联网业务海量数据查询分析的场景。

所以如果技术真的足够强悍的话，是可以忽略产品力的。当然这也是暂时的，不然 ClickHouse 也不会成立自己的公司，去做云平台了。技术最终还是要通过产品化，再演变成商品，才能进行收割。

毕竟 ClickHouse 再不弄自己的云平台，这套技术就真的要给他人做嫁衣了。第三方 [Gigapipe](https://gigapipe.com/)已经做出了 ClickHouse 云平台，连国内字节火山引擎发布新云平台时，也推出了托管的 ByteHouse，这是火山引擎所有云产品里唯一给了 Byte 前缀的，不可谓不重视。还有一家最虎视眈眈的，则是脱胎于 ClickHouse 技术，却又完全被包装成全新产品的 [Firebolt](https://firebolt.io)。

### Firebolt

笔者也是在写这篇文章的过程中才去研究了下 Firebolt。笔者读完资料后的感受:

如果产品能达到他宣传资料 50% 的话，就该去做空 Snowflake 了。

看一下 Firebolt 的宣言

![_](/content/blog/database-review-2021-bytebase/firebolt-leap.webp)
![_](/content/blog/database-review-2021-bytebase/snowflake-firebolt.webp)
当然 Snowflake 是一个很优秀的产品，而且经过多年的积累，他已经长成了一站式平台， Firebolt 作为初创公司从产品广度上还是远远不及的。但 Firebolt 瞄准的是 Snowflake 的最核心点 Price / Performance / Usability。他们[官网上说](https://www.firebolt.io/blog/druid-clickhouse-and-pinot-vs-data-lakes-and-data-warehouses)：

> Firebolt has shown that you can have the speed of ClickHouse or Druid with the simplicity and flexibility of Snowflake, and about 1/10th the cost of Snowflake, from gigabyte to petabyte scale.

这也是他们的[原话](https://techcrunch.com/2021/06/24/firebolt-raises-127m-more-for-its-new-approach-to-cheaper-and-more-efficient-big-data-analytics/)：

> If you’re not using Snowflake or BigQuery already, we prefer you come back to us later.

螳螂捕蝉，黄雀在后。

虽然笔者只是阅读了他们的资料，没有真正试用过他们的产品。但从阅读的文章和看的 demo，Firebolt 确实是现在 OLAP 市场上最强悍的一家初创公司。他们的整个 marketing 网站内容思路清晰，针对性强。如果光从网站 marketing 的风格看，Firebolt 也确实代表了新一代的数据库公司。

前面提到 Firebolt 其实是脱胎于 ClickHouse 引擎的一家公司，但是你从他的官网上基本发现不了这个痕迹。所以技术许多时候也只是一块垫脚石，要真的能去挑战行业里的顶级玩家，还是技术之外的产品化, marketing 这些商业能力。

前脚 Snowflake 新王刚登基，后面的 Firebolt 就来踢馆了。但我们再读一下 [The Information](https://www.theinformation.com/articles/internal-google-data-reveals-its-bigger-than-snowflake-in-key-cloud-business?rc=qf5adr) 的数据:

> While the cloud-based portion of the data warehousing is growing rapidly, much of the overall market still consists of legacy products that organizations run themselves. According to IDC, at the end of 2020 Oracle had a 30.5% share of the $13.4 billion worldwide market for data warehousing software, followed by Microsoft with 28.9%, IBM with 11.3%, SAP with 8% and Teradata with 6.6%. Aside from Teradata, none of the companies break out cloud-based data warehousing revenue.

其实绝大多数系统都还没上云呢。看来即使市场上有不少新玩家，大家也还是能差异化竞争。

**毕竟蝉还很多。**

21 年的 AP 圈，Snowflake，Databricks，ClickHouse，Firebolt 这些新贵们千帆竞速，而再看 TP 这边，倒还是新老选手同场竞技，一争江湖。

## OLTP

### PostgreSQL

![_](/content/blog/database-review-2021-bytebase/dbengine-postgres.webp)
虽然 AP 系统增长迅速，但从绝对值来看，数据库行业占主导的依然还是 TP 系统，而在这之中，PostgreSQL (PG) 作为一款有 25 年历史的数据库，近年来一直在蓬勃发展，即使和风头正劲的 MongoDB 相比也略胜一筹。

事实上，PG 在过去 5 年 DB-Engine DBMS of the year 的评选中赢了 3 回 (2021 和 2019 分别是 Snowflake / MySQL)。尤其在国外，PG 的流行度越来越高，在笔者看来有几方面的原因 (因为 PG 的主要竞品是 MySQL, 所以如下更多是和 MySQL 进行比较):

1. MySQL 被 Oracle 收购后的一些顾虑。个人觉得 Oracle 收购后对 MySQL 还是做了很多重要的改进，但 License 确实是一个不小的风险，所以许多优秀开源产品比如 GitLab, Sourcegraph 用的都是 PG。
2. PG 有架构设计的先天优势，高级/扩展功能要领先 MySQL 好多。比如虽然 MySQL 也有 Geospatial, JSON 功能，但相比于 PG 的 PostGIS, JSON-B 来说还是差了不少。在 PG 的原生 Plugin 架构之上，不仅长出了 PostGIS，也有 TimescaleDB (也在 21 年拿了 4000 万美金 B 轮) 这样的时序数据库方案。
3. PG 有比 MySQL 强大的多的查询引擎。前不久正好有一位前 MySQL 查询器工程师在离职前[狠狠踩了老东家一脚](https://blog.sesse.net/blog/tech/2021-12-05-16-41_leaving_mysql.html)。其实 PG 稍微调优一下，也可以具有平均水准之上的 AP 能力（事实上许多 OLAP 产品比如 AWS Redshift 就是基于 PostgreSQL 魔改的）。
4. PG 的逻辑隔离是数据库级的，一个 PG 实例可以创建许多个数据库，再把每个数据库分配给不同的租户。虽然 MySQL 实例也能创建多个数据库，但是因为数据库之间默认是相通的，这使得必须给每个租户分配一个单独的 MySQL 实例。在单租户模式下，MySQL 的易用性是占优的，但是到了现在 SaaS，多租户 (multi-tenant) 服务的场景，PG 就大占优势了。这也是为什么从最早的 Heroku，到现在类 Heroku 的新品 render，还有 21 年大火的 Supabase 都采用了 PG 的原因。他们能提供低廉甚至免费的数据库 plan，就是因为他们能用一个 PG 实例服务很多的用户。

当一家公司选择 PG 的话，得到的是一个具有 OLTP，OLAP，Document (JSON-B)，FTS (tsvector/tsquery)，Time-series (TimescaleDB)，Geospatial (PostGIS)，Multi-tenancy 能力的多模数据库 (batteries included)。用一个简单公式来概括的话:

**PostgreSQL = MySQL + 穷人版 (ClickHouse + MongoDB + Elasticsearch + InfluxDB) + Geospatial + Multi-tenancy**

- MongoDB 有分布式能力，这点比 PG 要强，但是论单机 KV 能力的话，PG 不少点其实更强。

- Geospatial 在开源届公认的方案就是 PostGIS，所以如果业务上地理信息处理是核心，那 PostgreSQL 其实也是唯一的选择。

- Multi-tenancy 这里指的更多是应用逻辑上的隔离，但还做不到像 Google Spanner 那样真正租户级别的物理隔离。

虽然 PG 在单表查询上拼不过强悍的 ClickHouse，在文本检索上也比不了 Elasticsearch，即使是在他主战场的事务处理能力，[互联网场景下也略逊 MySQL 一筹](https://eng.uber.com/postgres-to-mysql-migration/)，但一套数据库系统能服务所有场景带来的收益还是太巨大了。每一版 PG 底层能力的升级都能赋能给上层的支撑场景，所以时间越久，滚出来的红利就越大，这也解释了为什么 PG 近几年在 DB-Engines 上节节攀升, 被越来越多团队采用的原因。

当然 PG 还有一些不足，比如容易造成大规模故障的 Transaction ID Wraparound，另外存储引擎如果采用 MySQL InnoDB / Oracle 的 undo logging 应该还能提速不少。但瑕不掩瑜，更何况 PG 不同于其他数据库系统，背后并没有一个金主爸爸，基本是一个纯靠社区维护的 Open Source 产品。

PG 在社区的维护下保持着每年发一个大本版的稳定节奏，我们看看他今年 [PostgreSQL 14 发布时的文章](https://www.postgresql.org/about/news/postgresql-14-released-2318/)
![_](/content/blog/database-review-2021-bytebase/postgres-14.webp)
所以无论是 Snowflake，Databricks 还是 PostgreSQL，不管是 AP 还是 TP 系统，闭源还是开源，大家其实都很明白，帮助用户，帮助应用开发者才是关键。而在 21 年，一款以这个角度切入的新 TP 数据库产品问世了。

### PlanetScale

从资料看这家公司 18 年就成立了，但引起笔者注意的还是今年他官网发布的一篇文章 [Announcing PlanetScale: The database for developers](https://planetscale.com/blog/announcing-planetscale-the-database-for-developers)。在这之前，这家公司提供的是 Vitess 托管服务，Vitess 是基于 MySQL 的分布式中间件，源于 Youtube，很长一段时间支撑了整个 Youtube 的业务 (出于统一 Google 存储技术栈的原因，Youtube 后来切换到了 Spanner)。所以说 PlanetScale 是进行了一次产品形态的转型，虽然底层还是 Vitess，但不再透出，而是主打应用开发场景，包括 Schema 变更，数据库分支构建，autoscaling 这些，就像他文章里说的
![_](/content/blog/database-review-2021-bytebase/planetscale-workflow.webp)
又见 developer workflow

21 年有两家定义当下 developer workflow 的公司 IPO 了，GitLab 和 HashiCorp，都是过百亿美金的市值。GitLab 定义的是代码托管和应用迭代发布的 workflow，HashiCorp 定义的是 Infra 管理的 workflow，而 PlanetScale 想定义的则是数据库应用开发的 workflow。这是一个很好的切入角度，同样是想重新定义前端开发 workflow 的 Vercel 也看到了这点，所以把 5 月才发布的 PlanetScale 放在了他们数据库集成的第一个位置。
![_](/content/blog/database-review-2021-bytebase/vercel.webp)
互联网服务的技术栈，一开始是 LAMP (Linux + Apache + MySQL + PHP)，后来出现了 MEAN (MongoDB + Express + Angular + Node)，而现在则有了新的 VP (Vercel + PlanetScale) 组合，可能会引发又一次的 paradigm shift。
![_](/content/blog/database-review-2021-bytebase/planetscale.webp)
而说到首字母缩写梗，21 年还有一套组合也在冉冉升起。
![_](/content/blog/database-review-2021-bytebase/gosh-stack.webp)
Oh my GoSH

### SQLite

虽然 curl 的作者[未必同意](https://daniel.haxx.se/blog/2021/10/21/the-most-used-software-components-in-the-world/) SQLite 是全世界部署最多的软件组件，但 SQLite 毫无疑问是被部署最多的数据库，光一个手机上可能就有几十上百个，从笔记到微信，几乎每一个应用里都有 SQLite 的身影。SQLite 虽然不是一个完整的数据库系统 (DBMS)，但是拥有着完整的存储引擎和 SQL 接口，也有着足够的性能支撑起绝大部分的服务。又因为他是一个库 (library) 和单文件保存数据的特性，使得应用接入和数据管理都很简单。而 21 年 SQLite 的生态里，一下子出现了好几个有意思的项目:

1. [Litestream](https://litestream.io/)，基于 WAL 做的 SQLite 灾备方案 (就是前面那位 Ben Johnson 写的，他同时也是 Golang BoltDB 的作者)。
2. [Hosting SQLite databases on GitHub Pages](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)，非常巧妙地使用 HTTP Range requests 实现了一个支持 block read 的 VFS。
3. [Serverless SQLite](https://sql.lspgn.workers.dev/),   通过 Cloudflare workers + WASM 部署的 SQLite 服务。
4. [Datasette](https://datasette.io/),   基于 SQLite 的数据探索，分析和发布工具。

Hacker News 上 21 年有关 SQLite 的话题。
![_](/content/blog/database-review-2021-bytebase/sqlite-hacker-news.webp)
SQLite 一个很好的特性，就是把所有的数据都保存在一个单一文件上。即使 Apple 在移动设备上想把文件这个概念对用户隐藏起来，但是整个计算机世界，尤其是开发者的世界，都还是以文件作为原子单位进行操作的。AWS 最古老也是最基础的服务 S3 就是托管文件的；代码仓库是按照文件来记录版本的；像 Vercel，Netlify 这样的网站托管服务，也是以文件为基础进行托管的；而日常传输及备份数据的时候，也是以文件为单位的。

SQLite 的 slogan 是 Small. Fast. Reliable. Choose any three.
![_](/content/blog/database-review-2021-bytebase/sqlite.webp)
在其他 DBMS 大块头前，SQLite 这三条的结合则是一种另类的 powerful。 SQLite 还是一个开源软件，他的 License 用的也是相对另类的 Public Domain。这是什么意思呢，官网给的解释：

SQLite is open-source, meaning that you can make as many copies of it as you want and do whatever you want with those copies, without limitation

在当下 Open Souce 如此复杂的世界里，SQLite 的 License 是一个独特的存在。放到现在很火的 web3 概念，SQLite 无论是 License 还是本身使用场景，都是最符合 web3 气质的数据库。如果 web3 的世界是去中心化的，计算发生在 Edge，数据掌握在个人，对外提供服务的不再是以公司而是个体为单元。那么是不是所有的数据都可以存储在一个个 SQLite 文件上，个人像管理 word 文件的方式来管理他们，也像操作 word 的方式一样以个人形式对外提供服务？而到了那时，SQLite 就是无可争议部署最多的软件组件了。

## 割裂的开源

前面列出的所有数据库产品，除了完全闭源的 Snowflake 和源于开源 ClickHouse 的 Firebolt 外，其他都是开源的。事实上软件行业尤其是互联网的半壁江山都是由 MySQL，PostgreSQL，SQLite，Redis 这些开源数据库系统支撑起来的。除了 PostgreSQL 独树一帜的社区形式外，绝大多数开源数据库身后都站着商业公司。不仅是数据库，事实上整个 Infra 领域已经完全转向了把开源作为标配的商业模式。

其实数据库领域，大家几年前就意识到了这点，主要是看到 MongoDB 走出了一条基于开源，再构建云平台的可持续商业化路径。所以那几年诸如 [Timescale](https://blog.timescale.com/blog/building-open-source-business-in-cloud-era-v2), [Yugabyte](https://blog.yugabyte.com/why-we-changed-yugabyte-db-licensing-to-100-open-source/) 都采取了类似的开源动作，国内信息相对滞后，但也有 TiDB 这样的先行者。

而 TiDB 背后的 PingCAP 在 [20 年末的一笔巨额融资](https://techcrunch.com/2020/11/16/pingcap-the-open-source-developer-behind-tidb-closes-270-million-series-d/)，更是把国内投融资市场彻底拍醒 (或者说用力过猛直接拍晕 🤪)。21 年在 Infra 开源的投融资市场上，国内外基本是同频的，同频的疯狂。

但一边是大量资本涌入开源赛道上的公司，一边仍然是许多个人贡献者无法靠开源获得稳定的收入。GitHub Sponsors 在做积极的尝试，但还很难系统地解决这个问题。而年底爆出的 log4j 安全漏洞，又把这个问题摆上了台面，网友结合经典的 [https://xkcd.com/2347/](https://xkcd.com/2347/) 画出了这个
![_](/content/blog/database-review-2021-bytebase/xkcd-log4j.jpeg)
原图
![_](/content/blog/database-review-2021-bytebase/xkcd-dependency.png)
所以 21 年又出现了这么一个魔幻的现象，一边是一群开源贡献者躲在小黑屋里继续用爱发电，维护着支撑各大互联网服务的核心组件，一边是另一帮基于开源软件的商业公司，拿着 VC 给的慷慨支票，高歌猛进，其中再穿插一些公有云大厂和商业公司之间的爱恨纠葛 (比如 [AWS vs Elasticsearch](https://aws.amazon.com/blogs/aws/amazon-elasticsearch-service-is-now-amazon-opensearch-service-and-supports-opensearch-10/))。

笔者一直认同慈善要用商业化手段运营才可持续，所以认为运作开源项目也该如此，尤其是数据库这样的基础设施，PostgreSQL 的社区形态更多只能作为一个特例来看 (当然非常值得尊敬)。再看 MySQL，虽然许多人吐槽 Oracle 收购 MySQL / InnoDB 后的种种不作为，但事实上在 Oracle 稳定的财务支持下，MySQL 这几年做了很多重要的改进，[比如在 8.0 中，给数据库字典加上了事务性](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-0.html#mysqld-8-0-0-data-dictionary)。

但是另一方面，许多热钱同时涌入这个赛道当然会带来问题。10 年前 NoSQL 一样很火，但现在除了公有云厂自身的服务外，唯一取得商业成功的也只有 MongoDB。Riak,  RethinkDB 这些都沉寂了，即使是 HBase，虽然取得了[生态的胜利](https://cloudplatform.googleblog.com/2015/05/introducing-Google-Cloud-Bigtable.html)，但背后的御三家 Cloudera，Hortonworks，MapR 全都没有获得商业上的成功。而就算是年底刚上市的 Couchbase，接下来在 MongoDB 的阴影下也会面临很大的挑战 (Couchbase 这个上市本身也很勉强)。

具备工程素养的技术团队，他的 Infra 选型是排他的，而开源产品又是跨越国界的，所以开源 Infra 市场是一个 winner take all 的市场，这也是大家都要走开源路线的原因，要去抢生态。Google 最先发布了 Bigtable 的论文，结果他的 Bigtable 云产品到头来还要去兼容根据他论文写出来的 HBase (也因为有了这样的教训，才有了之后 Google 把[他最核心的技术通过 Kubernetes 开源出来的决策](https://www.wired.com/2015/06/google-kubernetes-says-future-cloud-computing/))。但是在数据库/存储领域，许多生态已经是定型了，文件接口是 S3 API，SQL 接口 MySQL/PG 协议二选一，而 NoSQL 就是 Redis, HBase, MongoDB API。

比如当前一代的 NewSQL 系统，都是分布式，关系型，有些还自带分析能力 (HTAP)，大家都想成为 TP 领域的下一个 Snowflake。这些新系统既要互相群战，又要和 PG/MySQL 竞争 (即使 PG/MySQL 不做任何改进，硬件本身的升级换代，也会让单机版的原生 PG/MySQL 更具竞争力)。

一将功成万骨枯。

## 随性的预测

1. PlanetScale 会有很好的发展，Vercel + PlanetScale 的 VP 组合会给开发 workflow 带来一个新的 paradigm shift，尤其吸引到很多的前端和全栈开发者。
2. 会有新的数据库问世，主打点也会是开发 workflow。
3. 会出现做 ClickHouse 工具的初创公司，并获得不菲融资。
4. Firebolt 会成为史上融资速度最快的数据库公司。
5. PostgreSQL 会拿下 2022 DB-Engine of the year。
6. 会诞生基于 SQLite 的杀手级解决方案。
7. 开源数据库应用开发场景，会出现一款重量级工具产品。

尽量写得直接，虽然更容易被打脸，但也更有意思。所列的这些都是积极的预测，当然最后一条笔者也要认领一小部分的 KPI😊。

## 最后的总结

洋洋洒洒写了很多，最后再提炼一些观点

1. 数据库本身只是一个技术，而商业售卖的不是技术，而是解决方案。所以需要构建的是围绕数据库引擎的云平台，工具，开发者生态以及最佳实践。
2. 数据库引擎是核心，但性能只是其中的一个指标，引擎本身的竞争已经很激烈，但围绕数据库应用开发的 workflow 还有很多待解决的点。而决定数据库产品成败的不再是机器视角的指标功能点比拼，而是开发者视角下的体验和定义 workflow 能力的较量。
3. 技术，产品，商业，有些赛道只需最后一项，有些赛道需要后两项，但 Open Source 赛道则是铁人三项，好技术只能让你前期跑快一些，产品，商业跟不上立马被翻盘 (MongoDB 之于 RethinkDB, Firebolt 之于 ClickHouse)。
4. 选 PostgreSQL 不会错。

2023 年再见！
