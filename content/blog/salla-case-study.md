---
title: How Salla Uses Bytebase to Build the Shopify for the Arab World
author: Cayden
updated_at: 2023/10/16 21:21:21
feature_image: /content/blog/salla-case-study/banner.webp
tags: Case Study
featured: true
description: How the Saudi-based e-commerce platform consolidates database change and access management with Bytebase.
keypage: true
---

> How the Saudi-based e-commerce platform consolidates database change and access management with Bytebase.

## About Salla

[Salla](https://salla.com/) is a Saudi-based e-commerce platform established in 2016. Users can set up their own e-commerce store in Arabic and sell their products and services to customers. Additionally, Salla provides various reports and tools to help users (store owners) with automated invoicing, integrations, customer databases, and other localized services.

![_](/content/blog/salla-case-study/salla-logo.webp)

To date, more than 47,000 stores have joined Salla, with a total sales volume reaching $4.3 billion USD and maintaining a growth rate of nearly 100% over the past three years.

## Integrated Database Access Control and Release Process

Our first encounter with Salla CTO Salah occurred in early 2023. Given the rapid growth of Salla's e-commerce business, there was an urgent need for proper database control.

However, no other product on the market had connected all the following aspects to build a complete database development workflow:

- Security and access control for databases
- Integrated SQL review capabilities
- A GUI and collaboration workspace

When they discovered and tried Bytebase, they realized it was tailor-made for their needs. Within days of the initial meeting and several email exchanges, Salla became Bytebase's first paying customer in the Middle East region.

## Use Case

Salla has developers and operations staff who access databases regularly. As an e-commerce platform hosting large amounts of user data, it is subject to strict regulatory requirements. Therefore, Salla needed a tool to control all human-to-database access paths including:

- Direct querying of production data by developer and operations teams
- Exporting production data by developer and operations teams
- Direct modification of production data by developer and operations teams
- Modification of production database schema by developer teams

Salla has built **a comprehensive database access control system and review process based on Bytebase**.

### Querying and exporting data from the production database

![_](/content/blog/salla-case-study/query-export.webp)

Salla now has fine-grained control over each table or SQL script and can mask sensitive fields as needed. Most importantly, these databases can be managed uniformly in Bytebase, without the need to set up different account systems for each one. Permissions to query or export data can be requested or revoked as needed, or granted by administrators, greatly simplifying database access management.

### Applying DML & DDL on production databases

![_](/content/blog/salla-case-study/workflow.webp)

Using Bytebase, Salla also constructed a standard release workflow:

1. Define [risk levels](https://docs.bytebase.com/administration/risk-center/) for database tasks (e.g., DDL in the production environment is considered high risk; DML in the production environment affecting < 1,000 rows is considered moderate risk; DML in the testing environment is considered low risk).
2. All change requests are submitted as issues, with different approval processes automatically generated based on the issues' risk levels.
3. Project owners then review the issues with the assistance of pre-configured [SQL review policies](https://docs.bytebase.com/sql-review/review-policy).
4. If approved, the workspace owner publishes them to the database.

With the entire change process integrated into a single platform, their releases are streamlined. Previously, they needed to submit review requests through project management tools, download SQL scripts for manual review by DBAs, and copy and paste them into the database client for release. This revamped process also greatly reduces the risk of human error by providing a centralized platform to store SQL scripts. Every change is recorded in an audit trail.

## Future Plans

Salla plans to integrate GitOps and the Terraform Bytebase Provider into their workflow.

- Through the [GitOps workflow](https://docs.bytebase.com/gitops/overview/), developers can directly submit change requests through their code repository, further integrating database management with the development workflow.
- With the [Terraform Bytebase Provider](https://docs.bytebase.com/tutorials/manage-databases-with-terraform/), all Bytebase configurations can be codified, making it easier for DBAs to configure batch access permissions.
