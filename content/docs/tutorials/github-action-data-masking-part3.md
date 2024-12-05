---
title: 'Applying Data Masking with GitHub Actions - Part 3'
author: Dec
updated_at: 2024/12/04 18:00
tags: Tutorial
integrations: General, API
level: Advanced
estimated_time: '30 mins'
description: 'Learn how to use data classification and global masking policy using GitHub Actions and Bytebase API'
---

<IncludeBlock url="/docs/share/tutorials/api-preface"></IncludeBlock>

In the [previous tutorial](/docs/tutorials/github-action-data-masking-part2), you learned how to customize both the masking algorithm and semantic types. In this tutorial, we will explore how to use data classification and global masking policy.

---

This is Part 3 of our tutorial series on implementing automated database masking using GitHub Actions:

- Part 1: [Column masking and masking exception with GitHub Actions](/docs/tutorials/github-action-data-masking-part1)
- Part 2: [Masking Algorithm with GitHub Actions](/docs/tutorials/github-action-data-masking-part2)
- Part 3: Data Classification and Global Masking with GitHub Actions(this one)

## Overview

In this tutorial, you'll learn how to automate data classification and global masking policy using GitHub Actions and the Bytebase API. This integration allows you to:

- Manage data classification and global masking policy as code
- Automatically apply masking policies when PRs are merged

<HintBlock type="info">

The complete code for this tutorial is available at: [database-security-github-actions-example](https://github.com/bytebase/database-security-github-actions-example)

</HintBlock>

This tutorial skips the setup part, if you haven't set up the Bytebase and GitHub Action, please follow **Setup Instructions** section in the [previous tutorial](/docs/tutorials/github-action-data-masking-part1).

## Data Classification

### In Bytebase Console

Follow [Data Classification](/docs/security/data-classification/).

### In GitHub Workflow

Find the step `Apply classification`, which will apply the classification to the database via API. All the classifications should be defined in one file in the root directory as `masking/classification.json`. The code it calls Bytebase API is as follows:

```bash
response=$(curl -s -w "\n%{http_code}" --request PATCH "${BYTEBASE_API_URL}/settings/bb.workspace.classification" \
   --header "Authorization: Bearer ${BYTEBASE_TOKEN}" \
   --header "Content-Type: application/json" \
   --data @"$CHANGED_FILE")
```

By changing file `masking/classification.json`, creating a PR and merging, you can apply the classification to the database. Go to Bytebase console, click **Data Access > Data Classification**, go to **Classification** page, you can see the classification is applied to the database.

## Global Masking Rule

### In Bytebase Console

Follow [Global Masking Rule](/docs/security/data-masking/global-masking-rule/).

### In GitHub Workflow

Find the step `Apply global masking rule`, which will apply the global masking rule to the database via API. All the global masking rules should be defined in one file in the root directory as `masking/global-masking-rule.json`. The code it calls Bytebase API is as follows:

```bash
response=$(curl -s -w "\n%{http_code}" --request PATCH "${BYTEBASE_API_URL}/settings/bb.workspace.global_masking_rule?allow_missing=true&update_mask=payload" \
   --header "Authorization: Bearer ${BYTEBASE_TOKEN}" \
   --header "Content-Type: application/json" \
   --data @"$CHANGED_FILE")
```

By changing file `masking/global-masking-rule.json`, creating a PR and merge, you can apply the global masking rule to the database. Go to Bytebase console, click **Data Access > Data Masking**, go to **Global Masking Rule** page, you can see the global masking rule is applied to the database.

## Summary

Through out this tutorial series, you have learned how to automate database masking policies, customize both the masking algorithm and semantic types, and use data classification and global masking policy using GitHub Actions and Bytebase API.