---
title: How to Choose Database UUID?
author: Tianzhou
updated_at: 2025/03/06 08:00:00
feature_image: /content/blog/how-to-choose-database-uuid/banner.webp
tags: How-To
featured: true
description: Pros and Cons between choosing uuidv1, uuidv4, uuidv7
---

This is a series of articles about database keys:

1. How to Choose Database UUID? (this one)
1. [How to Choose between UUID and Auto Increment Integer / Serial as the Primary Key?](/blog/choose-primary-key-uuid-or-auto-increment)

## What Are UUIDs and Why Use Them in Database?

A UUID (Universally Unique Identifier) is a 128-bit value designed to uniquely identify information in distributed systems without requiring a central coordination mechanism. UUIDs are typically represented as 32 hexadecimal digits displayed in five groups separated by hyphens: `123e4567-e89b-12d3-a456-426614174000`.

**Why use UUIDs in databases?**

- **Distributed systems**: Generate IDs without coordination between nodes
- **No sequential leaks**: Unlike auto-incrementing IDs, UUIDs don't reveal information about record counts
- **Merge-friendly**: Helpful when merging data from different database instances
- **Pregeneration**: IDs can be created before database insertion
- **Consistent API design**: Same ID format across different resources

However, UUIDs come with tradeoffs. They consume more storage (16 bytes vs 4-8 bytes for integers) and can impact indexing performance.

Let's explore three popular UUID versions,`UUIDv1`, `UUIDv4`, and `UUIDv7` and their implications for database usage.

## UUIDv1: The Time-Based Pioneer

### How UUIDv1 Works

UUIDv1 is generated using the current timestamp combined with the MAC address of the computer's network interface. Its structure includes:

- A 60-bit timestamp (measured in 100-nanosecond intervals since October 15, 1582)
- A 16-bit clock sequence (to avoid duplicates when the clock is set backward)
- A 48-bit node identifier (typically the MAC address)

### Pros of UUIDv1

1. **Chronologically sortable**: UUIDv1s can be sorted by creation time, making range queries potentially more efficient
2. **Guaranteed uniqueness**: The combination of timestamp, clock sequence, and node ID ensures practical uniqueness
3. **Deterministic**: Given the same inputs, UUIDv1 generation is reproducible
4. **Performance**: Generation is computationally inexpensive (no need for cryptographically secure random numbers)

### Cons of UUIDv1

1. **Privacy concerns❗️**: Embeds the MAC address, potentially exposing network information
2. **Poor index performance**: Despite being time-sortable, the most significant bits change rapidly, causing index fragmentation
3. **Non-sequential writes**: The timestamp bits are not stored in a database-friendly order
4. **Security implications**: Predictability can be a security risk in some contexts
5. **Requires system clock**: Vulnerable to clock skew in distributed systems

### Real-World Use Cases for UUIDv1

- Legacy systems that require backward compatibility
- Applications where chronological sorting is required but security concerns are minimal
- Systems where efficiency of ID generation is prioritized over other concerns

## UUIDv4: The Random Approach

### How UUIDv4 Works

UUIDv4 is generated using random or pseudo-random numbers. It's essentially a 128-bit random number with a few specific bits set to indicate the version and variant:

- Bit 6 of byte 8 is set to 0b100 (the UUID version, 4)
- Bit 6 of byte 9 is set to 0b10 (the UUID variant)

### Pros of UUIDv4

1. **Maximum unpredictability**: Provides strong protection against ID guessing attacks
2. **No privacy leakage**: Contains no information about the generating system
3. **No system clock dependency**: Generation doesn't rely on the system clock
4. **Truly distributed**: Can be generated anywhere without coordination
5. **Widely supported**: Available in most programming languages and databases

### Cons of UUIDv4

1. **Not sortable**: Random nature means they don't preserve insertion order
2. **Poor database performance**: Random distribution causes index fragmentation and poor cache locality
3. **Higher collision possibility**: Though extremely unlikely, has higher theoretical collision risk than time-based UUIDs in high-volume systems
4. **More intensive generation**: Requires cryptographically secure random number generation

### Real-World Use Cases for UUIDv4

- Public-facing IDs where security and unpredictability are priorities
- Microservice architectures where ID generation needs to be fully distributed
- Multi-master database setups that require conflict-free ID generation
- Applications where privacy concerns outweigh performance considerations

## UUIDv7: The Modern Solution

### How UUIDv7 Works

UUIDv7 is one of the newer UUID versions, designed to address the limitations of earlier versions. It combines the sortability of time-based UUIDs with the unpredictability of random UUIDs. The structure includes:

- A 48-bit Unix timestamp (milliseconds since January 1, 1970)
- A 74-bit random number
- Version and variant bits

```bash
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           unix_ts_ms                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          unix_ts_ms           |  ver  |       rand_a          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|var|                        rand_b                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                            rand_b                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### Pros of UUIDv7

1. **Time-sortable**: The most significant bits are a Unix timestamp, making them chronologically sortable
2. **Database-friendly**: Sequential generation leads to better index performance
3. **No privacy leakage**: Unlike UUIDv1, doesn't include MAC address
4. **Reduced collision risk**: Combines timestamp with random data
5. **Modern design**: Addresses known issues with earlier UUID versions
6. **Smaller timestamp**: More efficient than UUIDv1's 60-bit timestamp

### Cons of UUIDv7

1. **Newer standard**: Less widely supported in languages and frameworks
2. **Relies on system clock**: Though less problematic than UUIDv1, still depends on correct system time
3. **Less random than UUIDv4**: The timestamp portion is predictable
4. **Millisecond precision**: Only millisecond precision (vs. 100-nanosecond in UUIDv1)

### Real-World Use Cases for UUIDv7

- Modern database applications where both performance and security matter
- Systems requiring time-ordered UUIDs without the privacy concerns of UUIDv1
- High-throughput applications that need efficient indexing
- New projects without legacy compatibility requirements

## Comparison Table: UUIDv1 vs UUIDv4 vs UUIDv7

| Feature                         | UUIDv1                         | UUIDv4                                   | UUIDv7                       |
| ------------------------------- | ------------------------------ | ---------------------------------------- | ---------------------------- |
| **Storage size**                | 16 bytes                       | 16 bytes                                 | 16 bytes                     |
| **Generation based on**         | Time + MAC address             | Random                                   | Time + Random                |
| **Time-sortable**               | ✅ (but in non-ideal order)    | ❌                                       | ✅ (optimized for databases) |
| **Privacy**                     | ❌ (exposes MAC)               | ✅ (fully private)                       | ✅ (fully private)           |
| **Index performance**           | ⚠️ (poor, despite sortability) | ❌ (worst)                               | ✅ (best)                    |
| **Generation speed**            | ✅ (fastest)                   | ⚠️ (slowest)                             | ⚠️ (moderate)                |
| **Security (unpredictability)** | ❌ (most predictable)          | ✅ (most unpredictable)                  | ⚠️ (partially predictable)   |
| **Collision resistance**        | ✅ (in practice)               | ✅ (theoretical risk in extreme volumes) | ✅ (in practice)             |
| **Distributed generation**      | ✅                             | ✅                                       | ✅                           |
| **Clock dependency**            | ✅ (high)                      | ❌ (none)                                | ✅ (moderate)                |
| **Wide adoption**               | ✅                             | ✅                                       | ⚠️ (growing)                 |

## Conclusion

- **UUIDv1** is a legacy choice that offers time-sortability but comes with privacy concerns.
- **UUIDv4** provides maximum unpredictability but at the cost of database performance
- **UUIDv7** offers the best of both worlds with time-sortability and privacy, making it the recommended choice for most new applications

For most modern applications, UUIDv7 provides the best balance of features, addressing the weaknesses of both UUIDv1 and UUIDv4.

## Further Reading

- [RFC 4122 (original UUID RFC): A Universally Unique IDentifier (UUID) URN Namespace](https://datatracker.ietf.org/doc/html/rfc4122)
- [RFC 9562 (new UUID RFC)](https://datatracker.ietf.org/doc/html/rfc9562)
- [PostgreSQL UUID Documentation](https://www.postgresql.org/docs/current/datatype-uuid.html)
- [MySQL UUID Functions](https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html#function_uuid)
