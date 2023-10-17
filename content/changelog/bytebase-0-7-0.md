---
title: Bytebase 0.7.0
published_at: 2021/10/07 09:57:00
description: PostgreSQL support, schema drift detection, anomaly center, backward incompatible schema migration check, backup schedule enforcement and more
---

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._

This release takes a bit longer because we are packaging couple exciting features in it. Let's check them out.

## 🚀 New Features

### Support PostgreSQL 🐘 🐘 🐘

Our team really love PostgreSQL and we are the ones delivering the initial launch of managed PostgreSQL at [Google Cloud SQL](https://cloud.google.com/sql). So we are really happy to announce the official PostgreSQL support in Bytebase. Elephant in the room ✅

### Schema drift detection

Bytebase will periodically compare the recorded schema with the actual schema and expose the drift if occurs. We also provide a side-by-side view to show the diff.
![_](/content/changelog/0.7.0/schema-drift.webp)![_](/changelog/0.7.0/schema-drift-detail.webp)

### Introduce Anomaly Center

Many things can go wrong for your database and unnoticed until an outage happens. We are always thinking of a proactive way to help user catch those problems. Today we introduce Anomaly Center, our attempt to address this challenge. A background process will periodically scan potentially anomalies on the managed instances and databases, then expose them in a holistic view.
![_](/content/changelog/0.7.0/anomaly-center.webp)
We currently detect following anomalies and will add more in the future:

- Database connection issue
- Backup policy violation
- Expected backup missing
- Schema drift
- Migration schema missing

### Backward compatible schema migration check (MySQL/TiDB)

In the last release, we introduce the task check system and introduced the basic SQL syntax check. In this release, we advance the check to catch backward incompatible schema migration (e.g. RENAME TABLE). Introducing backward incompatible schema changes is one of the most common mistakes made by developers and enforcing backward compatible schema change is the standard practice adopted by many engineering organizations. Bytebase now automatically checks all common incompatible schema change [scenarios](https://bytebase.com/docs/reference/error-code/advisor/#compatibility) and surface them in the SQL review panel:
![_](/content/changelog/0.7.0/backward-compatible-check.webp)

### Backup schedule enforcement

Owner and DBA can now enforce backup schedule policy for the specific environment. e.g. require daily backup for production environment.
![_](/content/changelog/0.7.0/environment.webp)

## 🎄 Enhancement

- Improve the onboarding workflow to establish the initial schema baseline.
- Allow user to specify empty password when connecting the instance (though not recommended).
- Sync detailed "View" schema info.
- Many other UX improvements and we plan to write a separate article to talk about those small but also meaningful improvements.

## 🎠 Community

- We revamped our [landing page](https://bytebase.com/) with the wonderful illustration. The figure derives from our logo and we plan to continue this path to strength our branding identity.

![_](/content/changelog/0.7.0/frontpage.webp)

- We have open sourced our [take-home interview assignment](https://github.com/bytebase/interview).  And yes, we are looking for talented frontend engineer and full-stack engineer to join our remote team. Checkout [job details](https://bytebase.com/jobs).
