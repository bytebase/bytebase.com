---
title: 🐞 Troubleshoot
---

### Committed migration file does not trigger issue creation

When a migration file is committed to the VCS, VCS will send a webhook event to Bytebase. There are two error categories:

1. Bytebase has received webhook events
2. Bytebase has not received any webhook event

#### Bytebase has received webhook events

In this case, if you visit your project overview page, you should find an activity event suggesting Bytebase has received the webhook event. However, the committed file doesn't match the configured path.

You should check the committed file conforms exactly to the [naming convention](/docs/vcs-integration/name-and-organize-schema-files) and the directory structure conforms to the [layout](/docs/vcs-integration/name-and-organize-schema-files#file-organization). Some common mistakes:

1. Forget the extension
1. Case mismatch
1. Directory mismatch

#### Bytebase has not received any webhook event

In this case, you should visit the VCS project page and check the webhook event history. Some common mistakes:

1. Make sure to [configure a proper --external-url](/docs/get-started/install/external-url).

1. Make sure that configured URL is network accessible from VCS.

### Failed to create webhook xxx, status code: 422 for GitLab

From [GitLab](https://docs.gitlab.com/ee/security/webhooks.html)

> To prevent this type of exploitation from happening, starting with GitLab 10.6, all Webhook requests to the current GitLab instance server address and/or in a private network are forbidden by default. That means that all requests made to 127.0.0.1, ::1 and 0.0.0.0, as well as IPv4 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 and IPv6 site-local (ffc0::/10) addresses aren’t allowed.

So if your Bytebase instance resides in the same private network as your GitLab instance, you will need to enable "Allow requests to the local network from web hooks and services" first.

### "Change Data in VCS" , "Alter Schema in VCS" button does not direct to the configured GitLab instance

Please make sure you are configuring the [GitLab external_url](https://docs.gitlab.com/omnibus/settings/configuration.html#configure-the-external-url-for-gitlab) correctly, the **host:port** must exactly matches the one accessed by Bytebase. It's called `external_url` because that's how external systems like Bytebase reaches the GitLab instance.

A common mistake is user misconfigures the port when using port forwarding. e.g. GitLab is running on port 7890, while it's exposed to the public on port 7891. In such case the `external_url` should be `https://example.com:7891` instead of `https://example.com:7890`

### OAuth CORS error with old GitLab version

When using old GitLab version (e.g. 9.4.0) to setup VCS integration, you may encounter OAuth error like [this one](https://github.com/bytebase/bytebase/issues/467):

![oauth-failed](/docs/vcs-integration/troubleshoot/oauth-failed.webp)

This is a common problem in the old GitLab verison:

- https://gitlab.com/gitlab-org/gitlab-foss/-/issues/19470
- https://gitlab.com/gitlab-org/gitlab/-/issues/300077

#### Verify the problem

Open your browser devtool with `F12`, check the `Network` section. If the latest token request with **`CORS error`** status, we can be certain that it's the `/oauth/token` api CORS error inside GitLab.

![cors-error](/docs/vcs-integration/troubleshoot/cors-error.webp)

#### Potential solution

We cannot change GitLab source code to add the `Access-Control-Allow-Origin: *` to `/oauth/token` response header, but can use Nginx as a reverse proxy for GitLab (the other proxy service works the similar way).

**CORS solution with Nginx**

Add `add_header` codes directive to the base path location block of your Nginx GitLab configuration file.

```nginx
server {
  ...
  location / {
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
    add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';

    if ($request_method = 'OPTIONS') {
      add_header 'Access-Control-Allow-Origin' $http_origin;
      add_header 'Access-Control-Max-Age' 1728000;
      add_header 'Content-Type' 'text/plain charset=UTF-8';
      add_header 'Content-Length' 0;
      return 204;
    }

    if ($request_method != GET) {
      add_header 'Access-Control-Allow-Origin' '*';
    }
    ...
  }
  ...
}
```

Run the following command to reload your updated config file.

```bash
sudo nginx -s reload
```

---

Afterwards, try the GitLab setup again.
