---
title: Bytebase Cloud
---

This document guides you to use the Bytebase Cloud.

## Prerequisites

![network-topology](/content/docs/get-started/saas/topology.webp)

Bytebase Cloud is hosted on Google Cloud in the United States. To make your Bytebase Cloud instance
connect to your databases in your internal network, you need to whitelist the following Bytebase
Cloud IPs:

- `34.27.188.162`

## Create a workspace

1. Visit [Bytebase Cloud Hub](https://hub.bytebase.com/).
2. Signup or Log in to Bytebase Hub via your email / Google / GitHub / Microsoft account.

![login-hub](/content/docs/get-started/saas/login-hub.webp)

3. You'll be redirected to the hub workspace page, click **Create workspace**. Note that only one workspace is allowed per account.
   ![hub-workspace](/content/docs/get-started/saas/hub-workspace.webp)

4. Wait several minutes for the workspace to be provisioned, and then check your email for the login link, email, and password.

![login-email](/content/docs/get-started/saas/login-email.webp)

## Log in to the workspace

1. Click the **Login to your workspace** link in the email, you'll be redirected to the Bytebase console login page.

![bb-login](/content/docs/get-started/saas/bb-login.webp)

2. Fill in the **Email** and **Password**, and click **Sign in**.
3. A sample PostgreSQL instance is already available.
