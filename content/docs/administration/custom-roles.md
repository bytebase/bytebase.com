---
title: Custom Roles
feature_name: CUSTOM_ROLES
---

<TutorialBlock url="/docs/tutorials/how-to-manage-roles" title="How to Manage Roles" />

In **Settings > Custom Roles**, you can define new custom roles and apply them to project members.

Custom roles don't bear any additional permissions in the project. They are used in the [custom approval](/docs/administration/custom-approval). e.g. If you want to add `tester` to the approval flow, you can define a `tester` custom role and
add it to the custom approval flow. Then in the project, you can grant that `tester` custom role to the project's
assigned testers.

## Create custom roles

To create custom roles, go to **IAM & Admin > Custom Roles**. Click **Add role** to create a new role.

![add-custom-role](/content/docs/administration/custom-roles/add-custom-role.webp)

You can choose `Import from role` to build your custom role based on the existing role.

## Add to custom approval flow

Go to **CI/CD > Custom Approval**. From **Approval Flows** tab, choose an approval flow to add.

![add-to-custom-approval-flow](/content/docs/administration/custom-roles/add-to-custom-approval-flow.webp)

## Grant custom role in project

Go to the project member page and grant the role. The granted user will be on the configured
custom approval flow.

![grant-project-member](/content/docs/administration/custom-roles/grant-project-member.webp)
