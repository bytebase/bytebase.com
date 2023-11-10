---
title: How to Install Local MySQL on Your Mac, Ubuntu, CentOS, Windows
author: Mila
published_at: 2023/11/10 21:21:21
feature_image: /content/blog/how-to-install-local-mysql-on-mac-ubuntu-centos-windows/banner.webp
tags: How-To
description: 'Learn how to set up a local MySQL database on your macOS, Ubuntu, CentOS, or Windows system.'
---

## Introduction

A local MySQL database is installed and running on your own computer or server, allows developers to work offline without depending on a remote server, and also enables them to quickly iterate on changes without risking data loss or corruption.

Below is a tutorial on how to install a local MySQL database server on your Mac, Ubuntu, CentOS, or Windows.

<HintBlock type="info">

Once you finish this tutorial, you can [install the classic MySQL CLI](/blog/how-to-install-mysql-client-on-mac-ubuntu-centos-windows/) to better interact with your local MySQL database.

</HintBlock>

## macOS

1. Download MySQL Community Server: Go to [the official MySQL website](https://dev.mysql.com/downloads/mysql/) and download the corresponding DMG Archive for your macOS system.

2. Install MySQL Community Server: Open the downloaded DMG file and follow the on-screen instructions to install MySQL Community Server. It will guide you through the installation process, including accepting the license agreement, choosing the installation location, and setting a root password for MySQL.

3. Start MySQL Server: Once the installation is complete, you can close the installation window, and the MySQL server should already be up and running. If it doesn't, you can start the MySQL server by running the following command in the Terminal application on your Mac:

```bash
mysql -u root -p
```

It will prompt you to enter the root password you set during the installation. If the MySQL server is running correctly, you will be logged into the MySQL CLI `mysql`.

## Ubuntu

To install MySQL locally on Ubuntu, you need to:

1. Update Package Lists: Open a terminal on your Ubuntu system and run the following command to update the package lists:

   ```bash
   sudo apt update
   ```

2. Install MySQL Server: Run the following command to install the MySQL Server package:

   ```bash
   sudo apt install mysql-server
   ```

3. Configure MySQL Server: During the installation process, you will be prompted to set the root password for the MySQL Server. Enter a secure password and remember it, as you will need it later.

4. Start MySQL Service: After the installation is complete, MySQL should start automatically. If it doesn't, you can start the MySQL service by running the following command:

   ```bash
   sudo service mysql start
   ```

5. Verify MySQL Installation: To verify if the MySQL server is running correctly, run:

   ```bash
   sudo service mysql status
   ```

   If the service is active and running, it means MySQL is installed and running properly.

6. Secure MySQL Installation (Optional): It is recommended to run the MySQL secure installation script to improve the security of your MySQL installation. You can run the following command to start the script:

   ```bash
   sudo mysql_secure_installation
   ```

The script will guide you through several security-related questions and allow you to set additional security measures.

## CentOS

To install MySQL locally on CentOS, follow these steps:

1. Update Package Lists: Open a terminal on your CentOS system and run the following command to update the package lists.

   ```bash
   sudo yum update
   ```

2. Install MySQL Server: Run the following command to install the MySQL Server package:

   ```bash
   sudo yum install mysql-server
   ```

3. Start MySQL Service: After the installation is complete, start the MySQL service by running the following command:

   ```bash
   sudo systemctl start mysqld
   ```

4. Configure MySQL Server: The first time you start the MySQL service, it generates a temporary root password. You can retrieve this password by running the following command:

   ```bash
   sudo grep 'temporary password' /var/log/mysqld.log
   ```

5. Note down the temporary password as you will need it for the next step.

6. Run MySQL Secure Installation: To secure your MySQL installation, run the following command and follow the prompts:

   ```bash
   sudo mysql_secure_installation
   ```

7. The script will guide you through several security-related questions and allow you to set additional security measures. You will be prompted to enter the temporary root password generated earlier.

8. Start MySQL Service on Boot: To ensure that MySQL starts automatically on system boot, run the following command:

   ```bash
   sudo systemctl enable mysqld
   ```

9. Verify MySQL Installation: To verify if the MySQL server is running correctly, you can run the following command:

   ```bash
   sudo systemctl status mysqld
   ```

10. If the service is active and running, it means MySQL is installed and running properly.

## Windows

To install MySQL locally on Windows:

1. Download MySQL Community Server: Go to [the official MySQL website](https://dev.mysql.com/downloads/mysql/) and download the MySQL Community Server for Windows. Choose the appropriate version based on your system architecture (32-bit or 64-bit).

2. Run the MySQL Installer: Once the download is complete, locate the downloaded installer file and double-click on it to run the MySQL Installer.

3. Select Setup Type: In the MySQL Installer, select the "Developer Default" setup type. This will install the MySQL Server, MySQL Workbench (a GUI tool for managing MySQL), and other necessary components. Click the "Next" button.

4. Accept License Agreement: Read the license agreement, and if you agree to the terms, select the "I accept the license terms" checkbox. Click the "Next" button.

5. Check Requirements: The installer will check if your system meets the necessary requirements for installation. If any requirements are missing, the installer will provide guidance on how to resolve them. Once all requirements are met, click the "Next" button.

6. Choose Installation Type: In the "Choose a Setup Type" screen, select the "Server Only" option. This will install only the MySQL Server component. Click the "Next" button.

7. Configure MySQL Server: On the "Check Requirements" screen, you can choose the installation folder for MySQL Server and configure other server settings. You can also set a root password for the MySQL Server. Click the "Next" button.

8. Start the Installation: The installer will summarize the installation configuration. Click the "Execute" button to start the installation process. It may take some time to complete.

9. Complete the Installation: Once the installation is finished, you will see a screen showing the status of the installation. Click the "Finish" button.

10. Verify MySQL Installation: To verify if the MySQL server is running correctly, open the Windows Start menu, search for "MySQL Command Line Client," and click on it. It will open a command-line interface for MySQL. Enter the root password you set during the installation to log in. If the login is successful, you have successfully installed MySQL locally on your Windows computer.

## Last but Not Least

Congratulations! You have successfully installed MySQL locally on your system. You can now start using MySQL for your database-related tasks.

And of course, you will need a few tools to better master and interact with MySQL, for example:

1. [MySQL Shell `mysqlsh`](/blog/how-to-install-mysql-shell-on-macos) introduced in MySQL 8.0 to provide more advanced features over `mysql`.
1. [Top MySQL GUI client](/blog/top-mysql-gui-client)
1. [Top MySQL Schema Compare Tool to Diff and Sync Database](/blog/top-mysql-schema-compare-tools)
1. [Top Free Open Source SQL Clients](/blog/top-open-source-sql-clients)
1. [Top mysql Commands with Examples](/blog/top-mysql-commands-with-examples)