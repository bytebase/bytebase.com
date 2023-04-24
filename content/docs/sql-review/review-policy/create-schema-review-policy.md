---
title: Create Schema Review Policy
---

There are two ways to create the `Schema Review Policy`.

One is from `Schema Review Policy` dashboard in `Settings`.

![schema-review-create-from-policy-dashboard](/docs/schema-review-create-from-policy-dashboard.gif)

The other is from `Environment` dashboard.

![schema-review-create-from-environment-dashboard](/docs/schema-review-create-from-environment-dashboard.gif)

Creating the `Schema Review Policy` is a 3-step process.

## Step 1

Specify the basic information, including display name for schema review policy, selected environment and schema review policy template.

<HintBlock type="info">

Note that only **ONE** policy can be attached per `Environment`.

</HintBlock>

## Step 2

Specify each `Schema Review Rule`, including error level and rule-specific fields.

### Change rule level

You can choose one of `Error`, `Warning` and `Disabled`.

`Error` will block the automatic run of `Issue`, while `Warning` will not.

When the rule is `Disabled`, it will not take effect.

![schema-review-change-rule-level](/docs/schema-review-change-rule-level.gif)

### Change rule configuration

There are currently three types of rules that need to be configured.

#### Regular expression

The rule [Table Naming Convention](/docs/sql-review/review-rules#naming.table) and [Column Naming Convention](/docs/sql-review/review-rules#naming.column) use [regular expression](https://en.wikipedia.org/wiki/Regular_expression) as format.

![schema-review-change-regex](/docs/schema-review-change-regex.gif)

#### Template

The rule [Index Naming Convention](/docs/sql-review/review-rules#naming.index.idx), [Unique Key Naming Convention](/docs/sql-review/review-rules#naming.index.uk) and [Foreign Key Naming Convention](/docs/sql-review/review-rules#naming.index.fk) use `Template` as format.

![schema-review-change-template](/docs/schema-review-change-template.gif)

#### Column list

The rule [Enforce the Required Columns in Each Table](/docs/sql-review/review-rules#column.required) needs `Column List`.

![schema-review-change-column-list](/docs/schema-review-change-column-list.gif)

Details of the rules can be found [here](/docs/sql-review/review-rules).

## Step 3

Preview and confirm the `Schema Review Rule`.
