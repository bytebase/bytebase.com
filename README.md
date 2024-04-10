# <a href="https://www.bytebase.com"><img alt="Bytebase" src="https://raw.githubusercontent.com/bytebase/bytebase.com/main/public/images/logo.svg" height="56px" /></a>

We are hiring. Please check out our [about page](https://www.bytebase.com/about) and submit inquiry from there.

## Table of Contents

- [Getting Started](#getting-started)
- [Content Guide](#content-guide)
- [Code Style](#code-style)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [VS Code](#vs-code)
- [Vercel](#vercel)

## Getting Started

1. Clone this repository

```text
git clone git@github.com:bytebase/bytebase.com.git
```

1. Install dependencies

```text
pnpm install
```

1. Run website locally

```text
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the local running website.

## Content Guide

The repo hosts 3 major content types:

- Documentation at https://www.bytebase.com/docs
- Blog at https://www.bytebase.com/blog
- Changelog at https://www.bytebase.com/changelog

For general writing guide, please check [this writing guide](https://github.com/bytebase/bytebase/blob/main/docs/writing-guide.md).

### General

#### Naming

All lowercase with `-` as word separator:

- `my-awesome-post.md`
- `my-awesome-image.webp`

#### Image

- Naming: choose a **readable** image name.
- Sizing: use **16:9** ratio if possible. The feature image sizing **must** be 16:9.
- Format: use **WebP** instead of PNG format to reduce image size.

#### Recording

Use animated recording judicious. Sometimes you have to use animation to showcase the feature, however, recording requires much larger size and slows page loading speed. In most cases, we should have at most 1 recording per page.

- Format: Try [converting GIF to WebP](https://ezgif.com/gif-to-webp/) to see if the size can be reduced. If not, then use GIF.

### Documentation

- Put documentation under https://github.com/bytebase/bytebase.com/tree/main/content/docs.
- Put image under https://github.com/bytebase/bytebase.com/tree/main/public/content/docs.
- Check https://www.bytebase.com/docs/document-write-guide for supported markdown syntax.

### Blog

- Put under https://github.com/bytebase/bytebase.com/tree/main/content/blog.
- Under https://github.com/bytebase/bytebase.com/tree/main/public/content/blog, for each blog post, create a folder using the blog post file name and put all images for that post there.
- Use feature image.

### Changelog

- Put under https://github.com/bytebase/bytebase.com/tree/main/content/changelog.
- Under https://github.com/bytebase/bytebase.com/tree/main/public/content/changelog, for each changelog containing any image, create a folder using the changelog version and put all images for that changelog there.
- Do **NOT** use feature image

## Code Style

**Skip this if you only change documentation**

### ESLint

[ESLint](https://eslint.org/) helps find and fix code style issues and force developers to follow same rules. Current configuration is based on `eslint:recommended`, `next/core-web-vitals` and `@typescript-eslint/recommended` rules sets.

Additional commands:

```text
pnpm run lint
```

Run it to check the current status of eslint issues across project.

```text
pnpm run lint:fix
```

Run it to fix all possible issues.

### Prettier

[Prettier](https://prettier.io/) helps to format code based on defined rules. [Difference between Prettier and ESLint](https://prettier.io/docs/en/comparison.html).

Additional commands:

```text
pnpm run format
```

Run it to format all files across the project.

### VS Code

Following extensions required to simplify the process of keeping the same code style across the project:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

After installation, VS Code will be use settings from the `.vscode/settings.json` file and will be fixing and formatting your code automatically on paste and save actions.

## Vercel

www.bytebase.com is hosted on Vercel. Upon successful deployment, Vercel will post a webhook event to /api/index-to-algolia to rebuild the index.

```bash
curl -X POST https://www.bytebase.cc/api/index-to-algolia/
```
