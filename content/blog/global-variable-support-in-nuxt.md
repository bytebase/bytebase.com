---
title: Global variable support in Nuxt
author: Xiong
published_at: 2022/10/9 12:00:00
feature_image: /content/blog/global-variable-support-in-nuxt/deliver-versions.webp
tags: Engineering
description: We recently introduced a global version variable in our Nuxt docs to ease the documentation update during release. This article describes how we implement this feature.
---

## Background

On our doc site, we have a few pages with instructions on installing Bytebase, like this one: [Deploy Bytebase in Docker within 5 seconds](/docs/get-started/install/deploy-with-docker). On these pages, we teach users how to install the latest version of Bytebase by showing command snippets.

```shell
docker run --init \
 --name bytebase \
 --platform linux/amd64 \
 --restart always \
 --add-host host.docker.internal:host-gateway \
 --publish 8080:8080 \
 --health-cmd "curl --fail http://localhost:8080/healthz || exit 1" \
 --health-interval 5m \
 --health-timeout 60s \
 --volume ~/.bytebase/data:/var/opt/bytebase \
 bytebase/bytebase:%%bb_version%% \
 --data /var/opt/bytebase \
 --host http://localhost \
 --port 8080
```

But at Bytebase, we release a new version biweekly, which means we need to update the latest version here (currently %%bb_version%%) every two weeks.

![_](/content/blog/global-variable-support-in-nuxt/upgrade-in-the-old-way.webp)

This is painful and error-prone to change every version string during the upgrade. Ideally, we only need to change the latest version in one place, and let other files read and use it just like a global variable. Let's improve this procedure and say goodbye to the cumbersome manual operations!

## 1st Attempt - A version component

After some investigation, I sadly found out that there is no out-of-box global variable support in Nuxt Content currently: [nuxt/content#997 (comment)](https://github.com/nuxt/content/issues/997#issuecomment-1005507397).

Our website is built with Nuxt Content v1, so I then looked through its documentation, and the title [Vue components](https://content.nuxtjs.org/v1/getting-started/writing#vue-components) just caught my eye. When we use components, we expect them to solve the problem of functional reuse, which coincides with the purpose of a version variable. We can write a component with the latest version number as its content, and use this component everywhere we need.

So following Nuxt Content's [instruction](https://content.nuxtjs.org/v1/getting-started/writing/#global-components), we create a global component named Version.vue,

```javascript
// Version.vue

<template>
  <!-- change the latest version below after every publish -->
  <span>%%bb_version%%</span>
</template>
```

and place it under `/components/global`:

```bash
components/
  global/
    Version.vue
content/
  ...
```

In this way, we have registered it as a global component. Then we can use it in markdown files like below:

```markdown
...

Run the following command to start Bytebase on [https://bytebase.example.com](https://bytebase.example.com/)

<pre>
docker run --init \
  --name bytebase \
  --platform linux/amd64 \
  --restart always \
  --add-host host.docker.internal:host-gateway \
  --publish 80:80 \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:<version></version> \
  --data /var/opt/bytebase \
  --host https://bytebase.example.com \
  --port 80
</pre>

...
```

### A standalone version file

Usually, our Developer Marketing team updates the version number on every new release, thus it's beneficial to reduce the required coding work. So it would definitely be better if the version number is in a standalone file like [what we did in the Bytebase repo](https://github.com/bytebase/bytebase/blob/main/scripts/VERSION).

To achieve this, we create a file named `VERSION` and put it under the root directory. This file only contains one line of the exact latest version number:

```bash
%%bb_version%%
```

Then we should make some changes to the version component to let it read the version info from this plain file. Before that, we need to install `raw-loader` as a `devDependency` so that we can parse plain text files as raw strings.

And rewrite our `Version.vue` into this:

```javascript
// Version.vue

<template>
  <span>{{ VERSION }}</span>
</template>

<script setup>
// The `!raw-loader!` part means that we load this file through raw-loader
// and accept the result as a raw string.
import { default as VERSION } from "!raw-loader!../../VERSION";
</script>
```

Now, whenever we publish a new version of Bytebase, we just need to simply change the version number in the `VERSION` file.

### Limitations

However, the solution of using a version component has some limitations:

1. In Nuxt Content, we cannot use a component directly in code blocks surrounded by backticks ` ``` `. To do this, we have to wrap code snippets inside `<pre>` tags. This is an ugly pattern and will cause rendered code blocks to lose the original styles and functionalities like copy buttons.

```markdown
...

  <pre>
      ...
      <version></version>
      ...
  </pre>

...
```

2. Components cannot be used everywhere. For example, if we want to use the component in a link address, it won't work:

```markdown
https://github.com/bytebase/bytebase/releases/tag/<version></version>
```

We actually used a tricky workaround to achieve it here, which will redirect visitors to the latest release page (For now, it's %%bb_version%%).

```markdown
https://github.com/bytebase/bytebase/releases/latest
```

## Refined solution - Inject version number before content parse

We used the version component for a couple of weeks. Until one day, I wandered into Nuxt Content docs' [advanced part](https://content.nuxtjs.org/v1/getting-started/advanced) and saw an example of the hook `content:file:beforeParse`:

```javascript
// nuxt.config.js
hooks: {
'content:file:beforeParse': (file) => {
  if (file.extension !== '.md') return
    file.data = file.data.replace(/react/g, 'vue')
  }
}
```

In this example, the author uses this hook to convert all occurrences of the word `react` into `vue`. It inspired me that we could use a similar technique and convert all occurrences of the placeholder `$$bb_version$$` into the latest version value (`%%bb_version%%`).

Let's enhance this.

Remove the former version component part, and add a few lines in the file `nuxt.config.js`. Before parsing, we will look for markdown files under directory `/docs`, and use a regex to replace placeholders with the latest version number read from the file `VERSION`.

```javascript
// nuxt.config.js

...
const VERSION = fse.readFileSync("VERSION").toString();
...

export default {
  ...
  hooks: {
    "content:file:beforeParse": (file) => {
      if (file.extension === ".md" && file.path.includes("docs")) {
        file.data = file.data.replace(/$$bb_version$$/g, VERSION);
      }
    },
  },
  ...
};
```

In markdown files, insert the placeholder `$$bb_version$$` into where we are putting the version number.

````markdown
Run the following command to start Bytebase on [https://bytebase.example.com](https://bytebase.example.com/)

```bash
docker run --init \
  --name bytebase \
  --platform linux/amd64 \
  --restart always \
  --add-host host.docker.internal:host-gateway \
  --publish 80:80 \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:$$bb_version$$ \
  --data /var/opt/bytebase \
  --host https://bytebase.example.com \
  --port 80
```
````

Now there's no need for `<pre>` tags or extra loader packages, and the placeholder works in every corner including link addresses. Perfect! ✌️

## Result

[This](https://github.com/bytebase/bytebase.com/pull/506/files) is how we update our docs now. Just a single line change to update the version string and all version references scattered over the doc will get updated. Concise and effective.

![_](/content/blog/global-variable-support-in-nuxt/upgrade-in-the-new-way.webp)

## References

- Related PRs: [#316](https://github.com/bytebase/bytebase.com/pull/316), [#317](https://github.com/bytebase/bytebase.com/pull/317), [#437](https://github.com/bytebase/bytebase.com/pull/437), [#506](https://github.com/bytebase/bytebase.com/pull/506).
