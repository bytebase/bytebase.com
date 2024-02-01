---
title: Terminal Docker Run with External URL
---

```text
docker run --init \
  --name bytebase \
  --publish 8080:8080 \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:%%bb_version%% \
  # Use `host.docker.internal` as the host if you connect the pg instance on the same host.
  --pg postgresql://user:secret@host:port/dbname
```
