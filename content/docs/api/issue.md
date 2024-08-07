---
title: Issue
---

|                 |                                               |
| --------------- | --------------------------------------------- |
| Issue Service   | https://api.bytebase.com/#/tag/issueservice   |
| Plan Service    | https://api.bytebase.com/#/tag/planservice    |
| Rollout Service | https://api.bytebase.com/#/tag/rolloutservice |
| Sheet Service   | https://api.bytebase.com/#/tag/sheetservice   |

`Issue` drives the database operations in Bytebase. The issue contains following info:

- **Issue metadata.** e.g `title` and `description`.
- **Plan.** Contain one or multiple SQL statements and dictate how they are grouped and ordered. The plan layouts how to execute the SQL statements. Plan references SQL statements via the `Sheet` object. Each `Sheet` contains one or more SQL statements.
- **Rollout.** The actual execution of the plan.

## How to create an issue

Code sample: https://github.com/bytebase/github-action-example/blob/main/.github/actions/upsert-issue/index.ts#L68-L75

```go
// Create plan
let plan = await createPlan(changes, title, description);

// Create rollout
let rollout = await createRollout(plan.name)

// Create issue
issue = await createIssue(plan.name, rollout.name, title, description);
```

### Step 1: Create a plan.

Inside the plan, create one or more sheets if needed.

### Step 2: Create a rollout for the plan

### Step 3: Create an issue including both the plan and the rollout
