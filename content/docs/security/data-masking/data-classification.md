---
title: Data Classification
feature_name: DATA_MASKING
---

Data classification allows you to define security levels and classifications. The classifications
can be nested. Each leaf classification will be assigned a security level.

The classification definition is defined as a JSON file and can be uploaded to Bytebase.

A simple classification definition

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

A comprehensive example for the finanical industry:

- [English](/content/docs/security/data-classification/JRT0197-en.json)
- [Chinese](/content/docs/security/data-classification/JRT0197-zh.json)
