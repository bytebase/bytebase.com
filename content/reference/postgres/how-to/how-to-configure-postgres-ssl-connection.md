---
title: How to Configure PostgreSQL SSL Connection
---

This tutorial shows you how to configure PostgreSQL SSL connection using self-signed certificates. You'll learn to:

1. Generate SSL certificates (CA, server, client)
2. Configure PostgreSQL server for SSL
3. Test SSL connections from clients

## Prerequisites

```bash
# Verify PostgreSQL installation
postgres --version

# Verify OpenSSL installation
openssl version
```

Ensure you have [PostgreSQL](https://www.postgresql.org/download/) and [OpenSSL](https://www.openssl.org/source/) installed.

## Generate SSL Related Files

### OpenSSL Config

Set up the configuration file:

```bash
cat >req.conf <<EOF
[ req ]
distinguished_name = req_distinguished_name
x509_extensions = v3_ca
prompt = no
[ req_distinguished_name ]
C = CN
ST = GD
O = Bytebase
CN = root
[ v3_ca ]
basicConstraints = critical,CA:TRUE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer:always
[ v3_req ]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[ alt_names ]
IP.1 = YOUR_SERVER_IP
IP.2 = 127.0.0.1
DNS.1 = YOUR_SERVER_HOSTNAME
DNS.2 = localhost
EOF
```

**Replace YOUR_SERVER_IP with your real server IP and YOUR_SERVER_HOSTNAME with your server hostname.**

### Generate Certificates

Generate Root CA key and certificate:

```bash
openssl genrsa -out ca-key.pem 2048
openssl req -x509 -new -key ca-key.pem -sha256 -days 36500 -out ca-cert.pem -extensions 'v3_ca' -config req.conf
```

Generate Server key and certificate:

```bash
openssl genrsa -out server-key.pem 2048
openssl req -new -sha256 -key server-key.pem -out server-req.pem -subj "/C=CN/ST=GD/O=Bytebase/CN=localhost" -config req.conf
openssl x509 -req -days 36500 -sha256 -extensions v3_req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in server-req.pem -out server-cert.pem -extfile req.conf
```

Generate Client key and certificate:

```bash
openssl genrsa -out client-key.pem 2048
openssl req -new -sha256 -key client-key.pem -out client-req.pem -subj "/C=CN/ST=GD/O=Bytebase/CN=postgres-client" -config req.conf
openssl x509 -req -days 36500 -sha256 -extensions v3_req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in client-req.pem -out client-cert.pem -extfile req.conf
```

## Configure PostgreSQL Server

1. Copy SSL files and set permissions:

   **For macOS (Homebrew):**

```bash
# For Apple Silicon Macs
sudo mkdir -p /opt/homebrew/var/postgresql@14/ssl
sudo cp ca-cert.pem server-cert.pem server-key.pem client-cert.pem client-key.pem /opt/homebrew/var/postgresql@14/ssl/
sudo chown $(whoami):staff /opt/homebrew/var/postgresql@14/ssl/*
sudo chmod 600 /opt/homebrew/var/postgresql@14/ssl/*-key.pem
sudo chmod 644 /opt/homebrew/var/postgresql@14/ssl/ca-cert.pem /opt/homebrew/var/postgresql@14/ssl/server-cert.pem /opt/homebrew/var/postgresql@14/ssl/client-cert.pem
```

```bash
# For Intel Macs
sudo mkdir -p /usr/local/var/postgresql@14/ssl
sudo cp ca-cert.pem server-cert.pem server-key.pem client-cert.pem client-key.pem /usr/local/var/postgresql@14/ssl/
sudo chown $(whoami):staff /usr/local/var/postgresql@14/ssl/*
sudo chmod 600 /usr/local/var/postgresql@14/ssl/*-key.pem
sudo chmod 644 /usr/local/var/postgresql@14/ssl/ca-cert.pem /usr/local/var/postgresql@14/ssl/server-cert.pem /usr/local/var/postgresql@14/ssl/client-cert.pem
```

Or change the paths to match your PostgreSQL version if different. Check the version with:

```
brew list --versions postgresql
ls -la /opt/homebrew/var/ | grep postgresql
```

**For Linux (Ubuntu/Debian):**

```bash
sudo mkdir -p /etc/postgresql/ssl
sudo cp ca-cert.pem server-cert.pem server-key.pem client-cert.pem client-key.pem /etc/postgresql/ssl/
sudo chown postgres:postgres /etc/postgresql/ssl/*
sudo chmod 600 /etc/postgresql/ssl/*-key.pem
sudo chmod 644 /etc/postgresql/ssl/*.pem
```

2. Edit PostgreSQL configuration file:

   **For Apple Silicon Macs (Homebrew):**

```bash
sudo nano /opt/homebrew/var/postgresql@14/postgresql.conf
```

**Configuration for macOS (Apple Silicon):**

```ini
# SSL Configuration
ssl = on
ssl_cert_file = '/opt/homebrew/var/postgresql@14/ssl/server-cert.pem'
ssl_key_file = '/opt/homebrew/var/postgresql@14/ssl/server-key.pem'
ssl_ca_file = '/opt/homebrew/var/postgresql@14/ssl/ca-cert.pem'
listen_addresses = '*'
```

**For Intel Macs (Homebrew):**

```bash
sudo nano /usr/local/var/postgresql/postgresql.conf
```

**Configuration for macOS (Intel):**

```ini
# SSL Configuration
ssl = on
ssl_cert_file = '/usr/local/var/postgresql@14/ssl/server-cert.pem'
ssl_key_file = '/usr/local/var/postgresql@14/ssl/server-key.pem'
ssl_ca_file = '/usr/local/var/postgresql@14/ssl/ca-cert.pem'
listen_addresses = '*'
```

**For Linux (Ubuntu/Debian):**

```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
```

**Configuration for Linux:**

```ini
# SSL Configuration
ssl = on
ssl_cert_file = '/etc/postgresql/ssl/server-cert.pem'
ssl_key_file = '/etc/postgresql/ssl/server-key.pem'
ssl_ca_file = '/etc/postgresql/ssl/ca-cert.pem'
listen_addresses = '*'
```

3. Edit authentication configuration:

   **For macOS (Homebrew):**

```bash
# For Apple Silicon Macs
sudo nano /opt/homebrew/var/postgresql@14/pg_hba.conf

# For Intel Macs
sudo nano /usr/local/var/postgresql/pg_hba.conf
```

**For Linux (Ubuntu/Debian):**

```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```

Add SSL requirement to pg_hba.conf:

```ini
# TYPE  DATABASE        USER            ADDRESS                 METHOD
# Only allow SSL connections
hostssl all             all             127.0.0.1/32            md5
hostssl all             all             ::1/128                 md5
hostssl all             all             0.0.0.0/0               md5

# Explicitly reject non-SSL connections
host    all             all             127.0.0.1/32            reject
host    all             all             ::1/128                 reject
host    all             all             0.0.0.0/0               reject
```

**Important**: Remove or comment out any existing `host` entries that don't explicitly reject connections to ensure SSL is required.

This configuration requires SSL for all connections, using `md5` authentication.

4. Restart PostgreSQL:

   **For macOS (Homebrew):**

```bash
brew services restart postgresql
```

**For Linux (Ubuntu/Debian):**

```bash
sudo systemctl restart postgresql
```

## Test SSL Connection

### Prerequisites Check

Ensure PostgreSQL is running with SSL enabled:

```bash
# Check PostgreSQL service status
brew services list | grep postgresql

# Check if PostgreSQL is listening on port 5432
lsof -i :5432

# Test basic connectivity
nc -zv localhost 5432
```

### Test SSL Connection

**First, ensure your PostgreSQL user exists:**

```bash
# Connect as default user (no password needed)
psql postgres
```

Create a user if it doesn't exist:

```sql
-- Create your user with a password (run this inside PostgreSQL)
CREATE USER YOUR_USER_NAME WITH SUPERUSER PASSWORD 'pwd';

-- Exit PostgreSQL
\q
```

Or if you already have a user, set the password:

```sql
ALTER USER YOUR_USER_NAME WITH PASSWORD 'pwd';
```

Replace `YOUR_USER_NAME` with your actual username.

**Quick SSL verification:**

```bash
# One-liner to test SSL connection
psql "host=localhost port=5432 dbname=postgres user=$(whoami) sslmode=require" -c "SELECT version();"
```

**Basic SSL connection test:**

```bash
# Connect with SSL encryption only
psql "host=localhost port=5432 dbname=postgres user=$(whoami) sslmode=require"
```

**SSL connection with CA verification:**

```bash
# Connect with CA certificate verification
psql "host=localhost port=5432 dbname=postgres user=$(whoami) sslmode=require sslrootcert=ca-cert.pem"
```

**SSL connection with client certificates (advanced - requires additional configuration):**

```bash
# This requires PostgreSQL to be configured for client certificate authentication
# See troubleshooting section below for setup
psql "host=localhost port=5432 dbname=postgres user=$(whoami) sslmode=require sslcert=client-cert.pem sslkey=client-key.pem sslrootcert=ca-cert.pem"
```

### Verify SSL Status

Once connected, check SSL details:

```sql
-- Check if SSL is enabled
SHOW ssl;

-- Show SSL cipher and version
\conninfo
```

### Test without SSL (should fail)

```bash
# This should fail if SSL is properly configured
psql "host=localhost port=5432 dbname=postgres user=$(whoami) sslmode=disable"
```

## Summary

You have successfully configured SSL for PostgreSQL:

1. Generated CA, server, and client certificates
2. Configured PostgreSQL with SSL settings
3. Established secure encrypted connections

Your PostgreSQL server now supports:

- **SSL Encryption**: ✅ Working (`sslmode=require`)
- **CA Verification**: ✅ Working (`sslrootcert=ca-cert.pem`)
- **Client Certificate Authentication**: Optional (requires additional configuration)

**Your SSL connection shows:**

- Protocol: TLSv1.3
- Cipher: TLS_AES_256_GCM_SHA384
- Encryption: 256-bit

This provides excellent security for data in transit. Client certificate authentication is an additional security layer that's optional for most use cases.

If you find this tutorial helpful, you might be interested in [Bytebase](https://bytebase.com/), an open-source schema change management tool for PostgreSQL.
