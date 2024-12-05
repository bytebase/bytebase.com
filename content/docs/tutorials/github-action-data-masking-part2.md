---
title: 'Applying Data Masking with GitHub Actions - Part 2'
author: Ningjing
updated_at: 2024/11/25 18:00
tags: Tutorial
integrations: General, API
level: Advanced
estimated_time: '30 mins'
description: 'Learn how to automate database masking algorithm and semantic types using GitHub Actions and Bytebase API'
---

<IncludeBlock url="/docs/share/tutorials/api-preface"></IncludeBlock>

In the [previous tutorial](/docs/tutorials/github-action-data-masking-part1), you learned how to set up a GitHub Action that utilizes the Bytebase API to define data masking policies. In this tutorial, we will explore how to customize both the masking algorithm and semantic types.

---

This is Part 2 of our tutorial series on implementing automated database masking using GitHub Actions:

- Part 1: [Column masking and masking exception with GitHub Actions](/docs/tutorials/github-action-data-masking-part1)
- Part 2: Masking Algorithm with GitHub Actions(this one)
- Part 3: [Data Classification and Global Masking with GitHub Actions](/docs/tutorials/github-action-data-masking-part3)

## Overview

In this tutorial, you'll learn how to automate database masking algorithms and semantic types using GitHub Actions and the Bytebase API. This integration allows you to:

- Manage data masking rules as code
- Automatically apply masking policies when PRs are merged

Here is [a merged pull request](https://github.com/bytebase/database-security-github-actions-example/pull/18) as an example.

<HintBlock type="info">

The complete code for this tutorial is available at: [database-security-github-actions-example](https://github.com/bytebase/database-security-github-actions-example)

</HintBlock>

This tutorial skips the setup part, if you haven't set up the Bytebase and GitHub Action, please follow **Setup Instructions** section in the [previous tutorial](/docs/tutorials/github-action-data-masking-part1).

## Masking Algorithm

You may customize your own [data masking algorithm](/docs/security/data-masking/masking-algorithm/) with the help of a predefined masking type, such as Full mask, Range mask, MD5 mask and Inner/Outer mask.

### In Bytebase console

Go to **Data Access > Data Masking**, click **Masking Algorithm** and click **Add**. You can create a new masking algorithm with a name and description, and later it can be used in the definition of semantic types.

   ![bb-masking-algorithm](/content/docs/tutorials/github-action-data-masking-part2/bb-masking-algorithm.webp)

### In GitHub Workflow

In the GitHub workflow `bb-masking-2.yml`, find the step `Apply masking algorithm`, which will apply the masking algorithm to the database via API. All the masking algorithms should be defined in one file in the root directory of `masking/masking-algorithm.json`. The code it calls Bytebase API is as follows:

```bash
response=$(curl -s -w "\n%{http_code}" --request PATCH "${BYTEBASE_API_URL}/settings/bb.workspace.masking-algorithm?allow_missing=true" \
--header "Authorization: Bearer ${BYTEBASE_TOKEN}" \
--header "Content-Type: application/json" \
--data @"$CHANGED_FILE")
```

By changing file `masking/masking-algorithm.json`, you can apply the masking algorithm to the database. Go to Bytebase console, click **Data Access > Data Masking**, go to **Masking Algorithm** page, you can see the masking algorithm is applied to the database.

## Semantic Type

You may define [semantic types](/docs/security/data-masking/semantic-types/) and apply them to columns of different tables. Columns with the same semantic type will be masked with the same masking algorithm. For example, you may define a semantic type `mobile` and apply it to all the columns of phone number. Then you can define a masking algorithm `range 4-10` for the partial level masking for semantic type `mobile`.

### In Bytebase Console

Go to **Data Access > Data Masking**, click **Semantic Types** and click **Add**. You can create a new semantic type with a name and description, and select the masking algorithm.

   ![bb-semantic-types](/content/docs/tutorials/github-action-data-masking-part2/bb-semantic-types.webp)

### In GitHub Workflow

Find the step `Apply semantic type`, which will apply the semantic type to the database via API. All the masking algorithms should be defined in one file in the root directory as `masking/semantic-type.json`. The code it calls Bytebase API is as follows:

```bash
response=$(curl -s -w "\n%{http_code}" --request PATCH "${BYTEBASE_API_URL}/settings/bb.workspace.semantic-types?allow_missing=true" \
   --header "Authorization: Bearer ${BYTEBASE_TOKEN}" \
   --header "Content-Type: application/json" \
   --data @"$CHANGED_FILE")
```

By changing file `masking/semantic-type.json`, you can apply the semantic type to the database. Go to Bytebase console, click **Data Access > Data Masking**, go to **Semantic Types** page, you can see the semantic type is applied to the database.

## Next Steps

Now you have successfully applied data masking algorithm and semantic type using GitHub Actions and Bytebase API. In the next part of this tutorial, you'll learn how to use data classification and global masking with GitHub Actions. Stay tuned!
