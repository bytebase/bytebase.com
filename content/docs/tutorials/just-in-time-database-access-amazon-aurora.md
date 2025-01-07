---
title: 'Just-in-time database access to Amazon Aurora using Bytebase'
author: Ningjing
tags: Tutorial
updated_at: 2025/01/07 18:15
integrations: General
level: Beginner
estimated_time: '40 mins'
description: 'In this tutorial, we will demonstrate how to set up Just-in-Time (JIT) access using the Bytebase GUI connecting to Amazon Aurora.'
---

In modern database management, when an incident occurs, developers often need quick access to production databases to troubleshoot and resolve the issue. However, traditional methods, such as using static passwords, can pose security risks and complicate management. For Amazon Aurora, AWS IAM authentication provides a solution by enabling temporary, secure access without the need for password rotation.

But there’s a more flexible and professional approach to manage database access while maintaining robust security: Bytebase.

Bytebase is a modern, web-based database management tool that simplifies the database administration process. By offering a user-friendly interface, Bytebase makes managing complex database environments—both on AWS and beyond—easy and professional. It supports a wide range of databases and enables granular control over access permissions.

In this post, we demonstrate how to configure Just-in-Time (JIT) access to Amazon Aurora via Bytebase, allowing developers to quickly connect and troubleshoot production databases in a secure and efficient way. We’ll walk you through the steps to set up AWS IAM authentication in Bytebase, giving you both flexibility and security when managing access to your Aurora databases.

By the end of this guide, you'll understand how to streamline access management in Bytebase while maintaining high security and flexibility.

## Solution Overview

The following diagram illustrates the configuration of Bytebase connecting to Amazon Aurora MySQL.

   ![aws-bb](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/aws-bb.webp)

1. Install Bytebase via Docker in an EC2 instance.
1. Use Amazon Aurora PostgreSQL as the metadata database.
1. Connect to Amazon Aurora MySQL via AWS IAM authentication.

### Why use AWS IAM authentication over password authentication?

While adding connection to Aurora MySQL, Bytebase provides both password and AWS IAM authentication.

1. **Stronger Security**: Uses temporary tokens instead of static passwords, eliminating storage and rotation risks.
1. **Simplified Management**: Centralized control through IAM, with dynamic permissions and seamless AWS service integration.
1. **Scalability**: Ideal for cloud-native and multi-region deployments.
1. **Compliance**: Provides granular control and audit logs via CloudTrail.

### Why use Bytebase over granting AWS IAM user access to Aurora MySQL directly?

Then you may ask, provided that AWS IAM can manage access to Aurora MySQL, why bother using Bytebase?

1. **Simplified Management**: Bytebase provides a web-based GUI for database management, making it user-friendly, professional, and easy to navigate.
1. **Flexible Access Control**: AWS IAM user access to Aurora MySQL typically involves granting full control over the database. Bytebase, on the other hand, allows you to grant fine-grained access—specific permissions for databases, tables, and even with expiration times—offering much greater flexibility.
1. **Support for Multiple Database Types**: Bytebase supports a wide range of databases, both within AWS and beyond, making it a versatile solution for diverse database environments.

## Prerequisites

Before starting this tutorial, you will need:

- An AWS account
- An AWS Identity and Access Management (IAM) user with permissions to connect to Amazon Aurora
- An EC2 instance with Docker installed
- An Amazon Aurora PostgreSQL database for Bytebase metadata
- An Amazon Aurora MySQL database to be managed by Bytebase

## Set up AWS IAM for Aurora MySQL connection

### Enable AWS IAM authentication for Aurora MySQL

While creating Aurora MySQL instance, you need to enable AWS IAM authentication.

   ![db-password-iam](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/db-password-iam.webp)

### Create IAM policy

1. Go to IAM > Policies and click Create policy.

1. Select `RDS IAM Authentication` for service.

   ![rds-iam-auth](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/rds-iam-auth.webp)

1. Select `connect` permission and specific as **Resource**. Check `Any in this account.`

1. Name it `rds-connect` and create this policy.

### Create IAM user

1. Go to **IAM > Users** and click **Create user**. Name it `rds-connector`.
1. Choose `Attach policies directly` and select `rds-connect` policy. Click **Next** and then click **Create user**.
1. On the user detail page, click **Create access key**, and choose `Application running on AWS compute service` as the use case. Because you will run Bytebase in EC2 instance. Click **Next**.

1. Then you can save the `Access key ID` and `Secret access key` for later use.

## Run Bytebase in EC2 instance

1. Connect to the Aurora PostgreSQL instance and create a database `bb` for Bytebase metadata.

1. Connect to the EC2 instance and run the following command to start Bytebase. Put your **AWS_ACCESS_KEY_ID**, **AWS_SECRET_ACCESS_KEY**, **AWS_REGION**, **PG_URL** in the command.

   ```bash
   docker run --init -d \
   -e AWS_ACCESS_KEY_ID=AKIxxxxxxxxxxxxxxEB4 \
   -e AWS_SECRET_ACCESS_KEY=axBAyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ7yUB \
   -e AWS_REGION=ap-xxxxxxx-1 \
   -e PG_URL=postgresql://postgres:xxxxx@database-pg-aurora-instance-1.ct4xxxxxxxx5.ap-xxxxx-1.rds.amazonaws.com:5432/bb \
   --name bytebase \
   --publish 8080:8080 --pull always \
   bytebase/bytebase:3.2.0
   ```

## Connect to Aurora MySQL via AWS IAM in Bytebase

1. The first registration will be granted an **admin** role. Log in, click **Instances** on the left bar and click **Add instance**.

1. Select **MySQL** as the database type. Fill in the following information and click **Create**.

   - Instance Name: `AWS Aurora MySQL Prod`
   - Environment: `Prod`
   - Host or Socket: `aurora-mysql-instance-prod.ctxxxxxxx5.ap-xxxxx-1.rds.amazonaws.com`
   - Port: `3306`
   - Connection Method: `AWS RDS IAM`
   - Username: `bytebase`
   - Database Region: `ap-xxxxx-1`

   ![bb-instance-add-2](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-instance-add-2.webp)

1. Click **Select Project** on the top bar and create a new project `Aurora MySQL Project`.
1. (Optional) If you don't have any existing databases in the aurora mysql instance, you can check the [employee small sample data](https://github.com/bytebase/employee-sample-database/tree/main/mysql/dataset_small) and import them into the instance first.
1. Click **Database > Databases** on the left bar, and then click **Transfer in DB** to transfer in existing databases, for the sample data, it's `employee`.
1. Click **SQL Editor** on the top bar, connect to the `employee` database. Double click the `employee` database and you'll see the data.

   ![bb-sql-editor-admin](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-sql-editor-admin.webp)

## Register a developer and gain access to the production database

### Step 1 - Register a developer

1. By default, the `(workspace) admin` has the full access to the database. Click **IAM&Admin > Users&Groups** on the left bar, and then click **Add user**.

1. Create a user `dev` with the role `Project Developer`. This project-level role will be applied to all projects automatically.

1. Log in as the user `dev`, click **Select Project** on the top sidebar, and choose  `Aurora MySQL Project`
1. Click **Database > Databases** on the left bar, you should see two database `employee`.
1. Click **SQL Editor** on the top bar, connecting to the `employee` database is impossible. Because it's **Community Plan**.

### Step 2 - Admin assign you access to the production database (Community and Pro Plan)

In Bytebase **Community** and **Pro Plan**, the Admin/DBA can assign developer access to the production database.

1. Login as the `admin` user, go into `Aurora MySQL Project`, click **Manage > Members** on the left sidebar.

1. Click **Grant Access**, select the developer `dev`, select the `SQL Editor User` role, then set 1 day Expiration, and click **Confirm** button. Here you may notice in **Community Plan**, you can only set access to all databases in the project.

   ![bb-grant-sql-editor-user](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-grant-sql-editor-user.webp)

1. After the access is granted, log in as the `dev` user again, you now have access to the production database in SQL Editor. After one day, the access will expire automatically.

   ![bb-sql-editor-dev](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-sql-editor-dev.webp)

### Step 3 - Request JIT access to the production database (Enterprise Plan)

In Bytebase **Enterprise Plan**, you can request a JIT access to the production database.

1. Login as `admin` user, go into `Aurora MySQL Project` and revoke the `dev` user's access to the production database.

1. Upgrade to the **Enterprise Plan**. You may request a 14-day trial from [here](https://www.bytebase.com/contact-us/).

1. Click **CI/CD** > **Custom Approval** on the left sidebar. Assign licenses to the aurora mysql instance to enable this feature.

   ![bb-assign-license](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-assign-license.webp)

1. Scroll down to **Request Querier Role** section, add `high` risk an approval flow `Project Owner`.

   ![bb-custom-approval](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-custom-approval.webp)

1. Click **CI/CD** > **Risk Center** on the left sidebar. Define a High risk policy for `Request Querier Role` which triggers when the environment is `Prod`.

   ![bb-risk-center](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-risk-center.webp)

1. Login as the `dev` user again, then go to SQL Editor page. Click **Connect to a database** or **Select a database to start**. You should see the `hr_prod` and `hr_test` databases listed, click **Request query** to request a JIT access.

   ![bb-databases-request](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-sql-editor-request.webp)

1. Another way is to go to **Database > Databases** page, click **Request Querier Role**.

1. In the **Request Querier Role** modal, choose **Manually select**, then `employee` `salary` and `title` under `hr_prod` database, and click **OK** button. Here you may also specify the expiration time which can be a specific time, or relative time from now.

   ![bb-sql-editor-request-employee](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-sql-editor-request-employee.webp)

   ![bb-sql-editor-request-expire](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-sql-editor-request-expire.webp)

1. An request issue will be created, switch to the project owner (the admin user), go to **Issue** page, you should see the request issue. Click **Approve** button to approve the request.

   ![bb-request-waiting](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-request-waiting.webp)

1. Switch back to the `dev` user, go to **SQL Editor**, you should be able to query from `employee` table. If you query from other tables, you will get errors and suggest to request a JIT access.

   ![bb-sql-editor-not-ok](/content/docs/tutorials/just-in-time-database-access-amazon-aurora/bb-sql-editor-not-ok.webp)

1. After the `dev` user get the access, he can solve the incident. The admin user can revoke the access directly from the **Manage** > **Members** page or wait for the access expiration.

## Conclusion

In this tutorial, we demonstrated how to set up Just-in-Time (JIT) access using the Bytebase GUI connecting to Amazon Aurora MySQL. We also discussed the benefits of using AWS IAM authentication over password authentication and how Bytebase can provide a more flexible and professional approach to managing database access while maintaining robust security.

By following these steps, you can streamline access management in Bytebase while maintaining high security and flexibility.