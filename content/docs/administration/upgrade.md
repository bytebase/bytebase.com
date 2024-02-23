---
title: Upgrade
---

<HintBlock type="warning">

Before upgrade, make sure to back up the metadata. For production setup, you should use an [external PostgreSQL](/docs/get-started/install/external-postgres/) and back up that database.

</HintBlock>

## Version Management

Bytebase adopts [Semantic Versioning](https://semver.org/) using the MAJOR.MINOR.PATCH format.

Bytebase ties the version number with the underlying database schema progression, because:

1. Schema change is a good approximate to the functional change. Large schema changes often indicate large functional changes.
1. Schema change determines the customer involvement when upgrading to the new version.

- `MAJOR` version change usually happens once a year. It _might_ require manual effort from the customer. Bytebase will
  try to avoid that if possible.
- `MINOR` version is changed when the underlying database schema changes. While the upgrade does not require customer involvement. `MINOR` version change usually happens about once every month.
- `PATCH` version is changed when the new version does not include underlying database schema changes. `PATCH` version change usually happens bi-weekly following our release schedule.

## Upgrade Process

The usual upgrade process:

1. Back up the Bytebase metadata.
1. Change version string
1. Restart Bytebase
1. Done
