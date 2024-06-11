---
title: Terminal Docker Run with External URL
---

```bash
docker run--rm --init \
  # Use `host.docker.internal` as the host if you connect the pg instance on the same host.
  -e PG_URL=postgresql://user:secret@host:port/dbname
  --name bytebase \
  --publish 8080:8080 \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:%%bb_version%%
```
