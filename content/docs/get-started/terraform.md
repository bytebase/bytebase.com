---
title: Manage Bytebase with Terraform
---

<TutorialBlock url="/docs/tutorials/manage-databases-in-bytebase-with-terraform" title="Manage Databases in Bytebase with Terraform" />

<HintBlock type="info">

The Bytebase Provider itself is free to use. Some advanced resource operations require Pro or Enterprise Plan.

</HintBlock>

Bytebase provides the [Terraform Provider](https://registry.terraform.io/providers/bytebase/bytebase) to let you manage your Bytebase resources via Terraform.

1. Create [service account](/docs/api/authentication/#service-account). After creation, you can copy the service key as `service_key` and the email as `service_account` to initialize the Bytebase provider in next step.

   ![service-account](/content/docs/get-started/work-with-terraform/service-account.webp)

1. Configure Bytebase Terraform Provider
   - [Provider docs](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs)
   - [Usage examples](https://github.com/bytebase/terraform-provider-bytebase/tree/main/examples)
