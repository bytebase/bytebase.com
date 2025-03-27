---
title: GitOps
---

Bytebase offers a database-as-code workflow, enabling you to manage database changes directly through your version control system (VCS).

Bytebase GitOps workflow is built upon the [Bytebase API](/docs/api/overview). It provides the ultimate flexibility to customize the GitOps workflow to integrate with your CI/CD pipeline.

## GitHub Actions

<TutorialBlock url="/docs/tutorials/gitops-github-workflow/" title="Database GitOps with GitHub Actions" />

<HintBlock type="info">

To reach your self-hosted Bytebase from GitHub Actions, you can choose either options:

1. Tunnel GitHub Actions using [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) with [Cloudflare Warp GitHub Actions](https://github.com/marketplace/actions/setup-cloudflare-warp).

1. Use [self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners).

</HintBlock>

Bytebase provides pre-built [GitHub Actions](https://github.com/marketplace?query=bytebase&type=actions) to ease the GitHub integration.

## API

If the pre-built GitHub Actions do not meet your needs or you want to integrate with other VCSs, you can use the [Bytebase API](/docs/api/overview) to build your own GitOps workflow.

## Legacy GitOps

<HintBlock type="warning">

This feature is deprecated since 3.5.0 and we will sunset it in the future release.

</HintBlock>

Besides the API-driven GitOps, Bytebase also provides a [legacy GitOps workflow](/docs/vcs-integration/simple/overview/) based on the VCS webhooks.
