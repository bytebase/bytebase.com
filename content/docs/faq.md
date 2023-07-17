---
title: FAQ
---

## How to reach us?

- 💬 Join our [Discord Community](https://discord.gg/huyw7gRsyA)
- 📧 Email us at [support@bytebase.com](mailto:support@bytebase.com)
- 🎫 Open [GitHub Issue](https://github.com/bytebase/bytebase/issues)
- 🤠 Find us on [@Bytebase](https://twitter.com/bytebase)

## System requirements

Bytebase is lightweight and has no external dependency. For normal workload, 1 CPU core and 2 GB RAM are sufficient.

## Supported database and versions

See [Supported Databases](/docs/introduction/supported-databases).

## Supported version control systems (VCS) and providers

See [Git Provider](/docs/vcs-integration/add-git-provider).

## How to enable https

You can use [Caddy](https://caddyserver.com/docs/quick-starts/reverse-proxy) or [Nginx](https://www.nginx.com/).

## How to enable debug mode

<HintBlock type="warning">

Debug mode is a global setting and is only supposed to be used for troubleshooting.

</HintBlock>

Debug mode emits more detailed logs on the backend as well as returning more verbose logs to the frontend.

### Enable --debug on startup

You can pass [--debug](/docs/reference/command-line#--debug) when starting Bytebase.

### Toggle debug mode at runtime

If you are an OWNER or DBA, you can also toggle debug mode at runtime. The toggle is under the top-right profile dropdown

![_](/content/docs/troubleshoot-debug-mode.webp)

## Does Bytebase support post action after applying a change to the database

1. You can configure [project webhook](/docs/change-database/webhook/#supported-webhook-endpoints) to observe events.

1. If you use GitOps workflow, there is a [schema write-back](https://www.bytebase.com/docs/vcs-integration/enable-gitops-workflow/#schema-change-type-required) feature where Bytebase will write back the full
   schema to the specified file in the repository, and you can configure a pipeline to listen on that
   file change. You can follow [this tutorial](/docs/tutorials/database-change-management-with-mysql-and-github/#step-5-change-schema-for-mysql-by-pushing-sql-schema-change-files-to-github) to learn the entire GitOps workflow.

## Which data does Bytebase collect?

_You can disable the collection by passing [`--disable-metric`](/docs/reference/command-line/#disable-sample) on startup_.

- Anonymised usage data.
- The registered email and name of the first member in the workspace.
