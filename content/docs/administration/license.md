---
title: Manage License
---

Bytebase offers following [pricing plans](/pricing):

- Free
- Pro
- Enterprise

Both Pro and Enterprise plans require purchasing license. The license includes a number of database instance quota.

- For Pro plan, you need to purchase a Pro license with a minimum 1 instance quota.
- For Enterprise plan, you need to purchase an Enterprise license with a minimum 5 instance quota.

Features like [SSO](/docs/administration/sso/overview/), [Watermark](/docs/security/watermark/) are Enterprise features and not specific to a particular instance. Thus as long as you have the Enterprise license, you can use those features.

On the other hand, there are instance specific features like [custom approval](/docs/administration/custom-approval), [sensitive data masking](/docs/security/mask-data), and [AI-based index advisor](/docs/slow-query/index-advisor). To activate those features on the instance, you need to assign the quota to the instance.

<HintBlock type="info">

The price is based on the Plan and the purchased instance quota. To save budget, you can just purchase the instance quota covering a subset of your instances (e.g. only production instances).

</HintBlock>

![instance-license](/content/docs/administration/license/instance-license.webp)

## Configure license

Navigate to the **Subscription** page, paste your license into the input box, and click the **Upload license** button.

![license](/content/docs/administration/license/license.webp)

## Configure instance license

![license-drawer](/content/docs/administration/license/license-drawer.webp)

You can assign or unassign your license to instances in following ways:

- Go to the **Subscription** page, click the instance area or the **edit icon** button, the license configuration drawer will appear.

![license-1](/content/docs/administration/license/license-1.webp)

- On the **Instances** details page, tick the instances you want to assign license to, and click the **Assign License** button.

![license-2](/content/docs/administration/license/license-2.webp)

- You can also assign instance license when coming across a gated feature. To assign for a table particularly so that you can operate on sensitive data, go to **Databases** to click the database this table belongs to, where you can find the row representing your table. Click the row and then the pencil icon by certain column's masking level. Then you'll see the **Assign License** button.

![license-3](/content/docs/administration/license/license-3.webp)

![license-4](/content/docs/administration/license/license-4.webp)

![license-5](/content/docs/administration/license/license-5.webp)
