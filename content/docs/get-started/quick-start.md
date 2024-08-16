---
title: Quickstart
---

<iframe width="675" height="380" src="https://www.youtube.com/embed/lav1JaaTLMc" title="YouTube video player" className="w-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Register Accounts

After deploying Bytebase successfully, you need to register accounts for your team members.

### Create the first admin account

The first registered account after deployment is the admin account and will be granted a **Workspace Admin** role.

![bb-welcome-page](/content/docs/get-started/step-by-step/register-accounts/bb-welcome-page.webp)

### Register a regular account

After the admin account is created, you can register a regular account.

![bb-register-normal-user](/content/docs/get-started/step-by-step/register-accounts/bb-register-normal-user.webp)

### Log in

After registration, you may log into Bytebase console.

![bb-login](/content/docs/get-started/step-by-step/register-accounts/bb-login.webp)

For **Enterprise Plan** you may also log into Bytebase using [SSO](/docs/administration/sso/overview).

### Update password

As a **Workspace Admin**, you can change passwords for the other accounts.

1. Click **Settings** on the top bar.
2. Click **Members** on the left side bar, and you can see the members page.
3. Click the name of any member, and you will be redirected to that member’s detail page.
4. Click **Edit**, fill in the **Password** and **Confirm**, and click **Save**. The password is updated.

## Set up Environments

`Environment` models after various environments in the development pipeline such as test, staging, prod. Most of the time, there is a 1:1 mapping between `Environment` and the real environment.

![environment](/content/docs/get-started/step-by-step/set-up-environments/bb-environment.webp)

### Prerequisites

- **Workspace Admin** or **Workspace DBA** role

### Add an environment

1. Click **Environments** on the navigation bar, you can see two predefined environments - **Test** and **Prod**.
1. Click **Create Environment**, enter **Environment** (name), and choose **Rollout Policy\*\*** and **Database backup schedule policy** according to your needs.
1. Click **Create**, and you will find the new environment on the right.

### Reorder environments

1. Click **Reorder** to adjust the environments' order.

### Edit an environment

1. Click **Environments** on the navigation bar, you can see two predefined environments - **Test** and **Prod**.
1. Choose an existing environment, e.g. Test.
1. Edit name, rollout policy, database backup schedule policy, and SQL review policy.

#### Configure a SQL review policy

1. Click **Environments** on the navigation bar, you can see two predefined environments - **Test** and **Prod**.
1. Choose an existing environment, e.g. Test.
1. Click **SQL Review** > **Configure policy**.
1. On **Step 1**, enter **Display name**, choose **Environment** and **Template**, and click **Next**.
1. On **Step 2**, choose a rule, select its **Error Level** and click **Next**.
1. On **Step 3**, make sure the preview is OK, and click **Confirm and add**.
