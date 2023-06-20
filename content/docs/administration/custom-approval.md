---
title: Custom Approval
---

<EnterpriseOnlyBlock />

In **Settings > Custom Approval**, you can choose which approval flow to use for a [risk level](/docs/administration/risk-center) and define approval flows.

## Rules

To choose the approval flow for a risk level, click the **Rules** tab.
Choose the preset "Skip manual approval" approval flow for a risk if you don't want an approval flow at all.

## Approval flows

To create or update approval flows, click the **Approval Flows** tab.
An approval flow must have at least one approval node.

## External Approval

You can configure an approval node pointing to an external approval system. Bytebase will sync the
approval status from the external system, and will approve the node once the external flow is approved there.

Click the **External Approval** tab. Specify the external approval system API endpoint. The API endpoint needs to implement the [external approval API](/docs/api/external-approval).

![External Approval](/content/docs/administration/custom-approval/external-approval.webp)

Once External Approval is configured, it can be added as an approval node.

![External Approval Node](/content/docs/administration/custom-approval/external-approval-node.webp)

## Custom roles

Sometimes, the predefined project roles might not fit your needs. In that case, you can use [custom roles](/docs/administration/custom-roles).
