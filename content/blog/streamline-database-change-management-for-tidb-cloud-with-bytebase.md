---
title: Streamline Database Change Management for TiDB Cloud with Bytebase
author: Cayden
updated_at: 2023/02/15 11:37:27
feature_image: /content/blog/streamline-database-change-management-for-tidb-cloud-with-bytebase/feature-image.webp
tags: Announcement
integrations: TiDB, Terraform
featured: true
description: We are proud to announce our partnership with PingCAP, which will help developers and DBAs to more efficiently and safely manage the lifecycle of application database schemas.
---

We are proud to announce our partnership with [PingCAP](https://www.pingcap.com/?from=en), the company building TiDB, which provides scaling database infrastructure solutions via an open-source platform. This partnership will help developers and DBAs to more efficiently and safely manage the lifecycle of application database schemas.

## Streamline schema management on TiDB Cloud

[TiDB Cloud](https://tidbcloud.com/) is a fully-managed database-as-a-service (DBaaS) offering of TiDB, the most capable, open source, distributed SQL database for building modern applications that are elastic, reliable, versatile, and downright powerful. TiDB’s Hybrid Transactional/Analytical Processing (HTAP) data engine unlocks greater developer productivity with a streamlined architecture while also providing real-time insights into operational data.

However, provisioning an instance of a cloud database is only the beginning of the lifecycle. As your business grows and changes, you need to modify the database schema (CREATE TABLE, CREATE INDEX) or change data (INSERT, UPDATE, DELETE). If this type of work is sidelined, it affects database performance. Worse, if a wrong statement is issued, such as accidentally using the DROP TABLE statement, the business will be interrupted for a long time.

Bytebase is a DevOps tool that gives you a unified web portal to change, query, secure, and govern the database throughout the application development lifecycle.

The following is a streamlined database change management flow for TiDB Cloud with Bytebase:

![dcm-flow-tidb-bytebase](/content/blog/streamline-database-change-management-for-tidb-cloud-with-bytebase/dcm-flow-tidb-bytebase.webp)

1. DBA, platform, or self-service DevOps engineers provision the database instance on TiDB Cloud.
2. They then add the instance into Bytebase. Bytebase will then automatically synchronize all the database schema information from the instance.
   ![add-tidb-instance](/content/blog/streamline-database-change-management-for-tidb-cloud-with-bytebase/add-tidb-instance.webp)

3. Each database is transferred to the specific Bytebase project owned by the application team. At this point, the database joins the software development lifecycle (SDLC) and is ready to be used by application developers. This way, application development teams can collaborate and be involved in database change management.

## A more codified workflow with Terraform

Terraform is an Infrastructure-as-Code tool that defines and configures infra resources in a repeatable and predictable manner. This reduces human error, especially for large-scale infra management. Since both TiDB Cloud and Bytebase are verified Terraform providers, the workflow described above can be more streamlined with code (GitOps).

![terraform-workflow](/content/blog/streamline-database-change-management-for-tidb-cloud-with-bytebase/terraform-workflow.webp)

1. Provision and configure TiDB Cloud instances with TiDB Cloud Terraform Provider. For more details, see [TiDB Cloud Terraform Integration Overview](https://docs.pingcap.com/tidbcloud/terraform-tidbcloud-provider-overview).

For example, the following code creates a TiDB Cloud Serverless resource:

```hcl
terraform {
  required_providers {
    tidbcloud = {
      source  = "tidbcloud/tidbcloud"
      version = "~> 0.1.0"
    }
  }
  required_version = ">= 1.0.0"
}

# Instructions for getting an API Key
# https://docs.pingcap.com/tidbcloud/api/v1beta#section/Authentication/API-Key-Management
# You can also pass the keys through environment variables:
# export TIDBCLOUD_PUBLIC_KEY = "fake_public_key"
# export TIDBCLOUD_PRIVATE_KEY = "fake_private_key"
provider "tidbcloud" {
  public_key  = "fake_public_key"
  private_key = "fake_private_key"
}
```

1. Integrate TiDB Instances into the Bytebase change management process with the Bytebase Terraform provider. For more details, see [Manage Bytebase with Terraform](https://docs.bytebase.com/integrations/terraform/overview#configure-bytebase-terraform-provider).

For example, the following code adds the specified TiDB Cloud instance into Bytebase:

```hcl
# Configure the Bytebase Provider
terraform {
  required_providers {
    bytebase = {
      version = "0.0.7-alpha.3"
      # For local development, please use "terraform.local/bytebase/bytebase" instead
      source = "registry.terraform.io/bytebase/bytebase"
    }
  }
}

provider "bytebase" {
  # You need to replace the account and key with your Bytebase service account.
  service_account = "your service account"
  service_key     = "your service key"
  # The Bytebase service URL. You can use the external URL in production.
  # Check the docs about external URL: https://www.bytebase.com/docs/get-started/install/external-url
  url = "your bytebase console url"
}
```

## Delivering the next-generation database change management experience

With TiDB Cloud, developers can provision a serverless, distributed HTAP database in seconds. With Bytebase, application teams can have a single portal to manage the entire TiDB development lifecycle.

Also, teams can use Terraform providers to adopt database-as-code and codify the entire database provisioning and preparation process.

This is the experience we hope to deliver: an easy-to-use database development and management solution for developers and DBAs to collaborate.

Try it out and let us know your thoughts on our [Discord](https://discord.gg/huyw7gRsyA) channel.
