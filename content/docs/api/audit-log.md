---
title: Audit Log
---

<TutorialBlock url="/docs/tutorials/api-audit-log/" title="Audit Database Activities with Bytebase API" />

|                   |                                               |
| ----------------- | --------------------------------------------- |
| Audit Log Service | https://api.bytebase.com/#tag/auditlogservice |

Bytebase provides workspace level and project level audit logs. You may call Bytebase API to export
the audit logs and send it an external log sink such as AWS S3.

## Workspace level

```bash
# Search
curl -X POST %%bb_api_endpoint%%/v1/auditLogs:search \
     -H 'Authorization: Bearer '${bytebase_token}
```

```bash
# Export in base64
curl -X POST %%bb_api_endpoint%%/v1/auditLogs:export \
     -H 'Authorization: Bearer '${bytebase_token} \
     --data '{
        "format": "JSON"
     }'
```

## Project level

```bash
# Search
curl -X POST %%bb_api_endpoint%%/v1/projects/project-sample/auditLogs:search \
     -H 'Authorization: Bearer '${bytebase_token}
```

```bash
# Export in base64
curl -X POST %%bb_api_endpoint%%/v1/projects/project-sample/auditLogs:export \
     -H 'Authorization: Bearer '${bytebase_token} \
     --data '{
        "format": "JSON"
     }'
```
