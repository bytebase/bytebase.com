---
title: Manage Bytebase with Terraform
---

<HintBlock type="info">

The Bytebase Provider itself is free to use. Some advanced resource operations require Pro or Enterprise Plan.

</HintBlock>

Bytebase provides the [Terraform Provider](https://registry.terraform.io/providers/bytebase/bytebase) to let you manage your Bytebase resources via Terraform. Users can use Terraform provider to manage following Bytebase resources:

- Environment
- Instance
- Instance Role
- More to come

## Create service account

Bytebase Terraform Provider needs a service account to interact with the Bytebase OpenAPI.

Visit Bytebase member management page (Click **Settings** on the navigation bar, and then click **Workspace > Members**).

Name your service account, and grant the **Owner** or **DBA** role to it.

![create-service-account](/content/docs/get-started/work-with-terraform/create-service-account.webp)

After creation, you can copy the service key as `service_key` and the email as `service_account` to initialize the Bytbase provider in next step.

<HintBlock type="warning">

You can only copy the key right after creating the service account. The key will disappear if you refresh the page.

</HintBlock>

![service-account](/content/docs/get-started/work-with-terraform/service-account.webp)

## Configure Bytebase Terraform Provider

Check https://registry.terraform.io/providers/bytebase/bytebase/latest/docs for the provider docs.

Check https://github.com/bytebase/terraform-example for the usage examples.
