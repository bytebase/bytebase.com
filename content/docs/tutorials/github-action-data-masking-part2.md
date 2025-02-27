---
title: 'Data Masking with GitHub Actions Part 2 - Column Masking and Masking Exemption'
author: Adela
updated_at: 2025/01/17 18:00
tags: Tutorial
integrations: API, GitHub
level: Advanced
estimated_time: '30 mins'
description: 'Learn how to automate column masking and masking exemption using GitHub Actions and Bytebase API'
---

<IncludeBlock url="/docs/share/tutorials/api-preface"></IncludeBlock>

In the [previous tutorial](/docs/tutorials/github-action-data-masking-part1), you learned how to set up a GitHub Action that utilizes the Bytebase API to define semantic types and global masking rule. In this tutorial, we will explore how to apply column masking and masking exemption.

---

This is Part 2 of our tutorial series on implementing automated database masking using GitHub Actions:

- Part 1: [Semantic Type and Global Masking Rule](/docs/tutorials/github-action-data-masking-part1)
- Part 2: Column Masking and Masking Exemption (this one)
- Part 3: [Data Classification](/docs/tutorials/github-action-data-masking-part3)
- Part 4: Data export with masking (TBD)

## Overview

In this tutorial, you'll learn how to automate column masking and masking exemption using GitHub Actions and the Bytebase API. This integration allows you to:

- Manage data masking rules as code
- Automatically apply masking policies when PRs are merged

Here is [a merged pull request](https://github.com/bytebase/database-security-github-actions-example/pull/81) as an example.

<HintBlock type="info">

The complete code for this tutorial is available at: [database-security-github-actions-example](https://github.com/bytebase/database-security-github-actions-example)

</HintBlock>

This tutorial skips the setup part, if you haven't set up the Bytebase and GitHub Action, please follow **Setup Instructions** section in the [previous tutorial](/docs/tutorials/github-action-data-masking-part1).

## Column Masking

[Column Masking](/docs/security/data-masking/column-masking/) lets you specify table columns different semantic type to mask the data differently.

### In Bytebase Console

Go to a database page, then pick a table, you can specify semantic type by clicking pen icon on table detail page.

![bb-column-masking](/content/docs/tutorials/github-action-data-masking-part2/bb-column-masking.webp)

### In GitHub Workflow

Find the step `Apply column masking`, which will apply the column masking to the database via API. First it will parse all the column masking files and then do a loop to apply the column masking to the database one by one. The code it calls Bytebase API is as follows:

```bash
response=$(curl -s -w "\n%{http_code}" --request PATCH "${BYTEBASE_API_URL}/instances/${INSTANCE_NAME}/databases/${DATABASE_NAME}/catalog" \
   --header "Authorization: Bearer ${BYTEBASE_TOKEN}" \
   --header "Content-Type: application/json" \
   --data @"$CHANGED_FILE")
```

By changing file `masking/databases/**/**/database-catalog.json`, create a PR and then merge, the change will be applied.

Log in Bytebase console, at the workspace level, go to the database page, you can see the column semantic type is applied.

## Masking Exemption

[Masking Exemption](/docs/security/data-masking/masking-exemption/) lets you exempt users from data masking and see the unmasked data.

### In Bytebase Console

Go to a project page, then click **Manage > Masking Exemptions**, you can grant masking exemption to the database.

![bb-grant-exemption](/content/docs/tutorials/github-action-data-masking-part2/bb-grant-exemption.webp)

### In GitHub Workflow

Find the step `Apply masking exception`, which will apply the masking exception to the database and the process is similar, the code it calls Bytebase API is as follows:

```bash
response=$(curl -s -w "\n%{http_code}" --request PATCH "${BYTEBASE_API_URL}/projects/${PROJECT_NAME}/policies/masking_exception?allow_missing=true&update_mask=payload" \
   --header "Authorization: Bearer ${BYTEBASE_TOKEN}" \
   --header "Content-Type: application/json" \
   --data @"$CHANGED_FILE")
```

By changing file `masking/projects/**/masking-exception.json`, create a PR and then merge, the change will be applied.

Log in Bytebase console, go to the project `Sample Project`, click **Manage > Masking Exemptions**, you can see the masking exemption is applied.

<DocLinkBlock url="/docs/tutorials/github-action-data-masking-part3" title="Next Step: Data Classification"></DocLinkBlock>
