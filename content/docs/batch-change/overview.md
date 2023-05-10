---
title: Batch Change
---

Bytebase allows you to change a collection of databases in a single workflow. These databases usually have a homogenous structure while belong to different development environments, geographic locations, or SaaS tenants. Bytebase supports two most typical batch change scenarios:

- [Change databases from multiple environments](/docs/batch-change/multi-environment-change)
- [Change databases from multiple tenants](/docs/batch-change/multi-tenant-change)

While multi-environment change also supports multiple databases in one environment, the main difference between these two is that for multi-tenant change, all the databases in the project have identical schemas.