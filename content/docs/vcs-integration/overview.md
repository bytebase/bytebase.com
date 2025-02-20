---
title: GitOps
---

Bytebase offers a database-as-code workflow, enabling you to manage database changes directly through your version control system (VCS).

Bytebase GitOps workflow is built upon the [Bytebase API](/docs/api/overview). It provides the ultimate flexibility to customize the GitOps workflow to integrate with your CI/CD pipeline.

## GitHub Actions

<TutorialBlock url="/docs/tutorials/github-release-cicd-workflow/" title="Database Release CI/CD with GitHub Actions" />

Bytebase provides pre-built [GitHub Actions](https://github.com/marketplace?query=bytebase&type=actions) to ease the GitHub integration.

## API

If the pre-built GitHub Actions do not meet your needs or you want to integrate with other VCSs, you can use the [Bytebase API](/docs/api/overview) to build your own GitOps workflow.

## Legacy GitOps

Besides the API-driven GitOps, Bytebase also provides a [legacy GitOps workflow](/docs/vcs-integration/simple/overview/) based on the VCS webhooks. This approach is only kept for backward compatibility and we will sunset it in the future release.
