---
title: Deploy to Kubernetes
---

This document guides you to deploy Bytebase docker image to Kubernetes.

## Prerequisites

Before starting, make sure you are familiar with [Docker](https://www.docker.com/get-started/) and [Kubernetes](https://kubernetes.io/docs/setup/).

## Deploy to Kubernetes

Here is a sample Kubernetes YAML file `bb.yaml` describing the minimal components and configuration required to run Bytebase in Kubernetes.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bytebase
  namespace: default
spec:
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
            - name: data
              mountPath: /var/opt/bytebase
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 300
            periodSeconds: 300
            timeoutSeconds: 60
      volumes:
        - name: data
          emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: bytebase-entrypoint
  namespace: default
spec:
  # Optional
  type: LoadBalancer
  selector:
    app: bytebase
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
```

1. Start Bytebase with the following command:

   ```bash
   kubectl apply -f bb.yaml
   ```

   then you should see output that looks like the following:

   ```plain
   deployment.apps/bytebase created
   service/bytebase-entrypoint created
   ```

2. Make sure everything worked by listing your deployments:

   ```bash
   kubectl get deployments
   ```

   if all is well, your deployment should be listed as follows:

   ```plain
   NAME       READY   UP-TO-DATE   AVAILABLE   AGE
   bytebase   1/1     1            1           10s
   ```

   Do the same check for your services:

   ```bash
   kubectl get services
   ```

   if all is well too, you should see output that looks like the following:

   ```plain
   NAME                  TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
   bytebase-entrypoint   LoadBalancer   10.100.36.246   localhost     8080:30254/TCP   72s
   kubernetes            ClusterIP      10.96.0.1       <none>        443/TCP          9d
   ```

3. Open a browser and visit [localhost:8080](http://localhost:8080), you should see Bytebase.

### Upgrade

When a new Bytebase release is published, you can change the image version in the yaml file

```yaml
containers:
  - name: bytebase
    image: bytebase/bytebase:%%bb_version%%
```

Sometimes we need to update the image to the latest digest without changing the image name and version. Or you may want to trigger a restart of all the Bytebase pods without changing the yaml.

In this case, you can run this command:

```bash
kubectl rollout restart deployment/bytebase
```

Kubernetes will rolling restart the pods of the deployment. Because we set `imagePullPolicy: Always`, the new pods will always use the latest image digest.

## Deploy to Kubernetes with Helm

### Production Setup External URL

<HintBlock type="info">

For production setup, you should [configure a proper --external-url](/docs/get-started/install/external-url).

</HintBlock>

### Installing the Chart

```bash
helm -n <YOUR_NAMESPACE> \
--set "bytebase.option.port"={PORT} \
--set "bytebase.option.external-url"={EXTERNAL_URL} \
--set "bytebase.option.pg"={PGDSN} \
--set "bytebase.version"={VERSION} \
install <RELEASE_NAME> bytebase-repo/bytebase
```

For example:

```bash
helm -n bytebase \
--set "bytebase.option.port"=443 \
--set "bytebase.option.external-url"="https://bytebase.example.com" \
--set "bytebase.option.pg"="postgresql://user:secret@foo.ap-east-1.rds.amazonaws.com/postgres" \
--set "bytebase.version"=1.7.0 \
install bytebase-release bytebase-repo/bytebase
```

### Uninstalling the Chart

```bash
helm delete --namespace <YOUR_NAMESPACE> <RELEASE_NAME>
```

### Upgrade Bytebase Version/Configuration

Use `helm upgrade` command to upgrade the bytebase version or configuration.

```bash
helm -n <YOUR_NAMESPACE> \
--set "bytebase.option.port"={NEW_PORT} \
--set "bytebase.option.external-url"={NEW_EXTERNAL_URL} \
--set "bytebase.option.pg"={NEW_PGDSN} \
--set "bytebase.version"={NEW_VERSION} \
upgrade bytebase-release bytebase-repo/bytebase
```

## External PostgreSQL

Instead of specify PostgreSQL connection string in helm or Kubernetes yaml file, we allows users to using Kubernetes secrets resources.

### Kubernetes

Using the following yaml section to replace the `spec.templates.spec.containers.env` section:

```yaml
env:
  - name: PG_URL
    valueFrom:
      secretKeyRef:
        name: secret_name
        key: secrete_key
```

### Helm

Using `--set bytebase.option.existingPgURLSecret` and `--set bytebase.option.existingPgURLSecretKey` to specify the secret key and secret name instead of `--set "bytebase.option.external-url"={NEW_EXTERNAL_URL}`. See more details in [Bytebase - Artifact Hub](https://artifacthub.io/packages/helm/bytebase/bytebase).

## Persistent Volume

To keep data persistence in production, you need to use the [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes) in the cluster. Each cloud provider has its own solution.

### For Amazon Elastic Kubernetes Service(EKS)

In AWS EKS, you can use the [Amazon EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) for persistent volumes. Follow the [managing EBS CSI](https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html) to add it as an Amazon EKS add-on.

### For Google Kubernetes Engine(GKE)

Please follow the [Persistent volumes and dynamic provisioning](https://cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes).
