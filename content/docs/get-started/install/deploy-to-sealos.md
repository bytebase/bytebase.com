---
title: Deploy to sealos
---

If you run [Bytebase on Kubernetes](/docs/get-started/self-host/#kubernetes), you need to prepare a Kubernetes cluster, PostgreSQL instance, even storage driver, and ingress for external access.

sealos cloud, on the other hand, provides these dependencies out-of-the-box and [Bytebase](https://github.com/bytebase/bytebase) can be started quickly.

## Prerequisites

A [sealos cloud](https://cloud.sealos.io) account (free signup).

## Deploy

1. Click the following prebuilt template:

   [![](https://raw.githubusercontent.com/labring-actions/templates/main/Deploy-on-Sealos.svg)](https://cloud.sealos.io/?openapp=system-template%3FtemplateName%3Dbytebase)

2. click "Deploy Application" on the template page to start deployment.
3. Once deployment concludes, click "Details" to navigate to the application's details.
4. Wait for the application's status to switch to running. Subsequently, click on the external link to open the bytebase's Web interface directly through the external domain.
