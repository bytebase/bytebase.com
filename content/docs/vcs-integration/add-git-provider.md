---
title: Add Git Provider
---

Bytebase supports following Git Providers:

- GitHub.com
- GitHub Enterprise
- GitLab.com
- Self-host GitLab
- Bitbucket.org
- Azure DevOps

## Prerequisites

- You must be the **Workspace Admin** to add Git provider.
- Configure [External URL](/docs/get-started/install/external-url).
- You may also need the help of the selected Git provider admin to create the dedicated
  service user and the personal access token.

## Overview

All providers share a similar setup:

1. Create a dedicated service user.
1. Obtain the service user credential such as personal access token with the required repository permissions:
   - **Create Webhook**. Bytebase creates a webhook in the repository to observe the merge event.
   - **Read Repository**. Bytebase reads the repository migration file to get the change statements.
   - **Write Comment**. Bytebase may add a comment to the merge request.

<HintBlock type="info">

The token may have an expired date. When the token is expired, you need to update the provider with
a new token.

</HintBlock>

Follow the instructions on the Git provider setup page. Below are the screenshots showing the required
permissions/scopes.

## GitHub.com and GitHub Enterprise (self-host)

![github](/content/docs/vcs-integration/add-git-provider/github-access-token.webp)

## GitLab.com and GitLab (self-host)

You can either create:

1. A **personal** access token, and make sure it has access to the project:
   ![gitlab](/content/docs/vcs-integration/add-git-provider/gitlab-access-token-personal.webp)

1. A **project** access token, you'll need at least `Maintainer` role:
   ![gitlab](/content/docs/vcs-integration/add-git-provider/gitlab-access-token.webp)

## Bitbucket.org

![bitbucket](/content/docs/vcs-integration/add-git-provider/bitbucket-app-password-personal.webp)

## Azure DevOps

<p align="center">
<img src="/content/docs/vcs-integration/add-git-provider/azure-devops-access-token.webp" alt="Azure DevOps" width="300" height="auto"  />
</p>

Pay attention to the **Organization** field, it has to be `All accessible organizations`, not a specific organization.

![Azure DevOps](/content/docs/vcs-integration/add-git-provider/azure-devops-access-token2.webp)
