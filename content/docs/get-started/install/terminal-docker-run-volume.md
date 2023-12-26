---
title: Terminal Docker Run With Volume
---

```bash
docker run --init --name bytebase --publish 8080:8080 --volume ~/.bytebase/data:/var/opt/bytebase bytebase/bytebase:%%bb_version%%
```
