---
title: UI Integration
---

<TutorialBlock url="/docs/tutorials/sql-review-gui" title="SQL Review with Bytebase GUI" />

SQL advisor runs automatic SQL checks when:

- Schema or data change
- Data query

## Schema or data change process

On a specific issue page, the advisor will run automatically after creation:

![sql-advisor](/content/docs/sql-review/schema-review-engine-mysql-use-innodb.webp)

It currently supports the following checks:

- [SQL Review Rules](/docs/sql-review/review-policy)
- Database connection failure
- Syntax error
- Migration schema missing (the internal bytebase schema recording the migration history)

## Data query process

In [SQL Editor](/docs/sql-editor/overview), when you run a query, the advisor will run automatically:

![sql-editor-warning](/content/docs/sql-review/sql-review-sql-editor-warning.webp)
