---
title: Bitbucket.org
---

## Prerequisites

- You should be the **Workspace Owner** to be able to see the **GitOps** sidebar item and add Git Provider.
- You should have a repository created on Bitbucket.org.

## Step 1 - Setting up

Go to **Settings** from the top nav bar, select **GitOps** under **Workspace**, and then click **Add a Git provider**.

![add-git-provider](/content/docs/vcs-integration/add-git-provider/add-git-provider.webp)

Both the instance URL and Display name are pre-populated for you.

![add-git-provider-steps](/content/docs/vcs-integration/add-git-provider/add-git-provider-bitbucket-org-step1.webp)

## Step 2 - OAuth consumer info

<HintBlock type="warning">

In this step, you need to register "Bytebase" as a [Bitbucket workspace-wide OAuth consumer](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/). This can only be done by an **workspace admin on Bitbucket.org.** If you are not, you will need to ask the admin to follow [**Step 2.1** ](#step-21---register-bitbucket-workspace-wide-oauth-consumer-performed-by-workspace-admin) to register the consumer and provide the Key and Secret. Then you may continue onwards from [**Step 2.2**](#step-22---verify-setup).

</HintBlock>

### Step 2.1 - Register Bitbucket workspace-wide OAuth consumer (performed by workspace admin)

Login as an workspace admin user to the Bitbucket.org. The account must be an workspace admin of the Bitbucket workspace (able to access the **Workspace settings** page):

![bitbucket-admin-settings](/content/docs/vcs-integration/add-git-provider/bitbucket-admin-settings.webp)

Go to **OAuth consumers** from the sidebar, then click **Add consumer** button.

![vcs-bitbucket-step](/content/docs/vcs-integration/add-git-provider/vcs-bitbucket-step1.webp)

Fill in the form with the provided info on the Bytebase setup wizard:

- **Name**: Can be other names than "Bytebase", as long as the workspace admin can identify this consumer is for "Bytebase"
- **Callback URL**: Begins with the **host:port** where the Bytebase console is running, and followed by **/oauth/callback**. This is the URI Bitbucket uses to callback Bytebase during the OAuth flow.
- **Permissions**: Account > Read, Webhooks > Read and write, Repositories > Write

Click the **Save** button after filling the info on Bitbucket.org and you will see a created consumer, along with its Key and Secret.

### Step 2.2 - Verify setup

Fill in the **Application ID** and **Secret** onto the corresponding fields on the Bytebase setup wizard:

![vcs-bitbucket-step](/content/docs/vcs-integration/add-git-provider/vcs-bitbucket-step4.webp)

After you click "**Next**", Bytebase will kick off an OAuth flow to verify the setup. If you are not currently logged on Bitbucket.org. You will be prompted to login to complete the OAuth.

<HintBlock type="info">

If you get an error in the OAuth popup window. Please double-check the following info:

1. The **Callback URL** of the registered Bitbucket OAuth consumer matches exactly to the **Callback URL** shown on the Bytebase wizard.
2. The **Key** and **Secret** of the registered Bitbucket OAuth consumer matches exactly to the filled **Application ID** and **Secret** on the Bytebase wizard.

</HintBlock>

## Step 3 - Confirm and add

When everything is setup properly, you will be informed that the setup is correct. Click "**Confirm and add**".

![vcs-bitbucket-step](/content/docs/vcs-integration/add-git-provider/vcs-bitbucket-step5.webp)

Now you have successfully added a Git provider, developers can now link their Bytebase projects with one of their owned repositories from this Git provider.
