---
title: Legacy GitOps
---

<HintBlock type="warning">

This feature is deprecated since 3.5.0 and we will sunset it in the future release.

</HintBlock>

Bytebase provides a built-in GitOps workflow out of the box.

![gitops-workflow](/content/docs/vcs-integration/overview/gitops-workflow.webp)

This GitOps workflow is opinionated for the simple use case:

- It imposes a [naming convention on the migration file](/docs/vcs-integration/create-migration-files/).
- It only creates Bytebase rollout issue when the migration file is **merged** into the target branch.
  Under the hood, it creates a webhook in the linked repository to observe the merge event.
- If you have successfully rolled out the issue and you want to make further change based on that migration file, you need to create a new migration file instead of editing the original one inline.

<HintBlock type="info">

You can check this [demo issue](https://demo.bytebase.com/projects/gitops-project/issues/106) to see what it looks like after the setup. This issue is created by Bytebase after the [PR is merged](https://github.com/s-bytebase/hr-sample/pull/17).

</HintBlock>

The simple GitOps setup contains 3 steps:

1. [Add Git Provider](/docs/vcs-integration/add-git-provider)
1. [Add GitOps Connector in Project](/docs/vcs-integration/add-gitops-connector)
1. [Create Migration Files](/docs/vcs-integration/create-migration-files)
