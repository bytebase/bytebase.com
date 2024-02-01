---
title: All the Database Tools Bytebase Replaces
author: Tianzhou
published_at: 2024/01/01 09:00:00
feature_image: /content/blog/all-database-tools-bytebase-replaces/tools.webp
tags: Explanation
featured: true
description: Bytebase is an all-in-one solution for database development lifecycle management. It replaces fragmented database tools and unifies the workflow in a single place.
---

Bytebase is an all-in-one solution for database development lifecycle management for developers, DBAs and platform engineers. It replaces fragmented database tools and unifies the workflow in a single place.

![replaced-tools](/images/replaced-tools.webp)

## SQL Client

Traditional SQL clients such as DBeaver, DataGrip, Navicat, pgAdmin, phpMyAdmin provide a GUI interface.
Bytebase also provides a web-based [SQL Editor](/sql-editor/). By adopting Bytebase, DBAs no longer
need to distribute database credentials to the individuals. DBAs configure the database credentials
in Bytebase once, then grant [database/table access](/docs/security/data-access-control/) to individuals conditionally. Furthermore, they can also configure [dynamic data masking](/docs/security/data-masking/overview/).

![sql-editor-data-masking](/images/page/main/sql-editor/mask.webp)

## Schema Migration

Liquibase, Flyway, Sqitch are CLI based. On the other hand, Bytebase provides a collaboration workspace
for DBAs and developers to collaborate on database changes.

- [SQL linter](/docs/sql-review/overview/) to detect anti-patterns.
  ![schema-review-table-drop-naming](/content/docs/sql-review/schema-review-table-drop-naming.webp)
- [Streamline the change](/docs/change-database/batch-change/) across different environments and allow to batch change many databases consistently.
  ![streamline-change](/images/page/main/batch-change/deployment-config.webp)
- [Git-like branching](/docs/branching/) for database change.
  ![branching](/images/page/main/branching/create-branch.webp)
- [Point-and-click integration](/docs/vcs-integration/overview/) with mainstream VCSs to enable GitOps workflow.
  ![result-issue-detail](/content/docs/vcs-integration/overview/issue-detail.webp)
- [Online schema migration for MySQL](/docs/change-database/online-schema-migration-for-mysql/) with gh-ost integration.
  ![bb-issue-ghost-config](/content/docs/change-database/online-schema-migration-for-mysql/bb-issue-ghost-config.webp)

## Change Coordination

A typical database change workflow:

1. The developer creates a Jira ticket with the planned SQL change script.
1. DBA reviews the ticket, discuss it with the developer in Jira or via IM.
1. DBA runs the change script offline.
1. DBA updates the ticket status / notify the developer.

Bytebase provides a single place to coordinate the database changes. The issue interface provides
a holistic view of the database change status. Upon approval, changes are rolled out from Bytebase
directly instead of switching to a different tools. All the activities are recorded and can be further
configured to post to IM via [webhook](/docs/change-database/webhook).

![Issue detail interface](/content/docs/change-database/change-workflow/issue-detail.webp)

## Summary

Bytebase takes care of all human-to-database operations. It's an all-in-one solution for teams to
adopt a unified process to change, query, secure, govern the databases. Bytebase consolidates disparate DB tools and 10x efficiency, security and PII compliance for the engineering org. To learn more, please check out [case studies](/blog/category/case-study/).

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)
