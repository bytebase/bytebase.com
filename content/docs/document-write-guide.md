---
title: ✍️ Document write guide
description: This section shows the steps of contributing documentation.
---

Before getting started, please make sure that you are familiar with

- [Basic Markdown Syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Bytebase Technical Writing Style Guide](https://github.com/bytebase/bytebase/blob/main/docs/writing-guide.md)

## The structure of a document `.md` file

```markdown
---
title: Document write guide
description: This section shows the steps of writing a document.
---

# How to write a document?

First, you need to write down the main concept of your documentation.
```

To optimize documentation SEO, we should save its metadata between the `--- xxx ---` block. Typically used fields are:

- `title` should be same as the header title;
- `description` field should be the excerpt of the document.

## Blocks

Use following components to display more styled content in documentations:

### `Table`

| Col1  | Col2 | Col3 |
| ----- | ---- | ---- |
| Bob   | 30   | ✔️   |
| Alice | 15   |      |
| David | 20   | ✔️   |

### `Code`

A code block with copy button.

```bash
echo hello world
```

### `Hint`

Show a hint text with a styled block.

<HintBlock type="info">

I am an info block with [link](#hint).

Extra description.

</HintBlock>

<HintBlock type="warning">

I am an warning block with [link](#hint).

Extra description.

</HintBlock>

#### Usage

```markdown
<HintBlock type="info">

Bytebase has already prepared some sample data. In particular, it has created a Test environment and a Prod environment, each containing a mysql instance. To establish the connection to those instances, one quick way is to [start a MySQL docker instance](#start-a-mysql-docker-instance-for-testing).

</HintBlock>
```

#### Props

| Name | Type                | Default | Description        |
| ---- | ------------------- | ------- | ------------------ |
| type | `info` \| `warning` | `info`  | Set the hint style |

### `Doc`

A pretty link block to another page.

<DocLinkBlock url="/docs/faq" title="FAQ"></DocLinkBlock>

#### Usage

```markdown
<DocLinkBlock url="/docs/faq" title="FAQ"></DocLinkBlock>
```

#### Props

| Name  | Type     | Default | Description                   |
| ----- | -------- | ------- | ----------------------------- |
| url   | `string` | `''`    | Set the link url              |
| title | `string` | `''`    | Description of the link title |

### `Include`

Include another markdown and render inline.

#### Usage

```markdown
<IncludeBlock url="/docs/document-write-guide"></IncludeBlock>
```

#### Props

| Name | Type     | Default | Description                                                                            |
| ---- | -------- | ------- | -------------------------------------------------------------------------------------- |
| url  | `string` | `''`    | Set the markdown file url, which should be an absolute path without the `/docs` prefix |

## How to run the site locally

1. Set up your [development environment](https://github.com/bytebase/bytebase.com#-development).
1. Write the full content in any editor that supports Markdown. e.g. [VSCode](https://code.visualstudio.com/), [Typora](https://typora.io/), or [Notion](https://notion.so/).
1. Run `pnpm dev` start the review server.
1. Go to [localhost:3000/docs](http://localhost:3000/docs) and check your creation.
1. If everything looks fine, submit a PR with the changes to [our repo in GitHub](https://github.com/bytebase/bytebase.com).

## How to add a new page

1. Add your .md file to the folder `/content/docs/xxx`.
2. Add your images to the folder `/docs/xxx`.
3. Add an entry for the document in `_layout.md`, under the proper section.
4. Submit a PR with the changes to [our repo in GitHub](https://github.com/bytebase/bytebase.com).
