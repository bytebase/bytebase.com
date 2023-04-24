---
title: Tenant Database
---

Tenant databases are the homogeneous databases with identical schema in a tenant project. Each individual database corresponds to the combination of a tenant, location, and deployment environment.

Bytebase offers streamlined experience for tenant databases through [Tenant Database Change Management](/docs/batch-change/multi-tenant-change).

Below is an example showing how a schema change rollout to all tenant databases from **Dev** environment all the way to the **Prod** look like in Bytebase.

![tenant-matrix](/docs/tenant-matrix.png)
