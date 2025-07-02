---
title: How to Configure MongoDB SSL Connection
---

This tutorial shows you how to configure MongoDB SSL connection using self-signed certificates. You'll learn to:

1. Generate SSL certificates (CA, server, client)
2. Configure MongoDB server for SSL
3. Test SSL connections from clients

## Prerequisites

```bash
# Verify MongoDB installation
mongod --version

# Verify OpenSSL installation
openssl version
```

Ensure you have [MongoDB](https://docs.mongodb.com/manual/installation/) and [OpenSSL](https://www.openssl.org/source/) installed.

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
DNS.1 = localhost
IP.1 = YOUR_SERVER_IP
EOF
```

**Replace YOUR_SERVER_IP with your real server IP.**

### Generate Certificates

Generate Root CA key and certificate:

```bash
openssl genrsa -out ca.key 2048
openssl req -x509 -new -key ca.key -sha256 -days 36500 -out ca.pem -extensions 'v3_ca' -config req.conf
```

Generate Server key and certificate:

```bash
openssl genrsa -out server.key 2048
openssl req -new -sha256 -key server.key -out server.csr -subj "/C=CN/ST=GD/O=Bytebase/CN=YOUR_SERVER_IP" -config req.conf
openssl x509 -req -days 36500 -sha256 -extensions v3_req -CA ca.pem -CAkey ca.key -CAcreateserial -in server.csr -out server.pem -extfile req.conf
cat server.pem server.key > server-combined.pem
```

**Replace YOUR_SERVER_IP with your real server IP.**

Generate Client key and certificate:

```bash
openssl genrsa -out client.key 2048
openssl req -new -sha256 -key client.key -out client.csr -subj "/C=CN/ST=GD/O=Bytebase/CN=client" -config req.conf
openssl x509 -req -days 36500 -sha256 -extensions v3_req -CA ca.pem -CAkey ca.key -CAcreateserial -in client.csr -out client.pem -extfile req.conf
cat client.pem client.key > client-combined.pem
```

## Configure MongoDB Server

Copy SSL files and set permissions:

**For macOS (Homebrew):**

```bash
# Create directory (MongoDB will run as current user)
sudo mkdir -p /usr/local/etc/ssl/mongodb
sudo cp ca.pem server-combined.pem /usr/local/etc/ssl/mongodb/
sudo chown $(whoami):staff /usr/local/etc/ssl/mongodb/*
sudo chmod 600 /usr/local/etc/ssl/mongodb/server-combined.pem
sudo chmod 644 /usr/local/etc/ssl/mongodb/ca.pem
```

**For Linux systems:**

```bash
sudo mkdir -p /etc/ssl/mongodb
sudo cp ca.pem server-combined.pem /etc/ssl/mongodb/
sudo chown mongodb:mongodb /etc/ssl/mongodb/*
sudo chmod 600 /etc/ssl/mongodb/server-combined.pem
sudo chmod 644 /etc/ssl/mongodb/ca.pem
```

Edit MongoDB configuration file:

**For macOS (Homebrew):**
Edit `/usr/local/etc/mongod.conf` or `/opt/homebrew/etc/mongod.conf`, change the `net` section into:

```yaml
net:
  port: 27017
  bindIp: 0.0.0.0
  ssl:
    mode: requireSSL
    PEMKeyFile: /usr/local/etc/ssl/mongodb/server-combined.pem
    CAFile: /usr/local/etc/ssl/mongodb/ca.pem
    allowConnectionsWithoutCertificates: false
```

**For Linux systems:**

Edit `/etc/mongod.conf`:

```yaml
net:
  port: 27017
  bindIp: 0.0.0.0
  ssl:
    mode: requireSSL
    PEMKeyFile: /etc/ssl/mongodb/server-combined.pem
    CAFile: /etc/ssl/mongodb/ca.pem
    allowConnectionsWithoutCertificates: false
```

Restart MongoDB:

**For macOS (Homebrew):**

```bash
brew services restart mongodb-community
```

**For Linux (systemd):**

```bash
sudo systemctl restart mongod
```

## Test SSL Connection

### Prerequisites Check

Ensure MongoDB is running:

```bash
# Check MongoDB service status
brew services list | grep mongodb

# Check if port is listening
lsof -i :27017
```

### Install MongoDB Shell

```bash
brew install mongosh
```

### Test SSL Connection

**Quick verification:**

```bash
mongosh --quiet --tls \
        --tlsCAFile ca.pem \
        --tlsCertificateKeyFile client-combined.pem \
        --host localhost:27017 \
        --eval "print('SSL OK: ' + (db.runCommand({ping: 1}).ok === 1))"
```

**Test without SSL (should fail):**

```bash
# This should fail if SSL is properly configured
mongosh --host localhost:27017 --eval "db.runCommand({ping: 1})"
```

## Summary

You have successfully configured SSL for MongoDB:

1. Generated CA, server, and client certificates
2. Configured MongoDB with SSL settings
3. Tested secure connections from clients

Your MongoDB server now accepts encrypted connections only.

If you find this tutorial helpful, you might be interested in [Bytebase](https://bytebase.com/), an open-source schema change management tool for MongoDB.
