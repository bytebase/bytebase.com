# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a Mintlify documentation site for Bytebase, a database DevOps and CI/CD platform. The repository contains:

- **Content Structure**: Documentation is organized into MDX files following a hierarchical structure with main sections for:

  - Introduction & Getting Started
  - Features (Database CI/CD, SQL Editor, Permissions, Data Masking)
  - Administration & Security
  - Integrations & API Reference
  - Tutorials & Guides
  - Changelog

- **Configuration**: The `docs.json` file defines the site structure, navigation, themes, and integrations
- **Assets**: Images and media files are stored in the `content/` and `images/` directories
- **Snippets**: Reusable content blocks are in the `snippets/` directory for consistency across documentation

## Development Commands

### Local Development

```bash
# Start development server (requires Mintlify CLI)
mint dev

# Install/reinstall dependencies if dev server fails
mint install
```

### Prerequisites

- Install Mintlify CLI globally: `npm i -g mint`
- Run commands from the root directory where `docs.json` is located

### Testing

```bash
# Check for broken links (excluding /api-reference)
./docs/check-links.sh
```

Run this test before committing any documentation changes to ensure all internal links are valid.

## Content Management

- **MDX Files**: All documentation pages use MDX format combining Markdown with React components
- **Navigation**: Defined in `docs.json` with tabbed structure for different content areas
- **Images**: Store in `content/` directory following the path structure that matches the documentation hierarchy
- **Reusable Content**: Use snippets from the `snippets/` directory for common content blocks

## Publishing

- Changes are automatically deployed to production when pushed to the main branch
- The GitHub App integration handles automatic deployment
- 404 errors typically indicate missing files or incorrect paths in `docs.json`

## Theme and Styling

- Uses Mintlify's "mint" theme with custom purple branding (#4F46E5)
- Lucide icon library for consistent iconography
- Plausible analytics integration for docs.bytebase.com
- Contextual options enabled for copy, view, ChatGPT, and Claude integration
