---
title: Self-host GitLab EE/CE
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/51_bL7Vnqww" className="w-full" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Prerequisites

- You should be the **Workspace Owner** to be able to see the **GitOps** sidebar item and add Git Provider.
- You should have a project created in GitLab.

## Step 1 - Setting up

Go to **Settings** from the top nav bar, select **GitOps** under **Workspace**, and then click **Add a Git provider**.

![add-git-provider](/content/docs/vcs-integration/add-git-provider/add-git-provider.webp)

Fill in the URL where the GitLab instance is running.

![add-git-provider-steps](/content/docs/vcs-integration/add-git-provider/add-git-provider-step1.webp)

## Step 2 - OAuth application info

<HintBlock type="warning">

In this step, you need to register "Bytebase" as a [GitLab instance-wide OAuth application](https://docs.gitlab.com/ee/integration/oauth_provider.html#instance-wide-applications). This can only be done by a **GitLab instance admin.** If you are not, you will need to ask the admin to follow [**Step 2.1** ](#step-21---register-gitlab-instance-wide-oauth-application-performed-by-gitlab-admin)to register the application and provide the Application ID and Secret. Then you may continue onwards from [**Step 2.2**](#step-22---verify-setup).

</HintBlock>

<HintBlock type="warning">

Please make sure you are configuring the [GitLab external_url](https://docs.gitlab.com/omnibus/settings/configuration.html#configure-the-external-url-for-gitlab) correctly, the **host:port** must exactly matches the one accessed by Bytebase. It's called `external_url` because that's how external systems like Bytebase reaches the GitLab instance.

A common mistake is when a user misconfigures the port when using port forwarding. e.g. GitLab is running on port 7890, while it's exposed to the public on port 7891. In this case the `external_url` should be `https://example.com:7891` instead of `https://example.com:7890`.

</HintBlock>

### Step 2.1 - Register GitLab instance-wide OAuth application (performed by GitLab Admin)

Login the GitLab instance specified in Step 1 as an Admin user. The admin user will see a wrench icon on the top nav bar like below:

![gitlab-admin-area](/content/docs/vcs-integration/add-git-provider/gitlab-admin-area.webp)

Go to "**Applications**" from the sidebar, then click "**New application**" button.

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/vcs-gitlab-step1.webp)

Fill in the form with the provided info on the Bytebase setup wizard.

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/vcs-gitlab-step2.webp)

Register info:

- Name: can be other names than "Bytebase", as long as the GitLab admin can identify this application is for "Bytebase" later
- Redirect URI: begins with the **host:port** where the Bytebase console is running, and followed by **/oauth/callback**. This is the URI GitLab uses to callback Bytebase during the OAuth flow
- Trusted: Yes
- Confidential: Yes
- Scopes: api

Click the "**Submit**" button after filling the info on GitLab and you will see a created application, like below:

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/vcs-gitlab-step3.webp)

### Step 2.2 - Verify setup

Fill in the **Application ID** and **Secret** onto the corresponding fields on the Bytebase setup wizard:

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/vcs-gitlab-step4.webp)

After you click "**Next**", Bytebase will kick off an OAuth flow to verify the setup. If you are not currently logged into the GitLab instance used in the setup. You will be prompted to login to complete the OAuth.

<HintBlock type="info">

If you get an error in the OAuth popup window. Please double-check the following info:

1. The Redirect URI of the registered GitLab application matches exactly to the Redirect URI shown on the Bytebase wizard.
2. The Application ID and Secret of the registered GitLab application matches exactly to
   the filled Application ID and Secret on the Bytebase wizard.

</HintBlock>

## Step 3 - Confirm and add

When everything is setup properly, you will be informed that the setup is correct. Click "**Confirm and add**".

![vcs-gitlab-step](/content/docs/vcs-integration/add-git-provider/vcs-gitlab-step5.webp)

Now you have successfully added a Git provider, developers can now link their Bytebase projects with one of their owned repositories from this Git provider.

## References

1. [GitLab instance-wide applications](https://docs.gitlab.com/ee/integration/oauth_provider.html#instance-wide-applications). For GitLab, this is the OAuth application type Bytebase needs to register.
