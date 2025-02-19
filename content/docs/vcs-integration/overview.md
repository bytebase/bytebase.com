---
title: GitOps
---

Bytebase offers a database-as-code workflow, enabling you to manage database changes directly through your version control system (VCS).

Bytebase GitOps workflow is built upon the [Bytebase API](/docs/api/overview). It provides the ultimate flexibility to customize the GitOps workflow to integrate with your CI/CD pipeline.

## GitHub

- Pre-built GitHub Actions: https://github.com/marketplace?query=bytebase&type=actions
- Examples: https://github.com/bytebase/release-cicd-workflows-example
- Tutorial: [Database Release CI/CD with GitHub Action](/docs/tutorials/github-release-cicd-workflow/)

## Other VCSs

For other VCSs, we provide API integrations examples to help you get started.

## Legacy GitOps

Besides the API-driven GitOps, Bytebase also provides a [legacy GitOps workflow](/docs/vcs-integration/simple/overview/) based on the VCS webhooks. This approach is only kept for backward compatibility and we will sunset it in the future release.
