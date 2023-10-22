---
title: Branching
---

<HintBlock type="info">

Branching is supported in MySQL, PostgreSQL and TiDB.

</HintBlock>

![Branching](/content/docs/branching/create-branch.webp)

Branching allows teams to use the familar Git branching model to coordinate their database schema changes.

- Different people can work on different branches and use the visual schema editor to design their database schema changes.

- A branch can be merged into another branch.

- The branch difference with the schema baseline can be applied to the databases.

- The branch difference can also be used as the change source to compsoe the [Changelist](/docs/changelist).

- Branch protection rules retrict how branch can be created, changed and merged.
