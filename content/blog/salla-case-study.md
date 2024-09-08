---
title: How Salla Uses Bytebase to Build the Shopify for Arab
author: Changyu
updated_at: 2023/10/16 21:21:21
feature_image: /content/blog/salla-case-study/banner.webp
tags: Case Study
featured: true
description: How the Saudi-based E-commerce platform consolidates database change and access management with Bytebase.
---

> How the Saudi-based E-commerce platform consolidates database change and access management with Bytebase.

## About Salla

[Salla](https://salla.com/) is a Saudi-based E-commerce platform established in 2016. Users can set up their own E-commerce store in Arabic and sell their products and services to customers. In addition, Salla provides different types of reports and tools to help users (store owners) with automatic invoices, integration, customer databases, and more localized services.

![_](/content/blog/salla-case-study/salla-logo.webp)

Up until now, more than 47,000 stores have joined Salla, with a total sales volume reaching 4.3 Billion US Dollars and maintaining a growth rate of almost 100% in the past three years.

## Integrated Database Access Control and Release Process

Our first encounter with Salla CTO Salah happened in early 2023. With the rapid development nature of Salla’s E-commerce business, there was an urgent need for proper control over their databases.

However, no other product available on the market has connected all the following aspects to build a complete database development workflow:

- Security and access control over databases
- Integrated SQL Review capabilities
- A GUI and collaboration workspace

It wasn't until they discovered and tried Bytebase that they realized it was a tool tailor-made for them. A few days after the initial meeting and several email exchanges, Salla became Bytebase's first paying customer in the Middle East region.

## Use Case

Salla has developers and operations staff who access databases on a regular basis. As an E-commerce platform hosting a large amount of user data, it is also subject to strict requirements from regulatory authorities. Therefore, Salla needs a tool to control all human-to-database access paths including:

- Directly querying production data by any developer and operations teams
- Exporting production data by any developer and operations teams
- Directly modifying production data by any developer and operations teams
- Modifying production database schema by any developer teams

Salla has built **a comprehensive Database Access Control system and Review process based on Bytebase**.

### Querying and exporting data from the production database

![_](/content/blog/salla-case-study/query-export.webp)

Salla now has fine-grained control over each table or SQL script and can mask sensitive fields as needed. Above all, these databases can be managed uniformly in Bytebase, without the need to set up different account systems for each one. Permissions to query or export data can be requested or revoked as needed, or they can be granted by administrators, greatly simplifying database access management.

### Applying DML & DDL on production databases

![_](/content/blog/salla-case-study/workflow.webp)

Using Bytebase, Salla also constructed a standard release workflow:

1. Define the [risk levels](/docs/administration/risk-center/) for database tasks (e.g. DDL in the production environment is considered high risk; DML in the production environment affecting < 1000 rows is considered moderate risk; DML in the testing environment is considered low risk).
2. All change requests are submitted as issues, with different approval processes automatically generated based on issues’ risk levels.
3. Project owners then review the issues with the assistance of pre-configured [SQL review policies](/docs/sql-review/review-policy).
4. If approved, the workplace owner will publish them to the database.

With the entire change process integrated into a single platform, their release is streamlined. Previously, they needed to submit review requests through PM tools, download SQL scripts for manual review by DBAs, and copy and paste them into the database client for release. This revamped process also greatly reduces the (inevitable) risk of human error by having a centralized platform to store SQL scripts. And every change is recorded in audit trail.

## Future Plans

Salla has plans to integrate GitOps and Terraform Bytebase Provider into their workflow.

- Through the [GitOps workflow](/docs/vcs-integration/overview/), developers can directly submit change requests through their code repository, further integrating database management with the development workflow.
- With [Terraform Bytebase Provider](/docs/tutorials/manage-databases-in-bytebase-with-terraform/), all Bytebase configurations can be codified, making it even easier for DBAs to configure batch access permissions.
