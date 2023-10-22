---
title: Review Policy
---

Bytebase defines SQL Review Policy for each [environment](/docs/concepts/data-model#environment).
The SQL Review Policy is essentially a set of SQL lint rules defined in [SQL Review Rule](/docs/sql-review/review-rules). Once configured, Bytebase will check SQL against the configured those rules.

## Prerequisites

- **Workspace Owner** or **Workspace DBA** role to configure the Review Policy.

## Create Schema Review Policy

<HintBlock type="info">

Note that only **ONE** policy can be attached per `Environment`.

</HintBlock>

There are two ways to create the `Schema Review Policy`.

One is from `Schema Review Policy` dashboard in `Settings`.

![schema-review-create-from-policy-dashboard](/content/docs/sql-review/schema-review-create-from-policy-dashboard.gif)

The other is from `Environment` dashboard.

![schema-review-create-from-environment-dashboard](/content/docs/sql-review/schema-review-create-from-environment-dashboard.gif)

### Change rule level

You can choose one of `Error`, `Warning` and `Disabled`.

`Error` will block the automatic run of `Issue`, while `Warning` will not.

When the rule is `Disabled`, it will not take effect.

![schema-review-change-rule-level](/content/docs/sql-review/schema-review-change-rule-level.gif)

### Change rule configuration

There are currently three types of rules that need to be configured.

#### Regular expression

The rule [Table Naming Convention](/docs/sql-review/review-rules#naming.table) and [Column Naming Convention](/docs/sql-review/review-rules#naming.column) use [regular expression](https://en.wikipedia.org/wiki/Regular_expression) as format.

![schema-review-change-regex](/content/docs/sql-review/schema-review-change-regex.gif)

#### Template

The rule [Index Naming Convention](/docs/sql-review/review-rules#naming.index.idx), [Unique Key Naming Convention](/docs/sql-review/review-rules#naming.index.uk) and [Foreign Key Naming Convention](/docs/sql-review/review-rules#naming.index.fk) use `Template` as format.

![schema-review-change-template](/content/docs/sql-review/schema-review-change-template.gif)

#### Column list

The rule [Enforce the Required Columns in Each Table](/docs/sql-review/review-rules#column.required) needs `Column List`.

![schema-review-change-column-list](/content/docs/sql-review/schema-review-change-column-list.gif)

Details of the rules can be found [here](/docs/sql-review/review-rules).

## Disable and Delete Schema Review Policy

You can `disable` the `Schema Review Policy` to prevent it from taking effect.

After disabling it, you can delete it.

![schema-review-disable-and-delete](/content/docs/sql-review/schema-review-disable-and-delete.gif)
