---
title: 'Data Masking with GitHub Actions Part 3 - Data Classification'
author: Ayra
updated_at: 2025/01/17 18:00
tags: Tutorial
integrations: GitHub
category: 'Data Access Control'
level: Advanced
estimated_time: '30 mins'
description: 'Learn how to use data classification using GitHub Actions and Bytebase API'
---

<IncludeBlock url="/docs/share/tutorials/api-preface"></IncludeBlock>

In the [previous tutorial](/docs/tutorials/github-action-data-masking-part2), you learned how to apply column masking and masking exemption. In this tutorial, we will explore how to use data classification.

---

This is Part 3 of our tutorial series on implementing automated database masking using GitHub Actions:

- Part 1: [Semantic Type and Global Masking Rule](/docs/tutorials/github-action-data-masking-part1)
- Part 2: [Column Masking and Masking Exemption](/docs/tutorials/github-action-data-masking-part2)
- Part 3: Data Classification (this one)

## Overview

In this tutorial, you'll learn how to automate data classification using GitHub Actions and the Bytebase API. This integration allows you to:

- Manage data classification and global masking policy as code
- Automatically apply masking policies when PRs are merged

<HintBlock type="info">

The complete code for this tutorial is available at: [example-database-security](https://github.com/bytebase/example-database-security)

</HintBlock>

This tutorial skips the setup part, if you haven't set up the Bytebase and GitHub Action, please follow **Setup Instructions** section in the [previous tutorial](/docs/tutorials/github-action-data-masking-part1).

## Data Classification

[Data Classification](/docs/security/data-masking/data-classification/) allows you to manage masking policy for many columns by controlling only a small number of classifications.

### In Bytebase Console

Go to **Data Access > Data Classification**, you can upload the classification file.

![bb-classification-definition](/content/docs/tutorials/github-action-data-masking-part3/bb-classification-definition.webp)

### In GitHub Workflow

Find the step `Apply classification`, which will apply the classification to the database via API. All the classifications should be defined in one file in the root directory as `masking/classification.json`. The code it calls Bytebase API is as follows:

```bash
response=$(curl -s -w "\n%{http_code}" --request PATCH "${BYTEBASE_API_URL}/settings/bb.workspace.classification" \
   --header "Authorization: Bearer ${BYTEBASE_TOKEN}" \
   --header "Content-Type: application/json" \
   --data @"$CHANGED_FILE")
```

By changing file `masking/data-classification.json`, creating a PR and merging, you can apply the classification. Go to Bytebase console, click **Data Access > Data Classification**, you can see the classification is applied.

Here in the github workflow, we also apply global masking rule and column masking with classification with files `masking/global-masking-rule-classification.json` and `masking/databases/test-sample-instance/hr_test/database-catalog-classification.json`.

## Summary

Through out this tutorial series, you have learned how to automate data masking semantic type, global masking rule, column masking, masking exemption and data classification using GitHub Actions and Bytebase API.
