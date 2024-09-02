---
title: 'What is Dynamic Data Masking (DDM)'
author: Tianzhou
published_at: 2024/09/02 09:00
feature_image: /content/blog/what-is-dynamic-data-masking/cover.webp
tags: Explanation
featured: true
description: 'Dynamic Data Masking (DDM) protects sensitive data in real-time by dynamically altering the data returned to the application or user without changing the data at rest'
---

Dynamic Data Masking (DDM) protects sensitive data in real-time by dynamically altering the database records returned to the application or user without changing the data at rest.

![ddm](/content/blog/what-is-dynamic-data-masking/dynamic-data-masking.webp)

DDM contrasts with Static Data Masking (SDM). While SDM involves creating a permanently altered, non-reversible copy of the original data, DDM modifies the data on-the-fly as it is accessed in real-time. This dynamic approach ensures that sensitive data remains protected during query execution without changing the underlying data at rest.

## Use Case

The primary use case for SDM is to create safe, sanitized versions of production data for use in non-production environments.
On the other hand, DDM is primarily used in production environments to control and limit access to sensitive data dynamically, based on user roles, permissions, or other contextual factors. This allows organizations to protect sensitive information without needing to alter the underlying data, making it a powerful tool for maintaining security and compliance in real-time data access scenarios.

## DDM Complexity

The complexity of DDM arises primarily from its dynamic nature, where the system must make real-time decisions about how and when to mask data based on various runtime contexts. These contexts include:

### User Context

- **Role-Based Access**: Different users or roles may have varying levels of access to data. DDM must dynamically adjust the visibility of data based on the user’s identity, ensuring that only authorized users can see sensitive information in its unmasked form.

- **User Location and Device**: In some scenarios, data access might be influenced by the user's location (e.g., within or outside a corporate network) or the device being used. DDM must be capable of factoring in these variables dynamically.

### Temporal Context

- **Temporary Access**: User may require temporary access to solve emergencies.

- **Date and Time Sensitivity**: Certain data might only be considered sensitive during specific time periods, requiring DDM to adapt its behavior accordingly.

### Target Database Column

- **Column-Specific Masking**: Different columns in a database might require different masking techniques or rules. DDM must dynamically apply the appropriate masking algorithm based on the specific column being accessed.

- **Complex Data Types**: Handling complex data types, such as JSON or XML within columns, adds additional layers of complexity as DDM must parse and selectively mask content within these structures.

### Application Context

- **Environment-Specific Masking**: The masking rules may need to vary depending on the environment in which the application is running (e.g., dev, test, UAT, prod). DDM must recognize the environment and apply the appropriate level of masking.

- **Business Project or Use Case**: Different business projects or use cases might have unique data access requirements.

### Masking Algorithm

- **Algorithm Selection**: DDM must dynamically choose the most suitable masking algorithm based on the context, ensuring that the data remains useful while still protecting sensitive information. Algorithms might include techniques like partial masking, randomization, or tokenization.

- **Algorithm Complexity and Performance**: The choice of masking algorithm has a direct impact on performance. DDM needs to balance the security provided by the algorithm with the need to minimize performance overhead, ensuring that query execution times remain acceptable.

### Performance

Given the dynamic nature of DDM, one of the critical challenges is minimizing the performance overhead associated with real-time masking. This involves optimizing the masking logic to ensure that it is both efficient and scalable, particularly in high-traffic environments.

## Database Support

| Databases  | Supported                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------- |
| Oracle     | ✅ [Link](https://www.oracle.com/security/database-security/data-masking/)                          |
| SQL Server | ✅ [Link](https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking) |
| BigQuery   | ✅ [Link](https://cloud.google.com/bigquery/docs/column-data-masking-intro)                         |
| Snowflake  | ✅ [Link](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)                       |
| MySQL      | ❌                                                                                                  |
| PostgreSQL | ❌                                                                                                  |

Mainstream commercial databases all support DDM. On the other hand, neither MySQL nor PostgreSQL, the 2 most popular open-source databases support DDM out-of-the-box. For those supported databases, DDM is exposed via the extended SQL syntax. Taking Snowflake as
an example:

```sql
CREATE OR REPLACE MASKING POLICY email_mask AS (val string) RETURNS string ->
  CASE
    WHEN CURRENT_ROLE() IN ('ANALYST') THEN val
    ELSE '*********'
  END;

-- apply masking policy to a table column
ALTER TABLE IF EXISTS user_info MODIFY COLUMN email SET MASKING POLICY email_mask;
```

Database engine only provides the data masking primitives. Holistically configuring the masking policy for
an entire organization is still a big challenge.

<HintBlock type="info">

Bytebase provides an UI interface as well as API to [configure Dynamic Data Masking](/docs/security/data-masking/overview/). In particular, Bytebase supports MySQL and PostgreSQL.

</HintBlock>
