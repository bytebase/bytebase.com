---
title: Changelist
---

Changelist allows you to sequentially list all changes and apply them to the databases. You access Changelist from the Change Center:

![Change Center](/content/docs/changelist/bb-change-center.webp)

## Diffrent sources
A particular change can come from the following sources:

- [Change History](/docs/change-database/change-workflow/#migration-history). The change already executed on the database.

  ![Change Center](/content/docs/changelist/bb-change-history.webp)

- [Branch](/docs/branching). The differences between the latest branch state and its baseline schema.
  
  ![bb-changelist-add-branch](/content/docs/changelist/bb-changelist-add-branch.webp)

- Raw SQL. Arbitrary SQL statements.
  
  ![bb-changelist-add-raw-sql](/content/docs/changelist/bb-changelist-add-raw-sql.webp)

## Manage the changes
After adding changes, you may:

- Reorder them.

  ![bb-changelist-reorder](/content/docs/changelist/bb-changelist-reorder.webp)

- Apply them in bulk to databases in one issue.

  ![bb-changelist-apply](/content/docs/changelist/bb-changelist-apply.webp)

- Export them as a zip file consisting of SQL files.

  ![bb-changelist-export](/content/docs/changelist/bb-changelist-export.webp)
  