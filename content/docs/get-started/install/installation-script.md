---
title: Installation Script
---

This document guides you to install the latest Bytebase via the one-liner installation script. The installation script is stored at [https://github.com/bytebase/install](https://github.com/bytebase/install).

## Prerequisite

1. Install [curl](https://curl.se/download.html).
2. Install [tar](https://www.gnu.org/software/tar/).

## Install

Using install script to install the latest release version:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/bytebase/install/main/install.sh)"
```

If no error occurs, you should see something like this in the console:

```plain
OS: Darwin
ARCH: arm64
Password:
Get bytebase latest version: %%bb_version%%
Downloading tarball into /var/folders/j4/9x356cb9263f2jryv0xs9pnr0000gn/T/tmp.g1C2PJ8U
Start downloading https://github.com/bytebase/bytebase/releases/download/%%bb_version%%/bytebase_%%bb_version%%_Darwin_arm64.tar.gz...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0
100 81.3M  100 81.3M    0     0  3972k      0  0:00:20  0:00:20 --:--:-- 5430k
Completed downloading https://github.com/bytebase/bytebase/releases/download/%%bb_version%%/bytebase_%%bb_version%%_Darwin_arm64.tar.gz
Start extracting tarball into /opt/bytebase...
Start installing bytebase and bb %%bb_version%%
Installed bytebase %%bb_version%% to /usr/local/bin
Installed bb %%bb_version%% to /usr/local/bin

Check the usage with
  bytebase --help
  bb --help
```

## Run

After install completes, run:

```bash
bytebase --port 8080
```

(check [Server Startup Options](/docs/reference/command-line) for other startup options)

You should see something like this in the console:

<IncludeBlock url="/docs/get-started/install/terminal-output"  ></IncludeBlock>

## Troubleshoot

If you encounter any error when you install bytebase by using install script, welcome to open issue on [bytebase/install repository](https://github.com/bytebase/install).
