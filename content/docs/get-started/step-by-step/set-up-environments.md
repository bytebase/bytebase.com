---
title: Set up Environments
---

`Environment` models after various environments in the development pipeline such as test, staging, prod. Most of the time, there is a 1:1 mapping between `Environment` and the real environment.


## Prerequisites

- **Workspace Admin** or **Workspace DBA** role

## View environments
Click **Environments** on the top bar, you can see two predefined environments - `Test` and `Prod`.

    ![environment](/content/docs/get-started/step-by-step/set-up-environments/bb-environment.webp)

## Reorder environments

Click **Reorder** to adjust the environments' order.

## Edit an environment

1. Choose an existing environment, e.g. `Test`.
2. Edit name, rollout policy, database backup schedule policy and click **Update**.
3. Configure a **SQL review policy**.

   1. Click **SQL Review** > **Configure policy**.
   2. On **Step 1**, enter **Display name**, choose **Environment** and **Template**, and click **Next**.
   3. On **Step 2**, choose a rule, select its **Error Level** and click **Next**.
   4. On **Step 3**, make sure the preview is OK, and click **Confirm and add**.

## Add an environment

Click **Create Environment**, enter **Environment** (name), and click **Create**, and you will find the new environment on the right.
You may click Archieve 