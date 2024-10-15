---
title: Terminal Docker Run with External URL
---

<HintBlock type="info">

Use [host.docker.internal](https://docs.docker.com/desktop/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host) as the host if you connect the pg instance on the same host.

</HintBlock>

```bash
docker run --rm --init \
  -e PG_URL=postgresql://user:secret@host:port/dbname \
  --name bytebase \
  --publish 8080:8080 \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:%%bb_version%%
```
