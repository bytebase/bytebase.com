---
title: GitOps SQL Review CI
---

<HintBlock type="warning">

This feature requires Enterprise Plan.

</HintBlock>

## Set up SQL Review CI

This feature requires the **GitOps Workflow**. You can follow [GitOps Workflow](/docs/vcs-integration/overview) to set up.

![vcs-sql-review](/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review.webp)

Below use GitLab as an example. GitHub works in a similar way.

When the box `Enable SQL Review CI via GitLab CI` is checked, Bytebase will create a merge request (MR) for your repository to set up the SQL review CI, and redirect you to the MR page. To finish the setup, you should review and merge this MR.

![vcs-sql-review-prepare](/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review-prepare.webp)

![vcs-sql-review-pr](/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review-pr.webp)

After the setup, in every MR, the SQL review policy will check against changed files matching the file path template.

## SQL Review CI via GitHub Action

![vcs-sql-review-github](/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review-github.webp)

## SQL Review CI via GitLab CI

![vcs-sql-review-gitlab](/docs/vcs-integration/enable-gitops-workflow/vcs-sql-review-gitlab.webp)

And you can follow the doc [Create Schema Review Policy](/docs/sql-review/review-policy/create-schema-review-policy) to create the SQL review policy.
