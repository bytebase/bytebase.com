---
title: Secret Variable
---

<HintBlock type="info">

This feature is only available in the Pro Plan and Enterprise Plan.

</HintBlock>

To hide sensitive information in your change script, you can configure secret variables at the database level.

## Naming your secrets

The following rules apply to secret names:

- Names can only contain uppercase alphanumeric (`[A-Z]`, `[0-9]`) or underscores (`_`). Spaces are not allowed.

- Names must not start with the `BYTEBASE_` prefix.

- Names must not start with a number.

- Names must be unique in a database.

## Creating secrets for a database

<HintBlock type="info">

To create database secrets, you must be the Workspace Owner or Workspace DBA.

</HintBlock>

### Step 1 - Navigate to Database

Navigate to the database detail page. Click `Settings` tab and you will see the Secret block.

![database-setting-tab-secret-block](/content/docs/security/secret/database-setting-tab.webp)

### Step 2 - Create a Secret

Click `New Secret` and fill in the related fields, then click `Save`.

![create-database-secret](/content/docs/security/secret/create-salary-secret.webp)

## Using Secrets in Change Workflow

Use `${{ secrets.SECRET_NAME }}` in the change script, and Bytebase will replace it with the actual secret value while executing the change.

<HintBlock type="info">

If a secret has not been set, Bytebase will not replace the `${{ secrets.SECRET_NAME }}` with a secret value. This means that expressions are retained as is upon execution.

</HintBlock>

![using-secret-in-dml-issue](/content/docs/security/secret/using-secret-in-dml-issue.webp)
