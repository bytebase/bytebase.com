---
title: GitLab.com
---

<TutorialBlock url="/docs/tutorials/database-cicd-best-practice-with-gitlab" title="The Database CI/CD Best Practice with GitLab" />

## Prerequisites

- You should be the **Workspace Owner** to be able to see the **GitOps** sidebar item and add Git Provider.
- You should have a project created in GitLab.com.

## Step 1 - Setting up

Go to **Settings** from the top nav bar, select **GitOps** under **Workspace**, and then click **Add a Git provider**.

![add-git-provider](/content/docs/vcs-integration/add-git-provider/add-git-provider.webp)

Both the instance URL and Display name are pre-populated for you.

![add-git-provider-steps](/content/docs/vcs-integration/add-git-provider/add-git-provider-gitlab-com-step1.webp)

## Step 2 - OAuth application info

<HintBlock type="warning">

In this step, you need to register "Bytebase" as a [GitLab user-owned OAuth application](https://docs.gitlab.com/ee/integration/oauth_provider.html#create-a-user-owned-application). This is the only application type
that GitLab.com supports. The user account owning the OAuth application needs to have Admin access to
any of the repositories to be linked later. Usually this account corresponds to a dedicated service user
instead of a human user.

</HintBlock>

### Step 2.1 - Register GitLab user-owned OAuth application

Go to "**Applications**" at https://gitlab.com/-/profile/applications. Fill in the form with the provided info on the Bytebase setup wizard.

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/add-git-provider-gitlab-com-step2.webp)

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/add-git-provider-gitlab-com-step3.webp)

Register info:

- Name: can be other names than "Bytebase", as long as you can identify this application is for "Bytebase" later
- Redirect URI: begins with the **host:port** where the Bytebase console is running, and followed by **/oauth/callback**. This is the URI GitLab uses to callback Bytebase during the OAuth flow
- Confidential: Yes
- Scopes: api

Click the "**Save application**" button after filling the info on GitLab and you will see a created application, like below:

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/add-git-provider-gitlab-com-step4.webp)

### Step 2.2 - Verify setup

Fill in the **Application ID** and **Secret** onto the corresponding fields on the Bytebase setup wizard:

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/add-git-provider-gitlab-com-step5.webp)

After you click "**Next**", Bytebase will kick off an OAuth flow to verify the setup. If you are not currently logged into the GitLab instance used in the setup. You will be prompted to login to complete the OAuth.

<HintBlock type="info">

If you get an error in the OAuth popup window. Please double-check the following info:

1. The Redirect URI of the registered GitLab application matches exactly to the Redirect URI shown on the Bytebase wizard.
2. The Application ID and Secret of the registered GitLab application matches exactly to
   the filled Application ID and Secret on the Bytebase wizard.

</HintBlock>

## Step 3 - Confirm and add

When everything is setup properly, you will be informed that the setup is correct. Click "**Confirm and add**".

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/add-git-provider-gitlab-com-step6.webp)

Now you have successfully added a Git provider, developers can now link their Bytebase projects with one of their owned repositories from this Git provider.

## References

1. [GitLab user-owned applications](https://docs.gitlab.com/ee/integration/oauth_provider.html#create-a-user-owned-application). This is the OAuth application type Bytebase needs to register.
