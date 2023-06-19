---
title: External Approval
---

In case your organization has already deployed an OA system and all requests are approved there, you
can configure an external approval flow as an approval node in the [Custom Approval](/docs/administration/custom-approval/#external-approval).

To configure an external approval flow, you need to specify an API endpoint for the external system.
Bytebase will call that endpoint during the lifecycle of custom approval flow.

That endpoint needs to implement the following methods:

- [POST /approval](#post-approval) to create the external approval flow
- [PATCH /approval/:id](#patch-approvalid) to update the external approval flow
- [GET /approval/:id](#get-approvalid) to sync the external approval flow

## POST /approval

TBD

## PATCH /approval/:id

TBD

## GET /approval/:id

TBD
