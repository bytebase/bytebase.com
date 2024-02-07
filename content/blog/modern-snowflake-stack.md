---
title: Modern Snowflake Stack in 2024
author: Tianzhou
published_at: 2024/02/08 12:00
feature_image: /content/blog/modern-snowflake-stack/modern-snowflake-stack.webp
tags: Industry
featured: true
description: The "Modern Snowflake Stack" is inspired from the phrase "Modern Data Stack", refers to a set of technologies and tools built around Snowflake, a cloud-based data warehousing solution, to enable efficient data storage, processing, and analytics.
---

The `Modern Data Stack` is a collection of cloud-native technologies and tools designed to streamline data collection, storage, management, analysis, and sharing. It embodies a shift from traditional, monolithic data management systems to more flexible, scalable, and user-friendly solutions. The term `Modern Data Stack` does not have a single inventor or originator credited with its coining. Instead, it emerged organically over time as the data technology landscape evolved and new cloud-native tools and services were developed.

Snowflake plays the pivotal role in transitioning the industry into the `Modern Data Stack` era. Below we introduce tools working
with Snowflake and coin them together as the `Modern Snowflake Stack`.

![_](/content/blog/modern-snowflake-stack/modern-snowflake-stack.webp)

## Data Ingestion - Fivetran

![_](/content/blog/modern-snowflake-stack/fivetran.webp)

[Fivetran](https://www.fivetran.com/) is a cloud-based data integration service that automates the extraction, loading, and transformation (ELT) of data from various sources into a data warehouse or data lake. Designed to simplify data integration and ensure data accuracy, Fivetran supports a wide range of data sources, including SaaS applications, databases, event logs, file storage, and more.

Fivetran offers a large library of pre-built connectors for popular data sources and destinations, allowing quick and easy setup of data pipelines without the need for custom coding. e.g. The [Salesforce to Snowflake](https://www.fivetran.com/connector-warehouse/salesforce-snowflake-data-cloud) is Fivetran's flagship connector that contributes a significant portion of its revenue.

## Data Transformation - DBT

![_](/content/blog/modern-snowflake-stack/dbt.webp)

[dbt (data build tool)](https://www.getdbt.com/) is an open-source command-line tool that enables data analysts and engineers to transform data in their analytics warehouses by writing select SQL queries and managing them as code. It is designed to facilitate the "transform" step of the ELT (Extract, Load, Transform) process, where raw data is transformed into a format suitable for analysis after being loaded into a data warehouse. dbt does this by treating transformations as models, which can be version-controlled, tested, and deployed following software engineering best practices.

Snowflake's architecture allows data teams to perform transformations on large datasets efficiently and cost-effectively, without worrying about the underlying infrastructure. When dbt runs transformations in Snowflake, it leverages Snowflake's compute power to execute SQL commands, transforming raw data into structured, analysis-ready information.

## Data Security - Immuta

![_](/content/blog/modern-snowflake-stack/immuta.webp)

[Immuta](https://www.immuta.com/) is a data security platform designed to facilitate the secure access and control of sensitive data across cloud, hybrid, and on-premises environments. It focuses on automating data access controls, privacy compliance, and security policies, enabling organizations to manage and share their data more effectively and in compliance with various regulatory requirements. Immuta's platform is particularly useful for organizations that deal with large volumes of sensitive data and need to ensure that their data handling practices comply with laws such as GDPR, CCPA, HIPAA, and others.

Snowflake has already provided built-in access control and dynamic data masking, and Immuta's platform augments the Snowflake core and allows teams to manage the access control and masking policies at scale.

## Data Catalog - Atlan

![_](/content/blog/modern-snowflake-stack/atlan.webp)

[Atlan](https://atlan.com/) is a modern data catalog and collaborative workspace designed to empower data teams by centralizing data discovery, governance, and metadata management. Atlan's approach integrates the functionality of a traditional data catalog with collaboration and governance features, making it a comprehensive platform for data teams, including data analysts, data scientists, data engineers, and business users.

Atlan is the first data catalog to be validated as a Snowflake Ready Technology Partner.

![_](/content/blog/modern-snowflake-stack/atlan-snowflake.webp)

Similar to Immuta's approach, Atlan build's the data solution on the top of Snowflake's built-in features such as Column-level security, row-level access, object tag-based masking, data classification, which allows team to manage data lineage, data discovery at scale.

## Data Monitoring - Bigeye

![_](/content/blog/modern-snowflake-stack/bigeye.webp)

[Bigeye](https://www.bigeye.com/) is a data monitoring platform designed to help data teams ensure the health and reliability of their data. By providing tools to monitor data quality, set alerts for anomalies, and track data lineage, Bigeye aims to automate the process of identifying and addressing issues in data systems before they impact downstream analyses or operational processes. It's part of a broader category of data observability and monitoring solutions that have emerged to tackle the challenges associated with managing data at scale in modern data ecosystems.

Bigeye and Atlan do have some overlap in their capabilities, particularly around data cataloging and governance. However, their core offerings and primary use cases differ significantly, catering to different needs within the data management and operations landscape.

Bigeye is primarily focused on data observability and quality monitoring. Its main features include automated data monitoring, anomaly detection, and alerts to ensure the reliability of data in operational systems and analytics. Atlan, on the other hand, positions itself as a modern data workspace, emphasizing data discovery, collaboration, and governance. Its features are designed to make data easily accessible and usable across teams, with strong support for metadata management, data cataloging, and collaboration tools.

With its data health agent, Bigeye can surface data quality and pipeline health alerts directly in Atlan.

## Data Activation - Census / Hightouch

Data Activation aka reverse-ETL, which focuses on operationalizing data by syncing it from data warehouses to various SaaS applications, operational systems, and customer relationship management (CRM) platforms. [Census](https://www.getcensus.com/) and [Hightouch](https://hightouch.com/) are two leading solutions, they are neck-to-neck and provide similar feature sets.


Both products claim to be superior than the other. The competition is real and we think it's better to leave the judgement to the audience:
* [Census vs Hightouch (Census view)](https://www.getcensus.com/compare/census-vs-hightouch)
* [Hightouch vs Census (Hightouch view)](https://hightouch.com/blog/hightouch-vs-census)


## Customer Data Platform (CDP) - Segment

The main purpose of building the entire data stack is to unlock insights from the customer data. Segment is a customer data platform (CDP) that helps organizations collect, clean, and control their customer data. Segment does overlap with some of the aforementioned solutions.

![_](/content/blog/modern-snowflake-stack/segment.webp)

Segment overlaps with Fivetran on data ingestion. Fivetran consolidates data from diverse sources into a data warehouse, while Segment emphasizes the collection and integration of customer data across multiple touchpoints to enhance marketing strategies and customer understanding, focusing on real-time data routing and customer profile unification. Actually, Segment is often a data source in Fivetran.

Segment overlaps Census / Hightouch on data activation / reverse-ETL. This is a natural move for Segment to close the loop for
customer data. Since the purpose for reverse-ETL is to deliver more personalized and timely experiences to their customers across various channels.

## CI/CD - Bytebase

After all, Snowflake is a database system. And for database, one of pain points is to manage schema migrations. All aforementioned solutions belong to the DataOps domain, while the schema migration falls into the DevOps and CI/CD category. Snowflake itself open sourced [schemachange](https://github.com/Snowflake-Labs/schemachange) for database change management. It's a python-based CLI
 carrying the spirit of classic java schema migration tool [flyway](https://github.com/flyway/flyway).

[Bytebase](/) is another CI/CD and change management solution providing review workflow and version control for Snowflake schema migration and ad-hoc changes. Different from schemachange, Bytebase provides a GUI collaborative workspace like what GitHub does for code management.

![_](/content/blog/modern-snowflake-stack/snowflake-issue.webp)

It also provides native GitOps integration with all mainstream VCSs to manage the change scripts in the repository.

![_](/content/docs/tutorials/database-change-management-with-snowflake-and-github/vscode-create-table.webp)

FWIW, Snowflake also [added Git integration](https://www.snowflake.com/blog/snowflake-expands-developer-programmability-snowpark-container-services/) recently.

![_](/content/blog/modern-snowflake-stack/snowflake-git.webp)

## What are we missing?

The acute reader might have already noticed that we missed an elephant in the room, the BI tool. We don't include BI because
although there are quite a few options like Tableau, Mode, Looker, There is no outstanding one specifically built for Snowflake.
Maybe the industry is just waiting for Snowflake to announce its own BI solution, not a far sight from Snowsight anyway.


## Summary

![_](/content/blog/modern-snowflake-stack/google-trend.webp)

`Modern Data Stack` starts to pick up in 2022, this article introduces the similar `Modern Snowflake Stack`.
Snowflake is still the pinnacle of the modern data stack ([though Databricks likely disagrees](https://www.databricks.com/databricks-vs-snowflake)). By narrowing our focus on the Snowflake ecosystem, we can learn the state-of-the-art of the data landscape
and adopt the best practice.
