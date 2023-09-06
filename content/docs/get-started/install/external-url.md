---
title: Configure External URL
---

<HintBlock type="warning">

You must configure the correct External URL otherwise following features won't work:

- [VCS integration](/docs/vcs-integration/overview)
- [SSO](/docs/administration/sso/overview)

</HintBlock>

When running Bytebase in production, you should not make the node that's running the Bytebase server directly accessible to the public internet. Instead, you should set up an internet gateway such as Nginx or Caddy by configuring External URL to the endpoint exposed by the gateway.

<HintBlock type="info">

If the exposed port is not 80 or 443, please include the port number in External URL as well. e.g. Use https://bytebase.example.com:8080 instead of https://bytebase.example.com.

</HintBlock>

![external-url-flow](/content/docs/get-started/install/external-url-flow.webp)

## Pass --external-url when starting Bytebase

Pass [--external-url](/docs/reference/command-line#--external-url-string) when starting Bytebase.

<HintBlock type="info">

This will persist the External URL setting. Thus if Bytebase starts without specifying --external-url
next time, the previously passed External URL value will still be there.

</HintBlock>

## Configure via UI

1. Click **Settings** on the top bar.
1. Click **General** under **Workspace**, fill in the desired External URL and click **Update**.

![external-url](/content/docs/get-started/install/external-url.webp)
