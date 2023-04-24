---
title: Build from Source Code
---

This document guides you to build Bytebase from source code.

## Prerequisite

1. Install [pnpm](https://pnpm.io/installation), Bytebase requires Node.js >=17.0.
2. Install [Go](https://golang.org/dl/), Bytebaes requires Go >= 1.16

## Environment Setup

It's recommended to run Bytebase application as non-root user for security reason. If you don't have other non-root users on the system, you can follow the following steps to setup one, e.g. user `bytebase`.

```bash
groupadd bytebase && useradd -g bb bytebase
```

```bash
sudo su bytebase
```

## Build

Download [source code](https://github.com/bytebase/bytebase) from GitHub, then go to the source root directory

<HintBlock type="info">

If you want to build from a specific release `x.y.z`, then switch to that tag.

</HintBlock>

```bash
git checkout tags/x.y.z
```

Build the source

```bash
scripts/build_bytebase.sh [<<out_directory>>]
```

If `out_directory`is not specified, the default directory is `./bytebase-build`

Suppose you run `scripts/build_bytebase.sh foo` After build completes, run:

```bash
foo/bytebase --port 8080
```

(check [Server Startup Options](/docs/reference/command-line) for other startup options)

You should see something like this in the console:

<IncludeBlock url="/docs/get-started/install/terminal-output"  ></IncludeBlock>

## Troubleshoot

### error: too many open files

Change the open file limit:

```bash
ulimit -n 10240
```
