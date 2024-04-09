---
title: Add Git Provider
---

Bytebase supports following Git Providers:

- [GitHub.com](/docs/vcs-integration/github-com/)
- [GitHub Enterprise](/docs/vcs-integration/github-enterprise/)
- [GitLab.com](/docs/vcs-integration/gitlab-com/)
- [Self-host GitLab](/docs/vcs-integration/self-host-gitlab/)
- [Bitbucket.org](/docs/vcs-integration/bitbucket-org/)
- [Azure DevOps](/docs/vcs-integration/azure-devops/)

## Prerequisites

- You must be the **Workspace Admin** to add Git provider.
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

![gitlab](/content/docs/vcs-integration/add-git-provider/gitlab-access-token.webp)

## Bitbucket.org

![bitbucket](/content/docs/vcs-integration/add-git-provider/bitbucket-app-password.webp)

## Azure DevOps

![Azure DevOps](/content/docs/vcs-integration/add-git-provider/azure-devops-access-token.webp)
![Azure DevOps](/content/docs/vcs-integration/add-git-provider/azure-devops-access-token2.webp)
