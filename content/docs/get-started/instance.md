---
title: Connect Your Database
---

<HintBlock type="info">

Only **Workspace Admin** or **Workspace DBA** role can configure database instance.

</HintBlock>

To allow Bytebase to execute operations on behalf the end user, you need to supply Bytebase with the
connection info for your database instance.

## Connect to the instance on the same host

<HintBlock type="info">

If you run Bytebase inside Docker and try to connect to a database instance on the same host, then
you need to set host as [host.docker.internal](https://docs.docker.com/desktop/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host).
</HintBlock>

![connect-local-docker](/content/docs/get-started/instance/connect-local-docker.webp)

- If you run Bytebase without Docker and try to connect to a database instance on the same host, then
  you need to set host as `127.0.0.1`

![connect-local-no-docker](/content/docs/get-started/instance/connect-local-no-docker.webp)

## Connect to the instance from Bytebase Cloud

<IncludeBlock url="/docs/get-started/install/whitelist-bytebase-ip"></IncludeBlock>

## Configure SSL

SSL connection configuration only supports PostgreSQL, MySQL, TiDB and ClickHouse for now.

## Configure SSH tunnel

<PricingPlanBlock feature_name='SSH_TUNNEL' />

To protect their databases, some hosting providers block direct remote access. However, they often enable SSH, which allows users to connect to their servers remotely using an SSH client. If you want to connect to a database on one of these servers from Bytebase, you will need to create an SSH tunnel. This will allow you to connect to the database without compromising security.

![ssh explain](/content/docs/get-started/instance/ssh-explain.webp)

1. After filling in the standard database connection information, click **SSH Connection** > **Tunnel + Private Key**.
2. Fill in the SSH connection information. The **Private Key** is used to authenticate the SSH connection. You can also use a password instead.
   ![ssh tunnelling](/content/docs/get-started/instance/bb-instance-ssh-connection.webp)
3. Click **Test Connection**. If the connection is successful, click **Create** to create this instance.

## Configure read-only connection

<PricingPlanBlock feature_name='READONLY_CONNECTION' />

To separate from admin connection, you can configure read-only connections used by SQL Editor once an instance is added. This separation can be configured at the database user/role access control level or replication instance level.

1. Create a new role with read-only access or a read-replica instance.
1. Click **Create** or **+** on **Connection info**.
1. Enter read-only connection info. If this is a read-replica instance, you need to enter its host and port information.
1. Click **Update** to finish the configuration.
1. Click **+** to add more, or click trash icon to delete.

![bb-instance-read-only-connection](/content/docs/get-started/instance/bb-instance-read-only-connection.webp)

## Configuring Extra Connection Parameters  

When connecting to a database instance, you may need to specify additional parameters to customize the connection behavior. Bytebase provides a feature that allows users to define extra parameters for the database connection string directly in the UI.  

### Supported Database Connection Parameters  

Below are links to official documentation for configuring connection parameters:  

- **PostgreSQL**: [Connection Parameters](https://www.postgresql.org/docs/current/libpq-connect.html)  
- **Oracle (Go-ORA)**: [Go-ORA Connection Options](https://github.com/sijms/go-ora)  
- **MySQL (Go SQL Driver)**: [Connection Parameters](https://github.com/go-sql-driver/mysql?tab=readme-ov-file#parameters)  
- **Microsoft SQL Server (Go-MSSQL)**: [Connection Options](https://pkg.go.dev/github.com/microsoft/go-mssqldb#section-readme)  

### Common Connection Parameters  

| Parameter | Description | Example |
|-----------|-------------|---------|
| `sslmode` | SSL connection mode (PostgreSQL) | `require` |
| `connect_timeout` | Timeout for establishing connections | `10` |
| `readTimeout` | Read timeout for MySQL and MSSQL connections | `30s` |
| `max_connections` | Maximum number of connections allowed | `100` |

For a full list of supported parameters, refer to the official database documentation links above.  

## Choose your data source in SQL Editor

You may select data sources between the admin and read-only connection while running SQL queries in SQL Editor.

![bb-sql-editor-data-source](/content/docs/get-started/instance/bb-sql-editor-data-source.webp)

The **Admin Data Source Query Restrictions** could be set either by environment or project level.

![bb-data-source-env](/content/docs/get-started/instance/bb-data-source-env.webp)

![bb-data-source-project](/content/docs/get-started/instance/bb-data-source-project.webp)

If both are set, the higher restriction will be applied. The order of restriction level from high to low is as follows:

1. ON - Disallow querying data from the admin data source
1. ON - Fallback to the admin data source if no read-only data source is available
1. Off

## Use IAM Auth

<PricingPlanBlock feature_name='EXTERNAL_SECRET_MANAGER' />

You can use Cloud providers' IAM user to connect to their databases.

### AWS RDS/Aurora

While creating an RDS or Aurora instance, you can choose to enable IAM authentication.
![](/content/docs/get-started/instance/aws-rds-iam/db-password-iam.webp)

#### Create IAM policy

1. Go to **IAM > Policies** and click **Create policy**.
   ![](/content/docs/get-started/instance/aws-rds-iam/create-policy.webp)

1. Select `RDS IAM Authentication` for service.
   ![](/content/docs/get-started/instance/aws-rds-iam/rds-iam-auth.webp)

1. Select `connect` permission and `specific` as Resources. Check `Any in this account`.
   ![](/content/docs/get-started/instance/aws-rds-iam/connect-permission.webp)

  <HintBlock type="info">
    `Any in this account` will mark the resource as
    `arn:aws:rds-db:*:<<your-db-id>>:dbuser:*/*`, which contains 3 `*`:
    - 1st *: any regions
    - 2nd *: any databases
    - 3rd *: any database users
    
    This will allow the RDS connect on behalf of all database users in all databases in your account.
    If you want to limit the connection to specific databases, please follow [this doc](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.IAMPolicy.html).
  </HintBlock>

1. Name it `rds-connect` and create this policy.

#### Create IAM user

1. Go to **IAM > Users** can click **Create user**. Name it `rds-connector`.
   ![](/content/docs/get-started/instance/aws-rds-iam/create-user.webp)

1. Choose Attach policy directly and select the `rds-connect` policy. Click **Next** and then click **Create user**.
   ![](/content/docs/get-started/instance/aws-rds-iam/attach-policy.webp)

1. On the user detail page, click **Create access key**.
   ![](/content/docs/get-started/instance/aws-rds-iam/access-key.webp)

1. Choose `Application running outside AWS` and click **Next**.
   ![](/content/docs/get-started/instance/aws-rds-iam/app-outside-aws.webp)

1. Then you get the **access key** and the **secret access key**.
   ![](/content/docs/get-started/instance/aws-rds-iam/retrieve-access-keys.webp)

#### Use IAM Auth in Bytebase

1. Start Bytebase with AWS IAM credentials by passing the AWS environment variables:

   ```bash
     docker run --init \
     -e AWS_ACCESS_KEY_ID=<<your-access-key>> \
     -e AWS_SECRET_ACCESS_KEY=<<your-secret-access-key>> \
     -e AWS_REGION=<<your-aws-region>> \
     --name bytebase \
     --publish 8080:8080 --pull always \
     bytebase/bytebase:%%bb_version%%
   ```

1. Go to RDS instance detail page, you'll find the **endpoint** and **port**.
   ![](/content/docs/get-started/instance/aws-rds-iam/mysql-connection.webp)

1. Configure instance connection using `AWS RDS IAM`, create the `bytebase` user with `AWSAuthenticationPlugin` and grant permission.

   ```sql
       CREATE USER bytebase@'%' IDENTIFIED WITH AWSAuthenticationPlugin AS 'RDS';

       ALTER USER 'bytebase'@'%' REQUIRE SSL;

       GRANT ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE VIEW,
       DELETE, DROP, EVENT, EXECUTE, INDEX, INSERT, PROCESS, REFERENCES,
       SELECT, SHOW DATABASES, SHOW VIEW, TRIGGER, UPDATE, USAGE,
       RELOAD, LOCK TABLES, REPLICATION CLIENT, REPLICATION SLAVE
       /*!80000 , SET_USER_ID */ON *.* to bytebase@'%';
   ```

1. Use the instance endpoint, port and the username `bytebase` to connect the instance.

### Google Cloud SQL

#### Create a service account

1. Visit [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) to create a new service account `bytebase`.

1. Grant `Cloud SQL Admin` permission to the service account.
   ![](/content/docs/get-started/instance/gcp-iam/grant-cloud-sql-admin.webp)

1. After the service account is created, you may view the email for the service account `bytebase@<<you-project-name>>.iam.gserviceaccount.com`. Go to **KEYS**.
   ![](/content/docs/get-started/instance/gcp-iam/service-account-keys.webp)

1. Click **ADD KEY** and then **Create new key**.
   ![](/content/docs/get-started/instance/gcp-secret-manager/create-key-file.webp)

1. Choose `JSON` as the key type and click **CREATE**. Keep the downloaded private key file. This will be passed
   as environment variables when starting Bytebase.
   ![](/content/docs/get-started/instance/gcp-iam/create-pk.webp)

1. Go to Cloud SQL database instance detail page, and make sure `cloudsql_iam_authentication` is enabled.
   ![](/content/docs/get-started/instance/gcp-iam/cloudsql-iam-auth-on.webp)

1. Go to **Users** tab, and click **ADD USER ACCOUNT**.
   ![](/content/docs/get-started/instance/gcp-iam/sql-users.webp)

1. Select `Cloud IAM` and copy/paste the service account email `bytebase@<<your-project-name>>.iam.gserviceaccount.com`.
   ![](/content/docs/get-started/instance/gcp-iam/user-account-type.webp)

1. Then you can get the Cloud SQL IAM user: `bytebase`.
   ![](/content/docs/get-started/instance/gcp-iam/user-added-bytebase.webp)

#### Use IAM Auth in Bytebase

1. Start Bytebase with Google IAM credentials by passing `GOOGLE_APPLICATION_CREDENTIALS` as an environment variable:

   ```bash
     docker run --init \
     -e GOOGLE_APPLICATION_CREDENTIALS=<<your-json-file>> \
     --name bytebase \
     --publish 8080:8080 --pull always \
     --volume ~/.bytebase/data:/var/opt/bytebase \
     bytebase/bytebase:%%bb_version%%
   ```

1. Go to SQL overview page, you'll find the **Connection name**, use it as the host. Choose `Google Cloud SQL IAM` along with your user `bytebase` to connect to the database.  
   ![](/content/docs/get-started/instance/gcp-iam/connection-name.webp)

### Azure SQL

Bytebase supports connect to Azure SQL through Azure IAM by using default Azure credential and client secret credential. This section introduces how to use [system-assigned managed identity](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview#managed-identity-types) to connect to Azure SQL.
For more information about the credential chain in default Azure credential, please refer to [default azure credential overview](https://learn.microsoft.com/en-us/azure/developer/go/sdk/authentication/credential-chains#how-a-chained-credential-works).

#### Create a VM with enabled system-assigned managed identity

1. Enable system assigned managed identity while creating a VM.
   ![](/content/docs/get-started/instance/azure-iam/enable-system-assigned-managed-identity-while-creating-vm.webp)

2. Deploy the Bytebase on the VM in Docker:

   ```bash
     docker run --init \
     --network=host \
     --name bytebase \
     --pull always \
     --volume ~/.bytebase/data:/var/opt/bytebase \
     bytebase/bytebase:%%bb_version%%
   ```

#### Enable Microsoft Entra Authentication in Azure SQL

1. Go to the Azure SQL panel, and set the Microsoft Entra Admin for Azure SQL managed instance, don't forget to click Save button. Once you set the Microsoft Entra Admin, the Microsoft Entra authentication is enabled. Check the [Microsoft guide](https://learn.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/configure-azure-ad-authentication-for-sql-vm?view=azuresql&tabs=azure-portal) if you use Azure SQL on VM.

   ![](/content/docs/get-started/instance/azure-iam/set-microsoft-entra-admin-in-azure-sql-panel.webp)

#### Create a contained database user

1. Connect to the Azure SQL database using the Microsoft Entra Admin account.

2. For each databases desired to be managed by Bytebase, running the following SQL command inside the database to a contained database user:

   ```sql
      CREATE USER [<Microsoft_Entra_principal_name>] FROM EXTERNAL PROVIDER;
      ALTER ROLE db_owner ADD MEMBER [<Microsoft_Entra_principal_name>];
   ```

#### Connect to Azure SQL Database in Bytebase

1. Using Azure IAM default credential to connect to Azure SQL database:

   ![](/content/docs/get-started/instance/azure-iam/connect-to-azure-sql-using-azure-iam-frontend-form.webp)

In this way, Bytebase can only connect to one specific Azure SQL database. To manage multiple Azure SQL databases in one instance inside Bytebase, considering set the VM principal as the Azure SQL Managed Instance Microsoft Entra Admin.

## Use external secret manager

<PricingPlanBlock feature_name='EXTERNAL_SECRET_MANAGER' />

By default, Bytebase stores the database credentials in an obfuscated format in its own meta store.
You can also instruct Bytebase to retrieve the database credential from an external secret manager.

![external-secret-manager-flow](/content/docs/get-started/instance/external-secret-manager-flow.webp)

1. User tries to access database from Bytebase.
1. Bytebase calls the external secret manager to exchange the configured key for the database password.
1. Bytebase retrieves the password and connect the database.

### HashiCorp Vault

<HintBlock type="info">

Bytebase only supports KV v2 engine.

</HintBlock>

Create the secret in Vault like below:

- Secret engine name: `secret`
- Secret path: `bytebase`
- Secret key: `DB_PASSWORD`
- Secret: `<<YOUR_PASSOWRD>>`

  ![create-secret](/content/docs/get-started/instance/vault/create-secret.webp)

Configure instance to retrieve database password from vault:

- Specify the Vault URL.

- Specify the Vault auth method.

  - For [Token](https://developer.hashicorp.com/vault/docs/auth/token), specify the token.
  - For [AppRole](https://developer.hashicorp.com/vault/docs/auth/approle), specify the auth role id and secret id.

- Specify the secret engine name`secret`, secret path `bytebase` and secret key `DB_PASSWORD`.

  ![vault-auth](/content/docs/get-started/instance/vault/auth.webp)

### AWS Secrets Manager

#### Create an IAM user to access the Secrets Manager

<HintBlock type="info">

It's recommended to create a dedicated IAM user for Bytebase to retrieve the secrets. You only need to do this once
.
</HintBlock>

Visit [IAM](https://aws.amazon.com/iam/) to create a new IAM user. Name it `bytebase-external-secret`.

![](/content/docs/get-started/instance/aws-secrets-manager/iam-user-detail.webp)

Attach `SecretsManagerReadWrite` permission.

![](/content/docs/get-started/instance/aws-secrets-manager/iam-set-permission.webp)

After creating the IAM user, create an Access Key to be used by Bytebase later.

![](/content/docs/get-started/instance/aws-secrets-manager/iam-create-access-key.webp)

Select `Third-party service` as the use case.

![](/content/docs/get-started/instance/aws-secrets-manager/iam-access-key-use-case.webp)

Optionally set the description tag and in the `Retrieve access keys` screen, record `Access key` and
`Secret access key`. They will be passed as environment variables when starting Bytebase.

![](/content/docs/get-started/instance/aws-secrets-manager/iam-access-key-info.webp)

#### Create secret

Visit [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) to store a new secret. Select
`Other type of secret`, and add a key/value pair. The key is `DB_PASSWORD` and the value is your
database user password.

![](/content/docs/get-started/instance/aws-secrets-manager/secret-type.webp)

Next to the `Configure secret`, use `bytebase` as the Secret name

![](/content/docs/get-started/instance/aws-secrets-manager/configure-secret.webp)

Skip rotation, review and create the secret.

#### Use secret in Bytebase

Restart Bytebase with the following environment variables

- `AWS_REGION`=`us-east-1`
- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are the ones you previously created on the IAM user:

```text
AWS_REGION=us-east-1 AWS_ACCESS_KEY_ID=xxx AWS_SECRET_ACCESS_KEY=yyy ./bytebase <<other options>>
```

```text
docker run --init \
  -e AWS_REGION=us-east-1 AWS_ACCESS_KEY_ID=xxx AWS_SECRET_ACCESS_KEY=yyy \
  --name bytebase \
  <<other options>>
```

Go to instance setting, specify `bytebase` as the Secret name and `DB_PASSWORD` as the Secret key.
These two correspond to the value you created in the AWS Secrets Manager.

![](/content/docs/get-started/instance/aws-secrets-manager/auth.webp)

### GCP Secret Manager

#### Create a service account to access the Secret Manager

<HintBlock type="info">

It's recommended to create a dedicated service account for Bytebase to retrieve the secrets. You only need to do this once
.
</HintBlock>

Visit [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) to create a new service account.

![](/content/docs/get-started/instance/gcp-secret-manager/create-service-account-name.webp)

Grant `Secret Manager Secret Accessor` permission to the service account.

![](/content/docs/get-started/instance/gcp-secret-manager/create-service-account-permission.webp)

After the service account is created, visit its `KEYS` page and add a new key.

![](/content/docs/get-started/instance/gcp-secret-manager/create-key-file.webp)

Choose `JSON` as the key type and create. Keep the downloaded private key file. This will be passed
as environment variables when starting Bytebase.

![](/content/docs/get-started/instance/gcp-secret-manager/create-key-file2.webp)

#### Create secret

Visit [GCP Secret Manager](https://console.cloud.google.com/security/secret-manager/create) to create a new secret.

![](/content/docs/get-started/instance/gcp-secret-manager/create-secret.webp)

After creation, note the fully qualified secret name.

![](/content/docs/get-started/instance/gcp-secret-manager/secret-full-name.webp)

#### Use secret in Bytebase

Restart Bytebase by specifying `GOOGLE_APPLICATION_CREDENTIALS`=`private key file` as an environment variable. The
private key file is the JSON file downloaded before for the service account.

<HintBlock type="info">

If you run Bytebase in docker, you need to put the JSON file under the mounted directory. Otherwise, Bytebase
won't be able to access the key file.

</HintBlock>

```text
docker run --init \
  -e GOOGLE_APPLICATION_CREDENTIALS=/var/opt/bytebase/key.json \
  --name bytebase \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  <<other options>>
```

Go to instance setting, specify the fully qualified name such as `projects/228712144016/secrets/DB_PASSWORD`
as the Secret full name.

![](/content/docs/get-started/instance/gcp-secret-manager/auth.webp)

### Custom endpoint

![external-secret-manager-config](/content/docs/get-started/instance/external-secret-manager-config.webp)

If you have a custom external secret manager, you can supply its API endpoint by enclosing it with the mustache `{{` `}}`, e.g `{{http://example.com/secrets/mydbkey}}`

**Sample request**

Usually `mydbkey` is unique for each database and used for exchanging the password for that database.

```text
curl "http://example.com/secrets/mydbkey"
```

**Expected response**

Bytebase expects the following JSON response from the external secret manager. The `payload.data` is the
base64-encoded contents of the database password.

```json
{
  "payload": {
    "data": "xxx"
  }
}
```

## PostgreSQL

If the connecting instance is managed by the cloud provider, then SUPERUSER is not available and you should create the role via that provider's admin console. The created role will have provider specific restricted semi-SUPERUSER privileges:

- In [AWS RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.Roles.html#Appendix.PostgreSQL.CommonDBATasks.Roles.rds_superuser), the roll is `rds_superuser`.

- In [Google Cloud SQL](https://cloud.google.com/sql/docs/postgres/users), the role is `cloudsqlsuperuser`.

You should grant Bytebase privileges with that semi-SUPERUSER role, e.g.:

```sql
-- For AWS RDS
GRANT rds_superuser TO bytebase
```

```sql
-- For Google Cloud SQL
GRANT cloudsqlsuperuser TO bytebase
```

Besides, you may need to grant Bytebase privileges with `GRANT role_name TO bytebase;` for all existing roles. Otherwise, Bytebase may not access existing databases or tables.

<HintBlock type="info">

To prevent blocking operations for a long time, consider setting a [lock_timeout](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-LOCK-TIMEOUT) on the Bytebase user.

</HintBlock>

## Oracle

For managing Oracle database, Bytebase provides two manage modes: **Manage based on database** and **Manage based on schema**.
You can choose the manage mode when adding an instance or in the instance detail page.

### Manage based on database

In this mode, Bytebase will manage the database as a whole.

- For normal Oracle instance, we treat the Oracle database as a Bytebase database.
- For CDB instance, we treat the CDB and all PDBs as Bytebase databases.
- For PDB instance, we treat the PDB as a Bytebase database.

### Manage based on schema

In this mode, Bytebase will manage the schema as a whole.

- For any Oracle database, we treat the Oracle schema as a Bytebase database.

## Snowflake

![sf-account-locator](/content/docs/tutorials/database-change-management-with-snowflake/bb-account-locator.webp)

To find the **Account Locator**, go to your Snowflake account, you can find it in the URL, or from the **locator field (but lower case)**.

![sf-locator](/content/docs/tutorials/database-change-management-with-snowflake/sf-account-locator.webp)

If the account is located in the AWS US West (Oregon) region, then it would be something like `xy12345`, otherwise, the format will be `<<account_locator>>.<<cloud_region_id>>.<<cloud>>` such as `xy12345.us-east-2.aws`. See [official doc](https://docs.snowflake.com/en/user-guide/admin-account-identifier#using-an-account-locator-as-an-identifier).

## Databricks

In **Environment**, select your database. Then fill **Host or Socket**, **Warehouse ID** and **Token**.

![databricks-0](/content/docs/get-started/instance/databricks-0.webp)

- **Host or Socket**. Copy it from the URL of your Databricks account.

![databricks-host-or-socket](/content/docs/get-started/instance/databricks-host-or-socket.webp)

- **Warehouse ID**. Go to **SQL Warehouses** and click your warehouse (that is, your database), copy the ID in **Overview** section.

![databricks-id-1](/content/docs/get-started/instance/databricks-id-1.webp)

![databricks-id-2](/content/docs/get-started/instance/databricks-id-2.webp)

- **Token**. Go to your avatar on the upper-right of Databricks to find **Settings**. Click **Developer** and then **Access tokens**, where you **Generate new token** and copy it to paste under **Token** in Bytebase.

![databricks-token](/content/docs/get-started/instance/databricks-token.webp)

Click **Test Connection** to verify.

## Google Cloud Spanner

For connecting to Google Cloud Spanner, you need to provide the following info:

1. Google cloud project ID.
1. Google cloud Spanner instance ID.
1. Google cloud service account credentials.

![spanner](/content/docs/get-started/instance/spanner.webp)

### Specify Google Cloud Project ID and Spanner Instance ID

![Spanner database detail page](/content/docs/get-started/instance/spanner-url.webp)

From the Spanner database detail page, you can get the project ID and the instance ID from the URL.

For example, the project ID and instance ID are `spanner-test-3717002` and `spanner-bb1` respectively for the above database.

### Create a Google Cloud Service Account as the Credential

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

Upload the JSON file to the `Credentials` input.
