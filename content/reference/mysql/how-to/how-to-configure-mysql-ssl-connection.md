---
title: How to Configure MySQL SSL Connection
---

This tutorial shows you how to configure MySQL SSL connection using self-signed certificates. You'll learn to:

1. Generate SSL certificates (CA, server, client)
2. Configure MySQL server for SSL
3. Test SSL connections from clients

## Prerequisites

```bash
# Verify MySQL installation
mysql --version

# Verify OpenSSL installation
openssl version
```

Ensure you have [MySQL](https://dev.mysql.com/downloads/) and [OpenSSL](https://www.openssl.org/source/) installed.

## Generate SSL Related Files

### OpenSSL Config

Set up the configuration file:

```text
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
openssl req -new -sha256 -key server-key.pem -out server-req.pem -subj "/C=CN/ST=GD/O=Bytebase/CN=YOUR_SERVER_IP" -config req.conf
openssl x509 -req -days 36500 -sha256 -extensions v3_req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in server-req.pem -out server-cert.pem -extfile req.conf
```

**Replace YOUR_SERVER_IP with your real server IP.**

Generate Client key and certificate:

```bash
openssl genrsa -out client-key.pem 2048
openssl req -new -sha256 -key client-key.pem -out client-req.pem -subj "/C=CN/ST=GD/O=Bytebase/CN=mysql-client" -config req.conf
openssl x509 -req -days 36500 -sha256 -extensions v3_req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in client-req.pem -out client-cert.pem -extfile req.conf
```

## Configure MySQL Server

Copy SSL files and set permissions:

**For macOS (Homebrew):**

```bash
# For Apple Silicon Macs
sudo mkdir -p /opt/homebrew/etc/mysql/ssl
sudo cp ca-cert.pem server-cert.pem server-key.pem /opt/homebrew/etc/mysql/ssl/
sudo chown $(whoami):staff /opt/homebrew/etc/mysql/ssl/*
sudo chmod 600 /opt/homebrew/etc/mysql/ssl/*-key.pem
sudo chmod 644 /opt/homebrew/etc/mysql/ssl/ca-cert.pem /opt/homebrew/etc/mysql/ssl/server-cert.pem
```

```bash
# For Intel Macs
# sudo mkdir -p /usr/local/etc/mysql/ssl
# sudo cp ca-cert.pem server-cert.pem server-key.pem /usr/local/etc/mysql/ssl/
# sudo chown $(whoami):staff /usr/local/etc/mysql/ssl/*
# sudo chmod 600 /usr/local/etc/mysql/ssl/*-key.pem
# sudo chmod 644 /usr/local/etc/mysql/ssl/ca-cert.pem /usr/local/etc/mysql/ssl/server-cert.pem
```

**For Linux systems:**

```bash
sudo mkdir -p /etc/mysql/ssl
sudo cp ca-cert.pem server-cert.pem server-key.pem /etc/mysql/ssl/
sudo chown mysql:mysql /etc/mysql/ssl/*
sudo chmod 600 /etc/mysql/ssl/*-key.pem
sudo chmod 644 /etc/mysql/ssl/ca-cert.pem /etc/mysql/ssl/server-cert.pem
```

Edit MySQL configuration file:

**For macOS (Homebrew):**

```bash
# For Apple Silicon Macs
sudo nano /opt/homebrew/etc/my.cnf
```

**Configuration for macOS (Apple Silicon):**

```ini
[mysqld]
# SSL Configuration
ssl-ca = /opt/homebrew/etc/mysql/ssl/ca-cert.pem
ssl-cert = /opt/homebrew/etc/mysql/ssl/server-cert.pem
ssl-key = /opt/homebrew/etc/mysql/ssl/server-key.pem
bind-address = 0.0.0.0
require_secure_transport = ON
```

```bash
# For Intel Macs
sudo nano /usr/local/etc/my.cnf
```

**Configuration for macOS (Intel):**

```ini
[mysqld]
# SSL Configuration
ssl-ca = /usr/local/etc/mysql/ssl/ca-cert.pem
ssl-cert = /usr/local/etc/mysql/ssl/server-cert.pem
ssl-key = /usr/local/etc/mysql/ssl/server-key.pem
bind-address = 0.0.0.0
require_secure_transport = ON
```

**For Linux systems:**

Edit `/etc/mysql/mysql.conf.d/mysqld.cnf` (or `/etc/mysql/my.cnf` on some systems):

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

**Configuration for Linux systems:**

```ini
[mysqld]
# SSL Configuration
ssl-ca = /etc/mysql/ssl/ca-cert.pem
ssl-cert = /etc/mysql/ssl/server-cert.pem
ssl-key = /etc/mysql/ssl/server-key.pem
bind-address = 0.0.0.0
require_secure_transport = ON
```

Restart MySQL:

**For macOS (Homebrew):**

```bash
brew services restart mysql
```

**For Linux systems:**

```bash
sudo systemctl restart mysql
```

## Test SSL Connection

**Quick SSL verification:**

```bash
# Check SSL cipher and status
mysql -h localhost -u root -p --ssl-mode=REQUIRED -e "SHOW STATUS LIKE 'Ssl_cipher';"
```

**Basic SSL connection test:**

```bash
# Simple SSL connection - this works and provides excellent security
mysql -h localhost -u root -p --ssl-mode=REQUIRED
```

### Verify SSL Status

Once connected, check SSL details:

```sql
-- Check current connection's SSL cipher
SHOW STATUS LIKE 'Ssl_cipher';

-- Display connection info
\s
```

### Test without SSL (should fail)

```bash
# This should fail if require_secure_transport=ON
mysql -h localhost -u root -p --skip-ssl
```

## Summary

You have successfully configured MySQL to use SSL for secure connections. This setup ensures that all data transmitted between the MySQL server and clients is encrypted, enhancing security against eavesdropping. If you find this tutorial helpful, you might be interested in [Bytebase](https://bytebase.com/), an open-source schema change management tool for MySQL.
