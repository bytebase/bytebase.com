---
title: What is Bytebase
description: Bytebase is a database schema change and version control management tool for teams. It consists of a web console and a backend. The backend has a migration core to manage database schema changes. It also integrates with VCS to enable version controlled schema management.
---

Bytebase is an open-source database DevOps tool, it's the GitLab for managing databases throughout the application development lifecycle. It offers a web-based workspace for DBAs and Developers to collaborate and manage the database change safely and efficiently.

As DevOps enters the mainstream, teams are adopting tools like GitLab/GitHub for managing code, and Terraform for managing Infrastructure. Similarly, Bytebase is the tool for managing databases during application development.

Bytebase complements the existing cloud provider's database platforms or the company's internal database operation platforms. While those platforms take care of the database instance level operations (e.g. provisioning a database instance), Bytebase helps teams to use the provisioned database to build their application.

## Key Features

### SQL Review

Bytebase analyzes SQL changes to enforce rules in compliance with your organization's policy. The enforcement includes naming conventions, anti-SQL pattern detection and etc. Prod and non-prod environments can also enforce different rules respectively.

### Schema (DDL) and Data (DML) Database Change Workflow

Like code review, Bytebase streamlines the database change process. Within a single workflow, a database change can be reviewed and deployed from the dev environment all the way to the production environment.

### SQL Editor

A web-based SQL Editor to query and export data. DBAs no longer need to give away sensitive database credentials when Developers need to access the data.

### Version Control with VCS Integration (GitOps)

Bytebase keeps the complete schema change history. It also integrates with VCS systems (e.g. GitLab). Teams can manage the SQL migration scripts in the VCS and trigger schema deployment on code commit.

### Backup and Restore

Bytebase supports database-level manual and periodical backup.

### Tenant Database Management

A multi-tenant service may provision separate [tenant databases](/docs/concepts/tenant-database) for each of its tenants. Bytebase comes with the [management capability](/docs/batch-change/overview) to provide robust schema change rollout for all tenants in a single workflow.
