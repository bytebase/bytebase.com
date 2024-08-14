---
title: SQL Review API
---

|          |                                                                                  |
| -------- | -------------------------------------------------------------------------------- |
| Endpoint | [POST /v1/sql/check](https://api.bytebase.com/#tag/sqlservice/POST/v1/sql/check) |
| Request  | https://api.bytebase.com/#model/checkrequest                                     |
| Response | https://api.bytebase.com/#model/checkresponse                                    |

The SQL Review API provides SQL checks based on your schema review policy.

<HintBlock type="info">

Before you start, you should configure the [SQL Review Policy](/docs/sql-review/review-policy).

</HintBlock>

```text
curl -X POST %%bb_api_endpoint%%/v1/sql/check \
     -H 'Authorization: Bearer '${bytebase_token} \
     -d '{
           "statement": "ALTER TABLE \"user\" ADD \"address\" integer; ALTER TABLE \"user\" DROP COLUMN \"age\";",
           "name": "instances/prod-instance/databases/example"
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
