---
title: Server Startup Options
---

The "help" command prints all applicable options

```text
./bytebase help
```

And the output will look like this:

```plain
Bytebase is a database schema change and version control tool

Usage:
  bytebase [flags]
  bytebase [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  version     Print the version of Bytebase

Flags:
      --backup-bucket string       bucket where Bytebase stores backup data, e.g., s3://example-bucket. When provided, Bytebase will store data to the S3 bucket.
      --backup-credential string   credentials file to use for the backup bucket. It should be the same format as the AWS/GCP credential files.
      --backup-region string       region of the backup bucket, e.g., us-west-2 for AWS S3.
      --data string                directory where Bytebase stores data. If relative path is supplied, then the path is relative to the directory where Bytebase is under (default ".")
      --debug                      whether to enable debug level logging
      --demo string                name of the demo to use. If specified, Bytebase will run in demo mode
      --disable-metric             disable the metric collector
      --disable-sample             disable the sample instance
      --external-url string        the external URL where user visits Bytebase, must start with http:// or https:// (default "https://www.bytebase.com/docs/get-started/install/external-url")
  -h, --help                       help for bytebase
      --pg string                  optional external PostgreSQL instance connection url(must provide dbname); for example postgresql://user:secret@masterhost:5432/dbname?sslrootcert=cert
      --port int                   port where Bytebase server runs. Default to 8080 (default 8080)
      --readonly                   whether to run in read-only mode
```

## --backup-bucket &lt;&lt;bucket&gt;&gt;

default: **""**

If specified, Bytebase will store all of the backup data in the cloud bucket. For MySQL instances, this also means all binlog files are stored in the cloud bucket.

For detailed instructions to setup the cloud bucket, please follow [this doc](/docs/disaster-recovery/backup/#cloud-storage).

## --backup-credential &lt;&lt;string&gt;&gt;

default: **""**

Must be specified if `--backup-bucket` is provided. Bytebase will use this file as the credentials to access the cloud bucket.

## --backup-region &lt;&lt;string&gt;&gt;

default: **""**

Must be specified if `--backup-bucket` is provided and the cloud vendor is AWS S3.

## --data &lt;&lt;directory&gt;&gt;

default: **.**

The directory where Bytebase stores its own data. The directory must exist beforehand, otherwise Bytebase will fail to start. If &lt;&lt;directory&gt;&gt; is a relative path, then it's relative to the directory where the bytebase binary runs.

## --debug

default: **false**

If specified, Bytebase will emit more logs, this is only used when troubleshooting Bytebase issues.

## --disable-metric

default: **false**

If specified, Bytebase will not collect usage metric.

## --disable-sample

default: **false**

If specified, Bytebase will not start sample Postgres instance.

## --demo &lt;&lt;string&gt;&gt;

default: **""**

The demo name. If specified, Bytebase will load the demo data instead of the real data. The data is the same used by [the demo](/view-live-demo). This is a quick way to test the product yourself or demonstrate it to your peers. When Bytebase is started with --demo, it stores the data in a separate location, which means the demo data and real data never interferes with each other.

The current available demo names are:

- default

## --external-url &lt;&lt;string&gt;&gt;

default: **[https://www.bytebase.com/docs/get-started/install/external-url](https://www.bytebase.com/docs/get-started/install/external-url)**

The external URL where user visits Bytebase, must start with [http://](http://) or [https://](https://).

See [Configure External URL](/docs/get-started/install/external-url).

## --pg &lt;&lt;string&gt;&gt;

default: **""**

Optional external PostgreSQL instance connection url. If specified, Bytebase will store its own metadata there. Check [setup guide](/docs/get-started/install/external-postgres) for details.

<HintBlock type="info">

Alternatively, you can also pass PG_URL environment variable.

</HintBlock>

## --port &lt;&lt;number&gt;&gt;

default: **8080**

The port where Bytebase is running. Bytebase listens on all network interfaces for the specified port. For production setup, see [Configure External URL](/docs/get-started/install/external-url).

## --readonly

default: **false**

If specified, Bytebase will run in **read-only** mode. This mode is mostly useful when you want to schedule a maintenance window or enforce a deployment freeze.

You can also enable --demo and --readonly together to have a long running demo instance without worrying about the data being changed accidentally (this is how [https://demo.bytebase.com](/view-live-demo) is configured).

<HintBlock type="info">

Whenever you download a new Bytebase version, first time you should always start it **without** --readonly so that Bytebase can apply its own schema upgrade if needed.

</HintBlock>
