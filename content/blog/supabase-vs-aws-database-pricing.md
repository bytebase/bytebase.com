---
title: 'Supabase vs AWS: Database Pricing Comparison in 2025'
author: Adela
updated_at: 2025/06/23 18:00:00
feature_image: /content/blog/supabase-vs-aws-database-pricing/cover.webp
tags: Comparison
description: 'We compare Supabase vs AWS (RDS and Aurora) across free, entry-level, and production tiers'
---

When choosing a PostgreSQL database platform, whether for a side project or a production app, you need to look beyond features and assess the **total cost of ownership** — including compute, storage, backups, and bandwidth.

In this guide, we compare **Supabase vs AWS (RDS and Aurora)** across **free, entry-level, and production tiers**. We focus strictly on database-related costs and explain **on-demand vs reserved pricing** where applicable.

## 0. Free Plans: What Do You Get for \$0?

Both platforms offer free tiers, but they differ significantly in **duration**, **compute power**, and **resource isolation**.

| Feature          | Supabase Free Tier           | AWS Free Tier (12 months)                              |
| ---------------- | ---------------------------- | ------------------------------------------------------ |
| Duration         | Forever                      | 12 months from signup                                  |
| Compute          | Shared CPU / 500MB RAM       | 2 vCPU (burstable) / 1GB RAM (t4g.micro, 750 hrs/mo)\* |
| Compute Type     | Shared container environment | Dedicated EC2 instance (Graviton2, burstable)          |
| CPU Architecture | x86                          | ARM (AWS Graviton2)                                    |
| Storage (DB)     | 500MB                        | 20GB gp2\*                                             |
| Backup           | 7-day snapshot               | 20GB snapshot                                          |
| Bandwidth        | 5GB outbound                 | 15GB outbound                                          |
| OS / Isolation   | Serverless (no OS access)    | Full OS-level isolation                                |

- **Supabase Free** is ideal for hobby projects, quick MVPs, or internal tools with light traffic. It requires no setup and stays free forever.
- **AWS Free Tier** gives you significantly more power and isolation but is limited to the first 12 months after signup.

## 1. Entry-Level (Low Cost)

When you outgrow the free tier but don’t need production-grade resources, these plans offer low-cost paths. Supabase simplifies everything with a flat rate. AWS offers more control and deeper savings through reserved pricing.

| Feature          | Supabase Pro Tier                      | RDS t4g.micro (On-Demand)             | RDS t4g.micro (1yr Reserved)        | RDS t4g.micro (3yr Reserved)        |
| ---------------- | -------------------------------------- | ------------------------------------- | ----------------------------------- | ----------------------------------- |
| Monthly Price    | \$25 (includes \$10 compute)\*         | \$11.68                               | \$6.69                              | \$4.76                              |
| Compute          | 1 vCPU (shared) / 1GB RAM              | 2 vCPU (burstable) / 1GB RAM          | 2 vCPU (burstable) / 1GB RAM        | 2 vCPU (burstable) / 1GB RAM        |
| Compute Type     | Shared container environment           | Dedicated ARM instance (Graviton2)    | Dedicated ARM instance (Graviton2)  | Dedicated ARM instance (Graviton2)  |
| OS Access        | No                                     | Yes                                   | Yes                                 | Yes                                 |
| Storage Included | 8GB                                    | 20GB gp2                              | 20GB gp2                            | 20GB gp2                            |
| Extra Storage    | \$0.125/GB                             | \$0.115/GB                            | \$0.115/GB                          | \$0.115/GB                          |
| Backups          | 7-day snapshot                         | Free up to DB size, then \$0.095/GB\* | Free up to DB size, then \$0.095/GB | Free up to DB size, then \$0.095/GB |
| Bandwidth        | 250GB outbound included, then $0.09/GB | \$0.09/GB outbound                    | \$0.09/GB outbound                  | \$0.09/GB outbound                  |

- **Supabase Pro** is great if you want simple, predictable pricing without dealing with EC2, storage classes, or IOPS tuning.
- **RDS On-Demand** offers low-cost dedicated compute with more configurability.
- **Reserved instances** (1yr and 3yr) reduce costs dramatically, but require long-term commitment.

## 2. Mid-Tier Production (100GB Storage + Moderate Usage)

For established applications with real user traffic and non-trivial data volumes, cost differences and platform flexibility become more significant.

| Feature           | Supabase (Large)                    | RDS m5.large (On-Demand) | RDS m5.large (1yr Reserved) | RDS m5.large (3yr Reserved) | Aurora r5.large (On-Demand)      | Aurora r5.large (1yr Reserved) | Aurora r5.large (3yr Reserved) |
| ----------------- | ----------------------------------- | ------------------------ | --------------------------- | --------------------------- | -------------------------------- | ------------------------------ | ------------------------------ |
| Monthly Price     | \$110 (flat)\*                      | \$130                    | \$81                        | \$56                        | \$211                            | \$138                          | \$96                           |
| Compute           | 2 vCPU (shared) / 8GB RAM           | 2 vCPU / 8GB RAM         | 2 vCPU / 8GB RAM            | 2 vCPU / 8GB RAM            | 2 vCPU / 16GB RAM                | 2 vCPU / 16GB RAM              | 2 vCPU / 16GB RAM              |
| Compute Type      | Shared container environment        | Dedicated EC2 (x86)      | Dedicated EC2 (x86)         | Dedicated EC2 (x86)         | Aurora cluster (I/O-Optimized)\* | Aurora cluster (I/O-Optimized) | Aurora cluster (I/O-Optimized) |
| OS Access         | No                                  | Yes                      | Yes                         | Yes                         | Yes                              | Yes                            | Yes                            |
| Storage (100GB)   | Included                            | \$11.50 (gp2)            | \$11.50 (gp2)               | \$11.50 (gp2)               | \$10 (I/O-Optimized)             | \$10 (I/O-Optimized)           | \$10 (I/O-Optimized)           |
| Backup            | Included                            | Free up to DB size\*     | Free up to DB size          | Free up to DB size          | \$0.021/GB\*                     | \$0.021/GB                     | \$0.021/GB                     |
| Bandwidth (500GB) | \$22.50 (250GB included + $0.09/GB) | \$45 (\$0.09/GB)         | \$45 (\$0.09/GB)            | \$45 (\$0.09/GB)            | \$45 (\$0.09/GB)                 | \$45 (\$0.09/GB)               | \$45 (\$0.09/GB)               |
| **Total/Month**   | **\$145**                           | **\$186**                | **\$138**                   | **\$112.50**                | **\$266**                        | **\$193**                      | **\$161**                      |

- **Supabase (Large)** bundles all costs and removes infrastructure complexity — ideal for fast-moving teams.
- **RDS Reserved** (especially 3-year) cuts monthly bills by over 50%.
- **Aurora Reserved** costs more, but adds built-in high availability, multi-AZ replication, and better scaling.

## 3. Heavy Workload (500GB+ Storage, High Throughput)

For mission-critical workloads with large storage, high concurrency, and peak traffic, this tier shows how pricing stacks up across platforms.

| Feature              | Supabase 2XL                        | RDS r5.xlarge (On-Demand) | RDS r5.xlarge (1yr Reserved) | RDS r5.xlarge (3yr Reserved) | Aurora r5.xlarge (On-Demand)     | Aurora r5.xlarge (1yr Reserved) | Aurora r5.xlarge (3yr Reserved) |
| -------------------- | ----------------------------------- | ------------------------- | ---------------------------- | ---------------------------- | -------------------------------- | ------------------------------- | ------------------------------- |
| Monthly Price        | \$410 (flat)\*                      | \$422                     | \$246                        | \$170                        | \$422                            | \$287                           | \$210                           |
| Compute              | 4 vCPU (shared) / 16GB RAM          | 4 vCPU / 32GB RAM         | 4 vCPU / 32GB RAM            | 4 vCPU / 32GB RAM            | 4 vCPU / 32GB RAM                | 4 vCPU / 32GB RAM               | 4 vCPU / 32GB RAM               |
| Compute Type         | Shared container                    | Dedicated EC2 (x86)       | Dedicated EC2 (x86)          | Dedicated EC2 (x86)          | Aurora cluster (I/O-Optimized)\* | Aurora cluster (I/O-Optimized)  | Aurora cluster (I/O-Optimized)  |
| OS Access            | No                                  | Yes                       | Yes                          | Yes                          | Yes                              | Yes                             | Yes                             |
| Storage (500GB)      | Included                            | \$57.50 (gp2)             | \$57.50 (gp2)                | \$57.50 (gp2)                | \$50 (I/O-Optimized)             | \$50 (I/O-Optimized)            | \$50 (I/O-Optimized)            |
| IOPS / Throughput    | Included (abstracted)\*             | \$100+ (io1 estimated)\*  | \$100+ (io1 estimated)       | \$100+ (io1 estimated)       | Included                         | Included                        | Included                        |
| Backup (500GB extra) | Included                            | \$47.50\*                 | \$47.50                      | \$47.50                      | \$10.50                          | \$10.50                         | \$10.50                         |
| Bandwidth (1TB)      | \$67.50 (250GB included + $0.09/GB) | \$90 (\$0.09/GB)          | \$90 (\$0.09/GB)             | \$90 (\$0.09/GB)             | \$90 (\$0.09/GB)                 | \$90 (\$0.09/GB)                | \$90 (\$0.09/GB)                |
| **Total/Month**      | **\$477.5**                         | **\$717**                 | **\$541**                    | **\$465**                    | **\$572**                        | **\$437**                       | **\$361**                       |

- **Supabase 2XL** is an all-inclusive bundle that scales without requiring DBAs or infra tuning.
- **RDS Reserved** (3yr) delivers maximum cost-efficiency if your workload is stable.
- **Aurora Reserved** is ideal for high-volume, multi-region, or high-availability requirements.

## Cost Reference for Storage & Compute

| Metric        | Supabase                | AWS RDS (On-Demand) | AWS RDS (Reserved)\* | Aurora (I/O-Optimized)\* |
| ------------- | ----------------------- | ------------------- | -------------------- | ------------------------ |
| **Storage**   | \$0.125/GB              | \$0.115/GB (gp2)\*  | \$0.115/GB (gp2)     | \$0.10–\$0.225/GB\*      |
| **Backup**    | Included                | \$0.095/GB\*        | \$0.095/GB           | \$0.021/GB (snapshot)\*  |
| **Bandwidth** | 250GB outbound included | \$0.09/GB outbound  | \$0.09/GB outbound   | \$0.09/GB outbound       |
| **Compute**   | \$10–\$3,730 (flat)     | \$11–\$1,688        | \$6–\$1,080          | \$67–\$3,376             |

- **Reserved pricing** can reduce compute cost by 30–60%, especially for year-long or 3-year commitments.
- Aurora charges **by I/O operations**, unless you're on their newer I/O-optimized pricing model.

## 📝 Explanatory Notes

- **t4g.micro (burstable)**: AWS uses burstable instances like `t4g.micro` for its Free and entry-level RDS tiers. These provide 2 ARM-based vCPUs with a CPU credit system — ideal for low-to-moderate workloads with occasional spikes.

- **gp2 Storage (AWS)**: gp2 volumes offer 3 IOPS per GB, with a **minimum baseline of 100 IOPS** at 20GB. They also include **burst capacity**, giving better performance than basic shared storage.

- **Supabase Flat Pricing**: Supabase’s pricing includes compute, storage, backups, and bandwidth in a **single monthly rate** — simplifying cost tracking and reducing surprise bills.

- **Backup Costs (AWS)**: RDS provides **free backup storage up to the size of your DB**. Additional snapshot storage is charged at:

  - \$0.095/GB for RDS
  - \$0.021/GB for Aurora

- **Aurora I/O-Optimized**: This newer Aurora pricing tier eliminates per-I/O charges and instead bills a flat rate per GB stored. Ideal for write-heavy or high-throughput workloads with unpredictable I/O.

- **IOPS Costs (RDS)**: For high-performance needs, RDS users may upgrade to `io1` or `gp3` storage with provisioned IOPS — typically adding \$100+ per month for workloads requiring consistent low-latency throughput.

- **Reserved Pricing (AWS)**: RDS and Aurora support **1-year and 3-year reservations**, reducing monthly compute costs by 30–60%. These are billed upfront or monthly and require workload stability.

## Conclusion

| Use Case                           | Best Choice     | Price Range (Monthly) | Why                                                                 |
| ---------------------------------- | --------------- | --------------------- | ------------------------------------------------------------------- |
| Free hobby project                 | Supabase Free   | \$0                   | No time limit, zero config                                          |
| Low-cost dev/test DB               | Supabase Pro    | \$25                  | Simple flat rate, includes compute, storage, and bandwidth          |
| AWS trial or AWS-focused team      | AWS Free Tier   | \$0 (12 mo)           | Best value compute & storage for teams already using AWS            |
| Cost-sensitive production workload | RDS Reserved    | \$4.76–\$96           | Long-term commitment cuts RDS compute cost by up to 60%             |
| Simple mid-sized app               | Supabase or RDS | \$110–\$186           | Supabase for ease, RDS for control & cost tuning                    |
| High write/read throughput         | Aurora Reserved | \$96–\$437            | Built-in performance, replication, and I/O-optimized pricing        |
| Multi-region / enterprise scale    | Aurora or RDS   | \$161–\$717           | Supports replication, multi-AZ, and enterprise-grade configurations |

- **Supabase** offers **simple pricing and easy setup**, ideal for fast-moving projects.
- **AWS RDS Reserved** is best for **long-term, cost-optimized workloads** with more control.
- **Aurora** suits **high-performance, high-availability needs**, but at a higher cost.

Choose based on your need for **simplicity vs control**, and how stable your usage will be. Supabase works well for early-stage apps; AWS shines for scaled, mature systems.

Need more than a database? Our next post will compare [Supabase vs AWS pricing across auth, messaging, and more](/blog/supabase-vs-aws-pricing/).
