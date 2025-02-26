---
title: SQL Review API
---

<TutorialBlock url="/docs/tutorials/sql-review-api" title="SQL Review with Bytebase API" />

The SQL Review API provides SQL checks based on your schema review policy.

<HintBlock type="info">

Before you start, you should configure the [SQL Review Policy](/docs/sql-review/review-policy).

</HintBlock>

## Batch API (recommended)

|          |                                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Endpoint | [POST /v1/projects/-/releases:check](https://api.bytebase.com/#tag/releaseservice/POST/v1/projects/{project}/releases:check) |
| Request  | https://api.bytebase.com/#model/checkreleaserequest                                                                          |
| Response | https://api.bytebase.com/#model/checkreleaseresponse                                                                         |
| Example  | https://github.com/bytebase/api-example/tree/main/sql-review#batch-api-recommended                                           |

Batch API allows you to validate multiple statements across multiple databases in a single API call.

You should use batch API for the GitOps workflow. Because a single PR or MR may contain multiple dependent
migration files (e.g., `1_create_t1_table.sql`, `2_create_t1_index.sql`). By retaining the context from
earlier files, the Batch API ensures each subsequent file is validated accurately.

## Simple API

|          |                                                                                  |
| -------- | -------------------------------------------------------------------------------- |
| Endpoint | [POST /v1/sql/check](https://api.bytebase.com/#tag/sqlservice/POST/v1/sql/check) |
| Request  | https://api.bytebase.com/#model/checkrequest                                     |
| Response | https://api.bytebase.com/#model/checkresponse                                    |
| Example  | https://github.com/bytebase/api-example/tree/main/sql-review#simple-api          |

Simple API allows you to validate a single statement against a single database.
