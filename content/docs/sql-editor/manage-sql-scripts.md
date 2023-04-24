---
title: Manage SQL Scripts with Sheet
---

`Sheet` is the medium for you to interact inside SQL Editor. Sheet is the entity where you store,
run and share the SQL scripts with your teammates.

## Save sheet

Click **Save** on the upper right of the Editor or use the shortcut key `(⌘ + S)` to save
your SQL queries for later reference. SQL Editor will also automatically record SQL queries which
have run successfully. You can find them in the History panel on the left.

![History](/docs/sql-editor/manage-sql-scripts/save-and-history.webp)

## Query history

SQL Editor will automatically record SQL queries which have run successfully. You can find them in
the **History** panel on the left.

Click **Share** on the upper right of the Editor to share SQL queries in the current tab with your
teammates.

## Configure sheet access

You can configure the sheet with one of the following access levels:

- `Private` - Only you can access this sheet
- `Project` - Both sheet OWNER and project OWNER can read/write, and project DEVELOPER can read
- `Public` - Sheet OWNER can read/write, and all others can read

![Configure access](/docs/sql-editor/manage-sql-scripts/share-link-access.webp)

To share a sheet, click **Copy** button to copy the sharing link to the clipboard.

![Copy the share link](/docs/sql-editor/manage-sql-scripts/share-popover.webp)

## Manage sheet

You can manage sheets in the **Sheets** panel on the top left side of the page. You can find all
created sheets, sheets others shared with you and star sheets.

![Sheets](/docs/sql-editor/manage-sql-scripts/sheet-panel.webp)

## Sync sheet from VCS

For those projects configured with [GitOps workflow](https://www.bytebase.com/docs/vcs-integration/overview), you can set a sheet path template field. The matched files can be synchronized to sheet in SQL Editor with one click.

![Sheet path template field](/docs/sql-editor/manage-sql-scripts/sheet-path-template-field.webp)

In the **Sheets** panel of SQL Editor, there will be a **Sync Sheet from VCS** after selecting a project configured with VCS.

![Sync from VCS](/docs/sql-editor/manage-sql-scripts/sync-from-vcs-button.webp)

When you click it, Bytebase will fetch files with path names matching the template pattern and save them to the sheet. If there is already a sheet with the same name, the content will be updated with the script content in the VCS.

![VCS directory](/docs/sql-editor/manage-sql-scripts/vcs-directory.webp)

![Succeed sync sheet](/docs/sql-editor/manage-sql-scripts/sync-sheet-succeed.webp)
