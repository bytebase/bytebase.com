---
title: Terminal Docker Run
---

```bash
docker run --init \
  --name bytebase \
  --restart always \
  --publish 5678:8080 \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:%%bb_version%% \
  --data /var/opt/bytebase \
  --port 8080
```
