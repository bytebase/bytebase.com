---
title: Configure External URL
---

<HintBlock type="warning">

You must configure the correct --external-url otherwise following features won't work:

- [VCS integration](/docs/vcs-integration/overview)
- [SSO](/docs/administration/sso/overview)
- [Webhook integration](/docs/administration/webhook-integration/overview)

</HintBlock>

When running Bytebase in production, you should not make the node that's running the Bytebase server directly accessible to the public internet. Instead, you should set up an internet gateway such as Nginx or Caddy by configuring [--external-url](/docs/reference/command-line#--external-url-string) to the endpoint exposed by the gateway.

<HintBlock type="info">

If the exposed port is not 80 or 443, please include the port number in --external-url as well. e.g. --external-url=http://bytebase.example.com:8080 instead of --external-url=http://bytebase.example.com.

</HintBlock>

![choose-repo](/content/docs/get-started/install/external-url-flow.webp)
