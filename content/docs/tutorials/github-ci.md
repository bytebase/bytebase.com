---
title: Automating Database Schema Changes in Sync with Code Using GitHub Actions
author: Ningjing
published_at: 2023/03/07 18:00
tags: Tutorial
integrations: General
level: Advanced
estimated_time: '30 mins'
description: "In this article, you will delve into a practical example from Bytebase, demonstrating how to automate database schema changes in sync with code using GitHub Actions and Bytebase API."
---

Bytebase is a database DevOps and CI/CD Tool for Developer, DBA and Platform Engineering teams. With its user-friendly GUI, managing database schema changes has never been simpler.

However, for teams aiming to integrate Bytebase into their existing CI/CD workflows with GitHub, Bytebase API becomes the key.

In this article, you will delve into a practical example from Bytebase, demonstrating how to automate database schema changes in sync with code using GitHub Actions and Bytebase API.

The repository is at [https://github.com/bytebase/ci-example](https://github.com/bytebase/ci-example).

## Run a Bytebase

To utilize Bytebase API, it's essential to have an accessible Bytebase running. In this example, it's deployed here `https://bytebase-ci.zeabur.app/`. To begin, we'll first set up the necessary data to support our API interactions."

1. **An service account**: As an admin, we add a service account `api-example` with the `Workspace DBA` role, which will be used to authenticate the API calls.

   ![bb-workspace-members-ci](/content/docs/tutorials/github-ci/bb-workspace-members-ci.png)

2. **A database in a project**: We have a project called `Example`, and a database: `example`.

   ![bb-project-database](/content/docs/tutorials/github-ci/bb-project-database.png)

3. **SQL Review on environment**: The database is on the `Prod` environment, and we can configure SQL Review policy there, which means any change happens to this database will be checked according to the policy.

   ![bb-environment-sql-review](/content/docs/tutorials/github-ci/bb-environment-sql-review.png)

   ![bb-sql-review-policy](/content/docs/tutorials/github-ci/bb-sql-review-policy.png)

## GitHub Actions
Go and check the example on GitHub [https://github.com/bytebase/ci-example](https://github.com/bytebase/ci-example).

The repository contains several GitHub Action workflows and three simple projects of migrations simulating different tech stacks.

   ![gh-ci-example](/content/docs/tutorials/github-ci/gh-ci-example.png)

We will explore these two workflows:

   - `sql-review.yml`: SQL review check on GitHub
   - `create-migration.yml`: Create a migration issue in Bytebase

### SQL Review Check on GitHub

The `sql-review.yml` workflow is triggered on pull requests. It checks the SQL files named like `**.up.sql` within the pull request and reports if there is any violation against SQL review policy.

We pass variables from the running Bytebase.

   ```yaml
   - name: Setup environment variables
      id: setup_env
      run: |
         echo "bytebase_api=https://bytebase-ci.zeabur.app/v1" >> $GITHUB_OUTPUT
         echo "bytebase_account=ci@service.bytebase.com" >> $GITHUB_OUTPUT
         echo "database_id=instances/prod-instance/databases/example" >> $GITHUB_OUTPUT

   ```

After authorization, we call the Bytebase API `/sql/check` to check the SQL files and by parsing the response, we can emit annotations for each advice and mark the check as failed if any `ERROR` or `WARNING` is found.

   ```yaml
   - name: Call SQL check API for every changed SQL file
      run: |
         # Iterate over each changed SQL file and call SQL check API
         ...
            response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X POST -o response.json ${{ steps.setup_env.outputs.bytebase_api }}/sql/check \
            -H 'Content-Type: application/json' \
            -H "Authorization: Bearer ${{ steps.exchange_token.outputs.bytebase_token }}" \
            -d "${request_body}")
         http_status=$(echo "$response" | grep -oE 'HTTPSTATUS:[0-9]+' | grep -oE '[0-9]+')
         ...

         # Emit annotations for each advice
         ...

         # Marking failure if any ERROR or WARNING is found
         if jq '.advices[] | select(.status == "ERROR" or .status == "WARNING")' response.json | grep -q .; then
            echo "Found ERROR or WARNING. Marking for failure."
            HAS_ERROR_OR_WARNING=true
         fi
         done

         if [ "$HAS_ERROR_OR_WARNING" = true ]; then
         echo "Found ERROR or WARNING in SQL Review. Failing the check."
         exit 1
         else
         echo "No ERROR or WARNING found in SQL Review."
         fi
         ...
   ```
   
In the README, three PRs with different stacks are provided to demonstrate the SQL review check. You can go into the PR and switch to **Files changed** tab to view the annotations.

   - TypeORM: [#2](https://github.com/bytebase/ci-example/pull/2)
   - golang-migrate: [#3](https://github.com/bytebase/ci-example/pull/3)
   - Snowflake: [#4](https://github.com/bytebase/ci-example/pull/4)

   ![gh-typeorm](/content/docs/tutorials/github-ci/gh-typeorm.png)
   ![gh-gomigrate](/content/docs/tutorials/github-ci/gh-gomigrate.png)
   ![gh-snowflake](/content/docs/tutorials/github-ci/gh-snowflake.png)

### Create a Migration Issue in Bytebase
The `create-migration.yml` workflow is also triggered on pull requests. It checks the SQL files named like `**.up.sql` within the pull request and creates an issue in Bytebase.

Copying the authorization process used in SQL Review, then we initiate the issue creation by calling the Bytebase API `/sheet` to create a `sheet`.

   ```yaml
   - name: Create sheet per SQL script
        id: create_sheet
        run: |
          # Iterate over each changed SQL file and call create sheet API
          for FILE in $FILES; do
            echo "$FILE"
            content=$(base64 "$FILE")
            request_body=$(jq -n \
              --arg title "${{ steps.setup_env.outputs.title }}" \
              --arg content "$content" \
              '$ARGS.named')
            echo "::debug::Request body: ${request_body}"

            response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X POST -o sheet.json ${{ steps.setup_env.outputs.bytebase_api }}/projects/${{ steps.setup_env.outputs.project_id }}/sheets \
              -H 'Content-Type: application/json' \
              -H "Authorization: Bearer ${{ steps.exchange_token.outputs.bytebase_token }}" \
              -d "${request_body}")
            http_status=$(echo "$response" | grep -oE 'HTTPSTATUS:[0-9]+' | grep -oE '[0-9]+')

            if [ ${http_status} != 200 ]; then
              echo "::error ::Failed to create SQL sheet ${FILE} with response code ${http_status}"
              exit 1
            fi

           ...
   ```

Once the sheet is created, we proceed to create a `plan`, and then an `issue`, in turn. In the end, a `rollout` is created.

There's a [demo PR #5](https://github.com/bytebase/ci-example/pull/5) showing issue creation. We also adjusted the SQL Review workflow a bit, so it's no longer triggered here.

   ![gh-pr5](/content/docs/tutorials/github-ci/gh-pr5.png)

Go to Bytebase and view the created issue, which consists of two tasks due to the presence of two `**.up.sql` files in the PR. The SQL Review is running here instead.

   ![bb-issue](/content/docs/tutorials/github-ci/bb-issue.png)
   ![bb-sql-review-detail](/content/docs/tutorials/github-ci/bb-sql-review-detail.png)

You may notice there is an approval flow attached, that's because we set up a default custom approval flow for DDL.

   ![bb-custom-approval](/content/docs/tutorials/github-ci/bb-custom-approval.png)

This flow defines one approver - a custom role `ci-approver`. You may assign this role to a user for manual approvals or a service account for automated approvals via an external service.

   ![bb-approval-flow](/content/docs/tutorials/github-ci/bb-approval-flow.png)

   ![bb-approval-flow-edit](/content/docs/tutorials/github-ci/bb-approval-flow-edit.png)

   ![bb-edit-role](/content/docs/tutorials/github-ci/bb-edit-role.png)

## Summary

In this article, we've explored how to automate database schema changes in sync with code using GitHub Actions and Bytebase API. Additionally, we've shown how to configure SQL Review and establish a custom approval workflow within Bytebase. Hope this example can help you integrate schema changes into your CI/CD workflow.
