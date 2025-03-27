---
title: Issue
---

<TutorialBlock url="/docs/tutorials/api-issue" title="Create Issue with Bytebase API" />

|                 |                                               |
| --------------- | --------------------------------------------- |
| Issue Service   | https://api.bytebase.com/#/tag/issueservice   |
| Plan Service    | https://api.bytebase.com/#/tag/planservice    |
| Rollout Service | https://api.bytebase.com/#/tag/rolloutservice |
| Sheet Service   | https://api.bytebase.com/#/tag/sheetservice   |

`Issue` drives the database operations in Bytebase. The issue contains following info:

- **Issue metadata.** e.g `title` and `description`.
- **Plan.** Contain one or multiple SQL statements and dictate how they are grouped and ordered. The plan layouts how to execute the SQL statements.
  - **Sheet**. Plan references SQL statements via the `Sheet` object. Each `Sheet` contains one or more SQL statements.
  - **Step**. Plan orchestrates the order via `Step`. Each `Step` specifies one or more changes units. A change unit specifies the SQL statements via `Sheet` and the target database.
- **Rollout.** The actual execution of the plan.

## How to create an issue

Code sample: https://github.com/bytebase/cicd-github-actions-example/blob/main/.github/actions/upsert-issue/index.ts#L68-L75

```go
// Create plan
let plan = await createPlan(changes, title, description);

// Create rollout
let rollout = await createRollout(plan.name)

// Create issue
issue = await createIssue(plan.name, rollout.name, title, description);
```

### Step 1: Create a plan.

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

### Step 2: Create a rollout for the plan

### Step 3: Create an issue including both the plan and the rollout
