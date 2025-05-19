---
title: Understanding DynamoDB Pricing (2025)
author: Adela
updated_at: 2025/05/09 18:00:00
feature_image: /content/blog/understanding-dynamodb-pricing/cover.webp
tags: Explanation
description: Explain the pricing details of DynamoDB
---

| Update History | Comment                                             |
| -------------- | --------------------------------------------------- |
| 2025/05/09    | Initial version.                                    |

Amazon DynamoDB is a serverless NoSQL database built for high performance and scalability. It handles web, mobile, gaming, and IoT apps without requiring server management - AWS takes care of everything.

## Pricing Overview

DynamoDB charges for **reading, writing, and storing data** in your tables, along with any optional features you choose to enable. It has two capacity modes with their respective billing options for processing reads and writes on your tables: **On-Demand Capacity Mode (auto-scaling)** and **Provisioned Capacity Mode (fixed capacity)**.

## Core Pricing Components

### 1. Data Storage

You’re billed monthly per GB of data stored. DynamoDB offers two table classes:

- **Standard:** Optimized for frequent access and low-latency workloads.

- **Standard-IA:** Lower storage cost for infrequently accessed data but higher per-operation cost.

Charges include data size plus indexing overhead. Monitoring tools like AWS Cost Explorer or CloudWatch help track usage and optimize storage costs.

### 2. Read and Write Throughput

Throughput is billed differently based on capacity mode:

- **Provisioned Mode:** You specify WCUs (1 KB writes/sec) and RCUs (4 KB strongly consistent reads/sec, or 2 eventually consistent). You pay hourly for the allocated capacity regardless of usage.
- **On-Demand Mode:** You pay per request—WRUs for writes and RRUs for reads. One WRU = 1 KB write; one RRU = 4 KB strongly consistent read (or two eventually consistent reads).

On-Demand is better for unpredictable workloads; Provisioned is cheaper for steady traffic. Eventually consistent reads cost half as much as strongly consistent ones.

### 3. Data Transfer

- **Inbound traffic** (from the internet or same-region AWS services) is free.
- **Outbound traffic** to the internet is billed per GB with tiered pricing.
- **Intra-region transfers** are free within the same AZ using private IPs but incur costs across AZs.
- **Cross-region transfers** (e.g., Global Tables replication) are charged at higher rates.

Monitoring cross-region and internet-bound traffic is essential for avoiding unexpected costs.

## On-Demand vs. Provisioned Capacity

### On-Demand Mode

- **Best for:** Unpredictable or spiky workloads.
- **No capacity planning:** DynamoDB auto-scales to meet demand.
- **Pricing:**
  - Pay per request.
  - 1 WRU = write up to 1 KB.
  - 1 RRU = read up to 4 KB (1 strongly or 2 eventually consistent reads).
- **Pros:** Simple, flexible, no idle charges.
- **Cons:** Higher cost for consistently high traffic.

### Provisioned Mode

- **Best for:** Predictable, steady workloads.
- **You predefine:** Read (RCU) and write (WCU) capacity.
- **Pricing:**
  - Billed per hour, whether used or not.
  - 1 WCU = 1 write/sec for 1 KB.
  - 1 RCU = 1 read/sec for 4 KB.
- **Features:**
  - Auto Scaling adjusts capacity within limits.
  - Reserved Capacity offers up to 75% savings.

### Choosing the Right Mode

| Scenario                     | Use                    |
| ---------------------------- | ---------------------- |
| Spiky or unknown traffic     | On-Demand              |
| Steady, predictable workload | Provisioned            |
| Want simplicity, no planning | On-Demand              |
| Can commit for savings       | Provisioned + Reserved |

You can switch modes **daily per table**. Monitor with **CloudWatch** and **Cost Explorer** to optimize usage and cost.

## Core Pricing in US East (N. Virginia)

Take us-east-1 as an example:

| **Pricing Component**         | **On-Demand Mode**                  | **Provisioned Mode**   |
| ----------------------------- | ----------------------------------- | ---------------------- |
| **Write Request Unit (WRU)**     | \$0.25 per million                  | \$0.00065 per WCU-hour |
| **Read Request Unit (RRU)**       | \$0.25 per million                  | \$0.00013 per RCU-hour |
| **Data Storage**                  | \$0.25 per GB-month                 | \$0.25 per GB-month    |
| **Backup (On-Demand)**            | \$0.10 per GB-month                 | \$0.10 per GB-month    |
| **Point-in-Time Recovery (PITR)** | \$0.20 per GB-month                 | \$0.20 per GB-month    |
| **Data Transfer Out (Internet)**  | First 1 GB free, then \$0.09 per GB | First 1 GB free, then \$0.09 per GB                  |

✅ Free Tier: 25 GB storage + 25 WCUs + 25 RCUs per month.

## Example Scenarios

### Scenario 1: On-Demand Mode

**App Type:** Startup with variable traffic

**Monthly Usage:**

- 3.55 million writes (1 KB each)
- 3.55 million reads (1 KB each)
- 27 GB data storage

**Cost Calculation:**

- Writes: 3.55M × $0.25/million = **$0.89**
- Reads: 3.55M × $0.25/million = **$0.89**
- Storage: (27 GB - 25 GB Free Tier) × $0.25 = **$0.50**

**Total Cost: $2.28/month**

### Scenario 2: Provisioned Mode

**App Type:** Established SaaS with steady load

**Provisioned Capacity:**

- 100 WCUs
- 200 RCUs
- 50 GB storage

**Cost Calculation:**

- Writes: 100 × $0.00065 × 730 hrs = **$47.45**
- Reads: 200 × $0.00013 × 730 hrs = **$18.98**
- Storage: 50 GB × $0.25 = **$12.50**

**Total Cost: $78.93/month**

## DynamoDB Cost Optimization Tips

### 1. Pick the Right Capacity Mode
- **On-Demand**: Great for unpredictable workloads.
- **Provisioned**: Lower cost for steady traffic; use **Auto Scaling**.
- Switch modes once per day per table.

### 2. Use Reserved Capacity
- Save up to **75%** in provisioned mode with a 1–3 year commitment.

### 3. Optimize Storage
- Use **Standard-IA** for infrequent access.
- Archive or delete unused data to **S3/Glacier**.
- Design efficient schemas to reduce size and access cost.

### 4. Reduce Read/Write Costs
- Use **eventually consistent reads** (half the cost).
- Batch operations with `BatchGetItem` and `BatchWriteItem`.
- Avoid scans; use **queries** and **GSIs**.
- Keep items small; store large data in **S3**.

### 5. Leverage DAX
- Cache read-heavy data with **DAX** to reduce RCUs.
- Ensure DAX savings exceed node costs.

### 6. Monitor Usage
- Track with **CloudWatch** and **Cost Explorer**.
- Set budgets and alerts.
- Use **Trusted Advisor** for optimization suggestions.

### 7. Manage Backups
- Delete unused backups.
- Monitor **PITR** retention costs.
- Stay within free backup limits.

## Conclusion

DynamoDB offers scalable, serverless performance with flexible pricing. To keep costs low, choose the right capacity mode, optimize usage, and monitor with AWS tools like CloudWatch and Cost Explorer. Smart planning ensures both performance and efficiency.