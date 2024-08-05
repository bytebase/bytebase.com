---
title: Dynamic Data Masking
feature_name: DATA_MASKING
---

<TutorialBlock url="/docs/tutorials/data-masking" title="Step-by-Step Guide to Data Masking" />

![bb-masking-overview](/content/docs/security/data-masking/bb-masking-overview.webp)

Dynamic Data Masking can mask sensitive data in the [SQL Editor](/docs/sql-editor/overview) query result based on the context. It helps
organizations to protect sensitive data from being exposed to unauthorized users.

## How Dynamic Masking works

![bb-masking-flow](/content/docs/security/data-masking/bb-masking-flow.webp)

Bytebase dynamic masking transforms the original column data to the masked form in 2 steps:

1. [Determine the effective column masking level](#determine-the-effective-column-masking-level)
1. [Determine the masking algorithm according to the masking level](#determine-the-masking-algorithm)

### Determine the effective column masking level

Bytebase defines 3 masking levels: `No Masking`, `Partial Masking`, `Full Masking`.

The effective column masking level is determined by the inherent column masking level and the user access grant.

| Inherent Column Masking Level | User Access Grant | Effective Column Masking Level |
| ----------------------------- | ----------------- | ------------------------------ |
| No Masking                    | No Masking        | No Masking                     |
|                               | Partial Masking   | No Masking                     |
| Partial Masking               | No Masking        | No Masking                     |
|                               | Partial Masking   | Partial Masking                |
| Full Masking                  | No Masking        | No Masking                     |
|                               | Partial Masking   | Partial Masking                |

### Determine the masking algorithm

Once the masking level is determined, the next step is to determine the corresponding masking algorithm.

Bytebase provides the default masking algorithm for `Partial Masking` and `Full Masking`:

- **Partial Masking**. Use `*` to cover the start and end of the text.
- **Full Masking**. Use `*` to cover all text.

You can also [custom the masking algorithm](../masking-algorithm) and specify it on the column.

Further, if you want to manage masking algorithms for different column categories, you can use
[Semantic Types](../semantic-types).
