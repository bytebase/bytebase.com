---
title: Codify SQL Review Policies with Bytebase API
author: Ningjing
updated_at: 2024/11/12 18:00
tags: Tutorial
integrations: API
level: Advanced
estimated_time: '40 mins'
description: 'Learn how to use the Bytebase API to configure SQL review rules in Bytebase'
---

<IncludeBlock url="/docs/share/tutorials/api-preface"></IncludeBlock>

This tutorial will guide you through configuring SQL review rules using the Bytebase API. This approach allows you to manage SQL review rules as code within your repository, enabling DBAs or platform engineering teams to apply them to Bytebase as needed.

<HintBlock type="info">

[Tutorial Code Repository](https://github.com/bytebase/api-example/tree/main/sql-review)

</HintBlock>

## Prerequisites

1. [Docker](https://www.docker.com/) installed
1. Node.js >= v18

## Start Bytebase

<IncludeBlock url="/docs/share/tutorials/start-bytebase"></IncludeBlock>

## Create Service Account

<IncludeBlock url="/docs/share/tutorials/create-service-account"></IncludeBlock>

## Obtain the Access Token

1. Go to [Bytebase API Example repo](https://github.com/bytebase/api-example) and clone it.

1. Navigate to the `sql-review` subfolder and follow the instructions in the `README.md` file of the example code repository to execute the scripts.
   
1. Replace `bytebase_url`, `bytebase_account`, and `bytebase_password` in the commands below with your own values, then run them to obtain a `bytebase_token` in your terminal.

   ```bash
   export bytebase_url=http://localhost:8080
   export bytebase_account=api-sample@service.bytebase.com
   export bytebase_password=bbs_************ilcLVG
   bytebase_token=$(curl -v ${bytebase_url}/v1/auth/login \
      --data-raw '{"email":"'${bytebase_account}'","password":"'${bytebase_password}'","web":true}' \
      --compressed 2>&1 | grep token | grep -o 'access-token=[^;]*;' | grep -o '[^;]*' | sed 's/access-token=//g; s/;//g')
   echo $bytebase_token
   ```

## Configure SQL Review Policies

1. Continue following the `README.md` to run the scripts.

   ```bash
   curl --request PATCH "${bytebase_url}/v1/reviewConfigs/basic?allow_missing=true&update_mask=rules" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @policy/basic.json

   curl --request PATCH "${bytebase_url}/v1/reviewConfigs/advanced?allow_missing=true&update_mask=rules" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @policy/advanced.json
   ```

1. In the Bytebase console, navigate to **CI/CD > SQL Review** to see the applied SQL review rules. You may click **Edit** to change the rules.
   ![sql-review-config](/content/docs/tutorials/api-sql-review/sql-review-config.webp)

## Attach SQL Review Policies to Resources

We'll apply these SQL review rules to `environments` or `projects`. Project-level rules take precedence over environment-level rules.

1. Run these command in 'README.md' of the repo to apply the SQL review rules to environments.

   ```bash
   curl --request PATCH "${bytebase_url}/v1/environments/test/policies/tag?allow_missing=true&update_mask=payload" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @binding/environments/test.json

   curl --request PATCH "${bytebase_url}/v1/environments/prod/policies/tag?allow_missing=true&update_mask=payload" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @binding/environments/prod.json
   ```

1. Continue with the `README.md` to apply the SQL review rules to projects.

   ```bash
   curl --request PATCH "${bytebase_url}/v1/projects/project-sample/policies/tag?allow_missing=true&update_mask=payload" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @binding/projects/project-sample.json
   ```

1. On the **CI/CD > SQL Review** page, you will see the SQL review rules are applied to environments and projects.
   ![sql-review-config-apply](/content/docs/tutorials/api-sql-review/sql-review-config-apply.webp)

1. Go to **Environments** page, click **Test** environment to see the applied SQL review rules.
   ![sql-review-env](/content/docs/tutorials/api-sql-review/sql-review-env.webp)

1. Go to `Sample Project` page, click **Setting** on the left sidebar to see the applied the SQL review rules.
   ![bb-project-setting](/content/docs/tutorials/api-sql-review/bb-project-setting.webp)

1. To detach SQL review policies from environments, use the following commands:

   ```bash
   curl --request DELETE ${bytebase_url}/v1/environments/test/policies/tag \
      --header 'Authorization: Bearer '${bytebase_token}

   curl --request DELETE ${bytebase_url}/v1/environments/prod/policies/tag \
      --header 'Authorization: Bearer '${bytebase_token}
   ```

   Similarly as to detach from projects:

   ```bash
   curl --request DELETE ${bytebase_url}/v1/projects/project-sample/policies/tag \
      --header 'Authorization: Bearer '${bytebase_token}
   ```

1. To delete the SQL review rules, use the following commands:

   ```bash
   curl --request DELETE ${bytebase_url}/v1/reviewConfigs/basic \
      --header 'Authorization: Bearer '${bytebase_token}

   curl --request DELETE ${bytebase_url}/v1/reviewConfigs/advanced \
      --header 'Authorization: Bearer '${bytebase_token}
   ```

## Summary

Congratulations! You can now codify SQL review rules using the Bytebase API, in addition to the Bytebase GUI, making SQL review policy as code a reality.
