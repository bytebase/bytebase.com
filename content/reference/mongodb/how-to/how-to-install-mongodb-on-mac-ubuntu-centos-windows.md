---
title: How to install local MongoDB on Mac, Ubuntu, CentOS, Windows
---

This guide covers how to install a local MongoDB on Mac, Ubuntu, CentOS, or Windows.

## macOS

### Homebrew (Recommended)

1. **Install Homebrew** (if not already installed):

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install MongoDB**:

   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

3. **Start MongoDB Service**:
   ```bash
   brew services start mongodb-community
   ```

### Troubleshooting on macOS

- If MongoDB fails to start, check logs:
  ```bash
  brew services list
  cat $(brew --prefix)/var/log/mongodb/mongo.log
  ```
- Ensure data directory has proper permissions:
  ```bash
  sudo chown -R $(whoami) $(brew --prefix)/var/mongodb
  ```

## Ubuntu

### apt

1. **Import MongoDB public GPG key**:

   ```bash
   wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
   ```

   For newer Ubuntu versions, use:

   ```bash
   wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor --output /usr/share/keyrings/mongodb-archive-keyring.gpg
   ```

2. **Create a list file for MongoDB**:

   ```bash
   # For Ubuntu 22.04 (Jammy)
   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```

   Replace "jammy" with your Ubuntu codename (bionic for 18.04, focal for 20.04)

3. **Update package database**:

   ```bash
   sudo apt update
   ```

4. **Install MongoDB**:

   ```bash
   sudo apt install -y mongodb-org
   ```

5. **Start and enable MongoDB service**:
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

### Troubleshooting on Ubuntu

- Check service status:
  ```bash
  sudo systemctl status mongod
  ```
- View logs for errors:
  ```bash
  sudo journalctl -u mongod
  ```
- If service won't start, check directory permissions:
  ```bash
  sudo chown -R mongodb:mongodb /var/lib/mongodb
  sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
  ```

## CentOS

### yum/dnf

1. **Create a repository file for MongoDB**:

   ```bash
   sudo tee /etc/yum.repos.d/mongodb-org-7.0.repo <<EOF
   [mongodb-org-7.0]
   name=MongoDB Repository
   baseurl=https://repo.mongodb.org/yum/redhat/\$releasever/mongodb-org/7.0/x86_64/
   gpgcheck=1
   enabled=1
   gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
   EOF
   ```

2. **Install MongoDB**:

   ```bash
   # For CentOS 8 or newer
   sudo dnf install -y mongodb-org

   # For CentOS 7
   sudo yum install -y mongodb-org
   ```

3. **Start and enable MongoDB service**:
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

### Troubleshooting on CentOS

- Check service status:
  ```bash
  sudo systemctl status mongod
  ```
- For SELinux-related issues:
  ```bash
  sudo setenforce 0  # Temporarily disable SELinux
  ```
- Configure firewall:
  ```bash
  sudo firewall-cmd --permanent --add-port=27017/tcp
  sudo firewall-cmd --reload
  ```

## Installing on Windows

### Installer

1. **Download MongoDB installer** from the [official website](https://www.mongodb.com/try/download/community)

   - Select "Windows" as the platform
   - Choose the MSI package
   - Click "Download"

2. **Run the installer**:

   - Double-click the downloaded MSI file
   - Follow the installation wizard
   - Select "Complete" installation
   - You can choose to install MongoDB Compass (GUI tool)

3. **Verify the service**:
   - MongoDB should be installed as a Windows service
   - Open Services (press Win+R, type "services.msc")
   - Look for "MongoDB Server" service and ensure it's running

### Chocolatey

1. **Install Chocolatey** (if not already installed):

   - Open PowerShell as Administrator
   - Run:
     ```powershell
     Set-ExecutionPolicy Bypass -Scope Process -Force
     [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
     iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
     ```

2. **Install MongoDB**:
   ```powershell
   choco install mongodb
   ```

### Troubleshooting on Windows

- If service fails to start, check Event Viewer for errors
- Ensure data directory exists and has proper permissions:
  ```
  mkdir C:\data\db
  ```
- Check configuration file at:
  ```
  C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg
  ```

## Verifying Your Installation

<HintBlock type="info">

To install `mongosh`, you can refer to [this post](/reference/mongodb/how-to/how-to-install-mongodb-shell-on-mac-ubuntu-centos-windows).

</HintBlock>

1. **Check if MongoDB is running**:

   ```bash
   # Linux/macOS
   mongosh

   # Windows (Command Prompt or PowerShell)
   mongosh
   ```

2. **Test basic operations**:

   ```javascript
   // Show databases
   show dbs

   // Create/switch to a test database
   use test_db

   // Insert a document
   db.users.insertOne({ name: "Test User", email: "test@example.com" })

   // Query documents
   db.users.find()

   // Exit mongosh
   exit
   ```

## Basic Configuration

### Data Directory

By default, MongoDB stores data in:

- macOS: `/usr/local/var/mongodb` (Homebrew)
- Ubuntu/CentOS: `/var/lib/mongodb`
- Windows: `C:\Program Files\MongoDB\Server\7.0\data`

### Configuration File

MongoDB's configuration file is located at:

- macOS: `/usr/local/etc/mongod.conf` (Homebrew)
- Ubuntu/CentOS: `/etc/mongod.conf`
- Windows: `C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg`

### Securing MongoDB

For basic security, create an admin user:

```javascript
use admin
db.createUser({
  user: "adminUser",
  pwd: "securePassword",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})
```

Then enable authentication in your configuration file:

```yaml
security:
  authorization: enabled
```
