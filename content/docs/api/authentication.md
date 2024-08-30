---
title: Authentication
---

|          |                                                                                     |
| -------- | ----------------------------------------------------------------------------------- |
| Endpoint | [POST /v1/auth/login](https://api.bytebase.com/#tag/authservice/POST/v1/auth/login) |
| Request  | https://api.bytebase.com/#model/loginrequest                                        |
| Response | https://api.bytebase.com/#model/loginresponse                                       |

## Service Account

You should create service account to interact with the Bytebase API.

Visit Bytebase **Members** management page in **Security & Policy** section on the left. Click the pencil icon on your service account's row to grant **Owner** or **DBA** role to it.

![create-service-account](/content/docs/get-started/work-with-terraform/create-service-account.webp)

<HintBlock type="warning">

You can only copy the key right after creating the service account. The key will disappear if you refresh the page.

</HintBlock>

## Login to fetch the token

You need to obtain the exchange token before calling the API.

```text
export bytebase_url=%%bb_api_endpoint%%
export bytebase_account=<<your_service_account>>@service.bytebase.com
export bytebase_password=<<your_service_key>>

bytebase_token=$(curl -v ${bytebase_url}/v1/auth/login \
    --data-raw '{"email":"'${bytebase_account}'","password":"'${bytebase_password}'","web":true}' \
    --compressed 2>&1 | grep token | grep -o 'access-token=[^;]*;' | grep -o '[^;]*' | sed 's/access-token=//g; s/;//g')
```

## Test API

```text
# List projects
curl --request GET ${bytebase_url}/v1/projects \
  --header 'Authorization: Bearer '${bytebase_token}
```
