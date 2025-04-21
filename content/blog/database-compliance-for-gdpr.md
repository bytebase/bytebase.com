---
title: 'Database Compliance for GDPR: Implications and Best Practices'
author: Tianzhou
updated_at: 2024/07/24 09:00:00
feature_image: /content/blog/database-compliance-for-gdpr/banner.webp
tags: Explanation
description: A comprehensive overview of the essential practices and principles necessary for achieving GDPR compliance within database operations
---

The [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/) is a comprehensive data protection law implemented by the European Union (EU) to safeguard the personal data and privacy of individuals within the EU and the European Economic Area (EEA).

Database is the primary medium to store the personal data. Thus database compliance for GDPR is a mandatory.

## Database Hosting

The GDPR does not explicitly require that data be stored within the EU, but it sets conditions for data protection that often lead organizations to choose storing data within the EU to ensure compliance. In practice, most orgs would choose to do so and provision separate databases in EU.

![](/content/blog/database-compliance-for-gdpr/multi-region-databases.webp)

Each set of databases are in different regions/continents. They bear the same database schema whereas store different data. The
databases in EU store the personal data from EU.

Provisioning separate databases satisfies the GDPR compliance, however it adds the maintenance overhead. e.g. If you want to make a schema change, you need to make sure to deploy the schema change to all databases.

<HintBlock type="info">

Bytebase provides [Batch Mode](/docs/change-database/batch-change/) to consistently change databases from all locations.

</HintBlock>

## Database Operations

GDPR defines several key personas:

- **Personal Data Subject**. The individual whose personal data is being collected, held, or processed. This is any person who can be identified, directly or indirectly, by reference to data such as name, identification number, location data, online identifier, or specific characteristics. e.g. end users.
- **Personal Data Controller**. The entity (person, company, or organization) that determines the purposes and means of processing personal data. The data controller is responsible for ensuring that the processing of data complies with GDPR. e.g. Online store.
- **Personal Data Processor**. The entity (person, company, or organization) that processes personal data on behalf of the data controller. Data processors must adhere to the instructions of the data controller and comply with GDPR requirements related to data security and breach notification. e.g. Payment Service Vendor.
- **Data Protection Officer (DPO)**. e.g. CIO / CSO.

![](/content/blog/database-compliance-for-gdpr/gdpr-persona.webp)

From [GDPR Art. 24: Responsibility of the controller](https://gdpr-info.eu/art-24-gdpr/):

> Taking into account the nature, scope, context and purposes of processing as well as the risks of varying likelihood and severity for the rights and freedoms of natural persons, the controller shall implement appropriate **technical and organisational measures** to ensure and to be able to demonstrate that processing is performed in accordance with this Regulation.

The Processor also assumes the similar responsibility as the controller. And sometimes, an organization acts as both the Data Controller and Data Processor at the same time. They need to comply with 2 categories of database operations:

- [Database maintenance operations (infrastructure level)](#infrastructure-level-database-maintenance-operations)
- [Database development operations (application level)](#application-level-database-development-operations)

### Database Maintenance Operations (Infrastructure Level)

These are handled by the database service provider, internal DBA and/or infrastructure teams. They need to make sure:

- Databases are provisioned inside the EU region.
- Databases and all their backups/traces are timely deprovisioned and purged upon request.
- Transfer of data outside of EU requires careful review according to [Art. 44: General principle for transfers](https://gdpr-info.eu/art-44-gdpr/).
- Encryption are enforced both at rest and in transit.

### Database Development Operations (Application Level)

Database development operations impose more compliance risks. Different job functions participate various
day-to-day database activities in different database systems:

- **Database schema evolution**. Schema evolves as the application releases new versions. Developers need to
  propagate the schema migration from dev environment to prod environment.
- **Adhoc change**. Developers sometimes need to make one-off change to correct the production data.
- **Query data**. Developers, DBAs, Business Analysts, Product Managers all need to query the production data to troubleshooting and conduct analysis.

To ensure GDPR compliance for these database operations, organizations must restrict access to authorized data only to authorized personnel. Additionally, they should document the reasons for access and maintain audit trails, as mandated by [Art. 30: Records of processing activities](https://gdpr-info.eu/art-30-gdpr/).

<HintBlock type="info">

Bytebase is a single place to provide [access control](/docs/security/database-permission/overview/), [review workflow](/docs/change-database/change-workflow/), [data masking](/docs/security/data-masking/overview/), [audit logging](/docs/security/audit-log/) for all database development operations for all database systems.

</HintBlock>

## Make your Database GDPR Compliant

Placing your databases in the EU is only the first step. To meet GDPR compliance requirements while maintaining productivity, organizations need the right structure, adaptive processes, and advanced tools in place.
