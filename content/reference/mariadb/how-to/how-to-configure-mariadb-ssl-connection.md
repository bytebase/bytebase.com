---
title: How to Configure MariaDB SSL Connection
---

This tutorial shows you how to configure MariaDB SSL connection using self-signed certificates. You'll learn to:

1. Generate SSL certificates (CA, server, client)
2. Configure MariaDB server for SSL
3. Test SSL connections from clients

## Prerequisites

```bash
# Verify MariaDB installation
mariadb --version

# Verify OpenSSL installation
openssl version
```

Ensure you have [MariaDB](https://mariadb.org/download/) and [OpenSSL](https://www.openssl.org/source/) installed.

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
DNS.1 = YOUR_SERVER_HOSTNAME
DNS.2 = localhost
IP.2 = 127.0.0.1
EOF
```

**Replace `YOUR_SERVER_IP` with your actual server IP address. You can find it with `ifconfig` or `ip addr show`.**

### Generate Certificates

Generate Root CA key and certificate:

```bash
openssl genrsa -out ca-key.pem 2048
openssl req -x509 -new -key ca-key.pem -sha256 -days 36500 -out ca-cert.pem -extensions 'v3_ca' -config req.conf
```

Generate Server key and certificate:

```bash
openssl genrsa -out server-key.pem 2048
openssl req -new -sha256 -key server-key.pem -out server-req.pem -subj "/C=CN/ST=GD/O=Bytebase/CN=YOUR_SERVER_IP"
openssl x509 -req -days 36500 -sha256 -extensions v3_req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in server-req.pem -out server-cert.pem
```

**Replace YOUR_SERVER_IP with your real server IP.**

Generate Client key and certificate:

```bash
openssl genrsa -out client-key.pem 2048
openssl req -new -sha256 -key client-key.pem -out client-req.pem -subj "/C=CN/ST=GD/O=Bytebase/CN=mariadb-client"
openssl x509 -req -days 36500 -sha256 -extensions v3_req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in client-req.pem -out client-cert.pem
```

## Configure MariaDB Server

Copy SSL files and set permissions:

**For macOS (Homebrew):**

```bash
# For Apple Silicon Macs
sudo mkdir -p /opt/homebrew/etc/mariadb/ssl
sudo cp ca-cert.pem server-cert.pem server-key.pem /opt/homebrew/etc/mariadb/ssl/
sudo chown -R $(whoami):admin /opt/homebrew/etc/mariadb/ssl/
sudo chmod 600 /opt/homebrew/etc/mariadb/ssl/*-key.pem
sudo chmod 644 /opt/homebrew/etc/mariadb/ssl/ca-cert.pem /opt/homebrew/etc/mariadb/ssl/server-cert.pem

# For Intel Macs
# sudo mkdir -p /usr/local/etc/mariadb/ssl
# sudo cp ca-cert.pem server-cert.pem server-key.pem /usr/local/etc/mariadb/ssl/
# sudo chown -R $(whoami):admin /usr/local/etc/mariadb/ssl/
# sudo chmod 600 /usr/local/etc/mariadb/ssl/*-key.pem
# sudo chmod 644 /usr/local/etc/mariadb/ssl/ca-cert.pem /usr/local/etc/mariadb/ssl/server-cert.pem
```

**For Linux systems:**

```bash
sudo mkdir -p /etc/mariadb/ssl
sudo cp ca-cert.pem server-cert.pem server-key.pem /etc/mariadb/ssl/
sudo chown mysql:mysql /etc/mariadb/ssl/*
sudo chmod 600 /etc/mariadb/ssl/*-key.pem
sudo chmod 644 /etc/mariadb/ssl/ca-cert.pem /etc/mariadb/ssl/server-cert.pem
```

Edit MariaDB configuration file:

```bash
# For macOS (Apple Silicon)
sudo nano /opt/homebrew/etc/my.cnf

# For macOS (Intel)
sudo nano /usr/local/etc/my.cnf

# For Linux (Ubuntu/Debian)
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf

# For Linux (CentOS/RHEL)
sudo nano /etc/my.cnf
```

Add SSL configuration:

**For macOS (Apple Silicon):**

```ini
[mysqld]
ssl-ca = /opt/homebrew/etc/mariadb/ssl/ca-cert.pem
ssl-cert = /opt/homebrew/etc/mariadb/ssl/server-cert.pem
ssl-key = /opt/homebrew/etc/mariadb/ssl/server-key.pem
bind-address = 0.0.0.0
port = 3306
```

**For macOS (Intel):**

```ini
[mysqld]
ssl-ca = /usr/local/etc/mariadb/ssl/ca-cert.pem
ssl-cert = /usr/local/etc/mariadb/ssl/server-cert.pem
ssl-key = /usr/local/etc/mariadb/ssl/server-key.pem
bind-address = 0.0.0.0
port = 3306
```

**For Linux systems:**

```ini
[mysqld]
ssl-ca = /etc/mariadb/ssl/ca-cert.pem
ssl-cert = /etc/mariadb/ssl/server-cert.pem
ssl-key = /etc/mariadb/ssl/server-key.pem
bind-address = 0.0.0.0
port = 3306
```

Restart MariaDB:

```bash
# For macOS (Homebrew)
brew services restart mariadb

# For Linux (systemd)
sudo systemctl restart mariadb
```

## Test SSL Connection

```bash
mariadb -h localhost -u root -p
```

So that you'll be entering MariaDB CLI. You can also verify remote connection by replacing the `localhost` above with your server IP to connect. Check your SSL connection with:

```sql
\s
```

Seeing something like `SSL: Cipher in use is TLS_AES_256_GCM_SHA384, cert is OK`, so that the SSL connection is ready.

Or use command

```sql
SHOW STATUS LIKE 'Ssl_version';
```

You'll see something like:

```sql
+---------------+---------+
| Variable_name | Value   |
+---------------+---------+
| Ssl_version   | TLSv1.3 |
+---------------+---------+
1 row in set (0.006 sec)
```

## Summary

You have successfully configured SSL for MariaDB:

1. Generated CA, server, and client certificates
2. Configured MariaDB with SSL settings
3. Tested secure connections from clients

Your MariaDB server now accepts encrypted connections only.
