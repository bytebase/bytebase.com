---
title: Project Webhook
---

User can configure project-level webhooks to let Bytebase post messages to the configured webhook endpoint upon various events.

![project-webhook-configure](/content/docs/change-database/webhook/project-webhook-configure.webp)

## Supported events

- `Issue creation` - Post message when issue belonging to the configured project has been created.
- `Issue status change` - Post message when the status of the issue belonging to the configured project has been changed.
- `Issue stage status change` - Post message when issue's enclosing stage status has been changed.
- `Issue task status change` - Post message when issue's enclosing task status has been changed.
- `Issue info change` - Post message when issue's basic info such as assignee, title, description has been changed.
- `Issue comment creation` - Post message when new comment added to the issue.

The following events support sending direct message to related users, you must enable the `Enable direct messages` option to enable this feature.

- `Issue approval needed` - Post message when issue needs approval.
- `Issue approved` - Post message when issue has been approved.
- `Issue rollout needed` - Post message when issue needs rollout.

## Supported webhook endpoints

### Slack

[Official guide](https://api.slack.com/messaging/webhooks)

#### Configure sending direct messages to related users

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps).
1. Click **Create New App**.
1. Choose **From an app manifest**.
1. Pick your workspace to develop the app and click **Next**.
1. Replace the existing JSON with this manifest content and click **Next**.
    ```JSON
    {
      "display_information": {
          "name": "Bytebase Bot"
      },
      "features": {
          "bot_user": {
              "display_name": "Bytebase Bot",
              "always_online": false
          }
      },
      "oauth_config": {
          "scopes": {
              "bot": [
                  "users:read",
                  "users:read.email",
                  "channels:manage",
                  "groups:write",
                  "im:write",
                  "chat:write",
                  "mpim:write"
              ]
          }
      },
      "settings": {
          "org_deploy_enabled": false,
          "socket_mode_enabled": false,
          "token_rotation_enabled": false
      }
    }
    ```

1. Click **Create**.
1. Click **Install to Workspace** and click **Allow**.
1. Go to **Features > OAuth & Permissions** and copy the **Bot User OAuth Token**.
1. Go back to Bytebase and paste the **Bot User OAuth Token** to the **Token** field under **Integration > IM**.
1. Go to **Integration > Webhooks** in a project, add a webhook, check all the events you want to send direct messages, and click **Create**.


### Discord

[Official guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

### Microsoft Teams

[Official guide](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)

### DingTalk

[Official guide](https://developers.dingtalk.com/document/robots/custom-robot-access)

<HintBlock type="info">

DingTalk allows to specify a list of keywords in the [security setting](https://developers.dingtalk.com/document/robots/customize-robot-security-settings) to protect webhook endpoint. You can add "Bytebase" to that keyword list.

</HintBlock>

### Feishu (Lark)

[Official guide](https://www.feishu.cn/hc/zh-CN/articles/360024984973)

<HintBlock type="info">

Feishu (Lark) allows to specify a list of keywords in the [security setting](https://www.feishu.cn/hc/zh-CN/articles/360024984973#lineguid-RahdJr) to protect webhook endpoint. You can add "Bytebase" to that keyword list.

</HintBlock>

### WeCom

WeCom does not provide its own official guide. Please follow this similar [setup](https://intl.cloud.tencent.com/zh/document/product/614/39581) from Tencent Cloud instead.

### Custom

Custom is used to integrate with your own services via webhook.

<HintBlock type="info">

You need to implement the webhook server yourself, it doesn't work out of the box.

</HintBlock>

**API Definition as follow:**

- **HTTP Method**

  `POST`

- **Request Header**

  | Key            | Value              | Description  |
  | -------------- | ------------------ | ------------ |
  | `Content-Type` | `application/json` | JSON content |

- **Request Body**

  | Key             | Type    | Description                                                                                                                                                                                                               |
  | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `level`         | String  | One of: <br/>&nbsp;&nbsp;`INFO`<br/>&nbsp;&nbsp;`SUCCESS`<br/>&nbsp;&nbsp;`WARN`<br/>&nbsp;&nbsp;`ERROR`                                                                                                                  |
  | `activity_type` | String  | One of: <br/>&nbsp;&nbsp;`bb.issue.create`<br/>&nbsp;&nbsp;`bb.issue.comment.create`<br/>&nbsp;&nbsp;`bb.issue.field.update`<br/>&nbsp;&nbsp;`bb.issue.status.update`<br/>&nbsp;&nbsp;`bb.pipeline.task.status.update`    |
  | `title`         | String  | Webhook title                                                                                                                                                                                                             |
  | `description`   | String  | Webhook description                                                                                                                                                                                                       |
  | `link`          | String  | Webhook link                                                                                                                                                                                                              |
  | `creator_id`    | Integer | Updater id                                                                                                                                                                                                                |
  | `creator_name`  | Integer | Updater name                                                                                                                                                                                                              |
  | `created_ts`    | Integer | Webhook create timestamp                                                                                                                                                                                                  |
  | `issue`         | Object  | Issue Object                                                                                                                                                                                                              |
  | `- id`          | Integer | Issue ID                                                                                                                                                                                                                  |
  | `- name`        | String  | Issue Name                                                                                                                                                                                                                |
  | `- status`      | String  | Issue Status, one of: <br/>&nbsp;&nbsp;`OPEN`<br/>&nbsp;&nbsp;`DONE`<br/>&nbsp;&nbsp;`CANCELED`                                                                                                                           |
  | `- type`        | String  | Issue Type, one of: <br/>&nbsp;&nbsp;`bb.issue.database.create`<br/>&nbsp;&nbsp;`bb.issue.database.schema.update`<br/>&nbsp;&nbsp;`bb.issue.database.schema.update.ghost`<br/>&nbsp;&nbsp;`bb.issue.database.data.update` |
  | `- description` | String  | Issue Description                                                                                                                                                                                                         |
  | `project`       | Object  | Project Object                                                                                                                                                                                                            |
  | `- id`          | Integer | Project ID                                                                                                                                                                                                                |
  | `- name`        | String  | Project Name                                                                                                                                                                                                              |

- **Response Body**

  | Key       | Type   | Description                         |
  | --------- | ------ | ----------------------------------- |
  | `code`    | String | Zero if success, non-zero if failed |
  | `message` | String | Some error message                  |

- **Response StatusCode**
  - 200, OK
  - Other, if any error

**Example Request Body**

```json
{
  "level": "INFO",
  "activity_type": "bb.issue.created",
  "title": "example webhook",
  "description": "example description",
  "link": "example link",
  "creator_id": 1,
  "creator_name": "Bytebase",
  "created_ts": 1651212107,
  "issue": {
    "id": 1,
    "name": "example issue",
    "status": "OPEN",
    "type": "bb.issue.database.create"
  },
  "project": {
    "id": 1,
    "name": "demo"
  }
}
```

**Example Response Body**

- Success
  ```json
  {
    "code": 0,
    "message": ""
  }
  ```
- Failed
  ```json
  {
      "code": 400
      "message": "Ops, some error occured!"
  }
  ```
