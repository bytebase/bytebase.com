---
title: 数据库年度报告：回望2021
author: Tianzhou
published_at: 2022/01/25 07:48:55
feature_image: /content/blog/database-review-2021-andy-pavlo-chinese/top-10-database.webp
tags: Hidden, Chinese
description: 数据库产业经历了爆发式增长的一年。在这一年里，数据库产业后浪推前浪，厂商围绕性能测试结果展开角逐，更有一轮又一轮额度惊人的融资。同时，在经历了一系列并购、破产和退出之后，我们也不得不同一些熟悉的数据库告别。 年关将至，在正式进入2022年之前，这些事件也值得我们做一次盘点、总结与反思。以下是部分要点事件。关于它们在数据库领域的意义，我做的一些思考。
---

> 原文: [https://ottertune.com/blog/2021-databases-retrospective/](https://ottertune.com/blog/2021-databases-retrospective/)

数据库产业经历了爆发式增长的一年。在这一年里，数据库产业后浪推前浪，[厂商围绕性能测试结果展开角逐](https://twitter.com/andy_pavlo/status/1460429162741645330)，更有一轮又一轮额度惊人的融资。同时，在经历了一系列并购、破产和退出之后，我们也不得不同一些熟悉的数据库告别。 年关将至，在正式进入 2022 年之前，这些事件也值得我们做一次盘点、总结与反思。以下是部分要点事件。关于它们在数据库领域的意义，我做的一些思考。

## PostgreSQL 的统治力

开发者的习惯已经转变，PostgreSQL 成了新应用的首选。它可靠性高，功能丰富且依然在持续完善中。2010 年，PostgreSQL 的开发团队转而采用了更为激进的发布策略，每年进行一次大的版本更新 (感谢 [Tomas Vondra](https://twitter.com/fuzzycz/status/1475956928295673857))。 当然 PostgreSQL 还是开源项目。 如今很多系统都把[兼容 PostgreSQL](https://dbdb.io/browse?compatible=postgresql) 作为差异化竞争力。这种兼容性是通过支持 PostgreSQL 的 SQL 方言 ([DuckDB](https://news.ycombinator.com/item?id=24531606))，传输协议 ([QuestDB](https://questdb.io/docs/reference/api/postgres/), [HyPer](https://databasearchitects.blogspot.com/2015/04/using-hyper-with-postgresql-drivers.html))，或者整个 Server 层前端 ([Amazon Aurora](https://aws.amazon.com/blogs/database/introducing-the-aurora-storage-engine/), [YugaByte](https://docs.yugabyte.com/latest/api/ysql/), [Yellowbrick](https://en.wikipedia.org/wiki/Yellowbrick_Data)) 来实现的。重量级玩家也已经入局。十月，谷歌宣布[在 Cloud Spanner 中兼容 PostgreSQL](https://www.infoq.com/news/2021/10/cloud-spanner-postgresql/)。同样是在十月，Amazon 宣布了 [Babelfish](https://aws.amazon.com/about-aws/whats-new/2021/10/babelfish-aurora-postgresql-now-generally-available/) 的功能，它可以转换 SQL Server 的查询，用于 Aurora PostgreSQL。 [DB-Engines 排行榜](https://db-engines.com/en/ranking/)是衡量数据库流行度的标尺。这份排行不是十全十美的，评分也带有主观色彩。但它评选出的前十名还是基本合理的。排行榜显示，截止到 2021 年 12 月，PostgreSQL 在最受欢迎的数据库中仍旧位列第四，排在 Oracle 、MySQL 和 MSSQL 之后。不过，在过去一年里它与 MSSQL 之间的差距已经缩小了。

另一个值得思考的点是 PostgreSQL 在线上社区中被提及的频次。这为我们提供了另一种视角，让我们窥见当人们讨论数据库时他们究竟在讨论什么。我下载了 2021 年度 [Reddit 中 Database 板块](https://www.reddit.com/r/Database/)上的所有评论，并清点了各个数据库名称在其中出现的频次 (当然我是用 PostgreSQL 做这项工作的)。我从我的 [Database of Databases](https://dbdb.io/) 中交叉引用了我了解的所有数据库的列表，对缩写做了清洗（例如， Postgres → PostgreSQL, Mongo → MongoDB, ES → Elasticsearch），最后计算出了十个最常被提及的 DBMS：

![_](/content/blog/database-review-2021-andy-pavlo-chinese/top-10-database.webp)

当然这张排名表没那么科学，因为我没有对这些评论做情感分析。然而，它确实清晰地展现出，在过去一年里，相较于其他数据库，PostgreSQL 被人们提及的频次要更多。经常有开发者发帖询问该选择哪一个 DBMS 来开发新应用。社区成员对此的回答几乎总是 PostgreSQL。

### Andy 观点

先要说明，一个关系型数据库成为待开发应用的首选是件好事。这说明 Tedd Codd 的关系模型自上世纪七十年代长盛不衰。其次，PostgreSQL 是个伟大的数据库系统。当然，和其他所有 DBMS 一样，它也有各种已知和未知的问题。但 PostgreSQL 已经赢得了如此之多的注意，人们也在其上灌注了许多精力。在这两点的加持下，它只会发展地越来越好。

## 性能测试乱战

这一年，各个数据库厂商对性能测试结果的热爱没有丝毫消退。从上个世纪八十年代起，它们就试图证明自己的数据库系统要快于竞争对手的产品。[TPC](http://tpc.org/) 就是在这一背景下建立的。它为数据库间的比较提供了一个客观公允的平台。[但在过去十年间，TPC 的影响力逐渐消退](https://twitter.com/andy_pavlo/status/1461164543825129481)，普及度渐渐下降。于是如今，我们又被卷入了新一轮的数据库性能测试大战中。 这一年，围绕性能测试结果展开了三场激烈争斗。

### Databricks vs.Snowflake

Databricks 宣布他们的新 Photon SQL 引擎[在 100TB TPC-DS 上创下了新的世界纪录](https://databricks.com/blog/2021/11/02/databricks-sets-official-data-warehousing-performance-record.html)。Snowflake 随即回击，声称自己的数据库要[二倍于这个速度](https://www.snowflake.com/blog/industry-benchmarks-and-competing-with-integrity/)，而且 Databricks 没有正确运行 Snowflake。[Databricks 予以反击](https://databricks.com/blog/2021/11/15/snowflake-claims-similar-price-performance-to-databricks-but-not-so-fast.html)，宣称他们的 SQL 引擎有着最佳的执行效率，性价比也高于 Snowflake。

### Rockset vs.Apache Druid vs.ClickHouse

[ClickHouse 跳了进来](https://altinity.com/blog/clickhouse-nails-cost-efficiency-challenge-against-druid-rockset)，表示自己在成本效率上完胜 Druid 和 Rockset。但先别急：[作为回应，Imply](https://imply.io/blog/druid-vs-rocktset-revisted/) 对 Druid 的新版本进行了一系列测试，并宣告了胜利。[Rockset 插进来](https://rockset.com/blog/comparing-rockset-apache-druid-clickhouse-real-time-analytics/)，声称自家产品在实时分析方面的表现要优于另外两家。

### ClickHouse vs.TimescaleDB

[Timescale 嗅到了血腥气，下场参战](https://blog.timescale.com/blog/what-is-clickhouse-how-does-it-compare-to-postgresql-and-timescaledb-and-how-does-it-perform-for-time-series-data/)。他们发布了自己的性能测试结果，逮到机会指出了 ClickHouse 技术上存在的弱点。有关第三方性能测试的讨论[成了 Hacker News 的热门](https://news.ycombinator.com/item?id=29096541)。

### Andy 观点

在先前的性能测试争夺战里，数据库社区已是血流漂杵
[[1]](https://www.mongodb.com/blog/post/high-performance-benchmarking-mongodb-and-nosql-systems)
[[2]](https://www.percona.com/blog/2011/02/28/is-voltdb-really-as-scalable-as-they-claim/)
[[3]](https://www.youtube.com/watch?v=-TIUGC4X2q8&amp;t=418s)。
我承认[我也曾热衷于此](https://twitter.com/andy_pavlo/status/296336208588595200)。但在争吵中我失去了很多朋友。有一次，我甚至因为乱七八糟的性能测试结果和女朋友分了手。年岁渐长之后，我可以说这一切都不值得。现如今，要在不同的系统之间做对比变得更加困难。因为云 DBMS 有许多可变的部分和可调节的选项。所以，要断定表现差异背后的真实原因通常会很困难。真实场景下的应用也不仅仅是在一遍又一遍地执行同一条指令。录入、变换和清洗数据时的用户体验和干巴巴的性能测试结果同等重要。正如我[在此文中和采访者谈论 Databricks 的性能测试结果](https://www.protocol.com/enterprise/databricks-snowflake-data-warehouse-tpc)时说的那样，只有老古董才会在意 TPC 官方数据。

## 大数据，大投资

从 2020 年下半年开始，额度超过 1 亿美元的融资轮数一直在平稳增长。2020 年共有 327 次这种大额融资。这占据了近半风险投资总交易额。在 2021 年 1 月，一亿美元以上的[风投轮数已经过百](https://explodingtopics.com/blog/vc-trends)。 2021 年，许多投资都流向了数据库公司。在事务型数据库领域，CockroachDB 领跑募资大赛。CockroachDB 开年即进行了一轮[1.6 亿美元的融资](https://venturebeat.com/2021/01/12/cockroachdb-creator-cockroach-labs-raises-160-million-at-a-2-billion-valuation/)，并[在 2021 年 12 月募资高达 2.78 亿美元](https://www.cockroachlabs.com/news/press-release-series-f-funding/)，为这一年画上句号。Yugabyte 则完成了[1.88 亿美元的 C 轮融资](https://hrnxt.com/news/investment/yugabyte-closes-188-million-series-c-funding-round-bringing-valuation-to-over-1-3b/44702/2021/11/02/)。作为 [Vitess](https://vitess.io/) 的托管版本，PlanetScale 开启了[2000 万美元的 B 轮融资](https://techcrunch.com/2021/06/23/planetscale-raises-30m-series-b-for-its-database-service/)。NoSQL 的拥趸，相对较老的 DataStax 也[在一轮风投中为他的 Cassandra 生意募集到了 3760 万美元](https://www.crunchbase.com/funding_round/datastax-series-unknown--75eb1d91)。 这些数字已经很让人印象深刻了，然而分析型数据库的市场甚至要更加火热。2021 年 9 月，TileDB 完成了一轮融资，[未透露具体金额](https://tiledb.com/blog/lockheed-martin-ventures-and-ntt-docomo-ventures-invest-in-tiledb-inc-to-advance-their-universal-database-2021-09-29)。Vectorized.io 为他们兼容 Kafka 的流式平台[募集到了 1500 万美元](https://techcrunch.com/2021/01/26/vectorized-announces-15-5m-investment-to-build-simpler-streaming-data-tool/)。StarTree 也走到台前，宣布完成了一轮[2400 万美元的融资](https://www.zdnet.com/article/apache-pinot-focused-startree-raises-24m-series-a/)，用以商业化 Apache Pinot。matviews-on-steroids DBMS Materialize 宣布他们[在 C 轮融资中募集到了 6000 万美元](https://venturebeat.com/2021/09/30/streaming-database-platform-provider-materialize-lands-60m/)。Imply 为基于 Apache Druid 的数据库服务[筹集到了 7000 万美元](https://venturebeat.com/2021/06/16/data-analytics-startup-imply-nabs-70m-to-grow-cloud-service/)。SingleStore 在 2021 年[募集到了 8000 万美元](https://techcrunch.com/2021/09/08/real-time-database-platform-singlestore-raises-80m-more-now-at-a-940m-valuation/)，这让他们离 IPO 又近了一步。这一年伊始，Starburst Data 为 Trino 系统（前身是 PrestoSQL）[募集了 1 亿美元](https://www.bloomberg.com/news/articles/2021-01-06/starburst-data-hits-1-2-billion-valuation-as-andreessen-invests)。另一家走到台前的 DBMS 创业公司 Firebolt 宣布他们为自己基于 ClickHouse 分支的新型云数据仓库[募集到了 1.27 亿美元](https://techcrunch.com/2021/06/24/firebolt-raises-127m-more-for-its-new-approach-to-cheaper-and-more-efficient-big-data-analytics/)。ClickHouse [募集到了惊人的 2.5 亿美元](https://www.businesswire.com/news/home/20211028005287/en/ClickHouse-Raises-250M-Series-B-To-Scale-Groundbreaking-OLAP-Database-Management-System-Globally)，用以围绕该系统建立一家新公司，同时也取得了对 Yandex 名下 ClickHouse 这一名称的使用权。 但今年，当之无愧的融资冠军要属 Databricks。它以在 2021 年 8 月[高达 16 亿美元的融资额](https://techcrunch.com/2021/08/31/databricks-raises-1-6b-at-38b-valuation-as-it-blasts-past-600m-arr/)力压群雄。

### Andy 观点

我们正处在数据库的黄金时代。如今我们有许许多多优秀的选择。投资人正在数据库领域的创业公司中寻求下一个 Snowflake 式的 IPO。这些公司的融资额要远超先前的数据库创业公司。举例来说，[直到 D 轮融资，Snowflake 的单轮融资额才达到了 1 亿美元](https://craft.co/snowflake-computing/funding-rounds)。此时距它初创已经过去了五年。而 Starburst 在成立的三年内便完成了一轮 1 亿美元的融资。当然影响融资的因素有很多。比如说，在脱离 TeraData 出来创业之前，Starburst 的团队就已在 Presto 上躬耕多年。但在我看来，现如今有更多的资金正在涌向这一领域。

## 纪念堂

很遗憾，在过去的一年里，我们不得不向几位老朋友说再见。

### [ServiceNow 收购了 Swarm64](https://www.zdnet.com/article/servicenow-acquires-database-performance-company-swarm64/)

这个公司最初的产品是一款 FPGA 加速器，用以在 PostgreSQL 上运行分析任务。之后，他们转向了单纯的软件加速器，为 PostgreSQL 提供插件。但他们缺乏持续发展的动力，尤其是相比其他资金充裕的云数据仓库。在被 ServiceNow 收购后，Swarm64 的产品前景仍不明朗。

### [Splice Machine 破产了](https://www.theregister.com/2021/08/26/splice_machine_insolvency/)

Splice 推行的是一个混合型 DBMS。它结合了针对事务型任务的 HBase 和针对分析的 Spark SQL。他们更进一步推出了服务于操作型/实时机器学习应用的平台。然而，由于专门的 OLTP 和 OLAP 系统的统治地位，这样一个多位一体的混合系统没能在数据库市场开辟出一条道路。

### [私募公司收购 Cloudera](https://www.wsj.com/articles/kkr-cd-r-near-deal-to-buy-cloudera-11622510459)

过去五年，MapReduce 和 Hadoop 技术渐渐为潮流所抛弃。因此，Cloudera 也同样失去了在云数据仓库市场发展的动力。[Impala](https://en.wikipedia.org/wiki/Apache_Impala) 和 [Kudu](https://en.wikipedia.org/wiki/Apache_Kudu) 的初代工程师团队大多都已经离开公司，尽管这些项目依旧在持续开发并迭代新版本。它的当前股价已经低于 2018 年 IPO 时的发行价。它的新投资人是否有能力扭转公司局面还有待观望。

### Andy 观点

看到数据库项目和公司走上下坡路总归让人伤心，但这就是数据库产业内部的厮杀博弈。开源也许能让一款 DBMS 在母公司消失之后也能继续存在，但事实并不总是如此。由于数据库本身的复杂性，它必须要有全职员工进行维护，修正 bug 并添加新功能。不是说把破产 DBMS 的源代码权限和控制交到[Apache 基金会](https://www.apache.org/)和 [CNCF](https://www.cncf.io/) 这样的开源软件基金会手中，这个项目就会奇迹般复活了。举例来说，[公司破产](https://rethinkdb.com/blog/rethinkdb-shutdown/)后，[RethinkDB 被捐赠给了 Linux 基金会](https://rethinkdb.com/blog/rethinkdb-joins-linux-foundation/)。但从 GitHub 的各项表现看，它已经死透了（基本没有提交，PR 也不并入）。有类似遭遇的还有 DeepDB：它的母公司在倒闭后为它[创立了自己的非盈利基金会](https://www.businesswire.com/news/home/20170502005138/en/Deep-Information-Sciences-Goes-Open-Source-Relaunches-as-Deep-Software-Foundation)，但没有人再去维护这个项目了。在下一年里，预计还会有更多的数据库公司因无力与大型云服务商和之前提到的众多资金充裕的创业公司抗衡而走上下坡路。

## 野火烧不尽

对很多人来说，疫情期间是段艰难的时光。在听到了这么多坏消息后，突然有个振奋人心的故事总能让人倍感欣慰。众所周知，甲骨文联合创始人 [Larry Ellison](https://en.wikipedia.org/wiki/Larry_Ellison) 近几年的运气一路下滑。2015 年的时候，他气运还不错，那时他是[世界上第五富有的人](https://en.wikipedia.org/wiki/The_World's_Billionaires_2015)。然而人生起起伏伏。到了 2018 年，Larry 在富豪排行榜上已经[跌到了第十位](https://en.wikipedia.org/wiki/The_World%27s_Billionaires#2018)。 但在 2021 年 12 月，一切都变了。Larry Ellison 的身家超过了谷歌联合创始人 Larry Page 和 Sergey Brin，重回世界第五富的位置。2021 年 12 月，在公布了超预期的公司收入后，甲骨文的股价经历了过去二十年来的单日第二高涨幅，Larry Ellison [当天挣到了一百六十亿美元](https://www.cnbc.com/2021/12/10/larry-ellison-is-now-richer-than-the-google-co-founders-page-and-brin.html)。媒体将这归功于投资人高涨的信心。他们相信甲骨文向云端转变的策略起效了。

### Andy 观点

我和 Larry [相识已久](https://twitter.com/andy_pavlo/status/1164345071983976448)。不管对于数据库社区，还是对于全体人类来说，这都是件好事。运气不好滑到世界第十富的时候他可能有点伤心。但我很高兴能看到他走出低谷，重新回到应有的位置上去。 除了家人，数据库是我生命中最重要的事情。 我们期望能够引领崭新的一年。数据库是一个有着高度韧性和创新性的行业，我们很高兴能成为其中的一份子。

祝您和您的[伙伴](https://www.euclidlibrary.org/tickle/otters)新年安康！

P.S.: 放假期间别忘了运行 ANALYZE。
