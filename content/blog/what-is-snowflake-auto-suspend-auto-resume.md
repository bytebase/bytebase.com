---
title: What is Snowflake Auto-Suspend and Auto-Resume?
author: Tianzhou
updated_at: 2023/08/23 9:00:00
feature_image: /content/blog/what-is-snowflake-auto-suspend-and-auto-resume/banner.webp
tags: Explanation
description: Snowflake provides auto-suspend and auto-resume to help customers to save budget when the warehouse is inactive
---

## Introduction

![auto-suspend-auto-resume](/content/blog/what-is-snowflake-auto-suspend-and-auto-resume/auto-suspend-auto-resume.webp)

When creating a Snowflake warehouse, it allows to configure the auto-suspend and auto-resume.

![snowflake-pricing](/content/blog/what-is-snowflake-auto-suspend-and-auto-resume/snowflake-pricing.webp)

Snowflake charges on the virtual warehouse occupied compute resource. When a virtual warehouse is idle, which means there are no active queries running, it continues to consume compute resources and accrue costs. The Auto-Suspend feature helps to optimize resource utilization and cost management by automatically suspending virtual warehouses after a specified period of inactivity.

When a virtual warehouse is suspended, it releases the compute resources it was consuming, and no charges are incurred for the suspended time. The suspended virtual warehouse can be auto-resumed when a new query is submitted, ensuring that resources are available on-demand and minimizing the time required for query execution.

By utilizing the auto-suspend feature, organizations can effectively manage their Snowflake resources, reduce costs by only paying for compute resources when they are actually needed, and optimize the overall performance and efficiency of their data analytics workflows.

## Things to watch out

Because auto-suspend is based on the connection activity, please be mindful about the periodic queries
polling the snowflake virtual warehouse, as they will keep the warehouse always active. Snowflake offers
$400 credit for 30-day trial, it will be exhausted way before 30-day trial if the warehouse is active
all the time.

![snowflake-trial](/content/blog/what-is-snowflake-auto-suspend-and-auto-resume/snowflake-trial.webp)

## Further Readings

- [Official doc](https://docs.snowflake.com/en/user-guide/warehouses-overview#auto-suspension-and-auto-resumption)
- [10 Best Practices Every Snowflake Admin Can Do to Optimize Resources](https://www.snowflake.com/blog/10-best-practices-every-snowflake-admin-can-do-to-optimize-resources/)

---

While keeping an eye on the Snowflake cost, you may also want to improve the Snowflake change management
process. Please check out Bytebase, it brings the [code like CI/CD workflow to Snowflake](https://docs.bytebase.com/tutorials/database-change-management-with-snowflake-and-github).

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)
