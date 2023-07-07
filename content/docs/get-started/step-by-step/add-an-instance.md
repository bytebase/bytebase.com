---
title: Add an Instance
---

**Database Instance** or simply **Instance** models after a single database instance which is usually accessed via a host:port address. A typical database instance could be your on-premises MySQL instance, an AWS RDS instance etc. Each **Database Instance** belongs to an **Environment**.

## Prerequisites

- **Workspace Owner** or **Workspace DBA** role
- A database instance. If you don't have an existing instance on hand, you can [add a local MySQL instance](/docs/tutorials/local-mysql-instance).

## Add an instance

1. Click **Instances** on the top bar.
1. Click **Add Instance**.
1. Select an **Instance Type** on the top.
1. Enter **Instance name**, select **Environment**. Note: _Environment cannot be changed once the instance has been created_.
1. Enter **Host or Socket** and **Port**.
1. Enter connection info: **Username** and **Password**, and click **Test Connection**.
1. (Optional) Enter SSL connection info:
   1. Choose **None** to not use SSL connection.
   1. Choose **CA Certificate** to use SSL connection with CA certificate only.
   1. Choose **CA Certificate + Client Key + Client Certificate** to use a full SSL connection.

![create-an-instance](/content/docs/get-started/step-by-step/add-an-instance/add-an-instance.webp)

<HintBlock type="info">

The screenshot assumes you run Bytebase inside Docker and try to connect to a database instance on the same host. Thus it uses `host.docker.internal`. If Bytebase is not running inside Docker, you should supply the normal `127.0.0.1` to connect the instance on the same host. Check out [Configure Instance Connection](/docs/get-started/instance) for the detailed configuration guide.

</HintBlock>

After adding an instance, click **Databases** on the navigation bar. You can find the table is still empty. It’s because you haven’t created any project yet. In Bytebase, only databases belong to a user project will show up on the Databases page.
