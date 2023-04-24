---
title: LGTM check
---

You can leverage LGTM check if you want multi-level approval.

The LGTM check requires a "LGTM" comment from project members or owners depending on the setting.
A task can only be approved if there is a "LGTM" comment from the designated person (project member or owner).

## How to use

The LGTM setting is in the project setting page.

![the location of the lgtm setting](/docs/change-database/change-workflow/lgtm/setting.webp)

The LGTM check takes effect if the [approval policy](/docs/administration/environment-policy/approval-policy) is "Require manual approval".

The LGTM check fails if there isn't a valid LGTM comment, and therefore the task cannot be approved.

![the issue page without lgtm](/docs/change-database/change-workflow/lgtm/no-lgtm.webp)

The project member or owner clicks the LGTM button in the comment area to send a "LGTM" comment.

![the position of the lgtm button](/docs/change-database/change-workflow/lgtm/position.webp)

The LGTM check passes if there is a "LGTM" comment from the required persons.

![the issue page with lgtm](/docs/change-database/change-workflow/lgtm/has-lgtm.webp)
