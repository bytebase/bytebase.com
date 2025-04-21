---
title: Top 10 Database Schema Design Best Practices
author: Tianzhou
updated_at: 2025/4/11 18:00:00
feature_image: /content/blog/top-database-schema-design-best-practices/banner.webp
tags: Explanation
featured: true
description: The top 10 database schema design best practices with code snippets
---

A well-designed database schema is the foundation of any robust application. Following below best practices will help you create maintainable, efficient, and reliable database structure.

<HintBlock type="info">

The snippet uses PostgreSQL, while it's also applicable to other databases.

</HintBlock>

## 1. Use Appropriate Primary Keys

Every table should have a primary key that uniquely identifies each row. While natural keys (using existing business data) can work in some cases, surrogate keys (artificial identifiers) often provide more flexibility.

```sql
-- Using a serial or identity column (PostgreSQL 10+)
CREATE TABLE customers (
    customer_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);

-- Using UUID (often better for distributed systems)
CREATE TABLE products (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
```

<HintBlock type="info">

To learn more, check out [How to Choose between UUID and Auto Increment Integer](/blog/choose-primary-key-uuid-or-auto-increment).

</HintBlock>

## 2. Implement Proper Normalization

Normalization reduces data redundancy and improves data integrity. Aim for [Third Normal Form (3NF)](https://en.wikipedia.org/wiki/Third_normal_form) in most cases, but consider the tradeoffs carefully.

### Normalization Tradeoffs

| Advantages of 3NF                                  | Disadvantages of 3NF                                        |
| -------------------------------------------------- | ----------------------------------------------------------- |
| Minimizes data redundancy and storage requirements | Can lead to complex joins across multiple tables            |
| Reduces update anomalies and inconsistencies       | May reduce query performance for read-heavy applications    |
| Simplifies data management and integrity           | Increases the complexity of SQL for reporting and analytics |
| Better accommodates future data changes            | Can add development overhead for simple applications        |
| Improves data quality and consistency              | May require more complex indexing strategies                |

```sql
-- Instead of this (violates normalization)
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

-- Use this normalized approach
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(order_id),
    product_id INT NOT NULL REFERENCES products(product_id),
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_time_of_order DECIMAL(10, 2) NOT NULL,
    UNIQUE(order_id, product_id)
);
```

## 3. Define Foreign Key Relationships

Foreign keys enforce referential integrity and make relationships between tables explicit, preventing orphaned records. However, there are important tradeoffs to consider when deciding whether to implement them.

| Advantages of Foreign Keys                     | Disadvantages of Foreign Keys                                         |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| Enforces data integrity at the database level  | Adds overhead to write operations (inserts/updates/deletes)           |
| Makes relationships explicit in the schema     | Can complicate bulk data loading processes                            |
| Prevents orphaned records automatically        | May create performance bottlenecks in high-write scenarios            |
| Self-documents schema relationships            | Reduces flexibility in distributed database environments              |
| Enables cascade operations for updates/deletes | Can complicate application development in microservices architectures |
| Provides guaranteed consistency                | May require additional index maintenance                              |

```sql
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE RESTRICT -- Prevent deletion of departments with employees
        ON UPDATE CASCADE  -- If department_id changes, update it for all employees
);
```

## 4. Create Indexes

Indexes dramatically improve query performance but come with storage and write overhead. Create indexes for columns frequently used in WHERE clauses, JOIN conditions, and ORDER BY clauses.

```sql
-- Index for frequently filtered columns
CREATE INDEX idx_employees_department ON employees(department_id);

-- Composite index for columns often queried together
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

-- Index for LIKE queries (only works for patterns starting with a constant)
CREATE INDEX idx_products_name ON products(name varchar_pattern_ops);

-- Partial index for specific query conditions
CREATE INDEX idx_orders_recent ON orders(order_date)
WHERE order_date > CURRENT_DATE - INTERVAL '3 months';
```

## 5. Use Consistent Naming Conventions

Adopt a consistent naming convention for all database objects. This makes your schema more intuitive and maintainable.

```sql
-- Table names: plural nouns
-- Column names: singular nouns, prefixed with table name for keys
-- Constraints: descriptive of their purpose
-- Indexes: prefix with idx_ followed by table and columns

CREATE TABLE payment_methods (
    payment_method_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_payment_methods_name UNIQUE (name)
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payments_orders FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_payments_payment_methods FOREIGN KEY (payment_method_id) REFERENCES payment_methods(payment_method_id),
    CONSTRAINT ck_payments_positive_amount CHECK (amount > 0)
);

CREATE INDEX idx_payments_order_id ON payments(order_id);
```

## 6. Choose Appropriate Data Types

Selecting the right data type improves storage efficiency, performance, and data integrity.

```sql
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,            -- Variable length, limited size
    description TEXT,                      -- Unlimited length text
    price DECIMAL(10, 2) NOT NULL,         -- Exact decimal values (for money)
    weight REAL,                           -- Floating point for measurements
    is_available BOOLEAN DEFAULT TRUE,     -- Boolean flag
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Time with timezone
    tags VARCHAR(50)[] DEFAULT '{}',       -- Array type
    metadata JSONB                         -- JSON data with binary storage
);
```

## 7. Implement Constraints and Validation Rules

Use constraints to enforce data integrity at the database level.

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    status VARCHAR(20) NOT NULL,

    -- Constraints
    CONSTRAINT uq_users_username UNIQUE (username),
    CONSTRAINT uq_users_email UNIQUE (email),
    CONSTRAINT ck_users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT ck_users_minimum_age CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '13 years'),
    CONSTRAINT ck_users_status CHECK (status IN ('active', 'inactive', 'suspended', 'pending'))
);
```

## 8. Plan for Schema Evolution and Versioning

Design your schema with future changes in mind. Use techniques that allow for seamless evolution.

```sql
-- For additive changes (easier to deploy)
ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);

-- To make a column nullable first (when removing NOT NULL)
ALTER TABLE users ALTER COLUMN phone_number DROP NOT NULL;

-- Using a schema version table to track changes
CREATE TABLE schema_versions (
    version_id SERIAL PRIMARY KEY,
    version VARCHAR(50) NOT NULL,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    script_name VARCHAR(255)
);
```

## 9. Document Your Schema

Good documentation makes your database easier to understand and maintain. Use comments in your DDL scripts and maintain separate documentation.

```sql
-- Table comments
COMMENT ON TABLE customers IS 'Stores customer information for all registered users';
COMMENT ON COLUMN customers.email IS 'Primary contact email - must be unique';
```

## 10. Implement Audit Trails

Track changes to important data using audit tables.

```sql
-- Basic audit table approach
CREATE TABLE customer_audit (
    audit_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    action VARCHAR(10) NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(50) NOT NULL,
    old_data JSONB,
    new_data JSONB
);

-- Create a trigger function for auditing
CREATE OR REPLACE FUNCTION fn_audit_customer()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO customer_audit(customer_id, action, changed_by, new_data)
        VALUES (NEW.customer_id, TG_OP, current_user, to_jsonb(NEW));
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO customer_audit(customer_id, action, changed_by, old_data, new_data)
        VALUES (NEW.customer_id, TG_OP, current_user, to_jsonb(OLD), to_jsonb(NEW));
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO customer_audit(customer_id, action, changed_by, old_data)
        VALUES (OLD.customer_id, TG_OP, current_user, to_jsonb(OLD));
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the customers table
CREATE TRIGGER trg_customer_audit
AFTER INSERT OR UPDATE OR DELETE ON customers
FOR EACH ROW EXECUTE FUNCTION fn_audit_customer();
```

---

[Bytebase](/) is a database schema change and version control tool that can enhance your ability to implement the best practices outlined above:

1. **Collaborative Review Process**: Implements GitLab/GitHub-like review workflows for database changes
1. **Multi-Environment Synchronization**: Ensures consistent schema across development, testing, and production
1. **SQL Lint**: Catches potential issues in your schema design before they get deployed
1. **Change History**: Maintains a comprehensive history of all schema changes
