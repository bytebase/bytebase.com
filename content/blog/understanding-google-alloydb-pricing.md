---
title: Understanding Google AlloyDB Pricing
author: Tianzhou
published_at: 2024/03/26 10:00:00
feature_image: /content/blog/understanding-google-alloydb-pricing/banner.webp
tags: Explanation
featured: true
description: Explain the pricing details of Google Cloud AlloyDB and compare it with Google Cloud SQL
---

[AlloyDB](https://cloud.google.com/alloydb) is Google Cloud's fully managed PostgreSQL—compatible database service. It's positioned as
the upgrade version of [Google Cloud SQL for PostgreSQL](https://cloud.google.com/sql/postgresql).

For customers using Google Cloud SQL or coming from other similar products such as AWS Aurora, the
very first task is to understand the AlloyDB pricing.

## tl;dr

AlloyDB pricing is as predictable as Cloud SQL. It's charged by computing (vCPU/memory), storage and networking
respectively. It adds a markup over Cloud SQL for the enhanced performance. Unlike AWS Aurora,
AlloyDB does not provide less-predictable, more-granular request-based pricing (e.g. $xx per million requests).

Networking is always consumption based, which is inherently less predictable (not specific to AlloyDB).

Now let's check the pricing details between AlloyDB and Cloud SQL.

## vCPU and Memory

| USD per month (us-east1) | AlloyDB  | Cloud SQL Enterprise Plus | Cloud SQL Enterprise | GCE N2    |
| ------------------------ | -------- | ------------------------- | -------------------- | --------- |
| Per vCPU                 | $54.5091 | $39.201                   | $30.149              | $23.07603 |
| Per GB memory            | $9.2418  | $6.643                    | $5.11                | $3.09301  |

- Both AlloyDB and Cloud SQL have the same committed use discounts. 1-year commitment with 75% of the normal price,
  3-year commitment with 48% of the normal price.
- AlloyDB has a 39% markup over Cloud SQL Enterprise Plus, Cloud SQL Enterprise Plus has a 30% markup over Cloud SQL Enterprise.
- Cloud SQL Enterprise has 30% markup for vCPU and 65% markup for memory over the underlying GCE N2 instance type.
- HA mode costs 2x for both products.

## Storage

AlloyDB log-based architecture contains transaction log as part of the backup.

| USD per month (us-east1) | AlloyDB                       | Cloud SQL Enterprise Plus        | Cloud SQL Enterprise |
| ------------------------ | ----------------------------- | -------------------------------- | -------------------- |
| Per GB data              | $0.338939                     | $0.17 SSD, $0.09 HDD (2x for HA) | Same as Plus         |
| Per GB backup            | $0.113004                     | $0.08                            | Same as Plus         |
| Per GB transaction log   | $0.113004 (first 7 days free) | N/A                              | N/A                  |

## Networking

Networking price diverges. I personally don't see a reason why GCP couldn't unify this between AlloyDB and Cloud SQL.

### Ingress

Free for both AlloyDB and Cloud SQL.

### Egress (Same Region)

Free for both AlloyDB and Cloud SQL.

### Egress (Cross Region between Google Products)

AlloyDB provides more granular pricing among different regions.

|                     | Northern America | Europe   | Asia     | Indonesia & Oceania | Middle East | Latin America |
| ------------------- | ---------------- | -------- | -------- | ------------------- | ----------- | ------------- |
| Northern America    | $0.02/GB         | $0.05/GB | $0.08/GB | $0.10/GB            | $0.11/GB    | $0.14/GB      |
| Europe              | $0.05/GB         | $0.02/GB | $0.08/GB | $0.10/GB            | $0.11/GB    | $0.14/GB      |
| Asia                | $0.08/GB         | $0.08/GB | $0.08/GB | $0.10/GB            | $0.11/GB    | $0.14/GB      |
| Indonesia & Oceania | $0.10/GB         | $0.10/GB | $0.10/GB | $0.10/GB            | $0.11/GB    | $0.14/GB      |
| Middle East         | $0.11/GB         | $0.11/GB | $0.11/GB | $0.08/GB            | $0.11/GB    | $0.14/GB      |
| Latin America       | $0.14/GB         | $0.14/GB | $0.14/GB | $0.14/GB            | $0.14/GB    | $0.14/GB      |

Cloud SQL:

- Free if it's intra-continental from Cloud SQL to Google Products other than Compute Engine or cross-region Cloud SQL replicas.
- $0.12/GB otherwise.

### Egress (To internet outside of Google)

AlloyDB provides more granular pricing among different regions.

| Outbound traffic source and destination pairs                                                                                                        | Monthly Usage 0-1 TB | 1-10 TB | 10+ TB |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------- | ------ |
| Within North America, Europe, or Asia                                                                                                                | $0.12                | $0.11   | $0.08  |
| Between Asia, Europe and North America                                                                                                               | $0.12                | $0.11   | $0.085 |
| Within Africa; Between Africa and North America, Europe or Asia                                                                                      | $0.13                | $0.12   | $0.085 |
| Within Middle East; Between Middle East and Africa                                                                                                   | $0.13                | $0.12   | $0.09  |
| Within Indonesia or Oceania; Between Indonesia and Oceania; Between Middle East and North America, Europe or Asia                                    | $0.15                | $0.14   | $0.11  |
| Between Middle East or Africa and Indonesia, Oceania or Latin America                                                                                | $0.18                | $0.17   | $0.14  |
| Within Latin America; Between Indonesia, Oceania or Latin America and North America, Europe, or Asia; Between Latin America and Indonesia or Oceania | $0.19                | $0.18   | $0.15  |

Cloud SQL:

- $0.05/GB for [Cloud Interconnect](https://cloud.google.com/interconnect). AlloyDB hasn't supported this.
- $0.19/GB otherwise.

## Summary

Let's check pricing for different tiers in us-east1 according to the [pricing calculator](https://cloud.google.com/products/calculator/):

| Tier       | Spec                                                                | Monthly cost |
| ---------- | ------------------------------------------------------------------- | ------------ |
| Low-end    | Cloud SQL Enterprise, 1c3.75G, 100 GB storage, HA                   | $130         |
| Middle-end | Cloud SQL Enterprise, 2c16G, 100 GB storage, HA                     | $315         |
| Middle-end | Cloud SQL Enterprise Plus, 2c16g, 100 GB storage, HA, Data Cache    | $521         |
| Middle-end | AlloyDB, 2c16g, 100 GB storage, HA                                  | $546         |
| High-end   | Cloud SQL Enterprise Plus, 96c768g, 1000 GB storage, HA, Data Cache | $19,966      |
| High-end   | AlloyDB, 96c768g, 1000 GB storage, HA                               | $24,977      |

AlloyDB doesn't have budgeting option. On the other hand, when the business demands a more powerful
database, AlloyDB pricing is competitive. The markup over Cloud SQL is insignificant compared to
the added benefits.

## References

- [AlloyDB pricing](https://cloud.google.com/alloydb/pricing)
- [Cloud SQL pricing](https://cloud.google.com/sql/pricing)
- [Google Cloud pricing calculator](https://cloud.google.com/products/calculator/)
