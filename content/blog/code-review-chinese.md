---
title: 令人头大的代码审核
author: Lucy
updated_at: 2022/04/13 03:22:08
feature_image: /content/blog/code-review/code-review.webp
tags: Hidden, Chinese
description: Code review best practice, 代码审核的最佳实践
---

_作者 | Tyler Cipriani_
_原文链接 | [https://tylercipriani.com/blog/2022/03/12/code-review-procrastination-and-clarity/](https://tylercipriani.com/blog/2022/03/12/code-review-procrastination-and-clarity/)_

> People think they lack motivation, what they really lack is clarity – James Clear, Atomic Habits

代码审核一脸无辜地提出了一个扎心的问题：「这段代码写得怎么样？ 」这让人甚至搞不清楚从何谈起 —— 也就自然很容易导致代码审核遭到推迟。

在有这么多决定要做的情况下，审核者能做出最简单的决定就是选择退出 —— 等我精力好的时候再审。

这篇文章探讨了代码审核中各种头大的决策问题，之后探寻个人和制度层面对抗它们的策略。

## 代码审核是对我意志力的考验

![_](/content/blog/code-review/code-review.webp)_对于不合理审核请求的混乱邪恶回应_

即使只是针对一个很小的改动，代码审核也是一个相当大的任务。如果你的补丁  (patch) 又大又难搞，那么你是在要求我拿出多到足以移山填海的意志力。

当一次审核需要消耗过多份额的意志力时，我通常有几种回应方式：

- 守序善良：在还有足够能量完成审核的情况下尽量挤出时间。
- 中立：推迟审核代码 —— 并虔诚地焚香，祈祷它以某种方式消失。
- 混乱邪恶：爱谁谁吧 (YOLO)，直接把它投入到产品中，你（开发者）自己处理后果。

这几种方式对开发者和审核者都不公平。

## 代码审核究竟从何下手

即使是非常基础的代码审核问题通常也需要审核者自己进行决策。

最近，Hacker News 上的一系列主题贴提出了一个关于代码审核的基本问题：你是否把「运行代码」作为审核中的一部分？这些回答给了我很大启发，总结如下：

- [没有，但我会如此这般诱导开发者们自己进行代码运行](https://news.ycombinator.com/item?id=30578033)
- [是的，因为忽视运行代码这一步给我留下过心理阴影](https://news.ycombinator.com/item?id=30577790)
- [很少，因为我指望着自动测试](https://news.ycombinator.com/item?id=30579389)
- [看情况，而且需要有一个确定的标准](https://news.ycombinator.com/item?id=30578049)

谷歌的代码审核指南对这个问题表现得十分淡定：

> 如果你想的话，可以验证 CL[审核中的代码]。
> 在代码审核中要注意什么，[https://google.github.io/eng-practices/review/](https://google.github.io/eng-practices/review/)

谷歌的工程实践文档陆续提出了一些「必须确保已经进行代码运行」的情境：UI 变化和并行 —— 在这些地方，个人很容易（或者说很可能）犯一个明显的（事后看来的）错误。但是其他情况下的代码审核呢？

## 对于优化代码审核过程提出要求

我们应该优化代码审核过程，以减轻审核人的决策疲劳。

这里有几个减轻他们精神负担的小技巧，供开发者们借鉴：

- 拆分你的合并请求 (merge request) ，把它变成相互独立、小体量的多个合并请求
- 添加一些测试和 linting 来预演代码
- 撰写更清楚的提交信息
- 在代码中添加注释
- 要求他们进行更聚焦的审核 —— 例如设计审核 (design review) 或架构审核 (architecture review)
- 写出更好的代码

有些工具可以帮助你记录还有哪些积压的审核没有完成 - Automattic 有 [The Stick](https://www.software-engineering-unlocked.com/episode-4-leif-singer/)，微软有 [Nudge](https://arxiv.org/pdf/2011.12468v1.pdf)。研究表明，这类代码审核提醒工具可以[提升 60% 的审核速度](https://www.michaelagreiler.com/code-review-reminder/)。

不过说到底，不存在什么灵丹妙药。代码审核中最残忍的回应就是沉默。有时你会眼睁睁看着自己的代码腐烂，等待最后的审判。这对每个人来说都很糟心。

为了加速这个过程，**我们必须努力减轻审核者的负担** —— 可以从对审核的范围达成共识入手。也许从「审核者是否需要运行代码」这个基本问题开始。这一问题的答案对于不同团队和不同类型的软件可能是不同的，但既然我们都在做审核，也许我们也都该有一套审核标准。
