---
title: Terminal Docker Run Simple
---

```bash
docker run --init \
     --name bytebase \
     --volume ~/.bytebase/data/pgdata:/var/opt/bytebase/pgdata \
     --volume ~/.bytebase/data/pgdata-sample:/var/opt/bytebase/pgdata-sample \
     --publish 8080:8080 \
     bytebase/bytebase:%%bb_version%%
```
