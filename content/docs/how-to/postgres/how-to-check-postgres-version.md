---
title: How to check Postgres version
---

Postgres releases a new major version about once a year. For `psql`, it works best with servers of
the same or an older major version.

There are multiple ways to check the Postgres server version.

## With psql

The most common way is to use `psql`:

```bash
psql -c "SELECT version();"
```

or

```bash
psql -c "SHOW server_version;"
```

To check the `psql` client version:

```bash
psql --version
```

## Without psql

```bash
pg_config --version
```

or

```bash
postgres --version
```

## References

- [Postgres versioning](https://www.postgresql.org/support/versioning)
- [psql compatibility notes](https://www.postgresql.org/docs/current/app-psql.html)
