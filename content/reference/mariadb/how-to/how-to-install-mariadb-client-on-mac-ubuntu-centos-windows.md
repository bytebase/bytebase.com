---
title: How to install MariaDB Client on Mac, Ubuntu, CentOS, Windows
---

The MariaDB client is a command-line tool used to connect to and interact with MariaDB and MySQL database servers. It evolved directly from the MySQL client when MariaDB was created as a fork of MySQL.
Below describe how to install it on Mac, Ubuntu, CentOS and Windows respectively.

## macOS

### Homebrew (Recommended)

1. **Install Homebrew** (if not already installed):

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install MariaDB client**:

   ```bash
   brew install mariadb-client
   ```

3. **Add to your PATH** (if needed):
   After installation, Homebrew may display a message asking you to add the client to your PATH. Follow the instructions shown in the terminal after installation.

### Troubleshooting on macOS

- **Command not found**: If the `mariadb` command isn't found after installation:

  ```bash
  brew link --force mariadb-client
  ```

  Or manually add the path as shown in the installation message.

- **Connection issues**: If you have problems connecting to a remote server, check your firewall settings and ensure the server allows remote connections.

## Ubuntu

### apt

1. **Update the package index**:

   ```bash
   sudo apt update
   ```

2. **Install MariaDB client only**:
   ```bash
   sudo apt install mariadb-client
   ```

### MariaDB Repository (For Latest Version)

1. **Import the MariaDB repository key**:

   ```bash
   sudo apt-get install software-properties-common
   sudo apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc'
   ```

2. **Add the MariaDB repository**:

   ```bash
   sudo add-apt-repository 'deb [arch=amd64,arm64,ppc64el] https://mirrors.xtom.com/mariadb/repo/10.6/ubuntu focal main'
   ```

   Note: Replace `focal` with your Ubuntu version codename and `10.6` with your desired MariaDB version.

3. **Update and install the client only**:
   ```bash
   sudo apt update
   sudo apt install mariadb-client
   ```

### Troubleshooting on Ubuntu

- **Missing dependencies**: If you see dependency errors:

  ```bash
  sudo apt --fix-broken install
  ```

- **Configure client settings**: Client configuration can be added in:
  ```bash
  sudo nano /etc/mysql/mariadb.conf.d/50-mariadb-clients.cnf
  ```

## CentOS

### Yum

1. **Create a MariaDB repository file**:

   ```bash
   sudo vi /etc/yum.repos.d/MariaDB.repo
   ```

2. **Add the following content to the file**:

   ```
   [mariadb]
   name = MariaDB
   baseurl = https://mirrors.xtom.com/mariadb/yum/10.6/centos8-amd64
   gpgkey = https://mirrors.xtom.com/mariadb/yum/RPM-GPG-KEY-MariaDB
   gpgcheck = 1
   ```

   Note: Replace `centos8-amd64` with your CentOS version and architecture, and `10.6` with your desired MariaDB version.

3. **Install MariaDB client only**:
   ```bash
   sudo yum install MariaDB-client
   ```

### Troubleshooting on CentOS

- **Repository issues**: If you have problems with the repository:

  ```bash
  sudo yum clean all
  sudo yum makecache
  ```

- **OpenSSL dependencies**: If you encounter OpenSSL dependency problems:
  ```bash
  sudo yum install openssl-devel
  ```

## Windows

### MSI

1. **Download the MSI installer** from the [official MariaDB website](https://mariadb.org/download/).

2. **Run the installer** and follow these steps:
   - Accept the license agreement
   - Choose "Custom" installation type
   - Deselect "Database instance" and keep only "Client programs" checked
   - Choose installation path (default is usually fine)
   - Complete the installation

### Chocolatey

1. **Install Chocolatey** (if not already installed):

   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
   ```

2. **Install MariaDB client only**:
   ```
   choco install mariadb-cli
   ```

### Troubleshooting on Windows

- **Path issues**: If the 'mariadb' command isn't recognized:

  1. Right-click on This PC > Properties > Advanced system settings > Environment Variables
  2. In System Variables, find PATH, click Edit
  3. Add the bin directory path (e.g., `C:\Program Files\MariaDB\bin`)
  4. Click OK and restart Command Prompt

- **DLL errors**: If you encounter missing DLL errors, try installing the Visual C++ Redistributable packages.

## Verifying Your Installation

To verify your MariaDB client installation is working properly:

1. **Check the client version**:

   ```bash
   mariadb --version
   ```

   This should display something like: `mariadb Ver 15.1 Distrib 10.6.12-MariaDB, for OS-Type`

2. **Test connecting to a remote server**:
   ```bash
   mariadb -h hostname -u username -p
   ```
   Replace `hostname` with your server address, `username` with your database username, and enter your password when prompted.

## Using the MariaDB Client

### Creating a Client Configuration File

You can create a configuration file to store connection parameters:

1. **Create or edit the client configuration file**:

   - On macOS/Linux: `~/.mariadb/mariadb.cnf` or `~/.my.cnf`
   - On Windows: `C:\Users\YourUsername\AppData\Roaming\MariaDB\mariadb.ini`

2. **Add your connection details**:

   ```
   [client]
   host=your_server_address
   user=your_username
   password=your_password
   ```

3. **Secure the file** (on Linux/macOS):

   ```bash
   chmod 600 ~/.mariadb/mariadb.cnf
   ```

4. **Connect without parameters**:
   ```bash
   mariadb
   ```

### Setting Up Connection Aliases

For connecting to multiple databases easily:

1. **Edit your configuration file**:

   ```
   [client]
   # Default connection

   [server1]
   host=server1.example.com
   user=username1
   password=password1
   database=database1

   [server2]
   host=server2.example.com
   user=username2
   password=password2
   database=database2
   ```

2. **Connect using an alias**:
   ```bash
   mariadb --defaults-group-suffix=server1
   ```
