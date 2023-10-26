---
title: Changelist
---

Changelist allows you to sequentially organize changes. Then you can apply them to the databases or
export them as zip files to apply the changes offline.

You access Changelist from the Change Center:

![Change Center](/content/docs/changelist/bb-change-center.webp)

## Change sources

A particular change can come from the following sources:

### Change History

The [change history](/docs/change-database/change-workflow/#migration-history) already executed on the database.

![Change Center](/content/docs/changelist/bb-change-history.webp)

### Branch

The [branch](/docs/branching) differences between the latest branch state and its baseline schema.

![bb-changelist-add-branch](/content/docs/changelist/bb-changelist-add-branch.webp)

### Raw SQL

Arbitrary SQL statements.

![bb-changelist-add-raw-sql](/content/docs/changelist/bb-changelist-add-raw-sql.webp)

## Manage changes

After adding changes, you may:

- Reorder them.

  ![bb-changelist-reorder](/content/docs/changelist/bb-changelist-reorder.webp)

- Apply them in bulk to databases in one issue.

  ![bb-changelist-apply](/content/docs/changelist/bb-changelist-apply.webp)

- Export them as a zip file. Each change corresponds to a separate change file. The file name is
  prefixed with the order number.

  ![bb-changelist-export](/content/docs/changelist/bb-changelist-export.webp)
