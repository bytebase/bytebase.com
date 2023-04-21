---
title: How to integrate SQL Review into Your GitLab or GitHub CI/CD
author: Mila
published_at: 2022/12/2 21:21:21
feature_image: /blog/how-to-integrate-sql-review-into-gitlab-github-ci/sql-review-ci.webp
tags: Tutorial
integrations: GitHub, GitLab
level: Intermediate
description: This is a tutorial on how to integrate SQL Review into your GitLab & GitHub CI/CD, so that SQL review is automatically triggered before SQL scripts are merged into your repos.
---

Different development teams adopt different development workflow, and Bytebase offers multiple ways to integrate SQL Review into their respective workflows.

This article will walk you through how to seamlessly integrate SQL review into your GitHub and/or GitLab CI/CD workflow, so that SQL review is automatically triggered before SQL scripts are merged into your repos.

For the sake of this tutorial, we will use GitLab as an example, GitHub works similarly.

## Prerequisites

This feature requires the [Enterprise Plan](/pricing). (Starting from v1.8.0, you can start a 14-day team plan trial without registration!)

Please enable the [VCS workflow](/docs/vcs-integration/overview) for your Bytebase workspace and project.

## Step 1 - Configure SQL Review CI

After you enable VCS workflow from the Bytebase Console, under **Version Control** in your project, check the box to enable **SQL Review CI**.

![_](/blog/how-to-integrate-sql-review-into-gitlab-github-ci/enable-sql-review-ci.webp)

Click **Update.** Bytebase will create a Merge Request (MR) in your GitLab repository to set up SQL review CI.

![_](/blog/how-to-integrate-sql-review-into-gitlab-github-ci/setup-sql-review-ci.webp)

You will be redirected to your GitLab repository and see that an MR has been generated. Please review and merge this MR to complete the setup.

![_](/blog/how-to-integrate-sql-review-into-gitlab-github-ci/gitlab-mr.webp)

## Step 2 - Create an MR/PR to Trigger SQL Review

Once you've set up the CI, if you create a GitLab MR / GitHub PR that contains the files matching [the file path template](/docs/vcs-integration/name-and-organize-schema-files#file-path-template), the SQL review policy will be automatically triggered to check against the changes.

![_](/blog/how-to-integrate-sql-review-into-gitlab-github-ci/gitlab-sql-review.webp)

Similarly, in GitHub repos, SQL review will check against the changes through GitHub Actions.

The following image shows the detailed results of a SQL review via GitHub Actions.

![_](/blog/how-to-integrate-sql-review-into-gitlab-github-ci/gha-sql-review-details.webp)

Follow [this doc](/docs/sql-review/review-policy/create-schema-review-policy) to create and configure your own SQL review policy.

## Summary

Bytebase now supports integrating SQL review CI into your preferred code repository, whether it be GitHub or GitLab. In addition, for GitHub, Bytebase provides [additional ways](/docs/sql-review/sql-advisor/overview) to integrate SQL Review through:

- [GitHub App](https://github.com/marketplace/bytebase): Zero code configuration.
- GitHub Action: you will need to write a simple YAML file, learn how in the [Database CI/CD with GitHub tutorial series](/blog/github-database-cicd-part-1-sql-review-github-actions).
