---
title: Masking Algorithm
---

You may customize your own data masking algorithm with the help of a predefined masking type.

1. Go to **Settings** > **Security & Policy** > **Data Masking**.
1. Click **Masking Algorithm**.
1. Click **Add**, and fill in the name and description. Choose **Masking Type**, and fill in **Substitute** or **Salt** if necessary. Click **Confirm** to save.

## Configure Masking Algorithms

### Full mask

Mask the entire value and show **Substitute** value.

![bb-masking-algorithm-full](/content/docs/security/data-masking/bb-masking-algorithm-full.webp)

### Range mask

Mask several characters of a string and replace them with **Substitute** value.

![bb-masking-algorithm-partial](/content/docs/security/data-masking/bb-masking-algorithm-partial.webp)

### MD5 mask

Use MD5 algorithm together with **Salt** value to hash.

![bb-masking-algorithm-md5](/content/docs/security/data-masking/bb-masking-algorithm-md5.webp)

### Inner / Outer mask

- Inner mask: Mask `123456` to format like `12**56`, `1***56`.
- Outer mask: Mask `123456` to format like `**34**`, `*23***`.

![bb-masking-algorithm-inner-outer](/content/docs/security/data-masking/bb-masking-algorithm-inner-outer.webp)

## Assign Masking Algorithm

<HintBlock type="info">

If you want to batch apply masking algorithm to many columns, use [Semantic Types](../semantic-types).

</HintBlock>

If you want to overwrite the default masking algorithm, you can go to the column setting and explicitly
set the masking algorithm for the `full` and `partial` masking levels respectively.

![bb-masking-column-masking-algorithm](/content/docs/security/data-masking/bb-masking-column-masking-algorithm.webp)
