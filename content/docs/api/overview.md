---
title: Overview
---

<HintBlock type="info">

This API is in **Alpha** stage and subject to change. Please [contact us](http://localhost:3000/docs/faq/#how-to-reach-us) before using API in production.

</HintBlock>

Bytebase API is gRPC based. See [spec](https://github.com/bytebase/bytebase/tree/main/proto/gen/grpc-doc/v1).

Bytebase also provides [RESTful HTTP API](https://api.bytebase.com). Internally, it uses [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway) to transcode
HTTP API to gRPC.

## Tutorial

- [Deploy Schema Migration with Bytebase API](/docs/tutorials/api/).
