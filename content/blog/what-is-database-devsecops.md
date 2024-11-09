---
title: What is Database DevSecOps?
author: Tianzhou
updated_at: 2024/10/09 09:00:00
feature_image: /content/blog/what-is-database-devsecops/cover.webp
tags: Explanation
featured: true
description: Database DevSecOps is the practice of integrating security throughout the entire database development lifecycle, much like how DevSecOps evolved from DevOps.
---

Last time we addressed [What is Database DevOps](/blog/what-is-database-devops/), today we are extending
the topic to Database Dev**Sec**Ops.

**Database DevSecOps** is the practice of integrating security throughout the entire database development
lifecycle, much like how DevSecOps evolved from DevOps. Given that data security is critical,
especially in preventing breaches, it makes sense for security to be a central focus in database operations.
By embedding security measures from the start, organizations can better protect their most valuable
asset—data—while minimizing risks and ensuring compliance.

## The Security Role in Database DevSecOps

In database DevSecOps, besides the typical Developer and DBA roles, security engineers join the party:

- **Developer** - Build and deliver ASAP.
- **DBA** - Prevent database outage.
- **Security engineer** - Prevent data breach.

By looping in the security engineers, we are also facing the classic trolley problem in the database domain.

![trolley-problem](/content/blog/what-is-database-devsecops/trolley-problem.webp)

If DBAs give too much freedom to the developers, the security engineers will get upset as the developers
are more likely to mess up or leak the production data. However, if DBA impose overly restrictive access controls,
developers will become frustrated due to slower workflows, which hinders their development velocity.

Let's look at the top 3 developer-to-db access paths:

1. **Schema migration**. This usually happens when evolving the application as part of the overall CI/CD pipeline.
1. **One-off, adhoc change**. This usually happens to fix some production data.
1. **Query data**. Developers sometimes need to query the production database for troubleshooting and analysis.

## Schema migration

Database schema migration should be automated just like code in a CI/CD pipeline . By treating schema changes
as part of the CI/CD process, teams can automate testing, validation, and deployment, ensuring that database
modifications are applied uniformly across environments.

<HintBlock type="info">

Bytebase provides [built-in GitOps integration](/docs/vcs-integration/overview/) and [SQL Review](/docs/sql-review/overview/) to detect erroneous SQLs automatically.

</HintBlock>

## One-off, adhoc change

![roaring-dba](/content/blog/what-is-database-devsecops/roaring-dba.webp)

One-off DML changes are risky, often bypassing standard review and testing processes, leading to potential errors.
While teams may use ticketing systems like Jira to manage these requests, the manual copy-pasting between the ticket system and database client introduces inefficiencies and risks. Additionally, there's no simple rollback mechanism.

<HintBlock type="info">

Bytebase streamlines request, review, deploy in a single place and offers [1-click automatic rollback](/docs/change-database/rollback-data-changes/).

</HintBlock>

## Query data

Traditional SQL clients often lack robust access control capabilities, posing challenges for
maintaining data security without hindering query productivity. To address this, a solution is needed
that centrally manages data access, ensuring consistent and secure control over who can query what data.
Additionally, it should incorporate data masking features, allowing different levels of data visibility
based on the user's permissions, ensuring sensitive information is protected while still enabling
efficient querying for authorized users.

<HintBlock type="info">

Unlike client-side solutions, Bytebase is a server-side solution providing [access control](/docs/security/database-permission/overview/), [dynamic data masking](/docs/security/data-masking/overview/), [audit logging](/docs/security/audit-log/). You can also [codify these data security policies (Policy-as-Code)](https://github.com/bytebase/api-example/tree/main/data-security).

</HintBlock>

## Summary

Security is intrinsic to database operations, and as teams embrace DevOps methodologies, it is crucial not to sacrifice security for the sake of speed or efficiency.
To embed security within the DevOps framework, a centralized solution is required that governs all human-to-database interactions and automates security enforcement as much as possible. This approach ensures that security policies are consistently applied without hindering the pace of development and operations.

## Further Readings

- [What is Database DevOps](/blog/what-is-database-devops/)
