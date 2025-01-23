---
title: Custom Approval
feature_name: CUSTOM_APPROVAL
---

<TutorialBlock url="/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow" title="Database Change Management with Risk-Adjusted Approval Flow" />

<iframe width="675" height="380" src="https://www.youtube.com/embed/K_RWlqdplZQ" title="YouTube video player" className="w-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowFullScreen"></iframe>

<HintBlock type="info">

By default, you **can not** self-approve your own created issue even if you are a qualified approver. You
can toggle this behavior under project settings.

</HintBlock>

In **Settings > Custom Approval**, you can choose which approval flow to use for a [risk level](/docs/administration/risk-center) and define approval flows.

An approval flow can contain one or multiple approval nodes. Each approval node specifies a role. Any member
of the role can approve that node. An issue will enter the rollout stage once all nodes have been approved.
Note, depending on how the [rollout policy](/docs/administration/environment-policy/rollout-policy/) is configured,
it may still require another step to roll out the change manually.

![Approval Flow](/content/docs/administration/custom-approval/edit-approval-flow.webp)

To create or update approval flows, click the **Approval Flows** tab.

## Rules

To choose the approval flow for a risk level, click the **Rules** tab.
Choose the preset "Skip manual approval" approval flow for a risk if you don't want an approval flow at all.

## External approval

You can configure an approval node pointing to an external approval system. Bytebase will sync the
approval status from the external system, and will approve the node once the external flow is approved there.

<HintBlock type="info">

Bytebase polls the endpoint to sync the latest approval status when:

1. Issue detail page is opened.
1. Every 10 minutes in the background.

</HintBlock>

Click the **External Approval** tab. Specify the external approval system API endpoint. The API endpoint needs to implement the [external approval API](/docs/api/external-approval).

![External Approval](/content/docs/administration/custom-approval/external-approval.webp)

Once External Approval is configured, it can be added as an approval node.

![External Approval Node](/content/docs/administration/custom-approval/external-approval-node.webp)

## Custom roles

Sometimes, the predefined project roles might not fit your needs. e.g. You require tester to approve.
In that case, you can use [custom roles](/docs/administration/custom-roles).
