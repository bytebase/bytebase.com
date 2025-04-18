---
title: How to install Mongo Shell (mongosh) on Mac, Ubuntu, CentOS, Windows
---

MongoDB Shell `mongosh` is the modern command-line interface for interacting with MongoDB databases. This guide walks you through installing mongosh on Mac, Ubuntu, CentOS, or Windows.

## macOS

### Homebrew

1. **Install Homebrew** (if not already installed):

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install MongoDB Shell**:

   ```bash
   brew install mongosh
   ```

3. **Verify installation**:
   ```bash
   mongosh --version
   ```

### Using Manual Download

1. **Download the MongoDB Shell package** from the [MongoDB Download Center](https://www.mongodb.com/try/download/shell)

   - Select your macOS version
   - Choose "tgz" as the package format

2. **Extract the downloaded archive**:

   ```bash
   tar -zxvf mongosh-*-darwin-x64.tgz
   ```

3. **Move the binary to a directory in your PATH**:

   ```bash
   sudo cp mongosh-*-darwin-x64/bin/mongosh /usr/local/bin/
   ```

4. **Verify installation**:
   ```bash
   mongosh --version
   ```

### Troubleshooting on macOS

- If you see "command not found" after installation:
  ```bash
  export PATH=$PATH:/usr/local/bin
  ```
- For permission issues:
  ```bash
  sudo chmod +x /usr/local/bin/mongosh
  ```

## Ubuntu

### apt

1. **Import MongoDB GPG key**:

   ```bash
   wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
   ```

   If that doesn't work, try:

   ```bash
   wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | sudo tee /etc/apt/trusted.gpg.d/mongodb.asc
   ```

2. **Add MongoDB repository**:

   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```

3. **Update package index**:

   ```bash
   sudo apt update
   ```

4. **Install MongoDB Shell**:

   ```bash
   sudo apt install -y mongodb-mongosh
   ```

5. **Verify installation**:
   ```bash
   mongosh --version
   ```

### Manual Download

1. **Download the MongoDB Shell package**:

   ```bash
   wget https://downloads.mongodb.com/compass/mongodb-mongosh_2.1.1_amd64.deb
   ```

   Note: Replace the version number with the latest available

2. **Install the package**:

   ```bash
   sudo dpkg -i mongodb-mongosh_2.1.1_amd64.deb
   ```

3. **Verify installation**:
   ```bash
   mongosh --version
   ```

### Troubleshooting on Ubuntu

- If you encounter dependency issues:
  ```bash
  sudo apt --fix-broken install
  ```
- For repository key issues:
  ```bash
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 656408E390CFB1F5
  ```

## CentOS

### yum/dnf

1. **Create MongoDB repository file**:

   ```bash
   sudo tee /etc/yum.repos.d/mongodb-org-7.0.repo << EOF
   [mongodb-org-7.0]
   name=MongoDB Repository
   baseurl=https://repo.mongodb.org/yum/redhat/\$releasever/mongodb-org/7.0/x86_64/
   gpgcheck=1
   enabled=1
   gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
   EOF
   ```

2. **Install MongoDB Shell**:

   ```bash
   # For CentOS 8+
   sudo dnf install -y mongodb-mongosh

   # For CentOS 7
   sudo yum install -y mongodb-mongosh
   ```

3. **Verify installation**:
   ```bash
   mongosh --version
   ```

### Manual Download

1. **Download the MongoDB Shell package**:

   ```bash
   # For CentOS 8+
   wget https://downloads.mongodb.com/compass/mongodb-mongosh-2.1.1.el8.x86_64.rpm

   # For CentOS 7
   wget https://downloads.mongodb.com/compass/mongodb-mongosh-2.1.1.el7.x86_64.rpm
   ```

   Note: Replace the version number with the latest available

2. **Install the package**:

   ```bash
   # For CentOS 8+
   sudo dnf install -y ./mongodb-mongosh-2.1.1.el8.x86_64.rpm

   # For CentOS 7
   sudo yum install -y ./mongodb-mongosh-2.1.1.el7.x86_64.rpm
   ```

3. **Verify installation**:
   ```bash
   mongosh --version
   ```

### Troubleshooting on CentOS

- If repository issues occur:
  ```bash
  sudo yum clean all
  sudo yum makecache
  ```
- For SELinux-related issues:
  ```bash
  sudo setenforce 0  # Temporarily disable SELinux
  ```

## Windows

### Using MSI Installer

1. **Download the MSI installer** from the [MongoDB Download Center](https://www.mongodb.com/try/download/shell)

   - Select Windows as your platform
   - Choose "msi" as the package format

2. **Run the installer**:

   - Double-click the downloaded MSI file
   - Follow the installation wizard
   - Select the "Complete" installation type
   - Complete the installation

3. **Verify installation** by opening Command Prompt and typing:
   ```
   mongosh --version
   ```

### Chocolatey

1. **Install Chocolatey** (if not already installed), in PowerShell (Admin):

   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force
   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
   iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

2. **Install MongoDB Shell**:

   ```
   choco install mongodb-shell
   ```

3. **Verify installation**:
   ```
   mongosh --version
   ```

### Troubleshooting on Windows

- If 'mongosh' command isn't recognized:
  1. Open Environment Variables (search "environment variables" in Start menu)
  2. Under System variables, edit PATH
  3. Add the bin directory (usually `C:\Program Files\mongosh\bin`)
  4. Restart Command Prompt

## Connecting to a MongoDB Server

After installing mongosh, connect to a MongoDB server with:

```bash
mongosh "mongodb://hostname:27017"
```

Or with authentication:

```bash
mongosh "mongodb://username:password@hostname:27017/database"
```

For MongoDB Atlas:

```bash
mongosh "mongodb+srv://username:password@cluster.mongodb.net/database"
```

## Using MongoDB Shell Configuration File

You can create a mongosh configuration file to customize your experience:

1. Create a `.mongoshrc.js` file:

   - On macOS/Linux: `~/.mongoshrc.js`
   - On Windows: `%USERPROFILE%\.mongoshrc.js`

2. Add custom configurations, for example:

   ```js
   // Custom prompt
   prompt = () => {
     return `${db.getName()} > `;
   };

   // Custom helper function
   function countDocs(collection) {
     return db[collection].countDocuments();
   }
   ```

For more information, visit the [official MongoDB Shell documentation](https://docs.mongodb.com/mongodb-shell/).
