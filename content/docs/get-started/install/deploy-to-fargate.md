---
title: Deploy to AWS Fargate
---

[AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html) is a technology that you can use with Amazon ECS to run containers without having to manage servers or clusters of Amazon EC2 instances. With AWS Fargate, you no longer have to provision, configure, or scale clusters of virtual machines to run containers. This removes the need to choose server types, decide when to scale your clusters, or optimize cluster packing.

## Prerequisites

- **AWS Account**: Ensure you have an AWS account with the necessary permissions.

## Steps

### Step 1: Create an ECS Cluster

1. Go to AWS Management Console and navigate to the ECS (Elastic Container Service).
1. Click **Clusters** on the left menu and then click **Create cluster**.
1. Fill in the cluster name, choose `AWS Fargate (serverless)` under **Infrastructure**.
1. Click **Create**.

### Step 2: Create an ECS Task Definition

1. Click **Task Definitions** on the left menu and then click **Create new task definition**.
1. Choose **AWS Fargate** as the launch type under **Infrastructure requirements**.
1. Add a **Container**, fill in **Image URL** with `bytebase/bytebase:latest` and **Container port** `8080`.
1. Click **Create**.

### Step 3: Run the Task

1. Go to the created cluster and click **Create** under **Services**.
1. Under **Environment > Compute configuration**, choose **FARGATE** as the launch type.
1. Under **Deployment configuration**, Choose `Service` as the **Application type**, choose the task definition you created in the previous step, give it a name such as `bytebase-service`.
1. Click **Create**.

### Step 4: Access Bytebase

1. Go to the service you just created and click **Logs** tab to see the logs. If you see something like `Version 3.3.0(f5891735834ea82fd67bf8181597f86a7f5dab58) has started on port 8080 🚀`, it means Bytebase is running.
1. Click **Tasks** tab to see the task list. Click the task name to see the task details.
1. Under **Cointainer details for bytebase**, click **Network bindings** tab to find the **External link**.
1. Click **Open address** to access Bytebase.

![aws-task-network-bindings](/content/docs/get-started/install/aws-task-network-bindings.webp)