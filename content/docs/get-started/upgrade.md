---
title: Upgrade
---

## Upgrade Process

Take Docker as an example:

1. Stop Bytebase

   ```text
   docker stop bytebase
   docker rm bytebase
   ```

1. Back up the Bytebase metadata

   <HintBlock type="warning">

   Below example backs up the metadata stored in the embedded database.
   If you store metadata in the [external PostgreSQL](/docs/get-started/install/external-postgres/), you should
   back up that database.

   </HintBlock>

   ```text
   cp -rp ~/.bytebase/data ~/.bytebase/data.bak
   ```

1. Change version string to %%bb_version%%
1. Start Bytebase

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

## Version Management

Bytebase adopts [Semantic Versioning](https://semver.org/) using the MAJOR.MINOR.PATCH format.

Bytebase ties the version number with the underlying database schema progression, because:

1. Schema change is a good approximate to the functional change. Large schema changes often indicate large functional changes.
1. Schema change determines the customer involvement when upgrading to the new version.

   - `MAJOR` version change usually happens once a year. It _might_ require manual effort from the customer. Bytebase will
     try to avoid that if possible.
   - `MINOR` version is changed when the underlying database schema changes. While the upgrade does not require customer involvement. `MINOR` version change usually happens about once every month.
   - `PATCH` version is changed when the new version does not include underlying database schema changes. `PATCH` version change usually happens bi-weekly following our release schedule.

### Upgrade MINOR and PATCH version

Just replace the version string and restart. Bytebase will self-upgrade automatically.

### Upgrade from 1.x

Please first upgrade to 2.1.0 and then upgrade to the latest version.
