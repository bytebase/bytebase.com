---
title: Overview
---

<HintBlock type="info">

This API is in **Alpha** stage and subject to change. Please [contact us](http://localhost:3000/docs/faq/#how-to-reach-us) before using API in production.

</HintBlock>

You can manipulate every aspect of Bytebase via API. In fact, the Bytebase UI console is built on the
same API.

Bytebase API is gRPC-based ([spec](https://github.com/bytebase/bytebase/tree/main/proto/gen/grpc-doc/v1)).

Bytebase also provides [RESTful HTTP API](https://api.bytebase.com). Internally, it uses [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway) to transcode HTTP API to gRPC.

## Tutorial

- [Deploy Schema Migration with Bytebase API](/docs/tutorials/api/).
