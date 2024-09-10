---
title: What is Database DevOps?
author: Tianzhou
updated_at: 2024/08/20 09:00:00
feature_image: /content/blog/what-is-database-devops/cover.webp
tags: Explanation
featured: true
description: What is Database DevOps?
---

Before delving into Database DevOps, let's first review what is DevOps. While there is no uniform definition for
DevOps, we know DevOps originates from combining software development methodologies with deployment and operations.

> Around 2007 and 2008, concerns were raised by those within the software development and IT communities that the separation between the two industries, where one wrote and created software entirely separate from those that deploy and support the software was creating a fatal level of dysfunction within the industry.

DevOps is to break silos between developers and operations with shared ownership, workflow automation, and continuous feedback loop across the software development lifecycle (SDLC). Database DevOps is a specialized subset within the broader DevOps framework, focusing on the database-related activities.

## Roles in Database DevOps

Developer and DBA are the 2 primary roles in database DevOps. They have different and somewhat conflicting priorities:

- **Developer** - Build and deliver ASAP.
- **DBA** - Prevent database outage.

![dba-vs-developer](/content/blog/how-many-dbas-should-a-company-hire/freedom-control.webp)

## A Typical Database Schema Migration Workflow

1. Developer works on the feature on the local IDE, applies the schema change to the local DB, and test locally.
1. Developer submits a SQL change request from a ticketing system such as [Jira](/blog/use-jira-for-database-change/).
1. DBA reviews the ticket and exchange several round with the developer.
1. DBA applies the change offline using a SQL client.
1. Repeat steps 2 ~ 5 multiple times to propagate the change across UAT, Staging, Prod environments.

### Lack of Consolidated Workspace

Developers and DBAs jump between different tools as they progress with a database change. A developer copies the SQL statement from local IDE and pastes into Jira for review. Once review approved, a DBA then copies the SQL statement from Jira to the local SQL client to applies the change. Then the DBA updates the Jira ticket and notify the developer.

### Lack of Automation

- SQL statements are manually copied over -> Paste wrong SQL statements.
- SQL statements are reviewed manually -> Review delay and overlooked defects.
- SQL statements are deployed manually -> Apply to the wrong database (the infamous DROP PROD by accident).

These are not atypical. DBAs are always out-numbered by developers and many engineering organizations even don't have a dedicated DBA role, instead they only assign someone as a DB person.

## The Road to Database DevOps

### A Consolidated Workspace

DevOps has become a reality thanks to the significant advancements in tooling, including platforms like GitLab, GitHub, PagerDuty, and Datadog. These platforms allow developers, release engineers, operation engineers, and SREs collaborate within a single place. Database DevOps also calls for a consolidated platform.

The bare minimum is to cover the change process. This can be achieved by adopting [GitOps](/blog/database-as-code/), a typical workflow:

1. Developer submits a SQL migration script for review in VCS such as GitHub.
1. Review is approved and the script is merged.
1. After the script is merged, a CI pipeline is triggered to schedule a deployment.

This leverages VCS to request, review, and version the SQL statements. However, VCS even with the built-in CI like GitHub Actions, GitLab CI still rely on an external CD system to deploy the database change. Besides, apart from the change task, another common database task is to query the database. VCS does not have the interactive interface to allow users to issue a SQL statement and get the result back.

A real consolidated database workspace like [Bytebase](/docs/introduction/what-is-bytebase/) should cover both write (change database) and read (query database) paths. It must provide a workflow to request, review, and deploy the database changes as well as an interactive SQL interface to query the database.

### Automation Points

Automation can be applied in several places:

- Adopt GitOps to streamline database change from merge to deployment.
- Lint SQL to detect anti-SQL patterns automatically.
- Record change history and prepare rollback automatically.
- Send notification upon operational events.
- Custom automation via API.

<HintBlock type="info">

Bytebase automates database tasks via [GitOps](/docs/vcs-integration/overview/), [SQL Review](/docs/sql-review/overview/), [built-in rollback](/docs/change-database/rollback-data-changes/), [Webhook Integration](/docs/change-database/webhook/), and [API](/docs/api/overview/).

</HintBlock>

## Summary

Database DevOps emphasizes the integration of databases into the DevOps lifecycle, fostering collaboration between development, operations, and database teams. By leveraging automation tools and practices, teams can streamline database deployment and query process, reducing manual errors and improving consistency. This approach not only accelerates delivery cycles but also ensures that database development lifecycle is seamlessly integrated into the application development lifecycle, promoting a culture of shared responsibility and continuous improvement.

## Further Readings

- [Database-as-Code](/blog/database-as-code)
- [How many DBAs should a company hire](/blog/how-many-dbas-should-a-company-hire)
- [Using Jira for Database Changes Won't Cut It](blog/use-jira-for-database-change)
