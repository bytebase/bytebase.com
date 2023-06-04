---
title: Self-host Bytebase
---

**Latest release version:** [**%%bb_version%%**](https://github.com/bytebase/bytebase/releases/latest)

First, check [System Requirement and Support](/docs/faq#system-requirements-and-supported-versions).

There are different ways to deploy Bytebase to production:

1. [Docker](/docs/get-started/install/deploy-with-docker)
2. [Deploy to Kubernetes](/docs/get-started/install/deploy-to-kubernetes)
3. [Deploy to sealos](/docs/get-started/install/deploy-to-sealos)
4. [Deploy to Rainbond](/docs/get-started/install/deploy-to-rainbond)
5. [Deploy to render](/docs/get-started/install/deploy-to-render)
6. [One-Liner Installation Script](/docs/get-started/install/installation-script)
7. [Build from Source Code](/docs/get-started/install/build-from-source-code)

By default, Bytebase bundles an embedded PostgreSQL instance for storing its own metadata. However, you can choose to store the metadata in [an external PostgreSQL database](/docs/get-started/install/external-postgres).

Moreover, you must [configure the correct --external-url](/docs/get-started/install/external-url) before configuring VCS integration or SSO.
