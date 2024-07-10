---
title: Data Classification
---

[Data Classification](/docs/security/data-masking/data-classification/) allows you to classify columns
and manage masking policy for many columns by controlling only a small number of classifications.

You can call Bytebase API to configure data classification.

## Configure Classification

|          |                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint | [PATCH /v1/settings/bb.workspace.data-classification](https://api.bytebase.com/#tag/settingservice/PATCH/v1/settings/{setting}) |
| Request  | https://api.bytebase.com/v1/#bytebase.v1.UpdateSettingRequest                                                                   |
| Response | https://api.bytebase.com/v1/#bytebase.v1.Setting                                                                                |

```shell
curl --request PATCH ${bytebase_url}/v1/settings/bb.workspace.data-classification \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data '{
  "name": "bb.workspace.data-classification",
  "value": {
        "data_classification_setting_value": {
            "configs": [
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
                    "classification": {
                        "1": {
                            "id": "1",
                            "title": "Basic",
                            "description": ""
                        },
                        "1-1": {
                            "id": "1-1",
                            "title": "Basic",
                            "description": "",
                            "levelId": "1"
                        },
                        "1-2": {
                            "id": "1-2",
                            "title": "Assert",
                            "description": "",
                            "levelId": "1"
                        },
                        "1-3": {
                            "id": "1-3",
                            "title": "Contact",
                            "description": "",
                            "levelId": "2"
                        },
                        "1-4": {
                            "id": "1-4",
                            "title": "Health",
                            "description": "",
                            "levelId": "2"
                        },
                        "2": {
                            "id": "2",
                            "title": "Relationship",
                            "description": ""
                        },
                        "2-1": {
                            "id": "2-1",
                            "title": "Social",
                            "description": "",
                            "levelId": "1"
                        },
                        "2-2": {
                            "id": "2-2",
                            "title": "Business",
                            "description": "",
                            "levelId": "1"
                        }
                    }
                }
            ]
        }
    }
}'
```

## Classify All Columns and Tables in a Database

|          |                                                                                                                                                                                                                   |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint | [PATCH /v1/instances/\{instance\}/databases/\{database\}/metadata?update_mask=schema_configs​](https://api.bytebase.com/#tag/databaseservice/PATCH/v1/instances/%7Binstance%7D/databases/%7Bdatabase%7D/metadata) |
| Request  | https://api.bytebase.com/v1/#bytebase.v1.UpdateDatabaseMetadataRequest                                                                                                                                            |
| Response | https://api.bytebase.com/v1/#bytebase.v1.DatabaseMetadata                                                                                                                                                         |

<HintBlock type="info">

The API only supports to classify **an entire database at once**. You need to pass the entire schema configs for the target database. The passed schema configs will overwrite
the existing schema configs.

</HintBlock>

```shell
curl --request PATCH ${bytebase_url}/v1/instances/prod-sample-instance/databases/hr_prod/metadata?update_mask=schema_configs \
  --header 'Authorization: Bearer '${bytebase_token} \
  --data '{
    "name": "instances/prod-sample-instance/databases/hr_prod/metadata",
    "schemaConfigs": [
        {
            "name": "public",
            "tableConfigs": [
                {
                    "name": "department",
                    "columnConfigs": [
                        {
                            "name": "dept_no",
                            "semanticTypeId": "",
                            "labels": {},
                            "classificationId": "1-1"
                        },
                        {
                            "name": "dept_name",
                            "semanticTypeId": "",
                            "labels": {},
                            "classificationId": "1-2"
                        }
                    ]
                },
                {
                    "name": "dept_emp",
                    "columnConfigs": [
                        {
                            "name": "dept_no",
                            "semanticTypeId": "",
                            "labels": {},
                            "classificationId": "1-1"
                        }
                    ]
                }
            ]
        }
    ]
}'

```
