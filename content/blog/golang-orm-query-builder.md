---
title: 'Choose the Right Golang ORM or Query Builder in 2025'
author: Tianzhou
updated_at: 2025/04/27 12:00
feature_image: /content/blog/golang-orm-query-builder/cover.webp
tags: Industry
description: 'Review the state of the Golang ORM and query builder'
---

![reddit](/content/blog/golang-orm-query-builder/reddit.webp)

Selecting the appropriate ORM—or opting to avoid one entirely—remains a contentious topic. In Go, the discussion is particularly intense given the existence of a robust `database/sql` standard library and multiple competitive alternatives. Let's examine the available options:

- **[GORM](https://github.com/go-gorm/gorm)** is a full-featured ORM (Object-Relational Mapper) that provides high-level abstractions over database operations.

- **[Squirrel](https://github.com/Masterminds/squirrel)** is a SQL query builder that helps construct SQL queries programmatically without being a full ORM.

- **[sqlc](https://github.com/sqlc-dev/sqlc)** takes a unique approach by generating type-safe Go code from SQL queries you write.

## Ease of Use

### GORM

GORM excels at simplifying database interactions through its intuitive API:

```go
// Define a model
type Product struct {
  gorm.Model
  Name          string
  Price         float64
  StockQuantity int
}

// Create a product
db.Create(&Product{Name: "Smartphone", Price: 799.99, StockQuantity: 100})

// Read a product
var product Product
db.First(&product, "name = ?", "Smartphone")

// Update a product
db.Model(&product).Updates(Product{Price: 749.99, StockQuantity: 95})

// Delete a product
db.Delete(&product)
```

**Limitations:**

- Magic happens behind the scenes, making it harder to debug complex issues
- Performance overhead due to reflection and metadata processing
- Limited control over generated SQL, which can lead to inefficient queries

```go
// Example of a potentially inefficient query in GORM
// This loads all products into memory before filtering
var expensiveProducts []Product
db.Find(&expensiveProducts).Where("price > ?", 1000)

// Correct approach
db.Where("price > ?", 1000).Find(&expensiveProducts)
```

### Squirrel

Squirrel provides a [fluent-style](https://en.wikipedia.org/wiki/Fluent_interface) API for building SQL queries:

```go
// Create a SQL builder for PostgreSQL
psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)

// Build and execute a query
query := psql.
    Select("id", "name", "price").
    From("products").
    Where(sq.Lt{"stock_quantity": 10})

rows, err := query.RunWith(db).Query()
```

**Limitations:**

- No object mapping capabilities, requiring manual scanning of results
- No schema management or validation
- Verbose for complex queries compared to writing raw SQL
- Immutable design can lead to excessive object creation

```go
// Example of verbose code required for scanning results
rows, err := query.RunWith(db).Query()
if err != nil {
    return err
}
defer rows.Close()

var products []Product
for rows.Next() {
    var p Product
    if err := rows.Scan(&p.ID, &p.Name, &p.Price); err != nil {
        return err
    }
    products = append(products, p)
}
```

### sqlc

sqlc takes a SQL-first approach:

```sql
-- name: GetProduct :one
SELECT * FROM products
WHERE id = $1 LIMIT 1;

-- name: CreateProduct :one
INSERT INTO products (name, price, stock_quantity)
VALUES ($1, $2, $3)
RETURNING *;
```

After defining queries, sqlc generates type-safe Go code:

```go
// Using generated code
product, err := queries.CreateProduct(ctx, db.CreateProductParams{
    Name:          "Smartphone",
    Price:         799.99,
    StockQuantity: 100,
})
```

**Limitations:**

- Requires writing raw SQL, which may be challenging for developers unfamiliar with SQL
- Limited dynamic query capabilities; difficult to build truly dynamic queries
- Initial setup more complex than other options

```go
// Example of limitation with dynamic queries
// This is not directly supported in sqlc - you'd need multiple query definitions
// or fall back to raw SQL for truly dynamic conditions

// For dynamic WHERE clauses, you might need multiple query definitions:
// -- name: GetProductsByPriceRange :many
// SELECT * FROM products WHERE price >= $1 AND price <= $2;
//
// -- name: GetProductsByStock :many
// SELECT * FROM products WHERE stock_quantity <= $1;
//
// -- name: GetProductsByCategory :many
// SELECT * FROM products WHERE category = $1;
```

## Schema Migration

For schema migration, all three tools have different approaches and limitations. Many teams pair these tools with a dedicated migration tool like [Goose](https://github.com/pressly/goose):

```sql
-- Goose migration example
-- +goose Up
ALTER TABLE products ADD COLUMN description TEXT;

-- +goose Down
ALTER TABLE products DROP COLUMN description;
```

### GORM

GORM follows a code-first approach where you define models in Go and let GORM handle the database schema:

```go
// Define models
type Product struct {
    gorm.Model
    Name          string
    Price         float64
    StockQuantity int
}

// Auto migrate the schema
db.AutoMigrate(&Product{})
```

**Limitations:**

- AutoMigrate is not suitable for production environments
- Schema changes can be unpredictable and potentially destructive
- Limited control over index creation and constraint definition
- Poor handling of complex migrations (e.g., data transformations)
- No versioning or rollback capabilities

```go
// Example of a limitation: AutoMigrate won't rename columns or handle complex changes
// If you rename a field in your struct:
type Product struct {
    gorm.Model
    Title string // Was previously "Name"
    Price float64
    StockQuantity int
}

// AutoMigrate will add a new column rather than renaming the existing one
db.AutoMigrate(&Product{}) // Creates a new "title" column, "name" remains

// Example of a dangerous limitation: dropping columns
// If you remove a field from your struct:
type Product struct {
    gorm.Model
    // Name field removed
    Price         float64
    StockQuantity int
}

// With DropColumn option, this will drop the column without warning
db.AutoMigrate(&Product{}).DropColumn // Dangerous in production
```

**Development Workflow with GORM:**

1. Define or update Go struct models
2. Run AutoMigrate during development
3. For production, create manual migrations or use a dedicated migration tool
4. Update application code to work with the new schema

### Squirrel

Squirrel has no schema management capabilities and must be paired with a migration tool.

### sqlc

sqlc verifies queries against schema changes but doesn't handle migrations itself:

```bash
# Verify queries against schema changes
sqlc verify
```

**Limitations:**

- No built-in migration capabilities
- Verification requires schema definition files
- Limited to checking SQL validity, not data integrity
- Requires external tools for schema evolution

**Development Workflow with sqlc:**

1. Create schema migrations using a dedicated tool like Goose
2. Run migrations to update the database schema
3. Update SQL queries in .sql files
4. Regenerate Go code with sqlc
5. Fix any compilation errors due to schema changes

```go
// Example of limitation: Need to regenerate code after query changes
// If you modify a query in your .sql file:
// -- name: GetProduct :one
// SELECT id, name, price, stock_quantity, created_at FROM products
// WHERE id = $1 LIMIT 1;

// And then add a new field to your database:
// ALTER TABLE products ADD COLUMN description TEXT;

// You must regenerate the code with sqlc generate
// Until then, the generated code won't include the new field
```

## Complex Query Generation

### GORM

GORM supports complex queries through its API:

```go
// Find products with joins and conditions
var results []Product
db.Joins("JOIN order_items ON order_items.product_id = products.id").
   Where("order_items.order_id = ?", orderId).
   Group("products.id").
   Having("COUNT(order_items.id) > ?", 1).
   Find(&results)
```

**Limitations:**

- Complex queries become unwieldy and hard to read
- Limited control over query optimization
- Performance overhead for complex operations
- Often requires falling back to raw SQL for advanced queries

```go
// Example of GORM limitations with complex queries
// This becomes hard to read and maintain
var results []struct {
    ProductID   uint
    ProductName string
    OrderCount  int
    TotalValue  float64
}

db.Table("products").
   Select("products.id as product_id, products.name as product_name, COUNT(orders.id) as order_count, SUM(order_items.quantity * order_items.unit_price) as total_value").
   Joins("LEFT JOIN order_items ON products.id = order_items.product_id").
   Joins("LEFT JOIN orders ON order_items.order_id = orders.id").
   Where("orders.created_at BETWEEN ? AND ?", startDate, endDate).
   Group("products.id, products.name").
   Having("COUNT(orders.id) > ?", 5).
   Order("total_value DESC").
   Limit(10).
   Find(&results)

// Often clearer to use raw SQL for complex queries
db.Raw(`
    SELECT
        p.id as product_id,
        p.name as product_name,
        COUNT(o.id) as order_count,
        SUM(oi.quantity * oi.unit_price) as total_value
    FROM products p
    LEFT JOIN order_items oi ON p.id = oi.product_id
    LEFT JOIN orders o ON oi.order_id = o.id
    WHERE o.created_at BETWEEN ? AND ?
    GROUP BY p.id, p.name
    HAVING COUNT(o.id) > ?
    ORDER BY total_value DESC
    LIMIT 10
`, startDate, endDate, 5).Find(&results)
```

### Squirrel

Squirrel excels at building complex queries programmatically:

```go
query := psql.
    Select("p.id", "p.name", "COUNT(oi.id) as order_count").
    From("products p").
    Join("order_items oi ON p.id = oi.product_id").
    Where(sq.Eq{"oi.order_id": orderId}).
    GroupBy("p.id", "p.name").
    Having(sq.Gt{"COUNT(oi.id)": 1})
```

**Limitations:**

- Can become verbose for very complex queries
- No compile-time SQL validation
- Limited database-specific optimizations
- Manual result scanning required

```go
// Example of verbosity with complex queries
query := psql.
    Select(
        "p.id AS product_id",
        "p.name AS product_name",
        "COUNT(DISTINCT o.id) AS order_count",
        "SUM(oi.quantity * oi.unit_price) AS total_value",
        "AVG(oi.unit_price) AS avg_price",
    ).
    From("products p").
    LeftJoin("order_items oi ON p.id = oi.product_id").
    LeftJoin("orders o ON oi.order_id = o.id").
    Where(sq.And{
        sq.GtOrEq{"o.created_at": startDate},
        sq.LtOrEq{"o.created_at": endDate},
        sq.Eq{"o.status": "completed"},
    }).
    GroupBy("p.id", "p.name").
    Having(sq.Gt{"COUNT(DISTINCT o.id)": 5}).
    OrderBy("total_value DESC").
    Limit(10)

// Scanning results requires manual mapping
rows, err := query.RunWith(db).Query()
if err != nil {
    return nil, err
}
defer rows.Close()

var results []ProductSalesReport
for rows.Next() {
    var r ProductSalesReport
    if err := rows.Scan(&r.ProductID, &r.ProductName, &r.OrderCount, &r.TotalValue, &r.AvgPrice); err != nil {
        return nil, err
    }
    results = append(results, r)
}
```

### sqlc

sqlc handles complex queries naturally since you write the SQL directly:

```sql
-- name: GetProductsInOrder :many
SELECT p.id, p.name, p.price, COUNT(oi.id) as order_count
FROM products p
JOIN order_items oi ON p.id = oi.product_id
WHERE oi.order_id = $1
GROUP BY p.id, p.name, p.price
HAVING COUNT(oi.id) > 1;
```

**Limitations:**

- Limited support for dynamic queries
- Need to define multiple similar queries for different conditions
- Generated code can become large with many query variations

```sql
// Example of limitation with dynamic queries
// For a report with optional filters, you might need multiple query definitions:

// -- name: GetProductSalesReport :many
// SELECT
//     p.id AS product_id,
//     p.name AS product_name,
//     COUNT(DISTINCT o.id) AS order_count,
//     SUM(oi.quantity * oi.unit_price) AS total_value
// FROM products p
// LEFT JOIN order_items oi ON p.id = oi.product_id
// LEFT JOIN orders o ON oi.order_id = o.id
// WHERE o.created_at BETWEEN $1 AND $2
// GROUP BY p.id, p.name
// HAVING COUNT(DISTINCT o.id) > $3
// ORDER BY total_value DESC
// LIMIT $4;

// For dynamic filtering, you'd need separate queries or fall back to raw SQL:
// -- name: GetProductSalesReportByCategory :many
// SELECT ... WHERE p.category = $1 AND o.created_at BETWEEN $2 AND $3 ...

// -- name: GetProductSalesReportByStatus :many
// SELECT ... WHERE o.status = $1 AND o.created_at BETWEEN $2 AND $3 ...
```

## Making Your Choice

| Tool         | Ease of Use | Schema Migration | Complex Query Generation | Performance | Overall                                    |
| ------------ | ----------- | ---------------- | ------------------------ | ----------- | ------------------------------------------ |
| **GORM**     | ★★★☆☆       | ★★★☆☆            | ★★★☆☆                    | ★★★☆☆       | Good for rapid development and simple CRUD |
| **Squirrel** | ★★★☆☆       | ★☆☆☆☆            | ★★★★☆                    | ★★★★☆       | Excellent for dynamic queries              |
| **sqlc**     | ★★★★☆       | ★★☆☆☆            | ★★★☆☆                    | ★★★★★       | Best for performance and type safety       |

**GORM** excels at ease of use but has limitations with schema migration and complex queries. It's ideal for rapid development and simple CRUD operations.

**Squirrel** offers a good balance of flexibility and control for query building but requires more code and has no schema management capabilities.

**sqlc** provides the best performance and type safety for complex queries but requires SQL knowledge and has limited support for dynamic queries.

## Practical Recommendation

For production applications in 2025, consider these combinations:

### 1. GORM + Goose

Use GORM for its developer-friendly API and Goose for robust migrations.

```go
// Application code uses GORM
db.First(&product, "id = ?", productID)

// Schema changes use Goose migrations
// migrations/20250427_add_description.sql
// -- +goose Up
// ALTER TABLE products ADD COLUMN description TEXT;
// -- +goose Down
// ALTER TABLE products DROP COLUMN description;
```

**When this combination works well:**

- Team is more comfortable with ORM concepts
- Application has mostly simple CRUD operations

### 2. sqlc + Squirrel + Goose

Use sqlc for type-safe static queries, Goose for migrations, and Squirrel for dynamic queries.

```go
// Use sqlc for predefined queries
product, err := queries.GetProduct(ctx, productID)

// Use Squirrel for dynamic queries
query := psql.
    Select("*").
    From("products").
    Where(sq.Eq{"category": category})

if minPrice > 0 {
    query = query.Where(sq.GtOrEq{"price": minPrice})
}

if maxPrice > 0 {
    query = query.Where(sq.LtOrEq{"price": maxPrice})
}

// Use Goose for migrations
// migrations/20250427_add_indexes.sql
```

**When this combination works well:**

- Application has both static and dynamic queries
- Team has SQL expertise
- Type safety is important

### 3. Raw SQL + sqlc + Goose

Use raw SQL for one-off operations, sqlc for frequently used queries, and Goose for migrations.

```go
// Use raw SQL for administrative or infrequent operations
_, err := db.Exec(`
    UPDATE products
    SET featured = true
    WHERE category = $1 AND price > $2
`, category, minPrice)

// Use sqlc for frequent operations
products, err := queries.ListProductsByCategory(ctx, category)

// Use Goose for schema migrations
// migrations/20250427_add_featured_column.sql
// -- +goose Up
// ALTER TABLE products ADD COLUMN featured BOOLEAN NOT NULL DEFAULT false;
// -- +goose Down
// ALTER TABLE products DROP COLUMN featured;
```

**When this combination works well:**

- Team has strong SQL expertise
- Application has many one-off operations
- Type safety is still desired for core functionality
