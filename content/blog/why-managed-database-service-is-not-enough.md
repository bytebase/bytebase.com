---
title: Why Managed Database Service is not Enough
author: Tianzhou
published_at: 2024/06/26 9:00:00
feature_image: /content/blog/why-managed-database-service-is-not-enough/banner.webp
tags: Industry
featured: true
description: Managed database service only addresses part of the puzzles
---

Compared to the self-host option, teams pay 30% ~ 100% markup for the managed database service, hoping it can take care of the operational burdens.
While managed database service does reduce the operational cost, it's not enough. Let's illustrate this by a simple example.

## How to revert a single-row update

All mainstream managed database services provide disaster recovery capability. Take [AWS RDS](https://aws.amazon.com/rds/features/backup/)
as an example, it offers both normal restore and PITR (Point-in-time Restores).

![_](/content/blog/why-managed-database-service-is-not-enough/rds-br.webp)

However, neither is suitable to revert a single-row update. Because it would revert not only that change, but also other
valid changes.

## Managed database service alone is not enough

Managed database service takes care of the **infrastructure challenges**:

- Provisioning
- Scaling
- Disaster recovery
- Monitoring

On the other hand, developers still face a lot of **workflow challenges**:

- How to propagate the change from dev, test to staging, prod.

- How to roll back changes.

- How to spot and tune the slow query.

- How to copy the production data to the testing environment for development.

Additionally, security engineers will emphasize the necessity of sanitizing data in advance. They also require assurance that all data access is properly controlled and meticulously recorded to maintain security and compliance.

## How to address workflow challenges

There are 3 angels to tackle the workflow challenges.

1. **Managed database service**

   - For MySQL, there is [PlanetScale](https://planetscale.com/) offering a full suite of built-in capabilities.

   ![_](/content/blog/why-managed-database-service-is-not-enough/planetscale-tech.webp)

   - For Postgres, [Neon](https://neon.tech/) provides instant branching.

   ![_](/content/blog/why-managed-database-service-is-not-enough/neon-branching.webp)

1. **Application platform**

   [Supabase](https://supabase.com/) also debuted a branching feature.

1. **Tooling**

   If teams want to avoid vendor lock-in, they would adopt database tools working with a variety of vanilla database systems.

   - To coordinate database changes, [Jira is a typical option with apparent drawbacks](/blog/use-jira-for-database-change).

   - To sanitize production data and synthesize data for development. There are [Snaplet](https://www.snaplet.dev/) and [Neosync](https://www.neosync.dev/).

   <HintBlock type="info">

   Bytebase is also a database tool providing change management, data access control, dynamic data masking for all mainstream databases.

   </HintBlock>

## Summary

The database development lifecycle involves multiple key roles, including developers, DBAs, security engineers, and platform engineers. Traditional managed database services primarily address infrastructure needs, leaving many workflow challenges unresolved. These challenges must be addressed either through enhanced capabilities of the managed database services, application platforms, or third-party tools to ensure a comprehensive solution.
