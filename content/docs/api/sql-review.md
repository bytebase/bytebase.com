---
title: SQL Review API
---

The SQL Review API provides SQL checks based on your schema review policy.

<HintBlock type="info">

Before you start, you should configure the [SQL Review Policy](/docs/sql-review/review-policy).

</HintBlock>

|              |                                                     |
| ------------ | --------------------------------------------------- |
| Endpoint     | POST /v1/sql/check                                  |
| Service spec | https://api.bytebase.com/#bytebase.v1.SQLService    |
| Request      | https://api.bytebase.com/#bytebase.v1.CheckRequest  |
| Response     | https://api.bytebase.com/#bytebase.v1.CheckResponse |

```text
curl -X POST %%bb_api_endpoint%%/v1/sql/check \
     -H 'Authorization: Bearer '${bytebase_token} \
     -d '{
           "statement": "ALTER TABLE \"user\" ADD \"address\" integer; ALTER TABLE \"user\" DROP COLUMN \"age\";",
           "database": "instances/prod-instance/databases/example"
         }'
```

```json
{
  "advices": [
    {
      "status": "ERROR",
      "code": 105,
      "title": "schema.backward-compatibility",
      "content": "\"ALTER TABLE \"user\" DROP COLUMN \"age\";\" may cause incompatibility with the existing data and code",
      "line": 1,
      "column": 0,
      "detail": ""
    },
    {
      "status": "WARNING",
      "code": 402,
      "title": "column.no-null",
      "content": "Column \"address\" in \"public\".\"user\" cannot have NULL value",
      "line": 1,
      "column": 0,
      "detail": ""
    }
  ]
}
```
