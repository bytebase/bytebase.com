---
title: Configure External URL
---

<HintBlock type="warning">

You must configure the correct External URL otherwise following features won't work:

- [VCS integration](/docs/vcs-integration/overview)
- [SSO](/docs/administration/sso/overview)

You may also need to configure the additional GitOps Webhook URL if the public endpoint is different
than the internal one.

</HintBlock>

When running Bytebase in production, you should not make the node that's running the Bytebase server directly accessible to the client. Instead, you should set up an gateway such as Nginx or Caddy to forward requests to Bytebase.

Logically, you need to configure 2 endpoints, the external URL that users use to access the Bytebase console, and the GitOps Webhook URL that the VCS pushes the webhook event for GitOps workflow. The former usually is accessed from
the internal network, while the latter may come from the external network if using GitHub.com / GitLab.com.
If they both can be accessed via the same endpoint, then you only need to configure the external URL:

![external-url-flow](/content/docs/get-started/install/external-url-flow.webp)

## GitOps Webhook URL

If internal network access is different than external (e.g. `bytebase.example.dev` vs `bytebase.example.com`), you need to configure a separate GitOps Webhook URL:

![gitops-webhook-url-flow](/content/docs/get-started/install/gitops-webhook-url-flow.webp)

<HintBlock type="info">

If the exposed port is not 80 or 443, please include the port number in External URL / GitOps Webhook URL as well. e.g. Use https://bytebase.example.com:8080 instead of https://bytebase.example.com.

</HintBlock>

## Configure via UI

1. Click **Settings** on the top bar.
1. Click **General** under **Workspace**, fill in the desired External URL and click **Update**.
1. GitOps Webhook URL can only be configured via UI. If not set, it will default to the same value as External URL.

![external-url](/content/docs/get-started/install/external-url.webp)

## Pass --external-url when starting Bytebase

[--external-url](/docs/reference/command-line#--external-url-string) can be passed when starting Bytebase.

<HintBlock type="info">

This will persist the External URL setting. Thus if Bytebase starts without specifying --external-url
next time, the previously passed External URL value will still be there.

</HintBlock>
