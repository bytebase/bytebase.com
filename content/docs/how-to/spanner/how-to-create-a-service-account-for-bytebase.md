---
title: How to Create a Service Account for Bytebase
description: Step-by-Step guide about how to create a Google Cloud service account used by Bytebase for Spanner
---

1. Go to [Google Cloud console](https://console.cloud.google.com/).
1. Click **APIs & Services** and then **Credentials**. You might have to click **Menu** on the top left first.
1. Click **Create Credentials** and then **Service account**.
1. For **Service account name**, enter a name for the service account.
1. Click **Create and Continue**.
1. For **Select a role**, select **Cloud Spanner Database Admin** for the service account.
1. Click **Done**.
1. Click the created service account.
1. At the top, click **Keys** and then **Add Key** and then **Create new key**. Make sure the key type is set to **JSON** and click **Create**.
1. You'll get a message that the service account's private key JSON file was downloaded to your computer. Make a note of the file name and where your browser saves it. You'll need it later.

When [adding an instance](/docs/get-started/configure-workspace/add-an-instance/#add-an-instance) in Bytebase, the `Credentials` input should be the content of the JSON file.
