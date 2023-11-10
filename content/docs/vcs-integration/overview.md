---
title: GitOps with VCS Integration
---

"**Version controlled schema**" aka "**Database-as-code**" is a practice to store the database schema in a version control system (VCS) just like how application code is stored. The database schema consists of a bunch of database migration scripts. In this model, the migration scripts are the source of truth of the database schema.

<iframe width="675" height="380" src="https://www.youtube.com/embed/51_bL7Vnqww" title="YouTube video player" className="w-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

You can check this [demo issue](https://demo.bytebase.com/issue/hrprodvcs-alter-schema-add-city-102) to see what it looks like after the setup. This issue is created by Bytebase after observing the [code commit](https://github.com/s-bytebase/hr-sample/commit/5208900f520468574a9aaca17b4cb99987dbc4f6).

1. Developer commits the change in VCS

   ![result-git-commit](/content/docs/vcs-integration/overview/git-commit.webp)

1. The commit triggers a corresponding issue

   ![result-issue-detail](/content/docs/vcs-integration/overview/issue-detail.webp)

1. If [SQL Review CI](/docs/sql-review/sql-advisor/gitops-ci/) is configured, The PR page will show the inline check

   ![result-sql-review](/content/docs/vcs-integration/overview/sql-review.webp)

---

The VCS Integration is a 3-step setup.

## Step 1 - Add Git Provider

This can only be performed by the "**Workspace Owner" with the help of the selected Git provider instance admin.** It only needs to be configured once for each Git provider.

- [Self-host GitLab](/docs/vcs-integration/self-host-gitlab/)
- [GitLab.com](/docs/vcs-integration/gitlab-com/)
- [GitHub.com](/docs/vcs-integration/github-com/)
- [GitHub Enterprise](/docs/vcs-integration/github-enterprise/)
- [Bitbucket.org](/docs/vcs-integration/bitbucket-org/)
- [Azure DevOps](/docs/vcs-integration/azure-devops/)

## [Step 2 - Enable GitOps Workflow in Project](/docs/vcs-integration/enable-gitops-workflow)

Configure project to use "GitOps workflow" and link the project with a repository from the Git provider configured in Step 1. This can only be performed by the "**Project Owner"**.

## [Step 3 - Name and Organize Schema Files](/docs/vcs-integration/name-and-organize-schema-files)

Organize the repository schema files according to the configured base directory and file path template in step 2. Afterwards, the file changes can be observed and identified by Bytebase to apply the schema changes to the corresponding database.

## [Troubleshoot](/docs/vcs-integration/troubleshoot)
