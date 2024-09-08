---
title: SQL Chat - Chat with Your Database
author: Tianzhou
updated_at: 2023/03/29 21:21:21
feature_image: /content/blog/sql-chat/sqlchat.webp
tags: Announcement
featured: true
description: Announcing SQL Chat, chat-based SQL Client for querying data and answering DB questions.
---

My first professional job is working on a codebase with over 1M LOC. The software provides a complete set of components including self-developed database, self-developed GUI controls, and custom scripting language. Users can use it to build an app purely by drag&drop. Today, this is known as the so-called no-code/low-code platform. While the software I worked on created way back in 1985 and is still iterating gradually, now at version 19.

![_](/content/blog/sql-chat/filemakerpro.webp)

[FileMaker Pro](https://en.wikipedia.org/wiki/FileMaker) is less known as its successor, [Airtable](https://www.airtable.com/) (to be more accurate, Airtable is a successor of Claris' discontinued [Bento](<https://en.wikipedia.org/wiki/Bento_(database)>). And Bento is envisioned as a lightweight FileMaker Pro initially). But as a classic software, FileMaker Pro still has a large user base. OG group buying platform [Groupon](https://groupon.com), designs their coupon with FileMaker; Apple's visitor system at their headquarter also runs FileMaker in Kiosk mode; And many dental clinic information systems in the US are also built upon FileMaker.

A more appropriate name for FileMaker is probably App Maker (Google once borrowed from FileMaker's idea to launch a product called App Maker, but [later shut it down](https://venturebeat.com/business/google-will-shut-down-app-maker-on-january-19-2021/)). Around the same time, there was another software debuted as an App Maker. It was called [HyperCard](https://en.wikipedia.org/wiki/HyperCard).

![_](/content/blog/sql-chat/hypercard.webp)

Although HyperCard is lesser-known today, its influence on the internet today is far-reaching: the World Wide Web, Netscape Navigator, and JavaScript were all inspired by HyperCard. For example, the `Hyper` in the HTTP protocol comes from HyperCard.

![_](/content/blog/sql-chat/devtools.webp)

## Developer Tools 2.0

A few days ago, Sequoia Capital published "[Developer Tools 2.0](https://www.sequoiacap.com/article/ai-powered-developer-tools/)", where Developer Tools 1.0 corresponds to GUI-based DevTools. And if DevTools are defined as software that helps build software (App Maker), then HyperCard was the developer tool that opened the 1.0 era.

HyperCard was born in 1987, that's 36 years ago. With the arrival of Generative AI, we are witnessing the first fundamental change in how we interact with the software, from GUI-based to chat-based. And for those tools used for building other tools, i.e., DevTools, they are at the forefront of this seismic shift.

Database tools are also a subclass of DevTools. At Bytebase, We debated whether to build a brand new SQL client, but comparing products that have been developed for 10+ years, we weren't able to find enough differentiation. The arrival of Generative AI completely overturns the situation. The UX needs to be designed from ground up to accommodate the chat pattern, and all those existing GUI components accumulated over the years become obsolete. To seize this opportunity, today, we are excited to introduce **SQL Chat** ([https://sqlchat.ai](https://sqlchat.ai)), the SQL client in the Developer Tools 2.0 era.

## SQL Chat: What It is

![_](/content/blog/sql-chat/sqlchat.webp)

💬 SQL Chat is built with a chat-based interface in mind, rather than the traditional GUI-based SQL client.

![_](/content/blog/sql-chat/sqlchat-ui.webp)

🚀 Built with the popular React + Next.js framework, you can deploy to Vercel in just one click, there will also be an option to self-host.

![_](/content/blog/sql-chat/vercel.webp)

🦁️ Currently supports MySQL and PostgreSQL, we plan to support more databases soon.

![_](/content/blog/sql-chat/supported-dbs.webp)

✨ 100% open source, give us a star at: [https://github.com/sqlchat/sqlchat](https://github.com/sqlchat/sqlchat)

Many years ago, Alan Kay and other pioneers envisioned `Tools for Thought`. From the GUI era opened by HyperCard to the Internet era trailblazed by Netscape, to today's Chat era led by OpenAI, ChatGPT, GitHub Colipot,
their idea is getting really close.

And SQL Chat is Bytebase's brick to pave the remaining path.

---

Try [https://sqlchat.ai](https://sqlchat.ai) online. You can also join our [Discord](https://discord.gg/z6kakemDjm) and let us know your thoughts!
