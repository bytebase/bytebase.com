---
title: Manage Databases in Bytebase with Terraform
author: Ningjing
published_at: 2023/01/16 21:15
feature_image: /content/docs/tutorials/manage-databases-in-bytebase-with-terraform/terraform-feature.webp
tags: Tutorial
integrations: Terraform
level: Intermediate
reading_time: '30 mins'
description: This tutorial will guide you to use Terraform Bytebase Provider to manage your databases via Terraform.
---

This tutorial will guide you to use [Terraform Bytebase Provider](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs) to manage your databases via [Terraform](https://www.hashicorp.com/products/terraform).

Terraform is an **infrastructure as code** tool that lets you build, change, and version infrastructure safely and efficiently. This includes low-level components like compute instances, storage, and networking; and high-level components like DNS entries and SaaS features.

[Bytebase](https://bytebase.com) is an open-source **database DevOps tool**, it's the GitLab for managing databases throughout the application development lifecycle. It offers a web-based workspace for Developers and DBAs to collaborate and manage the database change safely and efficiently.

Why Terraform? Although Bytebase provides a GUI for you to manage databases, if you have tens or hundreds of database instances for different environments, instead of repetitive and error-prone manual work, Terraform would definitely save your efforts and prevent mistakes.

Before you start the tutorial, make sure:

- Have [Docker](https://www.docker.com/) installed.

## Install Terraform

Follow [Terraform installation Guide](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli), we use the mac version in this tutorial.

1. Install the HashiCorp tap, a repository of all our Homebrew packages.

```bash
brew tap hashicorp/tap
```

2. Install Terraform with hashicorp/tap/terraform.

```bash
brew install hashicorp/tap/terraform
```

3. Verify the installation by typing.

```bash
terraform -help
```

## Run Bytebase

In this section, you’ll start Bytebase and follow its onboard guide.

1. Make sure your docker daemon is running, and then start the Bytebase docker container by typing the following command in the terminal.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

2. Type the following commands one by one in the terminal to start two MySQL instances, and they will be mapped to `Test` and `Prod` environments later.

```bash
docker run --name mysqldtest \
  --publish 3307:3306 \
  -e MYSQL_ROOT_HOST=172.17.0.1 \
  -e MYSQL_ROOT_PASSWORD=testpwd1 \
  mysql/mysql-server:8.0
```

```bash
docker run --name mysqldprod \
  --publish 3308:3306 \
  -e MYSQL_ROOT_HOST=172.17.0.1 \
  -e MYSQL_ROOT_PASSWORD=testpwd1 \
  mysql/mysql-server:8.0
```

3. Register admin account `DBA`. This account will be granted `Workspace Owner` role. [https://www.bytebase.com/docs/concepts/roles-and-permissions](https://www.bytebase.com/docs/concepts/roles-and-permissions)
   ![register-admin](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/register-admin.webp)

## Add an Instance in Bytebase from GUI

In this section, you'll follow the onboard guide to add an instance in Bytebase.

1. Follow the onboard guide or click **Add instance** on home page.
   ![add-instance](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/add-instance.webp)

2. Create an instance for `Test` Environment with the following configuration. Fill **username**/**password** as `root`/`testpwd1`
   ![create-instance](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/create-instance.webp)

3. Follow the onboard guide or click **New Project** on Projects page. Create a project `Test` with key `TEST` and click **Create**.
   ![create-project](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/create-project.webp)

4. Follow the onboard guide or click **New DB** on the project `Test` page.
   ![add-new-db](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/add-new-db.webp)

5. Create a database `demo`, and click **Create**. This will take you to the issue page, an issue is created. Since it’s for `Test` environment, it will execute without approval from you. Click **Resolve issue**, and the issue will be done.

![create-db-demo](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/create-db-demo.webp)

![issue-db-demo](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/issue-db-demo.webp)

## Add Instances via Terraform

You’ve added an instance for the `Test` environment in Bytebase by clicking. What if you need to add hundreds of instances. In this section, you’ll witness the process simplification Terraform brings.

### Step 1 - Create a Terraform file

1. Create a new folder `learn-terraform-bytebase` and create a blank file `main.tf` in it.
2. Go to [https://registry.terraform.io/providers/bytebase/bytebase/latest/docs](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs). Click **Use Provider**, copy and paste the whole code block in the gray box into `main.tf`. Pay attention to the **version**.
   ![terraform-registration](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/terraform-registration.webp)

3. Follow the document and go to **Example Usage**. Copy the following provider part and paste it in `main.tf`.
   ![terraform-code-version](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/terraform-code-version.webp)

```other
provider "bytebase" {
 service_account = "<Your Bytebase service account email>"
 service_key     = "<Your Bytebase service account key>"
 url             = "<Your Bytebase external URL>"
}
```

### Step 2 - Add a Terraform account

1. Click **Settings** on the top navigation bar, and click **Workspace** > **Members**.
2. Turn on **Create as service account**, fill email with prefix `tf`, and click **+ Add**.
   ![bb-add-tf](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/bb-add-tf.webp)

3. Scroll down, and you can see the newly added account there. Click **Copy Service Key**.
   ![bb-copy-tf-key](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/bb-copy-tf-key.webp)

![bb-key-copied](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/bb-key-copied.webp)

### Step 3 - Query to list all resources

1. Paste the **Service Key**, **Service Account Email**, and **URL** into `main.tf`.The file now should look like this:
   ![vscode-tf-configure](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/vscode-tf-configure.webp)

2. Paste the following queries after the **provider** block and save the file. What it does is to list all existing environments and instances and print those out in the terminal.

```other
# List all environment
data "bytebase_environment_list" "all" {}
output "all_environments" {
 value = data.bytebase_environment_list.all
}

# List all instances
data "bytebase_instance_list" "all" {}
output "all_instances" {
 value = data.bytebase_instance_list.all
}
```

3. Run `terraform init`, `terraform plan` and `terraform apply` one by one in the terminal. You’ll see the output:

```other
all_environments = {
    "environments" = tolist([
     {
        "environment_tier_policy" = "UNPROTECTED"
        "order" = 0
        "resource_id" = "test"
        "title" = "Test"
    },
    {
        "environment_tier_policy" = "UNPROTECTED"
        "order" = 1
        "resource_id" = "prod"
        "title" = "Prod"
    },
    ])
    "id" = "1673486499"
    "show_deleted" = false
}
```

As we have two default environments in our Bytebase. Pay attention to `resource_id`, they are `test` and `prod` .
![environments-test](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/environments-test.webp)

```other
all_instances = {
    "environment" = "-"
    "id" = "1673486499"
    "instances" = tolist([
        {
        "data_sources" = tolist([
            {"database" = ""
            "host" = "host.docker.internal"
            "port" = "3307"
            "title" = "Admin data source"
            "type" = "ADMIN"
            "username" = "root"
            },
        ])
        "engine" = "MYSQL"
        "environment" = "test"
        "external_link" = ""
        "resource_id" = "instance-e14ae248"
        "title" = "MySQL Test"
        },
    ])
    "show_deleted" = false
}
```

As we can see, it’s the instance we just added. Follow `"title" = "MySQL Test"`, you'll find `"resource_id" = "instance-e14ae248"`.
![instance-test](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/instance-test.webp)

### Step 4 - Add instances via Terraform

Now you have listed all environments and instances you have in Bytebase. Then how to create/update?

1. Remove the `#List all environment` and `#List all environment` blocks, and add the following:

```other
# Define variable name
locals {
    environment_id_test = "test"
    environment_id_prod = "prod"
    instance_id_test = "test-instance"
    instance_id_prod = "prod-instance"
}

# Create a new environment named "Test"
resource "bytebase_environment" "test" {
    resource_id = local.environment_id_test
    title = "Test"
    order = 0
    environment_tier_policy = "UNPROTECTED"
}

# Create another environment named "Prod"
resource "bytebase_environment" "prod" {
    resource_id = local.environment_id_prod
    title = "Prod"
    order = 1
    environment_tier_policy = "UNPROTECTED"
}

# Create a new instance named "MySQL Test TF"
resource "bytebase_instance" "test" {
    resource_id = local.instance_id_test
    environment = bytebase_environment.test.resource_id
    title = "MySQL Test TF"
    engine = "MYSQL"

    # You need to specific the data source
    data_sources {
        title = "admin data source"
        type = "ADMIN"
        username = "root"
        password = "testpwd1"
        host = "host.docker.internal"
        port = "3307"
    }
}

# Create a new instance named "MySQL Prod TF"
resource "bytebase_instance" "prod" {
    resource_id = local.instance_id_prod
    environment = bytebase_environment.prod.resource_id
    title = "MySQL Prod TF"
    engine = "MYSQL"

    # You need to specific the data source
    data_sources {
        title = "admin data source"
        type = "ADMIN"
        username = "root"
        password = "testpwd1"
        host = "host.docker.internal"
        port = "3308"
    }
}
```

What it does is first to define some variables, and then add four resources:

- two environments – `Test` and `Prod`
- two instances - `MySQL Test TF` and `MySQL Prod TF`

2. Run `terraform init`, `terraform plan` and `terraform apply` one by one in the terminal. You will see this in the terminal.
   ![terminal-ft-apply](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/terminal-ft-apply.webp)

3. Go back to Bytebase, and click **Environments**. There is nothing changed with these two environments.
   ![environments-test-prod](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/environments-test-prod.webp)

If you go back to the previous query output

```other
"resource_id" = "test"
"title" = "Test"
```

```other
"resource_id" = "prod"
"title" = "Prod"
```

You can see that the `resource_id` happens to be the same as in the local variables:

```other
environment_id_test = "test"
environment_id_prod = "prod"
```

Combined with the terminal warning message above:

```other
Warning: Environment already exists
...
Environment test already exists, try to exec the update operation
```

What happened is that the two existing environments match with the ones terraform declare by resource_id, so the Bytebase provider will attempt to update the environment.

4. Click **Instances**. You’ll see there are two instances added.
   ![2-instances-tf](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/2-instances-tf.webp)

Why it's different from the environments?
If you go back to query output for our existing instance which is added from GUI.

```other
"resource_id" = "instance-e14ae248"
```

And there are the `resource_id`s defined in the local variables:

```other
instance_id_test    = "test-instance"
instance_id_prod    = "prod-instance"
```

The `resource_id` generated by UI operation `instance-e14ae248` can’t match the one defined in terraform, and it’s not possible to adjust to make them match. So for the instances, it adds them instead of updating.

### Step 5 - Test if the instances added by Terraform are working

1. Click **Projects** on the top navigation bar, and then click New Project. Create a new project called `TestTF`.
   ![create-proj-tf](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/create-proj-tf.webp)

2. Click TestTF on the left side bar, and click **New DB**.
   ![testtf-new-db](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/testtf-new-db.webp)

3. Fill out the form as follows and click **Create**.

- **Name**: demotf
- **Environment**: Test
- **Instance**: MySQL Test TF
  ![demotf-create-db](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/demotf-create-db.webp)

4. You’ll be redirected to the issue page, and click **Resolve issue**.
   ![issue-demotf-done](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/issue-demotf-done.webp)

5. Click **Instances** on the top navigation bar, then select `MySQL Test TF`. You’ll see `demotf`.
   ![test-tf-db](/content/docs/tutorials/manage-databases-in-bytebase-with-terraform/test-tf-db.webp)

## Summary and Next

Now you have learned how to use Terraform to manage your MySQL database environments and instances in Bytebase, for PostgreSQL, you can futher declare database roles. Please check more [example usage in GitHub](https://github.com/bytebase/terraform-provider-bytebase/tree/main/examples).

If you encounter any problems while trying, welcome to our [discord](https://discord.gg/huyw7gRsyA) channel.
