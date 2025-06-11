---
title: Announcing Partnership with GitHub to Automate Database Development
author: Mila
updated_at: 2023/02/16 15:21:21
feature_image: /content/blog/bytebase-github-technology-partner/feature-image.webp
tags: Announcement
integrations: GitHub
featured: true
description: We are proud to announce the Technology Partnership with GitHub to provide developers with a smooth database development experience.
---

We are proud to announce the Technology Partnership with GitHub to provide developers with a smooth database development experience. As the world's leading software development platform, [GitHub](https://github.com/) brings together the world's largest developer community to make it easy for developers to discover, share, and build better software. Bytebase is a Database CI/CD tool for DevOps teams, and is [the only Database CI/CD solution](/blog/cncf-landscape) to be included in the CNCF Landscape.

## Bytebase x GitHub: bridging code repos and database changes

Bytebase has integrated its SQL Review capabilities into GitHub's PR process, so that you can manage SQL scripts in your code repos and self-review your own SQL. This eliminates the need to switch between multiple tools and, more importantly, shift-left the SQL review so that problems are identified at the start of a CI/CD pipeline, instead of waiting until deployment.

SQL Review is now available via both GitHub Action and GitHub App.

To integrate SQL review rules into your CI process, you can either go for [SQL Review Action](https://github.com/marketplace/actions/sql-review) or the Bytebase [GitHub App](https://github.com/marketplace/bytebase) over at GitHub Marketplace.

![github-marketplace](/content/blog/bytebase-github-technology-partner/github-marketplace.webp)

Once configured, if a SQL statement in your PR violates the review rule, you will get a prompt of the violation details.

![sql-review-github](/content/blog/bytebase-github-technology-partner/sql-review-github.webp)

In addition, you can take database management one step further by configuring the [GitOps workflow](https://docs.bytebase.com/vcs-integration/overview), which can be defined as "Database-as-code". This enables an integrated CI/CD process from code changes to database changes. The database change scripts you submit to your GitHub repo will automatically trigger Bytebase's SQL review and deployment pipeline. This enables an integrated CI/CD process from code changes to database changes.

![gitops-bytebase](/content/blog/bytebase-github-technology-partner/gitops-bytebase.webp)

To learn how to leverage version control system like GitHub to codify the entire database development workflow, please check out [Streamline Database Change Management for TiDB Cloud with Bytebase](/blog/streamline-database-change-management-for-tidb-cloud-with-bytebase).
