---
title: GitHub.com
---

## Prerequisites

- You should be the **Workspace Owner** to be able to see the **GitOps** sidebar item and add Git Provider.
- You should have a repository created on GitHub.com.

## Step 1 - Setting up

Go to **Settings** from the top nav bar, select **GitOps** under **Workspace**, and then click **Add a Git provider**.

![add-git-provider](/docs/vcs-integration/add-git-provider/add-git-provider.webp)

Both the instance URL and Display name are pre-populated for you.

![add-git-provider-steps](/docs/vcs-integration/add-git-provider/add-git-provider-github-com-step1.webp)

## Step 2 - OAuth application info

<HintBlock type="warning">

In this step, you need to register "Bytebase" as a [GitHub organization-wide OAuth application](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app). This can only be done by an **organization admin on GitHub.com.** If you are not, you will need to ask the admin to follow [**Step 2.1** ](#step-21---register-github-organization-wide-oauth-application-performed-by-organization-admin) to register the application and provide the Client ID and Client secret. Then you may continue onwards from [**Step 2.2**](#step-22---verify-setup).

</HintBlock>

### Step 2.1 - Register GitHub organization-wide OAuth application (performed by organization admin)

Login as an organization admin user to the GitHub.com. The account must be an organization admin of the GitHub organization (able to access the organiztion **Settings** page):

![github-admin-settings](/docs/vcs-integration/add-git-provider/github-admin-settings.webp)

Go to "**Developer settings > OAuth Apps**" from the sidebar, then click "**New application**" button.

![vcs-github-step](/docs/vcs-integration/add-git-provider/vcs-github-step1.webp)

Fill in the form with the provided info on the Bytebase setup wizard.

![vcs-github-step](/docs/vcs-integration/add-git-provider/vcs-github-step2.webp)

Register info:

- Application name: can be other names than "Bytebase", as long as the organization admin can identify this application is for "Bytebase" later
- Homepage URL: can be other URLs than "https://bytebase.com"
- Authorization callback URL: begins with the **host:port** where the Bytebase console is running, and followed by **/oauth/callback**. This is the URI GitHub uses to callback Bytebase during the OAuth flow

Click the "**Register application**" button after filling the info on GitHub.com and you will see a created application, then click on "**Generate a new client secret**" to generate a new client secret:

![vcs-github-step](/docs/vcs-integration/add-git-provider/vcs-github-step3.webp)

### Step 2.2 - Verify setup

Fill in the **Application ID** and **Secret** onto the corresponding fields on the Bytebase setup wizard:

![vcs-github-step](/docs/vcs-integration/add-git-provider/vcs-github-step4.webp)

After you click "**Next**", Bytebase will kick off an OAuth flow to verify the setup. If you are not currently logged on GitHub.com. You will be prompted to login to complete the OAuth.

<HintBlock type="info">

If you get an error in the OAuth popup window. Please double-check the following info:

1. The "Authorization callback URL" of the registered GitHub OAuth application matches exactly to the "Authorization callback URL" shown on the Bytebase wizard.
2. The "Client ID" and "Client secret" of the registered GitHub OAuth application matches exactly to the filled "Application ID" and "Secret" on the Bytebase wizard.

</HintBlock>

## Step 3 - Confirm and add

When everything is setup properly, you will be informed that the setup is correct. Click "**Confirm and add**".

![vcs-github-step](/docs/vcs-integration/add-git-provider/vcs-github-step5.webp)

Now you have successfully added a Git provider, developers can now link their Bytebase projects with one of their owned repositories from this Git provider.
