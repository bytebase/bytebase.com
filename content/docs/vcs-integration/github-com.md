---
title: GitHub.com
---

## Prerequisites

- You should be the **Workspace Admin** to be able to see the **GitOps** sidebar item and add Git Provider.

---

![add](/content/docs/vcs-integration/add-git-provider/github-com/add.webp)

**Access Token**: Create a dedicated service user and visit its [personal access token](https://github.com/settings/tokens) page.

- Select the repositories where you want Bytebase to link with
- Create a token with these repository permissions: `Metadata (Read-only)`, `Contents (Read-only)`, `Pull requests (Read and write)`, `Webhooks (Read and write)`.

![access-token](/content/docs/vcs-integration/add-git-provider/github-com/access-token.webp)
