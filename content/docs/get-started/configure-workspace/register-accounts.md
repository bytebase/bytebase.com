---
title: Register Accounts
---

After deploying Bytebase successfully, you need to register accounts for your team members.

## Register an admin account

The first registered account after deployment will be granted a **Workspace Owner** role.

![welcome-page](/content/docs/get-started/configure-workspace/register-accounts/welcome-page.webp)

## **Register a regular account**

After the admin account is created, you can register a regular account and will be granted **Workspace Developer** role.

![normal-account](/content/docs/get-started/configure-workspace/register-accounts/normal-account.webp)

## Login with GitLab / GitHub

<HintBlock type="info">

This feature is only available in the **Team** or **Enterprise** plan.

</HintBlock>

User can login Bytebase directly with her GitLab / GitHub, below shows the GitLab login process,
GitHub works in a similar way:

In order to log in with GitLab,

1. In Bytebase, the **Workspace Owner** completes [VCS configuration](/docs/vcs-integration/add-git-provider).
2. When a user tries to use the GitLab Login, Bytebase will first try to match the GitLab public email with the existing member in Bytebase. In GitLab, the public email can be set here.

   ![gitlab-public-email](/content/docs/get-started/configure-workspace/register-accounts/gitlab-public-email.webp)

   If a matching member is found, then that user will login as that existing Bytebase member. Otherwise, Bytebase will create a new member with an unguessable random password, and allow the user to login as that created member. Later, user can visit her profile page to change the
   password, which enables her to login using password as well.

## Update password

As a **Workspace Owner**, you can change passwords for the other accounts.

1. Click **Settings** on the top bar.
2. Click **Members** on the left side bar, and you can see the members page.
3. Click the name of any member, and you will be redirected to that member’s detail page.
4. Click **Edit**, fill in the **Password** and **Confirm**, and click **Save**. The password is updated.
