---
title: External Approval
---

In case your organization has already deployed an OA system and all requests are approved there, you
can configure an external approval flow as an approval node in the [Custom Approval](/docs/administration/custom-approval/#external-approval).

To configure an external approval flow, you need to specify an API endpoint for the external system.
Bytebase will call that endpoint during the lifecycle of custom approval flow.

That endpoint needs to implement the following methods:

<HintBlock type="info">

For API details, check the [source code](https://github.com/bytebase/bytebase/blob/release/%%bb_version%%/backend/plugin/app/relay/relay_client.go).

</HintBlock>

- [POST /approval](#post-approval) to create the external approval flow
- [PATCH /approval/:id](#patch-approvalid) to update the external approval flow
- [GET /approval/:id](#get-approvalid) to sync the external approval flow
