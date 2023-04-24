---
title: Production Setup
---

## Setup https

You can use [Caddy](https://caddyserver.com/docs/quick-starts/reverse-proxy) or [Nginx](https://www.nginx.com/).

## Configure External URL

See [Configure External URL](/docs/get-started/install/external-url).

## Kubernetes

### Use Persistent Volume

If Bytebase is configured to store either metadata or the backups on the local disk, then you must use [Persistent Volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes). Local disk cannot persist state and can also cause frequent pod eviction due to disk pressure during backup.

```
Status: Failed
Reason: Evicted
Message: Pod The node had condition: [DiskPressure].
```
