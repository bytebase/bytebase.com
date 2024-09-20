---
title: Deploy with Docker
---

<TutorialBlock url="/docs/tutorials/first-schema-change" title="Your First Schema Change in 5 Minutes" />

It's recommended to [run Bytebase with Docker](/docs/get-started/self-host/#docker) which is the easiest way to get you started.

Run the following command to start Bytebase on container port `8080` and map it to localhost port `8080`.

<IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

Bytebase starts successfully if you see following message. Visit Bytebase at [localhost:8080](http://localhost:8080/) from the browser.

<IncludeBlock url="/docs/get-started/install/terminal-startup-output-success"></IncludeBlock>

<HintBlock type="info">

If you've run Bytebase before, you can reset all data by running this command:

```text
rm -rf ~/.bytebase/data
```

</HintBlock>
