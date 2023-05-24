---
title: GitOps SQL Review CI
---

## Set up SQL Review CI

This feature requires the **GitOps Workflow**. You can follow [GitOps Workflow](/docs/vcs-integration/overview) to set up.

![vcs-sql-review](/content/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review.webp)

Below use GitLab as an example. GitHub works in a similar way.

When the box `Enable SQL Review CI via GitLab CI` is checked, Bytebase will create a merge request (MR) for your repository to set up the SQL review CI, and redirect you to the MR page. To finish the setup, you should review and merge this MR.

![vcs-sql-review-prepare](/content/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review-prepare.webp)

![vcs-sql-review-pr](/content/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review-pr.webp)

After the setup, in every MR, the SQL review policy will check against changed files matching the file path template.

## SQL Review CI via GitHub Action

![vcs-sql-review-github](/content/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review-github.webp)

## SQL Review CI via GitLab CI

![vcs-sql-review-gitlab](/content/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review-gitlab.webp)

And you can follow the doc [Create Schema Review Policy](/docs/sql-review/review-policy/create-schema-review-policy) to create the SQL review policy.

## MyBatis3 Mapper SQL Review CI - Beta

After enabling SQL-Review CI, Bytebase will attempt to review MyBatis 3 mapper files. When the changed file includes a MyBatis 3 mapper files, Bytebase will search for a MyBatis3 config files in the same and parent directories. Once found, Bytebase will match the **environment id** in the config file with the \*environment name\*\* in Bytebase. If there is a matching environment, Bytebase will apply that environment's SQL Review policy.

![mybatis3-sql-review-github](/content/docs/vcs-integration/enable-gitops-workflow/mybatis-github-ci-example.webp)
