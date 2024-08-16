---
title: Add an Instance
---

`Database Instance` or simply `Instance` models after a single database server which is usually accessed via a host:port address. A typical database instance could be your on-premises MySQL instance, an AWS RDS instance etc. Each `Database Instance` belongs to an `Environment`.


## Prerequisites

- **Workspace Admin** or **Workspace DBA** role

- Bytebase provides two embedded sample PostgreSQL instances. You may add your own or [add a local MySQL instance](/docs/tutorials/local-mysql-instance).

  ![bb-instances](/content/docs/get-started/step-by-step/add-an-instance/bb-instances.webp)


## Add instance

![bb-instances-2](/content/docs/get-started/step-by-step/add-an-instance/bb-instances-2.webp)

For **Host or socket**, the screenshot assumes you run Bytebase inside Docker and try to connect to a database instance on the same host, thus it uses `host.docker.internal`. Check out [Configure Instance Connection](/docs/get-started/instance) for the detailed configuration guide.

