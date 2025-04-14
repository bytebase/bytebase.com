---
title: Announcing Partnership with GitLab to Automate Database Development
author: Mila
updated_at: 2023/09/19 21:21:21
feature_image: /content/blog/bytebase-gitlab-technology-partner/banner.webp
tags: Announcement
integrations: GitLab
featured: true
description: We are proud to announce the Technology Partnership with GitLab to provide developers with a smooth database development experience.
---

We are proud to announce the Technology Partnership with GitLab to provide developers with a smooth database development experience.

GitLab is the world's leading open-source AI-driven DevSecOps platform, helping developer teams collaborate better and deliver software more efficiently. Bytebase is a database CI/CD tool designed for DevOps teams, specifically tailored for developers and DBAs. It is the only database tool that's included in both [CNCF Landscape](https://landscape.cncf.io/?selected=bytebase) and [Platform Engineering Landscape](https://platformengineering.org/tools/bytebase).

![landscape](/content/blog/bytebase-gitlab-technology-partner/landscape.webp)

## Bytebase: Connecting Database Changes with the Code Repository

With Bytebase, you can integrate your database schema with Version Control Systems (VCS) to codify the entire database development workflow, achieving **Database-as-Code**. Once you submit database schema change scripts to your GitLab code repo, the deployment pipeline in Bytebase will be automatically triggered. Making the CI/CD process from applying code changes to database changes a unified process.

![landscape](/content/blog/bytebase-gitlab-technology-partner/gitlab-vcs.webp)

Bytebase has [integrated SQL Review capabilities into the GitLab CI process](/docs/tutorials/how-to-integrate-sql-review-into-gitlab-github-ci/). You only need to set up SQL Review Policies once and later you upload SQL scripts to GitLab, automatic SQL Review will be triggered, avoiding having to switch between multiple tools. This shift-left approach also means that issues with SQL scripts are discovered early on in the deployment stage, rather than waiting until the last minute.

For example, when submitting a change request, if the SQL in your MR violates any SQL Review Policy, a corresponding prompt will appear in the MR.

![landscape](/content/blog/bytebase-gitlab-technology-partner/vcs-sql-review-gitlab.webp)

To learn how to leverage Version Control System like GitHub or GitLab to codify your entire database development workflow, please check out [The Database CI/CD Best Practice](/docs/tutorials/gitops-github-workflow/).
