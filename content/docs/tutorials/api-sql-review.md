---
title: Configure SQL Review Rules with Bytebase API
author: Ningjing
updated_at: 2024/11/12 18:00
tags: Tutorial
integrations: General, API
level: Advanced
estimated_time: '40 mins'
description: 'Learn how to use the Bytebase API to configure SQL review rules in Bytebase'
---

Bytebase is a database DevOps and CI/CD tool designed for developers, DBAs, and platform engineering teams. While it offers an intuitive GUI for managing database schema changes and access control, some teams may want to integrate Bytebase into their existing DevOps platforms using the [Bytebase API](/docs/api/overview/).

This tutorial will show you how to configure SQL review rules with Bytebase API. With this method, you can prepare your SQL review rules as code in your repository and let the DBAs(or platform engineering team) apply them to Bytebase when needed.

<HintBlock type="info">

This tutorial code repository is at https://github.com/bytebase/api-example/tree/main/sql-review

</HintBlock>

## Prerequisites

1. [Docker](https://www.docker.com/) installed
1. Node.js >= v18

## Start Bytebase

<IncludeBlock url="/docs/share/tutorials/start-bytebase"></IncludeBlock>

## Create Service Account

<IncludeBlock url="/docs/share/tutorials/create-service-account"></IncludeBlock>

## Run Scripts in Terminal

### Generate the Token

1. Go to [Bytebase API Example
   repo](https://github.com/bytebase/api-example) and clone it.

1. Go to subfolder `sql-review`, and follow the instructions in the `README.md` to run the scripts. replace the `bytebase_url`, `bytebase_account`, `bytebase_password` with your own values. Then you will get a `bytebase_token` looks like `ey....9V8s`.

   ```bash
      export bytebase_url=http://localhost:8080
      export bytebase_account=api-sample@service.bytebase.com
      export bytebase_password=bbs_xxxxxxxxxxxxxilcLVG
      bytebase_token=$(curl -v ${bytebase_url}/v1/auth/login \
            --data-raw '{"email":"'${bytebase_account}'","password":"'${bytebase_password}'","web":true}' \
            --compressed 2>&1 | grep token | grep -o 'access-token=[^;]*;' | grep -o '[^;]*' | sed 's/access-token=//g; s/;//g')
      echo $bytebase_token
   ```

### Configure SQL Review Policies

1. Continue to follow the instructions in the `README.md` to run the scripts.

   ```bash
      curl --request PATCH ${bytebase_url}/v1/reviewConfigs/basic \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @policy/basic.json
      
      curl --request PATCH ${bytebase_url}/v1/reviewConfigs/advanced \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @policy/advanced.json
   ```

1. Go to Bytebase console, navigate to **CI/CD > SQL Review**, you will see the SQL review rules are applied. You may click **Edit** to change the rules.
   ![bb-sql-review-config](/content/docs/tutorials/api-sql-review/bb-sql-review-config.webp)

1. You can also run the following command to delete the SQL review rules.

   ```bash
      curl --request PATCH "${bytebase_url}/v1/reviewConfigs/basic?allow_missing=true&update_mask=rules" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @policy/basic.json

      curl --request PATCH "${bytebase_url}/v1/reviewConfigs/advanced?allow_missing=true&update_mask=rules" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @policy/advanced.json
   ```

### Apply SQL Review Policies to Resources

You may notice that the SQL review rules are not applied to any resources yet from the above screenshot. In Bytebase, the SQL review rules can be applied to the `environments` or `projects`. Project level rules has higher priority than environment level rules.

1. Follow the instructions in the `README.md` to run the scripts which will apply the SQL review rules to the corresponding environments.

   ```bash
      curl --request PATCH "${bytebase_url}/v1/environments/test/policies/tag?allow_missing=true&update_mask=payload" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @binding/environments/test.json

      curl --request PATCH "${bytebase_url}/v1/environments/prod/policies/tag?allow_missing=true&update_mask=payload" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @binding/environments/prod.json
   ```

1. Continue to run the scripts in the `README.md` to apply the SQL review rules to the projects.

   ```bash
      curl --request PATCH "${bytebase_url}/v1/projects/project-sample/policies/tag?allow_missing=true&update_mask=payload" \
      --header 'Authorization: Bearer '${bytebase_token} \
      --data @binding/projects/project-sample.json
   ```

1. Go to **CI/CD > SQL Review** page, you will see the SQL review rules are applied to environments and projects.
   ![bb-sql-review-config-rsc](/content/docs/tutorials/api-sql-review/bb-sql-review-config-rsc.webp)

1. Go to **Environments** page, click **Test** environment, you will see the SQL review rules are applied.
   ![bb-env](/content/docs/tutorials/api-sql-review/bb-env.webp)

1. Go to `Sample Project` page, click **Setting** on the left sidebar, you will see the SQL review rules are applied.
   ![bb-project-setting](/content/docs/tutorials/api-sql-review/bb-project-setting.webp)

1. If you want to delete the SQL review rules, you can run the following commands: environments and projects.

   ```bash
      curl --request DELETE ${bytebase_url}/v1/environments/test/policies/tag \
      --header 'Authorization: Bearer '${bytebase_token}

      curl --request DELETE ${bytebase_url}/v1/environments/prod/policies/tag \
      --header 'Authorization: Bearer '${bytebase_token}
   ```

   ```bash
      curl --request DELETE ${bytebase_url}/v1/projects/project-sample/policies/tag \
    --header 'Authorization: Bearer '${bytebase_token}
   ```

## Summary

Congratulations! From now on, besides using the Bytebase GUI to configure SQL review rules, you can also use the Bytebase API to do so. Which makes SQL review policy as code a reality.
