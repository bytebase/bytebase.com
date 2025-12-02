---
title: Top Open Source Sensitive Data Discovery Tools in 2025
author: Tianzhou
updated_at: 2025/12/01 09:00:00
feature_image: /content/blog/top-open-source-sensitive-data-discovery-tools/banner.webp
tags: Industry
description: A guide to open source sensitive data discovery tools - from lightweight CLI scanners like PiiCatcher and Hawk-Eye to full data platforms like OpenMetadata.
keypage: true
---

## Introduction

Sensitive data discovery is the first step in protecting PII, PHI, and other regulated information. Before you can mask, encrypt, or restrict access to sensitive data, you need to find it.

Open source tools for this task span a spectrum:

- **NLP libraries** - Building blocks for custom detection pipelines
- **Lightweight CLI scanners** - Quick, targeted scans for developers and CI pipelines
- **Full data platforms** - Comprehensive metadata management with classification as one feature

This article covers four tools across this spectrum, from NLP foundations to enterprise data catalogs with built-in classification.

## spaCy

[spaCy](https://github.com/explosion/spaCy) is the industrial-strength NLP library that powers many sensitive data detection tools.

![spaCy](/content/blog/top-open-source-sensitive-data-discovery-tools/spacy.webp)

spaCy provides named entity recognition (NER) that can identify persons, organizations, locations, and other entity types in text. Both PiiCatcher and OpenMetadata use spaCy under the hood for ML-based PII detection. If you need maximum flexibility, you can build custom detection pipelines directly with spaCy, though the tools below provide ready-to-use solutions.

## PiiCatcher

[PiiCatcher](https://github.com/tokern/piicatcher) is a focused CLI scanner that detects PII in databases and tags findings in data catalogs.

![piicatcher](/content/blog/top-open-source-sensitive-data-discovery-tools/piicatcher.webp)

**Detection approach:** PiiCatcher uses two methods - regex pattern matching against column names, and NLP-based analysis of sample data using spaCy. This dual approach catches both obviously-named columns (e.g., `email`, `ssn`) and columns with generic names but sensitive content.

**Data source support:** PostgreSQL, MySQL, SQLite, Redshift, Athena, Snowflake, BigQuery.

**Key strength:** Native integration with data catalogs. PiiCatcher can automatically tag discovered PII in DataHub or Amundsen, bridging the gap between standalone scanning and catalog-based governance.

**Best for:** Teams wanting a lightweight scanner that feeds into their existing data catalog.

## Hawk-Eye

[Hawk-Eye](https://github.com/rohitcoder/hawk-eye) is a broad-spectrum scanner covering databases, cloud storage, and files - including images and videos via OCR.

![hawk-eye](/content/blog/top-open-source-sensitive-data-discovery-tools/hawk-eye.webp)

**Detection approach:** Pattern matching with configurable fingerprints defined in YAML. Supports OCR for images and documents (350+ file types including DOCX, PDF, images, videos).

**Data source support:** MySQL, PostgreSQL, MongoDB, CouchDB, Redis, S3, Google Cloud Storage, Firebase, Slack, Google Drive, local filesystem.

**Key strength:** Breadth of coverage. Unlike database-only scanners, Hawk-Eye finds PII across your entire data footprint - useful when sensitive data leaks into unstructured storage.

**Best for:** Security teams auditing diverse data sources beyond just databases.

## OpenMetadata

[OpenMetadata](https://github.com/open-metadata/OpenMetadata) is a unified metadata platform with auto-classification as a core governance feature.

![openmetadata](/content/blog/top-open-source-sensitive-data-discovery-tools/open-metadata.webp)

**Detection approach:** Auto-Classification workflow powered by spaCy with configurable confidence levels (0-100). The system identifies PII and either auto-applies tags or suggests them for review. Runs as a separate workflow from metadata ingestion, so you can tune classification independently.

**Data source support:** 84+ connectors spanning databases, dashboards, messaging, and pipelines.

**Key strength:** Tight integration between classification and governance workflows. Tags flow into data quality rules, access policies, and team collaboration features. The no-code profiler makes classification accessible to non-engineers.

**Best for:** Teams wanting a modern, API-first platform where classification drives downstream governance policies.

**Alternative:** [DataHub](https://github.com/datahub-project/datahub) is another open-source metadata platform, but its auto-classification feature only supports Snowflake and has been [marked as deprecated](https://docs.datahub.com/docs/metadata-ingestion/docs/dev_guides/classification). If you're using DataHub, consider pairing it with PiiCatcher for broader classification coverage.

## Comparison

| Tool             | Language      | Primary Use Case                         | Detection Method                                            | Data Source Support                                              | Deployment         | License                   |
| ---------------- | ------------- | ---------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------- | ------------------ | ------------------------- |
| **spaCy**        | Python        | NLP library / building block             | Named entity recognition (NER), ML models                   | N/A (text processing only)                                       | pip                | MIT                       |
| **PiiCatcher**   | Python        | CLI scanner for databases                | Regex + NLP (spaCy)                                         | PostgreSQL, MySQL, SQLite, Redshift, Athena, Snowflake, BigQuery | pip, Docker        | Apache 2.0                |
| **Hawk-Eye**     | Python        | Multi-source scanner (DBs, cloud, files) | Pattern matching + OCR                                      | MySQL, PostgreSQL, MongoDB, Redis, S3, GCS, Firebase, Slack      | pip, Docker        | LGPL 2.1 + Commons Clause |
| **OpenMetadata** | Java / Python | Data platform with governance            | Auto-classification workflow (spaCy), confidence thresholds | 84+ connectors                                                   | Docker, Kubernetes | Apache 2.0                |

![star-history](/content/blog/top-open-source-sensitive-data-discovery-tools/star-history.webp)

Choose based on your needs:

- **spaCy** - Build custom detection pipelines with maximum flexibility
- **PiiCatcher** - Catalog-integrated database scanning
- **Hawk-Eye** - Broad coverage across databases, cloud storage, and files
- **OpenMetadata** - Classification within a full metadata platform

Start lightweight, then graduate to full platforms as governance requirements grow.

## From Discovery to Protection

Finding sensitive data is only half the challenge - you then need to protect it. [Bytebase provides dynamic data masking](https://docs.bytebase.com/security/data-masking/overview) that can be driven by classification results.

Once you've identified PII columns using tools above, you can call the Bytebase REST/gRPC API to apply masking policies programmatically. This creates an automated pipeline: scan → classify → mask, ensuring discovered sensitive data is protected without manual intervention.
