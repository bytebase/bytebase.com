---
title: 'OpenAI vs. DeepSeek: SSN Database Schema Design'
author: Tianzhou
updated_at: 2025/02/12 21:21:21
feature_image: /content/blog/openai-vs-deepseek-ssn-database-schema-design/banner.webp
tags: Industry
featured: true
description: 'How OpenAI and DeepSeek designs SSN database schema.'
---

![debate](/content/blog/openai-vs-deepseek-ssn-database-schema-design/debate.webp)

Elon Musk's comment about SSN database de-duplication has sparked significant debate within the developer community. Many software engineers have dismissed his remark. Let's see how OpenAI and DeepSeek designs this SSN database schema.

## What is SSN?

For those of you not living in the US, SSN is the **Social Security Number**. It is a 9-digit number that
is used to identify an individual in the US, primarily used for:

- **Income Identification**: Employers use SSNs to report employees' wages and salaries to the government, ensuring earnings are properly recorded.

- **Tax Collection**: The IRS requires SSNs for tax filings, including income tax returns, to track individual tax obligations and withholdings.

- **Social Welfare Distribution**: Government agencies use SSNs to determine eligibility and distribute benefits such as Social Security, Medicare, Medicaid, and unemployment assistance.

- **Credit Score**: Lenders, banks, and credit bureaus use SSNs to track an individual's credit history, loan applications, and debt repayment behavior, forming the basis of credit scores.

In US, the SSN is a highly sensitive piece of information. True love isn't defined by wedding vows—it’s when you trust your partner enough to share your SSN.

## First Iteration

Prompt:

```plain
You are a relational database schema designer. You are given the task to design
the schema for the United States' Social Security Number (SSN) database.
The database needs to track basic personal information and payment profile.

Minimal design, no whistles and bells. Generate Postgres SQL dialect.
```

### ChatGPT 4o

```sql
CREATE TABLE person (
     -- SSN is always 9 digits (without dashes)
    ssn CHAR(9) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    -- M: Male, F: Female, O: Other
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')),
    address TEXT NOT NULL
);

CREATE TABLE payment_profile (
    ssn CHAR(9) PRIMARY KEY REFERENCES person(ssn) ON DELETE CASCADE,
     -- Basic validation for routing number
    bank_routing_number CHAR(9) NOT NULL CHECK (bank_routing_number ~ '^[0-9]{9}$'),
    bank_account_number VARCHAR(20) NOT NULL,
    payment_method VARCHAR(10) CHECK (payment_method IN ('ACH', 'Check')) NOT NULL,
    last_payment_date DATE
);

CREATE INDEX idx_person_last_name ON person(last_name);
CREATE INDEX idx_payment_method ON payment_profile(payment_method);
```

ChartGPT also explains the design choices:

- `person.ssn` is the primary key, ensuring uniqueness.
- `person.date_of_birth` ensures valid date entry.
- `person.gender` is a single-character field with constraints (`M, F, O`).
- `payment_profile` references `person.ssn` (`ON DELETE CASCADE` ensures the payment profile is removed when a person is deleted).
- `payment_profile.bank_routing_number` has a regex constraint to ensure it contains exactly 9 digits.
- `payment_profile.payment_method` allows only ACH or Check.
- Indexes on `last_name` and `payment_method` optimize common lookups.

A pleasant surprise is the model designs `gender` column as a non-binary option and use `O` to represent other gender.

### DeepSeek R1

```sql
-- Table to store personal information
CREATE TABLE person (
    ssn CHAR(9) PRIMARY KEY, -- Social Security Number (9 digits, no hyphens)
    first_name VARCHAR(50) NOT NULL, -- First name
    last_name VARCHAR(50) NOT NULL, -- Last name
    date_of_birth DATE NOT NULL, -- Date of birth
    gender CHAR(1) NOT NULL, -- Gender (M/F/O for Male, Female, Other)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
);

-- Table to store payment profiles
CREATE TABLE payment_profile (
    id SERIAL PRIMARY KEY, -- Unique payment profile ID
    ssn CHAR(9) NOT NULL REFERENCES person(ssn) ON DELETE CASCADE, -- Foreign key to person
    total_contributions DECIMAL(12, 2) DEFAULT 0.00, -- Total contributions made
    last_payment_date DATE, -- Date of the last payment
    last_payment_amount DECIMAL(10, 2), -- Amount of the last payment
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
);
```

DeepSeek designs a similar schema as ChatGPT. DeepSeek doesn't explain the design choices and just comment the columns.

One shortcoming is DeepSeek doesn't use column checks to ensure the validity of the data.

## Second Iteration - Account for Name Change

Prompt:

```plain
A person can change the name (e.g. after marriage)
```

### ChatGPT 4o

```sql
CREATE TABLE person (
    ssn CHAR(9) PRIMARY KEY, -- Immutable identifier
    date_of_birth DATE NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')), -- M: Male, F: Female, O: Other
    address TEXT NOT NULL
);

CREATE TABLE person_name (
    id SERIAL PRIMARY KEY,
    ssn CHAR(9) NOT NULL REFERENCES person(ssn) ON DELETE CASCADE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT TRUE, -- Tracks the current name
    changed_at TIMESTAMP DEFAULT NOW() -- Records when the name was changed
);

CREATE TABLE payment_profile (
    ssn CHAR(9) PRIMARY KEY REFERENCES person(ssn) ON DELETE CASCADE,
    bank_routing_number CHAR(9) NOT NULL CHECK (bank_routing_number ~ '^[0-9]{9}$'), -- 9-digit validation
    bank_account_number VARCHAR(20) NOT NULL,
    payment_method VARCHAR(10) CHECK (payment_method IN ('ACH', 'Check')) NOT NULL,
    last_payment_date DATE
);

-- Ensure only one current name per person
CREATE UNIQUE INDEX idx_person_name_unique ON person_name(ssn) WHERE is_current = TRUE;

CREATE INDEX idx_person_name_last_name ON person_name(last_name);
CREATE INDEX idx_payment_method ON payment_profile(payment_method);
```

Changes & justifications:

1. Separated names into person_name:

   - Allows multiple historical names per person.
   - Tracks current vs. past names using `is_current` (enforced with a unique index).
   - Uses `changed_at` to record when a name was changed.

2. Kept SSN immutable:

   - `person` table stores attributes that do not change (SSN, DOB, gender, address).
   - Name history is handled separately.

3. Indexing Enhancements:

   - `idx_person_name_unique` ensures only one `is_current = TRUE` record per SSN.
   - `idx_person_name_last_name` allows searching by last name efficiently.

### DeepSeek R1

```sql
-- Table to store personal information
CREATE TABLE person (
    ssn CHAR(9) PRIMARY KEY, -- Social Security Number (9 digits, no hyphens)
    first_name VARCHAR(50) NOT NULL, -- Current first name
    last_name VARCHAR(50) NOT NULL, -- Current last name
    date_of_birth DATE NOT NULL, -- Date of birth
    gender CHAR(1) NOT NULL, -- Gender (M/F/O for Male, Female, Other)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
);

-- Table to store historical name changes
CREATE TABLE name_history (
    id SERIAL PRIMARY KEY, -- Unique identifier for each name change record
    ssn CHAR(9) NOT NULL REFERENCES person(ssn) ON DELETE CASCADE, -- Foreign key to person
    first_name VARCHAR(50) NOT NULL, -- First name at the time of the change
    last_name VARCHAR(50) NOT NULL, -- Last name at the time of the change
    change_date DATE NOT NULL, -- Date of the name change
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
);

-- Table to store payment profiles
CREATE TABLE payment_profile (
    id SERIAL PRIMARY KEY, -- Unique payment profile ID
    ssn CHAR(9) NOT NULL REFERENCES person(ssn) ON DELETE CASCADE, -- Foreign key to person
    total_contributions DECIMAL(12, 2) DEFAULT 0.00, -- Total contributions made
    last_payment_date DATE, -- Date of the last payment
    last_payment_amount DECIMAL(10, 2), -- Amount of the last payment
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
);
```

This time DeepSeek also explains the design benefits:

- **Current Name**: The `person` table always reflects the most up-to-date name.

- **Historical Tracking**: The `name_history` table tracks all name changes over time.

- **Data Integrity**: Foreign keys and `ON DELETE CASCADE` ensure data consistency.

DeepSeek makes a different design choice here as the `person` table still keeps the `first_name` and `last_name` columns.
They are just repurposed to store the current name.

## Third Iteration - Add Surrogate Key

Prompt:

```plain
Using SSN as the primary key could expose security risk as SSN is sensitive.
```

### ChatGPT 4o

```sql
CREATE TABLE person (
    person_id SERIAL PRIMARY KEY, -- Surrogate key for security
    ssn CHAR(9) UNIQUE NOT NULL CHECK (ssn ~ '^[0-9]{9}$'), -- Enforced uniqueness and validation
    date_of_birth DATE NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')), -- M: Male, F: Female, O: Other
    address TEXT NOT NULL
);

CREATE TABLE person_name (
    id SERIAL PRIMARY KEY,
    person_id INT NOT NULL REFERENCES person(person_id) ON DELETE CASCADE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT TRUE, -- Tracks the current name
    changed_at TIMESTAMP DEFAULT NOW() -- Records when the name was changed
);

CREATE TABLE payment_profile (
    person_id INT PRIMARY KEY REFERENCES person(person_id) ON DELETE CASCADE,
    bank_routing_number CHAR(9) NOT NULL CHECK (bank_routing_number ~ '^[0-9]{9}$'), -- 9-digit validation
    bank_account_number VARCHAR(20) NOT NULL,
    payment_method VARCHAR(10) CHECK (payment_method IN ('ACH', 'Check')) NOT NULL,
    last_payment_date DATE
);

-- Ensure only one current name per person
CREATE UNIQUE INDEX idx_person_name_unique ON person_name(person_id) WHERE is_current = TRUE;

CREATE INDEX idx_person_name_last_name ON person_name(last_name);
CREATE INDEX idx_payment_method ON payment_profile(payment_method);
```

Improvements for Security & Best Practices:

1.  Surrogate Primary Key (person_id):

    - Replaces `ssn` as the primary key, reducing exposure risk.
    - Makes foreign key relationships reference `person_id` instead of `ssn`.

1.  SSN remains unique & validated:

    - `UNIQUE NOT NULL` constraint ensures no duplicates.
    - Regular expression constraint (`CHECK (ssn ~ '^[0-9]{9}$')`) ensures valid format.

1.  Foreign Keys use person_id:

    - `person_name` and `payment_profile` reference `person_id` instead of `ssn`.
    - Avoids exposing SSN in multiple places.

### DeepSeek R1

```sql
-- Table to store personal information
CREATE TABLE person (
    id SERIAL PRIMARY KEY, -- Surrogate key (auto-incrementing integer)
    ssn CHAR(9) NOT NULL UNIQUE, -- Social Security Number (9 digits, no hyphens)
    first_name VARCHAR(50) NOT NULL, -- Current first name
    last_name VARCHAR(50) NOT NULL, -- Current last name
    date_of_birth DATE NOT NULL, -- Date of birth
    gender CHAR(1) NOT NULL, -- Gender (M/F/O for Male, Female, Other)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
);

-- Table to store historical name changes
CREATE TABLE name_history (
    id SERIAL PRIMARY KEY, -- Unique identifier for each name change record
    person_id INT NOT NULL REFERENCES person(id) ON DELETE CASCADE, -- Foreign key to person
    first_name VARCHAR(50) NOT NULL, -- First name at the time of the change
    last_name VARCHAR(50) NOT NULL, -- Last name at the time of the change
    change_date DATE NOT NULL, -- Date of the name change
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
);

-- Table to store payment profiles
CREATE TABLE payment_profile (
    id SERIAL PRIMARY KEY, -- Unique payment profile ID
    person_id INT NOT NULL REFERENCES person(id) ON DELETE CASCADE, -- Foreign key to person
    total_contributions DECIMAL(12, 2) DEFAULT 0.00, -- Total contributions made
    last_payment_date DATE, -- Date of the last payment
    last_payment_amount DECIMAL(10, 2), -- Amount of the last payment
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
);
```

Key Changes for Security:

1. Surrogate Key (`id`) in `person` table:

   - The `person` table now uses an auto-incrementing integer (`id`) as the primary key.
   - The `ssn` column is still stored but is no longer the primary key. It is marked as `UNIQUE` to ensure no two people share the same SSN.

1. Foreign Key References:

   - The `name_history` and `payment_profile` tables now reference the `person` table using the `person_id` (surrogate key) instead of the `ssn`.

1. SSN Storage:

   - The `ssn` column is stored securely in the `person` table. In a real-world application, you should consider encrypting this column or using other security measures (e.g., hashing or tokenization) to protect sensitive data.

## Summary

Both ChatGPT 4o and DeepSeek can perform the SSN schema design task well:

1. They both come up with a sane schema design upfront.
1. They are able to alter the design based on the followup prompts. In the above example, both
   are able to incorporate the name change and introduce surrogate key to address the security concern.

ChatGPT 4o's highlight:

- Design `gender` column as a non-binary option.
- Enforce the data validity using column checks.
- Include indexes on the columns that are frequently queried.
- Explain the design choices and justify the design decisions.

DeepSeek R1's highlight:

- I personally like its refined `person` table design as it can return the current name, which will make the query more convenient.
- The explanation is terse and to the point.

## Final Thoughts

As shown above, schema design involves various trade-offs. Determining whether a unique SSN is a good design choice requires considering the surrounding context. Even state-of-the-art models still require human guidance to generate high-quality schema designs that accommodate real-world use cases (e.g., name changes) and address security concerns (e.g., SSN exposure).
