---
title: Branching
---

<HintBlock type="info">

Branching is supported in MySQL, PostgreSQL and TiDB.

</HintBlock>

![Branching](/content/docs/branching/create-branch.webp)

Branching allows teams to use the familar Git branching model to coordinate their database schema changes.

- Different people can work on different branches and use the visual schema editor to design their database schema changes.
  ![bb-branching-edit](/content/docs/branching/bb-branching-edit.webp)

- A branch can be merged into another branch.
  ![bb-sub-branching](/content/docs/branching/bb-sub-branching.webp)
  ![bb-sub-branching-merge](/content/docs/branching/bb-sub-branching-merge.webp)
  ![bb-sub-branching-merge-diff](/content/docs/branching/bb-sub-branching-merge-diff.webp)

- The branch difference with the schema baseline can be applied to the databases.
  ![bb-branching-apply](/content/docs/branching/bb-branching-apply.webp)
  ![bb-branching-sync-schema](/content/docs/branching/bb-branching-sync-schema.webp)
  ![bb-branching-new-issue](/content/docs/branching/bb-branching-new-issue.webp)

- The branch difference can also be used as the change source to compose the [Changelist](/docs/changelist).

- Branch protection rules retrict how branch can be created, changed and merged.
  ![bb-branching-protection-rule](/content/docs/branching/bb-branching-protection-rule.webp)
