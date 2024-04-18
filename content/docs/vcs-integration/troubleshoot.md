---
title: Troubleshoot
---

_If you need further assistance setting up GitOps, feel free to [reach us](/docs/faq/#how-to-reach-us)._

## General

1. Bytebase only observes **merge** event. If the file is pushed to the branch directly, it will be ignored.
1. Migration file must follow the [path and naming convention](/docs/vcs-integration/create-migration-files/).
1. Bytebase has configured a proper [External URL](/docs/get-started/install/external-url) and the URL is network accessible from VCS.

Bytebase observes the VCS merge event via webhook. The created webhook link is on the top of the Git
connector setting page.

![webhook-link](/content/docs/vcs-integration/troubleshoot/webhook-link.webp)

Check the webhook running history to debug the reason.

![webhook-running-detail](/content/docs/vcs-integration/troubleshoot/webhook-running-detail.webp)

## GitLab

### Failed to create webhook xxx, status code: 422

If you configure [External URL](/docs/get-started/install/external-url) with the private IP such as `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, you will need to enable [Allow requests to the local network from webhooks and integrations](https://docs.gitlab.com/ee/security/webhooks.html#allow-outbound-requests-to-certain-ip-addresses-and-domains) first.

![activity-warning](/content/docs/vcs-integration/troubleshoot/gitlab-allow-internal-request.webp)

### INVALID_ARGUMENT: failed to fetch repositories

![gitlab-invalid-pat](/content/docs/vcs-integration/troubleshoot/gitlab-invalid-pat.webp)

If your GitLab is before 12.2, then the personal access token won't work and you need to use the OAuth
token to configure the [GitLab Provider](/docs/vcs-integration/add-git-provider/)
