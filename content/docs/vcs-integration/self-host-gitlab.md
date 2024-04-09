---
title: Self-host GitLab EE/CE
---

## Prerequisites

- You should be the **Workspace Admin** to be able to see the **GitOps** sidebar item and add Git Provider.
- If your Bytebase instance resides in the same private network as your GitLab instance, you will need to enable **Allow requests to the local network from webhooks and integrations**. Otherwise, you will get the error: `Failed to create webhook xxx, status code: 422 for GitLab`. View details [here](https://docs.gitlab.com/ee/security/webhooks.html#allow-requests-to-the-local-network-from-webhooks-and-integrations).

---

![add](/content/docs/vcs-integration/add-git-provider/gitlab-self-host/add.webp)

**GitLab instance URL**: URL where the GitLab instance is running.

**Access Token**: Visit your self-hosted GitLab personal access token page, create a token with `api` and `read_repository` scopes.

![access-token](/content/docs/vcs-integration/add-git-provider/gitlab-com/access-token.webp)
