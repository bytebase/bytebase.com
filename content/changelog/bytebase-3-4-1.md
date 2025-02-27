---
title: Bytebase 3.4.1
author: Ayra
updated_at: 2025/02/27 17:00:00
feature_image: /content/changelog/3-4-1-banner.webp
description: 'Terraform provider manages more resources'
---

## 🎄 Enhancements

- Terraform provider manages more resources.

  - Support managing custom roles, semantic types, and database resources.
  - Support assigning instance licenses.
  - Support external secrets for instances.

- Allow retrying online migration tasks.
- Enable the following flags for online migration: `throttle-control-replicas` and `attempt-instant-ddl`.
- Improve the automatic quotation feature in the SQL editor.
- Consolidate the setting update UX for workspace, instance, environment, and project.

## 🔔 Breaking Changes

- External Approval Deprecated: Users should now use the Bytebase API for managing approvals and rollouts.
- MySQL online migration sync and cutover tasks have been consolidated into a single task. As a prerequisite, you should first create a `bbdataarchive` database.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
