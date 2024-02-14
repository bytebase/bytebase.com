---
title: Self-host Bytebase
---

**Latest release version:** [**%%bb_version%%**](https://github.com/bytebase/bytebase/releases/latest)

Bytebase is a single Go binary and the deployment easy.

## Prerequisites

- Check [System Requirements](/docs/faq##system-requirements).

## Docker

Estimated time: **5 minutes**.

<HintBlock type="info">

Docker version must be at least [20.10.24](https://docs.docker.com/engine/release-notes/20.10/#201024)
or pass `--security-opt seccomp=unconfined` to `docker run`, otherwise, you will get `pthread_create failed` error.

</HintBlock>

### Installation

<IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

Once you see the Bytebase logo, you can access the console at http://localhost:8080.

<IncludeBlock url="/docs/get-started/install/terminal-startup-output-success"></IncludeBlock>

### Configuration

#### Use external PostgreSQL to store metadata

By default, Bytebase will use an embedded PostgreSQL database to store metadata. For production usage, it is recommended to use an external PostgreSQL database instead.
Check [Configure External PostgreSQL](/docs/get-started/install/external-postgres) for details.

#### Customize startup options

If you need more control over the server configuration, check other [Server Startup Options](/docs/reference/command-line).

#### Allow external access via External URL

Check [Configure External URL](/docs/get-started/install/external-url#configure-via-ui) for details.

#### Enable HTTPS and WebSocket

Bytebase does not support enabeling HTTPS in server configuration. We suggest use NGINX or Caddy as a reverse proxy in front of Bytebase to enable HTTPS and WebSocket (for SQL Editor autocomplete). Here is an example NGINX configuration:

```nginx

http {
    map $http_upgrade $connection_upgrade {
      default upgrade;
      '' close;
    }

    server {
        listen       80;
        listen  [::]:80;
        listen       443 ssl;
        listen  [::]:443 ssl;
        server_name  www.example.com;

        ssl_certificate /path/to/certificate/file;
        ssl_certificate_key /path/to/private/key/file;

       location ~ ^/(v1:adminExecute|lsp) {
            proxy_pass http://www.example.com;
            proxy_http_version 1.1;
            # Below two lines enables WebSocket which is required for SQL Editor autocomplete
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }

        location / {
            proxy_pass http://www.example.com;
        }

        proxy_read_timeout 3600;
        proxy_send_timeout 3600;
    }
}
```

### Troubleshooting

#### bind: address already in use

If you see `bind: address already in use` error, it means the port 8080 is already in use on your host. You need to either stop the existing process using the port or configure Bytebase to use a different port via `--publish <<YOUR_PORT>>:8080`.

#### Connect database instance on the same host

- If you **run Bytebase inside Docker on Linux**, then you need to supply the additional `--network host` flags in `docker run` command. This allows Bytebase to connect to database instance running on the same host with `localhost`.
- If you **run Bytebase inside Docker Desktop on Mac** , then you need to use `host.docker.internal` to connect to database instance running on the same host.

#### Manifest not found

There may be a few reasons the manifest file is not found:

- The docker image only supports `linux/amd64` and `linux/arm64` arch. If it doesn't match your OS arch, you may supply
  `--platform linux/amd64` as a best effort.
- Your Docker version is too old and doesn't support manifest list. Please [install the latest Docker version](https://docs.docker.com/engine/install/).

#### Unable to start using Colima

Due to the vm mechanism of [Colima](https://github.com/abiosoft/colima), try to use the `--mount` option when starting colima as shown below:

```text
mkdir ~/volumes
colima start --mount ~/volumes:w
docker run --init \
  --name bytebase \
  --restart always \
  --publish 80:8080 \
  --volume ~/.bytebase/data:/var/opt/bytebase bytebase/bytebase:%%bb_version%% \
  --data /var/opt/bytebase \
  --external-url https://bytebase.example.com \
  --port 8080
```

## Kubernetes

Estimated time: **15 minutes**.

### Deploy to Kubernetes

<HintBlock type="info">

Make sure to set the replicas to **1**, otherwise, it may cause data race issues.

</HintBlock>

Here is a sample Kubernetes YAML file `bb.yaml` describing the minimal components and configuration required to run Bytebase in Kubernetes.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: bytebase
  namespace: default
spec:
  # To prevent data races, only request one replica.
  replicas: 1
  selector:
    matchLabels:
      app: bytebase
  template:
    metadata:
      labels:
        app: bytebase
    spec:
      containers:
        - name: bytebase
          image: bytebase/bytebase:%%bb_version%%
          imagePullPolicy: Always
          env:
            - name: PG_URL
              value: 'postgresql://<<user>>:<<secret>>@<<host>>:<<port>>/<<dbname>>'
          args:
            [
              '--data',
              '/var/opt/bytebase',
              '--external-url',
              'https://bytebase.example.com',
              '--port',
              '8080',
            ]
          ports:
            - containerPort: 8080
          volumeMounts:
            - name: bytebase-volume
              mountPath: /var/opt/bytebase
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 300
            periodSeconds: 300
            timeoutSeconds: 10
      volumes:
        - name: bytebase-volume
          emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: bytebase-entrypoint
  namespace: default
spec:
  # Optional
  type: ClusterIP
  selector:
    app: bytebase
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

1. Start Bytebase with the following command:

   ```text
   kubectl apply -f bb.yaml
   ```

2. Make sure everything worked by listing your deployments:

   ```text
   kubectl get statefulsets
   ```

   Do the same check for your services:

   ```text
   kubectl get services
   ```

3. Open a browser and visit [http://localhost](http://localhost), you should see Bytebase.

#### Upgrade

When a new Bytebase release is published, you can change the image version in the yaml file

```yaml
containers:
  - name: bytebase
    image: bytebase/bytebase:%%bb_version%%
```

### Use Helm Chart

#### Production Setup External URL

<HintBlock type="info">

For production setup, you should configure a proper [External URL](/docs/get-started/install/external-url).

</HintBlock>

#### Installing the Chart

```text
helm -n <YOUR_NAMESPACE> \
--set "bytebase.option.port"={PORT} \
--set "bytebase.option.external-url"={EXTERNAL_URL} \
--set "bytebase.option.externalPg.url"={PGDSN} \
--set "bytebase.version"={VERSION} \
install <RELEASE_NAME> bytebase-repo/bytebase
```

For example:

```text
helm -n bytebase \
--set "bytebase.option.port"=443 \
--set "bytebase.option.external-url"="https://bytebase.example.com" \
--set "bytebase.option.externalPg.url"="postgresql://user:secret@foo.ap-east-1.rds.amazonaws.com/postgres" \
--set "bytebase.version"=1.7.0 \
install bytebase-release bytebase-repo/bytebase
```

#### Uninstalling the Chart

```text
helm delete --namespace <YOUR_NAMESPACE> <RELEASE_NAME>
```

#### Upgrade Bytebase Version/Configuration

Use `helm upgrade` command to upgrade the bytebase version or configuration.

```text
helm -n <YOUR_NAMESPACE> \
--set "bytebase.option.port"={NEW_PORT} \
--set "bytebase.option.external-url"={NEW_EXTERNAL_URL} \
--set "bytebase.option.externalPg.url"={NEW_PGDSN} \
--set "bytebase.version"={NEW_VERSION} \
upgrade bytebase-release bytebase-repo/bytebase
```

### Deploy with Ingress

We use [Ingress-Nginx Controller](https://kubernetes.github.io/ingress-nginx/deploy/) as ingress controller. You need to config `Ingress-Nginx Controller` according to your environment.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: 'true'
    # https://kubernetes.github.io/ingress-nginx/user-guide/miscellaneous/#websockets
    nginx.ingress.kubernetes.io/proxy-read-timeout: '3600'
    nginx.ingress.kubernetes.io/proxy-send-timeout: '3600'
  name: bytebase-ingress
  namespace: default
spec:
  ingressClassName: nginx
  rules:
    - host: example.com
      http:
        paths:
          - backend:
              service:
                name: bytebase-entrypoint
                port:
                  number: 80
            path: /
            pathType: ImplementationSpecific
  tls:
    - hosts:
        - example.com
      secretName: tls-secret
```

**Note** If you use ingress, make sure to use https to access bytebase;

### External PostgreSQL

Instead of specify PostgreSQL connection string in helm or Kubernetes yaml file, we allows users to using Kubernetes secrets resources.

#### Kubernetes

Using the following yaml section to replace the `spec.templates.spec.containers.env` section:

```yaml
env:
  - name: PG_URL
    valueFrom:
      secretKeyRef:
        name: secret_name
        key: secrete_key
```

#### Helm

Using `--set bytebase.option.existingPgURLSecret` and `--set bytebase.option.existingPgURLSecretKey` to specify the secret key and secret name instead of `--set "bytebase.option.external-url"={NEW_EXTERNAL_URL}`. See more details in [Bytebase - Artifact Hub](https://artifacthub.io/packages/helm/bytebase/bytebase).

### Persistent Volume

To keep data persistence in production, you need to use the [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes) in the cluster. Each cloud provider has its own solution.

#### For Amazon Elastic Kubernetes Service(EKS)

In AWS EKS, you can use the [Amazon EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) for persistent volumes. Follow the [managing EBS CSI](https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html) to add it as an Amazon EKS add-on.

Here is a simple example to use an EBS volume:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: bytebase-ebs-claim
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: bytebase-resize-sc
  resources:
    requests:
      storage: 4Gi
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: bytebase-resize-sc
provisioner: ebs.csi.aws.com
allowVolumeExpansion: true
```

**Note** Also need to update the statefulset spec of bytebase to replace the emptyDir volume with persistentVolumeClaim:

```yaml
volumes:
  - name: bytebase-volume
    persistentVolumeClaim:
      claimName: bytebase-ebs-claim
```

#### For Google Kubernetes Engine(GKE)

Please follow the [Persistent volumes and dynamic provisioning](https://cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes).

## Installation Script

Estimated time: **5 minutes**.

The installation script is stored at [https://github.com/bytebase/install](https://github.com/bytebase/install).

**Prerequisites**

1. Install [curl](https://curl.se/download.html).
2. Install [tar](https://www.gnu.org/software/tar/).

### Install

Using install script to install the latest release version:

```text
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/bytebase/install/main/install.sh)"
```

If no error occurs, you should see something like this in the console:

```plain
OS: Darwin
ARCH: arm64
Password:
Get bytebase latest version: %%bb_version%%
Downloading tarball into /var/folders/j4/9x356cb9263f2jryv0xs9pnr0000gn/T/tmp.g1C2PJ8U
Start downloading https://github.com/bytebase/bytebase/releases/download/%%bb_version%%/bytebase_%%bb_version%%_Darwin_arm64.tar.gz...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0
100 81.3M  100 81.3M    0     0  3972k      0  0:00:20  0:00:20 --:--:-- 5430k
Completed downloading https://github.com/bytebase/bytebase/releases/download/%%bb_version%%/bytebase_%%bb_version%%_Darwin_arm64.tar.gz
Start extracting tarball into /opt/bytebase...
Start installing bytebase and bb %%bb_version%%
Installed bytebase %%bb_version%% to /usr/local/bin
Installed bb %%bb_version%% to /usr/local/bin

Check the usage with
  bytebase --help
  bb --help
```

### Run

After install completes, run:

```text
bytebase --port 8080
```

You should see something like this in the console:

<IncludeBlock url="/docs/get-started/install/terminal-startup-output-success"></IncludeBlock>

#### Troubleshoot

If you encounter any error when you install bytebase by using install script, welcome to open issue on [bytebase/install repository](https://github.com/bytebase/install).

## Build from Source

Estimated time: **30 minutes**.

**Prerequisites**

1. Install [pnpm](https://pnpm.io/installation), Bytebase requires Node.js >=17.0.
2. Install [Go](https://golang.org/dl/), Bytebase requires Go >= 1.16

### Environment Setup

It's recommended to run Bytebase application as non-root user for security reason. If you don't have other non-root users on the system, you can follow the following steps to setup one, e.g. user `bytebase`.

```text
groupadd bytebase && useradd -g bb bytebase
```

```text
sudo su bytebase
```

### Build

Download [source code](https://github.com/bytebase/bytebase) from GitHub, then go to the source root directory

<HintBlock type="info">

If you want to build from a specific release `x.y.z`, then switch to that tag.

</HintBlock>

```text
git checkout tags/x.y.z
```

Build the source

```text
scripts/build_bytebase.sh [<<out_directory>>]
```

If `out_directory`is not specified, the default directory is `./bytebase-build`

Suppose you run `scripts/build_bytebase.sh foo` After build completes, run:

```text
foo/bytebase --port 8080
```

(check [Server Startup Options](/docs/reference/command-line) for other startup options)

You should see something like this in the console:

<IncludeBlock url="/docs/get-started/install/terminal-startup-output-success"></IncludeBlock>

**Troubleshoot**

#### error: too many open files

Change the open file limit:

```text
ulimit -n 10240
```

## Deploy to PaaS

### [Deploy to render](/docs/get-started/install/deploy-to-render/)

### [Deploy to sealos](/docs/get-started/install/deploy-to-sealos/)

### [Deploy to Rainbond](/docs/get-started/install/deploy-to-rainbond/)

### [Deploy to Zeabur](/docs/get-started/install/deploy-to-zeabur/)

## Upgrade from

### Upgrade MINOR and PATCH version

Just replace the version string and restart. Bytebase will self-upgrade automatically.

### Upgrade from 1.x

Please first upgrade to 2.1.0 and then upgrade to the latest version.
