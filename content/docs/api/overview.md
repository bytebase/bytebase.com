---
title: Overview
---

<TutorialBlock url="/docs/tutorials/api-issue" title="Deploy Schema Migration with Bytebase API" />

You can manipulate every aspect of Bytebase via API. In fact, the Bytebase UI console is built on the
same API. You can use Bytebase as a headless database deployment backend and integrate it with your own
internal developer platform.

Bytebase API is gRPC-based ([spec](https://github.com/bytebase/bytebase/tree/main/proto/gen/grpc-doc/v1)).

Bytebase also provides [RESTful HTTP API](https://api.bytebase.com). Internally, it uses [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway) to transcode HTTP API to gRPC.
