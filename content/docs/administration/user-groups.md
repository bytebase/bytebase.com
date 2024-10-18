---
title: User Groups
feature_name: USER_GROUPS
---

`User Group` or simply `Group` contains a set of users. `Group` simplifies access management as you can grant
roles to a `Group` instead of granting to the individual users one by one.

<HintBlock type="info">

Bytebase does not support nested group. A group can only contain users, it can't contain another group.

</HintBlock>

## Add group

Within Workspace, go to **IAM & Admin** > **Users & Groups**, and **Add Group** from top-right.

![add-group](/content/docs/administration/user-groups/add-group.webp)

Create an Email for this group, it'll serve as an account and _cannot be changed after creation_. Fill the group's name into the Title bar. You can **Add member** below, where they can be `Group member` as well as `Group owner`.

![add-group-detail](/content/docs/administration/user-groups/add-group-detail.webp)

Here we've created a `Contractor Group`, you can view or edit it under **Groups** page.

![view-under-groups](/content/docs/administration/user-groups/view-under-groups.webp)

You can see which group a user belongs to under **Users** page as well.

![view-under-users](/content/docs/administration/user-groups/view-under-users.webp)

## Grant roles to group

Now that we've created this `Contractor Group`, we can assign corresponding permissions to these groups within any project.

**Select Project** from top left. Enter `Basic Project`.

![enter-basic-project](/content/docs/administration/user-groups/enter-basic-project.webp)

Go to **Manage** > **Members** where you can see the project's members and roles. Our `Contractor Group` is not among them before we **Grant Access** to the group from top right.

Choose **Groups** and Select our group in **Grant Access** detail page. **Assign role** and **Confirm**.

![grant-access](/content/docs/administration/user-groups/grant-access.webp)

Now you can see the `Contractor Group` under **View by members** page as well as **View by roles** page within **Members** section of `Basic Project`.

![project-members-or-roles](/content/docs/administration/user-groups/project-members-or-roles.webp)

All members within this group now share permission to the project.
