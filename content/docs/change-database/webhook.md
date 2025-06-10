---
title: Webhook
---

User can configure project-level webhooks to let Bytebase post messages to the configured webhook endpoint upon various events.

![bb-project-webhooks](/content/docs/change-database/webhook/bb-project-webhooks.webp)

## Supported events

- `Issue creation` - Post message when issue belonging to the configured project has been created.
- `Issue status change` - Post message when the status of the issue belonging to the configured project has been changed.
- `Issue stage status change` - Post message when issue's enclosing stage status has been changed.
- `Issue task status change` - Post message when issue's enclosing task status has been changed.
- `Issue info change` - Post message when issue's basic info such as assignee, title, description has been changed.
- `Issue comment creation` - Post message when new comment added to the issue.

The following events support sending direct messages/notifications to related users, make sure you have:

1. enabled the `Enable direct messages` option to enable this feature.
1. configured the `IM` integration to send messages to related users.

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

#### Configure sending direct messages to related users

1. Go to [https://open-dev.dingtalk.com/](https://open-dev.dingtalk.com/).
1. Select **Application Development**, click **Create Application**.
1. Select **Credentials and Basic Information** on the left sidebar. Obtain the **Client ID** and **Client Secret**.
1. Select **Permission Management**, grant the following permissions:
   - `qyapi_get_member_by_mobile`
   - `qyapi_robot_sendmsg`
1. Select **Add Application Capability**, add the **Robot** capability. Configure the robot, and for **Message receiving mode** select `Stream mode`. In "Robot Configuration", click **Copy RobotCode** to obtain the **Robot Code**. Publish the robot.
1. Select **Version Management and Release**. Click **Create New Version**. Fill in the relevant information, then **Save** and **Directly Publish**.
1. Go back to Bytebase and fill **Client ID**, **Client Secret** and **Robot Code** fields under **Integration > IM**.
1. Go to **Integration > Webhooks** in a project, add a webhook, check all the events you want to send direct messages, and click **Create**.

<HintBlock type="info">

DingTalk allows to specify a list of keywords in the [security setting](https://developers.dingtalk.com/document/robots/customize-robot-security-settings) to protect webhook endpoint. You can add "Bytebase" to that keyword list.

</HintBlock>

### Feishu (Lark)

[Official guide](https://www.feishu.cn/hc/zh-CN/articles/360024984973)

<HintBlock type="info">

Feishu (Lark) allows to specify a list of keywords in the [security setting](https://www.feishu.cn/hc/zh-CN/articles/360024984973#lineguid-RahdJr) to protect webhook endpoint. You can add "Bytebase" to that keyword list.

</HintBlock>

#### Configure sending direct notifications to related users

1. Go to [https://open.feishu.cn/app](https://open.feishu.cn/app).
1. Click **Create Custom App**, fill the form and click **Create**.
1. Click **Add Features** on the left sidebar, add the **Bot** feature.
1. Click **Permissions & Scopes** on the left sidebar, find and add the following permissions:
   - `contact:user.id:readonly`
   - `im:message:send_as_bot`
1. Click **Create Version**.
1. Configure [availability](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/availability).
1. Go back to Bytebase and fill **App Id** and **App Secret** fields under **Integration > IM**.
1. Go to **Integration > Webhooks** in a project, add a webhook, check all the events you want to send direct messages, and click **Create**.

### WeCom

WeCom does not provide its own official guide. Please follow this similar [setup](https://intl.cloud.tencent.com/zh/document/product/614/39581) from Tencent Cloud instead.

#### Configure sending direct messages to related users

1. Go to [https://work.weixin.qq.com/wework_admin/frame#apps](https://work.weixin.qq.com/wework_admin/frame#apps).
1. Click the tab **My Company**, and then you can find **Company ID** in the **Company Information**.
1. Click the tab **App Management**, and choose **Create an app** under **Self-built**.
1. Open the app,
   1. Find **AgentId** and **Secret**.
   1. Configure **Allowed users**.
   1. Configure **Company's Trusted IP** to your Bytebase instance IP.
1. Make sure the user's email in Bytebase is the same as the user's email (not External account) in WeCom.
1. Go back to Bytebase and fill **Corp Id**, **Agent Id** and **Secret** fields under **Integration > IM**.
1. Go to **Integration > Webhooks** in a project, add a webhook, check all the events you want to send direct messages, and click **Create**.
