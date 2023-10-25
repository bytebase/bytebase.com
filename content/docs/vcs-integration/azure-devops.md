---
title: Azure DevOps
---

<TutorialBlock url="/docs/tutorials/database-cicd-best-practice-with-azure-devops" title="The Database CI/CD Best Practice with Azure DevOps" />

## Prerequisites

- You should be the **Workspace Owner** to be able to see the **GitOps** sidebar item and add Git Provider.
- You should have an Azure account.

## Step 1 - Setting up

1. Go to **Settings** from the top nav bar, select **GitOps** under **Integration**, and then click **Add a Git provider**.
2. Choose `Azure DevOps`. Both the **Instance URL** and **Display name** are pre-populated for you.
   ![add-git-provider-step1](/content/docs/vcs-integration/add-git-provider/vcs-azure-step1.webp)

## Step 2 - OAuth application info

1. On Step 2, click **Direct link** you will be redirected to Azure DevOps to authorize Bytebase to access your Azure DevOps account.

![add-git-provider-step2](/content/docs/vcs-integration/add-git-provider/vcs-azure-step2.webp)

### Step 2.1 - Register an application

Fill in the form with the provided info on the Bytebase setup wizard.

![azure-register-application](/content/docs/vcs-integration/add-git-provider/azure-register-application.webp)

Register info:

- **Application name**: can be other names than `bb`, as long as the organization admin can identify this application is for `Bytebase` later
- **Homepage URL**: can be other URLs than `https://bytebase.com`
- **Authorization callback URL**: begins with the `host:port` where the Bytebase console is running, and followed by `/oauth/callback`. This is the URI Azure DevOps uses to callback Bytebase during the OAuth flow
- **Authorizied scopes**: Find the checkboxes for `Code (full)`, `Identity (read)`, `Project and team (read)`, `Build (read and execute)`

Click the "**Register application**" button after filling the info on Azure and you will see a created application, then click on **show** to generate a new client secret:

![azure-created-application](/content/docs/vcs-integration/add-git-provider/azure-created-application.webp)

### Step 2.2 - Verify setup

Fill in the **Application ID** and **Secret** onto the corresponding fields on the Bytebase setup wizard:

![vcs-azure-step2-filled](/content/docs/vcs-integration/add-git-provider/vcs-azure-step2-filled.webp)

After you click **Next**, Bytebase will kick off an OAuth flow to verify the setup. If you are not currently logged on Azure. You will be prompted to login to complete the OAuth.

## Step 3 - Confirm and add

When everything is setup properly, you will be informed that the setup is correct. Click **Confirm and add**.

![vcs-azure-step3-confirm](/content/docs/vcs-integration/add-git-provider/vcs-azure-step3-confirm.webp)

Now you have successfully added a Git provider, developers can now link their Bytebase projects with one of their owned repositories from this Git provider.

![vcs-azure-added](/content/docs/vcs-integration/add-git-provider/vcs-azure-added.webp)
