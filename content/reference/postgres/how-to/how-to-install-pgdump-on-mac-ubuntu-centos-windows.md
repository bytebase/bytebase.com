---
title: How to install pg_dump on your Mac, Ubuntu, CentOS, Windows
---

`pg_dump` is part of the PostgreSQL client utilities and doesn't come as a standalone tool. This guide covers how to install PostgreSQL client tools (including `pg_dump`) on various operating systems.

## Mac OS

### Method 1: Using Homebrew (Recommended)

1. Install Homebrew if you don't have it:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

1. Install PostgreSQL:

   ```bash
   brew install postgresql
   ```

1. Verify installation:
   ```bash
   pg_dump --version
   ```

### Method 2: Using Postgres.app

1. Download [Postgres.app](https://postgresapp.com/)
1. Move to Applications folder and open
1. Add to your PATH:
   ```bash
   sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp
   ```
1. Restart your terminal
1. Verify installation:
   ```bash
   pg_dump --version
   ```

## Ubuntu

1. Update package lists:

   ```bash
   sudo apt update
   ```

1. Install PostgreSQL client:

   ```bash
   sudo apt install postgresql-client
   ```

1. Verify installation:

   ```bash
   pg_dump --version
   ```

   To install a specific PostgreSQL version (e.g., PostgreSQL 14):

   ```bash
   sudo apt install postgresql-client-14
   ```

## CentOS/RHEL

### For CentOS/RHEL 7.x

1. Add PostgreSQL official repository:

   ```bash
   sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
   ```

1. Install PostgreSQL client:

   ```bash
   sudo yum install -y postgresql14
   ```

1. Verify installation:
   ```bash
   pg_dump --version
   ```

### For CentOS/RHEL 8.x and above

1. Add PostgreSQL official repository:

   ```bash
   sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
   ```

1. Disable built-in PostgreSQL module:

   ```bash
   sudo dnf -qy module disable postgresql
   ```

1. Install PostgreSQL client:

   ```bash
   sudo dnf install -y postgresql14
   ```

1. Verify installation:
   ```bash
   pg_dump --version
   ```

## Windows

### Method 1: Full PostgreSQL Installation

1. Download the PostgreSQL installer from https://www.postgresql.org/download/windows/
1. Run the installer and follow the setup wizard
1. Deselect components you don't need (e.g., pgAdmin, StackBuilder)
1. Complete the installation
1. Add PostgreSQL bin directory to your PATH:
   - Go to Control Panel > System and Security > System > Advanced system settings
   - Click "Environment Variables"
   - Edit PATH variable and add: `C:\Program Files\PostgreSQL\<version>\bin`
1. Open a new Command Prompt and verify:
   ```cmd
   pg_dump --version
   ```

### Method 2: Using the ZIP Version (Client-Only)

1. Download the ZIP archive from https://www.enterprisedb.com/download-postgresql-binaries
1. Extract to a location (e.g., `C:\pgsql`)
1. Add bin directory to PATH:
   - Go to Control Panel > System and Security > System > Advanced system settings
   - Click "Environment Variables"
   - Edit PATH variable and add: `C:\pgsql\bin`
1. Open a new Command Prompt and verify:
   ```cmd
   pg_dump --version
   ```

## Using pg_dump

Basic usage:

```bash
pg_dump -h hostname -p port -U username -d dbname -f output.sql
```

Examples:

```bash
# Dump in plain SQL format
pg_dump -h localhost -U postgres -d mydb -f backup.sql

# Dump in custom format (compressed)
pg_dump -h localhost -U postgres -d mydb -F c -f backup.dump

# Dump schema only
pg_dump -h localhost -U postgres -d mydb --schema-only -f schema.sql

# Dump specific tables
pg_dump -h localhost -U postgres -d mydb -t table1 -t table2 -f tables.sql
```

## Troubleshooting

### Common Issues

1. **Command not found**: Ensure PostgreSQL bin directory is in your PATH
2. **Permission denied**: Ensure you have proper permissions to run the command
3. **Connection refused**: Check hostname, port, and ensure PostgreSQL server is running
4. **Authentication failed**: Verify username and password

### Environment Variables

Setting up environment variables can make using pg_dump easier:

```bash
export PGHOST=localhost
export PGPORT=5432
export PGUSER=postgres
export PGPASSWORD=yourpassword  # Not recommended for security reasons
```

For Windows:

```cmd
set PGHOST=localhost
set PGPORT=5432
set PGUSER=postgres
set PGPASSWORD=yourpassword  # Not recommended for security reasons
```
