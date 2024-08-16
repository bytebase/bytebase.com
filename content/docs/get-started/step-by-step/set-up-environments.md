---
title: Set up Environments
---

**Environment** models after various environments in the development pipeline such as test, staging, prod. Most of the time, there is a 1:1 mapping between **Environment** and the real environment.


## Prerequisites

- **Workspace Admin** or **Workspace DBA** role

## View or reorder environments
In **Environments**, view two predefined environments - `Test` and `Prod`. Click **Reorder** to adjust.

![environment](/content/docs/get-started/step-by-step/set-up-environments/bb-environment.webp)


## Edit an environment

Choose an existing environment. Edit name, rollout policy, etc. and click **Update**. 

Able to **Configure policy** under **SQL Review** as well. You can **create policy** yourself, add your rules. 

Change your rules in **Change the template**.

**Change attached resouces** -- attach to an `Environment` to effect all databases belonging to this environment, or attatch to a `Project` where other projects in a same environment ignores your SQL review policy.

![change-rules](/content/docs/get-started/step-by-step/set-up-environments/change-rules.webp)


## Add an environment

Manual rollout supported.

You can **Mark as production environment** to make it appear differently from other environments.