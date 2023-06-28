---
title: External Approval
---

<EnterpriseOnlyBlock />

## External Approval Flow

In case your organization has already deployed an OA system and all requests are approved there, you
can configure an external approval flow as an approval node in the [Custom Approval](/docs/administration/custom-approval/#external-approval).

## IM Integration

<HintBlock type="warning">

Bytebase will approve the **whole stage of tasks** instead of a single task if it is approved on the IM side.

</HintBlock>

Users can configure Bytebase to send approval request to IM and to be approved directly from there.
Bytebase currently supports:

- Feishu (Lark)

The IM approval is sent when either of the following happens:

- Issue arrives at a new stage.
- Issue assignee has changed.
- Task SQL statement has changed.
- The issue creator clicks on the [bell button](/docs/change-database/change-workflow/#issue-need-attention)

![issue detail page with the bell icon near the assignee highlighted](/content/docs/administration/external-approval/external-approval-im-bell.webp)

### Feishu Setup

Users should create a custom App, granting it necessary permissions, enabling it and obtaining the Application ID and Secret.

#### Step 1 - Create a custom app

Create a Custom App at [Feishu Open Platform](https://open.feishu.cn/app).

Fill in App Name and Description such as Bytebase Approval.

![feishu app creation page](/content/docs/administration/external-approval/external-approval-feishu-create.webp)

#### Step 2 - Upload icon

![Bytebase logo icon](/content/docs/logo-icon.svg)

In the General info section of Credentials & Basic Info page, add the above Bytebase icon.

![feishu app upload icon](/content/docs/administration/external-approval/external-approval-feishu-icon.webp)

#### Step 3 - Enable bot

In the Bot page of Features, click "Enable bot".

![feishu app features bot page, with "Enable bot" highlighted](/content/docs/administration/external-approval/external-approval-feishu-bot.webp)

#### Step 4 - Grant permissions

In the Manage scopes section of Permissions & Scopes page, add the following scopes.

- approval:approval (View, create, update, and delete info of Approval app).
- approval:approval:readonly (Access Approval).
- contact:user.id:readonly (Obtain user ID via email or mobile number).

![feishu app permission page](/content/docs/administration/external-approval/external-approval-feishu-permission.webp)

<HintBlock type="warning">

Make sure that you have added all three scopes before moving on. In particular, you must add both "approval:approval" and "approval:approval:readonly".

</HintBlock>

#### Step 5 - Enable app

In the Version Management & Release page of App Release, create a Version.

![feishu app release page](/content/docs/administration/external-approval/external-approval-feishu-enable-1.webp)

You can use 1.0.0 for App version and set availability to members who use Bytebase.

![feishu app release page version details](/content/docs/administration/external-approval/external-approval-feishu-enable-2.webp)

Set the availability and select those who use Bytebase.

![set availability on feishu app release page ](/content/docs/administration/external-approval/external-approval-feishu-availability.webp)

Submit for release.

![feishu app release submission page](/content/docs/administration/external-approval/external-approval-feishu-enable-3.webp)

#### Step 6 - Wait for approval

Ask your **organization administrator** to approve the custom application in [Workspace / App review](https://feishu.cn/admin/appCenter/audit).

Move to the next step when you see the app status is **"Enabled"**.
![In feishu app page, you can see that the app is activated](/content/docs/administration/external-approval/external-approval-feishu-enable-4.webp)

#### Step 7 - Obtain credentials

Get the **App ID** and **App Secret** in the General info section of Credentials & Basic Info page.

![feishu app credential page](/content/docs/administration/external-approval/external-approval-feishu-credential.webp)

#### Step 8 - Set up Bytebase

<HintBlock type="warning">

Bytebase uses account emails to find users at Feishu.

Specifically, the issue assignee must have an **identical** email at Feishu to receive Approval requests. In Feishu Approvals, Bytebase bot will represent the issue creator if she can't be found at Feishu.

</HintBlock>

![external approval bytebase setting page](/content/docs/administration/external-approval/external-approval-bytebase-setting.webp)

1. Go to Bytebase Settings, click on IM Integration.
1. Fill in Application ID and Secret from the previous section. Click on Enable and Create button.
