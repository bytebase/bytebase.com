---
title: External Approval
---

Users can configure Bytebase issues to be approved by external systems. Feishu (Lark) is the only supported external systems at the moment, but stay tuned for more.

<HintBlock type="info">

Bytebase will approve the **whole stage of tasks** instead of a single task if it is approved on the IM side.

</HintBlock>

## Setup Feishu Custom App

Users should create a custom App, granting it necessary permissions, enabling it and obtaining the Application ID and Secret.

### Step 1 - Create a custom app

Create a Custom App at [Feishu Open Platform](https://open.feishu.cn/app).

Fill in App Name and Description such as Bytebase Approval.

![feishu app creation page](/docs/external-approval-feishu-create.webp)

### Step 2 - Upload icon

![Bytebase logo icon](/docs/logo-icon.svg)

In the General info section of Credentials & Basic Info page, add the above Bytebase icon.

![feishu app upload icon](/docs/external-approval-feishu-icon.webp)

### Step 3 - Enable bot

In the Bot page of Features, click "Enable bot".

![feishu app features bot page, with "Enable bot" highlighted](/docs/external-approval-feishu-bot.webp)

### Step 4 - Grant permissions

In the Manage scopes section of Permissions & Scopes page, add the following scopes.

- approval:approval (View, create, update, and delete info of Approval app).
- approval:approval:readonly (Access Approval).
- contact:user.id:readonly (Obtain user ID via email or mobile number).

![feishu app permission page](/docs/external-approval-feishu-permission.webp)

<HintBlock type="warning">

Make sure that you have added all three scopes before moving on. In particular, you must add both "approval:approval" and "approval:approval:readonly".

</HintBlock>

### Step 5 - Enable app

In the Version Management & Release page of App Release, create a Version.

![feishu app release page](/docs/external-approval-feishu-enable-1.webp)

You can use 1.0.0 for App version and set availability to members who use Bytebase.

![feishu app release page version details](/docs/external-approval-feishu-enable-2.webp)

Set the availability and select those who use Bytebase.

![set availability on feishu app release page ](/docs/external-approval-feishu-availability.webp)

Submit for release.

![feishu app release submission page](/docs/external-approval-feishu-enable-3.webp)

### Step 6 - Wait for approval

Ask your **organization administrator** to approve the custom application in [Workspace / App review](https://feishu.cn/admin/appCenter/audit).

Move to the next step when you see the app status is **"Enabled"**.
![In feishu app page, you can see that the app is activated](/docs/external-approval-feishu-enable-4.webp)

### Step 7 - Obtain credentials

Get the **App ID** and **App Secret** in the General info section of Credentials & Basic Info page.

![feishu app credential page](/docs/external-approval-feishu-credential.webp)

## Setup Bytebase

<HintBlock type="warning">

Bytebase uses account emails to find users at Feishu.

Specifically, the issue assignee must have an **identical** email at Feishu to receive Approval requests. In Feishu Approvals, Bytebase bot will represent the issue creator if she can't be found at Feishu.

</HintBlock>

![external approval bytebase setting page](/docs/external-approval-bytebase-setting.webp)

1. Go to Bytebase Settings, click on IM Integration.
1. Fill in Application ID and Secret from the previous section. Click on Enable and Create button.

## How to Use

### UI workflow

The issue creator needs to click on the [bell button](/docs/change-database/change-workflow/issue-need-attention) near the assignee to send the Feishu approval request.

![issue detail page with the bell icon near the assignee highlighted](/docs/external-approval-feishu-bell.webp)

### GitOps workflow

The Feishu approval is sent automatically when either of the following happens:

- Issue arrives at a new stage.
- Issue assignee has changed.
- Task SQL statement has changed.
