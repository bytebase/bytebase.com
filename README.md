# <a href="https://www.bytebase.com"><img alt="Bytebase" src="https://raw.githubusercontent.com/bytebase/bytebase/be87525c1228fe00cdcc3585859664bdd3167aca/frontend/src/assets/logo.svg" height="56px" /></a>

We are hiring. Check out our [jobs page](https://www.bytebase.com/jobs).

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Learn more](#learn-more)
  - [Build the website](#deploy-on-vercel)
- [Project Structure](#project-structure)
- [Code Style](#code-style)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [VS Code](#vs-code)

## Getting Started

1. Clone this repository or hit "Use this template" button

```bash
git clone git@github.com:bytebase/bytebase.com.git
```

2. Install dependencies

```bash
pnpm install
```

## Usage

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Style

### ESLint

[ESLint](https://eslint.org/) helps find and fix code style issues and force developers to follow same rules. Current configuration is based on `eslint:recommended`, `next/core-web-vitals` and `@typescript-eslint/recommended` rules sets.

Additional commands:

```bash
pnpm run lint
```

Run it to check the current status of eslint issues across project.

```bash
pnpm run lint:fix
```

Run it to fix all possible issues.

### Prettier

[Prettier](https://prettier.io/) helps to format code based on defined rules. [Difference between Prettier and ESLint](https://prettier.io/docs/en/comparison.html).

Additional commands:

```bash
pnpm run format
```

Run it to format all files across the project.

### VS Code

Following extensions required to simplify the process of keeping the same code style across the project:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

After installation, VS Code will be use settings from the `.vscode/settings.json` file and will be fixing and formatting your code automatically on paste and save actions.
