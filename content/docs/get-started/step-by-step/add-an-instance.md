---
title: Add an Instance
---

`Database Instance` or simply `Instance` models after a single database instance which is usually accessed via a host:port address. A typical database instance could be your on-premises MySQL instance, an AWS RDS instance etc. Each `Database Instance` belongs to an `Environment`.

## Prerequisites

- **Workspace Admin** or **Workspace DBA** role
- Bytebase provides two embedded sample PostgreSQL instances. You may add your own or [add a local MySQL instance](/docs/tutorials/local-mysql-instance).
![bb-instances](/content/docs/get-started/step-by-step/add-an-instance/bb-instances.webp)

## Step 1 - Add instance

Click **Instances** on the top bar and click **Add Instance**.

![add-instance](/content/docs/get-started/step-by-step/add-an-instance/add-instance.webp)

## Step 2 - Config instance

![config-instance](/content/docs/get-started/step-by-step/add-an-instance/config-instance.webp)

1. Select an **Instance Type** on the top.
1. Enter **Instance name**
1. Select **Environment**. Note: _Environment cannot be changed once the instance has been created_.
1. Enter **Host or Socket** and **Port**.

   <HintBlock type="info">

   The screenshot assumes you run Bytebase inside Docker and try to connect to a database instance on the same host. Thus it uses `host.docker.internal`. Check out [Configure Instance Connection](/docs/get-started/instance) for the detailed configuration guide.

   </HintBlock>

1. Enter connection info: **Username** and **Password**.
1. (Optional) Enter SSL connection info:
   1. Choose **None** to not use SSL connection.
   1. Choose **CA Certificate** to use SSL connection with CA certificate only.
   1. Choose **CA Certificate + Client Key + Client Certificate** to use a full SSL connection.
1. (Optional) Assign an [instance licence](/docs/administration/license).

After adding an instance, click **Sync Now**. Switch to **Databases** tab under the instance, you may see all databases on this instance.

![bb-instance-syc](/content/docs/get-started/step-by-step/add-an-instance/bb-instance-sync.webp)

Click **Databases** on the top bar. You may see databases belonging to the sample instances. However, if you added your instances, you may not see them. It’s because they're not belonging to any project yet. For now, you can click **View unassigned databases** to view all.

![bb-databases-view-unassigned](/content/docs/get-started/step-by-step/add-an-instance/bb-databases-view-unassigned.webp)