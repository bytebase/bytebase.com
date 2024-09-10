---
title: 'Bytebase 1.12.1 Deep Dive'
author: Tianzhou
updated_at: 2023/02/21 13:21:21
feature_image: /content/blog/1-12-1-new-features/1-12-1-banner.webp
tags: Explanation
description: The second release of the 🐰  year, the version number was upgraded from 1.12.0 to 1.12.1, and although it was a minor upgrade (since no schema changes were involved), it still included 230 code commits
---

The second release of the 🐰 year, the version number was upgraded from 1.12.0 to 1.12.1, and although it was a minor upgrade (since no schema changes were involved), it still included 230 code commits, so let's see what new features were included 👇

![commits](/content/blog/1-12-1-new-features/commits.webp)

## Single Sign-On (SSO)

Bytebase now supports Single Sign-On (SSO). As a hindsight, it was a bit late to add this feature. We released a preview version in the last release, and our customers can’t wait to try it out. Anyway, better late than never.

![SSO](/content/blog/1-12-1-new-features/SSO.webp)

## Google Cloud Spanner

We also extend our database engine support to include Google Cloud Spanner. AFAIK, Bytebase is the only database change management tool on the market that supports Spanner.

![gcp](/content/blog/1-12-1-new-features/gcp.webp)

## Onboarding Guide

We also redesigned our onboarding guide. The previous one forced the user to complete the whole guide - users were required to add a database instance, and if that failed, a dialog box popped up asking whether to create a Sample Instance. Then users have to create a project and transfer the database to the project before they can start making any changes. The pre-configuration involves too many steps. To solve this issue, the new version prepares an instance and a project in advance. Once the user registers, he/she can immediately experience the integration of Bytebase's two core capabilities, `change` and `query`.

- From the change process, you can experience the whole change review collaborative workflow, the pre-configured auto SQL review strategy, and see the change history after the change completes.
- Then you enter SQL Editor, also pre-configured with query statements and maskd data, to experience the data query and check the data masking in effect.

Well, that's it for this update, there are a lot of UX optimizations in this version, as the features become more comprehensive, we also start to upgrade our existing UX, this onboarding guide refresh is the beginning. Next, we plan to upgrade the entire SQL Review 100+ rule configuration experience.

## Partnership Announcement

In addition, we also announced technical partnership with [GitHub](/blog/bytebase-github-technology-partner) and [PingCAP](/blog/streamline-database-change-management-for-tidb-cloud-with-bytebase) during this release cycle, and will continue to build product integrations with more talented peers in the industry.

![gh-bb](/content/blog/1-12-1-new-features/gh-bb.webp)
![pingcap-bb](/content/blog/1-12-1-new-features/pingcap-bb.webp)
