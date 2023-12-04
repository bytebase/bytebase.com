---
title: Backup
---

Bytebase supports both automatic and manual backup at the database level.

![backup-example](/content/docs/disaster-recovery/backup/backup-example.webp)

At the workspace level, Bytebase also supports enforcing [backup schedule policy](/docs/administration/environment-policy/backup-schedule-policy) for each environment. e.g. DBA can require the database in `production` environment to have `daily` backups.

![env-backup-configure](/content/docs/disaster-recovery/backup/env-backup-configure.webp)

## Local storage

By default, backups are stored inside the "backup" folder under the [--data](/docs/reference/command-line#--data-directory) directory locally.

## Cloud storage

Bytebase also supports cloud storage backends.

This is a feature that enables you to store your backup files in the cloud storage. By leveraging the infinite expandable cloud storage, users no longer need to worry about maintaining their local disks.

You only need a cloud storage bucket and sufficient credentials to enable this feature. Bytebase handles all other dirty work. The currently supported cloud storage backends are:

- [AWS S3](#aws-s3)

### AWS S3

#### Step 1 - Create a bucket to store the backup data

Go to the [AWS S3 console](https://s3.console.aws.amazon.com/s3/buckets) to create a new bucket for Bytebase to manage the backup files. Please do not share the same bucket with other applications or services.

We suggest you to enable the S3 bucket versioning so that files can be recovered even if bad things happen.

#### Step 2 - Create a policy to define access permissions to the bucket

To access the AWS S3 bucket, Bytebase requires sufficient privileges. The typical way to grant an application permissions is to create a policy with the proper permissions and grant them to an IAM user. Then you can give the IAM user’s credentials to Bytebase for backup.

Firstly, we need to create a policy to grant access permissions to the newly created bucket. Go to the [policy page](https://us-east-1.console.aws.amazon.com/iamv2/home#/policies) and click the create policy button. Choose the “JSON” tab, and put the example below in the text field:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": ["arn:aws:s3:::<YOUR-BUCKET-NAME-HERE>", "arn:aws:s3:::<YOUR-BUCKET-NAME-HERE>/*"]
    }
  ]
}
```

Please substitute the `<YOUR-BUCKET-NAME-HERE>` part with your actual bucket name. Do not change the "Version" field’s value, which is the newest version of the AWS policy language.

We suggest using a name such as “bytebase-backup-s3-xxx” to distinguish it from your other policies.

#### Step 3 - Create an IAM User to grant permissions to Bytebase

After creating the policy above, we need to create an IAM user and attach the policy to it.

Go to the [AWS IAM console](https://console.aws.amazon.com/iam/home) to create a new IAM user. We suggest using a username such as “bytebase-xxx” to distinguish it from your other S3 IAM users. Select “Access key - Programmatic access” to enable programmatic access to the user. Click the “Next” button to set the permissions.

Select the “Attach existing policies directly” tab on the set permissions page. Search and choose the newly created policy.

After successfully creating the user, click the “Show” button in the “Secret access key” column and save it securely. Or click the “Download .csv” button to download the Access key ID and Secret access key. Note that this is the only chance to save the secrets. If you missed it, you must create a new user.

#### Step 4 - Create a credentials file

After creating the IAM user and granting the permissions, please go to the “Security credentials” tab of the IAM user to create an access key. Then you should put the access key ID and the secret access key to a file using the AWS shared credentials file format in the [AWS doc](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-where). Here is an example of the credentials file content:

```ini
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### Bytebase Flags

To enable the backup to the cloud feature, start Bytebase with the corresponding command line flags.

#### AWS S3

You should start Bytebase with the following three additional command line flags:

- `--backup-region` specifies the S3 bucket region, e.g., `--backup-region us-east-1`
- `--backup-bucket` specifies the S3 bucket, e.g., `--backup-bucket s3://bytebase-dev`
- `--backup-credential` specifies the AWS S3 credentials, e.g., `~/.aws/credentials`

If you run Bytebase in a container, please put the credentials file in a mounted volume where the container can access it. Here’s an example of running Bytebase in a docker container with a mounted AWS S3 credential file:

```bash
docker run --init \
  --name bytebase \
  --restart always \
  --publish 5678:8080 \
  --health-cmd "curl --fail http://localhost:5678/healthz || exit 1" \
  --health-interval 5m \
  --health-timeout 5m \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  --volume ~/.aws:/var/opt/bytebase/.aws \
  bytebase/bytebase:%%bb_version%% \
  --data /var/opt/bytebase \
  --port 8080 \
  --backup-region us-east-1 \
  --backup-bucket s3://bytebase-dev \
  --backup-credential /var/opt/bytebase/.aws/credentials
```

Now Bytebase will start with all backup files stored in the cloud. All operations for backup and restore are the same as before.

<HintBlock type="warning">

Caveat: If you used to run Bytebase without these flags, you might already have backups in your local disk. They can be successfully restored even if you run Bytebase with the new flags to store new backups in the AWS S3. But we still recommend that you do at least one backup for the production databases after Bytebase switches to the cloud backup. This ensures that there are backups in the cloud storage and that your data is safe.

</HintBlock>

## Automatic weekly backup

<HintBlock type="info">

Automatic weekly backup can be enabled/disabled by the Owner of the project owning the database, as well as the Workspace Admin and DBA.

</HintBlock>

Whenever user (re-)enables the automatic backup, Bytebase will choose a random local time between 0:00 AM \~ 6:00 AM on Sunday.

You can use [webhook](#post-backup-webhook) to monitor backup status.

## Manual backup

<HintBlock type="info">

User who is the member of the project owning the database, as well as the Workspace Admin and DBA can take manual backup.

</HintBlock>

In addition to automatic backup, user can also take a manual backup whenever needed.

## Post-backup webhook

<TutorialBlock url="/docs/tutorials/how-to-use-bytebase-with-better-uptime" title="How to use Bytebase with Better Uptime" />

User can set post-backup webhook URLs for databases. After a successful backup, an HTTP POST request will be sent to it.

![Better Uptime Heartbeat](/content/docs/disaster-recovery/backup/database-webhook.webp)

For example, with **[Better Uptime Heartbeats](https://docs.betteruptime.com/monitoring/monitor-types/cron-and-heartbeat-monitor)**.

![Integrate with Better Uptime Heartbeats](/content/docs/disaster-recovery/backup/database-webhook-bettteruptime.webp)
