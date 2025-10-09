---
title: The 6 Levels of Database Automation
author: Tianzhou
updated_at: 2024/05/22 16:00:00
feature_image: /content/blog/database-automation-levels/roaring-dba.webp
tags: Industry
featured: true
description: Draw inspiration from the 6 levels of autonomous driving, we outline the 6 levels of database automation, from L0 no automation to L5 fully automated.
keypage: true
---

## What is Database Automation

Database automation refers to the use of tools and processes to manage and execute database-related tasks with minimal human intervention. The primary goal of database automation is to increase efficiency, reduce human error, ensure consistency, and free up database administrators (DBAs) and developers to focus on more strategic tasks.

![roaring-dba](/content/blog/database-automation-levels/roaring-dba.webp)

Draw inspiration from the 6 levels of autonomous driving, let's define the 6 levels of database automation.

## Level 0 - No Automation

At this level, all database tasks are handled manually, leading to high risk of human error and inconsistencies.

- **Manual Changes**: Database changes are manually executed by database administrators or developers.
- **No Version Control**: No systematic version control for database schemas or changes.
- **High Error Rate**: Prone to errors and inconsistencies due to manual execution.
- **High data security risk**: Data access is granted manually, which often leads to outdated permissions and violates the principle of least privilege (PoLP).
- **Lack of Traceability**: Difficult to track database operations and maintain the database audit logs.

## Level 1 - Ticketing

At this level, database operations are managed through a ticketing system, introducing some level of process and oversight.
Many organizations stay at this level.

- **Ticketing System**: Use of a ticketing system (e.g., [Jira](/blog/use-jira-for-database-change), ServiceNow) to request, track, approve database changes and access permissions.

- **Approval Workflow**: Changes and permission grants require approvals before implementation, ensuring some level of review and oversight.

- **Manual Execution**: Despite the ticketing system, changes are still executed manually from a separated database client.

- **Basic audit trails**: Basic audit trails captured in the tickets.

## Level 2 - Version Controlled

This level introduces version control for managing database changes, improving traceability and collaboration.
Teams employing DevOps best practices usually reaches this level.

- **Version Control**: Database schema and changes are managed using a version control system (VCS) such as Git.
- **Change Scripts**: Use of SQL scripts or migration files to manage database changes.
- **Collaborative Development**: Better collaboration among team members with a shared version history.
- **Manual Deployment**: Changes are still deployed manually from a separated database client, but with better tracking and rollback capabilities.

## Level 3 - Streamlined

At this level, the process is streamlined with automated tools for deployment, reducing manual effort and errors.

- **Automated Deployment**: Use of CI/CD pipelines to automate the deployment of database changes.
- **Migration Tools**: Utilization of database migration tools (e.g., Liquibase, Flyway) to manage and apply changes.
- **Rollback Capabilities**: Ability to rollback changes automatically if deployment issues occur.
- **Environment Consistency**: Ensuring consistent deployments across development, staging, and production environments.

## Level 4 - Integrated

Level 2 and level 3 both enhance the change automation, and more specifically, the planned schema changes and data changes as
part of the application release cycle. These changes can be stored in the VCS and employ the DevOps
best practices. On the other hand, there are ad-hoc changes such as amending production data and transient permission grants.
These one-off database tasks are not suitable to be stored in the VCS.

Level 4 involves integrating all database tasks across the entire database development lifecycle.

- **Fully Integrated Change Management**: Seamless integration of database changes into CI/CD pipelines alongside application code.
- **Centralized Permission Control**: One-off data access and export grants follow the same database change approval flow. Permanent permissions are synced from external auth systems such as Okta, Active Directory or LDAP.
- **Security and Compliance**: All human-to-db tasks are handled inside a single platform, which provides a holistic way to harden security and enforce compliance.

<HintBlock type="info">

Bytebase can help customers to achieve this level.

</HintBlock>

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)

## Level 5 - Fully Automated

At the highest level, the entire process of database tasks is fully automated with minimal human intervention.

- **End-to-End Task Automation**: Complete automation from task request to deployment and monitoring.
- **Self-Healing Systems**: Advanced mechanisms for automatic rollback in case of issues.
- **Comprehensive Compliance**: Automated compliance auditing and security checks integrated into the pipeline.

Because database plays one of the most critical roles in the modern infrastructure, it's unclear whether we can become comfortable to get rid of human intervention at all. WDYT?
