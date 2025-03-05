---
title: How to check Postgres version
updated_at: 2025/02/27 09:00:00
---

Postgres releases a new major version about once a year. For `psql`, it works best with servers of
the same or an older major version.

There are multiple methods to check your PostgreSQL version, depending on your environment and access level. Here are the most common approaches:

## 1. Using psql Command-Line Interface

```sql
SELECT version();
```

This returns the full version string with build information.

```sql
SHOW server_version;
```

This returns just the version number (e.g., "15.4").

## 2. From the psql Shell Before Connecting

```bash
psql --version
```

or

```bash
psql -V
```

## 3. Through the PostgreSQL Server Binary

```bash
postgres --version
```

or

```bash
postgres -V
```

## 4. Using the pg_config Utility

```bash
pg_config --version
```

## 5. From the System Process

```bash
ps aux | grep postgres
```

The process list often shows the version in the binary path.

## 6. From PG_SETTINGS Table

```sql
SELECT setting FROM pg_settings WHERE name = 'server_version';
```

## 7. Checking Version in Application Code

### Python (using psycopg2)

```python
import psycopg2

conn = psycopg2.connect("dbname=postgres user=postgres")
cur = conn.cursor()
cur.execute("SELECT version();")
version = cur.fetchone()[0]
print(version)
cur.close()
conn.close()
```

### Node.js (using node-postgres)

```javascript
const { Client } = require('pg');
const client = new Client();
await client.connect();
const res = await client.query('SELECT version()');
console.log(res.rows[0].version);
await client.end();
```

### Go (using lib/pq)

```go
package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/lib/pq"
)

func main() {
    connStr := "user=postgres dbname=postgres sslmode=disable"
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    var version string
    err = db.QueryRow("SELECT version()").Scan(&version)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(version)
}
```

### Java (using JDBC)

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class PostgresVersionCheck {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/postgres";
        String user = "postgres";
        String password = "yourpassword";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT version()")) {

            if (rs.next()) {
                System.out.println(rs.getString(1));
            }
        } catch (SQLException e) {
            System.out.println("Error checking PostgreSQL version: " + e.getMessage());
        }
    }
}
```

## 8. From the Data Directory

Look for the PG_VERSION file in your data directory (path may vary depending on installation):

```bash
cat /var/lib/postgresql/data/PG_VERSION
```

## References

- [Postgres versioning](https://www.postgresql.org/support/versioning)
- [Postgres feature matrix](https://www.postgresql.org/about/featurematrix)
- [psql compatibility notes](https://www.postgresql.org/docs/current/app-psql.html)
