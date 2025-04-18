---
title: How to install local MariaDB on your Mac, Ubuntu, CentOS, Windows
---

This guide covers how to install a local MariaDB on your Mac, Ubuntu, CentOS, or Windows.

## macOS

### Homebrew (Recommended)

1. **Install Homebrew** (if not already installed):

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install MariaDB**:

   ```bash
   brew install mariadb
   ```

3. **Start MariaDB service**:
   ```bash
   brew services start mariadb
   ```

### DMG Installer

1. **Download the MariaDB installer** from the [official website](https://mariadb.org/download/).
2. **Open the downloaded DMG file** and follow the installation wizard.
3. **Start MariaDB** from System Preferences or the command line:
   ```bash
   sudo mysql.server start
   ```

### Troubleshooting

- **Socket error**: If you get a socket error, check if MariaDB is running:

  ```bash
  brew services list
  ```

  Restart if needed:

  ```bash
  brew services restart mariadb
  ```

- **Connection refused**: If you can't connect to the server:

  ```bash
  mysql.server start
  ```

- **Configuration file location**: The default configuration file is at:

  - `/usr/local/etc/my.cnf` (if installed with Homebrew)
  - `/etc/my.cnf` (if installed with DMG)

- **Log file location**: Check logs for detailed error messages:
  ```bash
  tail -f /usr/local/var/mysql/$(hostname).err
  ```

## Ubuntu

### APT

1. **Update the package index**:

   ```bash
   sudo apt update
   ```

2. **Install MariaDB server**:

   ```bash
   sudo apt install mariadb-server
   ```

3. **Start and enable MariaDB service**:
   ```bash
   sudo systemctl start mariadb
   sudo systemctl enable mariadb
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

3. **Update and install**:
   ```bash
   sudo apt update
   sudo apt install mariadb-server
   ```

### Troubleshooting

- **Service won't start**: Check for errors in the log:

  ```bash
  sudo journalctl -u mariadb
  ```

- **Permission issues**: Ensure data directory has correct permissions:

  ```bash
  sudo chown -R mysql:mysql /var/lib/mysql
  ```

- **Configuration file location**: Ubuntu typically stores configuration in:

  ```
  /etc/mysql/mariadb.cnf
  /etc/mysql/conf.d/
  /etc/mysql/mariadb.conf.d/
  ```

- **Checking service status**:

  ```bash
  sudo systemctl status mariadb
  ```

- **Reinstalling after problems**:
  ```bash
  sudo apt purge mariadb-server mariadb-client
  sudo apt autoremove
  sudo rm -rf /var/lib/mysql
  sudo apt install mariadb-server
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

3. **Install MariaDB**:

   ```bash
   sudo yum install MariaDB-server MariaDB-client
   ```

4. **Start and enable MariaDB service**:
   ```bash
   sudo systemctl start mariadb
   sudo systemctl enable mariadb
   ```

### Troubleshooting

- **Service fails to start**: Check the system logs:

  ```bash
  sudo journalctl -u mariadb
  ```

- **SELinux issues**: SELinux might block MariaDB from accessing needed resources. Check with:
  ```bash
  sudo ausearch -c 'mysqld' --raw
  ```
  To temporarily disable SELinux for testing:
  ```bash
  sudo setenforce 0
  ```
- **Firewall problems**: If you can't connect remotely, check firewall settings:

  ```bash
  sudo firewall-cmd --permanent --add-service=mysql
  sudo firewall-cmd --reload
  ```

- **Configuration file location**: The default configuration file is usually at:

  ```
  /etc/my.cnf
  /etc/my.cnf.d/mariadb-server.cnf
  ```

- **Completely reinstalling MariaDB**:
  ```bash
  sudo systemctl stop mariadb
  sudo yum remove MariaDB-server MariaDB-client
  sudo rm -rf /var/lib/mysql
  # Then reinstall using the steps above
  ```

## Windows

### MSI

1. **Download the MSI installer** from the [official MariaDB website](https://mariadb.org/download/).

2. **Run the installer** and follow these steps:

   - Accept the license agreement
   - Choose installation path (default is usually fine)
   - Set password for the root user
   - Configure service settings (recommended to run as a service)
   - Choose TCP port (default is 3306)
   - Set character set (UTF8 recommended)
   - Click Install to complete the process

3. **Verify the installation** by opening Command Prompt and connecting:
   ```
   mysql -u root -p
   ```

### Chocolatey

1. **Install Chocolatey** (if not already installed):

   ```bash
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
   ```

2. **Install MariaDB**:
   ```
   choco install mariadb
   ```

### Troubleshooting

- **Service not starting**: Check Windows Services (services.msc) and ensure MariaDB service is set to Automatic. If it fails to start:

  1. Open Event Viewer (eventvwr.msc)
  2. Check under Windows Logs > Application for MariaDB errors

- **Port conflict**: If port 3306 is in use, edit my.ini file to change the port number:

  ```ini
  [mysqld]
  port=3307  # Change to any available port
  ```

- **Configuration file location**: Check for the configuration file at:

  ```
  C:\Program Files\MariaDB\data\my.ini
  C:\ProgramData\MySQL\MySQL Server\my.ini
  ```

- **Log file access**: Check logs for detailed error messages:

  ```
  C:\Program Files\MariaDB\data\MACHINENAME.err
  ```

- **Path issues**: If the 'mysql' command isn't recognized, add it to your PATH:
  1. Right-click on This PC > Properties > Advanced system settings > Environment Variables
  2. In System Variables, find PATH, click Edit
  3. Add `C:\Program Files\MariaDB\bin` (adjust if installed in different location)
  4. Click OK and restart Command Prompt

## Initial Configuration

After installation, it's important to secure your MariaDB installation:

1. **Run the security script**:

   - On Linux/macOS:
     ```bash
     sudo mysql_secure_installation
     ```
   - On Windows (Command Prompt as Administrator):
     ```
     mysql_secure_installation
     ```

2. **Follow the prompts to**:
   - Set a root password (if not already set)
   - Remove anonymous users
   - Disallow root login remotely
   - Remove test database
   - Reload privilege tables

## Verifying Your Installation

<HintBlock type="info">

To install MariaDB client, you can refer to [this post](/reference/mariadb/how-to/how-to-install-mariadb-client-on-mac-ubuntu-centos-windows).

</HintBlock>

To verify your MariaDB installation:

1. **Connect to MariaDB**:

   ```bash
   mariadb -u root -p
   ```

   Enter your password when prompted.

2. **Check the version**:

   ```sql
   SELECT VERSION();
   ```

3. **Create a test database**:

   ```sql
   CREATE DATABASE test_db;
   USE test_db;
   CREATE TABLE test_table (id INT, name VARCHAR(50));
   INSERT INTO test_table VALUES (1, 'Test Data');
   SELECT * FROM test_table;
   ```

4. **Exit MariaDB**:
   ```sql
   EXIT;
   ```
