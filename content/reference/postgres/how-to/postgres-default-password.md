---
title: PostgreSQL Default Password
updated_at: 2025/05/07 14:30:00
---

_Official documentation: [PostgreSQL Authentication Methods](https://www.postgresql.org/docs/current/auth-methods.html)_

## Default Password Behavior

PostgreSQL doesn't set a default password for the initial superuser account (`postgres`). Instead, it uses authentication methods configured in `pg_hba.conf`.

## Initial Configuration by Platform

### Linux/Unix

Most Linux distributions use "peer" authentication for local connections:

```bash
# Default pg_hba.conf on Ubuntu
local   all   postgres   peer
local   all   all        peer
```

Connect without password by switching to the postgres user:

```bash
sudo -i -u postgres
psql
```

### Windows

Windows installations typically prompt for a password during setup and use "md5" or "scram-sha-256" authentication.

### Docker

Docker images require setting the password via environment variables:

```bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

## Setting/Changing Passwords

```sql
-- For postgres user
ALTER USER postgres PASSWORD 'new_secure_password';

-- For new users
CREATE USER username WITH PASSWORD 'secure_password';
```

## Authentication Methods

Check configuration location:

```bash
sudo -u postgres psql -c "SHOW hba_file;"
```

Common methods:

| Method          | Description                         |
| --------------- | ----------------------------------- |
| `peer`          | Uses OS username (Unix only)        |
| `md5`           | Uses MD5-encrypted password         |
| `scram-sha-256` | Uses SCRAM-SHA-256 (PostgreSQL 10+) |
| `trust`         | No password (INSECURE)              |
| `password`      | Clear text password (INSECURE)      |
| `cert`          | SSL client certificates             |

## Changing Authentication

1. Edit pg_hba.conf:

```bash
sudo nano /etc/postgresql/13/main/pg_hba.conf
```

2. Change from peer to password authentication:

```
# Change this
local   all   postgres   peer
# To this
local   all   postgres   md5
```

3. Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

## Common Issues

### Password Authentication Failed

- Check user exists: `SELECT usename FROM pg_user;`
- Reset password: `ALTER USER username WITH PASSWORD 'new_password';`

### No Password Prompt

- Check if using `trust` or `peer` authentication
- Check if client is storing passwords

### Connection Problems After Changes

- Verify PostgreSQL restarted: `sudo systemctl status postgresql`
- Check logs: `sudo tail -f /var/log/postgresql/postgresql-13-main.log`

## Best Practices

1. Never use `trust` in production
2. Use `scram-sha-256` instead of `md5` (PostgreSQL 10+)
3. Set strong passwords for all users
4. Regularly rotate passwords
5. Consider client certificates for authentication
6. Limit network access with firewall rules
7. Use a password manager

## Cloud Providers

- **AWS RDS**: Password set during creation, default user: `postgres`
- **Google Cloud SQL**: Password required, default user: `postgres`
- **Azure**: Password required, default admin: `postgres`

## References

- [PostgreSQL Authentication Methods](https://www.postgresql.org/docs/current/auth-methods.html)
- [Password Authentication](https://www.postgresql.org/docs/current/auth-password.html)
- [Client Authentication](https://www.postgresql.org/docs/current/client-authentication.html)
- [pg_hba.conf Format](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html)
