---
title: Snowflake Schema Change Best Practice
author: Ningjing
published_at: 2023/07/11 18:00:00
feature_image: /content/blog/snowflake-schema-change/snowflake-schema-change.webp
tags: Explanation
description: While Snowflake revolutionizes data management and analytics, effectively managing schema changes and tracking change history becomes increasingly crucial.
---

While [Snowflake](https://www.snowflake.com/) revolutionizes data management and analytics, effectively managing schema changes and tracking change history becomes increasingly crucial.

For schema change management, the default recommendation is [schemachange](https://github.com/Snowflake-Labs/schemachange), a handy open-source Python library from Snowflake itself. It assists users in implementing database changes and keeps a record of metadata changes in a dedicated history table. This script is frequently recommended for DevOps pipelines for Snowflake.

The only viable schemachange alternative is [Bytebase](/), a GUI-based database CI/CD tool.

![reddit-question-sf](/content/blog/snowflake-schema-change/reddit-question-sf.webp)
![reddit-bytebase-best](/content/blog/snowflake-schema-change/reddit-bytebase-best.webp)

I have followed both tutorials and, in this article, I will provide you with a brief overview of their differences, helping you get a sense of each tool before you decide to try them out. A high-level comparison:

|                      | schemachange             | Bytebase   |
| -------------------- | ------------------------ | ---------- |
| Interface            | CLI                      | GUI        |
| GitOps workflow      | Manual                   | Integrated |
| Change history       | Stored in separate place | Integrated |
| Custom review rules  | ❌                       | ✅         |
| RBAC                 | ❌                       | ✅         |
| Drift detection      | ❌                       | ✅         |
| Custom approval flow | ❌                       | ✅         |
| Audit log            | ❌                       | ✅         |

## Schemachange

The tutorial I followed can be found [here](https://quickstarts.snowflake.com/guide/devops_dcm_schemachange_github/index.html#0). For the sake of presentation, I have summarized the key steps below. If you wish to give it a try, please follow the tutorial.

### Preparation

1. Manually fill in GitHub secrets and variables.
   ![gh-actions-secrets](/content/blog/snowflake-schema-change/gh-actions-secrets.webp)

2. Manually create a GitHub Action Workflow.
3. Manually run the workflow to verify the connection is working.
   ![gh-workflow-manual-run](/content/blog/snowflake-schema-change/gh-workflow-manual-run.webp)

### How to change

1. Create a subfolder `migrations`, create a SQL file and push it to `main`. The sql file title is like `migrations/V1.1.2__updated_objects.sql`.

### What you will get

1. Any commit to the `main` branch will trigger the workflow and apply the change to the database.
2. The change history is recorded in the `schema_history` table.
   ![sf-change-history](/content/blog/snowflake-schema-change/sf-change-history.webp)

## Bytebase

The tutorial I followed can be found [here](/docs/tutorials/database-change-management-with-snowflake-and-github/). For the sake of presentation, I have summarized the key steps below. If you wish to give it a try, please follow the tutorial.

### Preparation

1. Run Bytebase locally with ngrok running to expose it to the internet or deploy it on a server directly.
2. Activate the SQL Reviews rules you want to build SQL Policy and attach them to the environment.
   ![bb-sql-review-policy](/content/blog/snowflake-schema-change/bb-sql-review-policy.webp)
3. Configure a git provider to build the connection to GitHub.com.
4. Add an instance of Snowflake and test the connection to make sure it works.
   ![bb-test-connection](/content/blog/snowflake-schema-change/bb-test-connection.webp)
5. Create a project, create a database on the instance and enable GitOps workflow in the project with SQL Review CI enabled.
   ![bb-gitops-sql-review](/content/blog/snowflake-schema-change/bb-gitops-sql-review.webp)

### How to change

1. Create a branch. Create a subfolder `bytebase` , create a SQL script and push it to branch. Merge it to `main`. The sql file title is like `bytebase/test/demo##202101131000##ddl##create_tablefoo_for_bar.sql`.

### What you will get

1. Only a PR merged into `main` branch will create an issue in Bytebase.
2. If it's approved (you can configure it to skip approval too), it will apply the change to the database.
3. You can view the change history in the Bytebase UI. Click any change, you can see the corresponding issue in detail.
   ![bb-change-history](/content/blog/snowflake-schema-change/bb-change-history.webp)
   ![bb-change-diff](/content/blog/snowflake-schema-change/bb-change-diff.webp)
4. Because the SQL Review CI is enabled, before the PR is merged, the SQL Review will run automatically before the reviewer approve.
   ![gh-sql-review-processing](/content/blog/snowflake-schema-change/gh-sql-review-processing.webp)

## The Comparison

### Effort

The preparation phase of Bytebase requires more effort compared to Schemachange.

### User-friendly

However, due to its GUI-based design, Bytebase offers a more intuitive and user-friendly experience. While using Schemachange, I had to manually fill in GitHub secrets and variables, and could not confirm if it worked until running the workflow manually. With Bytebase, I can easily test the connection.

### Default workflow

The default workflow script provided by Schemachange is designed for any **push** to `main` branch, whereas Bytebase's default GitOps workflow is triggered by any **PR merged** to `main` branch.

### Change history

Schemachange records the change history in the `schema_history` table, requiring you to navigate to Snowflake to view the table and to GitHub to access the SQLs.
On the other hand, Bytebase records the change history in the interactive UI. By simply clicking on links, you can directly view the SQLs and the corresponding issues.

### SQL Review

Schemachange doesn't include SQL Reviews. In contrast, Bytebase offers predefined rules for Snowflake SQL Review. You can select some of these rules as the environment [SQL Review policy](/docs/sql-review/review-rules). By one click enabling SQL Review CI in the GitOps configuration, GitHub Actions are automatically built. Any PR involving SQL will then be reviewed automatically before it's merged. For a more detailed understanding of SQL Review in Bytebase CI/CD workflow, refer to [this article](/docs/tutorials/database-cicd-best-practice-with-github/).
![complete-cicd-workflow](/content/blog/snowflake-schema-change/complete-cicd-workflow.webp)

## Summary

If you are in need of a quick solution, Schemachange is a excellent choice. It's easy to set up and use. However, if you're seeking a more enhanced experience, Bytebase offers a user-friendly interface and a wider range of features.
All the mentioned capabilities are included in the Bytebase Free Plan. Additionally, Bytebase Enterprise Plan offers more
capabilities:

1. Schema drift detection: Any changes made outside of Bytebase will be automatically detected.
1. Data access control: By default, developers are restricted from accessing production data or exporting data.
1. Custom approval flow based on risk level: e.g., if it's a DDL on Prod -> High risk -> require longer approval flow.
1. Audit log: All activities within Bytebase are diligently recorded for comprehensive tracking and auditing purposes.

You may check the pricing page [here](https://bytebase.com/pricing) for more details.
