import { GlossaryLetterSet } from '@/types/glossary';

export const GLOSSARY_LIST: GlossaryLetterSet[] = [
  {
    letter: 'A',
    list: [
      {
        name: 'ACID',
        description:
          'ACID stands for Atomicity, Consistency, Isolation, Durability. These are the key properties of a database transaction to guarantee correctness even (unexpected) failure occurs.',
        reference: 'https://en.wikipedia.org/wiki/ACID',
        tagList: ['General'],
      },
      {
        name: 'Atomicity',
        description:
          'A in ACID, the property to guarantee all state mutation in a transaction either all happen or none happen (all or nothing).',
        reference: 'https://en.wikipedia.org/wiki/Atomicity_(database_systems)',
        tagList: ['General'],
      },
      {
        name: 'Audit log / Audit trail',
        description: `A set of chronological records providing documentary evidence of a series of database activities.
          User activities such as login attempt, DDL operations are often captured. For DML operations, due to its large volume and
          impact on performance, is normally sampled or not captured at all.`,
        reference: 'https://en.wikipedia.org/wiki/Atomicity_(database_systems)',
        tagList: ['General'],
      },
      {
        name: 'Autonomous database',
        description:
          'A shinny concept declaring the database can operate without DBA involvement, which sounds a bit optimistic like the self-driving technology in auto industry.',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'B',
    list: [
      {
        name: 'B+ tree',
        description: `The fundamental data structure used in all major database systems storing the data.
        B+ tree is a variation of B tree, both have a very large fanout to store indexes to the data page, which
        greatly reduces the number of I/O operations to find the desired data. Unlike B tree which stores data
        on both leaf and non-leaf node. B+ tree only stores data on the leaf node and index data on the non-leaf node, 
        which gives B+ tree a even large fanout on the intermediate non-leaf index node.`,
        reference: 'https://en.wikipedia.org/wiki/B%2B_tree',
        tagList: ['General'],
      },
      {
        name: 'Backup',
        description: `A copy of data taken and may be used to restore after a data loss event.`,
        tagList: ['General', 'Bytebase'],
      },
      {
        name: 'Bloom filter',
        description: `A space-efficient probabilistic data structure commonly used by the query engine to greatly reduce
        I/O operations or remote data fetch involving distributed query.`,
        reference: 'https://en.wikipedia.org/wiki/Bloom_filter',
        tagList: ['General'],
      },
      {
        name: 'Buffer pool / Buffer cache',
        description: `A consecutive memory area to cache table and index data in memory to avoid I/O operations.
        The buffer pool consists of many pages of same size (normal values are 4K, 8K, 16K bytes), and a variation of
        LRU (Least Recently Used) replacement strategy is often used to swap buffer pages.`,
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'C',
    list: [
      {
        name: 'Catalog (Database Catalog)',
        description: `Records the metadata of the database, which are stored in the so-called System Table. The metadata
        includes the database name, table name, database users and their permissions, etc.`,
        reference: 'https://en.wikipedia.org/wiki/Database_catalog',
        tagList: ['General'],
      },
      {
        name: 'Change data capture (CDC)',
        description: `A process to record the data changes. It's often used to copy the data to a different system such as
        warehouse or a different database system in the process of migration.`,
        reference: 'https://en.wikipedia.org/wiki/Change_data_capture',
        tagList: ['General'],
      },
      {
        name: 'Checkpoint',
        description: `The original idea comes from the ARIES paper (see reference). For performance reason, database
        does not persist modified data to disk after every committed change, instead, it periodically issues checkpoint which persists
        the changes in batch. It's called checkpoint because when database crashes and then starts again for crash recovery, the
        recovery process only needs to recover the committed changes after the latest checkpoint because the checkpoint
        guarantees any commits before that checkpoint have been persisted already. Checkpoint is still a heavy operation and
        may impact database performance.
        `,
        reference: 'https://people.eecs.berkeley.edu/~brewer/cs262/Aries.pdf',
        tagList: ['General'],
      },
      {
        name: 'Column',
        description: `A set of data values of a particular type, one value for each row of the database. Column can also have constraints such
        as non-emptiness, having a certain prefix and etc.`,
        reference: 'https://en.wikipedia.org/wiki/Column_(database)',
        tagList: ['General'],
      },
      {
        name: 'Commit',
        description: `Commit marks the end of a transaction, persisting all mutations from that transaction. For performance reason, database
        does not persist the change to data file directly upon commit, rather, it persists the change to a commit log also called write-ahead log.
        Later on, database will do a checkpoint to persist those changes from write-ahead log to the data file in batch.`,
        reference: 'https://en.wikipedia.org/wiki/Commit_(data_management)',
        tagList: ['General'],
      },
      {
        name: 'Consistency',
        description: `C in ACID, database defines a set of constraints, the consistency property guarantees the same invariants before and after the transaction.`,
        reference: 'https://en.wikipedia.org/wiki/Consistency_(database_systems)',
        tagList: ['General'],
      },
      {
        name: 'Constraint',
        description: `Specific requirement that must be met by the value stored in the database. Typical constraints are NOT NULL constraint, UNIQUE constraint and etc.`,
        reference: 'https://en.wikipedia.org/wiki/Check_constraint',
        tagList: ['General'],
      },
      {
        name: 'Cost-based optimization (CBO)',
        description: `A optimization strategy used by the query engine to pick a query plan to execute the SQL statement based on the
        cost estimate. It's  the strategy used by all mainstream databases. It's predecessor is Rule-based optimization (RBO). The
        advantage of CBO is it's more adaptive than the hard-coded RBO since it's based on the actual context, the number of estimated
        rows to be fetched, the cost  of each fetch, the index to be used and etc. Because there are quite a few factors to consider,
        and it's prohibitive expensive to explore all permutations, thus the database often finds the best plan among a subset of
        all possible plans.`,
        tagList: ['General'],
      },
      {
        name: 'Crash recovery',
        description: `A process running upon database startup if the database is not shutdown properly (crash, power failure).
        The process restores the database to the consistent state by rolling back incomplete transactions and completing committed
        transactions. All mainstream database use the same crash recovery mechanism described in the ARIES paper (see reference).`,
        reference: 'https://people.eecs.berkeley.edu/~brewer/cs262/Aries.pdf',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'D',
    list: [
      {
        name: 'Data source',
        description: `A connection set up to a database from a database instance. There could be multiple data sources for the same
        database. e.g. one for read-only connection, and one for read-write connection.`,
        reference: 'https://en.wikipedia.org/wiki/Datasource',
        tagList: ['General'],
      },
      {
        name: 'Data source name (DSN)',
        description: `A string describing the data source. This is the one used by the database driver code to establish the connection
        to the database. The format is a variation of <driver>://<username>:<password>@<host>:<port>/<database> depending on the specific
        driver implementation.`,
        reference: 'https://en.wikipedia.org/wiki/Data_source_name',
        tagList: ['General'],
      },
      {
        name: 'Data definition language (DDL)',
        description: `The statement to change the structure (schema) of the database such as CREATE, ALTER, DROP statements.`,
        reference: 'https://en.wikipedia.org/wiki/Data_definition_language',
        tagList: ['General'],
      },
      {
        name: 'Data manipulation language (DML)',
        description: `The statement to query or change the data of the database such as SELECT, INSERT, UPDATE, DELETE statements.`,
        reference: 'https://en.wikipedia.org/wiki/Data_manipulation_language',
        tagList: ['General'],
      },
      {
        name: 'Database',
        description: `A logic collection of schema objects like tables, stored procedures, triggers, users. A database is the one created
        by 'CREATE DATABASE'. Bytebase also has a database concept which is a 1:1 mapping to this database definition. Database in
        Bytebase always belongs to a single project.`,
        reference: 'https://www.bytebase.com/docs/concepts/data-model#database',
        tagList: ['General', 'Bytebase'],
      },
      {
        name: 'Database instance',
        description: `The complete running environment providing the database service. This is usually denoted by a host:port pointing
        to the running instance. When people talk about MySQL/PostgreSQL instance, they usually refer to the database instance. A single
        database instance can host many databases. Bytebase has an instance concept which is a 1:1 mapping to this instance definition.
        Instance in Bytebase always belongs to a particular environment. Bytebase also stores the database schema migration history on
        the instance itself.`,
        reference: 'https://www.bytebase.com/docs/concepts/data-model#database-instance',
        tagList: ['General', 'Bytebase'],
      },
      {
        name: 'Database-as-code',
        description: `A workflow to store database schema changes as a series of schema migration scripts in the version control system (VCS).
        Whenever new script committed to the VCS, a process will kickoff automatically to start the process of applying the script to the database.
        Thus the database schema change is managed in a very similar fashion as code. This workflow is considered superior than the classic
        UI based SQL review workflow. However, it requires a bit more setup and engineering discipline. Bytebase supports this workflow and helps
        ease the onboarding and ongoing management of using this workflow.`,
        reference: 'https://www.bytebase.com/docs/vcs-integration/overview',
        tagList: ['General', 'Bytebase'],
      },
      {
        name: 'Deadlock',
        description: `A situation in which multiple transactions are waiting for one another to give up locks. Transaction may acquire locks when
        it's accessing a resource, if one transaction accesses resource A and then B, another transaction accesses resource B and then A, they may
        hold lock on A and B respectively while waiting for each other to release another lock, thus a deadlock occurs. Database has a deadlock
        detection algorithm to find such situation and would abort one of the transactions to resolve the deadlock.`,
        tagList: ['General'],
      },
      {
        name: 'Durability',
        description: `D in ACID, the property to guarantee the changes after the successful transaction commit will survive permanently.`,
        reference: 'https://en.wikipedia.org/wiki/Durability_(database_systems)',
        tagList: ['General'],
      },
      {
        name: 'Doublewrite buffer',
        description: `The InnoDB double write buffer helps recover from half-written pages. Whenever InnoDB flushes a page from the buffer pool, it is first written to the double write buffer. Only if the buffer is safely flushed to the disk, will InnoDB write the pages to the disk. So that when InnoDB detects the corruption from the mismatch of the checksum, it can recover from double write buffer. The PostgreSQL equivalent is full-page writes.`,
        reference: 'https://dev.mysql.com/doc/refman/8.0/en/innodb-doublewrite-buffer.html',
        tagList: ['MySQL'],
      },
    ],
  },
  {
    letter: 'E',
    list: [
      {
        name: 'Encryption at rest (EAR)',
        description: `Database stores data in its own format on the disk. While the data looks obscure to the humans, it can be de-obfuscated
        and altered with some effort. This poses a risk if malicious user has direct access to the disk, which can bypass the database
        ACL system to access and alter the data. EAR is the method to encrypt the data on disk (at rest) using an encryption key, which makes
        this attack impossible. Data is encrypted right before writing to the disk and decrypted right after reading from the disk.
        `,
        reference: 'https://en.wikipedia.org/wiki/Data_at_rest',
        tagList: ['General'],
      },
      {
        name: 'Encryption in transit',
        description: `Client normally accesses database server over a public or untrusted network, to prevents eavesdropping and man-in-the-middle
        attack, database client and server would first establish a secure connection by agreeing on the encryption algorithm and ephemeral encryption
        key to use, then client and server can securely exchange the messages with each other.`,
        reference: 'https://en.wikipedia.org/wiki/Data_in_transit',
        tagList: ['General'],
      },
      {
        name: 'Engine / Database engine',
        description: `Sometimes, this refers to the database type like MySQL, PostgreSQL. Sometimes, especially when we are talking
        about a specific database, this refers to the underlying storage engine which manages the transaction and data storage layer, see 'Storage engine'.`,
        tagList: ['General'],
      },
      {
        name: 'Environment',
        description: `A top level model in Bytebase to model after various environments in the development pipeline such as test, staging, prod.
        A bytebase database instance always belong to a single environment. Bytebase owner and DBA can also configure approval policies on the environment.`,
        reference: 'https://www.bytebase.com/docs/concepts/data-model#environment',
        tagList: ['Bytebase'],
      },
    ],
  },
  {
    letter: 'F',
    list: [
      {
        name: 'Failover',
        description: `An operation to switch to a secondary database instance when the primary database instance fails. That secondary instance
        is commonly known as standby, failover replica. The key metrics to evaluate the failover are RPO (Recovery Point Objective) and
        RTO (Recovery Time Objective).`,
        reference: 'https://en.wikipedia.org/wiki/Failover',
        tagList: ['General'],
      },
      {
        name: 'Filesort / External merge sort',
        description: `When performing sorting operations for ORDER BY, GROUP BY and there is no sufficient memory to sort all data at once,
        database will partition the data, sort them batch by batch and write the intermediate sorting results to disk. Since it involves
        heavy I/O operations, it will drastically impact query performance.`,
        reference: 'https://dev.mysql.com/doc/internals/en/filesort.html',
        tagList: ['General', 'MySQL'],
      },
      {
        name: 'Foreign data wrapper',
        description: `A PostgreSQL specific feature to allow it access external data sources such as CSV file, MySQL database and etc.
        Besides, unlike MySQL, PostgreSQL does not natively support accessing different databases in a single statement, to achieve the
        similar result, user can also setup a PostgreSQL database as a foreign data source.`,
        reference: 'https://www.postgresql.org/docs/current/ddl-foreign-data.html',
        tagList: ['PostgreSQL'],
      },
      {
        name: 'Foreign key',
        description: `A set of attributes in a table that refers to the primary key of another table. The foreign key links 2 tables and
        often establishes the referential integrity rules between 2 tables. (e.g a typical referential rule is a particular row can't be
        removed if the row id is referenced in any foreign tables.).`,
        reference: 'https://en.wikipedia.org/wiki/Foreign_key',
        tagList: ['General'],
      },
      {
        name: 'Full-page writes',
        description: `When full-page writes is on, the PostgreSQL server writes the entire content of each disk page to WAL during the first modification of that page after a checkpoint. This is needed because a page write that is in process during an operating system crash might be only partially completed, leading to an on-disk page that contains a mix of old and new data. The row-level change data normally stored in WAL will not be enough to completely restore such a page during post-crash recovery. Storing the full page image guarantees that the page can be correctly restored, but at the price of increasing the amount of data that must be written to WAL. The MySQL equivalent is double write buffer`,
        reference: 'https://www.postgresql.org/docs/14/runtime-config-wal.html',
        tagList: ['PostgreSQL'],
      },
    ],
  },
  {
    letter: 'H',
    list: [
      {
        name: 'Hierarchical model',
        description: `A data model in which the data are organized into a tree-like structure.
        This is the first model used in database system from IBM. But it lost popularity to the relational model.
        `,
        reference: 'https://en.wikipedia.org/wiki/Hierarchical_database_model',
        tagList: ['General'],
      },
      {
        name: 'Hint',
        description: `A hint to advice the query optimizer to use a particular optimization strategy which would be
        otherwise ignored. Query optimizer usually follows the hint if specified.`,
        reference: 'https://en.wikipedia.org/wiki/Hint_(SQL)',
        tagList: ['General'],
      },
      {
        name: 'HTAP (Hybrid transactional/analytical processing)',
        description: `A new term coined recently to combine the transactional and analytical power into a single system.
        Traditionally, transactional and analytical processing are handled by different systems, which causes the headache
        of maintaining 2 separate systems as well as duplicating the data and managing the pipeline to copy the data
        from the online transactional system to the analytical system. HTAP gains popularity because it eliminates the
        duplicate system and data, making near real-time analytic possible. On the other hand, the challenge still remains
        as how to efficiently handle both transactional and analytical workload in the same system, and how to prevent analytical
        workload interfering with online transactional processing.`,
        reference: 'https://en.wikipedia.org/wiki/Hybrid_transactional/analytical_processing',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'I',
    list: [
      {
        name: 'Index',
        description: `A data structure greatly improves the speed of data retrieval. Like the physical book index, the index
        helps quickly locate a particular value or a range of values (finding a needle in a haystack). While good for boosting
        query performance, index brings the overhead of updating the index entry whenever underlying data changes. Thus adding
        /removing index is a balanced art and should be evaluated carefully.
        maintaining index `,
        reference: 'https://en.wikipedia.org/wiki/Database_index',
        tagList: ['General'],
      },
      {
        name: 'InnoDB',
        description: `A well-engineered storage engine which is now the default storage engined used by MySQL. It's a performant
        storage engine providing the standard ACID-compliant transaction features. Inno stands for 'Innovation', InnoDB is the
        lesser hero underpinning the many web services and saving huge amount of DBA headaches.
        `,
        reference: 'https://en.wikipedia.org/wiki/InnoDB',
        tagList: ['MySQL'],
      },
      {
        name: 'Isolation',
        description: `I in ACID, the property defines the behavior of how concurrent transactions sees changes from each other.
        ANSI/ISO SQL defines 4 isolation levels in the order of ascending strictness: Read uncommitted, Read committed, Repeatable reads, Serializable.`,
        reference: 'https://en.wikipedia.org/wiki/Isolation_(database_systems)',
        tagList: ['General'],
      },
      {
        name: 'Issue',
        description: `Issue is a Bytebase concept, each issue represents a specific collaboration activity between Developer and
        DBA such as creating a database, altering a schema. It's similar to the issue concept in other issue management tools.
        An issue always belong to a Bytebase Project.`,
        reference: 'https://www.bytebase.com/docs/concepts/data-model#issue',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'J',
    list: [
      {
        name: 'JDBC',
        description: `Java Database Connectivity (JDBC) defines a standard API for Java to access database. Different database venders
        implements the JDBC API so that Java programs can call the same standard API to access different databases.`,
        reference: 'https://en.wikipedia.org/wiki/Java_Database_Connectivity',
        tagList: ['General'],
      },
      {
        name: 'Join',
        description: `An operator in relational algebra to combine columns from multiple tables into a single table. Query
        engines usually fulfills the join request using one of the Nested-loop join, Merge join, Hash join methods.
        `,
        reference: 'https://en.wikipedia.org/wiki/Join_(SQL)',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'L',
    list: [
      {
        name: 'Lock',
        description: `A technique to prevent simultaneous access to data in a database to prevent inconsistent results. Modern
        databases all implement the granular row-level locking for performance reason. But some operations like altering the 
        schema would still require table-level locking, which would block the normal online processing. That's the reason such
        operations are performed during non-business hours to reduce impact.`,
        reference: 'https://en.wikipedia.org/wiki/Record_locking',
        tagList: ['General'],
      },
      {
        name: 'LRU (Least Recently Used)',
        description: `The algorithm used by database engines to swap the buffer pool pages. Different database engines use
        a different variation of LRU algorithms.`,
        reference: 'https://en.wikipedia.org/wiki/Page_replacement_algorithm#Least_recently_used',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'M',
    list: [
      {
        name: 'Migration (database system)',
        description: `The process of migrating the entire database from one system to another (e.g. From MySQL to PostgreSQL or vice versa).
        The process usually consists of 3 phase, 1) baseline phase 2) catchup phase 3) switchover phase. In the baseline phase, team creates
        a data dump from the source database system and loads it into the target database system. 2) In the catchup phase, team configures a
        change-data-capture (CDC) pipeline to stream the ongoing changes to the target database. 3) In the switchover phase, team cuts off
        the traffic to the original database, wait for target database to catch up all new changes from the source database, and then redirect
        the traffic to the target database. If executed carefully, the downtime would be limited to the blackout period in the switchover phase.
        `,
        tagList: ['General'],
      },
      {
        name: 'Migration (schema change)',
        description: `The process of making changes to the database schema. The process is both dangerous and hard to fix. Performing a
        successful schema migration requires coordination between developers, DBAs and the operating environment. Bytebase is a product
        built specifically for addressing the challenges involved in this database schema change process. It supports the 2 most common
        change workflows, 1) Classic UI-based SQL review workflow and 2) Version control based workflow (database-as-code).`,
        reference: 'https://www.bytebase.com/docs/concepts/database-change-workflow',
        tagList: ['General', 'Bytebase'],
      },
      {
        name: 'MVCC (Multi-version concurrency control)',
        description: `A method used to achieve both performant concurrent access and strict isolation level. The idea is to
        give each transaction a unique versioned view of the data, thus each transaction can operate on their own. Only at
        the commit phase, the database system will perform the resolution, the conflict might arise at this point and may
        cause the transaction to abort. However, the assumption is such scenario is less likely to happen and that's why
        MVCC is referred as optimistic concurrency control. A classic saying for MVCC is 'Reads do not block Writes, writes
        do not block Reads'.`,
        reference: 'https://en.wikipedia.org/wiki/Multiversion_concurrency_control',
        tagList: ['General'],
      },
      {
        name: 'MySQL',
        description:
          'A pragmatic, performant database secretly supporting a majority of internet services.',
        reference: 'https://www.mysql.com/',
        tagList: ['MySQL'],
      },
    ],
  },
  {
    letter: 'N',
    list: [
      {
        name: 'Normalization',
        description: `A process of designing a database schema in accordance with a series of so-called normal forms. The design
          requires skillful balance among data redundancy, data integrity, performance and etc.`,
        reference: 'https://en.wikipedia.org/wiki/Database_normalization',
        tagList: ['General'],
      },
      {
        name: 'NewSQL',
        description: `A class of relational database management systems that seek to provide the scalability of NoSQL systems for 
          online transaction processing (OLTP) workloads while maintaining the ACID guarantees of a traditional database system. This
          emerges from the NoSQL movement which advocates scalability over classic ACID guarantees. And only after hard learned lessons,
          people realize the merits of the old wisdom and add ACID to the NoSQL, thus resulting in NewSQL.
          `,
        reference: 'https://en.wikipedia.org/wiki/NewSQL',
        tagList: ['General'],
      },
      {
        name: 'NoSQL',
        description: `A class of database management systems does not provide SQL like interface or does not employ relational
        model. A key difference from the relational database group is NoSQL does not enforce schema (schemaless). Notable 
        NoSQL are Redis, MongoDB, AWS DynamoDB`,
        reference: 'https://en.wikipedia.org/wiki/NoSQL',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'O',
    list: [
      {
        name: 'Optimizer / Query optimizer',
        description: `A key subsystem in relational database to determine the efficient way to execute a given query in a timely fashion.
          It transforms an input SQL query into an executable query plan. Most mainstream databases use the cost-based optimizer (CBO) which
          determines the best query by calculating the cost of many factors such I/O speed, number of rows to be accessed etc. Because
          the cost is an estimate, and also the plan needs to be generated in a timely fashion, thus the optimizer can not permutate all
          possible plans and pick the optimal plan.`,
        reference: 'https://en.wikipedia.org/wiki/Query_optimization',
        tagList: ['General'],
      },
      {
        name: 'ODBC (Open Database Connectivity)',
        description: `A standard API for accessing database management systems. Its current usage is more limited to Microsoft ecosystems
        because other programming environments employ different but similar standard API (like JDBC for Java, database/sql for Golang).
        `,
        reference: 'https://en.wikipedia.org/wiki/Open_Database_Connectivity',
        tagList: ['General'],
      },
      {
        name: 'OLAP (Online analytical processing)',
        description: `A process specializing in handling multi-dimensional analytical queries efficiently. This is often used
        in database warehouse, business intelligence. Traditionally, a specialized system is built for this type of processing. But
        nowadays, many systems try to combine the OLAP and OLTP power into a single system known as HTAP (Hybrid transactional/analytical processing).`,
        tagList: ['General'],
      },
      {
        name: 'OLTP (Online transaction processing)',
        description: `A process specializing in online transaction processing. It's optimized for serving requests in milliseconds
        for hundreds of thousands customers concurrently, while conforming ACID transaction properties. Nowadays, more OLTP system evolves to
        handle OLAP, which becomes a HTAP system.`,
        reference: 'https://en.wikipedia.org/wiki/Online_transaction_processing',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'P',
    list: [
      {
        name: 'Page',
        description: `Both on disk and in memory, database data is stored as a consecutive byte blocks with same size. Each block is
        called a page. Normal page size are 4KB, 8KB, 16KB bytes. Data I/O operation is performed on the unit of pages. Most of the time,
        database can't hold all data in the memory, thus it employs a buffer pool to maintain a list of active pages based on LRU. The
        buffer pool swaps the pages continuously based on the access pattern, a process known as page-in, page-out.`,
        tagList: ['General'],
      },
      {
        name: 'Point-in-time-recovery (PITR)',
        description: `A process to restore the database state to a particular point in time. This is often achieved by first restoring 
        the database using a base backup (baselining) and then replaying the change-data-capture (CDC) logs up to the desired point in
        time.`,
        reference: 'https://en.wikipedia.org/wiki/Point-in-time_recovery',
        tagList: ['General'],
      },
      {
        name: 'PostGIS',
        description: `An open source PostgreSQL plugin providing sophisticated geo-spatial operations. It leverages the PostgreSQL
        extensibilities to offer a native geo-spatial processing experience. It's one of the features setting PostgreSQL apart from
        other database systems.`,
        reference: 'https://postgis.net/',
        tagList: ['PostgreSQL'],
      },
      {
        name: 'PostgreSQL',
        description:
          'A battle tested, well-engineered, multi-model, open source relational database. The only regret is its naming story.',
        reference: 'https://www.postgresql.org/',
        tagList: ['PostgreSQL'],
      },
      {
        name: 'Primary key',
        description: `A set of columns that uniquely identifies a row in a table. It could be a single column such as UUID or a set
        of columns. Many database systems requires user to specify the primary key in the table schema, for those not specified, an
        internal primary key is always created since the primary key is required to identify and address a particular row.`,
        reference: 'https://en.wikipedia.org/wiki/Primary_key',
        tagList: ['General'],
      },
      {
        name: 'Project',
        description: `Project is a Bytebase top-level model and is a logic unit to model a team effort. It's similar to the project
        concept in other dev tools such as Jira, GitLab. Project is the container to group logically related Databases,  Issues and Users together.`,
        reference: 'https://www.bytebase.com/docs/concepts/data-model#project',
        tagList: ['Bytebase'],
      },
    ],
  },
  {
    letter: 'Q',
    list: [
      {
        name: 'Query',
        description: `A query sometimes refers to the general SQL statement or in the more narrowed case, only refers to the 
        SELECT SQL statement since the SELECT query requires the query optimizer to determine a performant query plan.`,
        reference: 'https://en.wikipedia.org/wiki/SQL',
        tagList: ['General'],
      },
      {
        name: 'Query Plan',
        description: `A sequence of steps generated by the query optimizer from the SELECT query. A particular query can often
        translate to a lot of query plans. The task of query optimizer is to pick a performant query plan among them. Note it's
        often computational and time prohibitive to permutate all possible query plans and pick the best one. What query optimizer
        normally does is to strategically choose a subset of query plans and pick the best one among them.`,
        reference: 'https://en.wikipedia.org/wiki/Query_plan',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'R',
    list: [
      {
        name: 'Redo logs',
        description: 'See Write-ahead log',
        tagList: ['General'],
      },
      {
        name: 'Referential integrity',
        description: `Declares the constraint of foreign key. Specifically, it requires when a foreign key value
        is used, it must reference an existing primary key in the paraent table.
        `,
        reference: 'https://en.wikipedia.org/wiki/Referential_integrity',
        tagList: ['General'],
      },
      {
        name: 'Relational model',
        description: 'The model invented by Edgar F. Codd and rewrites the entire human history.',
        reference: 'https://en.wikipedia.org/wiki/Relational_model',
        tagList: ['General'],
      },
      {
        name: 'Replication',
        description: `A process the produce a redundant copy of the primary data. The copy is also called replica.
        The replica can be used as a hot standby to takeover traffic when the primary fails, or it can be used
        as a read replica to serve read traffic.`,
        reference: 'https://en.wikipedia.org/wiki/Replication_(computing)',
        tagList: ['General'],
      },
      {
        name: 'Restore',
        description: `A process to reset the database to a state based on a backup.`,
        reference: '',
        tagList: ['General'],
      },
      {
        name: 'Rollback',
        description: `Rollback marks the end of a transaction, to discard all mutations from that transaction.
        A rollback can be issued by the client by rollback statement, and sometimes, database engine will rollback
        the transaction to resolve deadlock or resolve the conflict due to concurrent change to the same row.
        `,
        reference: 'https://en.wikipedia.org/wiki/Rollback_(data_management)',
        tagList: ['General'],
      },
      {
        name: 'RPO (Recovery Point Objective)',
        description: `The targeted period in which data might be lost due to service disruption. For majority systems,
        RPO should always be 0 since data loss is unacceptable. The optimization direction is often maintaining 0 RPO
        while minimizing the RTO.`,
        reference: 'https://en.wikipedia.org/wiki/Disaster_recovery',
        tagList: ['General'],
      },
      {
        name: 'RTO (Recovery Time Objective)',
        description: `The targeted duration of time within which the database must be restored to normal 
        after a service disruption. It usually has a conflict interests with RPO. When the primary database fails,
        one can wait to promote the replica to serve traffic until the replica catches up all changes (longer RTO,
        but 0 RTO) or promote the replica immediately (shorter RTO, but non-0 RTO).`,
        reference: 'https://en.wikipedia.org/wiki/Disaster_recovery',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'S',
    list: [
      {
        name: 'Schema',
        description: `The structure describing the data organization and integrity constraints of the database. 
        The metadata of the database system. The schema embodies the business domain logic, reflecting the
        understanding of the schema designer. Changing schema is always a consequence of business requirements
        change or the evolve understanding of the business requirements. Schema change is a structure change,
        which is often non-trivial, Bytebase is specifically build to smooth the schema change process.`,
        reference: 'https://en.wikipedia.org/wiki/Database_schema',
        tagList: ['General', 'Bytebase'],
      },
      {
        name: 'Server / Database server',
        description: `This sometimes refer to the entire database like MySQL, PostgreSQL. Sometimes, it refers
        to the server subsystem in the database, which handling client connections, authentication/authorization,
        user sessions and etc.`,
        tagList: ['General'],
      },
      {
        name: 'Sharding / Horizontal sharding',
        description: `A technique to partition a set of related data into smaller groups. Each group is called
        a shard, which has logically same schema as the unsharded data, the only difference is the data size.
        This technique is often to address scalability issue when a single database instance is incapable of
        serving all data, thus sharding is introduced to split the data and spread load across multiple instances.
        Sharding brings quite a lot overhead, so normally it's the last resort until a single instance reaches
        its scaling limit.`,
        reference: 'https://en.wikipedia.org/wiki/Shard_(database_architecture)',
        tagList: ['General'],
      },
      {
        name: 'SQL',
        description: 'A better language than PHP.',
        reference: 'https://en.wikipedia.org/wiki/SQL',
        tagList: ['General'],
      },
      {
        name: 'SQL review',
        description: `The process of reviewing the SQL schema change. A typical SQL review starts when the Developer
        opens a schema change ticket, then a DBA will be assigned the ticket to review and approve/reject the change.
        If the change is approved, then it will be applied to the database by the tooling system. Bytebase has built-in
        support for this SQL review workflow.`,
        reference: 'https://www.bytebase.com/docs/sql-review/overview',
        tagList: ['General', 'Bytebase'],
      },
      {
        name: 'Storage engine',
        description: `The storage engine is one of the 3 core subsystems in a traditional database management system.
        The other 2 are the query engine and the server layer (managing ACL, client connections/sessions). The storage engine
        would expose an API for other subsystems (mainly the query engine) to interact with it. Both InnoDB, MyISAM are
        a storage engine of MySQL. Storage engine can also be a standalone component, in which case, it's used as a library (e.g. Berkeley DB).`,
        reference: 'https://en.wikipedia.org/wiki/Database_engine',
        tagList: ['General'],
      },
      {
        name: 'Stored procedure',
        description:
          'A subroutine coded and executed on the database directly. Looks handy, but always turns out to be a headache.',
        reference: 'https://en.wikipedia.org/wiki/Stored_procedure',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'T',
    list: [
      {
        name: 'Table',
        description: `A collection of related data having the same structure. A table is a 2-dimensional array consisting of columns
        and rows.
        `,
        reference: 'https://en.wikipedia.org/wiki/Table_(database)',
        tagList: ['General'],
      },
      {
        name: 'Transaction',
        description:
          'A unit of work performed within a database system. A transaction conforms to ACID.',
        reference: 'https://en.wikipedia.org/wiki/Database_transaction',
        tagList: ['General'],
      },
      {
        name: 'Trigger',
        description: `A procedural code that is automatically executed in response to certain events on 
        a particular table or view in a database.`,
        reference: 'https://en.wikipedia.org/wiki/Database_trigger',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'U',
    list: [
      {
        name: 'User-defined function (UDF)',
        description: `Provides a mechanism for extending the functionality of the database server 
          by adding a function, that can be evaluated in standard query language (usually SQL) statements.
        `,
        reference: 'https://en.wikipedia.org/wiki/User-defined_function',
        tagList: ['General'],
      },
      {
        name: 'Undo logs',
        description: `A type of logs used by storage engine to guarantee transaction ACID. Not all storage engine uses undo logs.
          e.g. PostgreSQL does not use undo logs while MySQL's InnoDB does. Undo logs are used to revert the uncommitted
          changes during crash recovery or restore the data to a particular version in order to provide a consistent view
          for a particular transaction.
          `,
        reference: 'https://dev.mysql.com/doc/refman/en/innodb-undo-logs.html',
        tagList: ['General', 'MySQL'],
      },
    ],
  },
  {
    letter: 'V',
    list: [
      {
        name: 'Vacuum',
        description: `Whenever PostgreSQL changes a row, it creates a new version under the hood. Old versions
        will be needed until no active transactions refer them. And at that point, a background process called
        vacuuming would remove these dead rows.
        `,
        reference: 'https://www.postgresql.org/docs/current/sql-vacuum.html',
        tagList: ['PostgreSQL'],
      },
      {
        name: 'View',
        description: `
        A logical set that database users can query just as they would against an actual table. The view data set
        could come from multiple tables.
        `,
        reference: 'https://en.wikipedia.org/wiki/View_(SQL)',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'W',
    list: [
      {
        name: 'Write-ahead logs (WAL)',
        description: `A type of logs used by storage engine to guarantee transaction ACID. For performance reason, whenever
        a transaction commits, the storage engine does not changes the data file directly, instead it persists the change
        by appending it to a log file and then signals the commit success. This process is called write-ahead because the actual
        change to the data file is batched at a later time, the storage engine just writes ahead to a log file to guarantee
        that the transaction data persists. If the database crashes in between, the recovery process will redo the changes
        recorded in the write-ahead logs to apply to the data file, that's why it's also known as redo logs. Another usage
        for WAL is for change-data-capture (CDC) since it already records all the data changes. e.g. PostgreSQL uses WAL
        for logical replication.
        `,
        reference: 'https://en.wikipedia.org/wiki/Write-ahead_logging',
        tagList: ['General'],
      },
    ],
  },
  {
    letter: 'X',
    list: [
      {
        name: 'XID',
        description: `The transaction ID used in PostgreSQL. Besides identifying the transaction, it's
          also used to determine the visible data a particular transaction can see.`,
        reference: 'https://www.2ndquadrant.com/en/blog/around-world-two-billion-transactions/',
        tagList: ['PostgreSQL'],
      },
    ],
  },
];
