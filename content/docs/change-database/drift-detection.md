---
title: Schema Drift Detection
feature_name: 'DRIFT_DETECTION'
---

Bytebase is supposed to take over applying the database schema changes on behalf of the user. It records the detailed migration history and the before/after schema snapshot for each migration it applies.

Drift usually happens when user applies out-of-band schema changes (such as hot fix) directly to the database without using Bytebase.

A background process periodically compares the recorded latest schema with the actual schema in the targeting database and surface the drift if found.

## Detect

### Set a baseline

Within `Sample Project`, go to **Database** > **Databases**. Click and enter detail page of database `hr_prod`, go to **Change History** page.

**Establish new baseline** from top right, you'll be redirected to an issue page. **Create** this issue on top right and it rolls out automatically. The newly created baseline appears in **Change History**.

![baseline](/content/docs/change-database/drift-detection/baseline.webp)

### Change Schema outside Bytebase

The most simplified example of these changes is operating in **Admin mode** within Bytebase SQL Editor. It's similar to operating within your terminal.

- You can access SQL Editor from top right anytime, opening a new webpage. If no worksheet was open in SQL Editor, you'll have to **Connect to a database**/**Select a database to start**. Choose database `hr_prod`.

    ![sql-editor-homepage](/content/docs/change-database/sql-editor-homepage.webp)

- Or enter SQL Editor from database detail page. This way you'll be operating within `hr_prod`, with no need to select database anymore.

    ![sql-editor-entry-database](/content/docs/change-database/drift-detection/sql-editor-entry-database.webp)

Click the gold wrench icon to enter Admin mode.

![admin-mode-entry](/content/docs/change-database/admin-mode-entry.webp)

You can make some Schema change here. Then Exit.

![admin-mode-ddl](/content/docs/change-database/admin-mode-ddl.webp)

### Display

Within database detail page, **Sync Database**. Schema Drift is detected and displayed under **Anomalies** section.

![schema-drift-detected](/content/docs/change-database/schema-drift-detected.webp)

Click **View diff** to see the Schema change in SQL statements.

![view-diff](/content/docs/change-database/view-diff.webp)

## Remediate with baseline

You can recover the actual schema as the way baseline was.

Stay within `Sample Project`, go to **Sync Schema** on the left. Select baseline as source schema, click **Next**.

![source-schema](/content/docs/change-database/source-schema.webp)

Select `hr_prod` as target database, you can preview Schema change. **Preview issue**, **Create** this issue and it automatically rolls out.

![target-database](/content/docs/change-database/target-database.webp)

You can go back to database detail page to check **Overview**, where there's `No anomalies detected` again. Now the actual schema is the same as baseline.