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

If the built-in workflow is suitable, you can opt to Bytebase API to fully customize the workflow and
integrate with your CI pipeline. See [Automating Database Schema Change workflow Using GitHub Actions](/docs/tutorials/github-ci/).

You can check this [demo issue](https://demo.bytebase.com/issue/hrprodvcs-alter-schema-add-city-102) to see what it looks like after the setup. This issue is created by Bytebase after observing the [code commit](https://github.com/s-bytebase/hr-sample/commit/5208900f520468574a9aaca17b4cb99987dbc4f6).

1. Developer merges a pull request in VCS.

   ![result-git-commit](/content/docs/vcs-integration/overview/git-commit.webp)

1. The merged pull request triggers a corresponding issue.

   ![result-issue-detail](/content/docs/vcs-integration/overview/issue-detail.webp)

---

The VCS Integration is a 3-step setup.

## Step 1 - Add Git Provider

This can only be performed by the **Workspace Admin with the help of the selected Git provider instance admin.** It only needs to be configured once for each Git provider.

- [Self-host GitLab](/docs/vcs-integration/self-host-gitlab/)
- [GitLab.com](/docs/vcs-integration/gitlab-com/)
- [GitHub.com](/docs/vcs-integration/github-com/)
- [GitHub Enterprise](/docs/vcs-integration/github-enterprise/)
- [Bitbucket.org](/docs/vcs-integration/bitbucket-org/)
- [Azure DevOps](/docs/vcs-integration/azure-devops/)

## [Step 2 - Add GitOps Connector in Project](/docs/vcs-integration/add-gitops-connector)

Add GitOps connectors using the Git provider configured in step 1. This can only be performed by the **Project Owner**.

## [Step 3 - Create the Migration Files](/docs/vcs-integration/create-migration-files)

Create migration files according to the naming convention.

## [Troubleshoot](/docs/vcs-integration/troubleshoot)
