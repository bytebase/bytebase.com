---
title: Data Classification
feature_name: DATA_MASKING
---

Data classification allows you to classify columns and apply masking levels to the classified columns globally.

![overview](/content/docs/security/data-classification/classification-overview.webp)

In the above example, column `first_name` and `last_name` will be applied `Partial Masking`, because:

- Column `first_name` and `last_name` are classified as `Contact Info`.
- `Contact Info` corresponds to `security level 2`.
- `Security level 2` applies `Partial Masking`.

## Step 1 - Define Classification

![definition](/content/docs/security/data-classification/classification-definition.webp)

You upload a JSON file containing the classification definition. The definition contains 2 sections:

1. Security levels. Usually you define 3 ~ 5 levels.
2. Classes. You can define multi-level classes. You assign a security level to each leaf class.

### Simple Classification

This is a [simple classification](/content/docs/security/data-classification/classification-simple.json) showing the structure:

1. There are 2 security levels.
1. There are 2 top classes. Class 1 contains 4 sub-classes. Class 2 contains 2 sub-classes. Each subclass (leaf node) is assigned a security level.

```json
{
  "title": "Classification Example",
  "levels": [
    {
      "id": "1",
      "title": "Level 1",
      "description": ""
    },
    {
      "id": "2",
      "title": "Level 2",
      "description": ""
    }
  ],
  "classifications": [
    {
      "id": "1",
      "title": "Basic",
      "description": ""
    },
    {
      "id": "1-1",
      "title": "Basic",
      "description": "",
      "levelId": "1"
    },
    {
      "id": "1-2",
      "title": "Assert",
      "description": "",
      "levelId": "1"
    },
    {
      "id": "1-3",
      "title": "Contact",
      "description": "",
      "levelId": "2"
    },
    {
      "id": "1-4",
      "title": "Health",
      "description": "",
      "levelId": "2"
    },
    {
      "id": "2",
      "title": "Relationship",
      "description": ""
    },
    {
      "id": "2-1",
      "title": "Social",
      "description": "",
      "levelId": "1"
    },
    {
      "id": "2-2",
      "title": "Business",
      "description": "",
      "levelId": "1"
    }
  ]
}
```

### Financial Industry Classification

A comprehensive data classification ([English](/content/docs/security/data-classification/classification-financial-industry-en.json), [Chinese](/content/docs/security/data-classification/classification-financial-industry-zh.json)) for the financial industry. It contains:

- 5 security levels.
- 14 top-categories.
- 300+ sub-categories.

## Step 2 - Configure Global Masking Policy

![global](/content/docs/security/data-classification/classification-global.webp)

From the [Global Masking Policy](../global-masking-rule), you can define the masking level for each classification level.

## Step 3 - Classify Column

### Manual Classification

![classify-manual](/content/docs/security/data-classification/classify-manual.webp)

Go to the column definition and set the classification.

### Comment Classification

![classify-from-comment](/content/docs/security/data-classification/classify-from-comment.webp)

If you turn on `Sync classification from comment`, then the column classification is derived from the comment.
If the column format follows `{classification id}-{comment}` such as `1-4-2-blabla`, then Bytebase will extract
`1-4-2` as the classification id and assigns the column classification accordingly.

## Sync Classification from External Service

If you have a centralized security platform / data catalog service to manage the classification, then you can push
the classification to Bytebase via [API](https://api.bytebase.com/#tag/settingservice).
