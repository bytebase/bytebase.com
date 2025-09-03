---
title: How to cross compile with CGO using GoReleaser and GitHub Actions
author: Junyi
updated_at: 2022/08/24 15:17
feature_image: /content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/banner.webp
tags: Engineering
description: We meet some trouble using goreleaser and cgo at the same time. This blog tells how we found the best practices.
keypage: true
---

## Background

When implementing [SQL Review for PostgreSQL](https://docs.bytebase.com/sql-review/review-rules), we introduced [pg_query_go](https://github.com/pganalyze/pg_query_go) as the PostgreSQL parser. The pg_query_go uses the native PostgreSQL parser via C bind, which naturally requires CGO support.

In the [1.2.1 release](/changelog/bytebase-1-2-1), we found that the [GoReleaser](https://github.com/goreleaser/goreleaser) did not work correctly, and the error message pointed to pg_query_go. Fortunately, this version did not use pg_query_go. So we first added the "!release" Golang tag to ensure a successful release. Then we started the long road to fight against GoReleaser and CGO.

## Clue One

![exclude-all-go-files-error](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/exclude-all-go-files-error.webp)

```text
build constraints exclude all Go files in /go/pkg/mod/github.com/pganalyze/pg_query_go/v2@2.1.2/parser
```

This error message may seem a bit puzzling, but it points to exactly what’s wrong. So let's go to the package "pg_query_go/parser" and find out.
![pg-query-go](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/pg-query-go.webp)

The package "pg_query_go/parser" contains only one Go file, parser.go, but otherwise, it's all C code. The "parser.go" is a CGO file that imports "C." It's easy to guess that the Go parser ignores this file when not set CGO_ENABLE=1.

We can easily verify it by Googling or by manual testing. There, we got our clue to the next intersection: set CGO_ENABLED=1 in GoReleaser.

## Clue Two

To enable CGO in GoReleaser, you only need to add "CGO_ENABLED=1" to the corresponding "env" entry in the GoReleaser configuration file.
![goreleaser-enable-cgo](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/goreleaser-enable-cgo.webp)

Let's retry.
![retry-error](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/retry-error.webp)

This error looks strange. We can only know that there is something wrong with CGO. It seems that GoReleaser does not support CGO. After looking it up in the [GoReleaser docs](https://goreleaser.com/limitations/cgo/?h=cgo), my suspicions were confirmed.
![goreleaser-docs-cgo](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/goreleaser-docs-cgo.webp)
![goreleaser-docs-cross-compiling](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/goreleaser-docs-cross-compiling.webp)

But the docs shed some light: the "This project" mentioned is actually [goreleaser/goreleaser-cross](https://github.com/goreleaser/goreleaser-cross), so let's go to goreleaser-cross next!

## Clue Three

The goreleaser-cross repository provides a Docker image that contains a GoReleaser and some C/C++ cross-compiler toolchains.

The cross-compiler is used in scenarios where binaries must be compiled on platform A but executed directly on platform B. For example, in embedded and operating system development scenarios, our development machine is often an x64 Linux platform, but the runtime environment may be an arm/arm64 Linux platform.

So why do we need this here? You may have noticed that we have specified four target platforms in the GoReleaser configuration file.
![target-platforms](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/target-platforms.webp)

Our build environment is Ubuntu x64 on GitHub Actions. Before turning on CGO, we only need to handle the parameters for cross-platform Go compilation. And this step is handled by the Go compiler and GoReleaser. But after CGO is introduced, we also need to compile C/C++ code, so we need the corresponding C/C++ cross-compilation toolchain.

In other words, we may need four compilation toolchains for the target platform. Fortunately, goreleaser-cross supports them all.
![goreleaser-cross-supported-platforms](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/goreleaser-cross-supported-platforms.webp)

Now it looks like the problem is solved, but it is not perfect. The goreleaser/goreleaser-cross repo has only 26 stars, while goreleaser/goreleaser has 10k+ stars. It could mean that using goeleaser-cross have some risks.
![star-history](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/star-history.webp)

If the cross-compilation toolchain is well maintained, the risk is relatively small. The main problem is when the target platform is Darwin. Anyone who has tried to cross-compile from Linux to Darwin knows this is a challenging task. The difficulty is that there is no readily available, well-maintained cross-compilation toolchain. You often need to build your cross-compilation toolchain. It's had to verify the compatibility of the cross-compilation toolchain, and some of them are not well-maintained.

So is there a way to avoid this risk? Yes.

## Let’s Try Another Way

As mentioned before, we are using Ubuntu x64 on GitHub Actions. The easiest way to avoid using the cross-compilation toolchain is to compile on the same platform. Does GitHub Actions provide any other environment? Yes, it does!
![github-action-platforms](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/github-action-platforms.webp)

Note that the macOS supported are all x64 architecture. We still need to compile across the architectures but no need to cross the platforms!

So the next step becomes: to compile the Linux binary for both architectures on the Linux platform and compile the Darwin binary for both architectures on the macOS platform.

For the Linux platform

- Compiling from x64 to x64 requires a gcc/g++ toolchain, which we usually use.
- Compiling from x64 to arm64 requires a well-maintained toolchain, "aarch64-linux-gnu-gcc". You can get it directly from the Ubuntu package manager:

```bash
sudo apt-get -y install gcc-aarch64-linux-gnu
```

For the Darwin platform, it's even easier. The clang supports cross-architecture natively. Thanks to LLVM!

After some work, the GitHub Actions configuration looks like this.
![github-workflow](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/github-workflow.webp)

Two jobs are used to compile binaries on different platforms.

For the Darwin platform GoReleaser configuration file, we just need to enable CGO.
![goreleaser-configuration-darwin](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/goreleaser-configuration-darwin.webp)

For the Linux platform GoReleaser configuration file, it's a bit more complicated, and we need to use the corresponding compilation toolchain for the corresponding architecture.
![goreleaser-configuration-linux](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/goreleaser-configuration-linux.webp)

We used GoReleaser's ["overrides"](https://goreleaser.com/customization/build/) feature here.

Up to this point, we can use GoReleaser to compile when CGO is on, but the story is not over yet. The ultimate goal of GoReleaser is to release, and if we use GoReleaser twice as we currently do, we will generate two releases. But compared to the cross-compilation headache, this is a piece of cake.

## Release

The main idea here is simple: separate the building process from the release.

- Job one builds all Linux binaries.
- Job two builds all macOS binaries.
- Job three packages the binaries from job one and two into the final release.

Job one and two skip the release with the skip-publish argument. Job three skips the building stage and uses the files generated in jobs one and two with the extra_files setting.

🚀End of story!
![end-of-story](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/end-of-story.webp)

## A fun fact

Bytebase already depended on [go-sqlite3](https://github.com/mattn/go-sqlite3), which is also a CGO-dependent package. So why didn't it cause problems before?

The thing is CGO was not enabled in GoReleaser. And go-sqlite3 did a [mock](https://github.com/mattn/go-sqlite3/blob/master/static_mock.go) when CGO was not enabled, which means that the go-sqlite3 compiled without CGO was an empty package.
![go-sqlite3-mock](/content/blog/how-we-explored-the-best-practices-of-goreleaser-x-cgo/go-sqlite3-mock.webp)

The reason why we didn't encounter problems is that Bytebase had already [migrated from SQLite to PostgreSQL](https://www.bytebase.com/blog/database-migration-sqlite-to-postgresql) before GoReleaser was introduced. So it really didn't use go-sqlite3 and GoReleaser at the same time.

## Summary

- Don't try to introduce a cross-compilation toolchain unless you absolutely have to. It will incur additional verification and maintenance costs.
- Cross-architecture and cross-platform complicate things and make life harder. Please stay away from them as much as possible.
- Thank you, Github Actions.
- Thank you, LLVM-Clang.
