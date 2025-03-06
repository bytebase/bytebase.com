---
title: 'Primary Key vs Foreign Key: What are the Differences?'
author: Tianzhou
updated_at: 2025/03/05 12:00
feature_image: /content/blog/primary-key-vs-foreign-key/banner.webp
tags: Explanation
description: 'What are the differences between Primary Key and Foreign Key'
---

## Primary Keys

A primary key is a column or set of columns that serves as the unique identifier for each row in a table. It enforces entity integrity, which is the rule that every row must be uniquely identifiable.

### Core Purposes

1. **Uniqueness**: Ensures each record can be uniquely identified and accessed
2. **Data integrity**: Prevents duplicate records from being created
3. **Relational foundation**: Provides a reliable point of reference for other tables to establish relationships
4. **Indexing**: Automatically creates an index that speeds up data retrieval operations

### Technical Characteristics

- Must contain a unique value for each record
- Cannot contain NULL values
- Should be immutable (rarely changed after creation)
- Is automatically indexed by the database management system
- Can be a single column (simple primary key) or multiple columns (composite primary key)

### Example in an E-commerce Database

Consider a `Customers` table in an e-commerce system:

```sql
CREATE TABLE Customers (
    customer_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    registration_date DATE NOT NULL,
    PRIMARY KEY (customer_id)
);
```

In this example, `customer_id` is the primary key. Each customer will have a unique ID automatically assigned by the database when a new record is created. Even if two customers share the same name, they will always have distinct `customer_id` values.

## Foreign Keys

### Simple Definition

A foreign key is a column or set of columns in one table that establishes a link between the data in two tables. It creates and enforces a referential integrity constraint between the tables.

### Core Purposes

1. **Creating relationships**: Connects data between separate tables
2. **Referential integrity**: Prevents orphaned records (records that reference non-existent data)
3. **Data consistency**: Ensures that references across tables remain valid
4. **Logical structure**: Expresses real-world relationships in database design

### Technical Characteristics

- References a primary key (or unique key) in another table
- Can contain NULL values (unless explicitly constrained otherwise)
- May be part of a compound key that serves as the primary key in its own table
- Can have associated referential actions (CASCADE, SET NULL, etc.)
- Is not automatically indexed (though indexing is recommended)

### Example in an E-commerce Database

Continuing with our e-commerce example, let's create an `Orders` table that references the `Customers` table:

```sql
CREATE TABLE Orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
```

Here, `customer_id` in the `Orders` table is a foreign key that references the primary key `customer_id` in the `Customers` table. This establishes a relationship: each order belongs to one specific customer.

## Primary Keys vs. Foreign Keys

### Syntax

**Primary Keys:**

```sql
-- Method 1: During table creation
CREATE TABLE Products (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (product_id)
);

-- Method 2: Altering an existing table
ALTER TABLE Products
ADD PRIMARY KEY (product_id);
```

**Foreign Keys:**

```sql
-- Method 1: During table creation
CREATE TABLE OrderItems (
    item_id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Method 2: Altering an existing table
ALTER TABLE OrderItems
ADD CONSTRAINT fk_product
FOREIGN KEY (product_id) REFERENCES Products(product_id);
```

The key differences in implementation are:

- Primary keys are simpler to define
- Foreign keys require specifying the reference table and column
- Foreign keys can have additional options (ON DELETE, ON UPDATE)

### Uniqueness and NULL Value Constraints

**Primary Keys:**

- Must contain unique values; no duplicates allowed
- Cannot contain NULL values ([SQLite is an exception](https://sqlite.org/lang_createtable.html))
- Automatically enforces these constraints

**Foreign Keys:**

- Can contain duplicate values (many records can reference the same parent record)
- Can contain NULL values (unless NOT NULL is specified)
- Values must exist in the referenced table's primary key column (or be NULL)

### Cardinality Relationships

**Primary Keys facilitate:**

- One-to-one relationships (when both tables have a primary key that references the other)
- One-to-many relationships (when combined with foreign keys)

**Foreign Keys facilitate:**

- One-to-many relationships (most common use case)
- Many-to-many relationships

**Example of a many-to-many relationship:**

```sql
-- Products can belong to multiple categories, and categories can contain multiple products
CREATE TABLE ProductCategories (
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);
```

### Performance Implications

**Primary Keys:**

- Automatically indexed, improving query performance
- Optimized for uniqueness checks and frequent joins
- Clustered index in some database systems (physically orders data)
- Minimal storage overhead

**Foreign Keys:**

- Not automatically indexed (manual indexing recommended)
- Additional overhead during data modification to check constraints
- Can slow down write operations (inserts, updates, deletes)
- Improves query optimizer plans by providing relationship metadata

### Modification Restrictions

**Primary Keys:**

- Difficult to change once data exists in the table
- Changing requires updating all foreign keys that reference it
- Can't be deleted if referenced by foreign keys

**Foreign Keys:**

- Can be modified if the new value exists in the referenced table
- Can have automatic cascading actions defined:
  - `ON DELETE CASCADE`: Deletes child records when parent is deleted
  - `ON UPDATE CASCADE`: Updates child records when parent key changes
  - `SET NULL`: Sets child keys to NULL when parent is deleted

```sql
CREATE TABLE OrderItems (
    item_id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
```

### Visual Representation

![er](/content/blog/primary-key-vs-foreign-key/er.webp)

The diagram above illustrates the relationships between tables in our e-commerce database example:

1. The `CUSTOMERS` table has a primary key (`customer_id`) that is referenced by the foreign key in the `ORDERS` table, creating a one-to-many relationship (one customer can place many orders).

2. Similarly, the `ORDERS` table's primary key (`order_id`) is referenced by the `ORDER_ITEMS` table, establishing another one-to-many relationship (one order can contain many items).

3. The `PRODUCTS` table's primary key (`product_id`) is referenced by the `ORDER_ITEMS` table, creating a one-to-many relationship (one product can be in many order items).

4. The `PRODUCT_CATEGORIES` table demonstrates a many-to-many relationship between products and categories, implemented with composite primary key that consists of two foreign keys.

## Common Misconceptions and Mistakes

### Primary Key Misconceptions

1. **Using natural data as primary keys**

   - **Misconception**: Using business data like email addresses or phone numbers as primary keys is a good practice.
   - **Reality**: Business data can change. Using surrogate keys (like [UUID or auto-incrementing integers](/blog/choose-primary-key-uuid-or-auto-increment)) provides stability.

2. **Composite primary keys are always problematic**

   - **Misconception**: You should always use single-column primary keys.
   - **Reality**: While simpler, single-column keys aren't always appropriate. Composite keys can better represent certain relationships.

3. **Primary keys must be integers**
   - **Misconception**: Only numeric values can be primary keys.
   - **Reality**: Any data type can be used, though numeric types offer performance advantages.

### Foreign Key Misconceptions

1. **Foreign keys severely hurt performance**

   - **Misconception**: Foreign key constraints significantly slow down databases.
   - **Reality**: While there is overhead, the benefits to data integrity often outweigh the performance impact. Proper indexing minimizes the impact.

2. **Foreign keys must have the same column name as their referenced primary keys**

   - **Misconception**: If a primary key is called `id`, the foreign key must also be called `id`.
   - **Reality**: Foreign keys can have any name; it's the relationship definition that matters.

3. **Foreign keys always protect against orphaned records**
   - **Misconception**: Having foreign keys automatically prevents all orphaned records.
   - **Reality**: Without proper constraints (e.g., `ON DELETE` actions), foreign keys can still lead to referential integrity issues.

## Best Practices for Key Design

### Primary Key Selection

1. **Use surrogate keys for most tables**

   - Prefer system-generated values (`IDENTITY`, `SEQUENCE`, `UUID`) over business data
   - Auto-incrementing integers or GUIDs are typically best choices

2. **Keep primary keys simple and stable**

   - Avoid using columns that might need to change
   - Prefer single-column keys when possible

3. **Consider the future**
   - Choose data types that allow for growth (e.g., `INT` instead of `SMALLINT`)
   - Plan for potential data volume increases

### Foreign Key Design

1. **Always index foreign key columns**

   ```sql
   CREATE INDEX idx_orders_customer_id ON Orders(customer_id);
   ```

2. **Choose appropriate referential actions**

   - CASCADE: Use when child records should follow parent record actions
   - RESTRICT/NO ACTION: Use when preventing orphaned records is critical
   - SET NULL: Use when child records can exist independently

3. **Name constraints meaningfully**

   ```sql
   ALTER TABLE Orders
   ADD CONSTRAINT fk_orders_customer
   FOREIGN KEY (customer_id) REFERENCES Customers(customer_id);
   ```

4. **Consider nullable vs. non-nullable**
   - Make foreign keys NOT NULL when the relationship is mandatory
   - Allow NULL when the relationship is optional

### Scalability Considerations

1. **Primary key data types impact scalability**

   - `INT` (4 bytes): Supports up to ~2.1 billion records
   - `BIGINT` (8 bytes): Supports virtually unlimited records
   - `UUID/GUID`: Supports distributed systems better but has higher storage requirements

2. **Consider sharding implications**

   - Auto-incrementing keys can be problematic in sharded databases
   - Use UUIDs or composite keys for distributed systems

3. **Performance at scale**
   - Join performance depends on key types and indexing
   - Composite keys increase index size and may impact performance
