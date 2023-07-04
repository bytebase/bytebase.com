---
title: Manage License
---

## How license works

Bytebase offers following [pricing plans](/pricing):

- Free
- Pro
- Enterprise

Both Pro and Enterprise plans require purchasing license. The license includes a number of database instance quota.

<HintBlock type="info">

The price is based on the Plan and the purchased instance quota. To save budget, you can just purchase the instance quota covering a subset of your instances (e.g. only production instances).

</HintBlock>

- For Pro plan, you need to purcahse a Pro license with a minimum 1 instance quota.
- For Enterprise plan, you need to purchase an Enterprise license with a minimum 5 instance quota.

Features like [SSO](/docs/administration/sso/overview/), [Watermark](/docs/security/watermark/) are Enterprise features and not specific to a particular instance. Thus as long as you have the Enterprise license, you can use those features.

On the other hand, there are instance specific features like [custom approval](/docs/administration/custom-approval), [sensitive data masking](/docs/security/anonymize-data), and [AI-based index advisor](/docs/slow-query/index-advisor). To activate those features on the instance, you need to assign the quota to the instance.

## Configure license

Navigate to the **Subscription** page, paste your license into the input box, and click the **Upload license** button.

![license](/content/docs/administration/license/license.webp)

## Configure instance license

![license-drawer](/content/docs/administration/license/license-drawer.webp)

You can assign or unassign your license to instances in following ways:

- Go to the **Subscription** page, click the instance area or the **edit icon** button, the license configuration drawer will appear.

![license-1](/content/docs/administration/license/license-1.webp)

- On the instance details page, toggle the **Assign License** switch, and click the **Update** button.

![license-2](/content/docs/administration/license/license-2.webp)

- From a particular feature setting, click the **lock icon** button or the **Assign License** button to open the license configuration drawer. See the example figures below for reference.

![license-3](/content/docs/administration/license/license-3.webp)

![license-4](/content/docs/administration/license/license-4.webp)
