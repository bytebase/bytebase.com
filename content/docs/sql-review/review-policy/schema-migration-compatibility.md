---
title: Backward Incompatibile Schema Change
---

Introducing backward incompatible schema changes is one of the most common mistakes made by developers. And enforcing backward compatible schema change is the standard practice adopted by many engineering organizations. Bytebase provides the built-in backward compatible check to catch all common incompatible schema change [scenarios](https://www.bytebase.com/doc/error#backward-incompatible-migration).

![schema-review-schema-backward-compatibility](/docs/schema-review-schema-backward-compatibility.webp)

## How the rule works

If the following situation occurs, Bytebase considers this rule to be violated:

- Drop database
- Rename table
- Drop table/view
- Rename column
- Drop column
- Add primary key
- Add Unique key
- Add Foreign key
- Add check enforced
- Alter check enforced
- Modify column
- Change column

## Support database engine

- MySQL
- TiDB

Support for PostgreSQL is coming soon.
