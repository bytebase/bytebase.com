---
title: Change Databases from Multiple Tenants
---

Bytebase allows you to change **a collection of databases with identical schemas**, these databases are often referred as [tenant databases](/docs/concepts/tenant-database).

Typical scenarios of tenant databases are:

- A Software as a Service (SaaS) provider provides separate database instances for each of its customers (aka. tenants) alongside their application deployments.
- An internal platform team provides multi-region database deployments (e.g. US, EU), and have separate database instances in different deployment environments (e.g. Staging, Prod).

It is often desired to apply schema changes to databases across all tenants since these databases are homogeneous, but in a staged rollout fashion (aka. canary deployment) to minimize the risk of breaking all deployments.

You should consider using tenant databases when there are multiple database instances alongside multiple deployments for the same application.
For example, a software company offers medical record storage services for its customers, hospitals. Each hospital is considered as a tenant, and each tenant has to store their patient data in its own database for regulation or privacy purposes. This feature allows updating database schema for all tenants in a simple and consistent way. Other use cases include multi-location databases for supporting highly-available services where each location is a tenant.

Let's take the hospital example to follow the steps below.

## **Labels**

A label is a key-value pair that helps you identify the tenant for a database. The supported label keys are location and tenant currently. Workspace owner needs to predefine label values (tenant names) in the Workspace Label tab.

![Tenant Labels](/docs/batch-change/tntdbmngmt-tenant-labels.webp)

## **Projects in Tenant Mode**

Project can be created in Tenant Mode which supports tenant database management. Tenant projects empowers you to:

1. Roll out schema changes and data updates to mutiple tenant databases by their environments, tenant labels or geolocations, or any combination of them.
1. Progressively roll out through different stages, and only proceed to the next stage when all of rollouts in the current stage are successful.

![Create Project in Tenant Mode](/docs/batch-change/tntdbmngmt-create-project-in-tenant-mode.webp)

## **Deployment Configuration**

You need to define deployment configuration for a project in Tenant Mode before any database is created or transferred from another project. With deployment configuration in the example below, tenants will be deployed in three stages:

1. Staging Stage: all tenants in Staging environment;

2. Prod Stage - canary: tenant hospital1 (label Tenant=hospital1) in Prod environment;

3. Prod Stage: all tenants in Prod environment.

This provides a reliable sequence of updating schema for all tenants.

![Deployment Config](/docs/batch-change/tntdbmngmt-deployment-config.webp)

## **Databases with tenant labels**

You can create databases with labels in tenant mode projects. The labels come from predefined label keys and values in the Workspace. You can also transfer an existing database from another project if its database name and schema follows the existing tenant pattern.

![Create Database with Tenant Label](/docs/batch-change/tntdbmngmt-create-database-with-tenant-label.webp)

The project overview tab shows all tenant databases for databases named lab_test. Staging environment has a database for hospital1. There are three databases in the Prod environment for hospital1, hospital2, and hospital3.

![Tenant Databases](/docs/batch-change/tntdbmngmt-tenant-databases.webp)

## **Schema Update for tenant databases**

There is a preview dialog showing the plan of deployment before the schema is altered.

![Alter Schema](/docs/batch-change/tntdbmngmt-alter-schema.webp)

Issue can be created to update schema for all tenants by following the deployment configuration. The database names should be the same or follow the same database name template described in the section below. For example, the first two stages have been completed, and the issue is pending approval for the last stage.

![Issue Alter Schema](/docs/batch-change/tntdbmngmt-issue-alter-schema.webp)

Once the issue is completed, all tenant databases will have the same updated version of schema.

![After Issue Complete](/docs/batch-change/tntdbmngmt-after-issue-complete.webp)

## Database Name Template

Typically, all tenant databases should have the same database name and will be placed on different database instances. For some use cases, tenant databases need to have different database names and may be on the same or a fixed number of database instances. Users can define a database name template where the database name should include the tenant name. For example, a database name template can be `{{DB_NAME}}\_{{TENANT}}`. The database name for all tenants can be db1_hospital1, db1_hospital2, db1_hospital3 with the same schema. If all tenants need a different collection of databases for other purposes of usage, databases can be created with names of db2_hospital1, db2_hospital2, db2_hospital3.

A project in Tenant Mode can be created with a database name template.

![Create Project with Template](/docs/batch-change/tntdbmngmt-create-project-with-template.webp)

The name of the database being created will be generated based on a base `{{DB_NAME}}` and the name of a tenant.

![Create Database](/docs/batch-change/tntdbmngmt-create-database-with-template.webp)

The project database overview page will look like in the following.

![Project Overview](/docs/batch-change/tntdbmngmt-project-overview.webp)

## GitOps

You can further adopt GitOps to batch change tenant databases.

<DocLinkBlock url="/docs/vcs-integration/tenant-gitops" title="Batch Change Tenant Databases"></DocLinkBlock>
