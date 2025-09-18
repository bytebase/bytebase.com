---
title: How Longbridge Whale Uses Bytebase to Manage Database per Tenant Architecture
author: Cayden
updated_at: 2023/06/09 21:21:21
feature_image: /content/blog/longbridge-case-study/banner.webp
tags: Case Study
featured: true
description: Learn how financial service SaaS provider cracked the problem of schema changes in tenant mode with Bytebase.
keypage: true
---

[Longbridge Whale](https://longbridge.cloud/en/) is a one-stop financial SaaS solution launched by Singaporean fintech group Longbridge. The solution covers data centers, networks, servers, and securities trading services for major securities firms at all stages. The core team consists of senior financial managers from Singapore and Hong Kong, as well as technical experts from international tech giants such as Alibaba and ByteDance.

## Database Management for SaaS Applications

![_](/content/blog/longbridge-case-study/multi-tenancy-vs-multi-single-tenancy.webp)

Managing databases for SaaS applications can be configured according to different needs and business models, but can generally be classified into two modes:

### Multi-Tenancy

In this approach, all customer data is stored in a single database. The advantage is that it is simple and cost-effective, but the disadvantage is that it's hard to scale and cannot effectively isolate data between different tenants.

### Multi Single-Tenancy

In this approach, different customer data is stored in independent databases or instances, even distributed across different geographic regions. It is easy to scale and can handle greater load. More importantly, it meets various compliance requirements. The downside is that this can significantly increase the complexity of database management.

## Challenges with Multi Single-Tenancy

![_](/content/blog/longbridge-case-study/new-tenant.webp)

For financial applications, data isolation between tenants is crucial. Therefore, the multi single-tenancy approach is common for SaaS applications. If each tenant corresponds to an independent database, as the number of tenants increases, a single application may easily manage hundreds or even thousands of databases. All these databases require strong schema consistency, but during actual change management processes, the following challenges are inevitable:

### Batch changes

When hundreds or more databases need to be changed simultaneously, it is almost impossible to do manually. The most common method is to write scripts for batch execution. However, scripts require manual maintenance—any careless mistake can cause serious consequences. When personnel changes occur and work needs to be handed over, all those customized scripts are difficult to share, and sometimes new employees need to rewrite their own scripts.

### Schema differences

Theoretically, tenant databases should be identical, but in reality, due to manual management of change scripts or unexpected temporary emergencies, there will always be schema differences across some databases. This can lead to unified changes failing to deploy to only some of the tenant databases. This creates a time-consuming troubleshooting process.

### Adding new tenants

New tenants are usually created by the business team. For most SaaS companies, the database management team is not immediately notified, resulting in a time gap spanning from hours to days before incorporating the new tenant database. This time gap is sufficient to generate significant schema differences.

## The Solution: Bytebase

As a financial SaaS provider, Longbridge Whale manages their databases in [batch mode](https://docs.bytebase.com/change-database/batch-change). With the growth of their business, the number of databases increased rapidly and schema management issues became prominent.

Similar to many other tech startups, Longbridge Whale had established a basic database review and release platform based on open-source solutions. However, such platforms generally lack schema change management capabilities and cannot cope with the current challenges faced by Longbridge Whale. To fundamentally solve these problems, Longbridge Whale turned to Bytebase.

## Batch Resolve Schema Differences in Existing Databases

![_](/content/blog/longbridge-case-study/sync-schema.webp)

Their business had been running for a while, and there were already some schema differences in existing tenant databases. It is impossible to manually locate all the differences. Most schema comparison tools can only compare between two databases or several tables, which doesn't meet large-scale comparison needs. Bytebase's [Sync Schema](https://docs.bytebase.com/change-database/synchronize-schema/) can compare all databases against a specified baseline database. Issues are then generated to quickly eliminate schema differences in existing databases.

## Prevent Future Schema Differences

Now that legacy issues are resolved, the goal is to ensure that no new differences are generated in subsequent changes, or when differences do occur, they can be quickly detected and resolved. From the perspectives of prevention, detection, and recovery, Bytebase has corresponding capabilities.

### Prevention: Better Change Management

![_](/content/blog/longbridge-case-study/publish-changes.webp)

Bytebase organizes databases by [**Project**](https://docs.bytebase.com/concepts/data-model/#project). All homogeneous tenant databases are grouped in the same project and changes are completed by the application development teams.

In principle, each change is applied to all databases under the project in tenant mode. Once the change is successfully executed against any target database, no further modifications are allowed for scripts within this change. Of course, real business scenarios are far more complex and may vary. Some changes only need to be released to specific databases, such as temporary business data fixes on the backend or initialization of configuration data. Therefore, it is still possible to select and publish changes to specific databases under tenant mode.

### Detection: Drift Detection

![_](/content/blog/longbridge-case-study/drift-detection.webp)

In production environments, it is still difficult to avoid drifts. For example, access permissions are not fully revoked, and one of the app developers makes changes through other clients; or in emergency situations, certain scripts are released directly to the database. Once a drift occurs, it is often difficult to discover promptly. When this drift triggers an error at some point in the future, it will not be easy to trace back and find the cause, making it much harder to fix. Bytebase has automatic [Drift Detection](https://docs.bytebase.com/change-database/drift-detection/) that scans the database schema regularly to detect unaudited changes and issue alerts promptly.

### Recovery: Reconcile the Schema Diff

Once a drift occurs, Sync Schema can quickly compare the differences and generate issues to reconcile the drift.

## Automated New Tenant Provisioning

Another situation prone to schema drift is the provisioning of new tenant databases. Previously for Longbridge Whale, when the business team creates a new tenant (through the frontend), their platform automatically creates a tenant database, syncs it to match a certain version of the schema, and initializes data. Many SaaS companies have adopted similar solutions.

The problem that follows is that if the tech team uses a separate tool for change management, the new tenant database will not be automatically included unless the team is notified or they scan all databases regularly. This gap is sufficient to produce new schema differences. Thus, it is necessary to integrate this entire provisioning process with the management process to achieve full automation. Bytebase offers two solutions:

**API Solution**

![_](/content/blog/longbridge-case-study/api-solution.webp)

The application calls the Bytebase API to create a new database and automatically include it in change management. Bytebase ensures the schema is synced, while the application completes subsequent data initialization.

**Terraform Solution**

![_](/content/blog/longbridge-case-study/terraform-solution.webp)

The application calls the Terraform provider of the database instance supplier to create a new database, and then calls the [Bytebase Terraform Provider](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs) for automatic management. The rest is similar: Bytebase syncs database schema and the application initializes data.

One important detail: if there are new changes being released during the creation of a new tenant database, this new change might be missing. Bytebase can detect such special situations and ensure that the new tenant database is consistent with the baseline database schema.

## Longbridge Whale's Multi-Tenant Solution Based on Bytebase

![_](/content/blog/longbridge-case-study/longbridge-whale-bytebase.webp)

Longbridge Whale has migrated their entire database management process to Bytebase, from tenant database creation to ongoing management:

1. Whenever a new tenant is to be created, their SCM calls the Bytebase API to create a new tenant database.
2. Bytebase automatically synchronizes the schema of the new tenant database to the latest version.
3. The application obtains database access permissions based on HashiCorp Vault and initializes data.
4. SRE and business development teams complete daily changes to tenant databases through Bytebase.

Currently, Longbridge Whale and Bytebase are working together to further incorporate Bytebase's capabilities into their development process. Stay tuned for a follow-up case study.
