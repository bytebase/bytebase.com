---
title: 'Snowflake CI/CD and DevOps Best Practice'
author: Tianzhou
published_at: 2024/03/01 10:00:00
feature_image: /content/blog/snowflake-ci-cd-devops/cover.webp
tags: How-To
featured: true
description: Describe the current feature gap of Snowflake CI/CD story and present a solution
---

Snowflake offers scalable compute and storage resources, with a SQL-based interface for data manipulation and analysis. However, when integrating Continuous Integration/Continuous Deployment (CI/CD) processes with Snowflake, especially in comparison to its querying capabilities in SnowSight, several shortcomings or challenges can be identified.

## No streamlined review and rollout process

A typical change workflow in Snowflake:

1. A data engineer creates a schema change ticket in Jira.
1. The Snowflake admin reviews the ticket, and then uses SnowSight to apply the change to the testing instance.
1. The data engineer verifies the change and replies to the ticket to request the admin to apply the change to the production instance.
1. The Snowflake admin uses SnowSight to apply the change to the production environment.
1. The data engineer verifies the change and closes the ticket.

The above process involves back-and-forth and is error-prone. e.g. What if the admin mistakenly applies the change to prod first?

## No automated SQL lint

Modern CI pipeline has adopted automatic review checks. For Snowflake, it's especially important, since dropping a column might break the downstream data pipeline. The snowflake platform doesn't provide such lint.

## GitOps

Snowflake recently [announced Git integration](https://www.snowflake.com/blog/snowflake-expands-developer-programmability-snowpark-container-services/):

> This includes such features as Git integration (private preview), which provides easy integration of application code with git and git workflow. Users can view, run, edit, and collaborate with assets that exist in a Git repo, right inside of Snowflake.

It would be even better to see [Vercel-like](https://vercel.com) experience, where when a change script is merged into a branch, it will automatically trigger a rollout pipeline with optional approval flow.

## Meet Bytebase

To tackle the CI/CD challenges, Snowflake creates [schemachange](https://github.com/Snowflake-Labs/schemachange). The other solution is Bytebase ([schemachange vs. Bytebase](https://www.bytebase.com/blog/snowflake-schema-change/)).

### Web-based streamlined review and rollout process

Bytebase provides a review and rollout interface. It's similar to Jira, but is specifically tailored for doing database rollout. A staged rollout to propagate changes from test to prod instance.

![issue](/content/blog/snowflake-ci-cd-devops/issue.webp)

Record schema change history.

![change history](/content/blog/snowflake-ci-cd-devops/change-history.webp)

Detect schema drift caused by unexpected change.

![schema-drift](/content/blog/snowflake-ci-cd-devops/schema-drift1.webp)
![schema-drift](/content/blog/snowflake-ci-cd-devops/schema-drift2.webp)

### SQL Review and API

Bytebase provides automatic SQL review rules to detect Snowflake SQL anti-patterns. Once configured, the SQL review will be activated during the review process above. Moreover, one can call the Bytebase API from the VCS CI pipeline.

![sql-review](/content/blog/snowflake-ci-cd-devops/sql-review-policy.webp)

Inline Check in [GitHub PR](https://github.com/bytebase/ci-example/pull/4/files).

![github-pr](/content/blog/snowflake-ci-cd-devops/github-pr.webp)

## Summary

Bytebase brings the DevOps methodology and GitHub/GitLab-like experience to the Snowflake world. To learn more, check out the [step-by-step tutorial](/docs/tutorials/database-change-management-with-snowflake/).
