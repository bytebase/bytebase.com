---
title: Introducing Terraform Bytebase Provider
author: Candy
published_at: 2023/02/08 11:37:27
feature_image: /blog/introducing-terraform-bytebase-provider/cover.webp
tags: Announcement
integrations: Terraform
featured: true
description: With Terraform Bytebase Provider, teams can codify Bytebase resource configurations, including environments, database instances, and roles via Terraform.
---

## Why Terraform

[Terraform](https://www.terraform.io/) is the most widely used open-source tool that allows you to manage and provision infrastructure using code. It is known for its ability to work across multiple cloud providers, reusability, versioning, flexibility, and active community. [Terraform providers](https://developer.hashicorp.com/terraform/language/providers) are plugins that enable Terraform to communicate and manage resources on various cloud platforms such as AWS, Google Cloud, Azure, as well as SaaS vendors like Datadog, MongoDB, Elastic, and etc.

Some Bytebase customers use Terraform to manage their infrastructure resources, and they want to use it to manage their Bytebase resources such as environments and database instances. Previously, we offered customers the web-based Bytebase Console and OpenAPI to do that. Today, we are excited to reveal our latest feature, [Terraform Bytebase Provider](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs), which enables you to manage Bytebase resources through Terraform. This is a great opportunity for you to simplify and streamline your database change management.

## Terraform Bytebase Provider

The latest Terraform Bytebase Provider allows you to easily manage the following Bytebase resources.

- **Environments**: They are modeled after different stages in the development pipeline, such as dev, test, and prod.
- **Database instances**: They are modeled after a single database instance and can be accessed using an address such as host:port.
- **Instance roles**: At this time, it is only compatible with PostgreSQL. We are working on supporting for MySQL.

Taking the database instances as an example, you want to add a MySQL instance to the environment `prod`. Initially, the environment `prod` has only one PostgreSQL instance `Postgres Sample Instance` as shown below.
![before-terraform-config](/blog/introducing-terraform-bytebase-provider/before-terraform-config.webp)

The code block below demonstrates how to add the instance `prod_instance` to the environment `prod`:
![access-control-code](/blog/introducing-terraform-bytebase-provider/terraform-code.webp)

Run `terraform init`, `terraform plan` and `terraform apply` in the terminal. The output below shows that the instance `prod_instance` has been successfully added.
![run-terraform](/blog/introducing-terraform-bytebase-provider/run-terraform.webp)

After running the Terraform commands, you can verify the instances list via the Bytebase Console, where you will observe the MySQL instance `prod_instance` listed in the instances list.
![after-terraform](/blog/introducing-terraform-bytebase-provider/after-terraform.webp)

## Conclusion

If you are already using Terraform to manage your infrastructure, the Terraform Bytebase Provider will allow you to codify the database configuration and consolidate your workflow. To get started, you can follow this tutorial [Manage databases in Bytebase with Terraform](https://www.bytebase.com/blog/manage-databases-in-bytebase-with-terraform) and try it out by yourself. Additionally, you can find [more examples on GitHub](https://github.com/bytebase/terraform-provider-bytebase/tree/main/examples).

You are welcome to join [our discord](https://discord.gg/H7Ayn5NP) to learn more about database change management and discuss related topics.
