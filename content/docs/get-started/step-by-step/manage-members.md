---
title: Manage Workspace Members
---

Bytebase is built for team collaboration for managing the database development lifecycle. A user in
the Bytebase workspace is defined as a member. `member` models after a principal performing the
operation. Most of the time, user corresponds to a human being. Bytebase also has a special robot
user named "Bytebase" (ID=1) which conducts system operations.

![member](/content/docs/get-started/step-by-step/manage-members/member.webp)

This document describes how to add new member, update the role and deactivate a member at workspace level.

## Prerequisites

- **Workspace Admin** role

## Add a team member

1. Click **Settings** on the navigation bar.
2. Click **Workspace** > **Members**.
3. Enter email address and select role.
4. Click **Add**, and you can find the new member in the **Active members** table.

## Edit the member role

1. Click **Settings** on the navigation bar.
2. Click **Workspace** > **Members**.
3. Go to a specific member row in the **Active members** table.
4. Click **Role** dropdown and select a role, and you can find the role is updated.

## Deactivate a member

1. Click **Settings** on the navigation bar.
2. Click **Workspace** > **Members**.
3. Go to a specific member row in the **Active members** table.
4. Click trash icon on the right, and you can find the member in the **Inactive members** table.
