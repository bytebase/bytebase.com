---
title: Plan
---

|               |                                             |
| ------------- | ------------------------------------------- |
| Plan Service  | https://api.bytebase.com/#/tag/planservice  |
| Sheet Service | https://api.bytebase.com/#/tag/sheetservice |

`Plan` contains one or multiple change statements and dictate how they are grouped and ordered. The plan layouts how to execute the change statements.

- **Sheet**. Plan references change statements via the `Sheet` object. Each `Sheet` contains one or more change statements.
- **Step**. Plan orchestrates the order via `Step`. Each `Step` specifies one or more changes units. A change unit specifies the SQL statements via `Sheet` and the target database.

Code sample: https://github.com/bytebase/create-plan-from-release-action/blob/main/src/main.ts

Inside the plan, create one or more sheets if needed. Then you orchestrate the order via Steps:

```json
{
  "steps": [
    {
      "title": "step 1",
      "specs": [
        {
          "earliestAllowedTime": null,
          "id": "083c1c01-a0a6-485d-ae60-d6de2760ca4f",
          "dependsOnSpecs": [],
          "changeDatabaseConfig": {
            "target": "instances/oracle/databases/db1",
            "sheet": "projects/sample/sheets/741",
            "type": "MIGRATE",
            "schemaVersion": "",
            "ghostFlags": {},
            "preUpdateBackupDetail": {
              "database": ""
            }
          }
        },
        {
          "earliestAllowedTime": null,
          "id": "faa54bb9-0bb3-42bf-aa10-cffc73e19e33",
          // Wait for the previous task to finish
          "dependsOnSpecs": ["083c1c01-a0a6-485d-ae60-d6de2760ca4f"],
          "changeDatabaseConfig": {
            "target": "instances/oracle/databases/db1",
            "sheet": "projects/sample/sheets/742",
            "type": "MIGRATE",
            "schemaVersion": "",
            "ghostFlags": {},
            "preUpdateBackupDetail": {
              "database": ""
            }
          }
        }
      ]
    },
    {
      "title": "step 2",
      "specs": [{...}, {...}]
    }
  ]
}
```

Each spec corresponds to a task. A task is a single change unit. Tasks run in the following order:

<IncludeBlock url="/docs/share/tutorials/task-run-order"></IncludeBlock>

If you want to enforce strict running order inside a step/stage. You can specify `dependsOnSpecs` with the previous task.
