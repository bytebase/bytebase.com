---
title: POC Checklist 📝
---

The POC (Proof of Concept) checklist guides the potential buyers to evaluate the Bytebase Enterprise
plan. The POC process usually takes 1 ~ 2 weeks. Please [contact us](/contact-us) to request an
enterprise license.

## Install

- [System Requirements](/docs/faq/##system-requirements)
- [Docker](/docs/get-started/self-host/#docker), [Kubernetes](/docs/get-started/self-host/#kubernetes)
- [Production Setup](/docs/administration/production-setup)

## Understand Permission Model

Check out [Roles and Permissions](/docs/concepts/roles-and-permissions/).

## Configure Environment

- [What is Environment](/docs/concepts/data-model/#environment)
- [Rollout Policy](/docs/administration/environment-policy/rollout-policy/)
- [SQL Review Policy](/docs/sql-review/review-policy/)

## Configure Instance

- [What is Instance](/docs/concepts/data-model/#database-instance)
- [Assign License](/docs/administration/license/)
- [Connect Instance](/docs/get-started/instance/)

## Configure Project

- [What is Project](/docs/concepts/data-model/#project)
- [Create a Project and Transfer Database](/docs/get-started/step-by-step/create-a-project/#option-a-transfer-an-existing-database-into-the-project)

## Database Change Workflow

- [Database Change Workflow](/docs/change-database/change-workflow/)
- [Data Rollback](/docs/change-database/rollback-data-changes/)
- [Custom Approval](/docs/administration/custom-approval/)
- [Webhook Notification](/docs/change-database/webhook/)
- [Schema Drift Detection](/docs/change-database/drift-detection/)
- [Batch Change](/docs/change-database/batch-change/)
- [GitOps](/docs/vcs-integration/overview/)

## SQL Editor

- [Query Mode (read-only)](/docs/sql-editor/run-queries/)
- [Admin Mode](/docs/sql-editor/admin-mode/)

## Database Security

- [Database Permission](/docs/security/database-permission/overview/)
- [Dynamic Data Masking](/docs/security/data-masking/overview/)
- [Audit Log](/docs/security/audit-log/)
- [Watermark](/docs/security/watermark/)

## Login and SSO

User can self self-signup or invited by the `Workspace Admin`. Alternatively, `Workspace Admin` can
configure SSO. Bytebase supports all common providers such as Okta, Google, LDAP.

- [SSO](/docs/administration/sso/overview/)
- [SCIM (Directory Sync)](/docs/administration/scim/overview/)
- [2FA](/docs/administration/2fa/)
- [Password Restriction](/docs/administration/password/)
- [Sign-in Restriction](/docs/administration/sign-in-restriction/)

## Misc

- [Customize Logo](/docs/administration/customize-logo/)
- [Announcement Banner](/docs/administration/announcement/)
