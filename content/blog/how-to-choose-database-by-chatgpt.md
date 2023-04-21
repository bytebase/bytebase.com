---
title: Ask ChatGPT - How to Choose the Right Database for Your Next Project
author: Tianzhou
published_at: 2022/12/04 08:40:00
feature_image: /blog/how-you-choose-database-by-chatgpt/choice.webp
tags: Industry
description: A conversation with ChatGPT consulting which database to pick for your next software project.
---

Last week, OpenAI revealed their new toy [ChatGPT](https://openai.com/blog/chatgpt/).
Suddenly, my social network is overwhelmed with all sorts of ChatGPT conversations. Regardless of
how weird the questions are, ChatGPT always sounds convincing, even though sometimes it's just
nonsense. Below I start a conversation asking ChatGPT the database I should choose for my next
software project. I picked this topic because:

1. Comparing different databases always causes [heated debate](https://www.bytebase.com/blog/database-review-2021).
   I am curious how the state-of-the-art AI handles this.
1. I know this domain decently well, so I could escape from the ChatGPT persuasive trap (hopefully).

## Scripts

**Me:** I want to start a new software project, which database should I choose, MySQL, PostgreSQL,
Mango, SQLite or others?

**ChatGPT:** There are many factors to consider when choosing a database for your software project,
including the type of project you are building, your budget, and the level of performance and
scalability you need. MySQL, PostgreSQL, MongoDB, and SQLite are all popular database options, each
with their own strengths and weaknesses.

**Me:** Tell me the strengths and weaknesses among them

**ChatGPT:** MySQL is a widely-used, open-source relational database management system (RDBMS) that
is known for its ease of use and strong performance. One of its main advantages is that it supports
a wide range of applications, from small websites to large, complex systems. However, MySQL is not
always the best choice for high-performance applications, and it does not support some advanced
database features such as document-level data handling and native graph data storage.

PostgreSQL is another popular open-source RDBMS that is known for its reliability, stability, and
support tore wide range of data types. It is often used in mission-critical applications, and it
supports advanced features such as data replication and concurrency without read locks. However,
PostgreSQL can be more complex to set up and manage than some other database options, and it may not
be the best choice for applications that require very high performance.

MongoDB is a popular open-source NoSOL database that is known for its flexibility and scalability.
It is often used in applications that require the ability to store and query large volumes of
unstructured data, and it supports advanced features such as distributed data storage and indexing.
However, MongoDB can be more complex to use than some other database options, and it may not be the
best choice for applications that require ACID (atomic, consistent, isolated, durable) transactions.

SQLite is a widely-used, open-source RDBMS that is known for its lightweight design and good
performance. It is often used in embedded applications, such as mobile apps, and it does not require
a separate server process to operate. However, SQLite does not support advanced database features
such as data replication and distributed data storage, and it may not be the best choice for
applications that require high levels of performance or scalability.

Ultimately, the best database for your project will depend on your specific requirements and goals.
It's a good idea to research and compare different database options carefully before making a
decision.

**Me:** OK, I will go with PostgreSQL, which cloud provider should I choose, AWS, GCP or Microsoft
Azure

**ChatGPT:** All three of the major cloud providers-- Amazon Web Services (AWS),
Google Cloud Platform (GCP), and Microsoft Azure -- offer support for PostgreSQL. Each of these
platforms has its own strengths and weaknesses, so the best choice for you will depend on your
specific needs and requirements.

AWS offers a fully managed version of PostgreSQL called Amazon RDS
for PostgreSQL, which makes it easy to set up, operate, and scale a PostgreSQL database in the
cloud. AWS also offers a range of other services and tools that can be used in conjunction with
PostgreSQL, such as Elastic Load Balancing for high availability and Amazon Redshift for data
warehousing.

GCP offers a fully managed version of PostgreSQL called Cloud SOL for PostgreSQL, which makes it
easy to set up, operate, and scale a PostgreSQL database in the cloud. GCP also offers a range of
other services and tools that can be used with PostgreSQL, such as BigQuery for data analytics and
Cloud Pub/Sub for event-driven architecture.

Microsoft Azure offers a fully managed version of PostgreSQL called Azure Database for PostgreSQL,
which makes it easy to set up, operate, and scale a PostgreSQL database in the cloud. Azure also
offers a range of other services and tools that can be used with PostgreSQL, such as Azure Synapse
Analytics for data warehousing and Azure Cosmos DB for globally distributed data.

In summary, all three of these cloud providers offer robust support for PostgreSQL and a range of
other services that can be used in conjunction with a PostgreSQL database. The best choice for you
will depend on your specific needs and requirements, as well as any existing investments you may
have in a particular cloud platform. It's a good idea to research and compare the offerings from
each provider carefully before making a decision.

**Me:** What are the available regions and respective prices for each cloud vendor?

**ChatGPT:** I'm sorry, but I am not able to browse the internet, so I cannot provide you with
information about the available regions and prices for each cloud provider. I am a large language
model trained by OpenAl, and my knowledge is based on the text that has been fed to me. I am not
able to access real-time information or browse the internet like a human.

_Luckily, ChatGPT is not capable of answering this, otherwise, our [DB Cost](https://dbcost.com) website would be wasted_.

**Me:** If I want to combine OLTP and OLAP together, what's your recommendation? (_Poke some recent development in the database industry_)

**ChatGPT:** If you want to combine online transaction processing (OLTP) and online analytical
processing (OLAP) in your database, one option is to use a hybrid transactional/analytical
processing (HTAP) database. HTAP databases are designed to support both OLTP and OLAP workloads
simultaneously, allowing you to perform real-time analytics on your transactional data without
having to replicate or move the data to a separate OLAP system.

There are several HTAP databases available, including MemSQL, NuoDB, and ClustrixDB. These databases
combine the performance and scalability of in-memory architectures with the reliability and
durability of disk-based storage, making them well-suited for applications that require real-time
analytics on high-volume, transactional data.

Another option is to use a data warehousing solution, such as Amazon Redshift, Google BigQuery, or
Microsoft Azure Synapse Analytics. These solutions allow you to load and store your transactional
data in a separate, optimized environment for analytics, while still providing real-time access to
the data for reporting and other business intelligence needs.

Ultimately, the best approach for combining OLTP and OLAP in your database will depend on your
specific requirements and goals. It's a good idea to research and compare different solutions
carefully before making a decision.

**Me:** I want a free, HTAP, Serverless, MySQL and PostgreSQL compatible database, what do you
recommend? (_Being intentionally unreasonable and want to see how ChatGPT would respond_)

**ChatGPT:** I'm sorry, but it is unlikely that you will be able to find a free, HTAP, serverless,
MySQL and PostgreSQL compatible database. Hybrid transactional/analytical processing (HTAP)
databases are designed to support both online transaction processing (OLTP) and online analytical
processing (OLAP) workloads simultaneously, and they typically require specialized hardware and
software to operate. Additionally, MySQL and PostgreSQL are both widely-used, open-source relational
database management systems (RDBMS), and it is unlikely that any free database solution would be
compatible with both of them.

If you are looking for a free database solution, you may want to consider using SQLite, which is a
lightweight, open-source RDBMS that does not require a separate server process to operate. SQLite is
often used in embedded applications, such as mobile apps, and it is capable of supporting small to
medium-sized datasets. However, it does not support advanced database features such as distributed
data storage and indexing, and it may not be suitable for applications that require high levels of
performance or scalability.

Alternatively, you could consider using a cloud-based database solution, such as Amazon Web Services
(AWS) Aurora Serverless, which is a fully managed, serverless, MySQL and PostgreSQL compatible
database. AWS Aurora Serverless can automatically scale up or down based on your workload, allowing
you to pay only for the compute and storage resources you use. However, AWS Aurora Serverless is
not a HTAP database, and it is not free. It is offered on a pay-as-you-go basis, with pricing based
on the amount of storage, compute, and I/O resources you use.

In summary, while it is possible to find free database solutions, it is unlikely that you will be
able to find a free, HTAP, serverless, MySQL and PostgreSQL compatible database. The best solution
for your needs will depend on your specific requirements and goals, as well as your budget and level
of technical expertise. It's a good idea to research and compare different options carefully before
making a decision.

**Me:** OK, what if I only need either MySQL or PostgreSQL compatible? (Soften the requirement a bit)

**ChatGPT:** If you only need a database that is compatible with either MySQL or PostgreSQL, you may
want to consider using a cloud-based database solution, such as Amazon Web Services (AWS) Aurora,
Google Cloud SQL, or Microsoft Azure Database for MySQL or PostgreSQL. These solutions are fully
managed, scalable, and compatible with the MySQL and PostgreSQL open-source databases, respectively.
They allow you to set up, operate, and scale a MySQL or PostgreSQL database in the cloud without
having to manage the underlying infrastructure yourself.

AWS Aurora is a fully managed, scalable, MySQL and PostgreSQL compatible database that is offered on
a pay-as-you-go basis. It can automatically scale up or down based on your workload, allowing you to
pay only for the compute and storage resources you use. AWS also offers a serverless version of
Aurora called Aurora Serverless, which can automatically scale up or down based on demand, and does
not require you to provision any capacity in advance.

Google Cloud SQL is a fully managed, scalable, MySQL and PostgreSQL compatible database that is
offered on a pay-as-you-go basis. It allows you to set up, operate, and scale a MySQL or PostgreSQL
database in the cloud, and it offers high availability and disaster recovery options to protect your
data.

Microsoft Azure Database for MySQL and PostgreSQL are fully managed, scalable, MySQL and PostgreSQL
compatible databases that are offered on a pay-as-you-go basis. They allow you to set up, operate,
and scale a MySQL or PostgreSQL database in the cloud, and they offer a range of options for
managing and securing your data.

In summary, if you only need a database that is compatible with either MySQL or PostgreSQL, there
are many cloud-based options available. These solutions are fully managed, scalable, and compatible
with the open-source MySQL and PostgreSQL databases, respectively. They allow you to set up,
operate, and scale a MySQL or PostgreSQL database in the cloud without having to manage the
underlying infrastructure yourself. The best option for you will depend on your specific
requirements and goals, as well as your budget and level of technical expertise. It's a good idea to
research and compare different solutions carefully before making a decision.

**Me:** But those are for OLTP, while I ask for an HTAP, serverless database. (_Keep pressing again_)

**ChatGPT:** I'm sorry, but the cloud-based database solutions mentioned earlier, such as Amazon
Web Services (AWS) Aurora, Google Cloud SQL, and Microsoft Azure Database for MySQL or PostgreSQL,
are not hybrid transactional and analytical processing (HTAP) databases. They are designed to support
online transaction processing (OLTP) workloads, and they do not support online analytical
processing (OLAP) workloads.

HTAP databases are designed to support both OLTP and OLAP workloads simultaneously, allowing you to
perform real-tints analytics on your transactional data without having to replicate or move the data
to a separate OLAP system. However, HTAP databases are not typically offered as a fully managed,
serverless solution in the cloud. They require specialized hardware and software to operate, and
they are typically deployed on-premises or in a private cloud.

If you are looking for a free, HTAP, serverless database, it is unlikely that you will be able to
find one. HTAP databases are complex, high-performance systems that require specialized hardware and
software to operate, and they are not typically offered as a free or serverless solution. If you
need a HTAP database, you may want to consider using a commercial HTAP database solution, such as
MemSQL, NuoDB, or ClustrixDB. These solutions are not free, but they offer a fully managed
scalable, HTAP database that can be used on-premises or in a private cloud.

In summary, the cloud-based database solutions I mentioned earlier, such as AWS Aurora, Google Cloud
SQL, and Azure Database for MySQL or PostgreSQL, are not HTAP databases. They are designed to
support OLTP workloads, and they do not support OLAP workloads. It you are looking tore free, HTAP,
serverless database, it is unlikely that you will be able to find one. You may want to consider
using a commercial HTAP database solution instead.

**Me:** Alright, good try. You are spared.

**ChatGPT:** Thank you for your understanding. As a large language model trained by OpenAl, my goal
is to provide accurate and helpful information to the best of my ability. I am not able to browse
the internet or access real-time information, so I may not always be able to provide detailed or
up-to-date answers to your questions. If you have any further questions, please don't hesitate to
ask. I will do my best to help.

## Overall Impression

I am impressed.

ChatGPT can understand and engage the conversation like a real human. For such a
technical question, ChatGPT's answer is mostly sane, albeit a bit out-dated. e.g. When asking for
the HTAP databases, it mentions MemSQL (which has already been rebranded to [SingleStore](https://www.singlestore.com/blog/revolution/)) and dissolved NuoDB, ClustrixDB, but ignores the starlet like [TiDB](https://www.vldb.org/pvldb/vol13/p3072-huang.pdf). This is understandable as ChatGPT confesses that its knowledge cutoff is September 2021,
after I ask it to brief the AWS re:Invent 2022 happened just days ago.

![_](/blog/how-you-choose-database-by-chatgpt/aws-reinvent.webp)

I believe the knowledge freshness gap will be shortened dramatically in the coming years, just like
the data analysis industry, where those analysis taking days and weeks before now just take minutes
if not instant.

ChatGPT's tone is also convincing and diplomatic. e.g. When talking about MongoDB, it says

> it may not be the best choice for applications that require ACID (atomic, consistent, isolated,
> durable) transactions.

It didn't say MongoDB doesn't support ACID (which would be incorrect). In real database debate,
such subtle mistake will cost the whole battle.

As ChatGPT progresses, I expect it could give database suggestions as good as any database veterans.
And we may all retire at that point regardless of whether willingly or not.

---

Attached: my full conversation with ChatGPT.

![_](/blog/how-you-choose-database-by-chatgpt/full-script.webp)
