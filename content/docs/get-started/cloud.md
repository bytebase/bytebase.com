---
title: Bytebase Cloud
---

<HintBlock type="info">

For teams with security/compliance requirements, please [self host Bytebase](/docs/get-started/self-host) (don't be scared, it's a single binary and deployment is easy).

</HintBlock>

[Bytebase Cloud](https://hub.bytebase.com/) is hosted on Google Cloud GKE us-central region. With Bytebase Cloud, you can provision your Bytebase instance instantly.

## Whitelist the Bytebase Cloud IP

<IncludeBlock url="/docs/get-started/install/whitelist-bytebase-ip"></IncludeBlock>

## Provision a Bytebase instance

1. Visit [Bytebase Cloud Hub](https://hub.bytebase.com/).
2. Signup or Log in to Bytebase Hub via your email / Google / GitHub / Microsoft account.

![login-hub](/content/docs/get-started/saas/login-hub.webp)

3. You'll be redirected to the hub workspace page, click **Create workspace** to provision a Bytebase instance. Note that only one workspace is allowed per account.
   ![hub-workspace](/content/docs/get-started/saas/hub-workspace.webp)

4. Wait several minutes for the workspace to be provisioned, and then **check your email** for the login link, email, and password.

![login-email](/content/docs/get-started/saas/login-email.webp)

## Log in to the workspace

1. Click the **Login to your workspace** link in the email, you'll be redirected to the Bytebase console login page.

![bb-login](/content/docs/get-started/saas/login.webp)

2. Fill in the **Email** and **Password**, and click **Sign in**.
3. A sample PostgreSQL instance is already available.

## Add additional member

Because Bytebase Cloud disables self-signup, so the `Workspace Admin` needs to add new members manually.

![add-member](/content/docs/get-started/saas/add-member.webp)

Then set a temporary password and tell the user offline to let her sign-in.

![set-password](/content/docs/get-started/saas/set-password.webp)
