---
title: Understanding Google Cloud SQL Pricing
author: Candy
updated_at: 2025/05/23 10:29:47
feature_image: /content/blog/understanding-google-cloud-sql-pricing/cover.webp
tags: Industry
description: In the post, we explore the Google Cloud SQL pricing structure, tools for estimating its cost, and tips for optimizing the cost.
---

<HintBlock type="info">

This post is maintained by Bytebase, an open-source database DevSecOps tool that can manage Google Cloud SQL. We update the post gradually.

</HintBlock>

| Update History | Comment          |
| -------------- | ---------------- |
| 2023/07/06     | Initial version. |
| 2025/05/23     | 2025 Update.     |

[Google Cloud SQL](https://cloud.google.com/sql/) is a popular database service from Google Cloud. It offers completely managed relational databases for MySQL, PostgreSQL, and Microsoft SQL Server with rich extension collections, configuration flags, and developer ecosystems. Apart from features, pricing is another core factor to consider when comparing it with other similar services like AWS RDS and Microsoft Azure SQL Database. Also, there are several discussions on Reddit related to the pricing of Google Cloud SQL, as shown in the figure below. These all point to the importance of understanding the structure of Google Cloud SQL pricing.

![reddit](/content/blog/understanding-google-cloud-sql-pricing/reddit.webp)

## Google Cloud SQL Pricing

Pricing for Google Cloud SQL is based on a pay-as-you-go model. As of 2025, Google Cloud SQL offers two editions: Enterprise and Enterprise Plus. These editions provide different levels of availability, performance, and data protection. The price varies among different instance types and regions:

- CPU and memory pricing
- Storage and networking pricing
- Instance pricing (only applicable to shared-core)
- License pricing (only applicable to SQL Server)

### CPU and Memory Pricing

For dedicated-core instances, you choose the number of CPUs and the amount of memory you want, up to 96 CPUs and 624 GB of memory for Enterprise edition and up to 128 CPUs and 864 GB of memory for Enterprise Plus edition. For Cloud SQL Enterprise Plus edition for SQL Server instances, you can also choose from performance-optimized machines (up to 128 CPUs and 864 GB of memory) and memory-optimized machines (up to 16 CPUs and 512 GB of memory).

Pricing for CPUs and memory varies based on the following three primary factors:

- The volume of CPUs you choose
- The total memory you select
- The region where your instance is located

If you enable other services, the total cost may include those charges:

- Failover replicas pricing
- Read replicas pricing
- High Availability pricing

Read replicas and failover replicas are charged at the same rate as stand-alone instances. HA prices are applied for instances configured for high availability, also called regional instances.

**Enterprise Edition (Monthly Pricing)**

| Resource  | Price (USD)      | 1-year commitment | 3-year commitment |
| --------- | ---------------- | ----------------- | ----------------- |
| vCPUs     | $0.0706 per vCPU | $0.05297          | $0.0339           |
| Memory    | $0.0118 per GB   | $0.00883          | $0.00565          |
| HA vCPUs  | $0.1413 per vCPU | $0.105948         | $0.0678           |
| HA Memory | $0.0235 per GB   | $0.01765          | $0.0113           |

**Enterprise Plus Edition - N2 Machine Series (Monthly Pricing)**

| Resource              | Price (USD)      | 1-year commitment | 3-year commitment |
| --------------------- | ---------------- | ----------------- | ----------------- |
| vCPUs                 | $0.0537 per vCPU | $0.04027          | $0.02578          |
| Memory                | $0.0091 per GB   | $0.00683          | $0.00437          |
| HA vCPUs              | $0.1074 per vCPU | $0.08055          | $0.05155          |
| HA Memory             | $0.0182 per GB   | $0.01365          | $0.00874          |
| Data Cache Storage    | $0.0002 per GB   | $0.0002 per GB    | $0.0002 per GB    |
| HA Data Cache Storage | $0.0004 per GB   | $0.0004 per GB    | $0.0004 per GB    |

In addition, Cloud SQL provides committed use discounts (CUDs) that grant deeply discounted prices for continuous use of database instances in a particular region for a one-year or three-year term. CUDs only apply to CPU and memory pricing. For more information, go to review [Committed use discounts](https://cloud.google.com/sql/cud).

### Storage and Networking Pricing

| Storage Type         | Price               |
| -------------------- | ------------------- |
| SSD storage capacity | $0.222 per GB/month |
| HDD storage capacity | $0.118 per GB/month |
| Backups (used)       | $0.105 per GB/month |

#### HA Storage Pricing (Monthly)

| Storage Type         | Price               |
| -------------------- | ------------------- |
| SSD storage capacity | $0.445 per GB/month |
| HDD storage capacity | $0.235 per GB/month |
| Backups (used)       | $0.105 per GB/month |

#### Hyperdisk Balanced

| Resource   | Price                  |
| ---------- | ---------------------- |
| Capacity   | $0.15 per GB/month     |
| IOPS       | $0.026 per IOP/month   |
| Throughput | $0.105 per MB/s /month |

#### Hyperdisk Balanced HA

| Resource   | Price                               |
| ---------- | ----------------------------------- |
| Capacity   | $0.301 per GB/month                 |
| IOPS       | $0.052 per IOPS-month over baseline |
| Throughput | $0.209 per MB/s-month over baseline |

With Hyperdisk Balanced, you are billed for provisioned capacity, IOPS, and throughput independently. You are billed for the total provisioned capacity of your Hyperdisk Balanced volumes until you delete them. You are charged per GiB per month. Hyperdisk Balanced charges a monthly rate for the provisioned IOPS and provisioned throughput (in MBps) in excess of the baseline values of 3,000 IOPS and 140 MBps throughput.

Note: Committed use discounts do not apply to storage or network prices.

### Network Egress Pricing

When network traffic leaves a Cloud SQL instance, the charge applied depends on the destination of the traffic, and in some cases, whether a partner is involved.

Internet egress is network traffic leaving a Cloud SQL instance to a client that is not a Google product, such as using a local server to read data from Cloud SQL.

| Destination                                                                            | Price                                                                                                                                    |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Compute Engine instances and Cloud SQL cross-region replicas                           | Within the same region: free<br />Between regions within North America: $0.12/GB<br />Between regions outside of North America: $0.12/GB |
| Google Products (except Compute Engine and traffic to Cloud SQL cross-region replicas) | Intra-continental: free<br />Inter-continental: $0.12/GB                                                                                 |
| Internet egress using Cloud Interconnect                                               | $0.05/GB                                                                                                                                 |
| Internet egress (not using Cloud Interconnect)                                         | $0.19/GB                                                                                                                                 |

IPv4 addresses: $0.0131 per hour while idle.

### Instance Pricing

Instance pricing is only relevant for shared-core instances. It is charged for every second that the instance is running with the activation policy being set to "always". For more details, see [Billing on partial seconds](https://cloud.google.com/sql/pricing#billing-partial-seconds).

### License pricing (for SQL Server)

SQL Server License Pricing is based on the selected edition. SQL Server instances are charged a 10 minute minimum for licenses. After 10 minutes, SQL Server licenses are charged in 1 minute increments.

Note: From February 1, 2025 through April 30, 2025, Google has waived charges for extended support. Committed use discounts don't apply to extended support prices.

## Tools for Estimating Google Cloud SQL Pricing Cost

Given the pricing complexity, there are tools to help you estimate pricing easily.

### Official Pricing Calculator

[Pricing Calculator](https://cloud.google.com/products/calculator) is the official tool from Google Cloud. It enables you to estimate Google Cloud SQL cost with different configurations. After selecting the database engine, enter required information such as the number of instances, instance type, and location, and click **ADD TO ESTIMATE** to generate the result.

![calculator](/content/blog/understanding-google-cloud-sql-pricing/calculator.webp)

### DB Cost

[DB Cost](https://www.dbcost.com/) is an open source pricing comparison tool for Google Cloud SQL and AWS RDS. It can provide estimates of a set of instances according to your configurations, such as database engines, billed models (on demand and reserved), multiple locations, and the lease length.

![dbcost-1](/content/blog/understanding-google-cloud-sql-pricing/dbcost-1.webp)

What's more, DB Cost allows you to compare two selected instances in a more intuitive way, as shown in the following figure.

![dbcost-2](/content/blog/understanding-google-cloud-sql-pricing/dbcost-2.webp)

## Tips for Optimizing Google Cloud SQL Pricing Cost

As mentioned above, one of the biggest concerns raised by reddit discussions is how to optimize Google Cloud SQL cost. Here are some common tips:

- **Watch out the disk space**: Google Cloud SQL has a unique feature called [automatic storage increases](https://cloud.google.com/sql/docs/mysql/instance-settings). You should monitor the disk space to spot any abnormal disk increase.

- **Watch out the network egress cost**: The egress cost could be outrageous. Usually you should try to co-locate your app server with the database in the same region to avoid any cost. If that's not possible, you may consider aggregating request or batching data transfer.

- **Take advantage of discounts for reserved instances**: Cloud SQL offers committed use discounts that give you a considerable discount for one-year / three-year commitment. As of 2025, these discounts can reduce costs by up to 25% for one-year commitments and up to 52% for three-year commitments on CPU and memory resources.

- **Delete idle instances**: It is well known that idle or abandoned resources are one of the biggest sources of waste in cloud spending. To reduce your cloud cost, it is absolutely necessary to delete idle instances. Watch our for those ephemeral testing database instances.

- **Resize overallocated instances**: Over-provisioning resources is common for DBAs who are used to provisioning larger instances on-premises. However, it can lead to unnecessary spending when migrating to the cloud platform. The smart way to optimize your cloud cost is to identify your resource requirements and scale instances accordingly.

- **Consider Hyperdisk Balanced storage**: For workloads with varying I/O requirements, Hyperdisk Balanced offers independent scaling of capacity, IOPS, and throughput, potentially providing cost savings compared to fixed-performance storage options.

## Summary

Google Cloud SQL is a great choice for organizations that need a full-managed relational database service. In order to get the best value for your money, it is essential to understand the pricing structure of Google Cloud SQL.

Besides optimizing cloud database cost, teams also want to make better use of the purchased databases. To achieve that, you can check out our open source project Bytebase. Bytebase supports 10+ OLTP, OLAP, NoSQL databases including all three Google Cloud SQL databases, MySQL, PostgreSQL, and SQL Server. It's an all-in-one platform for developers, DBAs, and platform engineers to manage the database development lifecycle efficiently and reliably. Go [self hosting](https://docs.bytebase.com/get-started/deploy-with-docker) with a single command to try it out.

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)
