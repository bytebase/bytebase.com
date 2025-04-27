---
title: "Aurora vs. RDS: engineering guide to choose the right AWS database for 2025"
author: Tianzhou
updated_at: 2025/04/27 18:00
feature_image: /content/blog/aurora-vs-rds/cover.webp
tags: Comparison
description: 'An engineering perspective to evaluate Amazon Aurora and RDS, and help you to choose the right AWS
database for 2025'
---

<HintBlock type="info">

This post is updated regularly. For the impatience, jump to the [Recommended Setup](#recommended-setup) section.

</HintBlock>

![gartner](/content/blog/aurora-vs-rds/gartner-2024.webp)

Once again, AWS is ranked among the top in the latest Gartner 2024 Magic Quadrant for Cloud Database Management Systems.
The AWS OLTP relational database portfolio consists of 3 products:

- `Amazon RDS` (Relational Database Service) was announced by AWS on October 22, 2009 and probably
  is the largest database fleet in the world.

- `Amazon Aurora` was announced on November 12, 2014, positioned as RDS premium providing unparalleled high performance and availability at global scale with full MySQL and PostgreSQL compatibility.

- `Amazon Aurora DSQL` was announced in December 2024 at AWS re:Invent, offering a distributed SQL database with 99.999% multi-Region availability, strong consistency, PostgreSQL compatibility, and claims of 4x faster reads and writes compared to other distributed SQL databases.

When an engineering team onboards AWS, one of the very first tasks is to choose the right database solution for their needs (unless they decide to go NoSQL, then they need to pick between MongoDB, DynamoDB, and other options). Below we provide our engineering perspective to compare the following dimensions:

- [Supported Databases](#supported-databases)
- [Architecture](#architecture)
- [Compatibility](#compatibility)
- [Performance](#performance)
- [Elasticity](#elasticity)
- [High Availability](#high-availability)
- [Pricing](#pricing)
- [Recommended Setup](#recommended-setup)
- [Further Readings](#further-readings)

## Supported Databases

![databases](/content/blog/aurora-vs-rds/databases.webp)

RDS supports all mainstream relational databases including MySQL, PostgreSQL, MariaDB, SQL Server, Oracle, and Db2, with Extended Support for older versions. As of 2025, RDS maintains major versions of these engines.

Aurora supports MySQL and PostgreSQL. The service has maintained its focus on these two popular open-source database engines, optimizing their performance in the cloud environment.

![databases](/content/blog/aurora-vs-rds/upstream-version.webp)

Aurora DSQL, the newest addition to AWS's database portfolio, currently supports PostgreSQL compatibility.

RDS offers all upstream versions, but some are nearing end-of-support, such as PostgreSQL 12 (end date: Feb 28, 2025) and MySQL versions 8.0.32-8.0.36 (end date: Mar 31, 2025). Extended Support is available for up to 3 years at additional cost, starting March 1, 2024.

Aurora versions include MySQL 3.08.2 (compatible with MySQL 8.0.39) and PostgreSQL 16.4, with new features like fast failover. Aurora DSQL focuses on PostgreSQL compatibility and distributed workloads with strong consistency across regions.

## Architecture

RDS mostly runs the vanilla database engines on the cloud. While Aurora is a **cloud-native** database service.
Aurora is cloud-native because it leverages the cloud environment to separate compute and storage, uses [Amazon S3](https://aws.amazon.com/s3/) to persist data. This novel approach increase performance, high availability, and scalability.

![aurora-arch](/content/blog/aurora-vs-rds/aurora-arch.webp)

Aurora DSQL builds on this with a distributed, multi-region design, enabling active-active architecture for global operations. It ensures consistency through **decoupled transaction processing** and **microsecond-accurate time synchronization**, ideal for globally distributed, highly available applications.

![aurora-dsql-arch](/content/blog/aurora-vs-rds/aurora-dsql-arch.webp)

## Compatibility

Both Aurora and RDS bear the same limitation as a Cloud database:

- You can only have [semi-super user](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.MasterAccounts.html).
- You are not allowed to access the database server file systems. For MySQL, this means
  you can only use `LOAD DATA LOCAL` to import data from your local file system, while you can't use `LOAD DATA` to import from the server
  file system.

Though Aurora is a proprietary technology, it mostly differs from the vanilla MySQL / PostgreSQL on the storage engine layer.
On the other hand, the server layer, which determines most user-facing behaviors is almost identical. Thus the main compatibility gaps for Aurora is storage engine related. e.g. Aurora for MySQL only supports InnoDB, while RDS supports old engines such as MyISAM (however, you won't use MyISAM engine anyway if you start a new project).

Saying that, Aurora codebase diverges more from the vanilla MySQL/Postgres than RDS, thus you should expect more lags for the AWS team to bring in the latest upstream update. e.g. Aurora PostgreSQL added the popular pgvector extension 2 months later than RDS.

![pgvector-rds](/content/blog/aurora-vs-rds/pgvector-rds.webp)
![pgvector-aurora](/content/blog/aurora-vs-rds/pgvector-aurora.webp)

For Aurora DSQL, as a newer service, the extension ecosystem is still developing. While it maintains core PostgreSQL compatibility, not all extensions available in standard PostgreSQL or Aurora PostgreSQL are currently supported in Aurora DSQL. AWS has indicated plans to expand extension support based on customer demand.

## Performance

According to [the official website](https://aws.amazon.com/rds/aurora/features/), Aurora offers up to 5x the throughput of MySQL and 3x the throughput of PostgreSQL.

This [benchmark](https://dev.to/aws-heroes/amazon-aurora-is-now-60-times-faster-than-rds-for-mysql-really-3c0e) suggesting Aurora can be 60 times faster than RDS.

Aurora provides better write performance because it reduces the write amplification by only sending the redo log to the remote storage service, which eliminates other writes during transaction commit path such as the infamous double-write buffer.

Aurora provides better read scalability because of the log-based architecture, it can support up to 15 read-replicas. RDS can only support 5, RDS doesn't support more because the classic streaming replication carries more performance penalty on the primary. Aurora also incurs much lower replication lags, especially under write-heavy load.

Aurora DSQL takes performance to a new level for distributed workloads. According to AWS, Aurora DSQL delivers 4x faster reads and writes compared to other popular distributed SQL databases. This is achieved through its innovative approach to transaction processing that parallelizes writes across regions and its use of the Amazon Time Sync Service for precise operation ordering.

RDS uses EBS, the disk performance differs based on the [storage types](https://docs.aws.amazon.com//AmazonRDS/latest/UserGuide/CHAP_Storage.html). Since 2023, AWS has continued to improve the underlying EBS performance, but the architectural differences still give Aurora and Aurora DSQL significant advantages for most workload types.

In general, Aurora outperforms RDS considerably, and Aurora DSQL offers even greater performance for distributed workloads. But you still need to benchmark for your own specific use cases to determine the best fit.

## Elasticity

![gp2-burst](/content/blog/aurora-vs-rds/gp2-burst.webp)

RDS doesn't have much elasticity, if you choose the gp2 SSD storage, it can be [bursted](https://docs.aws.amazon.com//AmazonRDS/latest/UserGuide/CHAP_Storage.html) and that's pretty much it.

Standard Aurora can provision read-replicas quickly, other than that, it doesn't provide elasticity out of the box. However, Aurora's architecture does allow for faster storage scaling compared to RDS.

Aurora Serverless and especially its [Serverless v2](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html) offers great elasticity to scale up/down computing resources. Great for workloads such as e-commerce. In 2025, AWS announced [Serverless Reservations](https://aws.amazon.com/about-aws/whats-new/2025/04/serverless-reservations-discounted-pricing-option-amazon-redshift-serverless/), a new discounted pricing option for serverless database services, making Aurora Serverless even more cost-effective for predictable workloads with variable capacity needs.

Aurora DSQL takes elasticity to a new level with its distributed architecture. It automatically scales to meet any workload demand without database sharding or instance upgrades, and can scale reads and writes independently, eliminating scaling bottlenecks while maintaining performance. This makes Aurora DSQL particularly well-suited for applications with unpredictable global traffic patterns or those requiring rapid scaling across regions.

## High Availability

![ha](/content/blog/aurora-vs-rds/ha.webp)

RDS offers multi-AZ HA setup with a SLA of `up to 99.95%`, while Aurora HA offers `up to 99.99%`. Aurora can failover faster because of its log-based architecture. And for write-intensive load, RDS failover are more problematic because of the high replication lag.

Aurora also has [global databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html) to enable low latency global reads and disaster recovery from outages across an AWS Region.

Aurora DSQL takes high availability to a new level with its 99.999% multi-Region availability (five nines). Its active-active architecture and automated failure recovery ensure that applications can always read and write to any Aurora DSQL endpoint, even during regional outages. All transactions written in one Region are reflected in other Regions with strong consistency, eliminating the traditional trade-offs between availability and consistency.

In 2024, AWS also enhanced Amazon DynamoDB global tables with multi-Region strong consistency, using the same underlying technology leveraged by Aurora DSQL. This indicates AWS's strategic focus on providing strongly consistent, highly available database services across its portfolio.

## Pricing

![pricing-rds-aurora](/content/blog/aurora-vs-rds/pricing-rds-aurora.webp)

If you follow the AWS wizard to pick the production template (8c64g r6g.2xlarge + multi-AZ HA), you will find the price
for Aurora is much cheaper than RDS. Too good to be true.

![pricing-aurora-notes](/content/blog/aurora-vs-rds/pricing-aurora-notes.webp)

The caveat is Aurora also charges on I/O that is not included in the pricing estimate. This surprised quite a few
customers when they receive a huge AWS bill. This unpredictable cost was the biggest concern for teams adopting
Aurora initially. In 2023, Aurora fixed this by introducing Aurora I/O-Optimized to include the I/O cost in the storage, and this pricing model has continued to be refined through 2025.

![pricing-aurora-io-optimized](/content/blog/aurora-vs-rds/pricing-aurora-io-optimized.webp)

In 2025, AWS introduced Serverless Reservations, a new discounted pricing option for serverless database services including Aurora Serverless. This provides cost savings for customers who can commit to a minimum level of usage while still maintaining the flexibility of serverless scaling.

For RDS, starting March 2024, Extended Support fees apply (5%–20% over three years) for outdated database versions, making version planning critical.

Aurora DSQL, while more expensive, can be cost-effective for multi-region, strongly consistent applications compared to building custom solutions.

Besides, only RDS offers free-tier and low db instance tiers starting from 2c1g t3.micro. Standard Aurora
starts from 2c16g r5.large and burstable classes start from 2c4g t3.medium. Aurora Serverless can specify
0.5 ACU as the minimum. 1 ACU provides 2 GiB of memory and corresponding compute and networking.

You should use [AWS Pricing Calculator](https://calculator.aws/) and it's also a good idea to monitor your
database cost by using a specialized tool such as [Vantage](https://www.vantage.sh/).

## Recommended Setup

Capability-wise, AWS Aurora beats RDS in almost every aspect, and Aurora DSQL now extends these capabilities even further for distributed applications. AWS continues to invest more resources in Aurora and Aurora DSQL than in RDS since these services are key differentiators from other cloud vendors. Though Aurora is mostly MySQL / PostgreSQL compatible, it creates a different vendor lock-in by providing unmatched ROI. Aurora DSQL adds another layer of capability for applications requiring global distribution with strong consistency.

For bootstrapped or small business, Aurora is still pricy and RDS is a cost-effective solution:

| Startup       | Choice         |
| ------------- | -------------- |
| Test Instance | RDS without HA |
| Prod Instance | RDS with HA    |

For growth stage business, Aurora is more suitable, and Aurora Serverless offers the extra flexibility
to optimize the cost.

| Growth                               | Choice                       |
| ------------------------------------ | ---------------------------- |
| Always-on Test Instance              | Standard Aurora without HA   |
| On-demand Test Instance              | Aurora Serverless without HA |
| Prod Instance                        | Standard Aurora with HA      |
| Prod Instance with fluctuate traffic | Aurora Serverless with HA    |

For enterprise businesses with global applications requiring the highest levels of availability and consistency, Aurora DSQL provides capabilities that were previously difficult to achieve:

| Enterprise  | Choice |
| --------------------------------------------- | ------ |
| Global Applications                      | Aurora DSQL |
| Financial Applications requiring strong consistency   | Aurora DSQL |
| Multi-region Applications with high write throughput  | Aurora DSQL |

Normally, you should start with RDS and migrate to Aurora when the business takes off, and consider Aurora DSQL when your application requires global distribution with strong consistency. AWS provides [detailed guide](https://aws.amazon.com/getting-started/hands-on/migrate-rdsmysql-to-auroramysql/) on how to migrate from RDS to Aurora with near zero downtime, and similar migration paths are available from Aurora to Aurora DSQL.

---

After you decide the database product, there remains task to figure out the database
development workflow:

- How developers propagate the change from dev to production?
- How to get the SQL change peer-reviewed by the DB person in an efficient manner? Or even better with automated SQL checks?
- How to enforce data access policy for PII compliance?

If you are thinking about these problems, please check out Bytebase. It's an [all-in-one tool](/blog/all-database-tools-bytebase-replaces) to centralize all human-to-db operations for heterogeneous databases.

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)

## Further Readings

- [Postgres vs. MySQL: a Complete Comparison](/blog/postgres-vs-mysql)
- [Amazon Aurora ascendant: How we designed a cloud-native relational database](https://www.allthingsdistributed.com/2019/03/amazon-aurora-design-cloud-native-relational-database.html)
- [Amazon database master user account privileges](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.MasterAccounts.html)
- [Amazon Aurora features](https://aws.amazon.com/rds/aurora/features/)
- [Amazon Aurora pricing](https://aws.amazon.com/rds/aurora/pricing/)
- [Amazon Aurora DSQL: The fastest distributed SQL database](https://aws.amazon.com/rds/aurora/dsql/)
- [Using Aurora Serverless v2](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html)
- [High availability for Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html)
- [Amazon RDS features](https://aws.amazon.com/rds/features/)
- [Amazon RDS pricing](https://aws.amazon.com/rds/pricing/)
- [Amazon RDS Extended Support](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support.html)
- [Amazon RDS DB instance storage](https://docs.aws.amazon.com//AmazonRDS/latest/UserGuide/CHAP_Storage.html)
- [AWS Serverless Reservations pricing](https://aws.amazon.com/about-aws/whats-new/database/?whats-new-content.sort-by=item.additionalFields.postDateTime&whats-new-content.sort-order=desc&awsf.whats-new-products=*all)
