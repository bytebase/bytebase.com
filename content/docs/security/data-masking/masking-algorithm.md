---
title: Masking Algorithm
feature_name: DATA_MASKING
---

You may customize your own data masking algorithm with the help of a predefined masking type. These algorithms could be used to configure [Semantic Types](/docs/security/data-masking/semantic-types).

1. Go to **Settings** > **Security & Policy** > **Data Masking**.
2. Click **Masking Algorithm**.
3. Click **Add**, and fill in the name and description. Choose **Masking Type**, and fill in **Substitute** of **Salt** if necessary. Click **Confirm** to save.
    - **Full mask**: Mask the entire value and show **Substitute** value.

        ![bb-masking-algorithm-full](/content/docs/security/data-masking/bb-masking-algorithm-full.webp)

    - **Range mask**: Mask several characters of a string and replace them with **Substitute** value.

        ![bb-masking-algorithm-partial](/content/docs/security/data-masking/bb-masking-algorithm-partial.webp)

    - **MD5 mask**: Use MD5 algorithm together with **Salt** value to hash.

        ![bb-masking-algorithm-md5](/content/docs/security/data-masking/bb-masking-algorithm-md5.webp)