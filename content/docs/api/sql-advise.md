---
title: SQL Advise API
---

<HintBlock type="warning">

This OpenAPI is in **Alpha** stage, we may change it in the future.

</HintBlock>

The SQL Advise API provides SQL checks based on your schema review policy.

<HintBlock type="info">

Before you start, you should configure the schema review policy on a specific environment. Please check [Schema Review](/docs/sql-review/review-policy/overview) for more information.

</HintBlock>

### Endpoint

**`GET`** `http://localhost:8080/v1/sql/advise`

```bash
curl http://localhost:8080/v1/sql/advise \
  -G --data-urlencode '{SQL statement}' \
  -d 'environment={environment name}' \
  -d 'databaseType={database type}
```

### Query parameters

| Parameter      | Required?    | Description                                                                                                                           | Example                  |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `environment`  | **Required** | The environment name for your schema review policy. **Case sensitive**                                                                | Dev                      |
| `statement`    | **Required** | The SQL statement.                                                                                                                    | SELECT \* FROM \`table\` |
| `host`         | **Optional** | The instance host. Available values: `MySQL`, `PostgreSQL`, `TiDB`.                                                                   | 127.0.0.1                |
| `port`         | **Optional** | The instance port. Available values: `MySQL`, `PostgreSQL`, `TiDB`.                                                                   | 3306                     |
| `databaseName` | **Optional** | The database name in the instance.                                                                                                    | DB Name                  |
| `databaseType` | **Optional** | The database type. Required if `port`, `host`, and `databaseName` are not specified. Available values: `MySQL`, `PostgreSQL`, `TiDB`. | MySQL                    |

Once you have created the schema review policy in the Bytebase UX, you can call the SQL Advise API with `environment`, `statement`, and `databaseType` parameters. This will conduct the SQL check against statements without database catalog information.

You can also create the instance and database in the UX, then call the API with `environment`, `statement`, `host`, `port`, and `databaseName` parameters. This will allow the API to retrieve the database catalog information and assist the SQL check.

### Response body

```json
[
  {
    "code": "number",
    "content": "string",
    "status": "string",
    "title": "string"
  }
]
```

- `code`: The error code. Check [error code for advisor](/docs/reference/error-code/advisor) for details.
- `content`: The error message.
- `status`: The SQL check status, should be `SUCCESS`, `WARN` or `ERROR`.
- `title`: The schema review rule type. See the [list of supported rules](/docs/sql-review/review-rules#supported-rules).

### Response codes

| Code  | Description                                                 |
| ----- | ----------------------------------------------------------- |
| `200` | OK                                                          |
| `400` | One of the provided values in the request query is invalid. |
| `500` | Internal server error                                       |

### Example

Request

```bash
curl http://localhost:8080/v1/sql/advise \
  -G --data-urlencode 'statement=SELECT * FROM `table`' \
  -d environment=Dev \
  -d databaseType=MySQL
```

Response

```json
[
  {
    "status": "ERROR",
    "code": 203,
    "title": "statement.select.no-select-all",
    "content": "\"SELECT * FROM `table`\" uses SELECT all"
  },
  {
    "status": "ERROR",
    "code": 202,
    "title": "statement.where.require",
    "content": "\"SELECT * FROM `table`\" requires WHERE clause"
  }
]
```

Request

```bash
curl http://localhost:8080/v1/sql/advise \
  -G --data-urlencode 'statement=SELECT id FROM `table` WHERE id = 1' \
  -d environment=Dev \
  -d databaseType=MySQL
```

Response

```json
[
  {
    "status": "SUCCESS",
    "code": 0,
    "title": "OK",
    "content": ""
  }
]
```

![openapi-sql-advise](/docs/openapi-sql-advise.webp)
