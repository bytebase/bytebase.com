---
title: 'ERROR 28P01: Password Authentication Failed in Postgres'
---

## Error Message

```sql
FATAL: password authentication failed for user "app_user"
SQLSTATE: 28P01
```

You may also see variations:

```
DETAIL: User "app_user" has no password assigned.
```

```
psql: error: connection to server at "localhost" (127.0.0.1), port 5432 failed:
FATAL: password authentication failed for user "app_user"
```

## What Triggers This Error

28P01 is the most common PostgreSQL connection error, but the fix varies completely depending on your environment:

- **Wrong password or stale credentials** — password rotated but config not updated
- **Role has no password set** — created with `CREATE ROLE ... LOGIN` but no `PASSWORD` clause
- **SCRAM vs MD5 mismatch** — PostgreSQL 14+ changed the default, breaks upgrades
- **Docker container with stale volume** — `POSTGRES_PASSWORD` only applies on first init
- **pg_hba.conf method mismatch** — server requires a different auth method than what the client provides
- **Connection pool (PgBouncer/Pgpool) has old credentials** — database password changed but pool config not updated
- **Cloud database (RDS, Cloud SQL, Azure)** — password must be changed through the cloud console, not SQL
- **Special characters in password** — `@`, `#`, `%` misinterpreted in connection strings

## Fix by Scenario

### Wrong password or stale credentials

The most common case. Reset the password and verify:

```sql
-- Connect as a superuser
ALTER ROLE app_user WITH PASSWORD 'new_secure_password';
```

Then check that the role exists and can log in:

```sql
SELECT rolname, rolcanlogin
FROM pg_roles
WHERE rolname = 'app_user';
```

If `rolcanlogin` is `f`:

```sql
ALTER ROLE app_user WITH LOGIN;
```

Also check `.pgpass` and environment variables for stale credentials:

```bash
# .pgpass format: hostname:port:database:username:password
cat ~/.pgpass
chmod 600 ~/.pgpass  # must have restricted permissions or PostgreSQL ignores it
```

### SCRAM vs MD5 mismatch (common after PostgreSQL 14+ upgrade)

PostgreSQL 14 changed the default `password_encryption` from `md5` to `scram-sha-256`. After upgrading, if `pg_hba.conf` now says `scram-sha-256` but the password was originally stored as MD5, authentication fails silently — the error message doesn't mention the mismatch.

```sql
-- Check current encryption setting
SHOW password_encryption;
```

Fix: either change pg_hba.conf back to `md5`, or re-set all passwords so they're stored as SCRAM:

```sql
-- Option A (recommended): keep scram-sha-256 and reset passwords
SET password_encryption = 'scram-sha-256';
ALTER ROLE app_user WITH PASSWORD 'the_same_or_new_password';

-- Option B: change pg_hba.conf to md5 (less secure but no password resets needed)
```

After editing `pg_hba.conf`, reload:

```sql
SELECT pg_reload_conf();
```

### Docker container with stale volume

The `POSTGRES_PASSWORD` environment variable in `docker-compose.yml` only takes effect on first database initialization. If you change it and restart the container without deleting the volume, the old password persists.

```bash
# Option A: Drop the volume and reinitialize (destroys data)
docker compose down -v
docker compose up -d

# Option B: Connect with the OLD password and change it
docker exec -it postgres psql -U postgres -c "ALTER ROLE postgres WITH PASSWORD 'new_password';"
```

This is the single most common cause of 28P01 in development environments.

### pg_hba.conf requires password but role uses a different method

Check which auth method the server expects for your connection:

```bash
# Find the active pg_hba.conf
psql -U postgres -c "SHOW hba_file;"
```

Look for the line matching your connection type, database, user, and address:

```
# TYPE  DATABASE  USER       ADDRESS        METHOD
host    all       all        127.0.0.1/32   scram-sha-256
host    all       all        0.0.0.0/0      md5
```

If the method is `peer` or `ident` (common for local Unix socket connections), password auth isn't used at all — switch to `md5` or `scram-sha-256` if you need password-based login.

### Connection pool (PgBouncer, Pgpool-II)

The pooler authenticates users independently from PostgreSQL. If the database password changes but the pooler's `userlist.txt` or auth config isn't updated, connections through the pool fail with 28P01 while direct connections work fine.

```bash
# PgBouncer: update userlist.txt
# Format: "username" "password"
# Then reload
pgbouncer -R /etc/pgbouncer/pgbouncer.ini
```

Test by connecting directly (bypassing the pool) to confirm the database password itself is correct.

### Cloud-managed database (RDS, Cloud SQL, Azure)

Cloud providers manage `pg_hba.conf` internally. You can't edit it directly.

```bash
# AWS RDS
aws rds modify-db-instance --db-instance-identifier mydb \
  --master-user-password new_password

# Google Cloud SQL
gcloud sql users set-password postgres \
  --instance=mydb --password=new_password

# Azure Database for PostgreSQL
az postgres flexible-server update \
  --resource-group mygroup --name mydb --admin-password new_password
```

For IAM authentication on RDS, make sure `rds.force_ssl` is enabled and the IAM role has the `rds-db:connect` permission.

### Special characters in connection string

Characters like `@`, `#`, `%` in passwords must be URL-encoded in connection strings:

```
postgresql://app_user:p%40ssw0rd@localhost:5432/mydb
```

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `#` | `%23` |
| `%` | `%25` |
| `/` | `%2F` |

If you're using a key-value connection string instead of a URI, special characters don't need encoding:

```
host=localhost port=5432 dbname=mydb user=app_user password=p@ssw0rd
```

### Still stuck? Check server logs

The PostgreSQL server log often has a `DETAIL` line that explains exactly what went wrong — more than the client error message shows:

```bash
tail -20 /var/log/postgresql/postgresql-16-main.log
```

Also verify you're connecting to the right server:

```sql
SELECT inet_server_addr(), inet_server_port(), current_user, current_database();
```

## Prevention

- Use `.pgpass` or environment variables instead of hardcoding passwords in connection strings
- Rotate passwords through a centralized secret manager, not manual updates
- After PostgreSQL major version upgrades, re-set all user passwords to match the new `password_encryption` default
- In Docker Compose, document that `POSTGRES_PASSWORD` only applies on first init
- Test direct connections before debugging connection pool issues

<HintBlock type="info">

Bytebase provides a [secure credential management workflow](https://www.bytebase.com/docs/security/secret/) that avoids sharing database passwords directly. For more on PostgreSQL access control, see [Database Access Control Best Practices](/blog/database-access-control-best-practices/).

</HintBlock>
