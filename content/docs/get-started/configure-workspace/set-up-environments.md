---
title: Set up Environments
---

**Environment** models after various environments in the development pipeline such as test, staging, prod. Most of the time, there is a 1:1 mapping between **Environment** and the real environment.

This document describes how to add, edit and reorder environments.

## Prerequisites

- **Workspace Owner** or **Workspace DBA** role

## Add an environment

1. Click **Environments** on the navigation bar, you can see two predefined environments - **Test** and **Prod**.
2. Click **Create Environment**, enter **Environment** (name), choose **Approval Policy** and **Database backup schedule policy** according to your needs.
3. Click **Create**, and you will find the new enviromment on the right.

## Reorder environments

1. Click **Reorder** to adjust environments' order.

## Edit an environment

1. Click **Environments** on the navigation bar, you can see two predefined environments - **Test** and **Prod**.
1. Choose an existing environment, e.g. Test.
1. Edit name, approval policy, database backup schedule policy, and schema review policy.

### Configure a schema review policy

1. Click **Environments** on the navigation bar, you can see two predefined environments - **Test** and **Prod**.
1. Choose an existing enviroment, e.g. Test.
1. Click **Schema Review** > **Configure policy**.
1. On **Step 1**, enter **Display name**, choose **Environment** and **Template**, and click **Next**.
1. On **Step 2**, choose a rule, select its **Error Level** and click **Next**.
1. On **Step 3**, make sure the preview is OK, and click **Confirm and add**.
