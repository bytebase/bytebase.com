---
title: Authentication
---

## Service Account

You should create service account to interact with the Bytebase API.

Visit Bytebase member management page (Click **Settings** on the navigation bar, and then click **Workspace > Members**).

Name your service account, and grant the **Owner** or **DBA** role to it.

![create-service-account](/content/docs/get-started/work-with-terraform/create-service-account.webp)

<HintBlock type="warning">

You can only copy the key right after creating the service account. The key will disappear if you refresh the page.

</HintBlock>

## Login to fetch the token

You need to obtain the exchange token before calling the API.

```text
export bytebase_url=http://bytebase.example.com
export bytebase_account=xxx@service.bytebase.com
export bytebase_password=<<your_service_key>>

bytebase_token=$(curl -v ${bytebase_url}/v1/auth/login \
    --data-raw '{"email":"'${bytebase_account}'","password":"'${bytebase_password}'","web":true}' \
 --compressed 2>&1 | grep token | grep -o 'access-token=[^;]_;' | grep -o '[^;]_' | sed 's/access-token=//g; s/;//g')
```

## Call API

```text
curl --request GET ${bytebase_url}/v1/projects \
  --header 'Authorization: Bearer '${bytebase_token}
```
