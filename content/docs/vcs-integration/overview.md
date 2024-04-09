---
title: GitOps with VCS Integration
---

The built-in Bytebase GitOps workflow is **opinionated** for the typical use case:

- It imposes a [naming convention on the migration file](/docs/vcs-integration/create-migration-files/).
- It only creates Bytebase rollout issue when the migration file is **merged** into the target branch.

Under the hood, Bytebase creates a webhook in the linked repository. When migration
files matching the [path and name](/docs/vcs-integration/create-migration-files/) are **merged into** the target branch, it will send a notification to Bytebase via that webhook.
Bytebase will then create a rollout issue with the migration file content.

![gitops-workflow](/content/docs/vcs-integration/overview/gitops-workflow.webp)

If the built-in workflow is not suitable, you can opt to [Bytebase API](/docs/api/overview/) to fully customize the workflow to
integrate with your CI pipeline. See [Automating Database Schema Change workflow Using GitHub Actions](/docs/tutorials/github-ci/) as an example.

You can check this [demo issue](https://demo.bytebase.com/issue/hrprodvcs-alter-schema-add-city-102) to see what it looks like after the setup. This issue is created by Bytebase after observing the [code commit](https://github.com/s-bytebase/hr-sample/commit/5208900f520468574a9aaca17b4cb99987dbc4f6).

---

The VCS Integration setup contains 3 steps:

1. [Add Git Provider](/docs/vcs-integration/add-git-provider)
1. [Add GitOps Connector in Project](/docs/vcs-integration/add-gitops-connector)
1. [Create Migration Files](/docs/vcs-integration/create-migration-files)
