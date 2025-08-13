---
title: How to install MySQL Client on Mac, Ubuntu, CentOS, Windows
---

<HintBlock type="info">

This article refers to the classic MySQL CLI, if you want to install the advanced [MySQL Shell `mysqlsh`](https://dev.mysql.com/doc/mysql-shell/8.0/en/) introduced in MySQL 8.0, check out [How to install MySQL Shell on Mac](/reference/mysql/how-to/how-to-install-mysql-shell-on-macos).

</HintBlock>

## Introduction

The official [MySQL Client `mysql`](https://dev.mysql.com/doc/refman/8.0/en/mysql.html), also known as MySQL CLI is a CLI to interact with your MySQL server. Below describe how to install it on Mac, Ubuntu, CentOS and Windows respectively.

## Before You Start

Before you start, you should confirm that you don't have MySQL client installed. If you have installed MySQL server before, likely
you will have MySQL client installed as well. If you see something like below, then MySQL client is already installed and you can stop reading now.

```bash
$ mysql --version
mysql  Ver 8.0.31 for macos13.0 on arm64 (Homebrew)
```

## Test Connection

After you install the MySQL client following the below instruction, you can test the connection to your MySQL server using

```bash
mysql -h hostname -u username -p
```

## Install on Mac

### Homebrew

To install MySQL Shell using [Homebrew](https://brew.sh/), you need to install Homebrew on your Mac first. If you aren’t sure if you have installed Homebrew already, open your terminal and run the following command to check.

```bash
brew -v
```

If not installed, run the following command to install Homebrew first:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once Homebrew is installed, run the following command to update the list of available packages:

```bash
brew update
```

To install the MySQL client, run the following command:

```bash
brew install mysql-client
```

After the installation is complete, you can verify that the MySQL client is installed by running the following command:

```bash
mysql --version
```

Note: If you have previously installed the MySQL server using Homebrew, you may need to run the following command to link the MySQL client:

```bash
brew link --overwrite mysql-client
```

### DMG Package

1. Go to the MySQL website and download the DMG package for the MySQL client. The current version can be found at https://dev.mysql.com/downloads/mysql/.
1. Double-click the downloaded DMG file to mount it. A new window will appear with the MySQL package.
1. Double-click the package to start the installation process, and follow the on-screen instructions to complete the installation.
1. Once the installation is complete, you can verify that the MySQL client is installed by opening a Terminal window and running the following command:

   ```bash
   mysql --version
   ```

This should display the version number of the MySQL client that you just installed.

Note: If you have previously installed the MySQL server using a package manager like Homebrew, you may need to specify the path to the MySQL client binary when running commands. The default location for the MySQL client binary installed with the DMG package is /usr/local/mysql/bin/mysql.

## Ubuntu (apt-get)

1. Open a terminal window on your Ubuntu machine. You can do this by pressing Ctrl+Alt+T on your keyboard.
1. Update the package list and upgrade any installed packages by running the following commands:

   ```bash
   sudo apt-get update
   sudo apt-get upgrade
   ```

1. Install the MySQL client by running the following command:

   ```bash
   sudo apt-get install mysql-client
   ```

1. After the installation is complete, you can verify that the MySQL client is installed by running the following command:

   ```bash
   mysql --version
   ```

## CentOS (yum)

1. Open a terminal window on your CentOS machine. You can do this by pressing Ctrl+Alt+T on your keyboard.
1. Update the package list and upgrade any installed packages by running the following commands:

   ```bash
   sudo yum update
   ```

1. Install the MySQL client by running the following command:

   ```bash
   sudo yum install mysql
   ```

1. After the installation is complete, you can verify that the MySQL client is installed by running the following command:

   ```bash
   mysql --version
   ```

## Windows

1. Go to the MySQL website and download the MySQL Installer for Windows at https://dev.mysql.com/downloads/installer/.
1. Run the MySQL Installer and select the "Custom" installation type.
1. In the "Select Products and Features" screen, expand the "MySQL Servers" option and uncheck all the server components.
1. In the same screen, expand the "Applications" option and check the "MySQL Shell" and "MySQL Workbench" options. These applications include the MySQL client.
1. Complete the rest of the installation process.
1. After the installation is complete, you can verify that the MySQL client is installed by opening a Command Prompt or PowerShell window and running the following command:

```bash
mysql --version
```

---

## More MySQL Tools

The classic MySQL client is still the most widely used MySQL client. Meanwhile you can also check out following tools

1. [MySQL Shell `mysqlsh`](/reference/mysql/how-to/how-to-install-mysql-shell-on-macos) introduced in MySQL 8.0 to provide more advanced features over `mysql`.
1. [Top MySQL GUI client](/blog/top-mysql-gui-client)
1. [Top MySQL Schema Compare Tool to Diff and Sync Database](/blog/top-mysql-schema-compare-tools)
1. [Top Free Open Source SQL Clients](/blog/top-open-source-sql-clients)
1. [Top mysql Commands with Examples](/reference/mysql/how-to/top-mysql-commands-with-examples)
