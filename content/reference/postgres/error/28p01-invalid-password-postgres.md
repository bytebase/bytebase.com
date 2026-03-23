---
title: 'ERROR 28P01: Password Authentication Failed in Postgres'
---

## Error Message

```sql
FATAL: password authentication failed for user "app_user"
SQLSTATE: 28P01
```

You may also see a related log entry on the server:

```
DETAIL: User "app_user" has no password assigned.
```

Or when connecting via `psql` or a driver:

```
psql: error: connection to server at "localhost" (127.0.0.1), port 5432 failed:
FATAL: password authentication failed for user "app_user"
```

## Description

PostgreSQL raises error 28P01 when a client provides a password that does not match the stored credential for the specified user, or when password authentication is required but no valid password is set. The full SQLSTATE code is 28P01 (`invalid_password`). This is the most common connection error for PostgreSQL and is almost always a configuration issue — not a bug in your application.

## Causes

- **Wrong password.** The most obvious cause — the password supplied doesn't match what's stored for that role.
- **Role has no password set.** The role was created with `CREATE ROLE app_user LOGIN` but without a `PASSWORD` clause, so any password attempt fails.
- **Wrong user.** Connecting as `postgres` when the application should connect as `app_user`, or vice versa.
- **pg_hba.conf requires password auth but the role uses a different method.** The `pg_hba.conf` entry says `md5` or `scram-sha-256` but the role's password was set with a different encryption method.
- **Password contains special characters.** Characters like `@`, `#`, `%` in the password may be misinterpreted by connection strings if not properly escaped or quoted.
- **Environment variable or config file has stale credentials.** The password was rotated but `.pgpass`, `PGPASSWORD`, or the application config still has the old one.
- **Connecting to the wrong server.** The credentials are valid on staging but you're connecting to production (or vice versa).
- **SCRAM vs MD5 mismatch.** PostgreSQL 14+ defaults to `scram-sha-256`. If the password was stored as MD5 and `pg_hba.conf` requires SCRAM, authentication fails.

## Solutions

1. **Reset the password:**

   ```sql
   -- Connect as a superuser
   ALTER ROLE app_user WITH PASSWORD 'new_secure_password';
   ```

2. **Verify the role exists and has LOGIN privilege:**

   ```sql
   SELECT rolname, rolcanlogin
   FROM pg_roles
   WHERE rolname = 'app_user';
   ```

   If `rolcanlogin` is `f`, grant login:

   ```sql
   ALTER ROLE app_user WITH LOGIN;
   ```

3. **Check pg_hba.conf authentication method:**

   ```bash
   # Find the active pg_hba.conf
   psql -U postgres -c "SHOW hba_file;"
   ```

   Look for the line matching your connection. Common entries:

   ```
   # TYPE  DATABASE  USER       ADDRESS        METHOD
   host    all       all        127.0.0.1/32   scram-sha-256
   host    all       all        0.0.0.0/0      md5
   ```

   After editing, reload:

   ```sql
   SELECT pg_reload_conf();
   ```

4. **Fix SCRAM vs MD5 mismatch:**

   ```sql
   -- Check current password encryption setting
   SHOW password_encryption;

   -- If it shows 'scram-sha-256' but pg_hba.conf says 'md5', either:
   -- Option A: Change pg_hba.conf to scram-sha-256 (recommended)
   -- Option B: Set encryption to md5 and reset the password
   SET password_encryption = 'md5';
   ALTER ROLE app_user WITH PASSWORD 'the_password';
   ```

5. **Check .pgpass or connection string:**

   ```bash
   # .pgpass format: hostname:port:database:username:password
   cat ~/.pgpass

   # Ensure correct permissions
   chmod 600 ~/.pgpass
   ```

   For connection strings, escape special characters:

   ```
   postgresql://app_user:p%40ssw0rd@localhost:5432/mydb
   ```

   `@` → `%40`, `#` → `%23`, `%` → `%25`

6. **Verify you're connecting to the right server:**

   ```sql
   -- After connecting, check where you are
   SELECT inet_server_addr(), inet_server_port(), current_user, current_database();
   ```

7. **Check server logs for more detail:**

   ```bash
   # The server log often has a DETAIL line explaining what went wrong
   tail -20 /var/log/postgresql/postgresql-16-main.log
   ```

## Common scenarios

**In Docker and containers:** The `POSTGRES_PASSWORD` environment variable only sets the superuser password on first initialization. If you change it in `docker-compose.yml` and restart without deleting the volume, the old password persists. Either drop the volume (`docker volume rm ...`) or connect and run `ALTER ROLE`.

**After PostgreSQL major version upgrade:** PostgreSQL 14 changed the default `password_encryption` from `md5` to `scram-sha-256`. After upgrading, existing MD5 passwords still work if `pg_hba.conf` uses `md5`, but if you change `pg_hba.conf` to `scram-sha-256`, all users must reset their passwords.

**In connection pools (PgBouncer, Pgpool-II):** The pooler authenticates users independently. If the database password is changed but the pooler's `userlist.txt` or auth config isn't updated, connections through the pool fail with 28P01 even though direct connections work.

**With cloud-managed databases (RDS, Cloud SQL, Azure):** Cloud providers manage `pg_hba.conf` internally. If you get 28P01 on RDS, verify the password via the AWS console or `aws rds modify-db-instance`. For Cloud SQL, use `gcloud sql users set-password`.

<HintBlock type="info">

Bytebase provides a [secure credential management workflow](https://www.bytebase.com/docs/security/secret/) that avoids sharing database passwords directly. For more on PostgreSQL access control, see [Database Access Control Best Practices](/blog/database-access-control-best-practices/).

</HintBlock>
