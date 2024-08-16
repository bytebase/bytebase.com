---
title: GitOps with VCS Integration
---

## Built-in GitOps

![gitops-workflow](/content/docs/vcs-integration/overview/gitops-workflow.webp)

The built-in Bytebase GitOps workflow is **opinionated** for the typical use case:

- It imposes a [naming convention on the migration file](/docs/vcs-integration/create-migration-files/).
- It only creates Bytebase rollout issue when the migration file is **merged** into the target branch.
  Under the hood, it creates a webhook in the linked repository to observe the merge event.
- If you have successfully rolled out the issue and you want to make change based that migration file.
  You should

<HintBlock type="info">

You can check this [demo issue](https://demo.bytebase.com/projects/gitops-project/issues/106) to see what it looks like after the setup. This issue is created by Bytebase after the [PR is merged](https://github.com/s-bytebase/hr-sample/pull/17).

</HintBlock>

The built-in GitOps setup contains 3 steps:

1. [Add Git Provider](/docs/vcs-integration/add-git-provider)
1. [Add GitOps Connector in Project](/docs/vcs-integration/add-gitops-connector)
1. [Create Migration Files](/docs/vcs-integration/create-migration-files)

## Custom GitOps with API

If the built-in workflow is not suitable, you can opt to [Bytebase API](/docs/api/overview/) to fully customize the GitOps workflow to
integrate with your CI pipeline.

<TutorialBlock url="/docs/tutorials/github-ci/" title="Automating Database Schema Change workflow Using GitHub Actions" />
