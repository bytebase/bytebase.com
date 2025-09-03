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

[Longbridge Whale](https://longbridge.cloud/en/) is a one-stop financial SaaS solution launched by Singaporean fintech group Longbridge. The solution covers data centers, networks, servers and securities trading services for major securities firms in all stages. The core team consists of senior financial managers from Singapore and Hong Kong, as well as technical experts from international tech giants such as Alibaba and ByteDance.

## Database Management for SaaS Applications

![_](/content/blog/longbridge-case-study/multi-tenancy-vs-multi-single-tenancy.webp)

Managing databases for SaaS applications can be configured according to different needs and business models, but can generally be classified into two modes:

### Multi Tenancy

In this case, all customer data is stored in a single database. The advantage is that it is simple and easy to use at low costs, but the disadvantage is that it's hard to scale and it cannot effectively isolate data between different tenants.

### Multi Single Tenancy

Here, different customer data is stored in independent databases or instances, even distributed across different geographic regions. It is easy to scale and can handle greater pressure. More importantly, it meets various compliance requirements. The downside is that this can significantly increase the difficulty of database management.

## Challenges with Multi Single Tenancy

![_](/content/blog/longbridge-case-study/new-tenant.webp)

For financial applications, data isolation between tenants is prevalent. Therefore, the multi tenancy approach is common for SaaS applications. If each tenant corresponds to an independent database, as the number of tenants increases, a single application may easily manage hundreds or even more databases. All these databases require strong consistency in terms of schema, but during actual change management processes, the following are inevitable:

### Batch changes

When hundreds or more databases need to be changed at once, it is almost impossible to do it manually. The most common method is to write scripts for batch execution. However, scripts require manual maintenance - any careless mistake can cause serious consequences. When personnel changes occur and work needs to be handed over, all those "customized" scripts are difficult to share, and sometimes new employees need to rewrite their own scripts.

### Schema differences

Theoretically, tenant databases are required to be isomorphic, but in reality, due to the manual management of change scripts or random temporary emergencies, there will always be more or less schema differences for some databases. This can lead to the failure of unified changes being released in only some of the tenant databases. Imagine the time-consuming troubleshooting process.

### Adding new tenants

New tenants are usually created by the business side. For most SaaS companies, the team that manages the databases are not immediately notified, resulting in a time difference spanning from hours to days for incorporating the new tenant database. This time difference is enough to generate a large number of schema differences.

## The Solution: Bytebase

As a financial SaaS provider, Longbridge Whale manage their database in [batch mode](https://docs.bytebase.com/change-database/batch-change). With the growth of their business, the number of databases increased rapidly and schema management issues have become prominent.

Similar to many other tech startups, Longbridge Whale have established a basic database review and release platform based on open-source solutions. However, such platforms generally lack schema change management capabilities and can't cope with the current challenges faced by Longbridge Whale. In order to fundamentally solve these problems, Longbridge Whale turned to Bytebase.

## Batch Resolve Schema Differences in Existing Databases

![_](/content/blog/longbridge-case-study/sync-schema.webp)

Their business has been running for a while, and there are already some schema differences in existing tenant databases. It is impossible for the naked eye to locate all the differeces. Most schema comparison tools can only compare between two databases or several tables, which doesn't quite meet the large-scale comparison needs. Bytebase's [Sync Schema](https://docs.bytebase.com/change-database/synchronize-schema/) can compare all databases against a specified baseline database. Issues are then generated to quickly eliminate schema differences in existing databases.

## Prevent Future Schema Differences

Now that legacy issues are resolved, we need to ensure that no new differences are generated in subsequent changes, or, once differences occur, they can be quickly detected and resolved. From the perspectives of prevention, warning, and recover, Bytebase has corresponding capabilities.

### Prevention: Better Change Management

![_](/content/blog/longbridge-case-study/publish-changes.webp)

Bytebase organize databases by [**Project**](https://docs.bytebase.com/concepts/data-model/#project). All homogeneous tenant databases are grouped in the same project and changes are completed by the application development teams.

In principle, each change are applied to all databases under the project in tenant mode. Once the change is successfully executed against any target database, no further modifications are allowed for scripts within this change. Of course, real business scenarios are far more complex and may vary. Some changes only need to be released to some databases, such as temporary business data fix on the backend or initialization of configuration data. Therefore, it is still possible to select and publish the changes to some databases under tenant mode.

### Warning: Drift Detection

![_](/content/blog/longbridge-case-study/drift-detection.webp)

In production environments, it is still difficult to avoid drifts. For example, access permissions are not fully revoked, and one of the app developers makes changes through other clients; or in some emergency situations, certain scripts are released directly to the database. Once a drift occurs, it is often difficult to discover in time. When this drift triggers an error at some point in the future, it will not be easy to trace back and find the cause, making it that much harder to be fixed. Bytebase has automatic [Drift Detection](https://docs.bytebase.com/change-database/drift-detection/) that scans the database schema regularly so as to detect unaudited changes and issue alerts promptly.

### Recover: Reconcile the Schema Diff

Once a drift occurs, Sync Schema can quickly compare the differences and generate issues to reconcile the drift.

## Automated New Tenant Provision

Another situation prone to schema drift is the supply of new tenant databases. Previously for Longbridge Whale, as the business side creates a new tenant (through the frontend), their platform automatically creates a tenant database, syncs it to match a certain version of the schema, and initializes data. Many SaaS companies have also adopted similar solutions.

The problem that follows is that if the tech team uses a separate tool for change management, the new tenant database will not be automatically enlisted unless the team is notified or if they scan all databases on a regular basis. This gap is enough to produce new schema differences. Thus, it is necessary to integrate this entire supply process with management process to achieve full automation. Here, Bytebase offers two solutions:

**API Solution**

![_](/content/blog/longbridge-case-study/api-solution.webp)

The application will call on the Bytebase API to create a new database and automatically include it into change management. Bytebase will make sure the schema is synced, while the application will complete subsequent data initialization.

**Terraform Solution**

![_](/content/blog/longbridge-case-study/terraform-solution.webp)

The application calls on the Terraform Provider of the database instance supplier to create a new database, and then calls the [Bytebase Terraform Provider](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs) for automatic management. The rest is pretty similar: Bytebase syncs database schema and the application initializes data.

One small detail: if there are new changes being released during the creation of a new tenant database, this new change might be missing. Bytebase can detect such special situations and ensure that the new tenant database is consistent with baseline database schema.

## Longbridge Whale's Multi Tenant Solution Based on Bytebase

![_](/content/blog/longbridge-case-study/longbridge-whale-bytebase.webp)

Longbridge Whale has migrated their entire database management process to Bytebase, from tenant database creation to the following management:

1. Whenever a new tenant is to be created, their SCM calls Bytebase API to create a new tenant database.
2. Bytebase automatically synchronizes the schema of the new tenant database to the latest version.
3. The application obtains database access permissions based on HashiCorp Vault and initializes data.
4. SRE and business development teams complete daily changes to tenant databases through Bytebase.

At the moment, Longbridge Whale and Bytebase are working together to further incorporate Bytebase's capabilities into their development process. Stay tuned for a followup case study.
