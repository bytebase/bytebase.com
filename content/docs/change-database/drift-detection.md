---
title: Schema Drift Detection
feature_name: 'DRIFT_DETECTION'
---

Bytebase is supposed to take over applying the database schema changes on behalf of the user. It records the detailed migration history and the before/after schema snapshot for each migration it applies.

A background process periodically compares the recorded latest schema with the actual schema in the targeting database and surface the drift if found. Drift usually happens when user applies out-of-band schema changes (such as hot fix) directly to the database without using Bytebase.

![Detect the drift](/content/docs/change-database/drift-detection/schema-drift-bytebase.webp)
![Display the drift](/content/docs/change-database/drift-detection/schema-drift-gitlab.webp)
